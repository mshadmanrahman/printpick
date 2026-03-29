import { printers, getOverallScore } from "@/data/printers";
import { PrinterCard } from "@/components/printer-card";

const sortedPrinters = [...printers].sort((a, b) => getOverallScore(b) - getOverallScore(a));

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Find Your Perfect 3D Printer
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Data-driven comparisons, interactive tools, and honest reviews.
          We score every printer across 5 dimensions so you don&apos;t have to guess.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/tools/cost-estimator"
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Print Cost Estimator
          </a>
          <a
            href="/best"
            className="rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            Browse Best Picks
          </a>
        </div>
      </section>

      {/* Interactive Tools */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold tracking-tight">Interactive Tools</h2>
        <p className="mt-1 text-muted-foreground">Calculators and tools to help you decide.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <ToolCard
            href="/tools/cost-estimator"
            title="Print Cost Estimator"
            description="Calculate the real cost per print including filament, electricity, and wear."
          />
          <ToolCard
            href="/tools/fdm-vs-resin"
            title="FDM vs Resin Quiz"
            description="Answer 5 questions and we'll tell you which technology is right for you."
            coming
          />
          <ToolCard
            href="/tools/build-volume"
            title="Build Volume Calculator"
            description="Check if your model fits a specific printer's build plate."
            coming
          />
        </div>
      </section>

      {/* Top Rated */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold tracking-tight">Top Rated Printers</h2>
        <p className="mt-1 text-muted-foreground">
          Scored across value, beginner-friendliness, print quality, speed, and reliability.
        </p>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {sortedPrinters.map((printer, i) => (
            <PrinterCard key={printer.slug} printer={printer} rank={i + 1} />
          ))}
        </div>
      </section>

      {/* Best For Categories */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold tracking-tight">Best Printers By Category</h2>
        <p className="mt-1 text-muted-foreground">Quick picks for specific use cases.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { tag: "beginners", label: "Best for Beginners", emoji: "1" },
            { tag: "budget", label: "Best Budget Printers", emoji: "$" },
            { tag: "miniatures", label: "Best for Miniatures", emoji: "M" },
            { tag: "speed", label: "Fastest Printers", emoji: "S" },
            { tag: "large-prints", label: "Best for Large Prints", emoji: "L" },
            { tag: "engineering", label: "Best for Engineering", emoji: "E" },
          ].map(({ tag, label, emoji }) => (
            <a
              key={tag}
              href={`/best/${tag}`}
              className="flex items-center gap-3 rounded-lg border border-border/50 p-4 transition-colors hover:border-border hover:bg-muted/50"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-muted font-mono text-sm font-bold">
                {emoji}
              </span>
              <span className="font-medium text-sm">{label}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

function ToolCard({
  href,
  title,
  description,
  coming,
}: {
  readonly href: string;
  readonly title: string;
  readonly description: string;
  readonly coming?: boolean;
}) {
  return (
    <a
      href={href}
      className="group relative rounded-lg border border-border/50 p-5 transition-colors hover:border-border hover:bg-muted/50"
    >
      {coming && (
        <span className="absolute top-3 right-3 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          Coming soon
        </span>
      )}
      <h3 className="font-semibold text-sm">{title}</h3>
      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{description}</p>
    </a>
  );
}
