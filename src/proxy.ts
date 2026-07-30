import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AI_CRAWLER_PATTERNS: ReadonlyArray<{ name: string; pattern: RegExp }> = [
  { name: "GPTBot", pattern: /GPTBot/i },
  { name: "ChatGPT-User", pattern: /ChatGPT-User/i },
  { name: "PerplexityBot", pattern: /PerplexityBot/i },
  { name: "Perplexity-User", pattern: /Perplexity-User/i },
  { name: "ClaudeBot", pattern: /ClaudeBot/i },
  { name: "Claude-User", pattern: /Claude-User/i },
  { name: "Claude-SearchBot", pattern: /Claude-SearchBot/i },
  { name: "Google-Extended", pattern: /Google-Extended/i },
  { name: "CCBot", pattern: /CCBot/i },
];

/**
 * Countries whose traffic we are actively trying to identify.
 *
 * GA4 reports Singapore at 72% of sessions (339 of 468 in the week to
 * 2026-07-26) with 79.5% direct, 84.4% bounce, 36s average duration and 450 of
 * 461 users brand new, arriving in spiky waves. That does not match a
 * US-focused 3D printing audience, and it passes GA4's always-on known-bot
 * filter, which points at headless browsers rather than declared crawlers.
 *
 * Vercel's runtime logs do not expose geo as a filterable dimension, so log it
 * here. The point is to see the actual user agents before deciding whether to
 * block anything: blocking a whole country on an inference would also drop real
 * readers. Empty this set once the question is settled.
 */
const GEO_WATCHLIST: ReadonlySet<string> = new Set(["SG"]);

export function proxy(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") ?? "";
  const match = AI_CRAWLER_PATTERNS.find(({ pattern }) =>
    pattern.test(userAgent),
  );

  if (match) {
    // Structured so it's greppable in Vercel's log viewer/CLI, separate from
    // regular human traffic. This is the only way to tell AI-engine crawl
    // volume apart from actual citation-driven human clicks (GSC only sees
    // the latter).
    console.log(
      JSON.stringify({
        event: "ai_crawler_hit",
        bot: match.name,
        path: request.nextUrl.pathname,
        userAgent,
        timestamp: new Date().toISOString(),
      }),
    );
  }

  // Geo fingerprinting for the watchlist. Deliberately skips requests already
  // logged as a declared AI crawler above, so this only surfaces traffic that
  // presents itself as a browser. sec-fetch-* and accept-language are the
  // useful tells: real browsers send them, many headless setups do not.
  const country = request.headers.get("x-vercel-ip-country") ?? "";
  if (!match && GEO_WATCHLIST.has(country)) {
    console.log(
      JSON.stringify({
        event: "geo_watch_hit",
        country,
        region: request.headers.get("x-vercel-ip-country-region"),
        city: request.headers.get("x-vercel-ip-city"),
        timezone: request.headers.get("x-vercel-ip-timezone"),
        path: request.nextUrl.pathname,
        userAgent,
        referer: request.headers.get("referer"),
        acceptLanguage: request.headers.get("accept-language"),
        hasSecFetch: request.headers.has("sec-fetch-mode"),
        hasSecChUa: request.headers.has("sec-ch-ua"),
        timestamp: new Date().toISOString(),
      }),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:png|jpg|jpeg|svg|webp|ico|txt|xml)$).*)",
  ],
};
