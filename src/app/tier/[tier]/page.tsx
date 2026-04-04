import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowRight } from "lucide-react";
import { printers, getOverallScore } from "@/data/printers";
import { TIER_CONFIG, TIERS, type Tier } from "@/data/tier-picks";
import { AnchorPricing } from "@/components/anchor-pricing";
import { PrinterCard } from "@/components/printer-card";

export function generateStaticParams() {
  return TIERS.map((tier) => ({ tier }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tier: string }>;
}): Promise<Metadata> {
  const { tier } = await params;
  const config = TIER_CONFIG[tier as Tier];
  if (!config) return { title: "Not Found" };

  return {
    title: `Best ${config.label} 3D Printers 2026 — Ranked & Scored`,
    description: config.editorialCopy[0],
    alternates: { canonical: `https://printpick.dev/tier/${tier}` },
    openGraph: {
      title: `Best ${config.label} 3D Printers 2026`,
      description: config.editorialCopy[0],
      url: `https://printpick.dev/tier/${tier}`,
      images: [
        {
          url: `https://printpick.dev/api/og?title=${encodeURIComponent(`Best ${config.label} Printers 2026`)}&subtitle=${encodeURIComponent(config.tagline)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

const TIER_LABELS: Record<Tier, string> = {
  "first-printer": "First Printer",
  "maker": "Maker",
  "professional": "Professional",
  "resin": "Resin",
};

export default async function TierPage({
  params,
}: {
  params: Promise<{ tier: string }>;
}) {
  const { tier } = await params;
  const config = TIER_CONFIG[tier as Tier];
  if (!config) notFound();

  const printerMap = new Map(printers.map((p) => [p.slug, p]));

  const budgetPick = printerMap.get(config.budgetPick);
  const bestValue = printerMap.get(config.bestValue);
  const stepUp = printerMap.get(config.stepUp);

  if (!budgetPick || !bestValue || !stepUp) notFound();

  const catalogPrinters = config.catalogSlugs
    .map((slug) => printerMap.get(slug))
    .filter((p): p is NonNullable<typeof p> => p !== undefined)
    .sort((a, b) => getOverallScore(b) - getOverallScore(a));

  const otherTiers = TIERS.filter((t) => t !== config.slug);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative h-64 sm:h-80 overflow-hidden">
        <Image
          src={`/images/gallery/${config.slug}-hero.png`}
          alt={`${config.label} — ${config.tagline}`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end pb-8 sm:pb-12 px-4">
          <div className="mx-auto w-full max-w-5xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1 text-xs text-white/50 mb-4">
              <a href="/" className="hover:text-white/80 transition-colors">Home</a>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/80">{config.label}</span>
            </nav>

            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
              {config.priceRange}
            </p>
            <h1
              className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-none"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {config.label}
            </h1>
            <p className="mt-2 text-base sm:text-lg text-white/60">{config.tagline}</p>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-5xl px-4">
        {/* Editorial copy */}
        <section className="py-10 sm:py-14 border-b border-border/50">
          <div className="max-w-2xl space-y-4">
            {config.editorialCopy.map((paragraph, i) => (
              <p key={i} className={`leading-relaxed ${i === 0 ? "text-base sm:text-lg font-medium text-foreground" : "text-sm sm:text-base text-muted-foreground"}`}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Anchor pricing */}
        <section className="py-10 sm:py-14 border-b border-border/50">
          <AnchorPricing
            budgetPick={budgetPick}
            bestValue={bestValue}
            stepUp={stepUp}
            config={config}
          />
        </section>

        {/* Full catalog */}
        <section className="py-10 sm:py-14 border-b border-border/50">
          <div className="mb-6">
            <h2
              className="text-xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              The Full List
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {catalogPrinters.length} printers · ranked by overall score
            </p>
          </div>
          <div className="grid gap-3">
            {catalogPrinters.map((printer, i) => (
              <PrinterCard key={printer.slug} printer={printer} rank={i + 1} />
            ))}
          </div>
        </section>

        {/* Not sure CTA */}
        <section className="py-10 sm:py-14 border-b border-border/50">
          <div className="rounded-2xl bg-card border border-border/60 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <div className="flex-1">
              <h2
                className="text-lg font-bold tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Not sure this is the right tier?
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Take the 60-second quiz. Answer 6 questions and we&apos;ll match you to the right printer for your exact situation.
              </p>
            </div>
            <a
              href="/tools/finder"
              className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:-translate-y-0.5 shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Take the quiz
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </section>

        {/* Other tiers */}
        <section className="py-10 sm:py-14">
          <h2
            className="text-lg font-bold tracking-tight mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Other Paths
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {otherTiers.map((t) => {
              const other = TIER_CONFIG[t];
              return (
                <a
                  key={t}
                  href={`/tier/${t}`}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-card px-4 py-3.5 transition-all hover:border-primary/40 hover:bg-secondary focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <div className="min-w-0">
                    <span className="block font-semibold text-sm group-hover:text-primary transition-colors">
                      {TIER_LABELS[t]}
                    </span>
                    <span className="block text-xs text-muted-foreground mt-0.5 truncate">
                      {other.priceRange} · {other.tagline}
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </a>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
