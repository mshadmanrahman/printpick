"use client";

import { useState } from "react";
import { getPrintersByType, getOverallScore } from "@/data/printers";
import { AmazonButton } from "@/components/amazon-button";

interface Question {
  readonly id: string;
  readonly text: string;
  readonly options: readonly {
    readonly label: string;
    readonly fdmPoints: number;
    readonly resinPoints: number;
    readonly description: string;
  }[];
}

const QUESTIONS: readonly Question[] = [
  {
    id: "purpose",
    text: "What will you mainly print?",
    options: [
      { label: "Functional parts & prototypes", fdmPoints: 3, resinPoints: 0, description: "Brackets, enclosures, tools" },
      { label: "Tabletop miniatures & figures", fdmPoints: 0, resinPoints: 3, description: "D&D minis, Warhammer, collectibles" },
      { label: "Cosplay props & armor", fdmPoints: 3, resinPoints: 1, description: "Helmets, weapons, wearables" },
      { label: "A bit of everything", fdmPoints: 2, resinPoints: 1, description: "I want to experiment" },
    ],
  },
  {
    id: "detail",
    text: "How important is surface detail?",
    options: [
      { label: "Ultra-fine detail is essential", fdmPoints: 0, resinPoints: 3, description: "I'll notice every layer line" },
      { label: "Good quality, but I'll sand/paint anyway", fdmPoints: 2, resinPoints: 1, description: "Post-processing is fine" },
      { label: "Don't care much about surface finish", fdmPoints: 3, resinPoints: 0, description: "Function over form" },
    ],
  },
  {
    id: "size",
    text: "How big are your typical prints?",
    options: [
      { label: "Small (under 10cm / 4 inches)", fdmPoints: 1, resinPoints: 3, description: "Miniatures, jewelry, small parts" },
      { label: "Medium (10-25cm / 4-10 inches)", fdmPoints: 2, resinPoints: 1, description: "Phone cases, enclosures, figures" },
      { label: "Large (over 25cm / 10 inches)", fdmPoints: 3, resinPoints: 0, description: "Helmets, vases, large parts" },
    ],
  },
  {
    id: "mess",
    text: "How do you feel about post-processing?",
    options: [
      { label: "I want prints ready off the bed", fdmPoints: 3, resinPoints: 0, description: "Minimal cleanup preferred" },
      { label: "I don't mind washing and curing", fdmPoints: 0, resinPoints: 3, description: "I'm okay with the resin workflow" },
      { label: "Somewhere in between", fdmPoints: 2, resinPoints: 1, description: "Some work is fine" },
    ],
  },
  {
    id: "environment",
    text: "Where will the printer live?",
    options: [
      { label: "Living room or bedroom", fdmPoints: 3, resinPoints: 0, description: "Shared space, fumes are a concern" },
      { label: "Dedicated workshop or garage", fdmPoints: 1, resinPoints: 3, description: "Ventilation is available" },
      { label: "Office or spare room", fdmPoints: 2, resinPoints: 1, description: "Some ventilation possible" },
    ],
  },
];

export function FdmVsResinQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { fdm: number; resin: number }>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (fdmPoints: number, resinPoints: number) => {
    const q = QUESTIONS[currentQ];
    const newAnswers = { ...answers, [q.id]: { fdm: fdmPoints, resin: resinPoints } };
    setAnswers(newAnswers);

    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  const totalFdm = Object.values(answers).reduce((sum, a) => sum + a.fdm, 0);
  const totalResin = Object.values(answers).reduce((sum, a) => sum + a.resin, 0);
  const winner = totalFdm >= totalResin ? "fdm" : "resin";
  const confidence = Math.abs(totalFdm - totalResin);

  const reset = () => {
    setCurrentQ(0);
    setAnswers({});
    setShowResult(false);
  };

  if (showResult) {
    const recommended = [...getPrintersByType(winner === "fdm" ? "fdm" : "resin")]
      .sort((a, b) => getOverallScore(b) - getOverallScore(a))
      .slice(0, 3);

    return (
      <div className="mt-8">
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-6 text-center">
          <p className="text-sm text-muted-foreground">Your result</p>
          <h2 className="mt-2 text-3xl font-bold">
            {winner === "fdm" ? "FDM (Filament)" : "Resin (MSLA)"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {confidence >= 5
              ? "Strong match"
              : confidence >= 2
              ? "Good match, but you might enjoy both"
              : "Very close! Consider trying both over time"}
          </p>

          {/* Score bar */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-xs font-medium text-blue-400">FDM</span>
            <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden flex">
              <div
                className="h-full bg-blue-500 transition-all"
                style={{ width: `${(totalFdm / (totalFdm + totalResin)) * 100}%` }}
              />
              <div
                className="h-full bg-purple-500 transition-all"
                style={{ width: `${(totalResin / (totalFdm + totalResin)) * 100}%` }}
              />
            </div>
            <span className="text-xs font-medium text-purple-400">Resin</span>
          </div>

          <div className="mt-2 flex justify-between text-xs text-muted-foreground font-mono">
            <span>{totalFdm} pts</span>
            <span>{totalResin} pts</span>
          </div>
        </div>

        {winner === "fdm" ? (
          <div className="mt-6 rounded-lg border border-border bg-card p-5 text-sm space-y-2">
            <h3 className="font-bold">Why FDM?</h3>
            <p className="text-muted-foreground">
              FDM printers use plastic filament spools and are the most versatile type of 3D printer.
              They handle large prints, functional parts, and a wide range of materials. Prints come
              off the bed ready to use with minimal cleanup. Perfect for your needs.
            </p>
          </div>
        ) : (
          <div className="mt-6 rounded-lg border border-border bg-card p-5 text-sm space-y-2">
            <h3 className="font-bold">Why Resin?</h3>
            <p className="text-muted-foreground">
              Resin printers use liquid photopolymer cured by UV light. They produce incredibly
              fine detail that FDM can&apos;t match, perfect for miniatures, jewelry, and figures.
              The trade-off is messier post-processing (washing and curing) and smaller build volumes.
            </p>
          </div>
        )}

        <section className="mt-8">
          <h3 className="text-lg font-bold">Our Top {winner === "fdm" ? "FDM" : "Resin"} Picks for You</h3>
          <div className="mt-4 space-y-3">
            {recommended.map((p) => (
              <div key={p.slug} className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
                <div>
                  <a href={`/printers/${p.slug}`} className="font-semibold text-sm hover:underline">
                    {p.name}
                  </a>
                  <p className="text-xs text-muted-foreground mt-0.5">{p.summary}</p>
                </div>
                <div className="shrink-0 ml-4 text-right">
                  <div className="font-bold">${p.price}</div>
                  <AmazonButton asin={p.amazonAsin} printerName={p.name} price={p.price} label="Buy" className="mt-1 text-xs px-3 py-1" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <button
          type="button"
          onClick={reset}
          className="mt-6 text-sm text-muted-foreground hover:text-foreground underline"
        >
          Retake quiz
        </button>
      </div>
    );
  }

  const q = QUESTIONS[currentQ];

  return (
    <div className="mt-8">
      {/* Progress */}
      <div className="flex gap-1.5 mb-6">
        {QUESTIONS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < currentQ ? "bg-primary" : i === currentQ ? "bg-primary/60" : "bg-muted"
            }`}
          />
        ))}
      </div>

      <p className="text-xs text-muted-foreground mb-2">
        Question {currentQ + 1} of {QUESTIONS.length}
      </p>
      <h2 className="text-xl font-bold">{q.text}</h2>

      <div className="mt-6 space-y-3">
        {q.options.map((opt) => (
          <button
            key={opt.label}
            type="button"
            onClick={() => handleAnswer(opt.fdmPoints, opt.resinPoints)}
            className="w-full rounded-lg border border-border bg-card p-4 text-left transition-colors hover:border-primary/50 hover:bg-muted/50"
          >
            <span className="font-medium text-sm">{opt.label}</span>
            <span className="block mt-0.5 text-xs text-muted-foreground">{opt.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
