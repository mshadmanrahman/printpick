"use client";

import { useState } from "react";
import { printers, type Printer, getOverallScore } from "@/data/printers";
import { AmazonButton } from "@/components/amazon-button";

interface Answer {
  readonly budget: "under200" | "200to400" | "400to800" | "over800" | null;
  readonly experience: "first" | "some" | "experienced" | null;
  readonly type: "fdm" | "resin" | "unsure" | null;
  readonly priority: "quality" | "speed" | "value" | "reliability" | null;
  readonly size: "small" | "medium" | "large" | null;
  readonly useCase: "general" | "miniatures" | "engineering" | "cosplay" | "multicolor" | null;
}

const INITIAL: Answer = {
  budget: null,
  experience: null,
  type: null,
  priority: null,
  size: null,
  useCase: null,
};

function scorePrinter(printer: Printer, answers: Answer): number {
  let score = getOverallScore(printer) * 10;

  // Budget match
  if (answers.budget === "under200" && printer.price <= 200) score += 20;
  else if (answers.budget === "200to400" && printer.price > 200 && printer.price <= 400) score += 20;
  else if (answers.budget === "400to800" && printer.price > 400 && printer.price <= 800) score += 20;
  else if (answers.budget === "over800" && printer.price > 800) score += 20;
  else score -= 30;

  // Type match
  if (answers.type === "fdm" && printer.type === "fdm") score += 15;
  else if (answers.type === "resin" && printer.type === "resin") score += 15;
  else if (answers.type === "unsure") score += 5;
  else score -= 20;

  // Experience
  if (answers.experience === "first" && printer.scores.beginner >= 8) score += 15;
  if (answers.experience === "experienced" && printer.scores.beginner < 7) score += 5;

  // Priority
  if (answers.priority === "quality") score += printer.scores.printQuality * 3;
  if (answers.priority === "speed") score += printer.scores.speed * 3;
  if (answers.priority === "value") score += printer.scores.value * 3;
  if (answers.priority === "reliability") score += printer.scores.reliability * 3;

  // Size
  const vol = printer.buildVolume.x;
  if (answers.size === "small" && vol <= 200) score += 10;
  if (answers.size === "medium" && vol > 200 && vol <= 280) score += 10;
  if (answers.size === "large" && vol > 280) score += 15;

  // Use case
  if (answers.useCase === "miniatures" && printer.bestFor.includes("miniatures")) score += 20;
  if (answers.useCase === "engineering" && printer.bestFor.includes("engineering")) score += 20;
  if (answers.useCase === "cosplay" && printer.bestFor.includes("large-prints")) score += 20;
  if (answers.useCase === "multicolor" && printer.bestFor.includes("multi-color")) score += 20;
  if (answers.useCase === "general" && printer.bestFor.includes("beginners")) score += 10;

  return score;
}

type Step = keyof Answer;
const STEPS: readonly Step[] = ["budget", "experience", "type", "priority", "size", "useCase"];

const STEP_CONFIG: Record<Step, { question: string; options: readonly { value: string; label: string; desc: string }[] }> = {
  budget: {
    question: "What's your budget?",
    options: [
      { value: "under200", label: "Under $200", desc: "Entry-level, great to learn on" },
      { value: "200to400", label: "$200 – $400", desc: "Best value sweet spot" },
      { value: "400to800", label: "$400 – $800", desc: "Serious hobby / prosumer" },
      { value: "over800", label: "$800+", desc: "Professional / no compromises" },
    ],
  },
  experience: {
    question: "What's your 3D printing experience?",
    options: [
      { value: "first", label: "Complete beginner", desc: "Never printed before" },
      { value: "some", label: "Some experience", desc: "I've printed a few things" },
      { value: "experienced", label: "Experienced", desc: "I know what I'm doing" },
    ],
  },
  type: {
    question: "FDM or Resin?",
    options: [
      { value: "fdm", label: "FDM (Filament)", desc: "Versatile, larger prints, less messy" },
      { value: "resin", label: "Resin (MSLA)", desc: "Ultra-fine detail, smaller prints" },
      { value: "unsure", label: "Not sure yet", desc: "Help me decide" },
    ],
  },
  priority: {
    question: "What matters most to you?",
    options: [
      { value: "quality", label: "Print quality", desc: "Finest detail and layer resolution" },
      { value: "speed", label: "Print speed", desc: "Fast turnaround times" },
      { value: "value", label: "Value for money", desc: "Best bang for buck" },
      { value: "reliability", label: "Reliability", desc: "Just works, every time" },
    ],
  },
  size: {
    question: "How big will your prints typically be?",
    options: [
      { value: "small", label: "Small (under 15cm)", desc: "Miniatures, small parts" },
      { value: "medium", label: "Medium (15-25cm)", desc: "Most common hobby prints" },
      { value: "large", label: "Large (25cm+)", desc: "Helmets, props, big parts" },
    ],
  },
  useCase: {
    question: "What will you mainly print?",
    options: [
      { value: "general", label: "A bit of everything", desc: "General hobbyist" },
      { value: "miniatures", label: "Miniatures & figures", desc: "Tabletop gaming, collectibles" },
      { value: "engineering", label: "Functional parts", desc: "Engineering materials, enclosures" },
      { value: "cosplay", label: "Cosplay & props", desc: "Helmets, armor, large props" },
      { value: "multicolor", label: "Multi-color prints", desc: "Multi-material and colorful" },
    ],
  },
};

export function PrinterFinder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer>(INITIAL);
  const [done, setDone] = useState(false);

  const handleSelect = (value: string) => {
    const step = STEPS[currentStep];
    const newAnswers = { ...answers, [step]: value } as Answer;
    setAnswers(newAnswers);

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setDone(true);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers(INITIAL);
    setDone(false);
  };

  if (done) {
    const scored = printers
      .map((p) => ({ printer: p, score: scorePrinter(p, answers) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    const top = scored[0];

    return (
      <div className="mt-8">
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-6 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Your #1 Match</p>
          <h2 className="mt-2 text-2xl font-bold">
            <a href={`/printers/${top.printer.slug}`} className="hover:underline">
              {top.printer.name}
            </a>
          </h2>
          <p className="mt-1 text-3xl font-bold">${top.printer.price}</p>
          <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
            {top.printer.verdict}
          </p>
          <div className="mt-4">
            <AmazonButton asin={top.printer.amazonAsin} printerName={top.printer.name} price={top.printer.price} />
          </div>
        </div>

        {scored.length > 1 && (
          <section className="mt-8">
            <h3 className="text-lg font-bold">Also Great For You</h3>
            <div className="mt-4 space-y-3">
              {scored.slice(1).map(({ printer: p }, i) => (
                <div key={p.slug} className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-bold">
                      {i + 2}
                    </span>
                    <div>
                      <a href={`/printers/${p.slug}`} className="font-semibold text-sm hover:underline">
                        {p.name}
                      </a>
                      <p className="text-xs text-muted-foreground">{p.brand} &middot; ${p.price}</p>
                    </div>
                  </div>
                  <AmazonButton asin={p.amazonAsin} printerName={p.name} price={p.price} label="Buy" className="text-xs px-3 py-1" />
                </div>
              ))}
            </div>
          </section>
        )}

        <button type="button" onClick={reset} className="mt-6 text-sm text-muted-foreground hover:text-foreground underline">
          Start over
        </button>
      </div>
    );
  }

  const step = STEPS[currentStep];
  const config = STEP_CONFIG[step];

  return (
    <div className="mt-8">
      {/* Progress */}
      <div className="flex gap-1.5 mb-6">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < currentStep ? "bg-primary" : i === currentStep ? "bg-primary/60" : "bg-muted"
            }`}
          />
        ))}
      </div>

      <p className="text-xs text-muted-foreground mb-2">
        Step {currentStep + 1} of {STEPS.length}
      </p>
      <h2 className="text-xl font-bold">{config.question}</h2>

      <div className="mt-6 space-y-3">
        {config.options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => handleSelect(opt.value)}
            className="w-full rounded-lg border border-border bg-card p-4 text-left transition-colors hover:border-primary/50 hover:bg-muted/50"
          >
            <span className="font-medium text-sm">{opt.label}</span>
            <span className="block mt-0.5 text-xs text-muted-foreground">{opt.desc}</span>
          </button>
        ))}
      </div>

      {currentStep > 0 && (
        <button
          type="button"
          onClick={() => setCurrentStep(currentStep - 1)}
          className="mt-4 text-sm text-muted-foreground hover:text-foreground underline"
        >
          Back
        </button>
      )}
    </div>
  );
}
