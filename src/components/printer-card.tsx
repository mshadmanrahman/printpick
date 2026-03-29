import { type Printer, getOverallScore } from "@/data/printers";
import { AmazonButton } from "./amazon-button";

interface PrinterCardProps {
  readonly printer: Printer;
  readonly rank?: number;
}

function ScoreBar({ label, score }: { readonly label: string; readonly score: number }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-20 text-muted-foreground">{label}</span>
      <div className="flex-1 h-1.5 rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${score * 10}%` }}
        />
      </div>
      <span className="w-6 text-right font-mono text-muted-foreground">{score}</span>
    </div>
  );
}

export function PrinterCard({ printer, rank }: PrinterCardProps) {
  const overall = getOverallScore(printer);

  return (
    <div className="group rounded-lg border border-border/50 bg-card p-5 transition-colors hover:border-border">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {rank !== undefined && (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {rank}
              </span>
            )}
            <h3 className="font-semibold text-base truncate">
              <a href={`/printers/${printer.slug}`} className="hover:underline">
                {printer.name}
              </a>
            </h3>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{printer.brand} &middot; {printer.type.toUpperCase()}</p>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{printer.summary}</p>
        </div>
        <div className="text-right shrink-0">
          <div className="text-2xl font-bold">${printer.price}</div>
          <div className="mt-1 flex items-center justify-end gap-1">
            <span className="text-xs text-muted-foreground">Score</span>
            <span className="rounded bg-primary/10 px-1.5 py-0.5 text-sm font-bold text-primary">
              {overall}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-1.5">
        <ScoreBar label="Value" score={printer.scores.value} />
        <ScoreBar label="Beginner" score={printer.scores.beginner} />
        <ScoreBar label="Quality" score={printer.scores.printQuality} />
        <ScoreBar label="Speed" score={printer.scores.speed} />
        <ScoreBar label="Reliable" score={printer.scores.reliability} />
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {printer.features.slice(0, 4).map((f) => (
          <span key={f} className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
            {f}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-xs text-muted-foreground font-mono">
          {printer.buildVolume.x} &times; {printer.buildVolume.y} &times; {printer.buildVolume.z}mm
        </div>
        <AmazonButton asin={printer.amazonAsin} />
      </div>
    </div>
  );
}
