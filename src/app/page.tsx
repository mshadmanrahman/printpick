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
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="hero-glow mx-auto max-w-6xl px-4 py-16 text-center sm:py-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs text-primary mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            {stats.total} printers scored across {stats.brands} brands
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl leading-[1.05]">
            Find Your Perfect
            <br />
            <span className="brand-gradient-text">3D Printer</span>
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
            Every printer scored across 5 dimensions. Interactive tools.
            No sponsored rankings. Just data.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="/tools/finder"
              className="w-full sm:w-auto rounded-lg brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Find My Printer &rarr;
            </a>
            <a
              href="/compare"
              className="w-full sm:w-auto rounded-lg border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              Compare Printers
            </a>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="border-t border-border/40 bg-card/50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
            <ToolCard
              href="/tools/finder"
              icon={<QuizIcon />}
              title="Printer Finder"
              description="6 questions. Your perfect match."
              accent
            />
            <ToolCard
              href="/tools/cost-estimator"
              icon={<DollarIcon />}
              title="Cost Estimator"
              description="Real cost per print."
            />
            <ToolCard
              href="/tools/fdm-vs-resin"
              icon={<VsIcon />}
              title="FDM vs Resin"
              description="Which tech is right for you?"
            />
            <ToolCard
              href="/compare"
              icon={<CompareIcon />}
              title="Compare"
              description="Head-to-head matchups."
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        {/* Top Rated */}
        <section className="py-12">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Top Rated</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Ranked by overall score across 5 dimensions.
              </p>
            </div>
            <a href="/best" className="text-sm text-primary hover:underline">
              View all {stats.total} printers &rarr;
            </a>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {topPrinters.map((printer, i) => (
              <PrinterCard key={printer.slug} printer={printer} rank={i + 1} />
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 border-t border-border/40">
          <h2 className="text-2xl font-bold tracking-tight">Best By Category</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">Quick picks for specific use cases.</p>
          <div className="mt-6 grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.tag}
                href={`/best/${cat.tag}`}
                className="group rounded-lg border border-border/40 p-3 sm:p-4 transition-all hover:border-primary/30 hover:bg-primary/5 hover:shadow-sm"
              >
                <span className="font-medium text-sm group-hover:text-primary transition-colors">{cat.label}</span>
                <span className="hidden sm:block mt-0.5 text-xs text-muted-foreground">{cat.description}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 border-t border-border/40">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <StatBlock value={stats.total} label="Printers Scored" />
            <StatBlock value={stats.brands} label="Brands Covered" />
            <StatBlock value={stats.fdm} label="FDM Printers" />
            <StatBlock value={stats.resin} label="Resin Printers" />
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
      className={`group rounded-xl border p-4 sm:p-5 transition-all hover:shadow-md ${
        accent
          ? "border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50"
          : "border-border/40 hover:border-border hover:bg-muted/50"
      }`}
    >
      <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${
        accent ? "brand-gradient text-white" : "bg-muted text-muted-foreground group-hover:text-primary"
      } transition-colors`}>
        {icon}
      </div>
      <h3 className="mt-3 font-semibold text-sm">{title}</h3>
      <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed hidden sm:block">{description}</p>
    </a>
  );
}

function StatBlock({ value, label }: { readonly value: number; readonly label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold font-mono brand-gradient-text">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

function QuizIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function DollarIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function VsIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3l6 18" />
      <path d="M18 3l-6 18" />
    </svg>
  );
}

function CompareIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="8" height="18" rx="1" />
      <rect x="14" y="3" width="8" height="18" rx="1" />
    </svg>
  );
}
