"use client";

import { useMemo } from "react";
import { track } from "@vercel/analytics";
import { getAmazonLink } from "@/lib/amazon-affiliate";
import { cn } from "@/lib/utils";

interface AmazonButtonProps {
  readonly asin: string;
  readonly printerName?: string;
  readonly price?: number;
  readonly label?: string;
  readonly className?: string;
}

export function AmazonButton({ asin, printerName, price, label = "Check Price on Amazon", className }: AmazonButtonProps) {
  const link = useMemo(
    () => getAmazonLink(asin, printerName ?? asin),
    [asin, printerName],
  );

  const handleClick = () => {
    track("affiliate_click", {
      asin,
      resolved_asin: link.resolvedAsin ?? "none",
      link_type: link.type,
      printer: printerName ?? asin,
      destination: "amazon",
    });

    fetch("/api/affiliate-notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        printer: printerName ?? asin,
        price: price ?? null,
        asin,
        linkType: link.type,
      }),
    }).catch(() => {});
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
