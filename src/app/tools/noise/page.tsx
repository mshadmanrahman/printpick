import type { Metadata } from "next";
import { NoiseEstimator } from "./estimator";

export const metadata: Metadata = {
  title: "Noise Level Estimator — Compare 3D Printer Noise",
  description: "Compare 3D printer noise levels for bedroom, office, and workshop use. Find the quietest printer for your space.",
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
