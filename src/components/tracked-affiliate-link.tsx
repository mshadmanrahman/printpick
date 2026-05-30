"use client";

import type React from "react";
import { trackAffiliateClick } from "@/lib/affiliate-tracking";
import { cn } from "@/lib/utils";
import type { AffiliatePartner, AmazonLinkType } from "@/lib/affiliate-event";

interface TrackedAffiliateLinkProps {
  readonly href: string;
  readonly children: React.ReactNode;
  readonly partner: AffiliatePartner;
  readonly productName: string;
  readonly price?: number | null;
  readonly asin?: string | null;
  readonly resolvedAsin?: string | null;
  readonly linkType?: AmazonLinkType | null;
  readonly brand?: string | null;
  readonly ctaPosition: string;
  readonly className?: string;
  readonly ariaLabel?: string;
}

export function TrackedAffiliateLink({
  href,
  children,
  partner,
  productName,
  price = null,
  asin = null,
  resolvedAsin = null,
  linkType = null,
  brand = null,
  ctaPosition,
  className,
  ariaLabel,
}: TrackedAffiliateLinkProps) {
  const handleClick = () => {
    trackAffiliateClick({
      partner,
      printer: productName,
      price,
      asin,
      resolvedAsin,
      linkType,
      brand,
      linkUrl: href,
      ctaPosition,
    });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow sponsored"
      onClick={handleClick}
      aria-label={ariaLabel}
      className={cn(className)}
    >
      {children}
    </a>
  );
}
