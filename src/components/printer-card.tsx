"use client";

import { type Printer, getOverallScore } from "@/data/printers";
import { AmazonButton } from "./amazon-button";

interface PrinterCardProps {
  readonly printer: Printer;
  readonly rank?: number;
}

function ScoreBadge({ score, rank }: { readonly score: number; readonly rank?: number }) {
  return (
    <div className="flex flex-col items-center gap-0.5 shrink-0">
      {rank !== undefined && (
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">#{rank}</span>
      )}
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <span className="text-lg font-bold">{score}</span>
      </div>
    </div>
  );
}

function Stat({ label, value }: { readonly label: string; readonly value: string }) {
  return (
    <div>
      <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{label}</div>
      <div className="text-sm font-semibold font-mono">{value}</div>
    </div>
  );
}

export function PrinterCard({ printer, rank }: PrinterCardProps) {
  const overall = getOverallScore(printer);

  return (
    <div
      className="group relative flex gap-4 rounded-xl border border-border/60 bg-card p-4 transition-all hover:border-primary/30 hover:shadow-md"
    >
      <a href={`/printers/${printer.slug}`} className="absolute inset-0 z-0" aria-label={`View ${printer.name}`} />
      <ScoreBadge score={overall} rank={rank} />

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-semibold text-sm sm:text-base truncate group-hover:text-primary transition-colors">
              {printer.name}
            </h3>
            <p className="text-xs text-muted-foreground">
              {printer.brand} &middot; {printer.type.toUpperCase()}
            </p>
          </div>
          <div className="text-lg sm:text-xl font-bold text-foreground shrink-0">${printer.price}</div>
        </div>

        <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-1">
          {printer.summary}
        </p>

        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-4 sm:gap-5">
            <Stat label="Build" value={`${printer.buildVolume.x}mm`} />
            <Stat label="Speed" value={`${printer.printSpeed}mm/s`} />
            <div className="hidden sm:block">
              <Stat label="Resolution" value={`${printer.layerResolution.min}mm`} />
            </div>
          </div>
          <div className="relative z-10">
            <AmazonButton asin={printer.amazonAsin} printerName={printer.name} label="Buy" className="text-xs px-3 py-1.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
