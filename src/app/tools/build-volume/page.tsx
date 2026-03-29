import type { Metadata } from "next";
import { BuildVolumeCalculator } from "./calculator";

export const metadata: Metadata = {
  title: "Build Volume Calculator — Will My Model Fit?",
  description: "Enter your 3D model dimensions and instantly see which printers can print it. Compare build volumes across 24 printers.",
};

export default function BuildVolumePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Build Volume Calculator</h1>
      <p className="mt-2 text-muted-foreground">
        Enter your model&apos;s dimensions and we&apos;ll show you which printers can handle it.
      </p>
      <BuildVolumeCalculator />
    </div>
  );
}
