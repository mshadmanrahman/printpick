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
  // Verified against live Amazon by scripts/verify-amazon-asins.mjs on 2026-07-30
  // (72 ASINs scanned: 61 verified, 11 returning Page Not Found). Pruned from 60
  // entries to 13 on the same date: the other 47 pointed at ASINs no longer
  // referenced anywhere in src/, so getAmazonLink was never called with them.
  //
  // Re-verify weekly. When an entry here starts verifying as live AND buyable,
  // delete it so direct /dp/ links resume.

  // --- Real ASIN, correct product, listing live but NOT currently buyable ---
  // Both render an outOfStock block with no add-to-cart, so a direct /dp/ link
  // dead-ends. Suppressing the Amazon CTA hands off to BrandButton instead.
  // Delete these two once Amazon restocks.
  "B0FPKNK7QF": null, // bambu-lab-h2d, listing titled "Bambu Lab H2D AMS Combo"
  "B0GQMN8VLS": null, // bambu-lab-a1-combo, "A1 Combo + LED Lamp Kit (with AMS lite)"

  // --- Placeholder ASINs that were never real listings ---
  // Hand-written stand-ins from before each product had a confirmed ASIN. All
  // 404. Replace with the real ASIN if the product ever reaches Amazon US.
  "B0P2S00000": null, // bambu-lab-p2s, Bambu store + Best Buy only
  "B0X2D00000": null, // bambu-lab-x2d, not yet released
  "B0X1CARBCO": null, // bambu-lab-x1-carbon-combo
  "B0JUPTRSE0": null, // elegoo-jupiter-se, now monetised via Awin brandUrl instead
  "B0KBR2PR00": null, // anycubic-kobra-2-pro

  // --- Real ASINs that now 404 on Amazon (delisted) ---
  "B0FFCR5P00": null, // flashforge-creator-5-pro, direct/specialty retailers only
  "B0CM49W3NK": null, // qidi-ibox-mono2
  "B0BVL3BGWH": null, // kingroon-kp3s-pro-v2, brand store is the only buy path
  "B09BQHJ5ZQ": null, // phrozen-sonic-mini-4k, brand store is the only buy path
  "B0CKVQJLR5": null, // kingroon-klp1, no buy path anywhere, marked discontinued
  "B0BGY93HZX": null, // longer-orange-4k-v2, no buy path anywhere, marked discontinued

  // Historical warning worth keeping even though the entry is gone: B0C5KXMPZ8
  // was once creality-ender-3-v3-se and Amazon reassigned it to an unrelated
  // Scandinavian dining mat. If an ASIN ever verifies "live" but the title does
  // not match the product, treat it as reassigned, not fixed. Claiming
  // commission on a reassigned listing would breach the Associates ToS.

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
