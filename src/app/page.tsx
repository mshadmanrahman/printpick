import Image from "next/image";
import { Search, DollarSign, Layers, GitCompare, ChevronRight, ArrowRight, MessageCircle } from "lucide-react";
import { printers, getOverallScore, CATEGORIES } from "@/data/printers";
import { PrinterCard } from "@/components/printer-card";
import { ReviewCarousel } from "@/components/review-carousel";

const topPrinters = [...printers]
  .sort((a, b) => getOverallScore(b) - getOverallScore(a))
  .slice(0, 3);

const stats = {
  total: printers.length,
  brands: new Set(printers.map((p) => p.brand)).size,
};

const FEATURED_REVIEWS = [
  { quote: "The A1 Combo is the printer I recommend to literally everyone who asks.", source: "r/3Dprinting", printer: "Bambu Lab A1 Combo", slug: "bambu-lab-a1-combo" },
  { quote: "Refreshing a best seller. The P1S is the strong choice for anyone wanting to print ABS.", source: "Tom's Hardware", printer: "Bambu Lab P1S", slug: "bambu-lab-p1s" },
  { quote: "The V3 SE sets a new baseline for cheap 3D printing.", source: "All3DP", printer: "Creality Ender 3 V3 SE", slug: "creality-ender-3-v3-se" },
  { quote: "14K resolution means you can print things FDM users can only dream about.", source: "Uncle Jessy (YouTube)", printer: "Elegoo Mars 5 Ultra", slug: "elegoo-mars-5-ultra" },
  { quote: "For $199, this thing is a miracle. Print quality rivals machines 3x the price.", source: "r/BambuLab", printer: "Bambu Lab A1 Mini", slug: "bambu-lab-a1-mini" },
  { quote: "Active chamber heating to 60C at this price? QIDI is quietly winning.", source: "r/3Dprinting", printer: "QIDI X-Plus 3", slug: "qidi-x-plus-3" },
  { quote: "My MK3 ran for 5 years without a single failed print. The MK4S continues that legacy.", source: "r/prusa3d", printer: "Prusa MK4S", slug: "prusa-mk4s" },
];

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
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

const IDENTITY_PATHS = [
  {
    id: "first-printer",
    label: "First Printer",
    tagline: "See what you can make",
    description: "Easy setup, massive community support, forgiving of mistakes.",
    priceRange: "$150 – $400",
    image: "/images/gallery/first-printer-hero.png",
    href: "/tier/first-printer",
  },
  {
    id: "maker",
    label: "Maker",
    tagline: "Level up your builds",
    description: "More speed, more materials, more control over every print.",
    priceRange: "$300 – $700",
    image: "/images/gallery/maker-hero.png",
    href: "/tier/maker",
  },
  {
    id: "professional",
    label: "Professional",
    tagline: "Precision at scale",
    description: "Engineering-grade filaments, enclosed chambers, zero babysitting.",
    priceRange: "$600+",
    image: "/images/gallery/professional-hero.png",
    href: "/tier/professional",
  },
  {
    id: "resin",
    label: "Resin",
    tagline: "Insane detail, tiny scale",
    description: "Miniatures, jewelry, dental. 20-micron layers.",
    priceRange: "$200 – $600",
    image: "/images/gallery/resin-hero.png",
    href: "/tier/resin",
  },
] as const;

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Radial glow behind headline */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.62 0.14 192 / 8%) 0%, transparent 70%)",
          }}
        />
        <div className="mx-auto max-w-5xl px-4 pt-16 pb-12 sm:pt-24 sm:pb-16 text-center relative">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-6">
            {stats.total} printers &middot; {stats.brands} brands &middot; 5 scoring dimensions &middot; zero sponsors
          </p>
          <h1
            className="text-5xl font-extrabold sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            What will you
            <br />
            <span className="text-primary">build?</span>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-base text-muted-foreground sm:text-lg leading-relaxed">
            Honest scores. No sponsored rankings. Just the data you need to pick the right printer.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="/tools/finder"
              className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ease-smooth"
            >
              Take the 60-second quiz
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 ease-smooth" />
            </a>
            <a
              href="/best"
              className="inline-flex items-center gap-1 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Browse all {stats.total} printers
            </a>
          </div>
        </div>
      </section>

      {/* Identity selector */}
      <section className="mx-auto w-full max-w-5xl px-4 pb-16">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-5 text-center">
          Choose your path
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {IDENTITY_PATHS.map((path) => (
            <IdentityCard key={path.id} {...path} />
          ))}
        </div>
        <p className="mt-5 text-center text-sm text-muted-foreground">
          Not sure where you land?{" "}
          <a href="/tools/finder" className="text-primary underline-offset-4 hover:underline font-medium">
            Take the quiz →
          </a>
        </p>
      </section>

      {/* Stats strip */}
      <section className="border-y border-border/50 bg-card/50">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <dl className="grid grid-cols-3 gap-6 text-center">
            <StatItem value={`${stats.total}+`} label="Printers scored" />
            <StatItem value={`${stats.brands}`} label="Brands covered" />
            <StatItem value="5" label="Scoring dimensions" />
          </dl>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 w-full">
        {/* Tools */}
        <section className="py-14">
          <h2
            className="text-xl font-bold tracking-tight mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Interactive Tools
          </h2>
          <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
            <ToolCard
              href="/tools/finder"
              icon={<Search className="h-4 w-4" />}
              title="Printer Finder"
              description="6 questions. Your perfect match."
              accent
            />
            <ToolCard
              href="/tools/cost-estimator"
              icon={<DollarSign className="h-4 w-4" />}
              title="Cost Estimator"
              description="Real cost per print calculated."
            />
            <ToolCard
              href="/tools/fdm-vs-resin"
              icon={<Layers className="h-4 w-4" />}
              title="FDM vs Resin"
              description="Which technology is right for you?"
            />
            <ToolCard
              href="/compare"
              icon={<GitCompare className="h-4 w-4" />}
              title="Compare"
              description="Head-to-head spec matchups."
            />
          </div>
        </section>

        {/* Top Rated */}
        <section className="py-14 border-t border-border/50">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between mb-8">
            <div>
              <h2
                className="text-2xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Editor&rsquo;s Picks
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Highest overall score across all five dimensions.
              </p>
            </div>
            <a
              href="/best"
              className="text-sm font-medium text-primary hover:underline underline-offset-4 flex items-center gap-1 shrink-0 focus-visible:outline-2 focus-visible:outline-primary rounded"
            >
              All {stats.total} printers <ChevronRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="grid gap-3">
            {topPrinters.map((printer, i) => (
              <PrinterCard key={printer.slug} printer={printer} rank={i + 1} />
            ))}
          </div>
        </section>

        {/* Community quotes */}
        <section className="py-14 border-t border-border/50">
          <div className="mb-8">
            <h2
              className="text-2xl font-bold tracking-tight flex items-center gap-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <MessageCircle className="h-5 w-5 text-primary" />
              What the Community Says
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Real opinions from Reddit, YouTube reviewers, and tech publications.
            </p>
          </div>
          <ReviewCarousel reviews={FEATURED_REVIEWS} />
        </section>

        {/* Categories */}
        <section className="py-14 border-t border-border/50">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between mb-8">
            <div>
              <h2
                className="text-2xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Best By Category
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">Quick picks for your specific use case.</p>
            </div>
          </div>
          <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.tag}
                href={`/best/${cat.tag}`}
                className="group flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-card px-4 py-3.5 transition-all hover:border-primary/40 hover:bg-secondary focus-visible:outline-2 focus-visible:outline-primary"
              >
                <div className="min-w-0">
                  <span className="font-medium text-sm group-hover:text-primary transition-colors">
                    {cat.label}
                  </span>
                  <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed truncate">
                    {CATEGORY_DESCRIPTIONS[cat.tag] ?? cat.description}
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

function IdentityCard({
  label,
  tagline,
  description,
  priceRange,
  image,
  href,
}: {
  readonly label: string;
  readonly tagline: string;
  readonly description: string;
  readonly priceRange: string;
  readonly image: string;
  readonly href: string;
}) {
  return (
    <a
      href={href}
      className="group relative flex flex-col justify-end overflow-hidden rounded-xl aspect-[3/4] sm:aspect-[4/5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {/* Background image */}
      <Image
        src={image}
        alt={`${label} — ${tagline}`}
        fill
        className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      />
      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 transition-opacity duration-300 group-hover:from-black/75"
        aria-hidden="true"
      />
      {/* Content */}
      <div className="relative z-10 p-5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-primary mb-1">
          {priceRange}
        </p>
        <h3
          className="text-xl font-bold text-white leading-tight tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {label}
        </h3>
        <p className="text-xs text-white/70 mt-1 leading-relaxed">{description}</p>
        <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary">
          {tagline}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 ease-smooth" />
        </div>
      </div>
    </a>
  );
}

function StatItem({ value, label }: { readonly value: string; readonly label: string }) {
  return (
    <div>
      <dt
        className="text-2xl font-bold text-foreground tabular-nums"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {value}
      </dt>
      <dd className="text-xs text-muted-foreground mt-0.5">{label}</dd>
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
      className={`group rounded-lg border bg-card p-4 sm:p-5 transition-all hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ease-smooth ${
        accent
          ? "border-primary/30 hover:border-primary/60 hover:shadow-md hover:shadow-primary/10"
          : "border-border/60 hover:border-border hover:shadow-sm"
      }`}
    >
      <div
        className={`inline-flex items-center justify-center rounded-md p-2 mb-3 ${
          accent ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground group-hover:text-primary"
        } transition-colors`}
      >
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
