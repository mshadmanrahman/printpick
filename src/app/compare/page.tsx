import type { Metadata } from "next";
import { ComparisonTool } from "./comparison-tool";

export const metadata: Metadata = {
  title: "Compare 3D Printers Side by Side",
  description:
    "Compare any two 3D printers head-to-head. Specs, scores, features, and pricing side by side.",
};

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Compare Printers</h1>
      <p className="mt-2 text-muted-foreground">
        Pick any two printers and see them head-to-head. Scores, specs, features, and price compared.
      </p>
      <ComparisonTool />
    </div>
  );
}
