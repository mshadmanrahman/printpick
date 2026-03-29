import { Search, DollarSign, Layers, GitCompare, ChevronRight, Star } from "lucide-react";
import { printers, getOverallScore, CATEGORIES } from "@/data/printers";
import { PrinterCard } from "@/components/printer-card";

const topPrinters = [...printers]
  .sort((a, b) => getOverallScore(b) - getOverallScore(a))
  .slice(0, 3);

const stats = {
  total: printers.length,
  brands: new Set(printers.map((p) => p.brand)).size,
};

const CATEGORY_ICONS: Record<string, string> = {
  beginners: "Plug and print. No tinkering.",
  budget: "Great prints under $300.",
  miniatures: "Ultra-fine detail for tabletop.",
  speed: "500mm/s+ without sacrificing quality.",
  "large-prints": "Build volumes over 300mm.",
  engineering: "ABS, Nylon, PETG ready.",
  enclosed: "Temperature-controlled chambers.",
  "multi-color": "4+ colors in a single print.",
  resin: "Unmatched detail and finish.",
  professional: "Production-grade reliability.",
  compact: "Small footprint, big results.",
  diy: "Build it yourself. Learn everything.",
};

export default function Home() {
  return (
    <div>
      {/* Hero — clean, no background image */}
      <section className="mx-auto max-w-5xl px-4 pt-12 pb-10 sm:pt-16 sm:pb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-medium text-primary mb-6">
          <Star className="h-3 w-3" />
          {stats.total} printers scored &middot; {stats.brands} brands &middot; 5 dimensions
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-[1.1]">
          Find the right
          <br />
          <span className="brand-gradient-text">3D printer</span> for you
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base text-muted-foreground sm:text-lg leading-relaxed">
          Honest scores. Interactive tools. No sponsored rankings.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="/tools/finder"
            className="w-full sm:w-auto rounded-xl brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-md shadow-primary/15 transition-all hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0"
          >
            Take the Quiz &rarr;
          </a>
          <a
            href="/best"
            className="w-full sm:w-auto rounded-xl border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            Browse All Printers
          </a>
        </div>
      </section>

      {/* Tools — icon cards, no images */}
      <section className="border-y border-border/50 bg-muted/20">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
            <ToolCard
              href="/tools/finder"
              icon={<Search className="h-5 w-5" />}
              title="Printer Finder"
              description="6 questions. Your perfect match."
              accent
            />
            <ToolCard
              href="/tools/cost-estimator"
              icon={<DollarSign className="h-5 w-5" />}
              title="Cost Estimator"
              description="Real cost per print calculated."
            />
            <ToolCard
              href="/tools/fdm-vs-resin"
              icon={<Layers className="h-5 w-5" />}
              title="FDM vs Resin"
              description="Which tech is right for you?"
            />
            <ToolCard
              href="/compare"
              icon={<GitCompare className="h-5 w-5" />}
              title="Compare"
              description="Head-to-head spec matchups."
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4">
        {/* Top Rated — just top 3 */}
        <section className="py-12">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Top Rated</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Highest overall score across value, quality, speed, reliability, and beginner-friendliness.
              </p>
            </div>
            <a href="/best" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
              All {stats.total} printers <ChevronRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="grid gap-4">
            {topPrinters.map((printer, i) => (
              <PrinterCard key={printer.slug} printer={printer} rank={i + 1} />
            ))}
          </div>
        </section>

        {/* Categories — clean text cards */}
        <section className="py-12 border-t border-border/50">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Best By Category</h2>
              <p className="mt-1 text-sm text-muted-foreground">Quick picks for your specific use case.</p>
            </div>
          </div>
          <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.tag}
                href={`/best/${cat.tag}`}
                className="group flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-card px-4 py-3.5 transition-all hover:border-primary/30 hover:shadow-sm"
              >
                <div className="min-w-0">
                  <span className="font-medium text-sm group-hover:text-primary transition-colors">
                    {cat.label}
                  </span>
                  <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed truncate">
                    {CATEGORY_ICONS[cat.tag] ?? cat.description}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function ToolCard({
  href,
  icon,
  title,
  description,
  accent,
}: {
  readonly href: string;
  readonly icon: React.ReactNode;
  readonly title: string;
  readonly description: string;
  readonly accent?: boolean;
}) {
  return (
    <a
      href={href}
      className={`group rounded-xl border bg-card p-4 sm:p-5 transition-all hover:shadow-md ${
        accent
          ? "border-primary/30 hover:border-primary/50 hover:shadow-primary/10"
          : "border-border/60 hover:border-primary/20"
      }`}
    >
      <div className={`inline-flex items-center justify-center rounded-lg p-2 mb-3 ${
        accent ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground group-hover:text-primary"
      } transition-colors`}>
        {icon}
      </div>
      <div className="flex items-center gap-2">
        <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{title}</h3>
        {accent && (
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
            Popular
          </span>
        )}
      </div>
      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{description}</p>
    </a>
  );
}
