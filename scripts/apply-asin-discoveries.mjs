#!/usr/bin/env node
/**
 * Applies ASIN discovery results to the catalog.
 *
 * Reads one or more discovery JSON files (output of agent batches), groups
 * entries by confidence, and rewrites amazonAsin fields in the TS data
 * sources + the printer-catalog.json mirror.
 *
 * High-confidence: applied automatically.
 * Medium-confidence: applied with --include-medium (default off).
 * Low/null: never applied; reported only.
 *
 * After applying, run `node scripts/verify-amazon-asins.mjs --all` to
 * second-pass-validate the new ASINs against live Amazon.
 *
 * Usage:
 *   node scripts/apply-asin-discoveries.mjs /tmp/printpick_asin_discovery_batch_*.json
 *   node scripts/apply-asin-discoveries.mjs --include-medium /tmp/printpick_asin_discovery_batch_*.json
 *   node scripts/apply-asin-discoveries.mjs --dry-run /tmp/...json
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { glob } from "node:fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..");
const TARGET_PATHS = [
  path.join(REPO_ROOT, "src/data/printers.ts"),
  path.join(REPO_ROOT, "src/data/new-printers-2026.ts"),
  path.join(REPO_ROOT, "src/data/catalog/printer-catalog.json"),
];

const args = process.argv.slice(2);
const INCLUDE_MEDIUM = args.includes("--include-medium");
const DRY_RUN = args.includes("--dry-run");
const fileArgs = args.filter((a) => !a.startsWith("--"));

if (fileArgs.length === 0) {
  console.error("Usage: apply-asin-discoveries.mjs [--include-medium] [--dry-run] <file>...");
  process.exit(1);
}

async function loadAll() {
  const out = [];
  for (const f of fileArgs) {
    const arr = JSON.parse(await fs.readFile(f, "utf8"));
    if (!Array.isArray(arr)) throw new Error(`${f} is not an array`);
    out.push(...arr);
  }
  return out;
}

function partition(records) {
  const apply = [];
  const skipped = [];
  for (const r of records) {
    if (!r.newAsin) {
      skipped.push({ ...r, reason: "null newAsin" });
      continue;
    }
    if (r.confidence === "high") {
      apply.push(r);
    } else if (r.confidence === "medium" && INCLUDE_MEDIUM) {
      apply.push(r);
    } else {
      skipped.push({ ...r, reason: `confidence=${r.confidence}` });
    }
  }
  return { apply, skipped };
}

async function applyOne(filePath, swaps) {
  let src = await fs.readFile(filePath, "utf8");
  let n = 0;
  for (const { oldAsin, newAsin } of swaps) {
    const needle = `"${oldAsin}"`;
    if (src.includes(needle)) {
      src = src.replace(needle, `"${newAsin}"`);
      n++;
    }
  }
  if (!DRY_RUN) {
    await fs.writeFile(filePath, src);
  }
  return n;
}

async function main() {
  const all = await loadAll();
  const { apply, skipped } = partition(all);

  console.log(`Loaded ${all.length} records from ${fileArgs.length} file(s).`);
  console.log(`Applying ${apply.length} (high${INCLUDE_MEDIUM ? "+medium" : ""}-confidence).`);
  console.log(`Skipping ${skipped.length}:`);
  for (const s of skipped) console.log(`  ${s.slug} — ${s.reason} (oldAsin=${s.oldAsin})`);

  if (apply.length === 0) {
    console.log("\nNothing to apply. Exit.");
    return;
  }

  console.log("\nSwaps:");
  for (const r of apply) console.log(`  [${r.confidence}] ${r.slug}: ${r.oldAsin} -> ${r.newAsin}`);

  if (DRY_RUN) {
    console.log("\n--dry-run: no files modified.");
    return;
  }

  console.log("\nApplying...");
  for (const f of TARGET_PATHS) {
    const n = await applyOne(f, apply);
    console.log(`  ${f}: ${n}`);
  }
  console.log("\nDone. Next: node scripts/verify-amazon-asins.mjs --all");
}

main().catch((err) => {
  console.error("Fatal:", err.message);
  process.exit(1);
});
