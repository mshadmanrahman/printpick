import type { Metadata } from "next";
import { ComparisonTool } from "./comparison-tool";

export const metadata: Metadata = {
  title: "Compare 3D Printers Side by Side, PrintPick",
  description:
    "Pick any two printers and see specs, scores, features, and pricing side by side. Useful if you've already narrowed it down to two.",
};

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Compare Two Printers</h1>
      <p className="mt-2 text-muted-foreground">
        Already down to two options? Put them side by side. Scores, specs, features, price.
      </p>
      <ComparisonTool />
    </div>
  );
}
