#!/usr/bin/env node
/**
 * Verifies every Amazon ASIN in the printer catalog against live Amazon,
 * detecting ASINs that silently redirect to search results (the Apr 11 2026
 * incident pattern). Writes results to reports/asin-verification.json in the
 * schema consumed by `scripts/catalog-refresh.mjs --verification-file`.
 *
 * Usage:
 *   node scripts/verify-amazon-asins.mjs              # warn-only, exit 0
 *   node scripts/verify-amazon-asins.mjs --strict     # exit 1 if any broken
 *   node scripts/verify-amazon-asins.mjs --verbose    # also print unverified
 *
 * Run from a US IP (GitHub Actions default, Vercel iad1 region) for best
 * coverage. Non-US IPs hit Amazon's geo filter on some SKUs and those ASINs
 * get marked "unverified" rather than "broken" to avoid false positives.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..");

const CATALOG_PATH = path.join(REPO_ROOT, "src/data/catalog/printer-catalog.json");
const AFFILIATE_LIB_PATH = path.join(REPO_ROOT, "src/lib/amazon-affiliate.ts");
const REPORT_PATH = path.join(REPO_ROOT, "reports/asin-verification.json");

const AFFILIATE_TAG = "printpick20-20";
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
const CONCURRENCY = 5;
const TIMEOUT_MS = 15_000;

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
      name: String(p.name ?? p.slug ?? p.amazonAsin),
      asin: p.amazonAsin.toUpperCase(),
    }));
}

function classifyResponse({ asin, status, finalUrl, body }) {
  // Amazon's bot-detection / geo-filter response contains this marker. When it
  // appears, we cannot distinguish a dead ASIN from a blocked fetch, so mark
  // as unverified rather than broken. Re-run from a US IP (or via a cleaner
  // UA / cookie session) to get a real verdict.
  const botFiltered =
    body.includes("To discuss automated access to Amazon data") ||
    body.includes("Enter the characters you see below");

  if (botFiltered) {
    return {
      state: "unverified",
      notes: "Amazon bot/geo filter hit (re-run from US IP or with cookies)",
    };
  }

  // Explicit geo-mismatch signals in the page shell.
  if (body.includes('sp-cdn="L5Z9:SE"') || body.includes("i18n-prefs=SEK")) {
    return { state: "unverified", notes: "Geo-blocked from this IP (try US region)" };
  }

  // Valid product markers — must come before the 404 checks because some
  // valid product pages also include the word "Sorry" in recommendation rows.
  if (
    body.includes('id="productTitle"') ||
    body.includes(`"asin":"${asin}"`) ||
    body.includes(`"parentAsin":"${asin}"`)
  ) {
    return { state: "verified", notes: null };
  }

  // Redirect-to-search / browse fallback. This signal is reliable even from
  // non-US IPs because Amazon redirects on the origin side.
  try {
    const parsed = new URL(finalUrl);
    if (/^\/(s|b|errors)(\/|\?|$)/.test(parsed.pathname)) {
      return { state: "broken", notes: `Redirected to ${parsed.pathname}${parsed.search}` };
    }
  } catch {
    // fall through
  }

  // Genuine 404 page without bot-filter markers. Only rely on this when
  // status is 404 AND no bot-filter markers AND no product markers.
  if (
    status === 404 &&
    (body.includes("Sorry! We couldn't find that page") ||
      body.includes("Looking for something?"))
  ) {
    return { state: "broken", notes: "Amazon 404 (product not found)" };
  }

  return { state: "unverified", notes: "Ambiguous response (no clear markers)" };
}

async function checkAsin({ slug, name, asin }) {
  const url = `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": UA,
        "Accept-Language": "en-US,en;q=0.9",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      redirect: "follow",
      signal: controller.signal,
    });
    const body = await res.text();
    const verdict = classifyResponse({ asin, status: res.status, finalUrl: res.url, body });
    return { slug, name, asin, ...verdict };
  } catch (err) {
    return {
      slug,
      name,
      asin,
      state: "unverified",
      notes: `Fetch error: ${err instanceof Error ? err.message : String(err)}`,
    };
  } finally {
    clearTimeout(timer);
  }
}

async function runPool(items, worker, concurrency) {
  const results = new Array(items.length);
  let cursor = 0;
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (cursor < items.length) {
      const i = cursor++;
      results[i] = await worker(items[i]);
    }
  });
  await Promise.all(workers);
  return results;
}

async function main() {
  const [remap, printers] = await Promise.all([loadRemapAsins(), loadPrinters()]);
  const targets = printers.filter((p) => !remap.has(p.asin));
  const skipped = printers.length - targets.length;

  console.log(
    `Verifying ${targets.length} ASINs against Amazon (${skipped} already in ASIN_REMAP)...`,
  );

  const start = Date.now();
  const results = await runPool(targets, checkAsin, CONCURRENCY);
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
  console.log(`  ✅ Verified:   ${verified.length}`);
  console.log(`  ⚠️  Broken:     ${broken.length}`);
  console.log(`  ❓ Unverified: ${unverified.length}`);

  if (broken.length > 0) {
    console.log("\nBroken ASINs (add to ASIN_REMAP in src/lib/amazon-affiliate.ts):");
    for (const r of broken) {
      console.log(`  ${r.asin}  ${r.slug.padEnd(36)}  ${r.notes}`);
    }
  }

  if (VERBOSE && unverified.length > 0) {
    console.log("\nUnverified ASINs (re-run from US IP to confirm):");
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
