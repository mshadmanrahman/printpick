"use client";

import { type Printer, getOverallScore } from "@/data/printers";
import { AmazonButton } from "./amazon-button";

interface PrinterCardProps {
  readonly printer: Printer;
  readonly rank?: number;
}

const BRAND_COLORS: Record<string, { bg: string; text: string }> = {
  "Bambu Lab": { bg: "bg-[#2d8c3c]/10", text: "text-[#2d8c3c]" },
  "Creality": { bg: "bg-[#0066cc]/10", text: "text-[#0066cc]" },
  "Elegoo": { bg: "bg-[#ff6b00]/10", text: "text-[#ff6b00]" },
  "Anycubic": { bg: "bg-[#00a5e0]/10", text: "text-[#00a5e0]" },
  "Flashforge": { bg: "bg-[#e63946]/10", text: "text-[#e63946]" },
  "Prusa Research": { bg: "bg-[#fa6831]/10", text: "text-[#fa6831]" },
  "Sovol": { bg: "bg-[#1a73e8]/10", text: "text-[#1a73e8]" },
  "QIDI": { bg: "bg-[#6b21a8]/10", text: "text-[#6b21a8]" },
  "Phrozen": { bg: "bg-[#f59e0b]/10", text: "text-[#f59e0b]" },
  "Longer": { bg: "bg-[#059669]/10", text: "text-[#059669]" },
  "Voxelab": { bg: "bg-[#7c3aed]/10", text: "text-[#7c3aed]" },
  "Artillery": { bg: "bg-[#dc2626]/10", text: "text-[#dc2626]" },
  "Kingroon": { bg: "bg-[#0891b2]/10", text: "text-[#0891b2]" },
};

const DEFAULT_BRAND = { bg: "bg-muted", text: "text-muted-foreground" };

function BrandThumbnail({ printer, rank }: { readonly printer: Printer; readonly rank?: number }) {
  const colors = BRAND_COLORS[printer.brand] ?? DEFAULT_BRAND;
  const isFdm = printer.type === "fdm";

  return (
    <div className={`relative shrink-0 w-20 sm:w-24 rounded-xl ${colors.bg} flex flex-col items-center justify-center gap-1 self-stretch`}>
      {rank !== undefined && rank <= 3 && (
        <span className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm z-10">
          #{rank}
        </span>
      )}
      {rank !== undefined && rank > 3 && (
        <span className="absolute top-1.5 left-1.5 text-[10px] font-bold text-muted-foreground">
          #{rank}
        </span>
      )}
      {/* Printer type icon */}
      <svg className={`h-8 w-8 sm:h-10 sm:w-10 ${colors.text} opacity-60`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        {isFdm ? (
          <>
            <rect x="4" y="2" width="16" height="6" rx="1" />
            <path d="M6 8v10a2 2 0 002 2h8a2 2 0 002-2V8" />
            <path d="M12 8v6" />
            <path d="M9 14h6" />
          </>
        ) : (
          <>
            <rect x="3" y="10" width="18" height="10" rx="2" />
            <path d="M7 10V6a2 2 0 012-2h6a2 2 0 012 2v4" />
            <circle cx="12" cy="15" r="2" />
          </>
        )}
      </svg>
      <span className={`text-[9px] font-bold uppercase tracking-wider ${colors.text} opacity-70`}>
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

      {/* Brand thumbnail */}
      <BrandThumbnail printer={printer} rank={rank} />

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
