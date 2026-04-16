# PrintPick

3D printer reviews and comparisons. No affiliate fluff, no paid rankings. Just honest picks based on real specs and community feedback.

Built with Next.js. Covers FDM and resin printers across every budget.

## Running locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- Next.js (App Router)
- Tailwind CSS
- Shadcn/ui components
- Printer data in `/src/data/`

## What's in the data

Each printer entry includes: price, build volume, speeds, scores across 5 dimensions, pros/cons, community badges, and a verdict. New entries live in `src/data/new-printers-2026.ts` until they're validated and merged into the main database.

## Deploying

Vercel. Push to main and it ships.
