import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft } from "lucide-react";
import { getAllBlogPosts, getBlogPost, getPostPrinters } from "@/data/blog-posts";
import { getOverallScore } from "@/data/printers";
import { PrinterCard } from "@/components/printer-card";

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
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
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

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
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
