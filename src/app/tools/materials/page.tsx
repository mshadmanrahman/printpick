import type { Metadata } from "next";
import { MaterialFinder } from "./finder";

export const metadata: Metadata = {
  title: "Which Filament Should You Use? PLA vs PETG vs ABS vs TPU",
  description: "Tell me what you're printing and I'll tell you which material actually works. No jargon, no 15-tab comparison table.",
};

export default function MaterialsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Material Compatibility Finder</h1>
      <p className="mt-2 text-muted-foreground">
        Tell me what you&apos;re printing. I&apos;ll match you to the right material and show
        you which printers can actually run it.
      </p>
      <MaterialFinder />
    </div>
  );
}
