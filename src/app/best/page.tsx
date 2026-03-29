import type { Metadata } from "next";
import { printers, getOverallScore } from "@/data/printers";
import { PrinterCard } from "@/components/printer-card";

export const metadata: Metadata = {
  title: "Best 3D Printers 2026 — Ranked & Scored",
  description:
    "The best 3D printers in 2026, scored across value, beginner-friendliness, print quality, speed, and reliability. Updated regularly.",
};

const sorted = [...printers].sort((a, b) => getOverallScore(b) - getOverallScore(a));

export default function BestPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">
        Best 3D Printers in 2026
      </h1>
      <p className="mt-2 text-muted-foreground">
        Every printer scored across 5 dimensions. No sponsored placements.
        Rankings based on data, not deals.
      </p>
      <div className="mt-8 space-y-4">
        {sorted.map((printer, i) => (
          <PrinterCard key={printer.slug} printer={printer} rank={i + 1} />
        ))}
      </div>
    </div>
  );
}
