import type { Metadata } from "next";
import { PrinterFinder } from "./finder";

export const metadata: Metadata = {
  title: "3D Printer Finder Quiz — Get a Personalized Recommendation",
  description:
    "Answer 6 questions about your budget, experience, and goals. We'll recommend the perfect 3D printer for you.",
};

export default function FinderPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Printer Finder</h1>
      <p className="mt-2 text-muted-foreground">
        Tell us what you need and we&apos;ll match you with the perfect printer.
        Takes about 60 seconds.
      </p>
      <PrinterFinder />
    </div>
  );
}
