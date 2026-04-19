/**
 * Amazon affiliate link generation with ASIN remap + search fallback.
 *
 * Strategy:
 *   1. Check if the ASIN is in the remap table (known-bad or placeholder ASINs).
 *      - If remapped to a real ASIN, use the remapped value.
 *      - If remapped to `null`, skip direct link and use search fallback.
 *   2. If the ASIN looks like a real Amazon ASIN (starts with "B0" and is 10 chars),
 *      generate a direct /dp/ link.
 *   3. Otherwise, fall back to a search URL with the printer name.
 *
 * All links include the printpick20-20 affiliate tag.
 */

export const AFFILIATE_TAG = "printpick20-20";

/**
 * Remap table for known-bad, placeholder, or changed ASINs.
 *
 * - Map to a string to redirect to a different (correct) ASIN.
 * - Map to `null` to force search-URL fallback (product not sold on Amazon).
 */
const ASIN_REMAP: Readonly<Record<string, string | null>> = {
  // Bambu Lab P2S, not sold on Amazon, only through Bambu store + Best Buy
  "B0P2S00000": null,
  // Bambu Lab H2D, not sold on Amazon, only through Bambu store + Best Buy
  "B0H2D00000": null,
  // Elegoo Saturn 4 Ultra, ASIN delisted/404 as of 2026-04-04, fallback to search
  "B0D9FM4KFN": null,
  // QIDI X-Plus 3, ASIN 404 as of 2026-04-11, fallback to search
  "B0CM49X31W": null,
  // Creality Ender 3 V3, ASIN 404 as of 2026-04-11, fallback to search
  "B0DFN3QQ3F": null,
  // Creality K2 Plus, ASIN 404 as of 2026-04-11, fallback to search
  "B0DHGQVYMP": null,
  // Anycubic Photon Mono 4, ASIN 404 as of 2026-04-11, fallback to search
  "B0DJKFQ8JN": null,
  // Bambu Lab X2D, not yet released, placeholder ASIN, fallback to search
  "B0X2D00000": null,
  // Creality Hi Combo, ASIN redirects to search as of 2026-04-19, fallback to search
  "B0DN69LXDW": null,
  // Creality SPARKX I7 Combo, ASIN redirects to search as of 2026-04-19, fallback to search
  "B0GJSBSLQ6": null,
  // Elegoo Centauri Carbon, ASIN redirects to search as of 2026-04-19 (brandUrl routes via Awin; this is a defensive fallback)
  "B0FDQP54X8": null,
  // Elegoo Centauri Carbon 2 Combo, ASIN redirects to search as of 2026-04-19 (brandUrl routes via Awin; this is a defensive fallback)
  "B0G4TPZPZM": null,

  // === Batch remap 2026-04-19 — Playwright US-runner verification ===
  // All below were confirmed "Page Not Found" on Amazon (or reassigned to an
  // unrelated product) by scripts/verify-amazon-asins.mjs. Falling back to
  // search preserves the printpick20-20 tag while the catalog ASINs get
  // hand-refreshed. Re-verify weekly via the GitHub Actions workflow.
  "B0CL8ZQM3J": null, // anycubic-kobra-2-max
  "B0DDX1B3V6": null, // anycubic-kobra-3
  "B0DDX1C2V5": null, // anycubic-kobra-3-combo
  "B0BTRM8KKY": null, // anycubic-photon-mono-2
  "B0CJPKFQR7": null, // anycubic-photon-mono-m5s
  "B0B5RJQXGP": null, // artillery-genius-pro
  "B0D5RX8MHS": null, // artillery-sidewinder-x4-plus
  "B0CJPKFQLN": null, // bambu-lab-a1
  "B0CJPKFQPN": null, // bambu-lab-a1-combo
  "B0CL2KMFM4": null, // bambu-lab-a1-mini
  "B0C6HGJQ8N": null, // bambu-lab-p1p
  "B0C9KMRH6Z": null, // bambu-lab-p1s
  "B0BZ3CR7WW": null, // bambu-lab-x1-carbon
  "B0C5LQ7KND": null, // creality-cr-m4
  "B0CML9QXZK": null, // creality-ender-3-v3-ke
  // DANGER: ASIN below was reassigned to a Scandinavian dining mat. Shipping
  // users there from a K1 Max CTA and claiming commission would breach
  // Amazon Associates ToS. Null-remap defuses this immediately.
  "B0C5KXMPZ8": null, // creality-ender-3-v3-se — reassigned to unrelated product
  "B0BSLR9J4M": null, // creality-ender-5-s1
  "B0BLY6P37G": null, // creality-halot-mage-pro
  "B0CG2P8RQN": null, // creality-k1
  "B0CG2P8QQN": null, // creality-k1-max
  "B0CKVQJRP9": null, // elegoo-mars-4
  "B0CKVQJLP3": null, // elegoo-mars-4-ultra
  "B0D9FQWK7N": null, // elegoo-mars-5-ultra
  "B0C74BKJL6": null, // elegoo-neptune-4
  "B0C74BJRXM": null, // elegoo-neptune-4-max
  "B0C74BVCFC": null, // elegoo-neptune-4-pro
  "B0CGTH1GPD": null, // elegoo-saturn-3-ultra
  "B0D8K2MNQR": null, // flashforge-adventurer-5m
  "B0D8K2MNFL": null, // flashforge-adventurer-5m-pro
  "B0CKVQJLR5": null, // kingroon-klp1
  "B0BVL3BGWH": null, // kingroon-kp3s-pro-v2
  "B0BGY93HWX": null, // longer-orange-4k
  "B0BGY93HZX": null, // longer-orange-4k-v2
  "B0CGVQHB2P": null, // phrozen-sonic-mega-8k-s2
  "B09BQHJ5ZQ": null, // phrozen-sonic-mini-4k
  "B0BN7XMFWR": null, // phrozen-sonic-mini-8k-s
  "B0DRMTFZ9X": null, // prusa-mk4s
  "B0DSPDQNF3": null, // prusa-xl
  "B0CM49W3NK": null, // qidi-ibox-mono2
  "B0CM4QVY5Z": null, // qidi-x-max-3
  "B0CM49W2LK": null, // qidi-x-smart-3
  "B0CGVQHCZP": null, // sovol-sv06-plus
  "B0CGVQHBZN": null, // sovol-sv07-plus
  "B0D4FZPWV6": null, // sovol-sv08
  "B09J4P9JRQ": null, // voxelab-aquila-x2
};

export type AmazonLinkType = "direct" | "search";

export interface AmazonLink {
  readonly url: string;
  readonly type: AmazonLinkType;
  readonly resolvedAsin: string | null;
}

/**
 * Returns true if the ASIN looks like a valid Amazon ASIN format.
 * Real ASINs are 10 characters starting with "B0".
 */
function isValidAsinFormat(asin: string): boolean {
  return /^B0[A-Z0-9]{8}$/.test(asin);
}

/**
 * Build an Amazon search fallback URL.
 */
function buildSearchUrl(printerName: string): string {
  const query = encodeURIComponent(printerName + " 3D Printer");
  return `https://www.amazon.com/s?k=${query}&tag=${AFFILIATE_TAG}`;
}

/**
 * Build a direct Amazon product URL from an ASIN.
 */
function buildDirectUrl(asin: string): string {
  return `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`;
}

/**
 * Generate an Amazon affiliate link with ASIN remap and search fallback.
 *
 * Priority:
 *   1. ASIN remap table (corrects or nullifies known-bad ASINs)
 *   2. Direct /dp/ link if ASIN looks valid
 *   3. Search URL fallback using printer name
 */
export function getAmazonLink(asin: string, printerName: string): AmazonLink {
  // Check remap table first
  if (asin in ASIN_REMAP) {
    const remapped = ASIN_REMAP[asin];

    if (remapped !== null && remapped !== undefined) {
      // Remapped to a different real ASIN
      return {
        url: buildDirectUrl(remapped),
        type: "direct",
        resolvedAsin: remapped,
      };
    }

    // Remapped to null = force search fallback
    return {
      url: buildSearchUrl(printerName),
      type: "search",
      resolvedAsin: null,
    };
  }

  // Valid-looking ASIN = direct link
  if (isValidAsinFormat(asin)) {
    return {
      url: buildDirectUrl(asin),
      type: "direct",
      resolvedAsin: asin,
    };
  }

  // Fallback: search URL
  return {
    url: buildSearchUrl(printerName),
    type: "search",
    resolvedAsin: null,
  };
}

/**
 * Convenience wrapper that returns just the URL string.
 * Drop-in replacement for the old getAmazonUrl function.
 */
export function getAmazonUrl(asin: string, printerName?: string): string {
  const name = printerName ?? asin;
  return getAmazonLink(asin, name).url;
}
