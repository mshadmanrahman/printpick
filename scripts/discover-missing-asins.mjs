#!/usr/bin/env node
/**
 * Recovery helper for PrintPick ASIN drift.
 *
 * Reads the latest reports/asin-verification.json, lists all currently-broken
 * printers grouped into balanced batches, and prints a copy-pasteable agent
 * prompt for each batch. Hand the prompts to general-purpose Claude agents
 * (preferably 2-3 in parallel) and they will return JSON files with current
 * Amazon ASINs.
 *
 * After the agents finish, the apply step is just:
 *   node scripts/apply-asin-discoveries.mjs /tmp/printpick_asin_discovery_batch_*.json
 *
 * Usage:
 *   node scripts/discover-missing-asins.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..");
const REPORT_PATH = path.join(REPO_ROOT, "reports/asin-verification.json");
const PRINTERS_TS_PATHS = [
  path.join(REPO_ROOT, "src/data/printers.ts"),
  path.join(REPO_ROOT, "src/data/new-printers-2026.ts"),
];

const BATCH_SIZE = 10;

async function loadCatalogMeta() {
  const map = new Map();
  for (const p of PRINTERS_TS_PATHS) {
    const src = await fs.readFile(p, "utf8");
    const blocks = src.split(/\n  \{\n/).slice(1);
    for (const blk of blocks) {
      const slugM = blk.match(/slug:\s*"([^"]+)"/);
      const nameM = blk.match(/name:\s*"([^"]+)"/);
      const brandM = blk.match(/brand:\s*"([^"]+)"/);
      const asinM = blk.match(/amazonAsin:\s*"([A-Z0-9]+)"/);
      if (!slugM || !asinM) continue;
      map.set(slugM[1], {
        slug: slugM[1],
        name: nameM ? nameM[1] : slugM[1],
        brand: brandM ? brandM[1] : "",
        oldAsin: asinM[1],
      });
    }
  }
  return map;
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function batchLetter(i) {
  return String.fromCharCode("A".charCodeAt(0) + i);
}

function buildPrompt(letter, items) {
  const lines = items
    .map(
      (p, i) =>
        `${i + 1}. ${p.slug} | ${p.name} | brand: ${p.brand} | oldAsin: ${p.oldAsin}`,
    )
    .join("\n");
  return `You are doing focused affiliate research for PrintPick.dev. Find the current canonical Amazon US product ASIN for each printer below. The catalog has stale ASINs because Amazon 404s the old ones (slot recycling + product retirement).

## Procedure for EACH printer
1. WebSearch: \`"<printer name>" site:amazon.com 3D printer\`
2. Extract canonical product URL: \`amazon.com/dp/B0XXXXXXXX\` (10-char ASIN starting B0).
3. (Optional) WebFetch \`https://www.amazon.com/dp/{ASIN}\` to confirm. If bot-walled, rely on search snippet.
4. Slug with \`-combo\` → prefer combo SKU; otherwise standalone.

## Brand-match rule
Title MUST include both brand AND model. Reject aftermarket parts, accessories, "fits X printer," ASIN-recycled products. Example failure: B0C5KXMPZ8 was a Creality printer, today it's a dining mat.

## Time budget
Max 2 WebSearch + 1 WebFetch per printer. ~5 min total.

## DO NOT
- Modify the printpick repo.
- Click anything.
- Use international Amazon stores. US only.

## Output
Write JSON array to \`/tmp/printpick_asin_discovery_batch_${letter}.json\`. Schema per entry:
\`\`\`json
{
  "slug": "<slug>",
  "oldAsin": "<original>",
  "newAsin": "B0XXXXXXXX" or null,
  "matchedTitle": "<verbatim Amazon title>",
  "evidenceUrl": "https://www.amazon.com/dp/...",
  "confidence": "high" | "medium" | "low",
  "notes": "<short reasoning>"
}
\`\`\`

## Batch ${letter} (${items.length} printers)
${lines}

When done: reply with output path, tally, and any low-confidence entries.`;
}

async function main() {
  const report = JSON.parse(await fs.readFile(REPORT_PATH, "utf8"));
  const broken = report.records.filter((r) => r.state === "broken");

  if (broken.length === 0) {
    console.log("No broken ASINs in latest verifier report. Catalog is clean.");
    return;
  }

  const catalog = await loadCatalogMeta();
  const items = broken
    .map((r) => catalog.get(r.slug))
    .filter(Boolean);

  console.log(
    `${items.length} broken printer(s) need new ASINs. Splitting into ${Math.ceil(items.length / BATCH_SIZE)} batch(es) of up to ${BATCH_SIZE}.\n`,
  );

  const batches = chunk(items, BATCH_SIZE);
  for (let i = 0; i < batches.length; i++) {
    const letter = batchLetter(i);
    console.log(`\n${"=".repeat(72)}`);
    console.log(`BATCH ${letter} — paste the prompt below into a fresh Claude agent`);
    console.log(`${"=".repeat(72)}\n`);
    console.log(buildPrompt(letter, batches[i]));
  }

  console.log(
    `\n\n${"=".repeat(72)}\nAfter agents finish, apply with:\n  node scripts/apply-asin-discoveries.mjs /tmp/printpick_asin_discovery_batch_*.json\n${"=".repeat(72)}`,
  );
}

main().catch((err) => {
  console.error("Fatal:", err.message);
  process.exit(1);
});
