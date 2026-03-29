import type { Metadata } from "next";
import { MaterialFinder } from "./finder";

export const metadata: Metadata = {
  title: "Material Compatibility Finder — Best Material for Your Project",
  description: "Find the right 3D printing material for your project. See which printers support PLA, ABS, Nylon, resin, and more.",
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
