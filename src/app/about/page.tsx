import type { Metadata } from "next";
import type { Person, WithContext } from "schema-dts";
import Image from "next/image";
import { Mail, BookOpen } from "lucide-react";
import { JsonLd } from "@/components/json-ld";

function GitHubIcon({ className }: { readonly className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedInIcon({ className }: { readonly className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
    </svg>
  );
}

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

const personSchema: WithContext<Person> = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Shadman Rahman",
  url: "https://printpick.dev/about",
  image: "https://printpick.dev/images/author/shadman-rahman.png",
  jobTitle: "Product Manager",
  worksFor: {
    "@type": "Organization",
    name: "Keystone Education Group",
  },
  sameAs: [
    "https://shadmanrahman.substack.com",
    "https://www.linkedin.com/in/shadmanrahman/",
    "https://github.com/mshadmanrahman",
  ],
};

interface SocialLink {
  readonly href: string;
  readonly label: string;
  readonly icon: React.ComponentType<{ readonly className?: string }>;
  readonly external: boolean;
}

const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    href: "https://shadmanrahman.substack.com/",
    label: "Substack",
    icon: BookOpen,
    external: true,
  },
  {
    href: "https://www.linkedin.com/in/shadmanrahman/",
    label: "LinkedIn",
    icon: LinkedInIcon,
    external: true,
  },
  {
    href: "https://github.com/mshadmanrahman",
    label: "GitHub",
    icon: GitHubIcon,
    external: true,
  },
  {
    href: "mailto:printpick@pm.me",
    label: "Email",
    icon: Mail,
    external: false,
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <JsonLd data={personSchema} />

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
        <div className="mt-6 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
          <Image
            src="/images/author/shadman-rahman.png"
            alt="Shadman Rahman, author of PrintPick"
            width={320}
            height={320}
            priority
            className="rounded-full border border-border shrink-0 w-32 h-32 sm:w-40 sm:h-40 object-cover"
          />
          <div className="flex-1 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I&apos;m Shadman Rahman. BSc in Computer Science, MSc in
              Human-Computer Interaction, and 15+ years in product
              management across consumer and B2B products. I currently work
              as a Product Manager at Keystone Education Group. I live in
              Uppsala, Sweden.
            </p>
            <p>
              I&apos;m not a 3D printing enthusiast. I don&apos;t run a
              makerspace. I don&apos;t own every printer on this list, and
              for most of them I don&apos;t own one at all. That&apos;s the
              point: I&apos;m applying the research discipline I use at
              work to an opaque, sponsor-saturated product category. The
              result is a site that reads like a PM&apos;s buying report,
              not a printer brand&apos;s marketing page.
            </p>
          </div>
        </div>
      </section>

      <section id="find-me" className="mt-12 scroll-mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">Find me</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Verified profiles so you can check my work elsewhere:
        </p>
        <ul className="mt-5 flex flex-wrap gap-3">
          {SOCIAL_LINKS.map(({ href, label, icon: Icon, external }) => (
            <li key={href}>
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/50 px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-secondary hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ease-smooth"
              >
                <Icon className="h-4 w-4" />
                {label}
              </a>
            </li>
          ))}
        </ul>
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
          inquiries: printpick@pm.me. Or use any of the links in the{" "}
          <a
            href="#find-me"
            className="text-primary underline decoration-dotted underline-offset-4 hover:text-primary/80 transition-colors"
          >
            Find me
          </a>{" "}
          section above.
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
