import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How I Score 3D Printers",
  description:
    "The 5-dimension scoring system PrintPick uses to rank 3D printers. Transparent, independent, and honest about what the scores are based on.",
  alternates: { canonical: "https://printpick.dev/methodology" },
  openGraph: {
    title: "How I Score 3D Printers",
    description:
      "The 5-dimension scoring system PrintPick uses to rank 3D printers. Transparent, independent, and honest about what the scores are based on.",
    url: "https://printpick.dev/methodology",
    type: "article",
  },
};

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-4">
        Methodology
      </p>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        How I score 3D printers.
      </h1>
      <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
        Every printer on PrintPick is scored the same way: five dimensions,
        equally weighted, on a 1 to 10 scale. Scores are derived from public
        benchmarks, owner reviews, and community signals. This page tells you
        exactly how that works and what it isn&apos;t.
      </p>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">
          The 5 dimensions
        </h2>
        <dl className="mt-6 space-y-6">
          <div>
            <dt className="font-semibold text-foreground">Value</dt>
            <dd className="mt-1 text-muted-foreground leading-relaxed">
              How much printer you get per dollar, relative to alternatives at
              the same price point. Includes bundled accessories, warranty
              coverage, and typical total cost of ownership over the first
              year.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-foreground">
              Beginner-friendliness
            </dt>
            <dd className="mt-1 text-muted-foreground leading-relaxed">
              How forgiving the printer is of common mistakes. Auto bed
              levelling, quality of out-of-box experience, depth of community
              troubleshooting resources, and firmware polish.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-foreground">Print quality</dt>
            <dd className="mt-1 text-muted-foreground leading-relaxed">
              Surface finish, dimensional accuracy, first layer consistency.
              Weighted toward independent benchmarks where available, not
              manufacturer sample prints.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-foreground">Speed</dt>
            <dd className="mt-1 text-muted-foreground leading-relaxed">
              Real-world print speed at a quality setting you&apos;d actually
              use. A 20mm cube at 20% infill does not represent how a printer
              behaves on a real model, so marketing peak speeds are discounted.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-foreground">Reliability</dt>
            <dd className="mt-1 text-muted-foreground leading-relaxed">
              Failure rate across long print jobs, mechanical durability,
              firmware stability. Heavily weighted toward owner reports after
              90+ days of ownership, not first-week impressions.
            </dd>
          </div>
        </dl>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">
          How the overall score is calculated
        </h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          The overall score is the unweighted average of all five dimensions,
          rounded to one decimal place. I don&apos;t hide the formula. If you
          care most about one dimension (say, print quality for miniatures),
          sort by that dimension instead of the overall score.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">
          What the scores are based on
        </h2>
        <ul className="mt-4 space-y-3 text-muted-foreground leading-relaxed list-disc pl-5">
          <li>
            Independent review outlets (All3DP, Tom&apos;s Hardware, and
            similar long-form technical reviews)
          </li>
          <li>
            Long-form YouTube reviewers who run real-world test prints
          </li>
          <li>
            Owner communities: r/3Dprinting, r/BambuLab, r/prusa3d, and other
            brand-specific subreddits
          </li>
          <li>
            Manufacturer spec sheets, cross-referenced against field reports
          </li>
          <li>
            Pricing history and availability across major retailers
          </li>
        </ul>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          I do not base scores on sponsored reviews, unboxings, or
          manufacturer marketing copy. When a brand sends a promotional email,
          it does not change how I score their products.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">
          What I haven&apos;t done
        </h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          I have not personally tested every printer on this list. Doing that
          would cost tens of thousands of euros and I&apos;d rather be honest
          about that than pretend otherwise. If I ever get hands-on time with
          a specific model, first-person notes will be labelled clearly on
          that printer&apos;s page so you know exactly which claims are
          experience-based and which are research-based.
        </p>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          If you want a review site where someone has personally unboxed
          every printer on the list, you&apos;ve got a lot of options. This
          isn&apos;t one of them. What this is: a curated shortlist, scored
          consistently, with the reasoning behind each score visible.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">
          Why no sponsors
        </h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          PrintPick earns money through affiliate links (Amazon Associates,
          Anycubic, Prusa, Polymaker, QIDI, Elegoo, 3DJake). Commission rates
          range from 3 to 5 percent. That range is too narrow to create a
          meaningful incentive to favour one brand over another, which is the
          point.
        </p>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          No brand has ever paid me to list, rank, or review their product.
          If that ever changes, this paragraph changes first.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">Who I am</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          I&apos;m Shadman Rahman. BSc in Computer Science, MSc in
          Human-Computer Interaction, and 15+ years of product management
          across consumer and B2B products. I built PrintPick because most 3D
          printer review sites read like the printer brands wrote them, and I
          wanted one that gave clear answers without pretending to have
          experience it doesn&apos;t have.
        </p>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Questions, corrections, or a specific printer you think I&apos;ve
          scored wrong: printpick@pm.me.
        </p>
      </section>
    </div>
  );
}
