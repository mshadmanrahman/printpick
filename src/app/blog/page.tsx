import type { Metadata } from "next";
import { ChevronRight, Calendar } from "lucide-react";
import { getAllBlogPosts } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "3D Printer Buying Guides, PrintPick",
  description:
    "Buying guides, ranked lists, and honest comparisons. No sponsored placements. Updated regularly.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Buying Guides</h1>
      <p className="mt-2 text-muted-foreground">
        Ranked lists and honest comparisons. No affiliate-first fluff.
      </p>

      <div className="mt-8 grid gap-4">
        {posts.map((post) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border border-border/60 bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <h2 className="font-semibold text-base sm:text-lg group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {post.description}
              </p>
              <div className="mt-2 text-xs text-muted-foreground">
                {post.items.length} printers reviewed
              </div>
            </div>
            <ChevronRight className="hidden sm:block h-5 w-5 text-muted-foreground shrink-0 group-hover:text-primary transition-colors" />
          </a>
        ))}
      </div>
    </div>
  );
}
