import { printers, getOverallScore, CATEGORIES } from "@/data/printers";
import { PrinterCard } from "@/components/printer-card";

const topPrinters = [...printers]
  .sort((a, b) => getOverallScore(b) - getOverallScore(a))
  .slice(0, 6);

const stats = {
  total: printers.length,
  brands: new Set(printers.map((p) => p.brand)).size,
  fdm: printers.filter((p) => p.type === "fdm").length,
  resin: printers.filter((p) => p.type === "resin").length,
};

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Hero */}
      <section className="py-16 text-center sm:py-24">
        <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground mb-6">
          <span className="font-mono">{stats.total}</span> printers scored &middot;
          <span className="font-mono">{stats.brands}</span> brands &middot; Updated 2026
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl leading-[1.1]">
          Find Your Perfect
          <br />
          <span className="text-primary">3D Printer</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          Every printer scored across 5 dimensions. Interactive tools to help you decide.
          No sponsored placements. Just data.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/tools/finder"
            className="rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Find My Printer
          </a>
          <a
            href="/compare"
            className="rounded-md border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            Compare Printers
          </a>
          <a
            href="/tools/cost-estimator"
            className="rounded-md border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            Cost Estimator
          </a>
        </div>
      </section>

      {/* Interactive Tools */}
      <section className="py-12 border-t border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Interactive Tools</h2>
            <p className="mt-1 text-muted-foreground">Decide with data, not guesswork.</p>
          </div>
          <a href="/tools" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            View all &rarr;
          </a>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ToolCard
            href="/tools/finder"
            icon="?"
            title="Printer Finder"
            description="6 questions. Your perfect match."
          />
          <ToolCard
            href="/tools/cost-estimator"
            icon="$"
            title="Cost Estimator"
            description="Real cost per print: filament + power + wear."
          />
          <ToolCard
            href="/tools/fdm-vs-resin"
            icon="vs"
            title="FDM vs Resin"
            description="Which technology fits your needs?"
          />
          <ToolCard
            href="/compare"
            icon="="
            title="Compare"
            description="Any two printers, side by side."
          />
        </div>
      </section>

      {/* Top Rated */}
      <section className="py-12 border-t border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Top Rated</h2>
            <p className="mt-1 text-muted-foreground">
              Scored across value, beginner-friendliness, quality, speed, and reliability.
            </p>
          </div>
          <a href="/best" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            View all {stats.total} &rarr;
          </a>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {topPrinters.map((printer, i) => (
            <PrinterCard key={printer.slug} printer={printer} rank={i + 1} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 border-t border-border/50">
        <h2 className="text-2xl font-bold tracking-tight">Best By Category</h2>
        <p className="mt-1 text-muted-foreground">Quick picks for specific use cases.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.tag}
              href={`/best/${cat.tag}`}
              className="rounded-lg border border-border/50 p-4 transition-colors hover:border-border hover:bg-muted/50"
            >
              <span className="font-medium text-sm">{cat.label}</span>
              <span className="block mt-0.5 text-xs text-muted-foreground">{cat.description}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-12 border-t border-border/50">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatBlock value={stats.total} label="Printers Scored" />
          <StatBlock value={stats.brands} label="Brands Covered" />
          <StatBlock value={stats.fdm} label="FDM Printers" />
          <StatBlock value={stats.resin} label="Resin Printers" />
        </div>
      </section>
    </div>
  );
}

function ToolCard({
  href,
  icon,
  title,
  description,
}: {
  readonly href: string;
  readonly icon: string;
  readonly title: string;
  readonly description: string;
}) {
  return (
    <a
      href={href}
      className="group rounded-lg border border-border/50 p-5 transition-colors hover:border-primary/30 hover:bg-primary/5"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-md bg-muted font-mono text-sm font-bold group-hover:bg-primary/10 group-hover:text-primary transition-colors">
        {icon}
      </span>
      <h3 className="mt-3 font-semibold text-sm">{title}</h3>
      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{description}</p>
    </a>
  );
}

function StatBlock({ value, label }: { readonly value: number; readonly label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold font-mono">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}
