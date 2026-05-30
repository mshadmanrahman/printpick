"use client";

import { track } from "@vercel/analytics";
import { buildAffiliateEvent, type AffiliateClickInput } from "@/lib/affiliate-event";

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, params: Record<string, unknown>) => void;
    dataLayer?: unknown[];
  }
}

function currentPath(): string {
  if (typeof window === "undefined") {
    return "unknown";
  }

  return `${window.location.pathname}${window.location.search}`;
}

function sendGa4Event(eventName: string, params: Record<string, unknown>): void {
  if (typeof window === "undefined") {
    return;
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
    return;
  }

  // GA can be lazy-loaded by @next/third-parties. Queue the event instead of
  // dropping the click if the visitor taps a CTA before gtag is ready.
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: eventName, ...params });
}

export function trackAffiliateClick(input: AffiliateClickInput): void {
  const event = buildAffiliateEvent(input, currentPath());

  track(event.eventName, event.vercelProps);
  sendGa4Event(event.eventName, event.ga4Params);

  fetch("/api/affiliate-notify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event.notifyBody),
    keepalive: true,
  }).catch(() => {});
}
