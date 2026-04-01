#!/usr/bin/env node
/**
 * PrintPick URL Submission Tool
 *
 * Pings Google & Bing sitemaps, submits all URLs via IndexNow,
 * and prints priority URLs for manual GSC submission.
 *
 * Usage:  node scripts/submit-urls.mjs
 * Run after each deployment for fastest indexing.
 */

const SITE_URL = "https://printpick.dev";
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
const INDEXNOW_KEY = "printpick2026indexnow";

/* ── Helpers ──────────────────────────────────────── */

async function fetchSitemapUrls() {
  const res = await fetch(SITEMAP_URL);
  const xml = await res.text();
  const urls = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = re.exec(xml)) !== null) urls.push(m[1]);
  return urls;
}

async function ping(label, url) {
  try {
    const res = await fetch(url);
    const ok = res.ok || res.status === 202;
    console.log(ok ? `   ✅ ${label} pinged` : `   ⚠️  ${label} returned ${res.status}`);
    return ok;
  } catch (e) {
    console.log(`   ❌ ${label} failed: ${e.message}`);
    return false;
  }
}

async function submitIndexNow(urls) {
  const body = JSON.stringify({
    host: "printpick.dev",
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls.slice(0, 10_000),
  });

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body,
    });
    const ok = res.ok || res.status === 202;
    console.log(
      ok
        ? `   ✅ IndexNow accepted (${res.status}) — ${Math.min(urls.length, 10_000)} URLs`
        : `   ⚠️  IndexNow returned ${res.status}. Ensure ${SITE_URL}/${INDEXNOW_KEY}.txt is deployed.`,
    );
  } catch (e) {
    console.log(`   ❌ IndexNow failed: ${e.message}`);
  }
}

/* ── Main ─────────────────────────────────────────── */

async function main() {
  console.log("🔍 PrintPick URL Submission Tool\n");

  // Fetch sitemap
  console.log("Fetching sitemap...");
  let urls;
  try {
    urls = await fetchSitemapUrls();
    console.log(`Found ${urls.length} URLs\n`);
  } catch {
    console.log("Could not fetch sitemap — using base URL only.\n");
    urls = [SITE_URL];
  }

  // 1. Ping Google
  console.log("1. Pinging Google...");
  await ping("Google", `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`);

  // 2. Ping Bing
  console.log("2. Pinging Bing...");
  await ping("Bing", `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`);

  // 3. IndexNow (Bing, Yandex, Seznam, Naver)
  console.log("3. Submitting to IndexNow...");
  await submitIndexNow(urls);

  // 4. Priority URLs for manual GSC submission
  const priority = urls
    .filter((u) => {
      const path = new URL(u).pathname;
      return (
        path === "/" ||
        path === "/best" ||
        path === "/blog" ||
        path === "/compare" ||
        path === "/tools/finder" ||
        path === "/tools/cost-estimator" ||
        path.startsWith("/blog/best-") ||
        path.startsWith("/blog/top-") ||
        (path.startsWith("/printers/") && path.includes("bambu"))
      );
    })
    .slice(0, 15);

  console.log(
    `\n4. Priority URLs for manual GSC submission (${priority.length}):`,
  );
  console.log(
    "   Open GSC → URL Inspection → paste URL → Request Indexing (max ~15/day)\n",
  );
  priority.forEach((u, i) => console.log(`   ${i + 1}. ${u}`));

  console.log("\n✅ Done. Run again after each deployment.");
}

main().catch(console.error);
