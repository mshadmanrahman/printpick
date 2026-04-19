#!/usr/bin/env node
/**
 * Verifies every Amazon ASIN in the printer catalog against live Amazon using
 * a real Chromium browser (Playwright). Using a full browser defeats Amazon's
 * bot-detection page that fires on plain fetch() from datacenter or EU IPs.
 *
 * Writes reports/asin-verification.json in the schema consumed by
 * `scripts/catalog-refresh.mjs --verification-file`.
 *
 * Usage:
 *   node scripts/verify-amazon-asins.mjs              # warn-only, exit 0
 *   node scripts/verify-amazon-asins.mjs --strict     # exit 1 if any broken
 *   node scripts/verify-amazon-asins.mjs --verbose    # also print unverified
 *
 * Requires `playwright` and a Chromium install:
 *   npm install
 *   npx playwright install --with-deps chromium
 */

import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..");

const CATALOG_PATH = path.join(REPO_ROOT, "src/data/catalog/printer-catalog.json");
const AFFILIATE_LIB_PATH = path.join(REPO_ROOT, "src/lib/amazon-affiliate.ts");
const REPORT_PATH = path.join(REPO_ROOT, "reports/asin-verification.json");

const AFFILIATE_TAG = "printpick20-20";
const CONCURRENCY = 3;
const NAV_TIMEOUT_MS = 20_000;
const LOCATOR_TIMEOUT_MS = 2_000;
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const args = new Set(process.argv.slice(2));
const STRICT = args.has("--strict");
const VERBOSE = args.has("--verbose");

async function loadRemapAsins() {
  const src = await fs.readFile(AFFILIATE_LIB_PATH, "utf8");
  const block = src.match(/const ASIN_REMAP[\s\S]*?=\s*\{([\s\S]*?)\}\s*;/);
  if (!block) throw new Error("Could not locate ASIN_REMAP in amazon-affiliate.ts");
  const entries = [...block[1].matchAll(/"(B0[A-Z0-9]{8})"\s*:/g)];
  return new Set(entries.map((m) => m[1]));
}

async function loadPrinters() {
  const raw = await fs.readFile(CATALOG_PATH, "utf8");
  const parsed = JSON.parse(raw);
  const list = Array.isArray(parsed)
    ? parsed
    : Array.isArray(parsed.records)
      ? parsed.records
      : Array.isArray(parsed.printers)
        ? parsed.printers
        : Array.isArray(parsed.data)
          ? parsed.data
          : [];
  return list
    .filter(
      (p) =>
        p &&
        typeof p.amazonAsin === "string" &&
        /^B0[A-Z0-9]{8}$/.test(p.amazonAsin),
    )
    .map((p) => ({
      slug: String(p.slug ?? ""),
      name: String(p.name ?? p.slug ?? ""),
      brand: String(p.brand ?? ""),
      asin: p.amazonAsin.toUpperCase(),
    }));
}

function normalizeForMatch(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function brandMatches(productTitle, brand) {
  if (!brand) return true;
  // Split brand into tokens (min 3 chars to skip "of", "3d", etc.) and
  // accept a match if ANY token appears. Handles "Prusa Research" → "Prusa"
  // and "Bambu Lab" → "Bambu" in abbreviated Amazon titles.
  const tokens = normalizeForMatch(brand)
    .split(" ")
    .filter((t) => t.length >= 3);
  if (tokens.length === 0) return true;
  const haystack = normalizeForMatch(productTitle);
  return tokens.some((t) => haystack.includes(t));
}

function classify({ httpStatus, finalUrl, pageTitle, productTitle, bodyText, brand }) {
  let pathname;
  try {
    pathname = new URL(finalUrl).pathname;
  } catch {
    pathname = "";
  }

  // Origin-level redirect-to-search — reliable even behind bot filters.
  if (/^\/(s|b|errors)(\/|$)/.test(pathname) || pathname === "/s") {
    return { state: "broken", notes: `Redirected to ${pathname}` };
  }

  // Amazon's 404: HTTP 404 OR a near-empty shell with "Page Not Found" title.
  // The shell body is ~300 chars and contains only a JS error-image loader —
  // no "Sorry!" text, so we can't rely on body text alone.
  const isPageNotFound =
    httpStatus === 404 ||
    /^page not found$/i.test((pageTitle || "").trim()) ||
    bodyText.includes("Sorry! We couldn't find that page") ||
    bodyText.includes("Looking for something?");
  if (isPageNotFound) {
    return { state: "broken", notes: `Amazon 404 (${pageTitle || "no title"})` };
  }

  // Bot filter even on rendered browser — rare, surface for retry.
  if (
    bodyText.includes("To discuss automated access to Amazon data") ||
    bodyText.includes("Enter the characters you see below")
  ) {
    return {
      state: "unverified",
      notes: "Bot filter hit even on rendered browser (retry later)",
    };
  }

  // Valid product page — but check brand match. ASIN slots get reassigned:
  // e.g. B0C5KXMPZ8 in our catalog was Creality K1 Max but is now a dining
  // mat. Page renders fine, so without this check we'd mark it "verified".
  if (productTitle && productTitle.trim().length > 0) {
    if (!brandMatches(productTitle, brand)) {
      const preview = productTitle.trim().slice(0, 60).replace(/\s+/g, " ");
      return {
        state: "broken",
        notes: `ASIN reassigned to unrelated product: "${preview}"`,
      };
    }
    return { state: "verified", notes: null };
  }

  return { state: "unverified", notes: "No product markers found" };
}

async function checkAsin(context, { slug, name, brand, asin }) {
  const url = `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`;
  const page = await context.newPage();
  try {
    const response = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: NAV_TIMEOUT_MS,
    });
    const httpStatus = response?.status() ?? 0;
    const finalUrl = page.url();
    const pageTitle = await page.title();
    const [productTitle, bodyText] = await Promise.all([
      page
        .locator("#productTitle")
        .first()
        .textContent({ timeout: LOCATOR_TIMEOUT_MS })
        .catch(() => null),
      page
        .locator("body")
        .first()
        .textContent({ timeout: LOCATOR_TIMEOUT_MS })
        .catch(() => ""),
    ]);
    const verdict = classify({
      httpStatus,
      finalUrl,
      pageTitle,
      productTitle,
      bodyText,
      brand,
    });
    return { slug, name, asin, ...verdict };
  } catch (err) {
    return {
      slug,
      name,
      asin,
      state: "unverified",
      notes: `Navigation error: ${err instanceof Error ? err.message : String(err)}`,
    };
  } finally {
    await page.close().catch(() => {});
  }
}

async function runPool(items, worker, concurrency) {
  const results = new Array(items.length);
  let cursor = 0;
  const workers = Array.from(
    { length: Math.min(concurrency, items.length) },
    async () => {
      while (cursor < items.length) {
        const i = cursor++;
        results[i] = await worker(items[i]);
      }
    },
  );
  await Promise.all(workers);
  return results;
}

async function main() {
  const [remap, printers] = await Promise.all([loadRemapAsins(), loadPrinters()]);
  const targets = printers.filter((p) => !remap.has(p.asin));
  const skipped = printers.length - targets.length;

  console.log(
    `Verifying ${targets.length} ASINs via Playwright (${skipped} in ASIN_REMAP)...`,
  );

  const browser = await chromium.launch({
    headless: true,
    args: ["--disable-blink-features=AutomationControlled"],
  });
  const context = await browser.newContext({
    userAgent: UA,
    viewport: { width: 1280, height: 800 },
    locale: "en-US",
    timezoneId: "America/New_York",
    extraHTTPHeaders: {
      "Accept-Language": "en-US,en;q=0.9",
    },
  });
  // Hide navigator.webdriver — Amazon's bot filter checks this flag.
  await context.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => undefined });
  });

  const start = Date.now();
  let results;
  try {
    results = await runPool(targets, (item) => checkAsin(context, item), CONCURRENCY);
  } finally {
    await browser.close();
  }
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);

  const broken = results.filter((r) => r.state === "broken");
  const verified = results.filter((r) => r.state === "verified");
  const unverified = results.filter((r) => r.state === "unverified");

  const generatedAt = new Date().toISOString();
  const records = results
    .slice()
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .map((r) => ({
      slug: r.slug,
      asin: r.asin,
      state: r.state,
      lastVerifiedAt: generatedAt,
      notes: r.notes,
    }));

  await fs.mkdir(path.dirname(REPORT_PATH), { recursive: true });
  await fs.writeFile(
    REPORT_PATH,
    `${JSON.stringify({ generatedAt, records }, null, 2)}\n`,
    "utf8",
  );

  console.log(`\nResults (${elapsed}s):`);
  console.log(`  Verified:   ${verified.length}`);
  console.log(`  Broken:     ${broken.length}`);
  console.log(`  Unverified: ${unverified.length}`);

  if (broken.length > 0) {
    console.log("\nBroken ASINs (add to ASIN_REMAP in src/lib/amazon-affiliate.ts):");
    for (const r of broken) {
      console.log(`  ${r.asin}  ${r.slug.padEnd(36)}  ${r.notes}`);
    }
  }

  if (VERBOSE && unverified.length > 0) {
    console.log("\nUnverified ASINs:");
    for (const r of unverified) {
      console.log(`  ${r.asin}  ${r.slug.padEnd(36)}  ${r.notes}`);
    }
  }

  console.log(`\nReport written to ${path.relative(REPO_ROOT, REPORT_PATH)}`);

  if (STRICT && broken.length > 0) {
    console.error(`\nStrict mode: ${broken.length} broken ASIN(s) detected. Exit 1.`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("verify-amazon-asins failed:", err);
  process.exit(2);
});
