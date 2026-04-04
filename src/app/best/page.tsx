import type { Metadata } from "next";
import { printers } from "@/data/printers";
import { PrinterFilters } from "@/components/printer-filters";

export const metadata: Metadata = {
  title: "Best 3D Printers 2026 — Ranked & Scored",
  description:
    "The best 3D printers in 2026, scored across value, beginner-friendliness, print quality, speed, and reliability. Updated regularly.",
};

const fdmCount = printers.filter((p) => p.type === "fdm").length;
const resinCount = printers.filter((p) => p.type === "resin").length;
const brands = new Set(printers.map((p) => p.brand)).size;

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
            Scored across 5 dimensions — value, beginner-friendliness, print quality, speed, and reliability.
            No sponsored placements. Rankings based on data, not deals.
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

      {/* Filters + grid */}
      <div className="mx-auto max-w-5xl px-4 py-8">
        <PrinterFilters printers={printers} />
      </div>
    </div>
  );
}
