import Image from "next/image";
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

const CATEGORY_IMAGES: Record<string, string> = {
  beginners: "/images/beginners.avif",
  budget: "/images/detail.avif",
  miniatures: "/images/miniature.avif",
  speed: "/images/hero.avif",
  "large-prints": "/images/stormtrooper.avif",
  engineering: "/images/tools.avif",
  enclosed: "/images/compare.avif",
  "multi-color": "/images/fdm.avif",
  resin: "/images/resin.avif",
  professional: "/images/cubes.avif",
  compact: "/images/detail.avif",
  diy: "/images/geometric.avif",
};

export default function Home() {
  return (
    <div>
      {/* Hero with background image */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.avif"
            alt="3D printer with glowing print"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:py-32">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs text-primary mb-8 backdrop-blur-sm">
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
              className="w-full sm:w-auto rounded-lg border border-border bg-background/50 backdrop-blur-sm px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              Compare Printers
            </a>
          </div>
        </div>
      </section>

      {/* Tools Grid with images */}
      <section className="border-t border-border/40">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
            <ToolCard
              href="/tools/finder"
              image="/images/workspace.avif"
              title="Printer Finder"
              description="6 questions. Your perfect match."
              accent
            />
            <ToolCard
              href="/tools/cost-estimator"
              image="/images/detail.avif"
              title="Cost Estimator"
              description="Real cost per print."
            />
            <ToolCard
              href="/tools/fdm-vs-resin"
              image="/images/geometric.avif"
              title="FDM vs Resin"
              description="Which tech is right for you?"
            />
            <ToolCard
              href="/compare"
              image="/images/compare.avif"
              title="Compare"
              description="Head-to-head matchups."
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        {/* What Can You Print? — Gallery */}
        <section className="py-12 border-t border-border/40">
          <h2 className="text-2xl font-bold tracking-tight">What Can You Print?</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">From miniature figures to full-size helmets.</p>
          <div className="mt-6 grid grid-cols-3 sm:grid-cols-6 gap-2">
            {[
              { src: "/images/stormtrooper.avif", alt: "Stormtrooper helmet", label: "Cosplay" },
              { src: "/images/miniature.avif", alt: "Tiny miniature chair", label: "Miniatures" },
              { src: "/images/resin.avif", alt: "Resin elephant figurine", label: "Figures" },
              { src: "/images/beginners.avif", alt: "Colorful planters", label: "Home decor" },
              { src: "/images/thinker.avif", alt: "Low-poly Thinker sculpture", label: "Art" },
              { src: "/images/cubes.avif", alt: "Geometric cubes", label: "Functional" },
            ].map((item) => (
              <div key={item.src} className="group relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 640px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute bottom-2 left-2 text-[10px] sm:text-xs font-medium text-white">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Top Rated */}
        <section className="py-12 border-t border-border/40">
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

        {/* Categories with images */}
        <section className="py-12 border-t border-border/40">
          <h2 className="text-2xl font-bold tracking-tight">Best By Category</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">Quick picks for specific use cases.</p>
          <div className="mt-6 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.tag}
                href={`/best/${cat.tag}`}
                className="group relative overflow-hidden rounded-xl border border-border/40 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="relative h-24 sm:h-28">
                  <Image
                    src={CATEGORY_IMAGES[cat.tag] ?? "/images/hero.avif"}
                    alt={cat.label}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                </div>
                <div className="relative px-3 pb-3 -mt-4">
                  <span className="font-medium text-sm group-hover:text-primary transition-colors">
                    {cat.label}
                  </span>
                  <span className="hidden sm:block mt-0.5 text-[11px] text-muted-foreground leading-tight">
                    {cat.description}
                  </span>
                </div>
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
  image,
  title,
  description,
  accent,
}: {
  readonly href: string;
  readonly image: string;
  readonly title: string;
  readonly description: string;
  readonly accent?: boolean;
}) {
  return (
    <a
      href={href}
      className={`group relative overflow-hidden rounded-xl border transition-all hover:shadow-lg ${
        accent
          ? "border-primary/30 hover:border-primary/50 hover:shadow-primary/10"
          : "border-border/40 hover:border-border hover:shadow-primary/5"
      }`}
    >
      <div className="relative h-28 sm:h-36">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/70 to-card/20" />
      </div>
      <div className="relative px-4 pb-4 -mt-6">
        {accent && (
          <span className="inline-block mb-1 rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-medium text-primary">
            Most popular
          </span>
        )}
        <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{title}</h3>
        <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed hidden sm:block">{description}</p>
      </div>
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
