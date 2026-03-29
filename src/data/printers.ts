export interface Printer {
  readonly slug: string;
  readonly name: string;
  readonly brand: string;
  readonly type: "fdm" | "resin";
  readonly image: string;
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
  readonly pros: readonly string[];
  readonly cons: readonly string[];
  readonly summary: string;
  readonly verdict: string;
}

export const AFFILIATE_TAG = "printpick20-20";

export function getAmazonUrl(asin: string, printerName?: string): string {
  // Use search URL for reliable links — always finds the product even if ASIN changes
  // The affiliate tag works on search pages too
  if (printerName) {
    const query = encodeURIComponent(printerName + " 3D Printer");
    return `https://www.amazon.com/s?k=${query}&tag=${AFFILIATE_TAG}`;
  }
  return `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`;
}

export const printers: readonly Printer[] = [
  // ─── BAMBU LAB ───────────────────────────────────────────────
  {
    slug: "bambu-lab-a1-combo",
    name: "Bambu Lab A1 Combo",
    brand: "Bambu Lab",
    type: "fdm",
    image: "/images/printers/bambu-lab-a1-combo.png",
    price: 399,
    amazonAsin: "B0CJPKFQPN",
    buildVolume: { x: 256, y: 256, z: 256 },
    layerResolution: { min: 0.05, max: 0.35 },
    printSpeed: 500,
    weight: 9.65,
    features: ["Auto bed leveling", "Multi-color (AMS Lite)", "WiFi", "Camera", "Vibration compensation"],
    bestFor: ["beginners", "multi-color", "speed"],
    scores: { value: 9, beginner: 10, printQuality: 9, speed: 9, reliability: 9 },
    pros: ["Multi-color out of the box", "Excellent print quality", "Fast and quiet", "Great first-time setup"],
    cons: ["Open frame (no enclosure)", "Proprietary slicer preferred", "AMS Lite limited to 4 colors"],
    summary: "The best all-around 3D printer for most people. Comes with AMS Lite for multi-color printing out of the box.",
    verdict: "If you can only buy one printer, this is it. The A1 Combo delivers multi-color printing, blazing speed, and Bambu's polished software at a price that undercuts nearly everything else at this quality level.",
  },
  {
    slug: "bambu-lab-a1-mini",
    name: "Bambu Lab A1 Mini",
    brand: "Bambu Lab",
    type: "fdm",
    image: "/images/printers/bambu-lab-a1-mini.png",
    price: 199,
    amazonAsin: "B0CL2KMFM4",
    buildVolume: { x: 180, y: 180, z: 180 },
    layerResolution: { min: 0.05, max: 0.35 },
    printSpeed: 500,
    weight: 5.5,
    features: ["Auto bed leveling", "WiFi", "Camera", "Compact footprint", "All-metal hotend"],
    bestFor: ["beginners", "budget", "compact"],
    scores: { value: 10, beginner: 10, printQuality: 8, speed: 9, reliability: 9 },
    pros: ["Incredible value at $199", "Tiny desk footprint", "Bambu software ecosystem", "Fast for its size"],
    cons: ["Small build volume (180mm)", "No enclosure", "No multi-color without separate AMS"],
    summary: "The best sub-$200 printer. Bambu quality in a compact package that fits on any desk.",
    verdict: "Perfect first printer. If your prints fit in 180mm, there is no reason to spend more. Add an AMS Lite later if you want multi-color.",
  },
  {
    slug: "bambu-lab-p1s",
    name: "Bambu Lab P1S",
    brand: "Bambu Lab",
    type: "fdm",
    image: "/images/printers/bambu-lab-p1s.png",
    price: 599,
    amazonAsin: "B0C9KMRH6Z",
    buildVolume: { x: 256, y: 256, z: 256 },
    layerResolution: { min: 0.05, max: 0.35 },
    printSpeed: 500,
    weight: 14.13,
    features: ["Enclosed", "Multi-material (AMS)", "WiFi", "Camera", "HEPA filter", "Active chamber heating"],
    bestFor: ["engineering", "abs", "enclosed"],
    scores: { value: 8, beginner: 8, printQuality: 10, speed: 9, reliability: 10 },
    pros: ["Fully enclosed for ABS/ASA", "HEPA filter for fumes", "Rock-solid reliability", "Excellent multi-material"],
    cons: ["Pricier than open-frame alternatives", "Enclosure limits access during prints", "AMS sold separately"],
    summary: "Enclosed CoreXY with HEPA filter. Handles ABS, ASA, and engineering filaments with ease.",
    verdict: "The sweet spot for serious hobbyists. If you print with anything beyond PLA, the enclosure and filtration justify the premium over the A1.",
  },
  {
    slug: "bambu-lab-x1-carbon",
    name: "Bambu Lab X1 Carbon",
    brand: "Bambu Lab",
    type: "fdm",
    image: "/images/printers/bambu-lab-x1-carbon.png",
    price: 1199,
    amazonAsin: "B0BZ3CR7WW",
    buildVolume: { x: 256, y: 256, z: 256 },
    layerResolution: { min: 0.05, max: 0.35 },
    printSpeed: 500,
    weight: 14.13,
    features: ["Enclosed", "Multi-material (AMS)", "Hardened steel nozzle", "LiDAR", "Camera", "Active chamber heating"],
    bestFor: ["engineering", "carbon-fiber", "professional"],
    scores: { value: 7, beginner: 7, printQuality: 10, speed: 9, reliability: 10 },
    pros: ["Hardened nozzle for abrasive filaments", "LiDAR for first-layer inspection", "Best-in-class reliability", "Handles every material"],
    cons: ["Expensive", "Same build volume as P1S", "Overkill for PLA-only users"],
    summary: "The prosumer benchmark. Hardened nozzle handles carbon fiber and glass-filled filaments.",
    verdict: "Only buy this over the P1S if you regularly print carbon fiber, glass-filled nylon, or other abrasive materials. For everything else, the P1S is the smarter buy.",
  },
  // ─── CREALITY ────────────────────────────────────────────────
  {
    slug: "creality-ender-3-v3-se",
    name: "Creality Ender 3 V3 SE",
    brand: "Creality",
    type: "fdm",
    image: "/images/printers/creality-ender-3-v3-se.png",
    price: 218,
    amazonAsin: "B0C5KXMPZ8",
    buildVolume: { x: 220, y: 220, z: 250 },
    layerResolution: { min: 0.05, max: 0.35 },
    printSpeed: 250,
    weight: 7.8,
    features: ["Auto bed leveling", "Direct drive extruder", "PEI build plate"],
    bestFor: ["beginners", "budget"],
    scores: { value: 10, beginner: 9, printQuality: 7, speed: 6, reliability: 8 },
    pros: ["Unbeatable price", "Auto-leveling works well", "Direct drive handles TPU", "Huge community support"],
    cons: ["Slower than CoreXY machines", "Open frame", "No WiFi or camera", "Manual firmware updates"],
    summary: "Best budget printer. Auto-leveling and direct drive at under $220 make it the top pick for getting started.",
    verdict: "If your budget is under $250 and you want to learn 3D printing with a machine that just works, this is the one. Massive community means help is always a Google search away.",
  },
  {
    slug: "creality-ender-3-v3",
    name: "Creality Ender 3 V3",
    brand: "Creality",
    type: "fdm",
    image: "/images/printers/creality-ender-3-v3.png",
    price: 289,
    amazonAsin: "B0DFN3QQ3F",
    buildVolume: { x: 220, y: 220, z: 250 },
    layerResolution: { min: 0.05, max: 0.35 },
    printSpeed: 600,
    weight: 8.6,
    features: ["CoreXZ", "Auto bed leveling", "Direct drive", "PEI build plate", "Klipper firmware"],
    bestFor: ["beginners", "budget", "speed"],
    scores: { value: 9, beginner: 9, printQuality: 8, speed: 8, reliability: 8 },
    pros: ["CoreXZ at a budget price", "600mm/s max speed", "Klipper firmware pre-installed", "Good upgrade from V3 SE"],
    cons: ["No WiFi", "No enclosure", "Creality's software ecosystem less polished than Bambu"],
    summary: "The budget speed demon. CoreXZ kinematics with Klipper firmware for under $300.",
    verdict: "Best pick if you want speed on a budget and don't need Bambu's polished app experience. A serious step up from the V3 SE.",
  },
  {
    slug: "creality-k1-max",
    name: "Creality K1 Max",
    brand: "Creality",
    type: "fdm",
    image: "/images/printers/creality-k1-max.png",
    price: 599,
    amazonAsin: "B0CG2P8QQN",
    buildVolume: { x: 300, y: 300, z: 300 },
    layerResolution: { min: 0.05, max: 0.35 },
    printSpeed: 600,
    weight: 18.0,
    features: ["Large build volume", "AI camera", "Auto bed leveling", "Direct drive", "WiFi"],
    bestFor: ["large-prints", "speed", "cosplay"],
    scores: { value: 8, beginner: 7, printQuality: 8, speed: 10, reliability: 7 },
    pros: ["Massive 300mm cube build volume", "600mm/s speed", "AI camera for monitoring", "Good for helmets and props"],
    cons: ["Can be noisy at top speed", "Mixed reliability reports early on", "Large footprint"],
    summary: "Massive 300mm build volume with 600mm/s speed. Perfect for cosplay props and large functional parts.",
    verdict: "The go-to for anyone printing large. If your prints don't fit on a 256mm bed, this is the answer. Just budget for a desk that can hold it.",
  },
  {
    slug: "creality-k2-plus",
    name: "Creality K2 Plus",
    brand: "Creality",
    type: "fdm",
    image: "/images/printers/creality-k2-plus.png",
    price: 899,
    amazonAsin: "B0DHGQVYMP",
    buildVolume: { x: 350, y: 350, z: 350 },
    layerResolution: { min: 0.05, max: 0.35 },
    printSpeed: 600,
    weight: 27.0,
    features: ["Enclosed", "350mm build volume", "CFS multi-color", "WiFi", "Camera", "Active carbon filter"],
    bestFor: ["large-prints", "professional", "multi-color"],
    scores: { value: 7, beginner: 6, printQuality: 9, speed: 9, reliability: 8 },
    pros: ["Enormous enclosed build volume", "Multi-color capability", "Active filtration", "Serious workhorse"],
    cons: ["Expensive", "Very heavy (27kg)", "CFS system adds cost", "Needs dedicated space"],
    summary: "The largest enclosed consumer printer. 350mm cube with multi-color and active filtration.",
    verdict: "For serious makers who need enclosed large-format printing. If 300mm isn't enough, this is the only game in town at this price.",
  },
  // ─── ELEGOO ──────────────────────────────────────────────────
  {
    slug: "elegoo-mars-5-ultra",
    name: "Elegoo Mars 5 Ultra",
    brand: "Elegoo",
    type: "resin",
    image: "/images/printers/elegoo-mars-5-ultra.png",
    price: 284,
    amazonAsin: "B0D9FQWK7N",
    buildVolume: { x: 153, y: 89, z: 200 },
    layerResolution: { min: 0.01, max: 0.2 },
    printSpeed: 150,
    weight: 7.5,
    features: ["14K mono LCD", "Tilt release", "Air purifier", "WiFi"],
    bestFor: ["miniatures", "resin", "detail"],
    scores: { value: 9, beginner: 7, printQuality: 10, speed: 7, reliability: 8 },
    pros: ["14K resolution for insane detail", "Tilt release reduces peel forces", "Built-in air purifier", "WiFi control"],
    cons: ["Small build plate for larger models", "Resin printing is messier than FDM", "Requires post-processing (wash + cure)"],
    summary: "The go-to resin printer for miniature painters. 14K resolution delivers insane detail at a great price.",
    verdict: "If you paint tabletop miniatures, this is non-negotiable. The detail level at this price point is unmatched. Just be prepared for the resin workflow.",
  },
  {
    slug: "elegoo-saturn-4-ultra",
    name: "Elegoo Saturn 4 Ultra",
    brand: "Elegoo",
    type: "resin",
    image: "/images/printers/elegoo-saturn-4-ultra.png",
    price: 459,
    amazonAsin: "B0D9FM4KFN",
    buildVolume: { x: 218, y: 123, z: 220 },
    layerResolution: { min: 0.01, max: 0.2 },
    printSpeed: 150,
    weight: 11.0,
    features: ["12K mono LCD", "Tilt release", "Air purifier", "WiFi", "Larger build plate"],
    bestFor: ["resin", "miniatures", "large-prints"],
    scores: { value: 8, beginner: 6, printQuality: 10, speed: 7, reliability: 8 },
    pros: ["Larger build plate than Mars series", "12K resolution", "Print multiple minis at once", "Good for busts and terrain"],
    cons: ["More expensive than Mars", "Still requires post-processing", "Heavy resin smell even with purifier"],
    summary: "The Mars 5 Ultra's bigger sibling. Same insane detail, but fits larger models and batch prints.",
    verdict: "Step up to the Saturn when the Mars build plate is too small. Perfect for terrain pieces, busts, and batch-printing a full army.",
  },
  {
    slug: "elegoo-neptune-4-pro",
    name: "Elegoo Neptune 4 Pro",
    brand: "Elegoo",
    type: "fdm",
    image: "/images/printers/elegoo-neptune-4-pro.png",
    price: 259,
    amazonAsin: "B0C74BVCFC",
    buildVolume: { x: 225, y: 225, z: 265 },
    layerResolution: { min: 0.05, max: 0.35 },
    printSpeed: 500,
    weight: 10.5,
    features: ["Klipper firmware", "Auto bed leveling", "Direct drive", "PEI build plate", "Linear rails"],
    bestFor: ["budget", "speed"],
    scores: { value: 9, beginner: 8, printQuality: 8, speed: 8, reliability: 7 },
    pros: ["Linear rails at this price", "Klipper pre-installed", "500mm/s speed", "Solid build quality"],
    cons: ["Mixed early firmware reviews", "Community smaller than Creality/Bambu", "No WiFi"],
    summary: "Elegoo's answer to the Ender 3 V3. Linear rails and Klipper at $259.",
    verdict: "Strong budget option. If you want linear rails and don't want to pay Bambu prices, the Neptune 4 Pro delivers.",
  },
  // ─── ANYCUBIC ────────────────────────────────────────────────
  {
    slug: "anycubic-photon-mono-4",
    name: "Anycubic Photon Mono 4",
    brand: "Anycubic",
    type: "resin",
    image: "/images/printers/anycubic-photon-mono-4.png",
    price: 159,
    amazonAsin: "B0DJKFQ8JN",
    buildVolume: { x: 134, y: 75, z: 130 },
    layerResolution: { min: 0.01, max: 0.15 },
    printSpeed: 100,
    weight: 5.0,
    features: ["10K mono LCD", "Laser-cut build plate", "USB"],
    bestFor: ["miniatures", "resin", "budget"],
    scores: { value: 10, beginner: 6, printQuality: 9, speed: 5, reliability: 7 },
    pros: ["Cheapest high-detail resin printer", "10K resolution", "Compact", "Low entry cost"],
    cons: ["Very small build plate", "No WiFi", "USB-only", "Slow compared to newer models"],
    summary: "Cheapest entry into high-detail resin printing. Great for tabletop miniatures on a tight budget.",
    verdict: "The absolute lowest cost of entry for resin. If you just want to try resin printing without a big investment, start here.",
  },
  {
    slug: "anycubic-kobra-3-combo",
    name: "Anycubic Kobra 3 Combo",
    brand: "Anycubic",
    type: "fdm",
    image: "/images/printers/anycubic-kobra-3-combo.png",
    price: 399,
    amazonAsin: "B0DDX1C2V5",
    buildVolume: { x: 250, y: 250, z: 260 },
    layerResolution: { min: 0.05, max: 0.35 },
    printSpeed: 600,
    weight: 10.0,
    features: ["Multi-color (ACE Pro)", "Auto bed leveling", "WiFi", "Camera", "Direct drive"],
    bestFor: ["multi-color", "speed", "beginners"],
    scores: { value: 8, beginner: 8, printQuality: 8, speed: 9, reliability: 7 },
    pros: ["Multi-color at competitive price", "600mm/s speed", "WiFi + camera", "ACE Pro handles 4 colors"],
    cons: ["Newer product with fewer reviews", "ACE system less proven than Bambu AMS", "Software less polished"],
    summary: "Anycubic's multi-color competitor to the Bambu A1 Combo. Fast and feature-packed.",
    verdict: "A solid alternative to the A1 Combo if you want multi-color and prefer Anycubic's ecosystem. Wait for more community reviews before committing.",
  },
  // ─── FLASHFORGE ──────────────────────────────────────────────
  {
    slug: "flashforge-adventurer-5m-pro",
    name: "Flashforge Adventurer 5M Pro",
    brand: "Flashforge",
    type: "fdm",
    image: "/images/printers/flashforge-adventurer-5m-pro.png",
    price: 379,
    amazonAsin: "B0D8K2MNFL",
    buildVolume: { x: 220, y: 220, z: 220 },
    layerResolution: { min: 0.05, max: 0.4 },
    printSpeed: 600,
    weight: 12.5,
    features: ["Enclosed", "Auto leveling", "Quick-swap nozzle", "Camera", "HEPA filter"],
    bestFor: ["beginners", "enclosed", "speed"],
    scores: { value: 9, beginner: 9, printQuality: 8, speed: 9, reliability: 8 },
    pros: ["Enclosed with HEPA filter", "Toolless nozzle swap", "Fast", "Great for schools and families"],
    cons: ["Smaller build volume than competitors at this price", "Flashforge ecosystem smaller", "Proprietary nozzles"],
    summary: "Enclosed and fast with toolless nozzle swaps. A strong alternative to the Bambu A1 for beginners who want an enclosure.",
    verdict: "Best enclosed printer under $400. If safety matters (kids, classroom, office), the enclosure and filtration make this the top pick.",
  },
  // ─── PRUSA ───────────────────────────────────────────────────
  {
    slug: "prusa-mk4s",
    name: "Prusa MK4S",
    brand: "Prusa Research",
    type: "fdm",
    image: "/images/printers/prusa-mk4s.png",
    price: 799,
    amazonAsin: "B0DRMTFZ9X",
    buildVolume: { x: 250, y: 210, z: 220 },
    layerResolution: { min: 0.05, max: 0.35 },
    printSpeed: 200,
    weight: 7.0,
    features: ["Open source", "PrusaSlicer", "Nextruder", "Auto bed leveling", "Input shaping", "Ethernet"],
    bestFor: ["reliability", "open-source"],
    scores: { value: 6, beginner: 8, printQuality: 9, speed: 6, reliability: 10 },
    pros: ["Legendary reliability", "Fully open source", "PrusaSlicer is excellent", "Best customer support in the industry"],
    cons: ["Expensive for the speed", "Slower than CoreXY competition", "Open frame", "Showing its age vs Bambu"],
    summary: "The reliable workhorse. Open-source heritage with Prusa's legendary quality control.",
    verdict: "Buy this if you value open source, long-term support, and a printer that just works for years. Don't buy it if you care about speed.",
  },
  {
    slug: "prusa-xl",
    name: "Prusa XL",
    brand: "Prusa Research",
    type: "fdm",
    image: "/images/printers/prusa-xl.png",
    price: 1999,
    amazonAsin: "B0DSPDQNF3",
    buildVolume: { x: 360, y: 360, z: 360 },
    layerResolution: { min: 0.05, max: 0.35 },
    printSpeed: 200,
    weight: 25.0,
    features: ["Multi-tool (up to 5 heads)", "360mm build volume", "Segmented heatbed", "Open source", "Ethernet"],
    bestFor: ["professional", "large-prints", "multi-color"],
    scores: { value: 5, beginner: 5, printQuality: 10, speed: 5, reliability: 9 },
    pros: ["True tool-changer (5 independent tools)", "Massive build volume", "Segmented heated bed saves energy", "Open source"],
    cons: ["Very expensive", "Slow compared to CoreXY", "Huge footprint", "Long delivery times"],
    summary: "Prusa's flagship. 5-tool changer with 360mm build volume for professional multi-material printing.",
    verdict: "A professional machine for production use. If you need true multi-material (not just multi-color), this is the best consumer option. But the price is steep.",
  },
  // ─── SOVOL ───────────────────────────────────────────────────
  {
    slug: "sovol-sv08",
    name: "Sovol SV08",
    brand: "Sovol",
    type: "fdm",
    image: "/images/printers/sovol-sv08.png",
    price: 479,
    amazonAsin: "B0D4FZPWV6",
    buildVolume: { x: 350, y: 350, z: 400 },
    layerResolution: { min: 0.05, max: 0.35 },
    printSpeed: 700,
    weight: 20.0,
    features: ["Voron-inspired CoreXY", "Klipper", "Auto bed leveling", "350mm build volume", "Open design"],
    bestFor: ["large-prints", "speed", "diy"],
    scores: { value: 9, beginner: 5, printQuality: 8, speed: 10, reliability: 7 },
    pros: ["Voron design for fraction of DIY cost", "Huge build volume", "700mm/s speed", "Very hackable"],
    cons: ["Requires tinkering", "Not beginner-friendly", "QC can be inconsistent", "No enclosure"],
    summary: "A Voron-inspired speed machine at a fraction of DIY cost. Massive build volume, serious speed.",
    verdict: "For tinkerers who want Voron-level performance without building from scratch. Not for beginners, but incredible value for experienced users.",
  },
  // ─── QIDI ────────────────────────────────────────────────────
  {
    slug: "qidi-x-plus-3",
    name: "QIDI X-Plus 3",
    brand: "QIDI",
    type: "fdm",
    image: "/images/printers/qidi-x-plus-3.png",
    price: 499,
    amazonAsin: "B0CM49X31W",
    buildVolume: { x: 280, y: 280, z: 270 },
    layerResolution: { min: 0.05, max: 0.35 },
    printSpeed: 600,
    weight: 17.0,
    features: ["Enclosed", "CoreXY", "Chamber heating (60C)", "Auto bed leveling", "WiFi", "Camera"],
    bestFor: ["engineering", "abs", "enclosed", "speed"],
    scores: { value: 9, beginner: 7, printQuality: 9, speed: 9, reliability: 8 },
    pros: ["Enclosed with active heating to 60C", "Handles ABS/ASA/Nylon/PC", "Fast CoreXY", "Great value for enclosed"],
    cons: ["QIDI software less polished", "Smaller community than Bambu/Creality", "Proprietary components"],
    summary: "The best enclosed printer under $500. Active chamber heating to 60C for engineering materials.",
    verdict: "If you need an enclosed printer with active heating but can't stretch to $600 for a P1S, the X-Plus 3 is the answer. Incredible value.",
  },
  {
    slug: "qidi-x-max-3",
    name: "QIDI X-Max 3",
    brand: "QIDI",
    type: "fdm",
    image: "/images/printers/qidi-x-max-3.png",
    price: 799,
    amazonAsin: "B0CM4QVY5Z",
    buildVolume: { x: 325, y: 325, z: 315 },
    layerResolution: { min: 0.05, max: 0.35 },
    printSpeed: 600,
    weight: 25.0,
    features: ["Enclosed", "Large CoreXY", "Chamber heating (60C)", "Auto bed leveling", "WiFi", "Camera"],
    bestFor: ["large-prints", "engineering", "professional"],
    scores: { value: 8, beginner: 6, printQuality: 9, speed: 9, reliability: 8 },
    pros: ["Large enclosed build volume", "Active chamber heating", "Handles all engineering materials", "Independent Z motors"],
    cons: ["Heavy", "Expensive", "QIDI ecosystem", "Requires dedicated space"],
    summary: "Large-format enclosed CoreXY with active chamber heating. For serious engineering prints.",
    verdict: "When you need large + enclosed + engineering materials. Competes with printers costing 2-3x more in the professional space.",
  },
  // ─── PHROZEN ─────────────────────────────────────────────────
  {
    slug: "phrozen-sonic-mini-8k-s",
    name: "Phrozen Sonic Mini 8K S",
    brand: "Phrozen",
    type: "resin",
    image: "/images/printers/phrozen-sonic-mini-8k-s.png",
    price: 329,
    amazonAsin: "B0BN7XMFWR",
    buildVolume: { x: 165, y: 72, z: 180 },
    layerResolution: { min: 0.01, max: 0.15 },
    printSpeed: 80,
    weight: 6.5,
    features: ["7.1\" 8K mono LCD", "22-micron XY resolution", "ParaLED 3.0"],
    bestFor: ["miniatures", "detail", "resin"],
    scores: { value: 8, beginner: 6, printQuality: 10, speed: 4, reliability: 8 },
    pros: ["22-micron XY resolution", "Best detail for miniatures and jewelry", "Reliable mono LCD", "Good community"],
    cons: ["Slow print speed", "Small build plate", "No WiFi", "Phrozen resin recommended"],
    summary: "22-micron resolution for the finest detail possible. The jeweler's and miniature painter's dream.",
    verdict: "If detail is everything and speed doesn't matter, the Sonic Mini 8K S produces results that make even the Mars 5 Ultra look coarse.",
  },
  // ─── LONGER ──────────────────────────────────────────────────
  {
    slug: "longer-orange-4k",
    name: "Longer Orange 4K",
    brand: "Longer",
    type: "resin",
    image: "/images/printers/longer-orange-4k.png",
    price: 129,
    amazonAsin: "B0BGY93HWX",
    buildVolume: { x: 118, y: 66, z: 190 },
    layerResolution: { min: 0.01, max: 0.15 },
    printSpeed: 80,
    weight: 4.5,
    features: ["5.5\" 4K mono LCD", "WiFi", "USB"],
    bestFor: ["budget", "resin"],
    scores: { value: 10, beginner: 5, printQuality: 7, speed: 4, reliability: 6 },
    pros: ["Cheapest resin printer", "WiFi at this price", "Decent 4K resolution"],
    cons: ["Very small build plate", "4K resolution below current standard", "Less reliable long-term", "Tiny community"],
    summary: "The absolute cheapest way into resin printing. $129 with WiFi.",
    verdict: "Only buy this to test whether you like resin printing at all. If you get hooked, upgrade to an Elegoo Mars within 6 months.",
  },
  // ─── VOXELAB ─────────────────────────────────────────────────
  {
    slug: "voxelab-aquila-x2",
    name: "Voxelab Aquila X2",
    brand: "Voxelab",
    type: "fdm",
    image: "/images/printers/voxelab-aquila-x2.png",
    price: 179,
    amazonAsin: "B09J4P9JRQ",
    buildVolume: { x: 220, y: 220, z: 250 },
    layerResolution: { min: 0.05, max: 0.4 },
    printSpeed: 180,
    weight: 7.8,
    features: ["Resume printing", "Filament runout sensor", "Glass build plate", "Silent stepper drivers"],
    bestFor: ["budget", "beginners"],
    scores: { value: 9, beginner: 7, printQuality: 6, speed: 4, reliability: 7 },
    pros: ["Very cheap", "Good first printer to learn on", "Silent operation", "Ender 3 compatible mods"],
    cons: ["Manual bed leveling", "Slow", "Bowden extruder limits flexible materials", "Basic features only"],
    summary: "A budget Ender 3 alternative. Good for learning the basics of FDM printing.",
    verdict: "A fine first printer if the Ender 3 V3 SE is out of budget. Just know you'll want to upgrade within a year.",
  },
  // ─── ARTILLERY ───────────────────────────────────────────────
  {
    slug: "artillery-sidewinder-x4-plus",
    name: "Artillery Sidewinder X4 Plus",
    brand: "Artillery",
    type: "fdm",
    image: "/images/printers/artillery-sidewinder-x4-plus.png",
    price: 349,
    amazonAsin: "B0D5RX8MHS",
    buildVolume: { x: 300, y: 300, z: 400 },
    layerResolution: { min: 0.05, max: 0.35 },
    printSpeed: 500,
    weight: 14.5,
    features: ["300x300x400mm build", "Klipper", "Auto bed leveling", "Direct drive", "PEI build plate"],
    bestFor: ["large-prints", "budget", "speed"],
    scores: { value: 9, beginner: 6, printQuality: 7, speed: 8, reliability: 7 },
    pros: ["Massive build volume at $349", "Klipper pre-installed", "Direct drive", "Great for cosplay"],
    cons: ["Mixed QC reviews", "Smaller community", "Can be loud", "No enclosure"],
    summary: "300x300x400mm at $349. The cheapest way to print large.",
    verdict: "Best value large-format printer. If you need 300mm+ and your budget is tight, nothing else comes close at this price.",
  },
  // ─── KINGROON ────────────────────────────────────────────────
  {
    slug: "kingroon-kp3s-pro-v2",
    name: "Kingroon KP3S Pro V2",
    brand: "Kingroon",
    type: "fdm",
    image: "/images/printers/kingroon-kp3s-pro-v2.png",
    price: 159,
    amazonAsin: "B0BVL3BGWH",
    buildVolume: { x: 200, y: 200, z: 200 },
    layerResolution: { min: 0.05, max: 0.35 },
    printSpeed: 250,
    weight: 6.5,
    features: ["Linear rails", "Direct drive", "Auto bed leveling", "PEI build plate"],
    bestFor: ["budget", "compact"],
    scores: { value: 10, beginner: 7, printQuality: 7, speed: 5, reliability: 7 },
    pros: ["Linear rails at $159", "Direct drive", "Compact footprint", "Good for the price"],
    cons: ["Small community", "200mm build volume", "No WiFi", "Kingroon firmware less polished"],
    summary: "Linear rails and direct drive for $159. Incredible value for a compact printer.",
    verdict: "Hidden gem. If you want linear rails on a budget and don't need a huge build plate, this punches way above its price.",
  },
] as const;

// ─── Helper Functions ──────────────────────────────────────────

export function getPrinterBySlug(slug: string): Printer | undefined {
  return printers.find((p) => p.slug === slug);
}

export function getPrintersByBestFor(tag: string): readonly Printer[] {
  return printers.filter((p) => p.bestFor.includes(tag));
}

export function getPrintersByType(type: "fdm" | "resin"): readonly Printer[] {
  return printers.filter((p) => p.type === type);
}

export function getPrintersByBrand(brand: string): readonly Printer[] {
  return printers.filter((p) => p.brand === brand);
}

export function getPrintersByPriceRange(min: number, max: number): readonly Printer[] {
  return printers.filter((p) => p.price >= min && p.price <= max);
}

export function getOverallScore(printer: Printer): number {
  const s = printer.scores;
  return Math.round((s.value + s.beginner + s.printQuality + s.speed + s.reliability) / 5 * 10) / 10;
}

export function getAllBrands(): readonly string[] {
  return [...new Set(printers.map((p) => p.brand))].sort();
}

export function getAllBestForTags(): readonly string[] {
  return [...new Set(printers.flatMap((p) => p.bestFor))].sort();
}

export const CATEGORIES: readonly { readonly tag: string; readonly label: string; readonly description: string }[] = [
  { tag: "beginners", label: "Best for Beginners", description: "Easy setup, reliable, great first printers" },
  { tag: "budget", label: "Best Budget Printers", description: "Maximum value under $300" },
  { tag: "miniatures", label: "Best for Miniatures", description: "High-detail resin printers for tabletop gaming" },
  { tag: "speed", label: "Fastest Printers", description: "500mm/s+ speed demons" },
  { tag: "large-prints", label: "Best for Large Prints", description: "300mm+ build volume for cosplay and props" },
  { tag: "engineering", label: "Best for Engineering", description: "Enclosed printers for ABS, nylon, and carbon fiber" },
  { tag: "enclosed", label: "Best Enclosed Printers", description: "Enclosed for fume control and material compatibility" },
  { tag: "multi-color", label: "Best Multi-Color Printers", description: "Print in multiple colors and materials" },
  { tag: "resin", label: "Best Resin Printers", description: "MSLA/DLP printers for ultra-fine detail" },
  { tag: "professional", label: "Best Professional Printers", description: "Production-ready machines for serious work" },
  { tag: "compact", label: "Best Compact Printers", description: "Small footprint for desks and apartments" },
  { tag: "diy", label: "Best for Tinkerers", description: "Open-source and hackable machines" },
];
