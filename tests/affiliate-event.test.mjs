import assert from "node:assert/strict";
import { buildAffiliateEvent } from "../src/lib/affiliate-event.ts";

const amazon = buildAffiliateEvent({
  partner: "amazon",
  printer: "Bambu Lab A1 Combo",
  price: 399,
  asin: "B0D17V4SKM",
  resolvedAsin: "B0D17V4SKM",
  linkType: "direct",
  linkUrl: "https://www.amazon.com/dp/B0D17V4SKM?tag=printpick20-20",
  ctaPosition: "printer_card",
}, "/printers/bambu-lab-a1-combo");

assert.equal(amazon.eventName, "affiliate_click");
assert.equal(amazon.ga4Params.affiliate_partner, "amazon");
assert.equal(amazon.ga4Params.product_name, "Bambu Lab A1 Combo");
assert.equal(amazon.ga4Params.asin, "B0D17V4SKM");
assert.equal(amazon.ga4Params.resolved_asin, "B0D17V4SKM");
assert.equal(amazon.ga4Params.link_type, "direct");
assert.equal(amazon.ga4Params.cta_position, "printer_card");
assert.equal(amazon.ga4Params.page_path, "/printers/bambu-lab-a1-combo");
assert.equal(amazon.ga4Params.value, 11.97);
assert.equal(amazon.ga4Params.currency, "USD");
assert.equal(amazon.notifyBody.sourcePage, "/printers/bambu-lab-a1-combo");
assert.equal(amazon.notifyBody.partner, "amazon");

const brand = buildAffiliateEvent({
  partner: "brand_direct",
  printer: "Elegoo Mars 5 Ultra",
  brand: "Elegoo",
  price: 269,
  linkUrl: "https://www.awin1.com/cread.php?awinmid=61127&awinaffid=2841442",
  ctaPosition: "review_primary",
}, "/printers/elegoo-mars-5-ultra");

assert.equal(brand.ga4Params.affiliate_partner, "brand_direct");
assert.equal(brand.ga4Params.brand, "Elegoo");
assert.equal(brand.ga4Params.value, undefined);
assert.equal(brand.notifyBody.asin, null);
assert.equal(brand.notifyBody.linkType, null);

console.log("affiliate-event tests passed");
