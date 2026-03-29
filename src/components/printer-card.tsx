"use client";

import { type Printer, getOverallScore } from "@/data/printers";
import { AmazonButton } from "./amazon-button";

interface PrinterCardProps {
  readonly printer: Printer;
  readonly rank?: number;
}

function ScoreRing({ score }: { readonly score: number }) {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 10) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg width="52" height="52" className="-rotate-90">
        <circle cx="26" cy="26" r={radius} fill="none" stroke="currentColor" strokeWidth="3" className="text-muted/50" />
        <circle
          cx="26" cy="26" r={radius} fill="none" strokeWidth="3"
          stroke="url(#scoreGradient)"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="oklch(0.7 0.18 195)" />
            <stop offset="100%" stopColor="oklch(0.65 0.2 230)" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute text-sm font-bold">{score}</span>
    </div>
  );
}

function TopStat({ label, value }: { readonly label: string; readonly value: string }) {
  return (
    <div className="text-center">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-sm font-semibold font-mono">{value}</div>
    </div>
  );
}

export function PrinterCard({ printer, rank }: PrinterCardProps) {
  const overall = getOverallScore(printer);

  // Pick the printer's strongest dimension to highlight
  const scores = printer.scores;
  const bestDimension = Object.entries(scores).reduce((a, b) => a[1] >= b[1] ? a : b);
  const dimensionLabels: Record<string, string> = {
    value: "Value", beginner: "Beginner", printQuality: "Quality", speed: "Speed", reliability: "Reliable",
  };

  return (
    <a
      href={`/printers/${printer.slug}`}
      className="group flex gap-4 rounded-xl border border-border/40 bg-card p-4 transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 cursor-pointer"
    >
      {/* Left: Score Ring */}
      <div className="flex flex-col items-center gap-1 shrink-0">
        {rank !== undefined && (
          <span className="text-[10px] font-bold text-muted-foreground">#{rank}</span>
        )}
        <ScoreRing score={overall} />
        <span className="text-[10px] text-primary font-medium mt-0.5">
          {dimensionLabels[bestDimension[0]]} {bestDimension[1]}
        </span>
      </div>

      {/* Right: Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-semibold text-sm sm:text-base truncate group-hover:text-primary transition-colors">
              {printer.name}
            </h3>
            <p className="text-xs text-muted-foreground">
              {printer.brand} &middot; {printer.type.toUpperCase()} &middot; ${printer.price}
            </p>
          </div>
          <div className="text-xl sm:text-2xl font-bold shrink-0">${printer.price}</div>
        </div>

        <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {printer.summary}
        </p>

        {/* Key Stats Row */}
        <div className="mt-3 flex items-center gap-4 sm:gap-6">
          <TopStat label="Build" value={`${printer.buildVolume.x}mm`} />
          <TopStat label="Speed" value={`${printer.printSpeed}mm/s`} />
          <TopStat label="Weight" value={`${printer.weight}kg`} />
          <div className="hidden sm:block">
            <TopStat label="Resolution" value={`${printer.layerResolution.min}mm`} />
          </div>
        </div>

        {/* Features + CTA */}
        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1 overflow-hidden max-h-6">
            {printer.features.slice(0, 2).map((f) => (
              <span key={f} className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground whitespace-nowrap">
                {f}
              </span>
            ))}
            {printer.features.length > 2 && (
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                +{printer.features.length - 2}
              </span>
            )}
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <AmazonButton asin={printer.amazonAsin} printerName={printer.name} label="Buy" className="text-xs px-3 py-1.5" />
          </div>
        </div>
      </div>
    </a>
  );
}
