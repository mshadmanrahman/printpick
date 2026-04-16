import type { Metadata } from "next";
import { BuildVolumeCalculator } from "./calculator";

export const metadata: Metadata = {
  title: "Will Your Model Fit? 3D Printer Build Volume Checker",
  description: "Type in your model dimensions and see exactly which printers can handle it. I built this after buying a printer that was 2mm too small for the thing I wanted to print.",
};

export default function BuildVolumePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Build Volume Calculator</h1>
      <p className="mt-2 text-muted-foreground">
        Enter your model&apos;s dimensions. See which printers fit it. Simple as that.
      </p>
      <BuildVolumeCalculator />
    </div>
  );
}
