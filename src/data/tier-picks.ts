export type Tier = "first-printer" | "maker" | "professional" | "resin";

export interface TierConfig {
  readonly slug: Tier;
  readonly label: string;
  readonly tagline: string;
  readonly editorialCopy: readonly string[];
  readonly priceRange: string;
  readonly budgetPick: string;
  readonly bestValue: string;
  readonly stepUp: string;
  readonly budgetLabel: string;
  readonly catalogSlugs: readonly string[];
}

export const TIER_CONFIG: Record<Tier, TierConfig> = {
  "first-printer": {
    slug: "first-printer",
    label: "First Printer",
    tagline: "See what you can make",
    editorialCopy: [
      "You don't need the best printer on the market. You need one that works out of the box, doesn't punish mistakes, and makes you want to print again tomorrow.",
      "Every printer here scores 7+ on beginner-friendliness. They have auto bed leveling, don't require a PhD in firmware, and the communities behind them are massive — so when you Google \"why is my first layer ugly,\" you'll find the answer in 30 seconds.",
      "Start here. Upgrade later when you know what you actually need.",
    ],
    priceRange: "$150 – $400",
    budgetPick: "bambu-lab-a1-mini",
    bestValue: "bambu-lab-a1-combo",
    stepUp: "bambu-lab-p1s",
    budgetLabel: "Easy Start",
    catalogSlugs: [
      "bambu-lab-a1-mini",
      "bambu-lab-a1-combo",
      "bambu-lab-p1s",
      "creality-ender-3-v3-se",
      "creality-ender-3-v3",
      "elegoo-neptune-4",
      "anycubic-kobra-3",
      "flashforge-adventurer-5m",
    ],
  },
  "maker": {
    slug: "maker",
    label: "Maker",
    tagline: "Level up your builds",
    editorialCopy: [
      "You've already got prints on your desk, filament dust on your floor, and opinions about bed adhesion. Now you want more — bigger build volumes, faster speeds, multi-material, or just fewer failed prints at 3am.",
      "These printers reward experience. They have features that don't matter to beginners but matter a lot to you: input shaping, direct drive extruders, enclosed chambers, Klipper firmware.",
      "You know what you're doing. Pick the tool that matches your ambition.",
    ],
    priceRange: "$300 – $700",
    budgetPick: "creality-ender-3-v3-ke",
    bestValue: "bambu-lab-p2s",
    stepUp: "bambu-lab-p1s",
    budgetLabel: "Solid Foundation",
    catalogSlugs: [
      "creality-ender-3-v3-ke",
      "bambu-lab-p1p",
      "bambu-lab-p2s",
      "bambu-lab-p1s",
      "sovol-sv08",
      "elegoo-centauri-carbon",
      "anycubic-kobra-3-combo",
      "flashforge-adventurer-5m-pro",
      "qidi-x-smart-3",
    ],
  },
  "professional": {
    slug: "professional",
    label: "Professional",
    tagline: "Precision at scale",
    editorialCopy: [
      "This isn't a hobby purchase. You need dimensional accuracy, material versatility, and a machine that runs 12 hours without babysitting. Downtime costs money. Failed prints cost more.",
      "Every printer here handles engineering-grade filaments — carbon fiber, nylon, ASA, polycarbonate. Enclosed chambers, hardened nozzles, and filtration aren't luxuries at this level. They're requirements.",
      "These machines earn back their price.",
    ],
    priceRange: "$600+",
    budgetPick: "bambu-lab-p2s",
    bestValue: "qidi-x-plus-3",
    stepUp: "prusa-core-one",
    budgetLabel: "Entry Pro",
    catalogSlugs: [
      "bambu-lab-p2s",
      "bambu-lab-p1s",
      "qidi-x-plus-3",
      "qidi-x-max-3",
      "qidi-q2",
      "prusa-core-one",
      "prusa-xl",
      "bambu-lab-h2d",
    ],
  },
  "resin": {
    slug: "resin",
    label: "Resin",
    tagline: "Insane detail, tiny scale",
    editorialCopy: [
      "If you're here, you probably already know what you want — miniatures with skin texture you can see, jewelry casting masters, dental models, or cosplay pieces with surface finishes that look injection-molded.",
      "Resin printing is a different world from FDM. The resolution is absurd — we're talking 20-micron layers. But it comes with trade-offs: post-processing with isopropyl alcohol, UV curing, and handling liquid resin safely.",
      "Worth it? Look at the prints below and decide.",
    ],
    priceRange: "$200 – $600",
    budgetPick: "elegoo-mars-4-ultra",
    bestValue: "elegoo-saturn-4-ultra",
    stepUp: "anycubic-photon-mono-m5s",
    budgetLabel: "Sharp Detail",
    catalogSlugs: [
      "elegoo-mars-4-ultra",
      "elegoo-saturn-4-ultra",
      "elegoo-mars-5-ultra",
      "anycubic-photon-mono-m5s",
      "anycubic-photon-mono-4",
      "phrozen-sonic-mini-8k-s",
      "creality-halot-mage-pro",
      "elegoo-saturn-3-ultra",
    ],
  },
};

export const TIERS: readonly Tier[] = ["first-printer", "maker", "professional", "resin"];
