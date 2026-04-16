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
    tagline: "Just start printing",
    editorialCopy: [
      "You don't need the best printer. You need one that works out of the box, doesn't punish beginner mistakes, and makes you want to print something else tomorrow.",
      "Every printer here scores 7 or higher on beginner-friendliness. Auto bed leveling is standard. Firmware won't require a weekend to configure. And the communities are big enough that when you Google \"why is my first layer lifting,\" someone already answered it.",
      "Start here. Upgrade when you know what you're actually missing.",
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
    tagline: "You know what you want",
    editorialCopy: [
      "You've got prints on your desk, filament dust on your floor, and strong opinions about bed adhesion. Now you want more: bigger volumes, faster speeds, multi-material, or just fewer 3am failures.",
      "These printers reward experience. Input shaping, direct drive extruders, enclosed chambers, Klipper. None of that matters on your first printer. It all matters on your second.",
      "You know what you're doing. Pick the tool that matches it.",
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
    tagline: "Downtime costs money",
    editorialCopy: [
      "This isn't a hobby purchase. You need dimensional accuracy, material versatility, and a machine that runs 12 hours without someone watching it. Failed prints aren't annoying at this level. They're expensive.",
      "Every printer here handles engineering-grade filaments: carbon fiber, nylon, ASA, polycarbonate. Enclosed chambers, hardened nozzles, filtration. Those aren't upgrades at this tier. They're the baseline.",
      "These machines earn back their price. That's the only metric that matters.",
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
    tagline: "Detail FDM can't touch",
    editorialCopy: [
      "If you're here, you probably already know what you want. Miniatures with skin texture you can actually see. Jewelry casting masters. Dental models. Cosplay parts that look injection-molded.",
      "Resin is a different world from FDM. The resolution is 20-micron layers. That's not a marketing number. But there are real trade-offs: post-processing with isopropyl alcohol, UV curing, and liquid resin that you have to handle carefully.",
      "Worth it? Look at what comes off these machines and decide for yourself.",
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
