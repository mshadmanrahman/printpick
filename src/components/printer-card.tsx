"use client";

import Image from "next/image";
import { type Printer, getOverallScore } from "@/data/printers";
import { AmazonButton } from "./amazon-button";

interface PrinterCardProps {
  readonly printer: Printer;
  readonly rank?: number;
}

function PrinterThumbnail({ printer, rank }: { readonly printer: Printer; readonly rank?: number }) {
  return (
    <div className="relative shrink-0 w-24 sm:w-28 rounded-xl overflow-hidden self-stretch">
      {rank !== undefined && rank <= 3 && (
        <span className="absolute top-1.5 left-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm z-10">
          #{rank}
        </span>
      )}
      {rank !== undefined && rank > 3 && (
        <span className="absolute top-1.5 left-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-[9px] font-bold text-white z-10">
          {rank}
        </span>
      )}
      <Image
        src={printer.image}
        alt={printer.name}
        fill
        className="object-cover transition-transform group-hover:scale-105"
        sizes="(max-width: 640px) 96px, 112px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      <span className="absolute bottom-1.5 left-1.5 rounded bg-black/50 px-1.5 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
        {printer.type}
      </span>
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
  const isTopPick = rank === 1;

  return (
    <div
      className={`group relative flex gap-3 sm:gap-4 rounded-xl border bg-card p-3 sm:p-4 transition-all hover:shadow-md ${
        isTopPick
          ? "border-primary/40 shadow-sm shadow-primary/5 hover:border-primary/60"
          : "border-border/60 hover:border-primary/30"
      }`}
    >
      <a href={`/printers/${printer.slug}`} className="absolute inset-0 z-0" aria-label={`View ${printer.name}`} />

      {/* Image thumbnail */}
      <PrinterThumbnail printer={printer} rank={rank} />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm sm:text-base truncate group-hover:text-primary transition-colors">
                {printer.name}
              </h3>
              {isTopPick && (
                <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                  #1 Pick
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {printer.brand}
            </p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-lg sm:text-xl font-bold text-foreground">${printer.price}</div>
            <div className="flex items-center gap-1 justify-end">
              <span className="text-xs font-medium text-primary">{overall}/10</span>
              <div className="flex gap-px">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-3 rounded-sm ${
                      i < Math.round(overall / 2) ? "bg-primary" : "bg-border"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
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
            <AmazonButton asin={printer.amazonAsin} printerName={printer.name} label="Check Price" className="text-xs px-3 py-1.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
