#!/usr/bin/env node
import { google } from "googleapis";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const SITE_URL = "sc-domain:printpick.dev";
const DEFAULT_KEY_PATH = resolve(import.meta.dirname, "../secrets/gsc-service-account.json");
const KEY_PATH = process.env.GSC_KEY_FILE || (existsSync(DEFAULT_KEY_PATH) ? DEFAULT_KEY_PATH : null);
// Falls back to <workspace>/_tools/printpick-analytics/gsc-csv relative to this repo,
// so no absolute developer path is baked in. Override with PRINTPICK_GSC_OUTDIR.
const OUTDIR =
  process.env.PRINTPICK_GSC_OUTDIR ||
  resolve(import.meta.dirname, "../../../_tools/printpick-analytics/gsc-csv");

function ymd(d) {
  return d.toISOString().split("T")[0];
}

function csvEscape(v) {
  if (v === undefined || v === null) return "";
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
}

function getAuth() {
  const opts = { scopes: ["https://www.googleapis.com/auth/webmasters"] };
  if (KEY_PATH) opts.keyFile = KEY_PATH;
  return new google.auth.GoogleAuth(opts);
}

async function query(webmasters, startDate, endDate, dimensions) {
  const res = await webmasters.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: {
      startDate,
      endDate,
      dimensions,
      rowLimit: 25000,
      dataState: "final",
      type: "web",
    },
  });
  return res.data.rows ?? [];
}

function save(name, rows, dimensions) {
  const header = [...dimensions, "clicks", "impressions", "ctr", "position"];
  const lines = [header.map(csvEscape).join(",")];
  for (const row of rows) {
    lines.push([
      ...(row.keys ?? []),
      row.clicks,
      row.impressions,
      row.ctr,
      row.position,
    ].map(csvEscape).join(","));
  }
  const path = resolve(OUTDIR, name);
  writeFileSync(path, lines.join("\n") + "\n");
  return path;
}

async function main() {
  mkdirSync(OUTDIR, { recursive: true });
  const end = new Date();
  end.setDate(end.getDate() - 2);
  const start = new Date(end);
  start.setDate(start.getDate() - 27);
  const prevEnd = new Date(start);
  prevEnd.setDate(prevEnd.getDate() - 1);
  const prevStart = new Date(prevEnd);
  prevStart.setDate(prevStart.getDate() - 27);

  const auth = getAuth();
  const webmasters = google.webmasters({ version: "v3", auth });
  const periods = [
    ["current", start, end],
    ["previous", prevStart, prevEnd],
  ];
  const dims = {
    query: ["query"],
    page: ["page"],
    page_query: ["page", "query"],
    country: ["country"],
    device: ["device"],
  };

  const files = [];
  for (const [label, s, e] of periods) {
    for (const [name, dimensions] of Object.entries(dims)) {
      const rows = await query(webmasters, ymd(s), ymd(e), dimensions);
      files.push(save(`${label}_${name}_${ymd(s)}_${ymd(e)}.csv`, rows, dimensions));
    }
  }

  const summary = {
    site: SITE_URL,
    current: { start: ymd(start), end: ymd(end) },
    previous: { start: ymd(prevStart), end: ymd(prevEnd) },
    outdir: OUTDIR,
    files,
  };
  writeFileSync(resolve(OUTDIR, "summary.json"), JSON.stringify(summary, null, 2) + "\n");
  console.log(JSON.stringify(summary, null, 2));
  console.log("OUTDIR", OUTDIR);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
