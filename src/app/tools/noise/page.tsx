import type { Metadata } from "next";
import { NoiseEstimator } from "./estimator";

export const metadata: Metadata = {
  title: "How Loud Is That 3D Printer? Noise Levels Compared",
  description: "If you're printing in an apartment or shared space, noise actually matters. Compare real dB measurements across printers before you buy.",
};

export default function NoisePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Noise Level Estimator</h1>
      <p className="mt-2 text-muted-foreground">
        Printers vary a lot. A quiet one at 42dB is barely audible. A loud one at 60dB
        will annoy everyone in the house. Here&apos;s where each one sits.
      </p>
      <NoiseEstimator />
    </div>
  );
}
