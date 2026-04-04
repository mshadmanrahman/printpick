import Image from "next/image";
import { CheckCircle, ArrowUp, Star } from "lucide-react";
import { type Printer, getOverallScore } from "@/data/printers";
import { AmazonButton } from "./amazon-button";
import type { TierConfig } from "@/data/tier-picks";

interface AnchorPricingProps {
  readonly budgetPick: Printer;
  readonly bestValue: Printer;
  readonly stepUp: Printer;
  readonly config: Pick<TierConfig, "budgetLabel">;
}

function ScoreBar({ score, label }: { readonly score: number; readonly label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground w-16 shrink-0">{label}</span>
      <div className="flex-1 h-1 rounded-full bg-border overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${score * 10}%` }}
        />
      </div>
      <span className="text-[10px] font-mono font-semibold text-muted-foreground w-5 text-right">{score}</span>
    </div>
  );
}

function PrinterCardAnchor({
  printer,
  variant,
  label,
  deltaPrice,
}: {
  readonly printer: Printer;
  readonly variant: "budget" | "best" | "step-up";
  readonly label: string;
  readonly deltaPrice?: number;
}) {
  const overall = getOverallScore(printer);
  const isBest = variant === "best";

  return (
    <div
      className={`flex flex-col rounded-2xl border overflow-hidden transition-all ${
        isBest
          ? "border-[color:var(--winner)] bg-card shadow-lg shadow-black/30 sm:-translate-y-3 z-10"
          : variant === "step-up"
          ? "border-[color:var(--step-up)]/40 bg-card/80 hover:border-[color:var(--step-up)]/70"
          : "border-border/60 bg-card/60 hover:border-border"
      }`}
    >
      {/* Label strip — inline, no absolute positioning */}
      <div
        className={`flex items-center justify-center gap-1.5 py-2 text-[10px] font-bold uppercase tracking-widest border-b ${
          isBest
            ? "bg-[color:var(--winner)]/15 border-[color:var(--winner)]/30 text-[color:var(--winner)]"
            : variant === "step-up"
            ? "bg-[color:var(--step-up)]/10 border-[color:var(--step-up)]/20 text-[color:var(--step-up)]"
            : "bg-secondary/50 border-border/40 text-muted-foreground"
        }`}
      >
        {isBest && <span>★</span>}
        {isBest ? "Best Value" : label}
      </div>

      {/* Printer image */}
      <div className="relative w-full aspect-square rounded-t-2xl overflow-hidden bg-card">
        <Image
          src={printer.image}
          alt={printer.name}
          fill
          className="object-contain p-6 transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 320px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
        <div className="absolute bottom-2 left-2">
          <span className="rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
            {printer.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={`flex flex-col gap-3 p-4 sm:p-5 flex-1 ${isBest ? "bg-[color:var(--winner)]/3" : ""}`}>
        <div>
          <p className="text-xs text-muted-foreground">{printer.brand}</p>
          <h3
            className={`font-bold leading-tight mt-0.5 ${isBest ? "text-base sm:text-lg" : "text-sm sm:text-base"}`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {printer.name}
          </h3>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className={`font-extrabold tabular-nums ${isBest ? "text-2xl" : "text-xl"}`} style={{ fontFamily: "var(--font-mono)" }}>
            ${printer.price}
          </span>
          {deltaPrice !== undefined && deltaPrice > 0 && (
            <span className="text-xs text-muted-foreground">
              +${deltaPrice} vs Best Value
            </span>
          )}
        </div>

        {/* Score bars */}
        <div className="space-y-1.5">
          <ScoreBar score={printer.scores.value} label="Value" />
          <ScoreBar score={printer.scores.beginner} label="Ease" />
          <ScoreBar score={printer.scores.printQuality} label="Quality" />
        </div>

        {/* Tagline */}
        {isBest && (
          <p className="text-[11px] text-muted-foreground leading-relaxed border-l-2 border-[color:var(--winner)] pl-3">
            The one most people should get. Seriously.
          </p>
        )}

        {variant === "step-up" && deltaPrice !== undefined && deltaPrice > 0 && (
          <div className="flex items-start gap-1.5 rounded-lg bg-[color:var(--step-up)]/8 p-2.5">
            <ArrowUp className="h-3.5 w-3.5 text-[color:var(--step-up)] shrink-0 mt-0.5" />
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              For ${deltaPrice} more: fully enclosed chamber, multi-material AMS, higher top speed.
            </p>
          </div>
        )}

        {/* Overall score */}
        <div className="flex items-center gap-1.5 mt-auto pt-1">
          <Star className={`h-3.5 w-3.5 ${isBest ? "fill-[color:var(--winner)] text-[color:var(--winner)]" : "fill-amber-400 text-amber-400"}`} />
          <span className="text-xs font-semibold">{overall}/10 overall</span>
        </div>

        {/* CTA */}
        <div className="relative z-10">
          <AmazonButton
            asin={printer.amazonAsin}
            printerName={printer.name}
            label={isBest ? "Check Best Price" : "Check Price"}
            className={`w-full justify-center text-sm py-2.5 ${isBest ? "" : "opacity-80 hover:opacity-100"}`}
          />
        </div>
      </div>
    </div>
  );
}

export function AnchorPricing({ budgetPick, bestValue, stepUp, config }: AnchorPricingProps) {
  const stepUpDelta = Math.max(0, stepUp.price - bestValue.price);

  return (
    <section>
      <div className="mb-6">
        <h2
          className="text-xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Our Pick
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Three options. One recommendation. The math is simple.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-3 pt-4">
        <PrinterCardAnchor
          printer={budgetPick}
          variant="budget"
          label={config.budgetLabel}
        />
        <PrinterCardAnchor
          printer={bestValue}
          variant="best"
          label="Best Value"
        />
        <PrinterCardAnchor
          printer={stepUp}
          variant="step-up"
          label="Step Up"
          deltaPrice={stepUpDelta}
        />
      </div>

      {/* Decision helper */}
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-border/50 bg-card/40 px-4 py-3.5">
        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground leading-relaxed">
          <span className="font-semibold text-foreground">Not sure which to get?</span>{" "}
          Most people should just buy the Best Value. The budget pick is fine but you&apos;ll probably want more in 6 months.
          The step-up is worth it if this is your primary creative tool.
        </p>
      </div>
    </section>
  );
}
