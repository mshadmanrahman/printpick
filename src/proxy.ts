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

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:png|jpg|jpeg|svg|webp|ico|txt|xml)$).*)",
  ],
};
