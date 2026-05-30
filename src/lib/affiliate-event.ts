export type AffiliatePartner = "amazon" | "brand_direct";
export type AmazonLinkType = "direct" | "search";

export interface AffiliateClickInput {
  readonly partner: AffiliatePartner;
  readonly printer: string;
  readonly price?: number | null;
  readonly asin?: string | null;
  readonly resolvedAsin?: string | null;
  readonly linkType?: AmazonLinkType | null;
  readonly brand?: string | null;
  readonly linkUrl: string;
  readonly ctaPosition?: string | null;
}

export interface AffiliateNotifyBody {
  readonly printer: string;
  readonly price: number | null;
  readonly asin: string | null;
  readonly resolvedAsin: string | null;
  readonly linkType: AmazonLinkType | null;
  readonly partner: AffiliatePartner;
  readonly brand: string | null;
  readonly sourcePage: string;
  readonly ctaPosition: string;
}

export type Ga4AffiliateParams = Record<string, string | number | undefined>;

const AMAZON_COMMISSION_RATE = 0.03;
const DEFAULT_CTA_POSITION = "unknown";

function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

function estimateAmazonCommission(price: number | null | undefined): number | undefined {
  if (typeof price !== "number" || !Number.isFinite(price) || price <= 0) {
    return undefined;
  }

  return roundMoney(price * AMAZON_COMMISSION_RATE);
}

export function buildAffiliateEvent(input: AffiliateClickInput, pagePath: string = "unknown") {
  const ctaPosition = input.ctaPosition ?? DEFAULT_CTA_POSITION;
  const price = typeof input.price === "number" ? input.price : null;
  const asin = input.asin ?? null;
  const resolvedAsin = input.resolvedAsin ?? null;
  const linkType = input.linkType ?? null;
  const brand = input.brand ?? null;
  const amazonValue = input.partner === "amazon" ? estimateAmazonCommission(price) : undefined;

  const ga4Params: Ga4AffiliateParams = {
    affiliate_partner: input.partner,
    product_name: input.printer,
    brand: brand ?? undefined,
    asin: asin ?? undefined,
    resolved_asin: resolvedAsin ?? undefined,
    link_type: linkType ?? undefined,
    cta_position: ctaPosition,
    page_path: pagePath,
    link_url: input.linkUrl,
    value: amazonValue,
    currency: amazonValue === undefined ? undefined : "USD",
  };

  const notifyBody: AffiliateNotifyBody = {
    printer: input.printer,
    price,
    asin,
    resolvedAsin,
    linkType,
    partner: input.partner,
    brand,
    sourcePage: pagePath,
    ctaPosition,
  };

  return {
    eventName: "affiliate_click" as const,
    ga4Params,
    vercelProps: ga4Params,
    notifyBody,
  };
}
