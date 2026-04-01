#!/usr/bin/env node
/**
 * PrintPick GSC Monitor
 *
 * Checks indexing status for priority pages and pulls search analytics.
 * Requires: googleapis (dev dependency) + service account with GSC Full access.
 *
 * Setup:
 *   1. Enable "Google Search Console API" in GCP
 *   2. Create service account, download JSON key to secrets/gsc-service-account.json
 *   3. Add service account email as Full user in GSC for printpick.dev
 *
 * Usage:
 *   node scripts/gsc-monitor.mjs                    # Full report
 *   node scripts/gsc-monitor.mjs --indexing-only     # Just indexing check
 *   node scripts/gsc-monitor.mjs --analytics-only    # Just search analytics
 */

import { google } from "googleapis";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

/* ── Config ───────────────────────────────────────── */

const SITE_URL = "sc-domain:printpick.dev";

const KEY_PATH =
  process.env.GSC_KEY_FILE ||
  resolve(import.meta.dirname, "../secrets/gsc-service-account.json");

const PRIORITY_URLS = [
  "https://printpick.dev/",
  "https://printpick.dev/best",
  "https://printpick.dev/compare",
  "https://printpick.dev/blog",
  "https://printpick.dev/tools/finder",
  "https://printpick.dev/tools/cost-estimator",
  "https://printpick.dev/tools/fdm-vs-resin",
  "https://printpick.dev/tools/noise",
  "https://printpick.dev/tools/build-volume",
  "https://printpick.dev/tools/materials",
  "https://printpick.dev/tools/upgrade",
  "https://printpick.dev/blog/best-3d-printers-beginners-2026",
  "https://printpick.dev/blog/best-budget-3d-printers-under-300",
  "https://printpick.dev/blog/best-resin-3d-printers-2026",
  "https://printpick.dev/blog/best-quiet-3d-printers-apartments-2026",
  "https://printpick.dev/blog/is-resin-3d-printing-safe-indoors",
  "https://printpick.dev/blog/best-3d-printers-dnd-miniatures-under-300",
  "https://printpick.dev/blog/bambu-lab-p2s-vs-p1s-comparison",
  "https://printpick.dev/printers/bambu-lab-a1-combo",
  "https://printpick.dev/printers/bambu-lab-p2s",
  "https://printpick.dev/printers/elegoo-centauri-carbon",
  "https://printpick.dev/printers/creality-sparkx-i7",
  "https://printpick.dev/compare/bambu-lab-p1s-vs-bambu-lab-p2s",
  "https://printpick.dev/compare/bambu-lab-a1-combo-vs-creality-sparkx-i7",
  "https://printpick.dev/compare/elegoo-centauri-carbon-vs-elegoo-centauri-carbon-2-combo",
];

/* ── Auth ─────────────────────────────────────────── */

function getAuth() {
  if (!existsSync(KEY_PATH)) {
    console.error(`❌ Service account key not found at: ${KEY_PATH}`);
    console.error("   Download it from GCP Console → IAM → Service Accounts → Keys");
    console.error("   Or set GSC_KEY_FILE env var to the path.");
    process.exit(1);
  }

  return new google.auth.GoogleAuth({
    keyFile: KEY_PATH,
    scopes: ["https://www.googleapis.com/auth/webmasters"],
  });
}

/* ── Indexing check ───────────────────────────────── */

async function checkIndexing(searchconsole, urls) {
  console.log(`\n🔍 INDEXING STATUS (${urls.length} priority pages)\n`);

  const results = { indexed: [], crawled: [], discovered: [], error: [], other: [] };

  for (const url of urls) {
    try {
      const res = await searchconsole.urlInspection.index.inspect({
        requestBody: {
          inspectionUrl: url,
          siteUrl: SITE_URL,
        },
      });

      const inspection = res.data.inspectionResult;
      const coverage = inspection?.indexStatusResult?.coverageState ?? "Unknown";
      const verdict = inspection?.indexStatusResult?.verdict ?? "UNKNOWN";

      let icon;
      if (verdict === "PASS") {
        icon = "✅";
        results.indexed.push(url);
      } else if (coverage.includes("Crawled")) {
        icon = "⏳";
        results.crawled.push(url);
      } else if (coverage.includes("Discovered")) {
        icon = "🔍";
        results.discovered.push(url);
      } else {
        icon = "⚠️";
        results.other.push(url);
      }

      const shortUrl = url.replace("https://printpick.dev", "");
      console.log(`  ${icon} ${shortUrl || "/"} — ${coverage}`);

      // Respect rate limits (600/day ≈ 1 per 2.4 seconds minimum)
      await sleep(1500);
    } catch (err) {
      const shortUrl = url.replace("https://printpick.dev", "");
      console.log(`  ❌ ${shortUrl} — Error: ${err.message?.slice(0, 80)}`);
      results.error.push(url);
    }
  }

  console.log(`\n  Summary:`);
  console.log(`  ✅ Indexed:     ${results.indexed.length}`);
  console.log(`  ⏳ Crawled:     ${results.crawled.length}`);
  console.log(`  🔍 Discovered:  ${results.discovered.length}`);
  if (results.other.length) console.log(`  ⚠️  Other:       ${results.other.length}`);
  if (results.error.length) console.log(`  ❌ Errors:      ${results.error.length}`);

  return results;
}

/* ── Search analytics ─────────────────────────────── */

async function getAnalytics(webmasters, days = 7) {
  const end = new Date();
  const start = new Date(end);
  start.setDate(start.getDate() - days);

  const fmt = (d) => d.toISOString().split("T")[0];

  console.log(`\n📈 SEARCH ANALYTICS (Last ${days} days: ${fmt(start)} → ${fmt(end)})\n`);

  // Overall totals
  try {
    const totals = await webmasters.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: fmt(start),
        endDate: fmt(end),
        type: "web",
        rowLimit: 1,
      },
    });

    const rows = totals.data.rows ?? [];
    if (rows.length === 0) {
      console.log("  No data yet — Google needs 2-4 weeks after indexing to show analytics.");
      console.log("  Check back in a week!\n");
      return;
    }
  } catch (err) {
    if (err.code === 403) {
      console.log("  ⚠️  No analytics data available yet (property too new).\n");
      return;
    }
    throw err;
  }

  // Top queries
  try {
    const queries = await webmasters.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: fmt(start),
        endDate: fmt(end),
        dimensions: ["query"],
        type: "web",
        rowLimit: 15,
        dataState: "all",
      },
    });

    const qRows = queries.data.rows ?? [];
    if (qRows.length > 0) {
      let totalClicks = 0;
      let totalImpressions = 0;
      qRows.forEach((r) => {
        totalClicks += r.clicks;
        totalImpressions += r.impressions;
      });

      console.log(`  Total: ${totalImpressions} impressions, ${totalClicks} clicks\n`);
      console.log("  Top queries:");
      console.log("  " + "-".repeat(80));
      console.log(
        "  " +
          "Query".padEnd(45) +
          "Impr".padStart(8) +
          "Clicks".padStart(8) +
          "CTR".padStart(8) +
          "Pos".padStart(8),
      );
      console.log("  " + "-".repeat(80));

      for (const row of qRows) {
        const query = row.keys[0].padEnd(45).slice(0, 45);
        const impr = String(row.impressions).padStart(8);
        const clicks = String(row.clicks).padStart(8);
        const ctr = (row.ctr * 100).toFixed(1).padStart(7) + "%";
        const pos = row.position.toFixed(1).padStart(8);
        console.log(`  ${query}${impr}${clicks}${ctr}${pos}`);
      }
    } else {
      console.log("  No query data yet.\n");
    }
  } catch {
    console.log("  Could not fetch query data.\n");
  }

  // Top pages
  try {
    const pages = await webmasters.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: fmt(start),
        endDate: fmt(end),
        dimensions: ["page"],
        type: "web",
        rowLimit: 10,
        dataState: "all",
      },
    });

    const pRows = pages.data.rows ?? [];
    if (pRows.length > 0) {
      console.log("\n  Top pages:");
      console.log("  " + "-".repeat(80));
      for (const row of pRows) {
        const page = row.keys[0].replace("https://printpick.dev", "").padEnd(50).slice(0, 50);
        const impr = String(row.impressions).padStart(6);
        const clicks = String(row.clicks).padStart(6);
        console.log(`  ${page} ${impr} impr  ${clicks} clicks`);
      }
    }
  } catch {
    // skip
  }

  console.log();
}

/* ── Helpers ──────────────────────────────────────── */

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/* ── Main ─────────────────────────────────────────── */

async function main() {
  const args = process.argv.slice(2);
  const indexingOnly = args.includes("--indexing-only");
  const analyticsOnly = args.includes("--analytics-only");

  console.log("📊 PrintPick GSC Monitor");
  console.log(`   ${new Date().toISOString().split("T")[0]}`);

  const auth = getAuth();
  const searchconsole = google.searchconsole({ version: "v1", auth });
  const webmasters = google.webmasters({ version: "v3", auth });

  // Verify access
  try {
    const sites = await webmasters.sites.list();
    const siteList = sites.data.siteEntry ?? [];
    const hasPrintpick = siteList.some(
      (s) => s.siteUrl === SITE_URL || s.siteUrl === "https://printpick.dev/",
    );
    if (!hasPrintpick) {
      console.error("❌ Service account does not have access to printpick.dev in GSC.");
      console.error("   Add the service account email as a Full user in GSC → Settings → Users.");
      process.exit(1);
    }
    console.log("   ✅ GSC access verified\n");
  } catch (err) {
    console.error(`❌ Failed to verify GSC access: ${err.message}`);
    process.exit(1);
  }

  if (!analyticsOnly) {
    await checkIndexing(searchconsole, PRIORITY_URLS);
  }

  if (!indexingOnly) {
    await getAnalytics(webmasters, 7);
    await getAnalytics(webmasters, 28);
  }

  console.log("✅ Done.");
}

main().catch((err) => {
  console.error(`\n❌ Fatal error: ${err.message}`);
  if (err.code === 401 || err.code === 403) {
    console.error("   Check that the service account key is valid and has GSC Full permissions.");
  }
  process.exit(1);
});
