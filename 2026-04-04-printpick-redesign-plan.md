---

type: idea
date: 2026-04-04
status: reference
tags:
  - idea
  - brainstorm
---
# PrintPick Redesign Plan

**Created**: 2026-04-04
**Status**: Phase 0 complete (design context). Ready for Phase 1.
**Design contract**: `.impeccable.md` in project root

---

## Vision

Transform PrintPick from a clean-but-generic review site into an MKBHD-inspired, dark, image-driven affiliate experience that uses Apple's anchor pricing psychology to guide buyers toward confident (and slightly upgraded) purchase decisions.

**Funnel**: LAND → IDENTIFY → EXPLORE → COMPARE → BUY

---

## Data Model Changes

### Add `tier` field to Printer interface
```typescript
readonly tier: "first-printer" | "maker" | "professional" | "resin";
```

### New file: `src/data/tier-picks.ts`
```typescript
export type Tier = "first-printer" | "maker" | "professional" | "resin";

export const tierConfig: Record<Tier, {
  slug: Tier;
  label: string;
  tagline: string;
  description: string;
  priceRange: string;
  budgetPick: string;   // printer slug
  bestValue: string;    // printer slug
  stepUp: string;       // printer slug
}> = {
  "first-printer": {
    slug: "first-printer",
    label: "First Printer",
    tagline: "See what you can make",
    description: "Easy setup, reliable, great communities",
    priceRange: "$150–400",
    budgetPick: "bambu-lab-a1-mini",
    bestValue: "bambu-lab-a1-combo",
    stepUp: "bambu-lab-p1s",
  },
  "maker": {
    slug: "maker",
    label: "Maker",
    tagline: "Level up your builds",
    description: "More speed, more materials, more control",
    priceRange: "$300–700",
    budgetPick: "creality-ender-3-v3-ke",
    bestValue: "bambu-lab-p1s",
    stepUp: "bambu-lab-x1-carbon",
  },
  "professional": {
    slug: "professional",
    label: "Professional",
    tagline: "Precision and volume",
    description: "Engineering-grade filaments, enclosed chambers, reliability",
    priceRange: "$600+",
    budgetPick: "bambu-lab-p1s",
    bestValue: "bambu-lab-x1-carbon",
    stepUp: "qidi-x-plus-3",
  },
  "resin": {
    slug: "resin",
    label: "Resin",
    tagline: "Insane detail, tiny scale",
    description: "Miniatures, jewelry, dental, 20-micron layers",
    priceRange: "$200–600",
    budgetPick: "elegoo-mars-4-ultra",
    bestValue: "elegoo-saturn-4-ultra",
    stepUp: "anycubic-photon-mono-m5s",
  },
};
```

---

## Phase 1: Dark Mode Foundation + Design System

### What changes
- `globals.css`: Replace all `:root` color tokens with dark palette from `.impeccable.md`
- `globals.css`: Add Sora + Outfit font declarations via `--font-heading` and `--font-sans`
- `layout.tsx`: Update font imports to Sora + Outfit from Google Fonts
- Remove `.brand-gradient-text` (gradient text is an anti-pattern per design contract)
- Every component: Update Tailwind classes from light-assumed to dark-assumed (bg-white → bg-card, text-gray-900 → text-foreground, etc.)

### Files touched
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/components/printer-card.tsx`
- `src/components/printer-filters.tsx`
- `src/components/desktop-nav.tsx`
- `src/components/mobile-nav.tsx`
- `src/components/review-carousel.tsx`
- `src/components/search-command.tsx`
- `src/components/amazon-button.tsx`
- `src/components/community-badge.tsx`
- All page files under `src/app/`

### When done
Every page renders dark-first with the new color system, new fonts, and no visual regressions.

---

## Phase 2: Homepage Rebuild

### New structure
1. **Hero**: Dark gradient bg + CSS grain texture. "What will you build?" headline in Sora 800. Subline + trust signals. Two CTAs.
2. **Identity selector**: 4 cards (First Printer / Maker / Pro / Resin) with DALL-E print images as backgrounds. Price range + printer count on each. Links to tier pages.
3. **Social proof strip**: "Trusted by X makers" + community badge icons
4. **Editor's Picks**: Top 3 printers, redesigned cards with larger images on dark
5. **Tools section**: Restyled for dark theme (no glassmorphism)
6. **Categories**: Keep but restyle

### New components needed
- `src/components/identity-card.tsx`, the 4 persona selector cards
- `src/components/hero-section.tsx`, new homepage hero

### Files touched
- `src/app/page.tsx` (major rewrite)
- `src/components/printer-card.tsx` (visual refresh)
- New components above

---

## Phase 3: Tier Landing Pages

### New route: `/tier/[tier]/page.tsx`

### Structure per page
1. Tier hero with editorial copy (from REDESIGN-PLAN editorial section)
2. Anchor pricing section: Budget Pick → Best Value (★) → Step Up
3. Full catalog grid for that tier (filtered from printers.ts by tier field)
4. "Not sure?" CTA linking to Printer Finder quiz

### New components needed
- `src/components/anchor-pricing.tsx`, the 3-card upsell layout
- `src/components/tier-hero.tsx`, hero with editorial copy per tier

### Data changes
- Add `tier` field to all printers in `printers.ts`
- Create `tier-picks.ts` with curated picks per tier

---

## Phase 4: Printer Detail Page Refresh

### Changes
- Larger hero image (full-width with dark gradient overlay)
- Score visualization as horizontal fill bars (animated on scroll)
- "How does this compare?" section moved higher, showing 2-3 same-league printers with delta framing
- Sticky CTA on mobile
- Quick verdict badge (Editor's Choice / Best Value / Budget Pick)

### Files touched
- `src/app/printers/[slug]/page.tsx`
- New: `src/components/score-bars.tsx`
- New: `src/components/comparison-teaser.tsx`
- New: `src/components/sticky-cta.tsx`

---

## Phase 5: Comparison Enhancement

### Changes
- Overall winner declaration with reasoning
- "For $X more, you get..." delta framing section
- Share comparison URL prominently
- Restyle for dark theme

### Files touched
- `src/app/compare/comparison-tool.tsx`

---

## Editorial Copy (Ready to Use)

### Homepage
- Hero: "What will you build?"
- Sub: "50+ printers · 5 dimensions · zero sponsors"

### First Printer Tier
> You don't need the best printer on the market. You need one that works out of the box, doesn't punish mistakes, and makes you want to print again tomorrow.
>
> Every printer here scores 7+ on beginner-friendliness. They have auto bed leveling, don't require a PhD in firmware, and the communities behind them are massive, so when you Google "why is my first layer ugly," you'll find the answer in 30 seconds.
>
> Start here. Upgrade later when you know what you actually need.

### Maker Tier
> You've already got prints on your desk, filament dust on your floor, and opinions about bed adhesion. Now you want more, bigger build volumes, faster speeds, multi-material, or just fewer failed prints at 3am.
>
> These printers reward experience. They have features that don't matter to beginners but matter a lot to you: input shaping, direct drive extruders, enclosed chambers, Klipper firmware.
>
> You know what you're doing. Pick the tool that matches your ambition.

### Professional Tier
> This isn't a hobby purchase. You need dimensional accuracy, material versatility, and a machine that runs 12 hours without babysitting. Downtime costs money. Failed prints cost more.
>
> Every printer here handles engineering-grade filaments, carbon fiber, nylon, ASA, polycarbonate. Enclosed chambers, hardened nozzles, and filtration aren't luxuries at this level. They're requirements.
>
> These machines earn back their price.

### Resin Tier
> If you're here, you probably already know what you want, miniatures with skin texture you can see, jewelry casting masters, dental models, or cosplay pieces with surface finishes that look injection-molded.
>
> Resin printing is a different world from FDM. The resolution is absurd, we're talking 20-micron layers. But it comes with trade-offs: post-processing with isopropyl alcohol, UV curing, and handling liquid resin safely.
>
> Worth it? Look at the prints below and decide.

### Anchor pricing labels
- Budget: varies by tier (see editorial section in conversation)
- Best Value: "The one most people should get. Seriously." (universal)
- Step Up: "For $X more..." (dynamic, calculated from price delta)

---

## DALL-E Prompts (For Print Gallery Images)

Saved in: `_scratch/opensource/printpick/DALLE-PROMPTS.md` (append to existing file)

---

## Image Requirements

### Identity card backgrounds (4 needed)
One per tier. Shows PRINTS not printers, what you'll make, not what you'll buy.

### Tier page showcases (8 needed)
Two per tier. Variety of prints within that tier's use cases.

### Homepage hero (optional)
Dark maker workspace, atmospheric. CSS gradient may be sufficient.

---

## Switch Points

- **Opus**: Design decisions, editorial copy, architecture rethinking
- **Sonnet**: All file editing, component building, CSS work, git operations
- **Haiku**: Code review subagents, test runners

Start Phase 1 on Sonnet. Return to Opus if mid-build the tier architecture needs rethinking.

---
[[MOC - Side Projects]]
