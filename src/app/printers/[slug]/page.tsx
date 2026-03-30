import type { Metadata } from "next";
import type { Product, BreadcrumbList, FAQPage, WithContext } from "schema-dts";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Star, Quote, ShoppingCart, Award, MessageCircle } from "lucide-react";
import { printers, getPrinterBySlug, getOverallScore, getAmazonUrl, getPrintersByBestFor } from "@/data/printers";
import { getPostsForPrinter } from "@/data/blog-posts";
import { AmazonButton } from "@/components/amazon-button";
import { PrinterCard } from "@/components/printer-card";
import { CommunityBadge } from "@/components/community-badge";
import { JsonLd } from "@/components/json-ld";

export function generateStaticParams() {
  return printers.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const printer = getPrinterBySlug(slug);
  if (!printer) return { title: "Printer Not Found" };
  return {
    title: `${printer.name} Review — Score ${getOverallScore(printer)}/10`,
    description: `${printer.summary} Price: $${printer.price}. Scored ${getOverallScore(printer)}/10 across value, beginner-friendliness, print quality, speed, and reliability.`,
    alternates: {
      canonical: `https://printpick.dev/printers/${slug}`,
    },
    openGraph: {
      title: `${printer.name} Review — Score ${getOverallScore(printer)}/10`,
      description: `${printer.summary} Price: $${printer.price}.`,
      url: `https://printpick.dev/printers/${slug}`,
      images: [{ url: `https://printpick.dev/api/og?title=${encodeURIComponent(printer.name)}&subtitle=${encodeURIComponent(`$${printer.price} — Score ${getOverallScore(printer)}/10 — ${printer.brand}`)}`, width: 1200, height: 630, alt: printer.name }],
    },
  };
}

function ScoreRow({ label, score }: { readonly label: string; readonly score: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-24 text-sm text-muted-foreground">{label}</span>
      <div className="flex-1 h-2.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${score * 10}%` }}
        />
      </div>
      <span className="w-8 text-right font-mono text-sm font-bold">{score}</span>
    </div>
  );
}

function StarRating({ score }: { readonly score: number }) {
  const stars = Math.round(score / 2);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < stars ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}`}
        />
      ))}
      <span className="ml-1.5 text-sm font-bold">{score}/10</span>
    </div>
  );
}

function SpecCard({ label, value, unit }: { readonly label: string; readonly value: string; readonly unit?: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-4 text-center">
      <div className="text-2xl font-bold font-mono tracking-tight">
        {value}
        {unit && <span className="text-sm font-normal text-muted-foreground ml-0.5">{unit}</span>}
      </div>
      <div className="mt-1 text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
    </div>
  );
}

export default async function PrinterDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const printer = getPrinterBySlug(slug);
  if (!printer) notFound();

  const overall = getOverallScore(printer);
  const featuredInPosts = getPostsForPrinter(printer.slug);
  const related = printer.bestFor
    .flatMap((tag) => getPrintersByBestFor(tag))
    .filter((p) => p.slug !== printer.slug)
    .filter((p, i, arr) => arr.findIndex((a) => a.slug === p.slug) === i)
    .sort((a, b) => getOverallScore(b) - getOverallScore(a))
    .slice(0, 3);

  const productSchema: WithContext<Product> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: printer.name,
    description: printer.summary,
    image: `https://printpick.dev${printer.image}`,
    brand: { "@type": "Brand", name: printer.brand },
    offers: {
      "@type": "Offer",
      url: getAmazonUrl(printer.amazonAsin, printer.name),
      priceCurrency: "USD",
      price: printer.price,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: overall,
      bestRating: 10,
      worstRating: 0,
      ratingCount: Math.max(printer.reviews.length, 1),
    },
    review: printer.reviews.map((r) => ({
      "@type": "Review",
      reviewBody: r.quote,
      author: { "@type": "Person", name: r.source },
    })),
  };

  const faqSchema: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How much does the ${printer.name} cost?`,
        acceptedAnswer: { "@type": "Answer", text: `The ${printer.name} costs $${printer.price} on Amazon. It's a ${printer.type.toUpperCase()} printer from ${printer.brand}.` },
      },
      {
        "@type": "Question",
        name: `What is the build volume of the ${printer.name}?`,
        acceptedAnswer: { "@type": "Answer", text: `The ${printer.name} has a build volume of ${printer.buildVolume.x} x ${printer.buildVolume.y} x ${printer.buildVolume.z} mm.` },
      },
      {
        "@type": "Question",
        name: `Is the ${printer.name} good for beginners?`,
        acceptedAnswer: { "@type": "Answer", text: `The ${printer.name} scores ${printer.scores.beginner}/10 for beginner-friendliness. ${printer.scores.beginner >= 7 ? "It's a great choice for beginners." : printer.scores.beginner >= 5 ? "It's suitable for beginners with some patience." : "It's better suited for experienced users."}` },
      },
      {
        "@type": "Question",
        name: `What are the pros and cons of the ${printer.name}?`,
        acceptedAnswer: { "@type": "Answer", text: `Pros: ${printer.pros.join(". ")}. Cons: ${printer.cons.join(". ")}.` },
      },
    ],
  };

  const breadcrumbSchema: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://printpick.dev/" },
      { "@type": "ListItem", position: 2, name: "Printers", item: "https://printpick.dev/best" },
      { "@type": "ListItem", position: 3, name: printer.name, item: `https://printpick.dev/printers/${printer.slug}` },
    ],
  };

  return (
    <div>
      <JsonLd data={productSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      {/* ── Hero Section — Bambu Lab inspired ── */}
      <section className="bg-gradient-to-b from-zinc-100 to-background">
        <div className="mx-auto max-w-5xl px-4 pt-6 pb-10">
          {/* Breadcrumb */}
          <nav className="text-xs text-muted-foreground mb-6">
            <a href="/" className="hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary rounded">Home</a>
            <span className="mx-1.5">/</span>
            <a href="/best" className="hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary rounded">Printers</a>
            <span className="mx-1.5">/</span>
            <span className="text-foreground font-medium">{printer.name}</span>
          </nav>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            {/* Product Image — Big, clean, fills the space */}
            <div className="flex-1">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src={printer.image}
                  alt={printer.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 512px"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="flex-1 lg:max-w-md">
              {/* Badges */}
              {printer.communityBadges.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {printer.communityBadges.map((badge) => (
                    <CommunityBadge key={badge} badge={badge} />
                  ))}
                </div>
              )}

              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {printer.brand} &middot; {printer.type.toUpperCase()}
              </p>
              <h1 className="mt-1 text-3xl sm:text-4xl font-bold tracking-tight">{printer.name}</h1>

              <div className="mt-3 flex items-center gap-3">
                <StarRating score={overall} />
                {printer.reviews.length > 0 && (
                  <span className="text-xs text-muted-foreground">
                    {printer.reviews.length} review{printer.reviews.length !== 1 ? "s" : ""}
                  </span>
                )}
              </div>

              <p className="mt-4 text-base text-muted-foreground leading-relaxed">{printer.summary}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {printer.bestFor.map((tag) => (
                  <a
                    key={tag}
                    href={`/best/${tag}`}
                    className="rounded-full bg-primary/8 border border-primary/15 px-3 py-1 text-xs text-primary font-medium hover:bg-primary/15 transition-colors focus-visible:outline-2 focus-visible:outline-primary"
                  >
                    {tag}
                  </a>
                ))}
              </div>

              {/* Price + CTA */}
              <div className="mt-6 rounded-xl border border-border/60 bg-card p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold">${printer.price}</div>
                    <p className="text-xs text-muted-foreground mt-0.5">on Amazon</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">PrintPick Score</div>
                    <div className="text-2xl font-bold text-primary">{overall}<span className="text-sm font-normal text-muted-foreground">/10</span></div>
                  </div>
                </div>
                <div className="mt-4">
                  <AmazonButton
                    asin={printer.amazonAsin}
                    printerName={printer.name}
                    label={`Buy on Amazon — $${printer.price}`}
                    className="w-full justify-center py-3 text-base font-semibold"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Specs — Visual cards like Bambu Lab ── */}
      <section className="border-y border-border/50 bg-muted/20">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <SpecCard label="Build Volume" value={`${printer.buildVolume.x}³`} unit="mm" />
            <SpecCard label="Max Speed" value={`${printer.printSpeed}`} unit="mm/s" />
            <SpecCard label="Resolution" value={`${printer.layerResolution.min}`} unit="mm" />
            <SpecCard label="Weight" value={`${printer.weight}`} unit="kg" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4">
        {/* ── Scores ── */}
        <section className="py-10">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            PrintPick Scores
          </h2>
          <div className="mt-4 rounded-xl border border-border/60 bg-card p-5 space-y-3">
            <ScoreRow label="Value" score={printer.scores.value} />
            <ScoreRow label="Beginner" score={printer.scores.beginner} />
            <ScoreRow label="Print Quality" score={printer.scores.printQuality} />
            <ScoreRow label="Speed" score={printer.scores.speed} />
            <ScoreRow label="Reliability" score={printer.scores.reliability} />
          </div>
        </section>

        {/* ── Pros & Cons ── */}
        <section className="pb-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-emerald-600/20 bg-emerald-50 p-5">
            <h3 className="font-semibold text-emerald-700">Pros</h3>
            <ul className="mt-3 space-y-2">
              {printer.pros.map((pro) => (
                <li key={pro} className="flex gap-2 text-sm">
                  <span className="text-emerald-600 shrink-0 font-bold">+</span>
                  <span className="text-emerald-900">{pro}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-red-600/20 bg-red-50 p-5">
            <h3 className="font-semibold text-red-700">Cons</h3>
            <ul className="mt-3 space-y-2">
              {printer.cons.map((con) => (
                <li key={con} className="flex gap-2 text-sm">
                  <span className="text-red-600 shrink-0 font-bold">-</span>
                  <span className="text-red-900">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Community Reviews — "What the Pros Are Saying" ── */}
        {printer.reviews.length > 0 && (
          <section className="py-10 border-t border-border/50">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              What the Community Says
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {printer.reviews.map((review) => (
                <div key={review.quote} className="rounded-xl border border-border/60 bg-card p-5 flex flex-col">
                  <Quote className="h-5 w-5 text-primary/40 mb-2 shrink-0" />
                  <p className="text-sm leading-relaxed flex-1">&ldquo;{review.quote}&rdquo;</p>
                  <p className="mt-3 text-xs font-medium text-muted-foreground">
                    &mdash; {review.source}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Full Specs Table ── */}
        <section className="py-10 border-t border-border/50">
          <h2 className="text-xl font-bold">Full Specifications</h2>
          <div className="mt-4 rounded-xl border border-border/60 bg-card overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                <SpecRow label="Build Volume" value={`${printer.buildVolume.x} x ${printer.buildVolume.y} x ${printer.buildVolume.z} mm`} />
                <SpecRow label="Layer Resolution" value={`${printer.layerResolution.min}mm - ${printer.layerResolution.max}mm`} />
                <SpecRow label="Max Print Speed" value={`${printer.printSpeed} mm/s`} />
                <SpecRow label="Weight" value={`${printer.weight} kg`} />
                <SpecRow label="Type" value={printer.type === "fdm" ? "FDM (Filament)" : "Resin (MSLA)"} />
                <SpecRow label="Features" value={printer.features.join(", ")} />
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Verdict ── */}
        <section className="py-10 border-t border-border/50">
          <h2 className="text-xl font-bold">Our Verdict</h2>
          <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-6">
            <p className="text-base leading-relaxed">{printer.verdict}</p>
          </div>
          <div className="mt-4">
            <AmazonButton
              asin={printer.amazonAsin}
              printerName={printer.name}
              label={`Buy ${printer.name} on Amazon — $${printer.price}`}
              className="py-3 text-base"
            />
          </div>
        </section>

        {/* ── What You'll Also Need ── */}
        {printer.alsoNeed && printer.alsoNeed.length > 0 && (
          <section className="py-10 border-t border-border/50">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              What You&apos;ll Also Need
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">Essential accessories to get started with this printer.</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {printer.alsoNeed.map((item) => (
                <a
                  key={item}
                  href={`https://www.amazon.com/s?k=${encodeURIComponent(item + " 3D printer")}&tag=printpick20-20`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-border/60 bg-card px-4 py-3 transition-all hover:border-primary/30 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/8 text-primary shrink-0">
                    <ShoppingCart className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">{item}</span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* ── Featured In Blog Posts ── */}
        {featuredInPosts.length > 0 && (
          <section className="py-10 border-t border-border/50">
            <h2 className="text-xl font-bold">Featured In</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Read more about the {printer.name} in our buying guides.
            </p>
            <div className="mt-4 grid gap-2">
              {featuredInPosts.map((post) => (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-border/60 bg-card px-4 py-3 transition-all hover:border-primary/30 hover:shadow-sm"
                >
                  <div className="min-w-0">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary/70">
                      {post.category}
                    </span>
                    <h3 className="text-sm font-medium group-hover:text-primary transition-colors truncate">
                      {post.title}
                    </h3>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* ── Related Printers ── */}
        {related.length > 0 && (
          <section className="py-10 border-t border-border/50">
            <h2 className="text-xl font-bold">Similar Printers</h2>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              {related.map((p) => (
                <PrinterCard key={p.slug} printer={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function SpecRow({ label, value }: { readonly label: string; readonly value: string }) {
  return (
    <tr className="border-b border-border/50 last:border-0">
      <td className="px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">{label}</td>
      <td className="px-4 py-3 font-mono text-xs">{value}</td>
    </tr>
  );
}
