import type { Metadata } from "next";
import { Search, DollarSign, Layers, GitCompare, Ruler, Beaker, TrendingUp, Volume2 } from "lucide-react";

export const metadata: Metadata = {
  title: "3D Printing Tools & Calculators, Free Interactive Tools",
  description:
    "Tools I built to answer the questions I kept getting asked: which printer to buy, what it actually costs to run, whether FDM or resin makes sense for your use case, and more.",
};

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Tools &amp; Calculators</h1>
      <p className="mt-2 text-muted-foreground">
        I built these because the same questions kept coming up. Which printer, what does it actually cost, FDM or resin. No signup, no email wall.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <ToolLink
          href="/tools/finder"
          icon={<Search className="h-5 w-5" />}
          title="Printer Finder Quiz"
          description="6 questions about budget, experience, and what you want to make. I give you a specific printer to buy."
          badge="Most Popular"
        />
        <ToolLink
          href="/tools/cost-estimator"
          icon={<DollarSign className="h-5 w-5" />}
          title="Print Cost Estimator"
          description="Real cost per print: filament, electricity, and depreciation. Not the number Bambu puts on their homepage."
        />
        <ToolLink
          href="/tools/fdm-vs-resin"
          icon={<Layers className="h-5 w-5" />}
          title="FDM vs Resin Quiz"
          description="They're genuinely different tools. 5 questions, and you'll know which one fits your use case."
        />
        <ToolLink
          href="/compare"
          icon={<GitCompare className="h-5 w-5" />}
          title="Head-to-Head Comparison"
          description="Pick any two printers. Scores, specs, features, price. All in one view."
        />
        <ToolLink
          href="/tools/build-volume"
          icon={<Ruler className="h-5 w-5" />}
          title="Build Volume Calculator"
          description="Enter your model dimensions. Instantly see which printers can actually fit it, across all 24 in the catalog."
          badge="New"
        />
        <ToolLink
          href="/tools/materials"
          icon={<Beaker className="h-5 w-5" />}
          title="Material Compatibility Finder"
          description="Select a material (PLA, ABS, Nylon, resin) and see which printers handle it. Difficulty ratings included."
          badge="New"
        />
        <ToolLink
          href="/tools/upgrade"
          icon={<TrendingUp className="h-5 w-5" />}
          title="Upgrade Path Advisor"
          description="Already own a printer? Tell me which one. I'll show you the best upgrade with score and price comparisons."
          badge="New"
        />
        <ToolLink
          href="/tools/noise"
          icon={<Volume2 className="h-5 w-5" />}
          title="Noise Level Estimator"
          description="Bedroom, office, or workshop. Find the quietest printer for your actual space, not a soundproofed lab."
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
