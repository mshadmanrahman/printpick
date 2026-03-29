import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { printers, getPrinterBySlug, getOverallScore, getAmazonUrl, getPrintersByBestFor } from "@/data/printers";
import { AmazonButton } from "@/components/amazon-button";
import { PrinterCard } from "@/components/printer-card";

export function generateStaticParams() {
  return printers.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const printer = getPrinterBySlug(slug);
  if (!printer) return { title: "Printer Not Found" };
  return {
    title: `${printer.name} Review — Score ${getOverallScore(printer)}/10`,
    description: `${printer.summary} Price: $${printer.price}. Scored ${getOverallScore(printer)}/10 across value, beginner-friendliness, print quality, speed, and reliability.`,
  };
}

function ScoreRow({ label, score }: { readonly label: string; readonly score: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-24 text-sm text-muted-foreground">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${score * 10}%` }}
        />
      </div>
      <span className="w-8 text-right font-mono text-sm font-bold">{score}</span>
    </div>
  );
}

export default async function PrinterDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const printer = getPrinterBySlug(slug);
  if (!printer) notFound();

  const overall = getOverallScore(printer);
  const related = printer.bestFor
    .flatMap((tag) => getPrintersByBestFor(tag))
    .filter((p) => p.slug !== printer.slug)
    .filter((p, i, arr) => arr.findIndex((a) => a.slug === p.slug) === i)
    .sort((a, b) => getOverallScore(b) - getOverallScore(a))
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-xs text-muted-foreground mb-6">
        <a href="/" className="hover:text-foreground">Home</a>
        <span className="mx-1">/</span>
        <a href="/best" className="hover:text-foreground">Best Printers</a>
        <span className="mx-1">/</span>
        <span className="text-foreground">{printer.name}</span>
      </nav>

      {/* Hero Image */}
      <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden mb-8">
        <Image
          src={printer.image}
          alt={printer.name}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="rounded-lg bg-white/90 px-3 py-1 text-xs font-bold text-foreground shadow-sm">
            {printer.type.toUpperCase()} &middot; {printer.brand}
          </span>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {printer.brand} &middot; {printer.type.toUpperCase()}
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">{printer.name}</h1>
          <p className="mt-3 text-lg text-muted-foreground leading-relaxed">{printer.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {printer.bestFor.map((tag) => (
              <a
                key={tag}
                href={`/best/${tag}`}
                className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground hover:bg-muted/80 transition-colors"
              >
                {tag}
              </a>
            ))}
          </div>
        </div>
        <div className="shrink-0 rounded-xl border border-border/60 bg-card p-6 text-center lg:w-64 shadow-sm">
          <div className="text-4xl font-bold">${printer.price}</div>
          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="text-sm text-muted-foreground">Overall Score</span>
            <span className="rounded-lg bg-primary/10 px-3 py-1 text-xl font-bold text-primary">
              {overall}
            </span>
          </div>
          <div className="mt-4">
            <AmazonButton asin={printer.amazonAsin} printerName={printer.name} className="w-full justify-center" />
          </div>
        </div>
      </div>

      {/* Scores */}
      <section className="mt-10">
        <h2 className="text-xl font-bold">PrintPick Scores</h2>
        <div className="mt-4 rounded-xl border border-border/60 bg-card p-5 space-y-3">
          <ScoreRow label="Value" score={printer.scores.value} />
          <ScoreRow label="Beginner" score={printer.scores.beginner} />
          <ScoreRow label="Print Quality" score={printer.scores.printQuality} />
          <ScoreRow label="Speed" score={printer.scores.speed} />
          <ScoreRow label="Reliability" score={printer.scores.reliability} />
        </div>
      </section>

      {/* Pros & Cons */}
      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-emerald-600/20 bg-emerald-50 p-5">
          <h3 className="font-semibold text-emerald-700">Pros</h3>
          <ul className="mt-3 space-y-2">
            {printer.pros.map((pro) => (
              <li key={pro} className="flex gap-2 text-sm">
                <span className="text-emerald-600 shrink-0 font-bold">+</span>
                <span className="text-emerald-900">{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-red-600/20 bg-red-50 p-5">
          <h3 className="font-semibold text-red-700">Cons</h3>
          <ul className="mt-3 space-y-2">
            {printer.cons.map((con) => (
              <li key={con} className="flex gap-2 text-sm">
                <span className="text-red-600 shrink-0 font-bold">-</span>
                <span className="text-red-900">{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Specs */}
      <section className="mt-10">
        <h2 className="text-xl font-bold">Specifications</h2>
        <div className="mt-4 rounded-xl border border-border/60 bg-card overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              <SpecRow label="Build Volume" value={`${printer.buildVolume.x} x ${printer.buildVolume.y} x ${printer.buildVolume.z} mm`} />
              <SpecRow label="Layer Resolution" value={`${printer.layerResolution.min}mm - ${printer.layerResolution.max}mm`} />
              <SpecRow label="Max Print Speed" value={`${printer.printSpeed} mm/s`} />
              <SpecRow label="Weight" value={`${printer.weight} kg`} />
              <SpecRow label="Type" value={printer.type === "fdm" ? "FDM (Filament)" : "Resin (MSLA)"} />
              <SpecRow label="Features" value={printer.features.join(", ")} />
            </tbody>
          </table>
        </div>
      </section>

      {/* Verdict */}
      <section className="mt-10">
        <h2 className="text-xl font-bold">Our Verdict</h2>
        <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm leading-relaxed">{printer.verdict}</p>
        </div>
        <div className="mt-4">
          <AmazonButton asin={printer.amazonAsin} printerName={printer.name} label={`Buy ${printer.name} on Amazon`} />
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="text-xl font-bold">Similar Printers</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {related.map((p) => (
              <PrinterCard key={p.slug} printer={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function SpecRow({ label, value }: { readonly label: string; readonly value: string }) {
  return (
    <tr className="border-b border-border/50 last:border-0">
      <td className="px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">{label}</td>
      <td className="px-4 py-3 font-mono text-xs">{value}</td>
    </tr>
  );
}
