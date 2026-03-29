import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, getPrintersByBestFor, getOverallScore } from "@/data/printers";
import { PrinterCard } from "@/components/printer-card";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ tag: c.tag }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params;
  const category = CATEGORIES.find((c) => c.tag === tag);
  if (!category) return { title: "Category Not Found" };
  return {
    title: `${category.label} 2026 — Ranked & Scored`,
    description: `${category.description}. Every printer scored across 5 dimensions. Updated regularly.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const category = CATEGORIES.find((c) => c.tag === tag);
  if (!category) notFound();

  const categoryPrinters = [...getPrintersByBestFor(tag)].sort(
    (a, b) => getOverallScore(b) - getOverallScore(a),
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="text-xs text-muted-foreground mb-6">
        <a href="/" className="hover:text-foreground">Home</a>
        <span className="mx-1">/</span>
        <a href="/best" className="hover:text-foreground">Best Picks</a>
        <span className="mx-1">/</span>
        <span className="text-foreground">{category.label}</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight">{category.label} in 2026</h1>
      <p className="mt-2 text-muted-foreground">{category.description}</p>

      {categoryPrinters.length === 0 ? (
        <p className="mt-8 text-muted-foreground">No printers in this category yet. Check back soon.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {categoryPrinters.map((printer, i) => (
            <PrinterCard key={printer.slug} printer={printer} rank={i + 1} />
          ))}
        </div>
      )}

      <section className="mt-12">
        <h2 className="text-xl font-bold">Other Categories</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.filter((c) => c.tag !== tag).map((c) => (
            <a
              key={c.tag}
              href={`/best/${c.tag}`}
              className="rounded-lg border border-border/50 p-3 text-sm hover:border-border hover:bg-muted/50 transition-colors"
            >
              <span className="font-medium">{c.label}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
