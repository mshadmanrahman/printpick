"use client";

import { track } from "@vercel/analytics";
import { cn } from "@/lib/utils";

interface BrandButtonProps {
  readonly brandUrl: string;
  readonly printerName: string;
  readonly brand: string;
  readonly label?: string;
  readonly className?: string;
}

export function BrandButton({
  brandUrl,
  printerName,
  brand,
  label,
  className,
}: BrandButtonProps) {
  const handleClick = () => {
    track("affiliate_click", {
      printer: printerName,
      destination: "brand_direct",
      brand,
    });
  };

  return (
    <a
      href={brandUrl}
      target="_blank"
      rel="noopener noreferrer nofollow sponsored"
      onClick={handleClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 whitespace-nowrap transition-all hover:bg-emerald-500/15 hover:border-emerald-500/50 active:scale-[0.97]",
        className,
      )}
    >
      {label ?? `Buy Direct from ${brand}`}
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M7 17L17 7M17 7H7M17 7v10" />
      </svg>
    </a>
  );
}
