import type { Metadata } from "next";
import type { BlogPosting, BreadcrumbList, WithContext } from "schema-dts";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft, ExternalLink } from "lucide-react";
import { getAllBlogPosts, getBlogPost, getPostPrinters, getRelatedPosts } from "@/data/blog-posts";
import { getOverallScore } from "@/data/printers";
import { PrinterCard } from "@/components/printer-card";
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
      images: [{ url: `https://printpick.dev/api/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.description)}`, width: 1200, height: 630, alt: post.title }],
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
  const relatedPosts = getRelatedPosts(post, 3);

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
                <span className="text-xs">— {item.headline}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Intro */}
      <div className="mt-8 text-base leading-relaxed text-foreground/90">
        {post.intro}
      </div>

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
                  {item.headline} — Score: {getOverallScore(item.printer!)}/10 — ${item.printer!.price}
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
            <a
              href={post.affiliateCta.url}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="inline-flex items-center gap-1.5 shrink-0 rounded-lg bg-emerald-500/15 border border-emerald-500/30 px-4 py-2.5 text-sm font-medium text-emerald-400 transition-all hover:bg-emerald-500/25 hover:border-emerald-500/50 active:scale-[0.97]"
            >
              Shop {post.affiliateCta.brand}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
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
