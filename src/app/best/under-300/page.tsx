import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { printers, getOverallScore, CATEGORIES } from "@/data/printers";
import { PrinterCard } from "@/components/printer-card";

export const metadata: Metadata = {
  title: "Best 3D Printers Under $300 in 2026, Ranked & Scored",
  description:
    "Every 3D printer under $300, scored across value, beginner-friendliness, print quality, speed, and reliability. Updated regularly. No sponsored placements.",
  alternates: {
    canonical: "https://printpick.dev/best/under-300",
  },
  openGraph: {
    title: "Best 3D Printers Under $300 in 2026",
    description:
      "Every 3D printer under $300, scored across value, beginner-friendliness, print quality, speed, and reliability.",
    url: "https://printpick.dev/best/under-300",
    images: [
      {
        url: "https://printpick.dev/api/og?title=Best+3D+Printers+Under+%24300+2026&subtitle=Ranked+%26+Scored",
        width: 1200,
        height: 630,
        alt: "Best 3D Printers Under $300 2026",
      },
    ],
  },
};

const under300 = printers
  .filter((p) => p.price <= 300 && !p.discontinued)
  .sort((a, b) => getOverallScore(b) - getOverallScore(a));

export default function Under300Page() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <nav className="text-xs text-muted-foreground mb-6">
        <a href="/" className="hover:text-foreground">Home</a>
        <span className="mx-1">/</span>
        <a href="/best" className="hover:text-foreground">Best Picks</a>
        <span className="mx-1">/</span>
        <span className="text-foreground">Under $300</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight">
        Best 3D Printers Under $300 in 2026
      </h1>
      <p className="mt-2 text-muted-foreground max-w-xl">
        {under300.length} printers under $300, ranked by composite score across
        value, print quality, beginner-friendliness, speed, and reliability.
        No sponsored placements.
      </p>

      {under300.length === 0 ? (
        <p className="mt-8 text-muted-foreground">No printers found. Check back soon.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {under300.map((printer, i) => (
            <PrinterCard key={printer.slug} printer={printer} rank={i + 1} />
          ))}
        </div>
      )}

      <section className="mt-12">
        <h2 className="text-xl font-bold">Browse by Use Case</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => (
            <a
              key={c.tag}
              href={`/best/${c.tag}`}
              className="group flex items-center justify-between rounded-xl border border-border/60 bg-card px-4 py-3 text-sm transition-all hover:border-primary/30 hover:shadow-sm"
            >
              <span className="font-medium group-hover:text-primary transition-colors">{c.label}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
