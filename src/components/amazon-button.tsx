"use client";

import { track } from "@vercel/analytics";
import { getAmazonUrl } from "@/data/printers";
import { cn } from "@/lib/utils";

interface AmazonButtonProps {
  readonly asin: string;
  readonly printerName?: string;
  readonly label?: string;
  readonly className?: string;
}

export function AmazonButton({ asin, printerName, label = "Check Price on Amazon", className }: AmazonButtonProps) {
  const handleClick = () => {
    track("affiliate_click", {
      asin,
      printer: printerName ?? asin,
      destination: "amazon",
    });
  };

  return (
    <a
      href={getAmazonUrl(asin)}
      target="_blank"
      rel="noopener noreferrer nofollow sponsored"
      onClick={handleClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-md bg-[#FF9900] px-4 py-2 text-sm font-medium text-black transition-all hover:bg-[#e68a00] hover:shadow-md hover:shadow-[#FF9900]/20 active:scale-[0.97]",
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
