import type { Metadata } from "next";
import { NoiseEstimator } from "./estimator";

export const metadata: Metadata = {
  title: "3D Printer Noise Levels Compared — Find the Quietest Printer",
  description: "Compare 3D printer noise levels for bedrooms, apartments, offices, and workshops. Interactive tool to find the quietest printer for your living space.",
};

export default function NoisePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Noise Level Estimator</h1>
      <p className="mt-2 text-muted-foreground">
        Compare printer noise levels. Find the right printer for your bedroom, office, or workshop.
      </p>
      <NoiseEstimator />
    </div>
  );
}
