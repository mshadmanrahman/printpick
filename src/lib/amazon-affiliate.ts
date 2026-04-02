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
  // Bambu Lab P2S — not sold on Amazon, only through Bambu store + Best Buy
  "B0P2S00000": null,
  // Bambu Lab H2D — not sold on Amazon, only through Bambu store + Best Buy
  "B0H2D00000": null,
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
