import type { Metadata } from "next";
import { PrinterFinder } from "./finder";

export const metadata: Metadata = {
  title: "Which 3D Printer Should I Buy? Take the Free Quiz",
  description:
    "Not sure which 3D printer to get? Answer 6 quick questions about your budget, experience, and goals — we'll recommend the perfect printer for you.",
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
