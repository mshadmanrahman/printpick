import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "3D Printing Tools & Calculators",
  description:
    "Free interactive tools for 3D printing: cost estimator, FDM vs resin quiz, build volume calculator, and more.",
};

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Tools &amp; Calculators</h1>
      <p className="mt-2 text-muted-foreground">
        Free interactive tools to help you make better 3D printing decisions.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <ToolLink
          href="/tools/cost-estimator"
          title="Print Cost Estimator"
          description="Calculate the real cost per print including filament, electricity, and printer depreciation."
          live
        />
        <ToolLink
          href="/tools/fdm-vs-resin"
          title="FDM vs Resin Quiz"
          description="Answer 5 questions and we'll recommend the right 3D printing technology for you."
        />
        <ToolLink
          href="/tools/build-volume"
          title="Build Volume Calculator"
          description="Check if your model fits a specific printer's build plate before you buy."
        />
        <ToolLink
          href="/tools/material-finder"
          title="Material Compatibility Finder"
          description="Tell us what you're printing and we'll recommend the best filament or resin."
        />
      </div>
    </div>
  );
}

function ToolLink({
  href,
  title,
  description,
  live,
}: {
  readonly href: string;
  readonly title: string;
  readonly description: string;
  readonly live?: boolean;
}) {
  return (
    <a
      href={href}
      className="group rounded-lg border border-border/50 p-5 transition-colors hover:border-border hover:bg-muted/50"
    >
      <div className="flex items-center gap-2">
        <h2 className="font-semibold text-sm">{title}</h2>
        {live ? (
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-500">
            Live
          </span>
        ) : (
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            Coming soon
          </span>
        )}
      </div>
      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{description}</p>
    </a>
  );
}
