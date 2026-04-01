import type { Metadata } from "next";
import { MaterialFinder } from "./finder";

export const metadata: Metadata = {
  title: "3D Printer Material Guide — PLA vs PETG vs ABS vs TPU Compared",
  description: "Which 3D printing filament should you use? Compare PLA, PETG, ABS, Nylon, TPU, and resin — see which materials work with your printer.",
};

export default function MaterialsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Material Compatibility Finder</h1>
      <p className="mt-2 text-muted-foreground">
        Tell us what you&apos;re printing and we&apos;ll recommend the best material and compatible printers.
      </p>
      <MaterialFinder />
    </div>
  );
}
