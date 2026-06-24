"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { TrackedAffiliateLink } from "@/components/tracked-affiliate-link";

// Campaign: Polymaker Summer Restock, June 23 to July 5 2026 (CDT = UTC-5)
// Expiry is July 5 06:00 UTC (midnight CDT). Remove this file after the campaign.
const CAMPAIGN_EXPIRY = new Date("2026-07-05T06:00:00Z");
const DISMISS_KEY = "pp_polymaker_summer_restock_dismissed";
const REFERRAL_URL = "https://shop.polymaker.com/SHADMANRAHMAN";

export function PromoBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if campaign is still live and user has not dismissed
    if (new Date() >= CAMPAIGN_EXPIRY) return;
    if (typeof window !== "undefined" && localStorage.getItem(DISMISS_KEY))
      return;
    setVisible(true);
  }, []);

  function handleDismiss() {
    setVisible(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(DISMISS_KEY, "1");
    }
  }

  if (!visible) return null;

  return (
    <div
      role="banner"
      aria-label="Polymaker Summer Restock promotion"
      className="relative z-40 flex items-center justify-center gap-3 bg-emerald-600 border-b border-emerald-700 px-4 py-2 text-sm"
    >
      <span className="text-white/90">
        <span className="font-semibold text-white">
          Polymaker Summer Restock:
        </span>{" "}
        35% off storewide. Code{" "}
        <code className="rounded bg-white/20 px-1 py-0.5 font-mono text-xs text-white">
          SHADMANRAHMAN
        </code>
      </span>
      <TrackedAffiliateLink
        href={REFERRAL_URL}
        partner="brand_direct"
        productName="Polymaker Summer Restock"
        brand="Polymaker"
        ctaPosition="promo_banner"
        className="shrink-0 rounded-md bg-white text-emerald-700 px-3 py-1 text-xs font-semibold transition-colors hover:bg-emerald-50"
      >
        Shop Now
      </TrackedAffiliateLink>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss promotion"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-white/60 hover:text-white transition-colors"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
