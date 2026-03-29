import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "3D Printing Tools & Calculators — Free Interactive Tools",
  description:
    "Free interactive tools for 3D printing: printer finder quiz, cost estimator, FDM vs resin quiz, head-to-head comparison, and more.",
};

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Tools &amp; Calculators</h1>
      <p className="mt-2 text-muted-foreground">
        Free interactive tools to help you make smarter 3D printing decisions.
        No signup required.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <ToolLink
          href="/tools/finder"
          title="Printer Finder Quiz"
          description="Answer 6 questions about your budget, experience, and goals. Get a personalized printer recommendation."
          badge="Most Popular"
        />
        <ToolLink
          href="/tools/cost-estimator"
          title="Print Cost Estimator"
          description="Calculate the real cost per print including filament, electricity, and printer depreciation."
        />
        <ToolLink
          href="/tools/fdm-vs-resin"
          title="FDM vs Resin Quiz"
          description="Not sure which 3D printing technology is right for you? Answer 5 questions and find out."
        />
        <ToolLink
          href="/compare"
          title="Head-to-Head Comparison"
          description="Pick any two printers and compare scores, specs, features, and pricing side by side."
        />
      </div>

      <section className="mt-12 rounded-xl border border-border/60 bg-muted/20 p-6">
        <h2 className="text-lg font-semibold">Coming Soon</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <ComingSoon title="Build Volume Calculator" description="Check if your model fits a specific printer's build plate." />
          <ComingSoon title="Material Compatibility Finder" description="Tell us what you're printing and we'll recommend the best material." />
          <ComingSoon title="Upgrade Path Advisor" description="Already have a printer? We'll tell you what to upgrade to." />
          <ComingSoon title="Noise Level Estimator" description="Compare printer noise levels for bedroom and office use." />
        </div>
      </section>
    </div>
  );
}

function ToolLink({
  href,
  title,
  description,
  badge,
}: {
  readonly href: string;
  readonly title: string;
  readonly description: string;
  readonly badge?: string;
}) {
  return (
    <a
      href={href}
      className="group relative rounded-xl border border-border/60 bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md"
    >
      {badge && (
        <span className="absolute top-3 right-3 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
          {badge}
        </span>
      )}
      <h2 className="font-semibold text-sm group-hover:text-primary transition-colors">{title}</h2>
      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{description}</p>
    </a>
  );
}

function ComingSoon({ title, description }: { readonly title: string; readonly description: string }) {
  return (
    <div className="rounded-md border border-border/30 p-3 opacity-60">
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
