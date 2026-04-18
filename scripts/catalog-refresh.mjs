#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");

const DEFAULT_CATALOG_OUTPUT = path.join(REPO_ROOT, "src", "data", "catalog", "printer-catalog.json");
const DEFAULT_QA_REPORT_OUTPUT = path.join(REPO_ROOT, "reports", "catalog-qa-report.json");
const DEFAULT_STALE_DAYS = 30;
const SOURCE_DATASET = "src/data/printers.ts";
const REQUIRED_FIELDS = ["slug", "name", "brand", "type", "image", "price", "amazonAsin"];

function parseArgs(argv) {
  const args = {
    catalogOutput: DEFAULT_CATALOG_OUTPUT,
    qaOutput: DEFAULT_QA_REPORT_OUTPUT,
    staleDays: DEFAULT_STALE_DAYS,
    verificationFile: null,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--output") {
      args.catalogOutput = resolveRepoPath(argv[++i]);
      continue;
    }
    if (arg === "--qa-output") {
      args.qaOutput = resolveRepoPath(argv[++i]);
      continue;
    }
    if (arg === "--verification-file") {
      args.verificationFile = resolveRepoPath(argv[++i]);
      continue;
    }
    if (arg === "--stale-days") {
      const parsed = Number.parseInt(argv[++i], 10);
      if (!Number.isInteger(parsed) || parsed < 0) {
        throw new Error(`Invalid --stale-days value: ${argv[i]}`);
      }
      args.staleDays = parsed;
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      printHelpAndExit(0);
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  return args;
}

function printHelpAndExit(code) {
  const lines = [
    "Usage: node scripts/catalog-refresh.mjs [options]",
    "",
    "Options:",
    "  --output <path>              Catalog JSON output path",
    "  --qa-output <path>           QA report JSON output path",
    "  --verification-file <path>   Optional ASIN verification JSON input",
    `  --stale-days <days>          Stale threshold in days (default: ${DEFAULT_STALE_DAYS})`,
    "  --help                       Show this help",
  ];
  console.log(lines.join("\n"));
  process.exit(code);
}

function resolveRepoPath(value) {
  if (!value) {
    throw new Error("Missing value for argument");
  }
  return path.isAbsolute(value) ? value : path.join(REPO_ROOT, value);
}

async function readJsonIfExists(filePath, fallbackValue) {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return fallbackValue;
    }
    throw error;
  }
}

async function ensureParentDir(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

function hashJson(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function isMissing(value) {
  if (value === null || value === undefined) {
    return true;
  }
  if (typeof value === "string") {
    return value.trim().length === 0;
  }
  if (typeof value === "number") {
    return Number.isNaN(value);
  }
  return false;
}

function normalizeIsoDate(value) {
  if (!value) {
    return null;
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.valueOf())) {
    return null;
  }
  return parsed.toISOString();
}

function normalizeVerificationState(rawState) {
  if (typeof rawState !== "string") {
    return null;
  }
  const state = rawState.trim().toLowerCase();
  if (state === "verified") {
    return "verified";
  }
  if (state === "unverified") {
    return "unverified";
  }
  if (state === "needs_review" || state === "needs-review" || state === "invalid") {
    return "needs_review";
  }
  return null;
}

function toComparableNumber(value) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeVerificationMap(rawVerification) {
  const bySlug = new Map();
  const byAsin = new Map();
  if (!rawVerification) {
    return { bySlug, byAsin };
  }

  const entries = Array.isArray(rawVerification)
    ? rawVerification
    : Array.isArray(rawVerification.records)
      ? rawVerification.records
      : [];

  for (const record of entries) {
    if (!record || typeof record !== "object") {
      continue;
    }
    const slug = typeof record.slug === "string" ? record.slug.trim() : "";
    const asin = typeof record.asin === "string" ? record.asin.trim().toUpperCase() : "";
    const state = normalizeVerificationState(record.state ?? record.status);
    const lastVerifiedAt = normalizeIsoDate(record.lastVerifiedAt ?? record.verifiedAt ?? record.updatedAt);
    const notes = typeof record.notes === "string" ? record.notes.trim() : "";

    if (!state && !lastVerifiedAt && !notes) {
      continue;
    }

    const normalized = {
      state: state ?? "unverified",
      lastVerifiedAt,
      notes: notes || null,
    };

    if (slug) {
      bySlug.set(slug, normalized);
    }
    if (asin) {
      byAsin.set(asin, normalized);
    }
  }
  return { bySlug, byAsin };
}

function compilePrinterSourceData() {
  const tmpDir = path.join(REPO_ROOT, ".tmp-catalog-refresh");
  const tscBin = path.join(REPO_ROOT, "node_modules", ".bin", "tsc");

  execFileSync(
    tscBin,
    [
      "src/data/printers.ts",
      "src/data/new-printers-2026.ts",
      "--outDir",
      tmpDir,
      "--module",
      "commonjs",
      "--target",
      "ES2020",
      "--moduleResolution",
      "node",
      "--skipLibCheck",
      "--declaration",
      "false",
      "--pretty",
      "false",
    ],
    { cwd: REPO_ROOT, stdio: "pipe" },
  );

  const requireFromTmp = createRequire(path.join(tmpDir, "index.js"));
  const moduleExports = requireFromTmp("./printers.js");
  return {
    printers: moduleExports.printers ?? [],
    cleanup: async () => {
      await fs.rm(tmpDir, { recursive: true, force: true });
    },
  };
}

function createBasePayload(printer) {
  return {
    slug: printer.slug,
    name: printer.name,
    brand: printer.brand,
    type: printer.type,
    image: printer.image,
    price: toComparableNumber(printer.price),
    amazonAsin: printer.amazonAsin,
    metadata: {
      buildVolume: {
        x: toComparableNumber(printer.buildVolume?.x),
        y: toComparableNumber(printer.buildVolume?.y),
        z: toComparableNumber(printer.buildVolume?.z),
      },
      layerResolution: {
        min: toComparableNumber(printer.layerResolution?.min),
        max: toComparableNumber(printer.layerResolution?.max),
      },
      printSpeed: toComparableNumber(printer.printSpeed),
      weight: toComparableNumber(printer.weight),
      bestFor: Array.isArray(printer.bestFor) ? [...printer.bestFor] : [],
      features: Array.isArray(printer.features) ? [...printer.features] : [],
      scores: {
        value: toComparableNumber(printer.scores?.value),
        beginner: toComparableNumber(printer.scores?.beginner),
        printQuality: toComparableNumber(printer.scores?.printQuality),
        speed: toComparableNumber(printer.scores?.speed),
        reliability: toComparableNumber(printer.scores?.reliability),
      },
      summary: typeof printer.summary === "string" ? printer.summary : "",
      verdict: typeof printer.verdict === "string" ? printer.verdict : "",
    },
  };
}

function findMissingRequiredFields(payload) {
  const missing = [];
  for (const field of REQUIRED_FIELDS) {
    if (isMissing(payload[field])) {
      missing.push(field);
    }
  }
  return missing;
}

function addDaysSince(dateIso, nowMs) {
  if (!dateIso) {
    return null;
  }
  const parsed = new Date(dateIso);
  if (Number.isNaN(parsed.valueOf())) {
    return null;
  }
  return Math.floor((nowMs - parsed.valueOf()) / (24 * 60 * 60 * 1000));
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const now = new Date().toISOString();
  const nowMs = Date.now();

  const verificationInput = args.verificationFile
    ? await readJsonIfExists(args.verificationFile, null)
    : null;
  const verificationMap = normalizeVerificationMap(verificationInput);

  const existingStore = await readJsonIfExists(args.catalogOutput, {
    version: 1,
    records: [],
  });
  const existingBySlug = new Map(
    Array.isArray(existingStore.records)
      ? existingStore.records.map((record) => [record.slug, record])
      : [],
  );

  const { printers, cleanup } = compilePrinterSourceData();
  if (!Array.isArray(printers) || printers.length === 0) {
    throw new Error("No printers found from source data compilation.");
  }

  let inserted = 0;
  let updated = 0;
  let unchanged = 0;
  const seenSlugs = new Set();
  const mergedRecords = [];
  const missingFieldRows = [];
  const asinToSlugs = new Map();

  for (const printer of printers) {
    const slug = typeof printer.slug === "string" ? printer.slug.trim() : "";
    if (!slug) {
      continue;
    }
    if (seenSlugs.has(slug)) {
      continue;
    }
    seenSlugs.add(slug);

    const payload = createBasePayload(printer);
    const missingRequiredFields = findMissingRequiredFields(payload);
    if (missingRequiredFields.length > 0) {
      missingFieldRows.push({ slug, missingRequiredFields });
    }

    const asinKey = typeof payload.amazonAsin === "string" ? payload.amazonAsin.trim().toUpperCase() : "";
    if (asinKey) {
      const rows = asinToSlugs.get(asinKey) ?? [];
      rows.push(slug);
      asinToSlugs.set(asinKey, rows);
    }

    const prev = existingBySlug.get(slug);
    const verification =
      verificationMap.bySlug.get(slug) ??
      (asinKey ? verificationMap.byAsin.get(asinKey) : null) ??
      null;
    const validationState =
      verification?.state ??
      prev?.validation?.state ??
      "unverified";
    const lastVerifiedAt =
      normalizeIsoDate(verification?.lastVerifiedAt) ??
      normalizeIsoDate(prev?.validation?.lastVerifiedAt) ??
      null;
    const verificationNotes =
      verification?.notes ??
      prev?.validation?.notes ??
      null;

    const sourceHash = hashJson(payload);
    const previousHash = typeof prev?.source?.hash === "string" ? prev.source.hash : null;
    const sameSource = previousHash === sourceHash;
    const sameValidation =
      prev?.validation?.state === validationState &&
      normalizeIsoDate(prev?.validation?.lastVerifiedAt) === lastVerifiedAt &&
      (prev?.validation?.notes ?? null) === verificationNotes;

    const createdAt = normalizeIsoDate(prev?.timestamps?.createdAt) ?? now;
    const updatedAt =
      prev && sameSource && sameValidation
        ? normalizeIsoDate(prev?.timestamps?.updatedAt) ?? createdAt
        : now;

    if (!prev) {
      inserted += 1;
    } else if (sameSource && sameValidation) {
      unchanged += 1;
    } else {
      updated += 1;
    }

    mergedRecords.push({
      ...payload,
      validation: {
        state: validationState,
        lastVerifiedAt,
        notes: verificationNotes,
      },
      qa: {
        missingRequiredFields,
      },
      timestamps: {
        createdAt,
        updatedAt,
      },
      source: {
        dataset: SOURCE_DATASET,
        hash: sourceHash,
      },
    });
  }

  await cleanup();

  mergedRecords.sort((a, b) => a.slug.localeCompare(b.slug));

  const duplicateAsins = [...asinToSlugs.entries()]
    .filter(([, slugs]) => slugs.length > 1)
    .map(([asin, slugs]) => ({ asin, slugs: slugs.sort() }))
    .sort((a, b) => a.asin.localeCompare(b.asin));

  const staleRecords = mergedRecords
    .map((record) => {
      const daysSinceUpdated = addDaysSince(record.timestamps.updatedAt, nowMs);
      const daysSinceVerification = addDaysSince(record.validation.lastVerifiedAt, nowMs);
      const staleByUpdate = typeof daysSinceUpdated === "number" && daysSinceUpdated > args.staleDays;
      const staleByVerification =
        record.validation.state === "verified"
          ? typeof daysSinceVerification === "number" && daysSinceVerification > args.staleDays
          : true;
      if (!staleByUpdate && !staleByVerification) {
        return null;
      }
      return {
        slug: record.slug,
        validationState: record.validation.state,
        lastVerifiedAt: record.validation.lastVerifiedAt,
        daysSinceUpdated,
        daysSinceVerification,
        reasons: [
          ...(staleByUpdate ? [`updated>${args.staleDays}d`] : []),
          ...(staleByVerification ? [`verification>${args.staleDays}d_or_missing`] : []),
        ],
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.slug.localeCompare(b.slug));

  const countsByValidationState = mergedRecords.reduce(
    (acc, row) => {
      acc[row.validation.state] = (acc[row.validation.state] ?? 0) + 1;
      return acc;
    },
    {
      verified: 0,
      unverified: 0,
      needs_review: 0,
    },
  );

  const catalogStore = {
    version: 1,
    generatedAt: now,
    sourceDataset: SOURCE_DATASET,
    totalRecords: mergedRecords.length,
    stats: {
      inserted,
      updated,
      unchanged,
    },
    countsByValidationState,
    records: mergedRecords,
  };

  const qaReport = {
    generatedAt: now,
    sourceDataset: SOURCE_DATASET,
    staleThresholdDays: args.staleDays,
    totals: {
      records: mergedRecords.length,
      duplicateAsins: duplicateAsins.length,
      rowsWithMissingRequiredFields: missingFieldRows.length,
      staleRecords: staleRecords.length,
    },
    duplicateAsins,
    missingRequiredFields: missingFieldRows,
    staleRecords,
  };

  await ensureParentDir(args.catalogOutput);
  await ensureParentDir(args.qaOutput);
  await fs.writeFile(args.catalogOutput, `${JSON.stringify(catalogStore, null, 2)}\n`, "utf8");
  await fs.writeFile(args.qaOutput, `${JSON.stringify(qaReport, null, 2)}\n`, "utf8");

  console.log(
    JSON.stringify(
      {
        catalogOutput: path.relative(REPO_ROOT, args.catalogOutput),
        qaOutput: path.relative(REPO_ROOT, args.qaOutput),
        totalRecords: mergedRecords.length,
        inserted,
        updated,
        unchanged,
        duplicateAsins: duplicateAsins.length,
        missingRequiredRows: missingFieldRows.length,
        staleRecords: staleRecords.length,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
