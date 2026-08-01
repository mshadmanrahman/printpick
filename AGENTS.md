<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# PrintPick

3D printer reviews and comparisons. Next.js App Router, Tailwind 4, shadcn/ui, TypeScript. Deploys to Vercel on push to `main`. Live: https://printpick.dev

Product framing lives in `PRODUCT.md`, visual system in `DESIGN.md`. Read those before changing tone or UI.

## Commands

```
npm run dev              # local at :3000
npm run build            # must pass before push
npm run lint             # eslint, zero errors
npm run test:affiliate   # affiliate event test
npm run catalog:refresh  # see docs/runbooks/weekly-catalog-refresh.md
npm run verify:amazon    # ASIN validity check
```

## Formatting: never reformat untouched lines

**This repo has no prettier and no format-on-save config.** If your editor or agent runtime applies one, it will silently reflow code you never intended to change. This happened on 2026-07-31: roughly 19 hunks of untouched code in two route files were reformatted alongside a small SEO fix, and both files had to be rebuilt from HEAD.

Before committing, read the full diff. Every changed line must trace to the task. If the diff contains reflowed code you did not write, rebuild the file from HEAD and reapply only the intended edit.

## Data is the source of truth

Printer specs and prices live in `src/data/`:

- `printers.ts`: the main database, canonical for price and specs
- `new-printers-2026.ts`: staging for new entries until validated
- `blog-posts.ts`: post bodies
- `indexable-comparisons.ts`, `tier-picks.ts`, `tool-data.ts`

When a blog post states a price or a speed, it must match `printers.ts`. Prose and data drift apart silently because nothing enforces the link. Known open drift: the surviving QIDI X-Plus 3 post quotes $599 / 350mm/s while `printers.ts` says $449 / 600mm/s, which inverts the post's value argument. Not yet fixed.

## SEO changes: pull fresh GSC data first

Never decide an SEO fix from page structure alone. Two URLs that look identically cannibalized need opposite treatment depending on real demand:

- **Split demand** (both URLs get impressions): keep both, retitle to the distinct query language, add a differences table, link both directions.
- **Zero demand** (neither URL gets impressions in the current window): delete one and 308-redirect it.

Get live numbers with `node scripts/gsc-export-csv.mjs`. The snapshots committed under `reports/` stop at 2026-06-14 and will mislead you.

Other SEO scripts: `scripts/gsc-monitor.mjs`, `scripts/submit-urls.mjs`, `scripts/discover-missing-asins.mjs`.

## Before declaring anything shipped

Build and lint clean, push to `main`, confirm the Vercel deploy reached Ready, then fetch the live URL and grep for a fingerprint of the change. "Merged" is not "shipped."
