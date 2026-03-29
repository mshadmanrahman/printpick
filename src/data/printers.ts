export interface Printer {
  readonly slug: string;
  readonly name: string;
  readonly brand: string;
  readonly type: "fdm" | "resin";
  readonly price: number;
  readonly amazonAsin: string;
  readonly buildVolume: {
    readonly x: number;
    readonly y: number;
    readonly z: number;
  };
  readonly layerResolution: {
    readonly min: number;
    readonly max: number;
  };
  readonly printSpeed: number;
  readonly weight: number;
  readonly features: readonly string[];
  readonly bestFor: readonly string[];
  readonly scores: {
    readonly value: number;
    readonly beginner: number;
    readonly printQuality: number;
    readonly speed: number;
    readonly reliability: number;
  };
  readonly imageUrl?: string;
  readonly summary: string;
}

export const AFFILIATE_TAG = "printpick20-20";

export function getAmazonUrl(asin: string): string {
  return `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`;
}

export const printers: readonly Printer[] = [
  {
    slug: "bambu-lab-a1-combo",
    name: "Bambu Lab A1 Combo",
    brand: "Bambu Lab",
    type: "fdm",
    price: 399,
    amazonAsin: "B0CJPKFQPN",
    buildVolume: { x: 256, y: 256, z: 256 },
    layerResolution: { min: 0.05, max: 0.35 },
    printSpeed: 500,
    weight: 9.65,
    features: ["Auto bed leveling", "Multi-color (AMS Lite)", "WiFi", "Camera", "Vibration compensation"],
    bestFor: ["beginners", "multi-color", "speed"],
    scores: { value: 9, beginner: 10, printQuality: 9, speed: 9, reliability: 9 },
    summary: "The best all-around 3D printer for most people. Comes with AMS Lite for multi-color printing out of the box.",
  },
  {
    slug: "creality-ender-3-v3-se",
    name: "Creality Ender 3 V3 SE",
    brand: "Creality",
    type: "fdm",
    price: 218,
    amazonAsin: "B0C5KXMPZ8",
    buildVolume: { x: 220, y: 220, z: 250 },
    layerResolution: { min: 0.05, max: 0.35 },
    printSpeed: 250,
    weight: 7.8,
    features: ["Auto bed leveling", "Direct drive extruder", "PEI build plate"],
    bestFor: ["beginners", "budget"],
    scores: { value: 10, beginner: 9, printQuality: 7, speed: 6, reliability: 8 },
    summary: "Best budget printer. Auto-leveling and direct drive at under $220 make it the top pick for getting started.",
  },
  {
    slug: "bambu-lab-p1s",
    name: "Bambu Lab P1S",
    brand: "Bambu Lab",
    type: "fdm",
    price: 599,
    amazonAsin: "B0C9KMRH6Z",
    buildVolume: { x: 256, y: 256, z: 256 },
    layerResolution: { min: 0.05, max: 0.35 },
    printSpeed: 500,
    weight: 14.13,
    features: ["Enclosed", "Multi-material (AMS)", "WiFi", "Camera", "HEPA filter", "Active chamber heating"],
    bestFor: ["engineering", "abs", "enclosed"],
    scores: { value: 8, beginner: 8, printQuality: 10, speed: 9, reliability: 10 },
    summary: "Enclosed CoreXY with HEPA filter. Handles ABS, ASA, and engineering filaments with ease.",
  },
  {
    slug: "elegoo-mars-5-ultra",
    name: "Elegoo Mars 5 Ultra",
    brand: "Elegoo",
    type: "resin",
    price: 284,
    amazonAsin: "B0D9FQWK7N",
    buildVolume: { x: 153, y: 89, z: 200 },
    layerResolution: { min: 0.01, max: 0.2 },
    printSpeed: 150,
    weight: 7.5,
    features: ["14K mono LCD", "Tilt release", "Air purifier", "WiFi"],
    bestFor: ["miniatures", "resin", "detail"],
    scores: { value: 9, beginner: 7, printQuality: 10, speed: 7, reliability: 8 },
    summary: "The go-to resin printer for miniature painters. 14K resolution delivers insane detail at a great price.",
  },
  {
    slug: "creality-k1-max",
    name: "Creality K1 Max",
    brand: "Creality",
    type: "fdm",
    price: 599,
    amazonAsin: "B0CG2P8QQN",
    buildVolume: { x: 300, y: 300, z: 300 },
    layerResolution: { min: 0.05, max: 0.35 },
    printSpeed: 600,
    weight: 18.0,
    features: ["Large build volume", "AI camera", "Auto bed leveling", "Direct drive"],
    bestFor: ["large-prints", "speed", "cosplay"],
    scores: { value: 8, beginner: 7, printQuality: 8, speed: 10, reliability: 7 },
    summary: "Massive 300mm build volume with 600mm/s speed. Perfect for cosplay props and large functional parts.",
  },
  {
    slug: "anycubic-photon-mono-4",
    name: "Anycubic Photon Mono 4",
    brand: "Anycubic",
    type: "resin",
    price: 159,
    amazonAsin: "B0DJKFQ8JN",
    buildVolume: { x: 134, y: 75, z: 130 },
    layerResolution: { min: 0.01, max: 0.15 },
    printSpeed: 100,
    weight: 5.0,
    features: ["10K mono LCD", "Laser-cut build plate", "USB"],
    bestFor: ["miniatures", "resin", "budget"],
    scores: { value: 10, beginner: 6, printQuality: 9, speed: 5, reliability: 7 },
    summary: "Cheapest entry into high-detail resin printing. Great for tabletop miniatures on a tight budget.",
  },
  {
    slug: "bambu-lab-x1-carbon",
    name: "Bambu Lab X1 Carbon",
    brand: "Bambu Lab",
    type: "fdm",
    price: 1199,
    amazonAsin: "B0BZ3CR7WW",
    buildVolume: { x: 256, y: 256, z: 256 },
    layerResolution: { min: 0.05, max: 0.35 },
    printSpeed: 500,
    weight: 14.13,
    features: ["Enclosed", "Multi-material (AMS)", "Hardened steel nozzle", "LiDAR", "Camera", "Active chamber heating"],
    bestFor: ["engineering", "carbon-fiber", "professional"],
    scores: { value: 7, beginner: 7, printQuality: 10, speed: 9, reliability: 10 },
    summary: "The prosumer benchmark. Hardened nozzle handles carbon fiber and glass-filled filaments.",
  },
  {
    slug: "flashforge-adventurer-5m-pro",
    name: "Flashforge Adventurer 5M Pro",
    brand: "Flashforge",
    type: "fdm",
    price: 379,
    amazonAsin: "B0D8K2MNFL",
    buildVolume: { x: 220, y: 220, z: 220 },
    layerResolution: { min: 0.05, max: 0.4 },
    printSpeed: 600,
    weight: 12.5,
    features: ["Enclosed", "Auto leveling", "Quick-swap nozzle", "Camera", "HEPA filter"],
    bestFor: ["beginners", "enclosed", "speed"],
    scores: { value: 9, beginner: 9, printQuality: 8, speed: 9, reliability: 8 },
    summary: "Enclosed and fast with toolless nozzle swaps. A strong alternative to the Bambu A1 for beginners who want an enclosure.",
  },
] as const;

export function getPrinterBySlug(slug: string): Printer | undefined {
  return printers.find((p) => p.slug === slug);
}

export function getPrintersByBestFor(tag: string): readonly Printer[] {
  return printers.filter((p) => p.bestFor.includes(tag));
}

export function getOverallScore(printer: Printer): number {
  const s = printer.scores;
  return Math.round((s.value + s.beginner + s.printQuality + s.speed + s.reliability) / 5 * 10) / 10;
}
