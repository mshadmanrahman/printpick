import { type Printer, getOverallScore } from "@/data/printers";
import { AmazonButton } from "./amazon-button";

interface PrinterCardProps {
  readonly printer: Printer;
  readonly rank?: number;
}

function ScoreBar({ label, score }: { readonly label: string; readonly score: number }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-16 sm:w-20 text-muted-foreground shrink-0">{label}</span>
      <div className="flex-1 h-1.5 rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${score * 10}%` }}
        />
      </div>
      <span className="w-5 text-right font-mono text-muted-foreground">{score}</span>
    </div>
  );
}

export function PrinterCard({ printer, rank }: PrinterCardProps) {
  const overall = getOverallScore(printer);

  return (
    <div className="group rounded-xl border border-border/40 bg-card p-4 sm:p-5 transition-all hover:border-primary/20 hover:shadow-md hover:shadow-primary/5">
      {/* Top: Name + Price */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {rank !== undefined && (
              <span className="flex h-6 w-6 items-center justify-center rounded-full brand-gradient text-[10px] font-bold text-white shrink-0">
                {rank}
              </span>
            )}
            <h3 className="font-semibold text-sm sm:text-base truncate">
              <a href={`/printers/${printer.slug}`} className="hover:text-primary transition-colors">
                {printer.name}
              </a>
            </h3>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {printer.brand} &middot; {printer.type.toUpperCase()} &middot;{" "}
            <span className="font-mono">{printer.buildVolume.x}&times;{printer.buildVolume.y}&times;{printer.buildVolume.z}mm</span>
          </p>
        </div>
        <div className="text-right shrink-0">
          <div className="text-xl sm:text-2xl font-bold">${printer.price}</div>
          <div className="flex items-center justify-end gap-1 mt-0.5">
            <span className="rounded-md bg-primary/10 px-2 py-0.5 text-sm font-bold text-primary">
              {overall}
            </span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
        {printer.summary}
      </p>

      {/* Scores */}
      <div className="mt-3 space-y-1">
        <ScoreBar label="Value" score={printer.scores.value} />
        <ScoreBar label="Beginner" score={printer.scores.beginner} />
        <ScoreBar label="Quality" score={printer.scores.printQuality} />
        <ScoreBar label="Speed" score={printer.scores.speed} />
        <ScoreBar label="Reliable" score={printer.scores.reliability} />
      </div>

      {/* Features + CTA */}
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1">
          {printer.features.slice(0, 3).map((f) => (
            <span key={f} className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
              {f}
            </span>
          ))}
          {printer.features.length > 3 && (
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
              +{printer.features.length - 3}
            </span>
          )}
        </div>
        <AmazonButton asin={printer.amazonAsin} className="w-full sm:w-auto justify-center text-xs" />
      </div>
    </div>
  );
}
