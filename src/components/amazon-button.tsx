"use client";

import { useMemo } from "react";
import { getAmazonLink } from "@/lib/amazon-affiliate";
import { trackAffiliateClick } from "@/lib/affiliate-tracking";
import { cn } from "@/lib/utils";

interface AmazonButtonProps {
  readonly asin: string;
  readonly printerName?: string;
  readonly price?: number;
  readonly label?: string;
  readonly className?: string;
  readonly ctaPosition?: string;
}

export function AmazonButton({
  asin,
  printerName,
  price,
  label = "Check Price on Amazon",
  className,
  ctaPosition = "amazon_button",
}: AmazonButtonProps) {
  const link = useMemo(
    () => getAmazonLink(asin, printerName ?? asin),
    [asin, printerName],
  );

  // Suppress the CTA when getAmazonLink falls back to a search URL.
  // Apr 24 data: 362/374 search-URL clicks attributed zero orders. A search
  // page that doesn't return the user's product is worse for trust than no
  // button. Callers that have a brandUrl already render BrandButton instead.
  if (link.type === "search") {
    return null;
  }

  const handleClick = () => {
    trackAffiliateClick({
      partner: "amazon",
      printer: printerName ?? asin,
      price: price ?? null,
      asin,
      resolvedAsin: link.resolvedAsin ?? null,
      linkType: link.type,
      linkUrl: link.url,
      ctaPosition,
    });
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer nofollow sponsored"
      onClick={handleClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary whitespace-nowrap transition-all hover:bg-primary/15 hover:border-primary/50 active:scale-[0.97]",
        className,
      )}
    >
      {label}
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M7 17L17 7M17 7H7M17 7v10" />
      </svg>
    </a>
  );
}
