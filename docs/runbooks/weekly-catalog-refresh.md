# Weekly Catalog Refresh Runbook

This runbook refreshes the normalized PrintPick printer catalog from `src/data/printers.ts` and outputs QA checks required for the 50+ catalog workflow.

## Inputs

- Source catalog: `src/data/printers.ts` (+ `src/data/new-printers-2026.ts`)
- Optional ASIN verification input: `reports/asin-verification.json`

Expected verification row shape:

```json
[
  {
    "slug": "bambu-lab-a1-combo",
    "asin": "B0CJPKFQPN",
    "status": "verified",
    "lastVerifiedAt": "2026-04-01T00:00:00.000Z",
    "notes": "Validated manually against Amazon listing."
  }
]
```

`status` accepted values:
- `verified`
- `unverified`
- `needs_review` (or `invalid`, normalized to `needs_review`)

## Commands

Refresh catalog without verification input:

```bash
npm run catalog:refresh
```

Refresh catalog with verification input:

```bash
npm run catalog:refresh:verified
```

Custom paths / stale threshold:

```bash
node scripts/catalog-refresh.mjs \
  --verification-file reports/asin-verification.json \
  --output src/data/catalog/printer-catalog.json \
  --qa-output reports/catalog-qa-report.json \
  --stale-days 30
```

## Outputs

- Normalized catalog store: `src/data/catalog/printer-catalog.json`
- QA report: `reports/catalog-qa-report.json`

The QA report includes:

- duplicate ASIN detection
- missing required field rows
- stale record report (`verification > stale-days` or missing verification timestamp)

## Idempotent Upsert Behavior

Upsert identity is `slug`.

- New `slug`: inserted with fresh `createdAt` and `updatedAt`.
- Existing `slug` with unchanged source hash + unchanged validation metadata: preserved `updatedAt`.
- Existing `slug` with changed source or validation metadata: `updatedAt` refreshed.
- Existing `createdAt` is always preserved.

## Weekly Cadence

1. Pull latest changes to `src/data/printers.ts`.
2. Update `reports/asin-verification.json` from ASIN verification workflow.
3. Run `npm run catalog:refresh:verified`.
4. Review `reports/catalog-qa-report.json`.
5. Resolve any duplicates / missing required fields / stale verification rows before release.

