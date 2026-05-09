import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { printers, getOverallScore } from "@/data/printers";
import { PrinterFilters } from "@/components/printer-filters";

export const metadata: Metadata = {
  title: "Best 3D Printers 2026, Ranked & Scored",
  description:
    "Every 3D printer we track, scored across value, beginner-friendliness, print quality, speed, and reliability. No sponsored placements.",
};

const fdmCount = printers.filter((p) => p.type === "fdm").length;
const resinCount = printers.filter((p) => p.type === "resin").length;
const brands = new Set(printers.map((p) => p.brand)).size;

const topPicks = [...printers]
  .filter((p) => !p.discontinued)
  .sort((a, b) => getOverallScore(b) - getOverallScore(a))
  .slice(0, 10);

export default function BestPage() {
  return (
    <div>
      {/* Page header */}
      <section className="border-b border-border/50">
        <div className="mx-auto max-w-5xl px-4 pt-10 pb-8">
          <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3">
            Rankings &middot; Updated 2026
          </p>
          <h1
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Every 3D Printer, Ranked.
          </h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed">
            Scored across five dimensions: value, beginner-friendliness, print quality, speed, and reliability.
            Rankings based on data. No sponsored placements.
          </p>

          {/* Stat pills */}
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              { label: `${printers.length} printers` },
              { label: `${brands} brands` },
              { label: `${fdmCount} FDM` },
              { label: `${resinCount} resin` },
              { label: "5 scoring dimensions" },
            ].map(({ label }) => (
              <span
                key={label}
                className="rounded-full border border-border/60 bg-card px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Top picks — static server-rendered list for crawlers and quick scanning */}
      <section className="border-b border-border/50">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary">
              Top Rated Right Now
            </h2>
            <span className="text-xs text-muted-foreground">Composite score across 5 dimensions</span>
          </div>
          <div className="grid gap-2">
            {topPicks.map((p, i) => (
              <a
                key={p.slug}
                href={`/printers/${p.slug}`}
                className="group flex items-center justify-between gap-4 rounded-lg border border-border/60 bg-card px-4 py-3 transition-all hover:border-primary/30 hover:shadow-sm"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-xs font-bold text-primary w-5 shrink-0">#{i + 1}</span>
                  <div className="min-w-0">
                    <span className="font-semibold text-sm group-hover:text-primary transition-colors">{p.name}</span>
                    <span className="ml-2 text-xs text-muted-foreground">${p.price} · {getOverallScore(p)}/10</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden sm:block text-xs text-muted-foreground">{p.brand}</span>
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </a>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <a href="/blog/best-3d-printer-under-500-2026" className="text-xs text-primary hover:underline underline-offset-2">Best under $500 →</a>
            <span className="text-xs text-muted-foreground">·</span>
            <a href="/blog/best-enclosed-3d-printer-2026" className="text-xs text-primary hover:underline underline-offset-2">Best enclosed printers →</a>
            <span className="text-xs text-muted-foreground">·</span>
            <a href="/blog/best-3d-printers-beginners-2026" className="text-xs text-primary hover:underline underline-offset-2">Best for beginners →</a>
            <span className="text-xs text-muted-foreground">·</span>
            <a href="/best/under-300" className="text-xs text-primary hover:underline underline-offset-2">Best under $300 →</a>
          </div>
        </div>
      </section>

      {/* Filters + grid */}
      <div className="mx-auto max-w-5xl px-4 py-8">
        <PrinterFilters printers={printers} />
      </div>
    </div>
  );
}
