/**
 * Awin affiliate deep link generation.
 *
 * Awin deep links wrap any advertiser destination URL in a tracking redirect
 * so that clicks, conversions, and commissions are attributed to this
 * publisher account. The generated URL has the shape:
 *
 *   https://www.awin1.com/cread.php?awinmid={advertiser}&awinaffid={publisher}&ued={encoded_destination}
 *
 * If Awin's Link Builder or Chrome extension later provides a different URL
 * pattern (e.g. short links via a custom tracking domain), swap the
 * implementation of `getAwinDeepLink` and every consumer automatically picks
 * up the new format.
 *
 * Publisher ID 2841442 is this site's Awin account. Advertiser IDs are
 * assigned per program when acceptance completes.
 */

export const AWIN_PUBLISHER_ID = "2841442";

/**
 * Awin advertiser (merchant) IDs for programs this site has been accepted into.
 * Source of truth: Awin dashboard > Advertisers > Joined programs.
 */
export const AWIN_ADVERTISER_IDS = {
  /**
   * HONGKONG ELEGOO TECHNOLOGY LIMITED — approved 2026-04-16.
   * Commission: 5% flat (sale), no tiers, confirmed via Awin Commission Rates
   * timeline showing 5.00%-5.00% through at least 2026-05-31.
   */
  elegoo: "61127",
} as const;

export type AwinAdvertiser = keyof typeof AWIN_ADVERTISER_IDS;

/**
 * Wrap a destination URL with an Awin tracking redirect.
 *
 * @param advertiser Named Awin advertiser key (e.g. "elegoo")
 * @param destinationUrl The raw advertiser product/landing page URL
 * @returns The Awin-wrapped tracking URL
 */
export function getAwinDeepLink(
  advertiser: AwinAdvertiser,
  destinationUrl: string,
): string {
  const awinmid = AWIN_ADVERTISER_IDS[advertiser];
  const encoded = encodeURIComponent(destinationUrl);
  return `https://www.awin1.com/cread.php?awinmid=${awinmid}&awinaffid=${AWIN_PUBLISHER_ID}&ued=${encoded}`;
}

/**
 * Convenience wrappers for the specific Elegoo product pages linked from
 * the printer catalog. Centralising these here means every Elegoo product
 * page across the catalog and blog uses the same tracked URL, and a rate
 * change or merchant ID update is a single-file edit.
 *
 * Destination URLs verified against elegoo.com/collections/3d-printers on
 * 2026-04-17 (all return HTTP 200 with a real browser user-agent). Elegoo's
 * Shopify slugs are inconsistent: some carry the "elegoo-" brand prefix and
 * long spec descriptors, others are bare product names. Do not guess new
 * slugs; pull them from the collection page before adding a product here.
 */
export const ELEGOO_AFFILIATE_URLS = {
  mars5Ultra: getAwinDeepLink(
    "elegoo",
    "https://www.elegoo.com/products/mars-5-ultra-9k-7inch-monochrome-lcd-resin-3d-printer",
  ),
  saturn4Ultra: getAwinDeepLink(
    "elegoo",
    "https://www.elegoo.com/products/saturn-4-ultra-12k-10inch-monochrome-lcd-resin-3d-printer",
  ),
  neptune4Pro: getAwinDeepLink(
    "elegoo",
    "https://www.elegoo.com/products/elegoo-neptune-4-pro-fdm-3d-printer",
  ),
  centauriCarbon: getAwinDeepLink(
    "elegoo",
    "https://www.elegoo.com/products/centauri-carbon",
  ),
  centauriCarbon2Combo: getAwinDeepLink(
    "elegoo",
    "https://www.elegoo.com/products/centauri-carbon-2-combo",
  ),
} as const;
