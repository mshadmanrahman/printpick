// ─── Noise Level Data (dB estimates at normal print speed) ──────────────
// Sources: community measurements, manufacturer specs, reviewer tests
export const NOISE_LEVELS: Record<string, { db: number; label: string }> = {
  "bambu-lab-a1-combo":      { db: 48, label: "Quiet" },
  "bambu-lab-a1-mini":       { db: 46, label: "Quiet" },
  "bambu-lab-p1s":           { db: 50, label: "Moderate" },
  "bambu-lab-p2s":           { db: 48, label: "Quiet" },
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
  { name: "PLA", type: "fdm", description: "The default starting point. Forgiving, biodegradable, prints reliably on almost any machine.", difficulty: "Easy", needsEnclosure: false, bestFor: "Figurines, prototypes, decorative items" },
  { name: "PETG", type: "fdm", description: "PLA's more capable sibling. Tougher, water-resistant, food-safe. Nearly as easy to print.", difficulty: "Easy", needsEnclosure: false, bestFor: "Functional parts, containers, outdoor use" },
  { name: "ABS", type: "fdm", description: "Strong and heat-resistant but it will warp without an enclosure. Needs ventilation too.", difficulty: "Moderate", needsEnclosure: true, bestFor: "Automotive parts, enclosures, LEGO-like toys" },
  { name: "ASA", type: "fdm", description: "ABS with UV protection built in. If ABS is what you need but it's going outside, use ASA instead.", difficulty: "Moderate", needsEnclosure: true, bestFor: "Outdoor fixtures, garden tools, car parts" },
  { name: "TPU", type: "fdm", description: "Bendy, rubber-like, surprisingly useful. You'll need a direct drive extruder to run it well.", difficulty: "Moderate", needsEnclosure: false, bestFor: "Phone cases, gaskets, flexible hinges" },
  { name: "Nylon", type: "fdm", description: "Seriously strong stuff. It absorbs moisture from the air though, so you need to store and dry it properly.", difficulty: "Advanced", needsEnclosure: true, bestFor: "Gears, bearings, mechanical parts" },
  { name: "Polycarbonate", type: "fdm", description: "Handles heat up to 110C and is very strong. Getting a clean print takes real effort.", difficulty: "Advanced", needsEnclosure: true, bestFor: "Engineering parts, heat-resistant enclosures" },
  { name: "Carbon Fiber", type: "fdm", description: "Carbon fiber packed into nylon. Extremely stiff. Eats brass nozzles, so you need a hardened steel one.", difficulty: "Advanced", needsEnclosure: true, bestFor: "Drone frames, structural parts, tools" },
  { name: "Standard Resin", type: "resin", description: "The sharpest detail you can get from a desktop printer. Brittle out of the wash, and post-processing takes time.", difficulty: "Moderate", needsEnclosure: false, bestFor: "Miniatures, jewelry masters, detailed models" },
  { name: "ABS-Like Resin", type: "resin", description: "Tougher and less brittle than standard resin. Good pick if your print needs to survive some handling.", difficulty: "Moderate", needsEnclosure: false, bestFor: "Functional prototypes, snap-fit parts" },
  { name: "Water-Washable Resin", type: "resin", description: "Skip the IPA, rinse with water instead. Detail is slightly softer but the cleanup is much friendlier.", difficulty: "Easy", needsEnclosure: false, bestFor: "Beginners to resin, quick prototypes" },
  { name: "Flexible Resin", type: "resin", description: "Squishes and flexes like rubber. Niche material, but nothing else works as well for soft-touch parts.", difficulty: "Moderate", needsEnclosure: false, bestFor: "Gaskets, grips, soft-touch parts" },
];

// Which printers can handle which materials well
export const MATERIAL_COMPATIBILITY: Record<string, readonly Material[]> = {
  "bambu-lab-a1-combo":      ["PLA", "PETG", "TPU"],
  "bambu-lab-a1-mini":       ["PLA", "PETG", "TPU"],
  "bambu-lab-p1s":           ["PLA", "PETG", "ABS", "ASA", "TPU", "Nylon"],
  "bambu-lab-p2s":           ["PLA", "PETG", "ABS", "ASA", "TPU", "Nylon"],
  "qidi-q2":                 ["PLA", "PETG", "ABS", "ASA", "TPU", "Nylon", "Polycarbonate", "Carbon Fiber"],
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
  "bambu-lab-a1-mini":       [{ slug: "bambu-lab-a1-combo", reason: "Adds multi-color printing without changing much else" }, { slug: "bambu-lab-p1s", reason: "Enclosed build chamber opens up ABS, ASA, and Nylon" }],
  "bambu-lab-a1-combo":      [{ slug: "bambu-lab-p2s", reason: "Enclosure plus a quick-swap nozzle system" }, { slug: "bambu-lab-p1s", reason: "Enclosure with HEPA filtration for fumes" }],
  "bambu-lab-p1s":           [{ slug: "bambu-lab-p2s", reason: "Quick-swap nozzles and AMS 2 Pro with built-in drying" }, { slug: "bambu-lab-h2d", reason: "Dual nozzles and a noticeably bigger build volume" }],
  "bambu-lab-p2s":           [{ slug: "bambu-lab-h2d", reason: "Dual nozzles and 325mm build volume" }, { slug: "prusa-core-one", reason: "Open source, excellent community support, long-term reliability" }],
  "creality-ender-3-v3-se":  [{ slug: "creality-ender-3-v3", reason: "CoreXZ kinematics and Klipper roughly double your print speed" }, { slug: "bambu-lab-a1-combo", reason: "Multi-color plus software that actually works out of the box" }],
  "creality-ender-3-v3":     [{ slug: "bambu-lab-a1-combo", reason: "Multi-color printing with much better software" }, { slug: "creality-k1-max", reason: "Bumps the build volume up to 300mm" }],
  "creality-k1-max":         [{ slug: "creality-k2-plus", reason: "Enclosed and 350mm, more material options" }, { slug: "sovol-sv08", reason: "Voron-class speed with 400mm Z height" }],
  "creality-k2-plus":        [{ slug: "prusa-xl", reason: "Proper tool changer for real multi-material work" }],
  "elegoo-mars-5-ultra":     [{ slug: "elegoo-saturn-4-ultra", reason: "Bigger plate so you can batch more prints at once" }, { slug: "phrozen-sonic-mini-8k-s", reason: "22 micron resolution if you need even sharper detail" }],
  "elegoo-saturn-4-ultra":   [{ slug: "phrozen-sonic-mini-8k-s", reason: "About as detailed as desktop resin printing gets, good for jewelry and minis" }],
  "elegoo-neptune-4-pro":    [{ slug: "bambu-lab-a1-combo", reason: "Better software and multi-color in one jump" }, { slug: "qidi-x-plus-3", reason: "Enclosed for engineering-grade filaments" }],
  "anycubic-photon-mono-4":  [{ slug: "elegoo-mars-5-ultra", reason: "14K resolution, tilt release, and a built-in air purifier" }, { slug: "elegoo-saturn-4-ultra", reason: "Bigger build plate and 12K resolution" }],
  "anycubic-kobra-3-combo":  [{ slug: "bambu-lab-a1-combo", reason: "Bambu's multi-color system is more mature and reliable" }, { slug: "bambu-lab-p1s", reason: "Enclosed for when you need engineering filaments" }],
  "flashforge-adventurer-5m-pro": [{ slug: "bambu-lab-p1s", reason: "Noticeably better print quality plus AMS multi-color" }, { slug: "qidi-x-plus-3", reason: "Active chamber heating for consistent engineering material prints" }],
  "prusa-mk4s":              [{ slug: "prusa-xl", reason: "More print area and a proper tool changer" }, { slug: "bambu-lab-p1s", reason: "Roughly 3x faster with an enclosed design" }],
  "prusa-xl":                [],
  "sovol-sv08":              [{ slug: "creality-k2-plus", reason: "Enclosed build chamber makes a lot more materials printable" }],
  "qidi-x-plus-3":           [{ slug: "qidi-x-max-3", reason: "Same capability, larger 325mm build volume" }, { slug: "bambu-lab-h2d", reason: "Dual nozzles and Bambu's polish on the software side" }],
  "qidi-x-max-3":            [{ slug: "prusa-xl", reason: "True tool changer, open source, large format" }],
  "phrozen-sonic-mini-8k-s": [{ slug: "elegoo-saturn-4-ultra", reason: "Step up to a bigger build plate when detail is no longer the constraint" }],
  "longer-orange-4k":        [{ slug: "anycubic-photon-mono-4", reason: "10K resolution, a real step up in detail" }, { slug: "elegoo-mars-5-ultra", reason: "14K resolution, tilt release, and an air purifier" }],
  "voxelab-aquila-x2":       [{ slug: "creality-ender-3-v3-se", reason: "Auto-leveling and direct drive, noticeably less fiddling" }, { slug: "bambu-lab-a1-mini", reason: "A significant quality jump in every direction" }],
  "artillery-sidewinder-x4-plus": [{ slug: "creality-k1-max", reason: "Better QC and an AI camera for failure detection" }, { slug: "sovol-sv08", reason: "Voron-class speed with plenty of room to tinker" }],
  "kingroon-kp3s-pro-v2":    [{ slug: "creality-ender-3-v3", reason: "CoreXZ kinematics roughly double your speed" }, { slug: "bambu-lab-a1-mini", reason: "Steps into the Bambu ecosystem for reliability and ease of use" }],
};
