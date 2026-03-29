import type { Metadata } from "next";
import { printers } from "@/data/printers";
import { PrinterFilters } from "@/components/printer-filters";

export const metadata: Metadata = {
  title: "Best 3D Printers 2026 — Ranked & Scored",
  description:
    "The best 3D printers in 2026, scored across value, beginner-friendliness, print quality, speed, and reliability. Updated regularly.",
};

export default function BestPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">
        Best 3D Printers in 2026
      </h1>
      <p className="mt-2 text-muted-foreground">
        Every printer scored across 5 dimensions. No sponsored placements.
        Rankings based on data, not deals.
      </p>
      <div className="mt-8">
        <PrinterFilters printers={printers} />
      </div>
    </div>
  );
}
