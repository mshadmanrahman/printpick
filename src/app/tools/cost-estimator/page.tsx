import type { Metadata } from "next";
import { CostEstimator } from "./cost-estimator";

export const metadata: Metadata = {
  title: "3D Print Cost Calculator: What Does Each Print Actually Cost?",
  description:
    "Most people only count filament. This calculator adds electricity and printer wear so you get the real number, not a guess.",
};

export default function CostEstimatorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Print Cost Estimator</h1>
      <p className="mt-2 text-muted-foreground">
        Filament, electricity, printer wear. Put in your numbers and get the
        actual cost of a print, not just the filament price.
      </p>
      <CostEstimator />
      <section className="mt-12 space-y-4 text-sm text-muted-foreground">
        <h2 className="text-lg font-semibold text-foreground">What goes into the number</h2>
        <p>
          Filament is the obvious one. But it&apos;s only part of the picture. Here&apos;s what the calculator actually adds up:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong className="text-foreground">Filament cost</strong>: weight in grams
            times price per gram. PLA is around $0.02/g. Carbon fiber blends can hit $0.08/g or more.
          </li>
          <li>
            <strong className="text-foreground">Electricity cost</strong>: printers draw
            100-350W. At $0.12/kWh, a 10-hour print is $0.12-$0.42 in power. Not huge, but real.
          </li>
          <li>
            <strong className="text-foreground">Printer depreciation</strong>: a $400
            printer rated for 2,000 hours costs $0.20/hour to run. This is the one everyone forgets.
          </li>
        </ul>
        <p>
          Add those three together and you get a cost-per-print you can actually use, whether
          you&apos;re pricing a commission or deciding if it&apos;s worth printing vs. buying.
        </p>
      </section>
    </div>
  );
}
