---
name: PrintPick
description: Dark-first 3D-printer comparison and affiliate review site — MKBHD meets Wirecutter
colors:
  deep-navy-black: "oklch(0.13 0.015 250)"
  studio-surface: "oklch(0.17 0.012 250)"
  surface-elevated: "oklch(0.21 0.01 250)"
  off-white-ink: "oklch(0.95 0.005 250)"
  muted-text: "oklch(0.55 0.01 250)"
  brand-teal: "oklch(0.62 0.14 192)"
  brand-teal-muted: "oklch(0.62 0.14 192 / 12%)"
  winner-green: "oklch(0.65 0.15 145)"
  step-up-amber: "oklch(0.75 0.15 80)"
  border-hairline: "oklch(0.25 0.01 250)"
  destructive-red: "oklch(0.577 0.245 27.325)"
typography:
  display:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4rem)"
    fontWeight: 700
    letterSpacing: "-0.02em"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)"
    fontWeight: 400
  label:
    fontFamily: "DM Sans, sans-serif"
    fontWeight: 300
  data:
    fontFamily: "'Geist Mono', monospace"
rounded:
  sm: "0.3rem"
  md: "0.4rem"
  lg: "0.5rem"
  xl: "0.7rem"
  2xl: "0.9rem"
components:
  button-primary:
    backgroundColor: "{colors.brand-teal}"
    textColor: "{colors.deep-navy-black}"
    rounded: "{rounded.lg}"
  amazon-cta:
    backgroundColor: "{colors.brand-teal-muted}"
    textColor: "{colors.brand-teal}"
    rounded: "{rounded.lg}"
  card-winner:
    backgroundColor: "{colors.studio-surface}"
    rounded: "{rounded.2xl}"
  card-step-up:
    backgroundColor: "{colors.studio-surface}"
    rounded: "{rounded.2xl}"
---

# Design System: PrintPick

## 1. Overview

**Creative North Star: "The Studio Spotlight"**

Every printer sits alone on true darkness like a product shot in MKBHD's studio: minimal chrome, generous whitespace, the physical object doing all the visual work the page needs. The site never hedges — one confident recommendation per tier, backed by data, framed like an editor who already tested fifty printers and is just walking you to the one they'd buy. Dark is the primary palette, not a toggle; the deep navy-black background and warm off-white ink exist so product photography and the single teal accent can carry all the color the page needs.

This system explicitly rejects the neutral-comparison-tool posture and the affiliate-farm listicle look: no "these are all great," no purple-to-blue AI-startup gradients, no decorative glow. The conversion architecture (anchor pricing, one clear winner, loss-framed upgrades) is not a dark pattern bolted onto a review site — it's the same "MKBHD meets Wirecutter" editorial confidence expressed in layout, not just copy.

**Key Characteristics:**
- Dark-first, blue-navy-tinted neutrals throughout — even grays lean toward hue 250, never flat gray
- One accent color (teal) reserved for CTAs, badges, and active states; two semantic accents (winner green, step-up amber) exist only inside the anchor-pricing conversion mechanic
- Single-level elevation: background → surface, never surface → surface (no card-in-card)
- Product photography carries the visual weight; UI chrome stays minimal by design

**Two documented tensions between this project's original design brief (`.impeccable.md`) and what's actually shipped, worth knowing before extending the system:**
- The brief specifies Sora + Outfit; the shipped code loads **Space Grotesk + DM Sans** instead. This document follows the shipped fonts as canonical since that's what's live, but the swap was never a deliberate brand decision — worth a conscious call (keep or revert) rather than further drift.
- The brief's own anti-pattern list bans "glow effects" and "no gradients... no neon-on-dark AI aesthetic," but the homepage hero currently renders a decorative radial teal gradient wash behind the headline. That's a real anti-pattern violation against the project's own stated rule, not a sanctioned exception — flagged here rather than quietly inherited.

## 2. Colors

Dark-first: the deep navy-black background is the primary palette, not a toggle. All neutrals tint toward hue 250 so grays feel cohesive rather than flat. One accent (teal) does the CTA/active-state work; two additional semantic accents exist solely inside the pricing-tier conversion mechanic.

### Primary
- **Brand Teal** (oklch(0.62 0.14 192)): CTAs, badges, active states, focus rings. Used sparingly — accent, never decoration. Pops specifically because it's the only saturated color most pages show.
- **Brand Teal, Muted** (oklch(0.62 0.14 192 / 12%)): Subtle accent backgrounds behind teal text/icons (e.g. the Amazon CTA's tinted background).

### Secondary
- **Winner Green** (oklch(0.65 0.15 145)): The "Best Value" card's highlight border and winner badges in comparisons. Means exactly one thing: this is the recommended pick.

### Tertiary
- **Step-Up Amber** (oklch(0.75 0.15 80)): The "Step Up" tier's highlight, framing an upgrade as a small delta ("+$200 vs Best Value") rather than a bigger total price.

### Neutral
- **Deep Navy-Black** (oklch(0.13 0.015 250)): Page background. Slightly blue-tinted, deliberately not pure black — depth without harshness.
- **Studio Surface** (oklch(0.17 0.012 250)): Cards, popovers — one step up from background.
- **Surface Elevated** (oklch(0.21 0.01 250)): Hover states, active cards, inputs — the second and final elevation step.
- **Off-White Ink** (oklch(0.95 0.005 250)): Primary text. Warm off-white, not pure white — softer on true-dark backgrounds.
- **Muted Text** (oklch(0.55 0.01 250)): Secondary text, captions, metadata.
- **Border Hairline** (oklch(0.25 0.01 250)): 1px borders only — never thick borders on dark surfaces.
- **Destructive** (oklch(0.577 0.245 27.325)): Error/destructive actions.

### Named Rules
**The One Accent Rule.** Teal appears on CTAs, badges, and active states only. If a new element wants to stand out, it does not reach for a new color — it earns teal only if it's asking for a click, or it earns winner-green/step-up-amber only if it's part of the pricing-tier mechanic.

## 3. Typography

**Display Font:** Space Grotesk (as shipped; brief originally specified Sora — see Overview)
**Body Font:** DM Sans (as shipped; brief originally specified Outfit — see Overview)
**Mono/Data Font:** Geist Mono — scores, dimensions, prices, spec tables. The "data layer" of the type system.

**Character:** Bold weight contrast, never the same weight twice in one section — 300 for subtle labels, 700+ for headlines, 400 for body. Tight tracking (-0.02em) on headings signals confidence; fluid `clamp()` sizing keeps hero type responsive without breakpoints.

### Hierarchy
- **Display** (700, `clamp(2.5rem, 5vw, 4rem)`, -0.02em tracking): Hero headlines, tier page headers.
- **Body** (400, `clamp(0.9rem, 1.5vw, 1.1rem)`): Editorial copy, product descriptions.
- **Label** (300): Subtle metadata labels — deliberately the lightest weight in the system, for contrast against bold headlines.
- **Data/Mono** (Geist Mono): Scores, prices, dimensions, spec tables — visually distinct from editorial prose so numbers read as data, not narrative.

### Named Rules
**The No-Repeat-Weight Rule.** Never use the same font weight twice within one section. If a headline is 700, the label beneath it should be 300 or 400, not 600 — the contrast itself is the hierarchy.

## 4. Elevation

Single-level elevation only: background → surface. Never surface → surface (no card-in-card nesting). Depth comes from three flat tonal steps (background, studio-surface, surface-elevated) rather than shadows — consistent with the dark-first, product-is-hero philosophy where UI chrome stays quiet. The one physical elevation gesture in the system is motion, not shadow: the winner card in anchor pricing lifts `translateY(-2px to -3px)` on hover/emphasis with a border-color shift to brand teal.

### Named Rules
**The One-Level Rule.** A card can sit on the background. A card cannot sit on another card. If a component needs to feel "inside" another, use a border or the next tonal step up, never a second nested card shape.

## 5. Components

Confident and minimal: the printer photograph is the hero, UI chrome is the frame. Every component either drives a decision (badges, comparison winners, pricing tiers) or gets out of the way.

### Buttons
- **Shape:** `rounded-lg`.
- **Primary CTA:** Brand teal, scale 1.02 + background transition on hover — quick, confident, never bouncy.
- **Amazon/Affiliate CTA:** Teal-tinted border + background (`brand-teal-muted`), arrow icon, distinct pill treatment from the primary button so affiliate intent is visually legible at a glance.

### Printer Cards
- **Grid variant:** `rounded-2xl`. **List variant:** `rounded-xl` (as shipped; the brief's anti-pattern list calls for sharper corners — documented here as shipped reality, not silently dropped).
- **Rank badges:** #1-3 filled teal circle; #4+ a muted dark circle — rank visibility drops off deliberately past the top 3.
- **Score bar:** Thin (`h-1`) teal fill, animates in on scroll-into-view (600ms ease-out-quart) — the data visibly "arrives."
- **Hover:** Subtle lift (`translateY(-2px)`) + border-color shift to brand teal, 200ms ease-out.

### Anchor Pricing (three-tier)
- **Layout:** Budget Pick / Best Value (★, highlighted) / Step Up, in a grid where the Best Value card is physically larger — hierarchy through size, not just a label.
- **Winner card:** Winner-green border, `sm:translateY(-3px)` lift above its siblings.
- **Step-up card:** Step-up-amber border, delta price shown as "+$X vs Best Value" — always the delta, never the total.

### Navigation
- **Style:** Minimal chrome consistent with the product-is-hero principle. Top-level: Finder, Rankings, Compare, Blog, Tools. Footer groups: Tools, Top Printers, Site.

## 6. Do's and Don'ts

### Do:
- **Do** keep dark as the primary palette, not a toggle — true depth via blue-navy-tinted neutrals, not pure black or flat gray.
- **Do** reserve brand teal for CTAs, badges, and active states only; winner-green and step-up-amber exist solely inside the pricing-tier mechanic.
- **Do** let one card in a comparison be physically larger to signal the recommended pick — hierarchy through size, not just a badge.
- **Do** frame upgrade pricing as a delta ("+$200 vs Best Value"), never as the total price alone.
- **Do** make every recommendation a decision, never a hedge — "the one most people should get," not "there are many great options."

### Don't:
- **Don't** use light mode as the design target. Dark is default; light can exist as a toggle but is never the primary surface.
- **Don't** add gradient text anywhere — use font weight and size for impact instead.
- **Don't** add glassmorphism, blur effects, or glow borders. **The homepage hero's current radial teal gradient wash behind the headline is exactly this violation** — it exists in shipped code today but contradicts the project's own rule and should be removed or replaced with a non-glow depth cue.
- **Don't** nest a card inside a card. One elevation level: background → surface, never further.
- **Don't** build equal-sized card grids where every option looks equally weighted — visual hierarchy must reflect the actual recommendation.
- **Don't** use purple-to-blue gradients (the "AI startup" look) anywhere on the site.
- **Don't** use modals for anything — inline expansion or page navigation only.
- **Don't** use stock photography — DALL-E-generated product shots in a consistent editorial style only.
