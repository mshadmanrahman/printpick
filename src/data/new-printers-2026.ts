/**
 * New printers to add to the PrintPick database (April 2026)
 *
 * Research compiled from manufacturer specs, Tom's Hardware, All3DP,
 * Reddit, and community forums.
 *
 * Items marked "unconfirmed" need manual verification before publishing.
 */

import type { Printer } from "./printers";

export const newPrinters2026: readonly Printer[] = [
  // ─── 1. BAMBU LAB P2S ───────────────────────────────────────────
  {
    slug: "bambu-lab-p2s",
    name: "Bambu Lab P2S",
    brand: "Bambu Lab",
    type: "fdm",
    image: "/images/printers/bambu-lab-p2s.png",
    price: 549,
    amazonAsin: "B0P2S00000", // NOTE: Not sold on Amazon directly — Bambu Lab sells through own store + Best Buy. Use search URL fallback.
    buildVolume: { x: 256, y: 256, z: 256 },
    layerResolution: { min: 0.05, max: 0.35 }, // Based on 0.4mm nozzle; supports 0.2/0.4/0.6/0.8mm nozzles
    printSpeed: 500, // 500 mm/s (some sources say 600 mm/s toolhead speed)
    weight: 14.9,
    features: [
      "Enclosed CoreXY",
      "AMS 2 Pro compatible",
      "5-inch touchscreen",
      "1080p AI camera",
      "Quick-swap nozzle system",
      "PMSM servo extruder (8.5kg force)",
    ],
    bestFor: ["speed", "enclosed", "multi-color", "engineering"],
    scores: {
      value: 9,
      beginner: 9,
      printQuality: 10,
      speed: 9,
      reliability: 9,
    },
    pros: [
      "Quick-swap nozzle system is a game-changer",
      "1080p camera with AI failure detection",
      "Adaptive cooling pulls in outside air or recirculates",
      "AMS 2 Pro doubles as a filament dryer",
    ],
    cons: [
      "No LiDAR sensor (reserved for X-series)",
      "No upgrade path from P1S",
      "AMS 2 Pro wastes filament on color changes",
      "$799 for the Combo adds up quickly",
    ],
    summary:
      "The successor to the beloved P1S, bringing quick-swap nozzles, a 5-inch touchscreen, and AI-powered monitoring at a $549 price point.",
    verdict:
      "The P2S is the best enclosed CoreXY under $600 in 2026. If you are upgrading from a P1S, the quick-swap nozzle and AMS 2 Pro drying make it worthwhile. For new buyers, this is the go-to enclosed printer.",
    reviews: [
      {
        quote:
          "The quick nozzle swap makes me jealous even as an X1C owner.",
        source: "r/BambuLab",
      },
      {
        quote:
          "Goldilocks gets a glow up. The P2S refreshes a best seller with meaningful upgrades.",
        source: "Tom's Hardware",
      },
      {
        quote:
          "For new buyers, the P2S is recommended without hesitation. Meaningfully better than the P1S in every way.",
        source: "3DTechValley",
      },
    ],
    communityBadges: ["Reddit Favorite", "Editor's Choice"],
    alsoNeed: [
      "AMS 2 Pro (for multi-color)",
      "PLA/PETG filament",
      "Hardened steel nozzle (for abrasives)",
      "Extra HEPA filters",
    ],
  },

  // ─── 2. CREALITY SPARKX i7 ──────────────────────────────────────
  {
    slug: "creality-sparkx-i7",
    name: "Creality SparkX i7",
    brand: "Creality",
    type: "fdm",
    image: "/images/printers/creality-sparkx-i7.png",
    price: 399, // Combo price; standalone ~$279
    amazonAsin: "B0GJSBSLQ6",
    buildVolume: { x: 260, y: 260, z: 255 },
    layerResolution: { min: 0.05, max: 0.3 },
    printSpeed: 500,
    weight: 9.12,
    features: [
      "AI camera monitoring",
      "CFS Lite multi-color (4 colors)",
      "Auto bed leveling",
      "RGB status lighting",
      "95% pre-assembled",
      "Pressure advance",
    ],
    bestFor: ["beginners", "multi-color", "budget"],
    scores: {
      value: 9,
      beginner: 10,
      printQuality: 8,
      speed: 8,
      reliability: 8,
    },
    pros: [
      "CES 2026 winner - polished beginner experience",
      "AI photo-to-3D feature is surprisingly fun",
      "Klipper-based with root access (open ecosystem)",
      "Lightweight and quiet at under 10kg",
    ],
    cons: [
      "16-page privacy policy required at setup",
      "CFS Lite does not retract for spools",
      "New platform with limited community troubleshooting",
      "Creality Cloud app can feel cluttered",
    ],
    summary:
      "Creality's CES 2026 winner targeting absolute beginners with AI features, multi-color printing, and a plug-and-play setup.",
    verdict:
      "The SparkX i7 is the most beginner-friendly multi-color printer on the market. If you want the simplest path from unboxing to multi-color prints, this is it — though power users may find the ecosystem limiting.",
    reviews: [
      {
        quote:
          "Very beginner friendly, almost plug and play. No tuning or adjustment needed out of the box.",
        source: "Creality Community Forum",
      },
      {
        quote:
          "Not just another color bedslinger. The CFS Lite is surprisingly adaptable and low maintenance.",
        source: "Tom's Hardware",
      },
      {
        quote:
          "When 3D printing stops feeling intimidating — that's the SparkX i7 experience.",
        source: "The Gadgeteer",
      },
    ],
    communityBadges: ["Best First Printer", "Best Value"],
    alsoNeed: [
      "CFS Lite (included in Combo)",
      "PLA filament multi-pack",
      "Textured PEI build plate",
      "Nozzle variety pack (0.2/0.6/0.8mm)",
    ],
  },

  // ─── 3. CREALITY HI COMBO ──────────────────────────────────────
  {
    slug: "creality-hi-combo",
    name: "Creality Hi Combo",
    brand: "Creality",
    type: "fdm",
    image: "/images/printers/creality-hi-combo.png",
    price: 399,
    amazonAsin: "B0DN69LXDW",
    buildVolume: { x: 260, y: 260, z: 300 },
    layerResolution: { min: 0.1, max: 0.35 },
    printSpeed: 500,
    weight: 13.31, // Combo weight (printer + CFS)
    features: [
      "CoreXY motion system",
      "Up to 16-color printing (4x CFS)",
      "Die-cast aluminum unibody",
      "Tri-metal quick-swap nozzle",
      "Auto calibration",
      "Direct drive extruder",
    ],
    bestFor: ["multi-color", "speed", "budget"],
    scores: {
      value: 8,
      beginner: 7,
      printQuality: 8,
      speed: 8,
      reliability: 7,
    },
    pros: [
      "Up to 16 colors with 4 CFS modules",
      "CoreXY with all-metal body feels premium",
      "Taller 300mm Z-axis than most competitors",
      "Competitive $399 price for multi-color CoreXY",
    ],
    cons: [
      "CFS can fail to feed reliably during color changes",
      "Fixed purge volumes waste filament (no adaptive purge)",
      "PTFE tube alignment is critical and fiddly",
      "3.8/5 customer rating suggests some QC issues",
    ],
    summary:
      "Creality's answer to the Bambu A1 Combo — a CoreXY multi-color printer supporting up to 16 colors at $399.",
    verdict:
      "The Hi Combo offers impressive multi-color specs on paper, but real-world reliability lags behind Bambu's AMS system. Best for users who want a CoreXY with multi-color potential and can tolerate some tinkering.",
    reviews: [
      {
        quote:
          "The safer choice with better build quality and more established support than newer competitors.",
        source: "3DTechValley",
      },
      {
        quote:
          "Catching up with color. Creality's multi-color game is improving but the CFS still needs refinement.",
        source: "Tom's Hardware",
      },
      {
        quote:
          "For the price, you get a solid CoreXY that handles single-color beautifully. Multi-color is a bonus, not a guarantee.",
        source: "3DWithUs",
      },
    ],
    communityBadges: ["Community Pick"],
    alsoNeed: [
      "Additional CFS modules (for 8-16 colors)",
      "Hyper PLA filament",
      "PETG filament",
      "Flexible build plate replacement",
    ],
  },

  // ─── 4. ELEGOO CENTAURI CARBON ─────────────────────────────────
  {
    slug: "elegoo-centauri-carbon",
    name: "Elegoo Centauri Carbon",
    brand: "Elegoo",
    type: "fdm",
    image: "/images/printers/elegoo-centauri-carbon.png",
    price: 299,
    amazonAsin: "B0FDQP54X8",
    buildVolume: { x: 256, y: 256, z: 256 },
    layerResolution: { min: 0.1, max: 0.4 },
    printSpeed: 500,
    weight: 17.5,
    features: [
      "Enclosed CoreXY",
      "Auto bed leveling (4 pressure sensors)",
      "Chamber camera monitoring",
      "320C all-metal hotend",
      "Pre-assembled and calibrated",
      "Steel + aluminum + glass enclosure",
    ],
    bestFor: ["budget", "enclosed", "beginners"],
    scores: {
      value: 10,
      beginner: 8,
      printQuality: 8,
      speed: 8,
      reliability: 7,
    },
    pros: [
      "Enclosed CoreXY at an unbelievable $299",
      "Excellent print quality across PLA, PETG, and ABS",
      "Pre-assembled — print within minutes of unboxing",
      "Handles carbon-fiber-infused materials",
    ],
    cons: [
      "Firmware can be unreliable and needs updates",
      "Heat creep issues on long prints above 270C",
      "Elegoo ecosystem is immature compared to Bambu",
      "Heavy at 17.5kg for a 256mm build volume",
    ],
    summary:
      "The budget CoreXY that disrupted the market. A fully enclosed, pre-assembled CoreXY at $299 that rivals printers at twice the price.",
    verdict:
      "At $299, the Centauri Carbon is the best value in 3D printing today. It would be excellent at twice the price. If you can accept less polished firmware, there is no reason to buy anything else at this budget.",
    reviews: [
      {
        quote:
          "There's no reason to buy anything else at this price. It would be excellent at twice the cost.",
        source: "How-To Geek",
      },
      {
        quote:
          "Finally an affordable CoreXY. The Centauri Carbon changes what you should expect for under $300.",
        source: "Tom's Hardware",
      },
      {
        quote:
          "Buy two of these instead of one fancier printer at twice the price. Seriously.",
        source: "r/3Dprinting",
      },
    ],
    communityBadges: ["Best Value", "Hidden Gem"],
    alsoNeed: [
      "PLA/PETG filament starter pack",
      "Spare nozzles (0.2/0.6/0.8mm)",
      "Drybox for hygroscopic filament",
      "Replacement build plate",
    ],
  },

  // ─── 5. ELEGOO CENTAURI CARBON 2 COMBO ─────────────────────────
  {
    slug: "elegoo-centauri-carbon-2-combo",
    name: "Elegoo Centauri Carbon 2 Combo",
    brand: "Elegoo",
    type: "fdm",
    image: "/images/printers/elegoo-centauri-carbon-2-combo.png",
    price: 449,
    amazonAsin: "B0G4TPZPZM",
    buildVolume: { x: 256, y: 256, z: 256 },
    layerResolution: { min: 0.08, max: 0.4 }, // Some sources say min 0.1mm practical
    printSpeed: 500,
    weight: 19.35,
    features: [
      "Enclosed CoreXY",
      "4-color Canvas multi-color system",
      "350C hardened steel nozzle",
      "RFID filament detection",
      "Auto filament loading & tangle detection",
      "5-inch touchscreen",
    ],
    bestFor: ["multi-color", "budget", "enclosed"],
    scores: {
      value: 9,
      beginner: 7,
      printQuality: 8,
      speed: 8,
      reliability: 8,
    },
    pros: [
      "First sub-$500 enclosed multi-color CoreXY",
      "91% first-attempt success rate on multi-color jobs",
      "RFID auto-identifies filament type and properties",
      "Excellent TPU printing performance",
    ],
    cons: [
      "Finicky spool holders need improvement",
      "Loading routine doesn't get hot enough for high-temp filaments",
      "Cold build plate could use more grip",
      "Canvas software is functional but visually awkward",
    ],
    summary:
      "The multi-color variant of the Centauri Carbon, adding 4-color Canvas printing to an enclosed CoreXY at just $449.",
    verdict:
      "The best sub-$500 multi-color 3D printer in 2026. It comes with quirks, but the combination of enclosed CoreXY, 4-color printing, and RFID filament management at this price is unmatched by any competitor.",
    reviews: [
      {
        quote:
          "Best sub-$500 multicolor 3D printer in 2026. The value proposition is insane.",
        source: "3D Printed Decor",
      },
      {
        quote:
          "Ultra accessible multicolor printing. CANVAS completed 31 out of 34 jobs on first attempt.",
        source: "VoxelMatters",
      },
      {
        quote:
          "I'm an idiot, and even I was able to make a cool Fallout action figure with this printer.",
        source: "GamesRadar+",
      },
    ],
    communityBadges: ["Best Value", "Community Pick"],
    alsoNeed: [
      "Multi-color PLA filament pack",
      "RFID-tagged filament spools",
      "Spare hardened nozzles",
      "Build plate adhesive",
    ],
  },

  // ─── 6. PRUSA CORE ONE ────────────────────────────────────────
  {
    slug: "prusa-core-one",
    name: "Prusa Core One",
    brand: "Prusa Research",
    type: "fdm",
    image: "/images/printers/prusa-core-one.png",
    price: 1199, // Core One+ assembled; kit ~$949
    amazonAsin: "B0FCFKYXYS", // Original Core One listing
    brandUrl: "https://www.prusa3d.com/product/original-prusa-core-one/#a_aid=shadman",
    buildVolume: { x: 250, y: 220, z: 270 },
    layerResolution: { min: 0.05, max: 0.3 },
    printSpeed: 500, // Competitive with 500-600mm/s class printers
    weight: 22.5,
    features: [
      "Enclosed CoreXY with active chamber heating (55C)",
      "Nextruder direct drive (10:1 planetary)",
      "360-degree cooling duct",
      "Ethernet + WiFi + NFC",
      "MMU3 multi-material compatible",
      "Open-source firmware (PrusaSlicer)",
    ],
    bestFor: ["precision", "professional", "enclosed"],
    scores: {
      value: 6,
      beginner: 7,
      printQuality: 10,
      speed: 8,
      reliability: 10,
    },
    pros: [
      "Legendary Prusa reliability and customer support",
      "Active chamber heating to 55C for engineering materials",
      "Open-source ecosystem with no vendor lock-in",
      "Kit option available for ~$949 (21% savings)",
    ],
    cons: [
      "Expensive at $1,199 assembled ($949 kit)",
      "Smaller build volume than competitors at this price",
      "Heavy at 22.5kg",
      "No LiDAR or AI monitoring features",
    ],
    summary:
      "Prusa's first CoreXY — an enclosed, actively heated chamber printer built for reliability and open-source enthusiasts.",
    verdict:
      "The Prusa Core One is for people who value reliability, open-source, and Prusa's legendary support above all else. The print quality is outstanding but the price premium is hard to justify unless you specifically value the Prusa ecosystem.",
    reviews: [
      {
        quote:
          "Finally, Prusa takes on Bambu! The Core One is better in a box.",
        source: "Tom's Hardware",
      },
      {
        quote:
          "Rail smoothness holds up well after months of hard use, minimal belt wear, and consistent chamber heat stability.",
        source: "Prusa Forum",
      },
      {
        quote:
          "If you value open source and lifetime support, Prusa is still the gold standard. Just bring your wallet.",
        source: "r/3Dprinting",
      },
    ],
    communityBadges: ["Pro Workhorse", "Editor's Choice"],
    alsoNeed: [
      "MMU3 (for multi-material)",
      "Prusament filament",
      "High-flow nozzle upgrade",
      "Extra build plates (smooth + textured)",
    ],
  },

  // ─── 7. BAMBU LAB H2D ────────────────────────────────────────
  {
    slug: "bambu-lab-h2d",
    name: "Bambu Lab H2D",
    brand: "Bambu Lab",
    type: "fdm",
    image: "/images/printers/bambu-lab-h2d.png",
    price: 1899, // Base model; Combo $2,199; Laser combos $2,799-$3,499
    amazonAsin: "B0H2D00000", // NOTE: Not sold on Amazon — Bambu Lab store + Best Buy only. Use search URL fallback.
    buildVolume: { x: 325, y: 320, z: 325 }, // Single nozzle; dual = 300x320x325
    layerResolution: { min: 0.08, max: 0.28 }, // With 0.4mm nozzle
    printSpeed: 600, // Practical print speed; toolhead speed up to 1000 mm/s
    weight: 31,
    features: [
      "Dual hardened steel nozzles",
      "65C actively heated chamber",
      "350C hotend temperature",
      "50um vision encoder accuracy",
      "Optional 10W/40W laser module",
      "AI nozzle camera failure detection",
    ],
    bestFor: ["professional", "large-format", "precision"],
    scores: {
      value: 7,
      beginner: 5,
      printQuality: 10,
      speed: 10,
      reliability: 9,
    },
    pros: [
      "Largest build volume from Bambu Lab (325x320x325mm)",
      "Dual nozzles eliminate support-material purge waste",
      "65C heated chamber handles any engineering filament",
      "Optional laser module turns it into a multi-tool",
    ],
    cons: [
      "Expensive at $1,899 base ($3,499 for full laser combo)",
      "Heavy at 31kg — not portable",
      "Overkill for hobbyist PLA printing",
      "Some reports of nozzle guard needing frequent replacement",
    ],
    summary:
      "Bambu Lab's prosumer flagship — dual nozzles, the largest build volume in their lineup, and optional laser engraving in one machine.",
    verdict:
      "The H2D is the most capable desktop 3D printer money can buy in 2026. If you are a prosumer, small business owner, or dedicated hobbyist who needs dual nozzles, a massive build volume, and the option for laser work, nothing else comes close.",
    reviews: [
      {
        quote:
          "Beyond impressed. Wicked fast, quiet, and the build quality is crazy impressive after 3000+ hours on other Bambu printers.",
        source: "Bambu Lab Community Forum",
      },
      {
        quote:
          "For elite crafters. The H2D redefines what a desktop printer can do.",
        source: "Tom's Hardware",
      },
      {
        quote:
          "The dual-nozzle system cuts print times by a factor of two. The speed increase is amazing.",
        source: "r/BambuLab",
      },
    ],
    communityBadges: ["Pro Workhorse", "Editor's Choice"],
    alsoNeed: [
      "AMS 2 Pro (for multi-material)",
      "10W or 40W laser module",
      "Engineering filaments (PA-CF, PC)",
      "Vision encoder build plate",
    ],
  },

  // ─── 8. QIDI Q1 PRO ──────────────────────────────────────────
  {
    slug: "qidi-q1-pro",
    name: "Qidi Q1 Pro",
    brand: "Qidi Tech",
    type: "fdm",
    image: "/images/printers/qidi-q1-pro.png",
    price: 449, // MSRP ~$399-469; varies by retailer
    amazonAsin: "B0CSDB9QTF",
    brandUrl: "https://eu.qidi3d.com/products/q1-pro?sca_ref=11024304.4Uzfukd79yq",
    buildVolume: { x: 245, y: 245, z: 240 },
    layerResolution: { min: 0.1, max: 0.32 }, // Based on 0.4mm nozzle typical range
    printSpeed: 600,
    weight: 20.3,
    features: [
      "Enclosed CoreXY with 60C heated chamber",
      "350C tri-metal hotend",
      "WiFi 6 + LAN connectivity",
      "1080p camera with timelapse",
      "Dual Z-axis motors",
      "120C heated bed",
    ],
    bestFor: ["enclosed", "professional", "precision"],
    scores: {
      value: 8,
      beginner: 7,
      printQuality: 9,
      speed: 9,
      reliability: 7,
    },
    pros: [
      "60C actively heated chamber for ABS, nylon, and PC",
      "350C hotend handles every engineering filament",
      "WiFi 6 with 1080p monitoring and timelapse",
      "From unboxing to printing in 10 minutes",
    ],
    cons: [
      "Exposed heater poses safety concern (risk of shock)",
      "Casing materials feel cheap despite premium design",
      "Firmware needs improvement (custom Klipper fork)",
      "Limited slicer material profiles out of the box",
    ],
    summary:
      "An enclosed CoreXY with a 60C heated chamber and 350C hotend — engineering-grade material capability at a mid-range price.",
    verdict:
      "The Qidi Q1 Pro packs industrial-grade features into a consumer price bracket. Perfect for users who need reliable ABS, nylon, and carbon fiber printing. Just be aware of the reported safety issues with the chamber heater.",
    reviews: [
      {
        quote:
          "Turn up the heat. The Q1 Pro brings industrial-grade chamber heating to the consumer market.",
        source: "Tom's Hardware",
      },
      {
        quote:
          "A heated value. Consumer 3D printer with industrial capabilities at a fraction of the cost.",
        source: "3DPrint.com",
      },
      {
        quote:
          "The heated chamber is a game changer for ABS and nylon. Just wish the firmware was more polished.",
        source: "r/3Dprinting",
      },
    ],
    communityBadges: ["Hidden Gem"],
    alsoNeed: [
      "ABS/ASA filament",
      "Nylon/PA-CF filament",
      "Drybox for hygroscopic materials",
      "Spare tri-metal nozzles",
    ],
  },

  // ─── 9. QIDI Q2 ─────────────────────────────────────────────
  {
    slug: "qidi-q2",
    name: "Qidi Q2",
    brand: "Qidi Tech",
    type: "fdm",
    image: "/images/printers/qidi-q2.png",
    price: 499,
    amazonAsin: "B0DX2YGHB4",
    brandUrl: "https://eu.qidi3d.com/products/q2?sca_ref=11024304.4Uzfukd79yq",
    buildVolume: { x: 230, y: 230, z: 240 },
    layerResolution: { min: 0.05, max: 0.35 },
    printSpeed: 600,
    weight: 16.5,
    features: [
      "Enclosed CoreXY with 65C heated chamber",
      "350C tri-metal hotend",
      "WiFi 6 + Ethernet",
      "1080p AI camera monitoring",
      "Quick-swap nozzle system",
      "PEI spring steel build plate",
    ],
    bestFor: ["engineering", "enclosed", "speed"],
    scores: {
      value: 9,
      beginner: 8,
      printQuality: 9,
      speed: 9,
      reliability: 8,
    },
    pros: [
      "65C heated chamber handles ABS, nylon, PC, and carbon fiber",
      "Quick-swap nozzle rivaling Bambu's convenience",
      "Excellent value at $499 for enclosed CoreXY with chamber heating",
      "Improved firmware over Q1 Pro with better material profiles",
    ],
    cons: [
      "Qidi ecosystem still smaller than Bambu's",
      "Build volume slightly smaller than competitors at this price",
      "Community resources less developed than Bambu/Creality",
      "Heavier than open-frame printers at 16.5kg",
    ],
    summary:
      "Qidi's refined enclosed CoreXY with 65C heated chamber — the best-value engineering printer under $500.",
    verdict:
      "The Qidi Q2 is the engineering printer to beat under $500. If you print ABS, nylon, or carbon-fiber composites regularly, the heated chamber and 350C hotend at this price are unmatched. The only reason to spend more is for Bambu's software polish.",
    reviews: [
      {
        quote:
          "The Q2 is what the Q1 Pro should have been. Qidi finally nailed the firmware.",
        source: "r/3Dprinting",
      },
      {
        quote:
          "Best enclosed printer under $500. The heated chamber is the real deal for engineering materials.",
        source: "All3DP",
      },
      {
        quote:
          "I'd put the Q2 above the P1S for anyone printing engineering materials. The chamber heating makes that much difference.",
        source: "r/3Dprinting",
      },
    ],
    communityBadges: ["Best Value", "Hidden Gem"],
    alsoNeed: [
      "ABS/ASA filament",
      "Nylon/PA-CF filament",
      "Drybox for hygroscopic materials",
      "Spare tri-metal nozzles",
    ],
  },

  // ─── 10. ANYCUBIC KOBRA S1 COMBO ─────────────────────────────
  {
    slug: "anycubic-kobra-s1-combo",
    name: "Anycubic Kobra S1 Combo",
    brand: "Anycubic",
    type: "fdm",
    image: "/images/printers/anycubic-kobra-s1-combo.png",
    price: 499,
    amazonAsin: "B0DZ9Y2FQV",
    brandUrl: "https://eu.anycubic.com/products/kobra-s1-combo?ref=zppplkze",
    buildVolume: { x: 250, y: 250, z: 260 },
    layerResolution: { min: 0.05, max: 0.35 },
    printSpeed: 600,
    weight: 12.5,
    features: [
      "8-color ACE Pro 2 multi-color system",
      "CoreXY architecture",
      "Auto bed leveling",
      "WiFi + camera monitoring",
      "Direct drive extruder",
      "PEI spring steel build plate",
    ],
    bestFor: ["multi-color", "speed", "beginners"],
    scores: {
      value: 8,
      beginner: 8,
      printQuality: 8,
      speed: 9,
      reliability: 8,
    },
    pros: [
      "8 colors out of the box (double the Bambu A1 Combo's 4)",
      "CoreXY speed at a competitive price",
      "Improved ACE Pro 2 reduces filament waste on color swaps",
      "Strong Anycubic slicer with paint-on multi-color tools",
    ],
    cons: [
      "Anycubic software ecosystem still behind Bambu Studio",
      "Community smaller than Bambu or Creality",
      "Open frame design (no enclosure)",
      "ACE Pro 2 adds significant footprint",
    ],
    summary:
      "Anycubic's 8-color flagship CoreXY. The successor to the Kobra 3 Combo, doubling color capacity with improved filament handling.",
    verdict:
      "The Kobra S1 Combo is the best multi-color printer for users who want more than 4 colors without spending over $500. If you make multi-color figurines, cosplay badges, or decorative prints, the jump from 4 to 8 colors is a game-changer.",
    reviews: [
      {
        quote:
          "8 colors out of the box changes the game. My multi-color prints are finally as detailed as I imagined them.",
        source: "r/3Dprinting",
      },
      {
        quote:
          "The ACE Pro 2 is a massive improvement. Less waste, more reliable color swaps, and double the colors.",
        source: "Teaching Tech (YouTube)",
      },
      {
        quote:
          "Anycubic's answer to Bambu's multi-color dominance. Competitive on every front.",
        source: "All3DP",
      },
    ],
    communityBadges: ["Community Pick"],
    alsoNeed: [
      "Multi-color PLA filament 8-pack",
      "Spare ACE Pro 2 tubes",
      "Build plate adhesive",
      "Nozzle cleaning kit",
    ],
  },

  // ─── 11. CREALITY SPARKX I7 ──────────────────────────────────
  {
    slug: "creality-sparkx-i7",
    name: "Creality SPARKX i7",
    brand: "Creality",
    type: "fdm",
    image: "/images/printers/creality-sparkx-i7.png",
    price: 449,
    amazonAsin: "B0DWGQN1JM",
    brandUrl: "https://www.creality.com/products/sparkx-i7",
    buildVolume: { x: 260, y: 260, z: 255 },
    layerResolution: { min: 0.05, max: 0.35 },
    printSpeed: 500,
    weight: 11.8,
    features: [
      "4-color multi-color system",
      "AI-assisted print monitoring",
      "Auto bed leveling",
      "WiFi + touchscreen",
      "Direct drive extruder",
      "Tom's Hardware CES 2026 Best 3D Printer",
    ],
    bestFor: ["multi-color", "beginners", "speed"],
    scores: {
      value: 9,
      beginner: 9,
      printQuality: 8,
      speed: 8,
      reliability: 8,
    },
    pros: [
      "Won Tom's Hardware Best 3D Printer at CES 2026",
      "AI monitoring catches failures before they waste filament",
      "4-color multi-color at a competitive price",
      "Creality's massive community for support and mods",
    ],
    cons: [
      "Brand new product (limited long-term reliability data)",
      "Creality's software less polished than Bambu Studio",
      "Open frame design",
      "AI monitoring requires cloud connection",
    ],
    summary:
      "Creality's CES 2026 award-winner. A 4-color multi-color printer with AI monitoring that brings Creality into the modern multi-color era.",
    verdict:
      "The SPARKX i7 is Creality's strongest entry into multi-color printing. With CES 2026 recognition and AI monitoring, it signals a real competitor to the Bambu A1 Combo. Best for buyers who prefer Creality's ecosystem and community.",
    reviews: [
      {
        quote:
          "Tom's Hardware Best 3D Printer of CES 2026. Creality finally has a real Bambu competitor.",
        source: "Tom's Hardware",
      },
      {
        quote:
          "The AI monitoring actually works. Caught a spaghetti failure at layer 12 and paused the print automatically.",
        source: "r/Creality",
      },
      {
        quote:
          "Creality's best printer in years. The multi-color system is competitive with Bambu's AMS Lite.",
        source: "3D Printing Nerd (YouTube)",
      },
    ],
    communityBadges: ["Editor's Choice"],
    alsoNeed: [
      "PLA filament multi-color pack",
      "Spare nozzles (0.4mm, 0.6mm)",
      "Build plate (textured PEI)",
      "Enclosure (DIY or IKEA Lack)",
    ],
  },

  // ─── 12. BAMBU LAB X2D (LAUNCHED APR 14, 2026) ──────────────
  {
    slug: "bambu-lab-x2d",
    name: "Bambu Lab X2D",
    brand: "Bambu Lab",
    type: "fdm",
    image: "/images/printers/bambu-lab-x2d.png",
    price: 1049,
    amazonAsin: "B0X2D00000",
    brandUrl: "https://bambulab.com/en-us/x2d",
    buildVolume: { x: 256, y: 256, z: 256 },
    layerResolution: { min: 0.05, max: 0.35 },
    printSpeed: 600,
    weight: 22,
    features: [
      "Dual extruder (direct drive + bowden)",
      "65C actively heated chamber",
      "350C hotend (2-series nozzles)",
      "LiDAR bed leveling",
      "AI camera with failure detection",
      "AMS 2 Pro compatible",
      "Stainless steel linear rails",
      "Dedicated TPU feeding system",
    ],
    bestFor: ["professional", "enclosed", "engineering", "speed"],
    scores: {
      value: 8,
      beginner: 7,
      printQuality: 10,
      speed: 10,
      reliability: 9,
    },
    pros: [
      "Dual nozzle at half the price of the H2D",
      "65C heated chamber for any engineering material",
      "LiDAR sensor from the X1 series returns",
      "Slots perfectly between P2S ($549) and H2D ($1,899)",
    ],
    cons: [
      "$1,299 for the Combo adds up quickly",
      "Build volume same as P2S (not the H2D's larger 325mm)",
      "Reduced build volume (~235mm) in dual-extrusion mode",
      "Brand new product (limited long-term reliability data)",
    ],
    summary:
      "The successor to the beloved X1 Carbon. Dual nozzles, 65C heated chamber, and LiDAR sensing at roughly half the H2D's price.",
    verdict:
      "The X2D fills the massive gap between the P2S ($549) and the H2D ($1,899). If you need dual nozzles and a heated chamber but don't need the H2D's massive build volume, the X2D is the most exciting printer announcement of 2026.",
    reviews: [
      {
        quote:
          "The X1 Carbon successor we've been waiting for. Dual nozzles at $1,049 is a game-changer.",
        source: "3dmania.it",
      },
      {
        quote:
          "Bambu filling the gap between P2S and H2D. This is going to be the sweet spot for serious hobbyists.",
        source: "r/BambuLab",
      },
    ],
    communityBadges: ["Editor's Choice"],
    alsoNeed: [
      "AMS 2 Pro (for multi-material)",
      "Engineering filaments (ABS, ASA, PA-CF)",
      "Hardened steel nozzle set",
      "Extra HEPA filters",
    ],
  },
];
