import type { Metadata } from "next";
import { Search, DollarSign, Layers, GitCompare, Ruler, Beaker, TrendingUp, Volume2 } from "lucide-react";

export const metadata: Metadata = {
  title: "3D Printing Tools & Calculators — Free Interactive Tools",
  description:
    "Free interactive tools for 3D printing: printer finder quiz, cost estimator, material finder, build volume calculator, upgrade advisor, noise estimator, and more.",
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
          icon={<Search className="h-5 w-5" />}
          title="Printer Finder Quiz"
          description="Answer 6 questions about your budget, experience, and goals. Get a personalized printer recommendation."
          badge="Most Popular"
        />
        <ToolLink
          href="/tools/cost-estimator"
          icon={<DollarSign className="h-5 w-5" />}
          title="Print Cost Estimator"
          description="Calculate the real cost per print including filament, electricity, and printer depreciation."
        />
        <ToolLink
          href="/tools/fdm-vs-resin"
          icon={<Layers className="h-5 w-5" />}
          title="FDM vs Resin Quiz"
          description="Not sure which 3D printing technology is right for you? Answer 5 questions and find out."
        />
        <ToolLink
          href="/compare"
          icon={<GitCompare className="h-5 w-5" />}
          title="Head-to-Head Comparison"
          description="Pick any two printers and compare scores, specs, features, and pricing side by side."
        />
        <ToolLink
          href="/tools/build-volume"
          icon={<Ruler className="h-5 w-5" />}
          title="Build Volume Calculator"
          description="Enter your model dimensions and see which printers can print it. Instantly check fit across all 24 printers."
          badge="New"
        />
        <ToolLink
          href="/tools/materials"
          icon={<Beaker className="h-5 w-5" />}
          title="Material Compatibility Finder"
          description="Select a material (PLA, ABS, Nylon, resin) and see which printers support it. Includes difficulty ratings."
          badge="New"
        />
        <ToolLink
          href="/tools/upgrade"
          icon={<TrendingUp className="h-5 w-5" />}
          title="Upgrade Path Advisor"
          description="Already have a printer? Tell us which one and we'll recommend the best upgrade with price and score comparisons."
          badge="New"
        />
        <ToolLink
          href="/tools/noise"
          icon={<Volume2 className="h-5 w-5" />}
          title="Noise Level Estimator"
          description="Compare printer noise levels for bedroom, office, or workshop. Find the quietest printer for your space."
          badge="New"
        />
      </div>
    </div>
  );
}

function ToolLink({
  href,
  icon,
  title,
  description,
  badge,
}: {
  readonly href: string;
  readonly icon: React.ReactNode;
  readonly title: string;
  readonly description: string;
  readonly badge?: string;
}) {
  return (
    <a
      href={href}
      className="group relative rounded-xl border border-border/60 bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary"
    >
      {badge && (
        <span className={`absolute top-3 right-3 rounded-full px-2 py-0.5 text-[10px] font-medium ${
          badge === "New" ? "bg-amber-100 text-amber-700" : "bg-primary/10 text-primary"
        }`}>
          {badge}
        </span>
      )}
      <div className="inline-flex items-center justify-center rounded-lg bg-primary/10 text-primary p-2 mb-3">
        {icon}
      </div>
      <h2 className="font-semibold text-sm group-hover:text-primary transition-colors">{title}</h2>
      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{description}</p>
    </a>
  );
}
