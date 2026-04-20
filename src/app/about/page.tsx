import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About PrintPick",
  description:
    "PrintPick is a research-led 3D printer shortlist built by one product manager with no brand deals. Here's who, why, and what this site actually is.",
  alternates: { canonical: "https://printpick.dev/about" },
  openGraph: {
    title: "About PrintPick",
    description:
      "PrintPick is a research-led 3D printer shortlist built by one product manager with no brand deals.",
    url: "https://printpick.dev/about",
    type: "article",
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-4">
        About
      </p>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        One PM, one curated shortlist, zero brand deals.
      </h1>
      <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
        PrintPick is not a hands-on review site. It is a research-led
        curation of the 3D printer market, built by one product manager who
        got tired of reading review sites that felt like the printer brands
        wrote them.
      </p>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">
          Who built this
        </h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          I&apos;m Shadman Rahman. BSc in Computer Science, MSc in
          Human-Computer Interaction, and 15+ years in product management
          across consumer and B2B products. I currently work as a Product
          Manager at Keystone Education Group. I live in Uppsala, Sweden.
        </p>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          I&apos;m not a 3D printing enthusiast. I don&apos;t run a
          makerspace. I don&apos;t own every printer on this list, and for
          most of them I don&apos;t own one at all. That&apos;s the point:
          I&apos;m applying the research discipline I use at work to an
          opaque, sponsor-saturated product category. The result is a site
          that reads like a PM&apos;s buying report, not a printer
          brand&apos;s marketing page.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">
          Why this site exists
        </h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          The 3D printer review landscape is dominated by three things:
          sponsored YouTube unboxings, SEO farms that reshuffle manufacturer
          copy, and affiliate-pressured hedging that refuses to commit to a
          recommendation. If you&apos;re buying your first printer or your
          fifth, you deserve someone who has actually read the field,
          weighed the tradeoffs, and will tell you what to buy.
        </p>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          PrintPick is that. One person reading every review so you
          don&apos;t have to. A curated shortlist per category, scored
          consistently, with the reasoning visible.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">
          What this site is not
        </h2>
        <ul className="mt-4 space-y-3 text-muted-foreground leading-relaxed list-disc pl-5">
          <li>
            Not a hands-on test lab. How scoring actually works is on the{" "}
            <a
              href="/methodology"
              className="text-primary underline decoration-dotted underline-offset-4 hover:text-primary/80 transition-colors"
            >
              methodology page
            </a>
            .
          </li>
          <li>
            Not sponsored. No brand has ever paid to appear, rank, or be
            recommended here. Affiliate commissions (3 to 5 percent) are
            disclosed but don&apos;t influence scores.
          </li>
          <li>
            Not neutral. Every shortlist makes a call. The whole point is to
            answer &ldquo;what should I buy&rdquo; with a single clear
            answer, not ten paragraphs of hedging.
          </li>
          <li>
            Not finished. Scores get updated as new printers launch and
            long-term owner reports accumulate. If something feels wrong,
            tell me.
          </li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">
          How to reach me
        </h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Corrections, scoring disputes, printer suggestions, or business
          inquiries: printpick@pm.me.
        </p>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          If you own one of the printers on this list and think a score is
          off, I especially want to hear from you. Long-term owner reports
          are the single most useful input into the scores, and they&apos;re
          what differentiates this site from spec-sheet aggregators.
        </p>
      </section>
    </div>
  );
}
