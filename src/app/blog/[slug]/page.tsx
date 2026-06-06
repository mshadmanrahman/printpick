import type { Metadata } from "next";
import type { BlogPosting, BreadcrumbList, WithContext } from "schema-dts";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft, ExternalLink } from "lucide-react";
import { getAllBlogPosts, getBlogPost, getPostPrinters, getRelatedPosts } from "@/data/blog-posts";
import { getOverallScore } from "@/data/printers";
import { PrinterCard } from "@/components/printer-card";
import { AmazonButton } from "@/components/amazon-button";
import { TrackedAffiliateLink } from "@/components/tracked-affiliate-link";
import { JsonLd } from "@/components/json-ld";

export function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `https://printpick.dev/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      url: `https://printpick.dev/blog/${slug}`,
      images: [{ url: post.heroImage ? `https://printpick.dev${post.heroImage}` : `https://printpick.dev/api/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.description)}`, width: 1200, height: 630, alt: post.title }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const items = getPostPrinters(post);
  const topPick = items[0]?.printer;
  const relatedPosts = getRelatedPosts(post, 3);
  const isEnclosedGuide = post.slug === "best-enclosed-3d-printer-2026";

  const articleSchema: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@type": "Organization", name: "PrintPick", url: "https://printpick.dev" },
    publisher: {
      "@type": "Organization",
      name: "PrintPick",
      url: "https://printpick.dev",
      logo: { "@type": "ImageObject", url: "https://printpick.dev/logo.svg" },
    },
    mainEntityOfPage: `https://printpick.dev/blog/${slug}`,
    image: "https://printpick.dev/og-default.png",
  };

  const breadcrumbSchema: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://printpick.dev/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://printpick.dev/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://printpick.dev/blog/${slug}` },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <a
          href="/blog"
          className="flex items-center gap-1 hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Blog
        </a>
      </nav>

      {/* Header */}
      <header>
        <div className="flex items-center gap-2 mb-3">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-primary">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
          {post.title}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground leading-relaxed">
          {post.description}
        </p>
      </header>

      {isEnclosedGuide && (
        <section className="mt-8 rounded-xl border border-primary/25 bg-primary/5 p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Quick answer</p>
          <h2 className="text-xl font-bold">Best enclosed 3D printer picks for 2026</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <a href="#pick-1" className="rounded-lg border border-border/60 bg-card p-3 hover:border-primary/40">
              <span className="block text-sm font-semibold">Best budget / apartment enclosed printer</span>
              <span className="text-sm text-muted-foreground">Flashforge Adventurer 5M Pro for safe, filtered ABS/ASA printing under $400.</span>
            </a>
            <a href="#pick-2" className="rounded-lg border border-border/60 bg-card p-3 hover:border-primary/40">
              <span className="block text-sm font-semibold">Best for Nylon and PC on a budget</span>
              <span className="text-sm text-muted-foreground">QIDI X-Plus 3 because its active 60C chamber beats passive enclosures.</span>
            </a>
            <a href="#pick-3" className="rounded-lg border border-border/60 bg-card p-3 hover:border-primary/40">
              <span className="block text-sm font-semibold">Best quiet premium enclosed printer</span>
              <span className="text-sm text-muted-foreground">Bambu Lab P1S for reliability, software, filtration, and home-office noise.</span>
            </a>
            <a href="#pick-5" className="rounded-lg border border-border/60 bg-card p-3 hover:border-primary/40">
              <span className="block text-sm font-semibold">Best engineering upgrade</span>
              <span className="text-sm text-muted-foreground">Bambu Lab H2D for abrasive filaments, dual hardened nozzles, and a 65C chamber.</span>
            </a>
          </div>
        </section>
      )}

      {/* Table of Contents */}
      <nav className="mt-8 rounded-xl border border-border/60 bg-muted/20 p-4">
        <h2 className="text-sm font-semibold mb-2">In this article</h2>
        <ol className="space-y-1">
          {items.map((item, i) => (
            <li key={item.printerSlug}>
              <a
                href={`#pick-${i + 1}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-0.5"
              >
                <span className="font-mono text-xs text-primary">
                  {i + 1}.
                </span>
                {item.printer!.name}{" "}
                <span className="text-xs">: {item.headline}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Intro */}
      <div className="mt-8 text-base leading-relaxed text-foreground/90">
        {post.intro}
      </div>

      {topPick && (
        <section className="mt-6 rounded-xl border border-primary/25 bg-primary/5 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
                Top pick in this guide
              </p>
              <h2 className="text-lg font-bold">{topPick.name}</h2>
              <p className="text-sm text-muted-foreground">
                ${topPick.price}, PrintPick score {getOverallScore(topPick)}/10. Check live Amazon price before it moves.
              </p>
            </div>
            <AmazonButton
              asin={topPick.amazonAsin}
              printerName={topPick.name}
              price={topPick.price}
              label={`Check ${topPick.name} price`}
              ctaPosition="blog_top_pick"
              className="w-full justify-center py-3 text-sm font-semibold sm:w-auto"
            />
          </div>
        </section>
      )}

      {/* Listicle Items */}
      <div className="mt-10 space-y-10">
        {items.map((item, i) => (
          <section key={item.printerSlug} id={`pick-${i + 1}`} className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white text-sm font-bold shrink-0">
                {i + 1}
              </span>
              <div>
                <h2 className="text-xl font-bold">
                  {item.printer!.name}
                </h2>
                <p className="text-sm text-primary font-medium">
                  {item.headline}, Score: {getOverallScore(item.printer!)}/10, ${item.printer!.price}
                </p>
              </div>
            </div>

            <p className="text-base leading-relaxed text-foreground/90 mb-4">
              {item.body}
            </p>

            <PrinterCard printer={item.printer!} rank={i + 1} />
          </section>
        ))}
      </div>

      {/* Conclusion */}
      <section className="mt-12 rounded-xl border border-primary/20 bg-primary/5 p-6">
        <h2 className="text-lg font-bold mb-2">The Bottom Line</h2>
        <p className="text-base leading-relaxed text-foreground/90">
          {post.conclusion}
        </p>
      </section>

      {/* Affiliate CTA */}
      {post.affiliateCta && (
        <section className="mt-8 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                Our Pick
              </p>
              <p className="text-base font-semibold text-foreground mb-1">
                {post.affiliateCta.text}
              </p>
              {post.affiliateCta.code && (
                <p className="text-sm text-muted-foreground">
                  Code: <code className="rounded bg-emerald-500/10 px-1.5 py-0.5 font-mono text-emerald-400">{post.affiliateCta.code}</code>
                  {post.affiliateCta.discount && (
                    <span className="ml-2 text-emerald-400 font-medium">({post.affiliateCta.discount})</span>
                  )}
                </p>
              )}
            </div>
            <TrackedAffiliateLink
              href={post.affiliateCta.url}
              partner="brand_direct"
              productName={post.affiliateCta.text}
              brand={post.affiliateCta.brand}
              ctaPosition="blog_bottom_affiliate"
              className="inline-flex items-center gap-1.5 shrink-0 rounded-lg bg-emerald-500/15 border border-emerald-500/30 px-4 py-2.5 text-sm font-medium text-emerald-400 transition-all hover:bg-emerald-500/25 hover:border-emerald-500/50 active:scale-[0.97]"
            >
              Shop {post.affiliateCta.brand}
              <ExternalLink className="h-3.5 w-3.5" />
            </TrackedAffiliateLink>
          </div>
        </section>
      )}

      {isEnclosedGuide && (
        <section className="mt-12 rounded-xl border border-border/60 bg-card p-6">
          <h2 className="text-lg font-bold">Compare enclosed alternatives</h2>
          <p className="mt-1 text-sm text-muted-foreground">If you already have two models in mind, these head-to-head pages answer the buyer-intent queries Google is surfacing now.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <a className="rounded-lg border border-border/60 p-3 text-sm font-medium hover:border-primary/40" href="/compare/bambu-lab-x2d-vs-qidi-q2">Bambu Lab X2D vs QIDI Q2</a>
            <a className="rounded-lg border border-border/60 p-3 text-sm font-medium hover:border-primary/40" href="/compare/bambu-lab-x2d-vs-elegoo-centauri-carbon">Bambu Lab X2D vs Elegoo Centauri Carbon</a>
            <a className="rounded-lg border border-border/60 p-3 text-sm font-medium hover:border-primary/40" href="/compare/anycubic-kobra-s1-combo-vs-elegoo-centauri-carbon-2-combo">Anycubic Kobra S1 Combo vs Elegoo Centauri Carbon 2 Combo</a>
            <a className="rounded-lg border border-border/60 p-3 text-sm font-medium hover:border-primary/40" href="/blog/bambu-lab-p2s-vs-p1s-comparison">Bambu Lab P2S vs P1S</a>
          </div>
        </section>
      )}

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="mt-12 pt-8 border-t border-border/50">
          <h2 className="text-lg font-bold mb-4">Related Articles</h2>
          <div className="grid gap-3">
            {relatedPosts.map((related) => (
              <a
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="group flex items-start gap-4 rounded-xl border border-border/60 bg-card p-4 transition-all hover:border-primary/30 hover:shadow-sm"
              >
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary/70">
                    {related.category}
                  </span>
                  <h3 className="mt-1 text-sm font-semibold group-hover:text-primary transition-colors line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    {related.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Back to blog */}
      <div className="mt-10 pt-8 border-t border-border/50">
        <a
          href="/blog"
          className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          More buying guides
        </a>
      </div>
    </article>
  );
}
