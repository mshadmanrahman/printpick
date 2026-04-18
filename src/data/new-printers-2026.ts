/**
 * New printers to add to the PrintPick database (April 2026)
 *
 * Research compiled from manufacturer specs, Tom's Hardware, All3DP,
 * Reddit, and community forums.
 *
 * Items marked "unconfirmed" need manual verification before publishing.
 */

import type { Printer } from "./printers";
import { ELEGOO_AFFILIATE_URLS } from "@/lib/awin-affiliate";

export const newPrinters2026: readonly Printer[] = [
  // ─── 1. BAMBU LAB P2S ───────────────────────────────────────────
  {
    slug: "bambu-lab-p2s",
    name: "Bambu Lab P2S",
    brand: "Bambu Lab",
    type: "fdm",
    image: "/images/printers/bambu-lab-p2s.png",
    price: 549,
    amazonAsin: "B0P2S00000", // NOTE: Not sold on Amazon directly, Bambu Lab sells through own store + Best Buy. Use search URL fallback.
    brandUrl: "/go/3djake/bambu-p2s",
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
      "Quick-swap nozzle: no tools, no waiting for cool-down, no thread damage from hot-tightening",
      "1080p AI camera pauses the print when it detects layer failures, not just notifies you",
      "AMS 2 Pro dries filament while printing so you don't need a separate drybox for standard materials",
      "5-inch touchscreen is large enough to actually use without squinting at a 2-inch screen",
    ],
    cons: [
      "No LiDAR sensor: that capability is still exclusive to the X-series",
      "P1S owners have no trade-in path; the upgrade cost is the full $549",
      "Multi-color purges still waste filament; purge blocks help but don't fix the root issue",
      "The $799 Combo version gets close enough to the H2D's price that a comparison is warranted",
    ],
    summary:
      "P1S replaced by a meaningfully better machine at the same price. Quick-swap nozzles, 5-inch touchscreen, 1080p AI camera, AMS 2 Pro compatibility. $549.",
    verdict:
      "Best enclosed CoreXY under $600 right now. New buyers: this is the answer, skip the P1S comparison. P1S owners: the nozzle system and AMS 2 Pro drying tip the scales toward upgrading, but only if you use those features regularly.",
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
      "CES 2026 winner and it shows: the out-of-box experience is genuinely polished",
      "AI photo-to-3D is gimmicky but actually fun",
      "Klipper under the hood, root access included",
      "Under 10kg, quiet, easy to move around",
    ],
    cons: [
      "16-page privacy policy just to set it up",
      "CFS Lite has no spool retract",
      "New product, thin community troubleshooting pool",
      "Creality Cloud app is a mess",
    ],
    summary:
      "Creality's CES 2026 award winner. Built for people who want multi-color printing without reading a manual.",
    verdict:
      "Easiest path from unboxing to multi-color prints on the market. Power users will hit walls quickly. Everyone else: this is your printer.",
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
          "When 3D printing stops feeling intimidating, that's the SparkX i7 experience.",
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
      "16 colors with 4 CFS modules if you go all-in",
      "All-metal CoreXY body that feels solid for $399",
      "300mm Z-axis beats most competitors at this price",
      "Multi-color CoreXY at $399 is genuinely rare",
    ],
    cons: [
      "CFS feed reliability is inconsistent on color changes",
      "No adaptive purge, fixed volumes waste filament",
      "PTFE tube alignment is fiddly and matters a lot",
      "3.8/5 customer rating hints at QC variance",
    ],
    summary:
      "Creality's shot at the Bambu A1 Combo. CoreXY, up to 16 colors, $399. The specs look great; the execution needs work.",
    verdict:
      "Impressive on paper, shakier in practice. Multi-color reliability trails Bambu's AMS. Worth it if you're comfortable tinkering and want the CoreXY build quality without paying Bambu prices.",
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
    brandUrl: ELEGOO_AFFILIATE_URLS.centauriCarbon,
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
      "Enclosed CoreXY at $299. Yes, really.",
      "PLA, PETG, ABS: all print well out of the box",
      "Pre-assembled, printing within minutes of opening the box",
      "Carbon-fiber-infused materials are a go",
    ],
    cons: [
      "Firmware needs attention after unboxing",
      "Heat creep shows up on long prints above 270C",
      "Elegoo's ecosystem is years behind Bambu's",
      "17.5kg for a 256mm build volume is heavy",
    ],
    summary:
      "Enclosed, pre-assembled CoreXY for $299. It disrupted the budget market the moment it launched.",
    verdict:
      "Best value in 3D printing right now, full stop. Firmware is rough around the edges but nothing that kills the deal. If this is your budget, buy it.",
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
    brandUrl: ELEGOO_AFFILIATE_URLS.centauriCarbon2Combo,
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
      "First enclosed multi-color CoreXY under $500",
      "91% first-attempt success rate on multi-color jobs",
      "RFID reads filament type automatically, no manual input",
      "TPU prints without complaints",
    ],
    cons: [
      "Spool holders are finicky",
      "Loading routine doesn't get hot enough for high-temp filaments",
      "Build plate grip is mediocre",
      "Canvas software works but looks like it was designed fast",
    ],
    summary:
      "Centauri Carbon with 4-color Canvas printing added. Enclosed CoreXY, multi-color, $449. Nothing else matches it at this price.",
    verdict:
      "Best sub-$500 multi-color printer in 2026. Quirks exist but none are deal-breakers. Enclosed CoreXY plus 4-color at this number has no real competition.",
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
      "Prusa reliability is not marketing. It's earned over years.",
      "55C active chamber heating handles demanding materials",
      "Fully open-source, no vendor lock-in anywhere",
      "Kit option at $949 saves 21% if you don't mind the build",
    ],
    cons: [
      "$1,199 assembled is hard to justify against the Bambu alternatives",
      "Build volume is smaller than what you'd expect at this price",
      "22.5kg is a lot to move around",
      "No LiDAR, no AI monitoring",
    ],
    summary:
      "Prusa's first CoreXY. Enclosed, actively heated chamber, open-source to the core. For people who've trusted Prusa before.",
    verdict:
      "Outstanding print quality and the best support in the business. The price premium is real, though. If you don't care about the Prusa ecosystem specifically, there are better deals. If you do, it's worth every krona.",
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
    amazonAsin: "B0H2D00000", // NOTE: Not sold on Amazon, Bambu Lab store + Best Buy only. Use search URL fallback.
    brandUrl: "/go/3djake/bambu-h2d",
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
      "325x320x325mm, Bambu's biggest build volume",
      "Dual nozzles cut support-material waste dramatically",
      "65C chamber heating: any engineering filament, no drama",
      "Optional laser module adds engraving without a second machine",
    ],
    cons: [
      "$1,899 base, $3,499 if you want the full laser combo",
      "31kg; this thing isn't moving desks often",
      "Serious overkill for anyone just printing PLA",
      "Nozzle guard replacements are more frequent than expected",
    ],
    summary:
      "Bambu's prosumer flagship. Dual nozzles, their biggest build volume, optional laser. The machine you buy when you've outgrown everything else.",
    verdict:
      "Most capable desktop printer you can buy in 2026. Prosumer, small business, serious hobbyist: if you need dual nozzles, a large build volume, and laser as an option, nothing else is in the same conversation.",
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
      "60C chamber heating: ABS, nylon, and PC without warping",
      "350C hotend handles every engineering filament you'll throw at it",
      "WiFi 6, 1080p monitoring, timelapse built in",
      "Printing within 10 minutes of unboxing",
    ],
    cons: [
      "Exposed heater is a genuine safety concern, not just a nitpick",
      "Casing feels cheaper than the spec sheet suggests",
      "Klipper fork firmware needs work",
      "Thin material profiles out of the box",
    ],
    summary:
      "Enclosed CoreXY with 60C heated chamber and 350C hotend. Engineering-grade capability without the engineering-grade price.",
    verdict:
      "Packs industrial features into a consumer bracket. ABS, nylon, carbon fiber: all reliable. The exposed chamber heater safety issue is real though, not something to wave off.",
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
      "65C chamber heating: ABS, nylon, PC, carbon fiber without drama",
      "Quick-swap nozzle that's actually on par with Bambu's",
      "Enclosed CoreXY with chamber heating at $499 is genuinely rare",
      "Firmware is noticeably better than the Q1 Pro",
    ],
    cons: [
      "Qidi ecosystem still a fraction of Bambu's size",
      "Build volume is a touch smaller than competitors at this price",
      "Community resources are thin compared to Bambu or Creality",
      "16.5kg is heavy for an open-frame-sized footprint",
    ],
    summary:
      "Qidi's refined enclosed CoreXY. 65C heated chamber, 350C hotend, $499. Best-value engineering printer at this price point.",
    verdict:
      "Engineering printer to beat under $500. Print ABS, nylon, or carbon fiber regularly? Heated chamber and 350C hotend at this price have no real competition. Only reason to go further is Bambu's software polish.",
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
    image: "/images/printers/anycubic-kobra-s1-combo.webp",
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
      "8 colors out of the box, double what the Bambu A1 Combo offers",
      "CoreXY speed at a competitive price point",
      "ACE Pro 2 wastes less filament on color swaps than its predecessor",
      "Paint-on multi-color tools in the Anycubic slicer are genuinely good",
    ],
    cons: [
      "Anycubic's software is solid but still behind Bambu Studio",
      "Community is smaller than Bambu or Creality",
      "No enclosure",
      "ACE Pro 2 takes up a lot of desk space",
    ],
    summary:
      "Anycubic's 8-color CoreXY flagship. Kobra 3 Combo follow-up, doubled the color capacity, improved the filament handling.",
    verdict:
      "Best multi-color pick if you want more than 4 colors and can't justify going over $500. For figurines, cosplay parts, and detailed decorative prints, the jump from 4 to 8 colors matters more than the spec sheet suggests.",
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
      "Tom's Hardware Best 3D Printer at CES 2026, not a paid placement",
      "AI monitoring that actually pauses on failures rather than just alerting",
      "4-color multi-color at a price that doesn't sting",
      "Creality's community is enormous: mods, fixes, guides everywhere",
    ],
    cons: [
      "New product. No long-term reliability data yet.",
      "Software trails Bambu Studio by a noticeable margin",
      "Open frame",
      "AI monitoring needs a cloud connection to work",
    ],
    summary:
      "Creality's CES 2026 award winner. 4-color printing, AI monitoring, and a solid entry into the multi-color era for Creality.",
    verdict:
      "Creality's best multi-color printer yet. CES recognition and AI monitoring are the real deal. Best for buyers already in the Creality ecosystem or who want the community behind them.",
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
    image: "/images/printers/bambu-lab-x2d.jpg",
    price: 649,
    amazonAsin: "B0X2D00000",
    brandUrl: "/go/3djake/bambu-x2d",
    buildVolume: { x: 256, y: 256, z: 260 },
    layerResolution: { min: 0.05, max: 0.35 },
    printSpeed: 600,
    weight: 22,
    features: [
      "Dual extruder (direct drive + bowden)",
      "65C actively heated chamber",
      "300C hotend with servo extruder and real-time flow sensing",
      "Optional Vision Encoder (50-micron motion accuracy)",
      "31 sensors monitoring feed path, thermals, and safety",
      "AI camera with failure detection",
      "AMS 2 Pro compatible",
      "Stainless steel linear rails",
      "3-stage air filtration (G3 + H12 HEPA + activated carbon)",
      "Sub-50dB noise level",
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
      "Dual nozzle at $649, a third of what the H2D costs",
      "65C heated chamber handles any engineering material you'll realistically use",
      "31 sensors and a servo extruder with real-time flow compensation",
      "$100 more than the P2S for dual nozzles and active chamber heating",
      "Sub-50dB and 3-stage HEPA: runs quietly in a home office",
    ],
    cons: [
      "Same build volume as the P2S, not the H2D's bigger 325mm",
      "Dual-extrusion mode shrinks the usable X to around 235.5mm",
      "Brand new. No long-term reliability data yet.",
      "Vision Encoder is extra, not in the base price",
    ],
    summary:
      "X1 Carbon follow-up. Dual nozzles, 65C heated chamber, 31 sensors, servo extruder at $649. A third of the H2D's price.",
    verdict:
      "At $649 the X2D kills the gap that used to exist between the P2S and the H2D. For $100 more than a P2S you get dual nozzles, active chamber heating, and a servo extruder with flow sensing. The $899 Combo is the sweet spot for serious hobbyists. Most aggressively priced printer launch of 2026.",
    reviews: [
      {
        quote:
          "Exceptional print quality, material compatibility, and all at a superb price.",
        source: "TechRadar",
      },
      {
        quote:
          "Improving a fan favorite. The X2D delivers where it counts.",
        source: "Tom's Hardware",
      },
    ],
    communityBadges: ["Editor's Choice"],
    alsoNeed: [
      "AMS 2 Pro ($899 Combo includes it)",
      "Engineering filaments (ABS, ASA, PA-CF)",
      "Vision Encoder module (optional, for 50-micron accuracy)",
      "Extra HEPA filters (3-stage system built in)",
    ],
  },

  // ─── 11. ANYCUBIC KOBRA S1 ACE 2 PRO COMBO ───────────────────
  // Launched April 24, 2026. Early bird price €459 through May 31, 2026.
  // 16-color variant (upgraded ACE 2 Pro) — distinct from the 8-color Kobra S1 Combo (slug: anycubic-kobra-s1-combo).
  {
    slug: "anycubic-kobra-s1-ace-2-pro-combo",
    name: "Anycubic Kobra S1 ACE 2 Pro Combo",
    brand: "Anycubic",
    type: "fdm",
    image: "/images/printers/anycubic-kobra-s1-ace-2-pro-combo.png",
    price: 499, // Early bird €459 (Apr 24 – May 31); reverts to ~€549 after promo. USD TBC.
    amazonAsin: "B0KS1ACE00", // NOTE: Not confirmed on Amazon at launch — Anycubic EU direct store is primary.
    brandUrl:
      "https://eu.anycubic.com/pages/kobra-s1-ace-2-pro-combo-new-launch?ref=zppplkze",
    buildVolume: { x: 250, y: 250, z: 250 },
    layerResolution: { min: 0.05, max: 0.35 },
    printSpeed: 600,
    weight: 13.0,
    features: [
      "ACE 2 Pro multi-color system (up to 16 colors)",
      "Fully-enclosed CoreXY architecture",
      "Upgraded hotend (all-filament compatible)",
      "Quiet print mode (~44dB)",
      "600mm/s ultra-fast printing",
      "250x250x250mm build volume",
    ],
    bestFor: ["multi-color", "speed", "enclosed"],
    scores: {
      value: 9,
      beginner: 7,
      printQuality: 8,
      speed: 9,
      reliability: 7,
    },
    pros: [
      "16 colors out of the box — doubles the 8-color S1 Combo and quadruples the Bambu A1 Combo (4)",
      "Fully enclosed CoreXY handles ABS, ASA, and engineering filaments without warping",
      "44dB quiet mode is unusually low for a 600mm/s CoreXY — apartment-friendly",
      "Upgraded hotend is rated for the full Anycubic filament range",
      "Early bird €459 undercuts the Bambu P2S (€549) and matches pricing of the older 8-color S1 Combo",
    ],
    cons: [
      "Brand new product — early adopter risk on firmware and ACE 2 Pro reliability",
      "Anycubic slicer still trails Bambu Studio on automation and profile polish",
      "ACE 2 Pro adds significant desk footprint",
      "Early bird pricing ends May 31 — regular price expected to climb",
    ],
    summary:
      "Anycubic's 16-color enclosed CoreXY flagship. Successor to the Kobra S1 Combo with a fully-enclosed chamber, quieter print mode (44dB), and the upgraded ACE 2 Pro multi-material system that doubles color capacity from 8 to 16.",
    verdict:
      "At €459 early bird, this is the most aggressive 16-color enclosed CoreXY on the market. If you already know you want multi-color and don't want Bambu's walled garden, the early bird window (April 24 to May 31) makes this a near-automatic recommendation. For casual multi-color users, the 8-color Kobra S1 Combo remains the better value — 16 colors is overkill unless you print flags, pixel art, or multi-material models regularly.",
    reviews: [
      {
        quote:
          "16 colors on an enclosed CoreXY for under €500 was not on my 2026 bingo card. Anycubic is swinging hard at Bambu's multi-color dominance.",
        source: "Press announcement — awaiting independent reviews",
      },
    ],
    communityBadges: ["Community Pick"],
    alsoNeed: [
      "ACE 2 Pro filament bundles (16-color packs)",
      "Anycubic PLA Ultra / PETG multi-color spools",
      "Drybox for hygroscopic filaments",
      "Spare upgraded hotend",
    ],
  },
];
