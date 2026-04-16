import { printers, type Printer, getOverallScore } from "@/data/printers";

/* ── Pre-computed pairs (calculated once at module load) ── */

const ALL_PAIRS: readonly string[] = (() => {
  const pairs: string[] = [];
  for (let i = 0; i < printers.length; i++) {
    for (let j = i + 1; j < printers.length; j++) {
      const [a, b] = [printers[i].slug, printers[j].slug].sort();
      pairs.push(`${a}-vs-${b}`);
    }
  }
  return pairs;
})();

/** All unique comparison slugs (alphabetically sorted). */
export function generateComparisonPairs(): readonly string[] {
  return ALL_PAIRS;
}

/** Parse a comparison slug into two printer slugs. */
export function parseComparisonSlug(
  slug: string,
): { readonly a: string; readonly b: string } | null {
  let pos = 0;
  while (pos < slug.length) {
    const idx = slug.indexOf("-vs-", pos);
    if (idx === -1) break;
    const a = slug.substring(0, idx);
    const b = slug.substring(idx + 4);
    if (
      printers.some((p) => p.slug === a) &&
      printers.some((p) => p.slug === b)
    ) {
      return { a, b };
    }
    pos = idx + 1;
  }
  return null;
}

/** Canonical slug, both halves sorted alphabetically. */
export function getCanonicalSlug(slugA: string, slugB: string): string {
  const [a, b] = [slugA, slugB].sort();
  return `${a}-vs-${b}`;
}

/* ── Score comparison ─────────────────────────────── */

type ScoreKey =
  | "value"
  | "beginner"
  | "printQuality"
  | "speed"
  | "reliability";

const SCORE_LABELS: Record<ScoreKey, string> = {
  value: "Value",
  beginner: "Beginner Friendliness",
  printQuality: "Print Quality",
  speed: "Speed",
  reliability: "Reliability",
};

const SCORE_KEYS: readonly ScoreKey[] = [
  "value",
  "beginner",
  "printQuality",
  "speed",
  "reliability",
];

export interface CategoryResult {
  readonly key: ScoreKey;
  readonly label: string;
  readonly scoreA: number;
  readonly scoreB: number;
  readonly winner: "a" | "b" | "tie";
}

export function compareScores(
  a: Printer,
  b: Printer,
): readonly CategoryResult[] {
  return SCORE_KEYS.map((key) => ({
    key,
    label: SCORE_LABELS[key],
    scoreA: a.scores[key],
    scoreB: b.scores[key],
    winner:
      a.scores[key] > b.scores[key]
        ? ("a" as const)
        : b.scores[key] > a.scores[key]
          ? ("b" as const)
          : ("tie" as const),
  }));
}

/* ── Content generators ───────────────────────────── */

export function generateIntro(a: Printer, b: Printer): string {
  const priceDiff = Math.abs(a.price - b.price);
  const sameType = a.type === b.type;
  const sameBrand = a.brand === b.brand;

  if (sameBrand) {
    return `Choosing between two ${a.brand} printers? The ${a.name} ($${a.price}) and ${b.name} ($${b.price}) both come from one of the most trusted names in 3D printing${priceDiff > 0 ? `, with a $${priceDiff} gap between them` : ""}. Here's how they compare across every category that matters.`;
  }
  if (sameType) {
    return `The ${a.name} and ${b.name} are both ${a.type.toUpperCase()} 3D printers competing in ${priceDiff < 100 ? "the same price bracket" : "different tiers"}, $${a.price} vs $${b.price}. We scored both across value, beginner-friendliness, quality, speed, and reliability. Here's the full breakdown.`;
  }
  return `Comparing FDM to resin? The ${a.name} ($${a.price}, ${a.type.toUpperCase()}) and ${b.name} ($${b.price}, ${b.type.toUpperCase()}) use fundamentally different technologies. FDM melts filament layer by layer; resin cures liquid with UV light. Here's how they stack up.`;
}

export function generateVerdict(a: Printer, b: Printer): string {
  const scoreA = getOverallScore(a);
  const scoreB = getOverallScore(b);
  const results = compareScores(a, b);
  const aWins = results.filter((r) => r.winner === "a").map((r) => r.label);
  const bWins = results.filter((r) => r.winner === "b").map((r) => r.label);

  if (scoreA === scoreB) {
    return `It's a dead heat, both score ${scoreA}/10 overall. The ${a.name} wins in ${aWins.join(", ") || "no specific category"}, while the ${b.name} takes ${bWins.join(", ") || "none either"}. Pick based on which strengths matter more to you.`;
  }

  const winner = scoreA > scoreB ? a : b;
  const loser = scoreA > scoreB ? b : a;
  const ws = Math.max(scoreA, scoreB);
  const ls = Math.min(scoreA, scoreB);
  const strengths = scoreA > scoreB ? aWins : bWins;
  const loserStrengths = scoreA > scoreB ? bWins : aWins;

  let extra = "";
  if (loser.price < winner.price) {
    extra = ` That said, the ${loser.name} saves you $${winner.price - loser.price}${loserStrengths.length > 0 ? ` and wins on ${loserStrengths.join(", ")}` : ""}.`;
  } else if (loserStrengths.length > 0) {
    extra = ` The ${loser.name} still puts up a fight in ${loserStrengths.join(" and ")}.`;
  }

  return `The ${winner.name} takes the crown with ${ws}/10 vs ${ls}/10. It pulls ahead in ${strengths.join(", ") || "overall balance"}.${extra}`;
}

export function generateFaqs(
  a: Printer,
  b: Printer,
): readonly { readonly question: string; readonly answer: string }[] {
  const scoreA = getOverallScore(a);
  const scoreB = getOverallScore(b);
  const winner = scoreA >= scoreB ? a : b;
  const winnerScore = Math.max(scoreA, scoreB);
  const cheaper = a.price <= b.price ? a : b;
  const pricier = a.price > b.price ? a : b;
  const diff = pricier.price - cheaper.price;

  return [
    {
      question: `Is the ${a.name} better than the ${b.name}?`,
      answer:
        scoreA === scoreB
          ? `They tie at ${scoreA}/10. The ${a.name} suits ${a.bestFor.slice(0, 2).join(" and ") || "general printing"}, while the ${b.name} is aimed at ${b.bestFor.slice(0, 2).join(" and ") || "different needs"}.`
          : `By the numbers, the ${winner.name} scores higher (${winnerScore}/10). But "better" depends on your use case, the ${winner === a ? b.name : a.name} may be the smarter buy if you need ${(winner === a ? b : a).bestFor[0] || "its specific strengths"}.`,
    },
    {
      question: `Which is better for beginners, ${a.name} or ${b.name}?`,
      answer:
        a.scores.beginner === b.scores.beginner
          ? `Both score ${a.scores.beginner}/10 for beginners. Go with the ${cheaper.name} to save $${diff > 0 ? diff : 0}.`
          : `The ${a.scores.beginner > b.scores.beginner ? a.name : b.name} is more beginner-friendly (${Math.max(a.scores.beginner, b.scores.beginner)}/10 vs ${Math.min(a.scores.beginner, b.scores.beginner)}/10) with easier setup and a gentler learning curve.`,
    },
    {
      question:
        diff > 0
          ? `Is the ${pricier.name} worth $${diff} more than the ${cheaper.name}?`
          : `Which is the better value, ${a.name} or ${b.name}?`,
      answer:
        diff === 0
          ? `Same price ($${a.price}), so it comes down to features. The ${a.scores.value >= b.scores.value ? a.name : b.name} edges ahead on value score.`
          : getOverallScore(pricier) > getOverallScore(cheaper)
            ? `The ${pricier.name} scores higher overall (${getOverallScore(pricier)}/10 vs ${getOverallScore(cheaper)}/10). The extra $${diff} gets you ${pricier.pros[0]?.toLowerCase() || "better performance"}.`
            : `The ${cheaper.name} actually scores higher (${getOverallScore(cheaper)}/10) despite costing $${diff} less. The ${pricier.name} only makes sense if you specifically need ${pricier.bestFor[0] || "its niche features"}.`,
    },
    {
      question: `What's the main difference between ${a.name} and ${b.name}?`,
      answer:
        a.type !== b.type
          ? `Technology: the ${a.name} is ${a.type.toUpperCase()} (filament) and the ${b.name} is ${b.type.toUpperCase()} (resin). FDM prints bigger functional parts; resin delivers finer surface detail.`
          : `Build volume (${a.buildVolume.x}x${a.buildVolume.y}x${a.buildVolume.z}mm vs ${b.buildVolume.x}x${b.buildVolume.y}x${b.buildVolume.z}mm) and print speed (${a.printSpeed} vs ${b.printSpeed} mm/s). The ${a.name} is best for ${a.bestFor[0] || "general use"}; the ${b.name} targets ${b.bestFor[0] || "different needs"}.`,
    },
  ];
}

/* ── Related comparisons ──────────────────────────── */

export function getRelatedComparisons(
  printerSlug: string,
  currentSlug: string,
  limit: number = 3,
): readonly string[] {
  return ALL_PAIRS.filter(
    (slug) => slug !== currentSlug && slug.includes(printerSlug),
  ).slice(0, limit);
}
