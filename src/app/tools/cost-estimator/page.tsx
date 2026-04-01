import type { Metadata } from "next";
import { CostEstimator } from "./cost-estimator";

export const metadata: Metadata = {
  title: "3D Printing Cost Calculator — How Much Does Each Print Cost?",
  description:
    "Calculate the real cost of any 3D print — filament, electricity, printer wear, and time. Find out exactly how much 3D printing costs per hour and per part.",
};

export default function CostEstimatorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Print Cost Estimator</h1>
      <p className="mt-2 text-muted-foreground">
        Calculate the real cost of any 3D print — including filament, electricity,
        and printer wear. No more guessing.
      </p>
      <CostEstimator />
      <section className="mt-12 space-y-4 text-sm text-muted-foreground">
        <h2 className="text-lg font-semibold text-foreground">How We Calculate Print Cost</h2>
        <p>
          Most people only count filament cost. But your real cost-per-print includes three hidden factors:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong className="text-foreground">Filament cost</strong> — Weight in grams
            multiplied by your filament&apos;s price per gram. PLA runs ~$0.02/g, specialty
            filaments like carbon fiber can be $0.08/g+.
          </li>
          <li>
            <strong className="text-foreground">Electricity cost</strong> — Your printer
            draws 100-350W. At $0.12/kWh, a 10-hour print costs $0.12-$0.42 in power.
          </li>
          <li>
            <strong className="text-foreground">Printer depreciation</strong> — A $400
            printer with a 2,000-hour lifespan costs $0.20/hour to own. This is the cost
            most people forget.
          </li>
        </ul>
        <p>
          Our calculator combines all three into a single cost-per-print figure so you can
          make informed decisions about what to print and which filament to use.
        </p>
      </section>
    </div>
  );
}
