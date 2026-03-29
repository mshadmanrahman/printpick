// ─── Noise Level Data (dB estimates at normal print speed) ──────────────
// Sources: community measurements, manufacturer specs, reviewer tests
export const NOISE_LEVELS: Record<string, { db: number; label: string }> = {
  "bambu-lab-a1-combo":      { db: 48, label: "Quiet" },
  "bambu-lab-a1-mini":       { db: 46, label: "Quiet" },
  "bambu-lab-p1s":           { db: 50, label: "Moderate" },
  "bambu-lab-x1-carbon":     { db: 50, label: "Moderate" },
  "creality-ender-3-v3-se":  { db: 52, label: "Moderate" },
  "creality-ender-3-v3":     { db: 55, label: "Moderate" },
  "creality-k1-max":         { db: 60, label: "Loud" },
  "creality-k2-plus":        { db: 55, label: "Moderate" },
  "elegoo-mars-5-ultra":     { db: 42, label: "Very Quiet" },
  "elegoo-saturn-4-ultra":   { db: 44, label: "Very Quiet" },
  "elegoo-neptune-4-pro":    { db: 54, label: "Moderate" },
  "anycubic-photon-mono-4":  { db: 40, label: "Very Quiet" },
  "anycubic-kobra-3-combo":  { db: 52, label: "Moderate" },
  "flashforge-adventurer-5m-pro": { db: 50, label: "Moderate" },
  "prusa-mk4s":              { db: 45, label: "Quiet" },
  "prusa-xl":                { db: 48, label: "Quiet" },
  "sovol-sv08":              { db: 58, label: "Loud" },
  "qidi-x-plus-3":           { db: 52, label: "Moderate" },
  "qidi-x-max-3":            { db: 54, label: "Moderate" },
  "phrozen-sonic-mini-8k-s": { db: 42, label: "Very Quiet" },
  "longer-orange-4k":        { db: 43, label: "Very Quiet" },
  "voxelab-aquila-x2":       { db: 50, label: "Moderate" },
  "artillery-sidewinder-x4-plus": { db: 56, label: "Loud" },
  "kingroon-kp3s-pro-v2":    { db: 48, label: "Quiet" },
};

export function getNoiseColor(db: number): string {
  if (db <= 44) return "text-emerald-600";
  if (db <= 50) return "text-primary";
  if (db <= 55) return "text-amber-600";
  return "text-red-500";
}

export function getNoiseBg(db: number): string {
  if (db <= 44) return "bg-emerald-500";
  if (db <= 50) return "bg-primary";
  if (db <= 55) return "bg-amber-500";
  return "bg-red-500";
}

// ─── Material Compatibility ──────────────────────────────────────────
export type Material = "PLA" | "PETG" | "ABS" | "ASA" | "TPU" | "Nylon" | "Polycarbonate" | "Carbon Fiber" | "Standard Resin" | "ABS-Like Resin" | "Water-Washable Resin" | "Flexible Resin";

export interface MaterialInfo {
  readonly name: Material;
  readonly type: "fdm" | "resin";
  readonly description: string;
  readonly difficulty: "Easy" | "Moderate" | "Advanced";
  readonly needsEnclosure: boolean;
  readonly bestFor: string;
}

export const MATERIALS: readonly MaterialInfo[] = [
  { name: "PLA", type: "fdm", description: "Most popular. Easy to print, biodegradable, great detail.", difficulty: "Easy", needsEnclosure: false, bestFor: "Figurines, prototypes, decorative items" },
  { name: "PETG", type: "fdm", description: "Stronger than PLA. Food-safe, water-resistant, flexible.", difficulty: "Easy", needsEnclosure: false, bestFor: "Functional parts, containers, outdoor use" },
  { name: "ABS", type: "fdm", description: "Strong, heat-resistant. Requires enclosure and ventilation.", difficulty: "Moderate", needsEnclosure: true, bestFor: "Automotive parts, enclosures, LEGO-like toys" },
  { name: "ASA", type: "fdm", description: "Like ABS but UV-resistant. Great for outdoor use.", difficulty: "Moderate", needsEnclosure: true, bestFor: "Outdoor fixtures, garden tools, car parts" },
  { name: "TPU", type: "fdm", description: "Flexible rubber-like material. Needs direct drive extruder.", difficulty: "Moderate", needsEnclosure: false, bestFor: "Phone cases, gaskets, flexible hinges" },
  { name: "Nylon", type: "fdm", description: "Extremely strong and durable. Hygroscopic — needs dry storage.", difficulty: "Advanced", needsEnclosure: true, bestFor: "Gears, bearings, mechanical parts" },
  { name: "Polycarbonate", type: "fdm", description: "Heat-resistant to 110°C. Very strong but hard to print.", difficulty: "Advanced", needsEnclosure: true, bestFor: "Engineering parts, heat-resistant enclosures" },
  { name: "Carbon Fiber", type: "fdm", description: "Carbon fiber filled nylon. Extremely rigid. Needs hardened nozzle.", difficulty: "Advanced", needsEnclosure: true, bestFor: "Drone frames, structural parts, tools" },
  { name: "Standard Resin", type: "resin", description: "Best detail for minis and models. Brittle, needs post-processing.", difficulty: "Moderate", needsEnclosure: false, bestFor: "Miniatures, jewelry masters, detailed models" },
  { name: "ABS-Like Resin", type: "resin", description: "Tougher than standard resin. Good for functional prototypes.", difficulty: "Moderate", needsEnclosure: false, bestFor: "Functional prototypes, snap-fit parts" },
  { name: "Water-Washable Resin", type: "resin", description: "Easier cleanup — no IPA needed. Slightly lower detail.", difficulty: "Easy", needsEnclosure: false, bestFor: "Beginners to resin, quick prototypes" },
  { name: "Flexible Resin", type: "resin", description: "Rubber-like flexibility. Good for seals and grips.", difficulty: "Moderate", needsEnclosure: false, bestFor: "Gaskets, grips, soft-touch parts" },
];

// Which printers can handle which materials well
export const MATERIAL_COMPATIBILITY: Record<string, readonly Material[]> = {
  "bambu-lab-a1-combo":      ["PLA", "PETG", "TPU"],
  "bambu-lab-a1-mini":       ["PLA", "PETG", "TPU"],
  "bambu-lab-p1s":           ["PLA", "PETG", "ABS", "ASA", "TPU", "Nylon"],
  "bambu-lab-x1-carbon":     ["PLA", "PETG", "ABS", "ASA", "TPU", "Nylon", "Polycarbonate", "Carbon Fiber"],
  "creality-ender-3-v3-se":  ["PLA", "PETG", "TPU"],
  "creality-ender-3-v3":     ["PLA", "PETG", "TPU"],
  "creality-k1-max":         ["PLA", "PETG", "TPU"],
  "creality-k2-plus":        ["PLA", "PETG", "ABS", "ASA", "TPU", "Nylon"],
  "elegoo-mars-5-ultra":     ["Standard Resin", "ABS-Like Resin", "Water-Washable Resin", "Flexible Resin"],
  "elegoo-saturn-4-ultra":   ["Standard Resin", "ABS-Like Resin", "Water-Washable Resin", "Flexible Resin"],
  "elegoo-neptune-4-pro":    ["PLA", "PETG", "TPU"],
  "anycubic-photon-mono-4":  ["Standard Resin", "ABS-Like Resin", "Water-Washable Resin"],
  "anycubic-kobra-3-combo":  ["PLA", "PETG", "TPU"],
  "flashforge-adventurer-5m-pro": ["PLA", "PETG", "ABS", "TPU"],
  "prusa-mk4s":              ["PLA", "PETG", "ABS", "ASA", "TPU", "Nylon"],
  "prusa-xl":                ["PLA", "PETG", "ABS", "ASA", "TPU", "Nylon", "Polycarbonate", "Carbon Fiber"],
  "sovol-sv08":              ["PLA", "PETG", "TPU"],
  "qidi-x-plus-3":           ["PLA", "PETG", "ABS", "ASA", "TPU", "Nylon", "Polycarbonate"],
  "qidi-x-max-3":            ["PLA", "PETG", "ABS", "ASA", "TPU", "Nylon", "Polycarbonate"],
  "phrozen-sonic-mini-8k-s": ["Standard Resin", "ABS-Like Resin", "Water-Washable Resin"],
  "longer-orange-4k":        ["Standard Resin", "ABS-Like Resin", "Water-Washable Resin"],
  "voxelab-aquila-x2":       ["PLA", "PETG"],
  "artillery-sidewinder-x4-plus": ["PLA", "PETG", "TPU"],
  "kingroon-kp3s-pro-v2":    ["PLA", "PETG", "TPU"],
};

// ─── Upgrade Paths ──────────────────────────────────────────────────
// Maps each printer to recommended upgrades and why
export interface UpgradePath {
  readonly slug: string;
  readonly reason: string;
}

export const UPGRADE_PATHS: Record<string, readonly UpgradePath[]> = {
  "bambu-lab-a1-mini":       [{ slug: "bambu-lab-a1-combo", reason: "Add multi-color printing" }, { slug: "bambu-lab-p1s", reason: "Get an enclosure for engineering materials" }],
  "bambu-lab-a1-combo":      [{ slug: "bambu-lab-p1s", reason: "Enclosed for ABS/ASA + HEPA filter" }, { slug: "bambu-lab-x1-carbon", reason: "Carbon fiber and abrasive filaments" }],
  "bambu-lab-p1s":           [{ slug: "bambu-lab-x1-carbon", reason: "Hardened nozzle for abrasive materials" }, { slug: "prusa-xl", reason: "Larger build volume + tool changer" }],
  "bambu-lab-x1-carbon":     [{ slug: "prusa-xl", reason: "True multi-material with tool changer" }],
  "creality-ender-3-v3-se":  [{ slug: "creality-ender-3-v3", reason: "2x speed with CoreXZ + Klipper" }, { slug: "bambu-lab-a1-combo", reason: "Multi-color + polished software" }],
  "creality-ender-3-v3":     [{ slug: "bambu-lab-a1-combo", reason: "Multi-color + better software" }, { slug: "creality-k1-max", reason: "Bigger build volume (300mm)" }],
  "creality-k1-max":         [{ slug: "creality-k2-plus", reason: "Enclosed + even bigger (350mm)" }, { slug: "sovol-sv08", reason: "Voron-level speed + 400mm Z height" }],
  "creality-k2-plus":        [{ slug: "prusa-xl", reason: "True tool changer for multi-material" }],
  "elegoo-mars-5-ultra":     [{ slug: "elegoo-saturn-4-ultra", reason: "Larger build plate for batch printing" }, { slug: "phrozen-sonic-mini-8k-s", reason: "Even finer detail (22μm)" }],
  "elegoo-saturn-4-ultra":   [{ slug: "phrozen-sonic-mini-8k-s", reason: "Maximum detail for jewelry/minis" }],
  "elegoo-neptune-4-pro":    [{ slug: "bambu-lab-a1-combo", reason: "Better software + multi-color" }, { slug: "qidi-x-plus-3", reason: "Enclosed for engineering materials" }],
  "anycubic-photon-mono-4":  [{ slug: "elegoo-mars-5-ultra", reason: "14K resolution + tilt release + air purifier" }, { slug: "elegoo-saturn-4-ultra", reason: "Bigger build plate + 12K" }],
  "anycubic-kobra-3-combo":  [{ slug: "bambu-lab-a1-combo", reason: "More proven multi-color system" }, { slug: "bambu-lab-p1s", reason: "Enclosed for engineering filaments" }],
  "flashforge-adventurer-5m-pro": [{ slug: "bambu-lab-p1s", reason: "Better print quality + AMS" }, { slug: "qidi-x-plus-3", reason: "Active chamber heating for engineering" }],
  "prusa-mk4s":              [{ slug: "prusa-xl", reason: "Bigger + tool changer" }, { slug: "bambu-lab-p1s", reason: "3x faster with enclosed design" }],
  "prusa-xl":                [],
  "sovol-sv08":              [{ slug: "creality-k2-plus", reason: "Enclosed for material versatility" }],
  "qidi-x-plus-3":           [{ slug: "qidi-x-max-3", reason: "Larger build volume (325mm)" }, { slug: "bambu-lab-x1-carbon", reason: "Better software + LiDAR" }],
  "qidi-x-max-3":            [{ slug: "prusa-xl", reason: "True tool changer + open source" }],
  "phrozen-sonic-mini-8k-s": [{ slug: "elegoo-saturn-4-ultra", reason: "Bigger build plate if detail is enough" }],
  "longer-orange-4k":        [{ slug: "anycubic-photon-mono-4", reason: "10K resolution for much better detail" }, { slug: "elegoo-mars-5-ultra", reason: "14K + tilt release + air purifier" }],
  "voxelab-aquila-x2":       [{ slug: "creality-ender-3-v3-se", reason: "Auto-leveling + direct drive" }, { slug: "bambu-lab-a1-mini", reason: "Massive quality jump" }],
  "artillery-sidewinder-x4-plus": [{ slug: "creality-k1-max", reason: "AI camera + better QC" }, { slug: "sovol-sv08", reason: "Voron-level speed + hackability" }],
  "kingroon-kp3s-pro-v2":    [{ slug: "creality-ender-3-v3", reason: "2x speed with CoreXZ" }, { slug: "bambu-lab-a1-mini", reason: "Bambu ecosystem + reliability" }],
};
