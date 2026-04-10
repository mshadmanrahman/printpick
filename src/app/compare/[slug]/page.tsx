import type { Metadata } from "next";
import type { WithContext, FAQPage, BreadcrumbList } from "schema-dts";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  printers,
  getPrinterBySlug,
  getOverallScore,
  type Printer,
} from "@/data/printers";
import { AmazonButton } from "@/components/amazon-button";
import { JsonLd } from "@/components/json-ld";
import {
  generateComparisonPairs,
  parseComparisonSlug,
  getCanonicalSlug,
  compareScores,
  generateIntro,
  generateVerdict,
  generateFaqs,
  getRelatedComparisons,
} from "@/lib/comparison-utils";

/* ── Static generation ─────────────────────────────── */

export function generateStaticParams() {
  return generateComparisonPairs().map((slug) => ({ slug }));
}

/* ── Metadata ──────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseComparisonSlug(slug);
  if (!parsed) return { title: "Comparison Not Found" };

  const a = getPrinterBySlug(parsed.a)!;
  const b = getPrinterBySlug(parsed.b)!;
  const title = `${a.name} vs ${b.name}: Which 3D Printer Wins?`;
  const desc = `Side-by-side comparison of ${a.name} ($${a.price}) and ${b.name} ($${b.price}). Scores, specs, pros & cons, and our pick for 2026.`;

  return {
    title,
    description: desc,
    alternates: { canonical: `https://printpick.dev/compare/${slug}` },
    openGraph: {
      title,
      description: desc,
      url: `https://printpick.dev/compare/${slug}`,
      images: [
        {
          url: `https://printpick.dev/api/og?title=${encodeURIComponent(`${a.name} vs ${b.name}`)}&subtitle=${encodeURIComponent(`$${a.price} vs $${b.price} — Head-to-Head`)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

/* ── Helper components ─────────────────────────────── */

function ScoreBar({
  label,
  scoreA,
  scoreB,
  winner,
}: {
  readonly label: string;
  readonly scoreA: number;
  readonly scoreB: number;
  readonly winner: "a" | "b" | "tie";
}) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 py-2">
      <div className="flex items-center justify-end gap-2">
        <div className="h-2.5 w-full max-w-[120px] overflow-hidden rounded-full bg-muted flex justify-end">
          <div
            className={`h-full rounded-full ${winner === "a" ? "bg-primary" : "bg-muted-foreground/40"}`}
            style={{ width: `${scoreA * 10}%` }}
          />
        </div>
        <span
          className={`w-6 text-right font-mono text-sm ${winner === "a" ? "font-bold text-primary" : ""}`}
        >
          {scoreA}
        </span>
      </div>
      <span className="w-28 text-center text-xs font-medium text-muted-foreground">
        {label}
      </span>
      <div className="flex items-center gap-2">
        <span
          className={`w-6 font-mono text-sm ${winner === "b" ? "font-bold text-primary" : ""}`}
        >
          {scoreB}
        </span>
        <div className="h-2.5 w-full max-w-[120px] overflow-hidden rounded-full bg-muted">
          <div
            className={`h-full rounded-full ${winner === "b" ? "bg-primary" : "bg-muted-foreground/40"}`}
            style={{ width: `${scoreB * 10}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function SpecRow({
  label,
  valA,
  valB,
  highlightA = false,
  highlightB = false,
}: {
  readonly label: string;
  readonly valA: string;
  readonly valB: string;
  readonly highlightA?: boolean;
  readonly highlightB?: boolean;
}) {
  return (
    <tr className="border-b last:border-b-0">
      <td className="py-2.5 pl-4 text-sm text-muted-foreground">{label}</td>
      <td
        className={`py-2.5 text-center text-sm ${highlightA ? "font-semibold text-primary" : ""}`}
      >
        {valA}
      </td>
      <td
        className={`py-2.5 pr-4 text-center text-sm ${highlightB ? "font-semibold text-primary" : ""}`}
      >
        {valB}
      </td>
    </tr>
  );
}

function buildVol(p: Printer): number {
  return p.buildVolume.x * p.buildVolume.y * p.buildVolume.z;
}

/* ── Page ──────────────────────────────────────────── */

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const parsed = parseComparisonSlug(slug);
  if (!parsed) notFound();

  /* Redirect non-canonical orderings to canonical */
  const canonical = getCanonicalSlug(parsed.a, parsed.b);
  if (slug !== canonical) redirect(`/compare/${canonical}`);

  const a = getPrinterBySlug(parsed.a);
  const b = getPrinterBySlug(parsed.b);
  if (!a || !b) notFound();

  const scoreA = getOverallScore(a);
  const scoreB = getOverallScore(b);
  const categories = compareScores(a, b);
  const intro = generateIntro(a, b);
  const verdict = generateVerdict(a, b);
  const faqs = generateFaqs(a, b);

  const aWins = categories.filter((c) => c.winner === "a").length;
  const bWins = categories.filter((c) => c.winner === "b").length;

  const relatedSlugs = [
    ...getRelatedComparisons(a.slug, slug, 3),
    ...getRelatedComparisons(b.slug, slug, 3),
  ]
    .filter((s, i, arr) => arr.indexOf(s) === i)
    .slice(0, 6);

  /* ── JSON-LD ── */
  const faqSchema: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbSchema: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://printpick.dev",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Compare",
        item: "https://printpick.dev/compare",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${a.name} vs ${b.name}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="mx-auto max-w-5xl px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/compare"
            className="transition-colors hover:text-foreground"
          >
            Compare
          </Link>
          <span>/</span>
          <span className="text-foreground">
            {a.name} vs {b.name}
          </span>
        </nav>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {a.name} vs {b.name}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Head-to-head 3D printer comparison — 2026
        </p>

        {/* ── Hero cards ────────────────────────────── */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {[
            { printer: a, score: scoreA, wins: aWins },
            { printer: b, score: scoreB, wins: bWins },
          ].map(({ printer, score, wins }) => (
            <div
              key={printer.slug}
              className="relative rounded-xl border bg-card p-6 text-center"
            >
              {score > Math.min(scoreA, scoreB) && scoreA !== scoreB && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-primary-foreground">
                  Winner
                </span>
              )}
              <div className="relative mx-auto aspect-[4/3] w-full max-w-[200px]">
                <Image
                  src={printer.image}
                  alt={printer.name}
                  fill
                  className="object-contain"
                  sizes="200px"
                />
              </div>
              <h2 className="mt-4 text-lg font-semibold">
                <Link
                  href={`/printers/${printer.slug}`}
                  className="transition-colors hover:text-primary"
                >
                  {printer.name}
                </Link>
              </h2>
              <p className="text-3xl font-bold text-primary">{score}/10</p>
              <p className="text-sm text-muted-foreground">
                Wins {wins} of 5 categories
              </p>
              <p className="mt-1 text-xl font-semibold">${printer.price}</p>
              <div className="mt-4">
                <AmazonButton
                  asin={printer.amazonAsin}
                  printerName={printer.name}
                  price={printer.price}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ── Intro ─────────────────────────────────── */}
        <p className="mt-10 text-lg leading-relaxed">{intro}</p>

        {/* ── Verdict ───────────────────────────────── */}
        <section className="mt-8 rounded-xl border-l-4 border-primary bg-primary/5 p-6">
          <h2 className="text-xl font-bold">Our Verdict</h2>
          <p className="mt-2 leading-relaxed">{verdict}</p>
        </section>

        {/* ── Score comparison ──────────────────────── */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold">Score Breakdown</h2>
          <div className="mt-4 rounded-xl border p-4">
            <div className="mb-2 grid grid-cols-[1fr_auto_1fr] text-xs font-medium text-muted-foreground">
              <span className="text-right">{a.name}</span>
              <span className="w-28" />
              <span>{b.name}</span>
            </div>
            {categories.map((cat) => (
              <ScoreBar
                key={cat.key}
                label={cat.label}
                scoreA={cat.scoreA}
                scoreB={cat.scoreB}
                winner={cat.winner}
              />
            ))}
          </div>
        </section>

        {/* ── Specs table ──────────────────────────── */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold">Specifications</h2>
          <div className="mt-4 overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3 pl-4 text-left font-medium text-muted-foreground">
                    Spec
                  </th>
                  <th className="py-3 text-center font-medium">{a.name}</th>
                  <th className="py-3 pr-4 text-center font-medium">
                    {b.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                <SpecRow
                  label="Price"
                  valA={`$${a.price}`}
                  valB={`$${b.price}`}
                  highlightA={a.price < b.price}
                  highlightB={b.price < a.price}
                />
                <SpecRow
                  label="Type"
                  valA={a.type.toUpperCase()}
                  valB={b.type.toUpperCase()}
                />
                <SpecRow
                  label="Build Volume"
                  valA={`${a.buildVolume.x} x ${a.buildVolume.y} x ${a.buildVolume.z} mm`}
                  valB={`${b.buildVolume.x} x ${b.buildVolume.y} x ${b.buildVolume.z} mm`}
                  highlightA={buildVol(a) > buildVol(b)}
                  highlightB={buildVol(b) > buildVol(a)}
                />
                <SpecRow
                  label="Print Speed"
                  valA={`${a.printSpeed} mm/s`}
                  valB={`${b.printSpeed} mm/s`}
                  highlightA={a.printSpeed > b.printSpeed}
                  highlightB={b.printSpeed > a.printSpeed}
                />
                <SpecRow
                  label="Min Resolution"
                  valA={`${a.layerResolution.min} mm`}
                  valB={`${b.layerResolution.min} mm`}
                  highlightA={a.layerResolution.min < b.layerResolution.min}
                  highlightB={b.layerResolution.min < a.layerResolution.min}
                />
                <SpecRow
                  label="Weight"
                  valA={`${a.weight} kg`}
                  valB={`${b.weight} kg`}
                />
                <SpecRow
                  label="Overall Score"
                  valA={`${scoreA}/10`}
                  valB={`${scoreB}/10`}
                  highlightA={scoreA > scoreB}
                  highlightB={scoreB > scoreA}
                />
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Pros & Cons ──────────────────────────── */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold">Pros & Cons</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            {[a, b].map((printer) => (
              <div key={printer.slug} className="rounded-xl border p-5">
                <h3 className="font-semibold">{printer.name}</h3>
                <div className="mt-3 space-y-1.5">
                  {printer.pros.map((pro) => (
                    <p key={pro} className="flex gap-2 text-sm">
                      <span className="shrink-0 text-green-500">+</span>
                      {pro}
                    </p>
                  ))}
                  {printer.cons.map((con) => (
                    <p key={con} className="flex gap-2 text-sm">
                      <span className="shrink-0 text-red-400">&minus;</span>
                      {con}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Who should buy which ─────────────────── */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold">Who Should Buy Which?</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            {[a, b].map((printer) => (
              <div
                key={printer.slug}
                className="rounded-xl border-2 border-primary/20 p-5"
              >
                <h3 className="font-semibold">
                  Choose the {printer.name} if you want:
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {printer.bestFor.map((use) => (
                    <li key={use}>
                      A great printer for{" "}
                      <span className="font-medium text-foreground">{use}</span>
                    </li>
                  ))}
                  {printer.features.slice(0, 3).map((feat) => (
                    <li key={feat}>{feat}</li>
                  ))}
                </ul>
                <div className="mt-3">
                  <AmazonButton
                    asin={printer.amazonAsin}
                    printerName={printer.name}
                    price={printer.price}
                    label={`Get ${printer.name} — $${printer.price}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────── */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="mt-4 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border p-4"
              >
                <summary className="cursor-pointer font-medium">
                  {faq.question}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ── Related comparisons ──────────────────── */}
        {relatedSlugs.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold">Related Comparisons</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {relatedSlugs.map((relSlug) => {
                const p = parseComparisonSlug(relSlug);
                if (!p) return null;
                const pa = getPrinterBySlug(p.a);
                const pb = getPrinterBySlug(p.b);
                if (!pa || !pb) return null;
                return (
                  <Link
                    key={relSlug}
                    href={`/compare/${relSlug}`}
                    className="rounded-lg border p-3 text-sm transition-colors hover:border-primary/50"
                  >
                    <span className="font-medium">{pa.name}</span>
                    <span className="text-muted-foreground"> vs </span>
                    <span className="font-medium">{pb.name}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* ── Back to compare tool ─────────────────── */}
        <div className="mt-10 text-center">
          <Link
            href="/compare"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            &larr; Compare any two printers
          </Link>
        </div>
      </div>
    </>
  );
}
