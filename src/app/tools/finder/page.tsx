import type { Metadata } from "next";
import { PrinterFinder } from "./finder";

export const metadata: Metadata = {
  title: "Which 3D Printer Should I Buy? Find Out in 60 Seconds",
  description:
    "I built this because every buying guide told me to 'consider my needs' without actually helping. Answer 6 quick questions and get a real recommendation.",
};

export default function FinderPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Printer Finder</h1>
      <p className="mt-2 text-muted-foreground">
        Six questions about your budget, space, and goals. I&apos;ll point you at
        the right printer. Takes about 60 seconds.
      </p>
      <PrinterFinder />
    </div>
  );
}
