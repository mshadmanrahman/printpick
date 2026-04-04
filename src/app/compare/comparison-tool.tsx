"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Trophy, ArrowUp, Link } from "lucide-react";
import { printers, type Printer, getOverallScore, getAmazonUrl } from "@/data/printers";
import { AmazonButton } from "@/components/amazon-button";

function PrinterSelector({
  label,
  selected,
  onSelect,
  exclude,
}: {
  readonly label: string;
  readonly selected: Printer | null;
  readonly onSelect: (p: Printer) => void;
  readonly exclude: string | null;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1">{label}</label>
      <select
        value={selected?.slug ?? ""}
        onChange={(e) => {
          const p = printers.find((pr) => pr.slug === e.target.value);
          if (p) onSelect(p);
        }}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <option value="">Select a printer...</option>
        {printers
          .filter((p) => p.slug !== exclude)
          .map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name} — ${p.price}
            </option>
          ))}
      </select>
    </div>
  );
}

function CompareRow({
  label,
  left,
  right,
  highlight,
}: {
  readonly label: string;
  readonly left: string | number;
  readonly right: string | number;
  readonly highlight?: "left" | "right" | "none";
}) {
  return (
    <tr className="border-b border-border/50 last:border-0">
      <td className={`px-4 py-2.5 font-mono text-sm text-right ${highlight === "left" ? "text-emerald-400 font-bold" : ""}`}>
        {left}
      </td>
      <td className="px-4 py-2.5 text-center text-xs text-muted-foreground font-medium whitespace-nowrap">
        {label}
      </td>
      <td className={`px-4 py-2.5 font-mono text-sm ${highlight === "right" ? "text-emerald-400 font-bold" : ""}`}>
        {right}
      </td>
    </tr>
  );
}

function ScoreCompare({
  label,
  left,
  right,
}: {
  readonly label: string;
  readonly left: number;
  readonly right: number;
}) {
  const highlight = left > right ? "left" : right > left ? "right" : "none";
  return <CompareRow label={label} left={left} right={right} highlight={highlight} />;
}

export function ComparisonTool() {
  const [printerA, setPrinterA] = useState<Printer | null>(null);
  const [printerB, setPrinterB] = useState<Printer | null>(null);
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(() => {
    if (!printerA || !printerB) return;
    const url = `${window.location.origin}/compare/${printerA.slug}-vs-${printerB.slug}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [printerA, printerB]);

  return (
    <div className="mt-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <PrinterSelector label="Printer A" selected={printerA} onSelect={setPrinterA} exclude={printerB?.slug ?? null} />
        <PrinterSelector label="Printer B" selected={printerB} onSelect={setPrinterB} exclude={printerA?.slug ?? null} />
      </div>

      {printerA && printerB && (() => {
          const overallA = getOverallScore(printerA);
          const overallB = getOverallScore(printerB);
          const winner = overallA > overallB ? printerA : overallB > overallA ? printerB : null;
          const priceDelta = Math.abs(printerA.price - printerB.price);
          const moreExpensive = printerA.price > printerB.price ? printerA : printerB;
          const cheaper = printerA.price > printerB.price ? printerB : printerA;
          const winnerScore = winner ? (winner.slug === printerA.slug ? overallA : overallB) : null;
          const loserScore = winner ? (winner.slug === printerA.slug ? overallB : overallA) : null;
          return (
        <div className="mt-8">
          {/* Winner banner */}
          {winner && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-[color:var(--winner)]/40 bg-[color:var(--winner)]/8 px-4 py-3.5">
              <Trophy className="h-5 w-5 text-[color:var(--winner)] shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">
                  <span className="text-[color:var(--winner)]">{winner.name}</span>
                  {" "}wins overall
                  <span className="ml-2 text-xs font-normal text-muted-foreground">({winnerScore}/10 vs {loserScore}/10)</span>
                </p>
                {priceDelta > 0 && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {moreExpensive.slug === winner.slug
                      ? `Better performance for $${priceDelta} more — worth it if this is your primary tool`
                      : `Better performance AND $${priceDelta} cheaper than the ${moreExpensive.name}`}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={handleShare}
                className="shrink-0 flex items-center gap-1.5 rounded-lg border border-border/60 bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-border transition-all"
              >
                <Link className="h-3 w-3" />
                {copied ? "Copied!" : "Share"}
              </button>
            </div>
          )}

          {/* Header with images */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3">
                <Image src={printerA.image} alt={printerA.name} fill className="object-cover" sizes="200px" />
              </div>
              <a href={`/printers/${printerA.slug}`} className="font-bold text-sm sm:text-lg hover:text-primary transition-colors">{printerA.name}</a>
              <p className="text-xl sm:text-2xl font-bold mt-1">${printerA.price}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Score: <span className="font-bold text-primary">{getOverallScore(printerA)}</span>
              </p>
              <div className="mt-2 flex justify-center">
                <AmazonButton asin={printerA.amazonAsin} printerName={printerA.name} label="Buy" className="text-xs px-3 py-1.5" />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-2xl font-bold text-muted-foreground">VS</span>
            </div>
            <div className="text-center">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3">
                <Image src={printerB.image} alt={printerB.name} fill className="object-cover" sizes="200px" />
              </div>
              <a href={`/printers/${printerB.slug}`} className="font-bold text-sm sm:text-lg hover:text-primary transition-colors">{printerB.name}</a>
              <p className="text-xl sm:text-2xl font-bold mt-1">${printerB.price}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Score: <span className="font-bold text-primary">{getOverallScore(printerB)}</span>
              </p>
              <div className="mt-2 flex justify-center">
                <AmazonButton asin={printerB.amazonAsin} printerName={printerB.name} label="Buy" className="text-xs px-3 py-1.5" />
              </div>
            </div>
          </div>

          {/* Scores */}
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="bg-muted/50 px-4 py-2 text-xs font-semibold text-muted-foreground text-center">
              SCORES (higher is better)
            </div>
            <table className="w-full">
              <tbody>
                <ScoreCompare label="Value" left={printerA.scores.value} right={printerB.scores.value} />
                <ScoreCompare label="Beginner" left={printerA.scores.beginner} right={printerB.scores.beginner} />
                <ScoreCompare label="Print Quality" left={printerA.scores.printQuality} right={printerB.scores.printQuality} />
                <ScoreCompare label="Speed" left={printerA.scores.speed} right={printerB.scores.speed} />
                <ScoreCompare label="Reliability" left={printerA.scores.reliability} right={printerB.scores.reliability} />
                <ScoreCompare label="OVERALL" left={getOverallScore(printerA)} right={getOverallScore(printerB)} />
              </tbody>
            </table>
          </div>

          {/* Specs */}
          <div className="mt-4 rounded-lg border border-border bg-card overflow-hidden">
            <div className="bg-muted/50 px-4 py-2 text-xs font-semibold text-muted-foreground text-center">
              SPECIFICATIONS
            </div>
            <table className="w-full">
              <tbody>
                <CompareRow label="Price" left={`$${printerA.price}`} right={`$${printerB.price}`} highlight={printerA.price < printerB.price ? "left" : printerB.price < printerA.price ? "right" : "none"} />
                <CompareRow label="Type" left={printerA.type.toUpperCase()} right={printerB.type.toUpperCase()} />
                <CompareRow label="Build Volume" left={`${printerA.buildVolume.x}x${printerA.buildVolume.y}x${printerA.buildVolume.z}`} right={`${printerB.buildVolume.x}x${printerB.buildVolume.y}x${printerB.buildVolume.z}`} />
                <CompareRow label="Max Speed" left={`${printerA.printSpeed} mm/s`} right={`${printerB.printSpeed} mm/s`} highlight={printerA.printSpeed > printerB.printSpeed ? "left" : printerB.printSpeed > printerA.printSpeed ? "right" : "none"} />
                <CompareRow label="Min Resolution" left={`${printerA.layerResolution.min}mm`} right={`${printerB.layerResolution.min}mm`} highlight={printerA.layerResolution.min < printerB.layerResolution.min ? "left" : printerB.layerResolution.min < printerA.layerResolution.min ? "right" : "none"} />
                <CompareRow label="Weight" left={`${printerA.weight} kg`} right={`${printerB.weight} kg`} />
              </tbody>
            </table>
          </div>

          {/* Features */}
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-4">
              <h4 className="text-xs font-semibold text-muted-foreground mb-2">
                {printerA.name} Features
              </h4>
              <div className="flex flex-wrap gap-1">
                {printerA.features.map((f) => (
                  <span
                    key={f}
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      printerB.features.includes(f)
                        ? "bg-muted text-muted-foreground"
                        : "bg-emerald-500/10 text-emerald-400"
                    }`}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <h4 className="text-xs font-semibold text-muted-foreground mb-2">
                {printerB.name} Features
              </h4>
              <div className="flex flex-wrap gap-1">
                {printerB.features.map((f) => (
                  <span
                    key={f}
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      printerA.features.includes(f)
                        ? "bg-muted text-muted-foreground"
                        : "bg-emerald-500/10 text-emerald-400"
                    }`}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-2 text-[10px] text-muted-foreground text-center">
            Green = unique to that printer. Gray = both printers have this feature.
          </p>
        </div>
          );
      })()}

      {/* Popular Comparisons */}
      {(!printerA || !printerB) && (
        <section className="mt-12">
          <h2 className="text-lg font-bold">Popular Comparisons</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {[
              ["bambu-lab-a1-combo", "creality-ender-3-v3"],
              ["bambu-lab-p1s", "qidi-x-plus-3"],
              ["elegoo-mars-5-ultra", "anycubic-photon-mono-4"],
              ["bambu-lab-a1-combo", "anycubic-kobra-3-combo"],
              ["creality-k1-max", "sovol-sv08"],
              ["bambu-lab-p2s", "prusa-core-one"],
            ].map(([slugA, slugB]) => {
              const a = printers.find((p) => p.slug === slugA);
              const b = printers.find((p) => p.slug === slugB);
              if (!a || !b) return null;
              return (
                <button
                  key={`${slugA}-${slugB}`}
                  type="button"
                  onClick={() => { setPrinterA(a); setPrinterB(b); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="group rounded-xl border border-border/50 p-3 text-left text-sm hover:border-primary/30 hover:shadow-sm transition-all flex items-center gap-3"
                >
                  <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0">
                    <Image src={a.image} alt={a.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-medium group-hover:text-primary transition-colors">{a.name}</span>
                    <span className="text-muted-foreground"> vs </span>
                    <span className="font-medium group-hover:text-primary transition-colors">{b.name}</span>
                  </div>
                  <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0">
                    <Image src={b.image} alt={b.name} fill className="object-cover" sizes="48px" />
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
