"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Search, X } from "lucide-react";
import { printers, getOverallScore, CATEGORIES } from "@/data/printers";

interface SearchResult {
  readonly type: "printer" | "category" | "tool";
  readonly label: string;
  readonly sublabel: string;
  readonly href: string;
}

const TOOLS: readonly SearchResult[] = [
  { type: "tool", label: "Printer Finder", sublabel: "Quiz — find your match", href: "/tools/finder" },
  { type: "tool", label: "Cost Estimator", sublabel: "Calculate cost per print", href: "/tools/cost-estimator" },
  { type: "tool", label: "FDM vs Resin", sublabel: "Which tech is right?", href: "/tools/fdm-vs-resin" },
  { type: "tool", label: "Compare", sublabel: "Head-to-head specs", href: "/compare" },
];

function getAllResults(): readonly SearchResult[] {
  const printerResults: SearchResult[] = printers.map((p) => ({
    type: "printer",
    label: p.name,
    sublabel: `${p.brand} · $${p.price} · ${getOverallScore(p)}/10`,
    href: `/printers/${p.slug}`,
  }));
  const categoryResults: SearchResult[] = CATEGORIES.map((c) => ({
    type: "category",
    label: c.label,
    sublabel: c.description,
    href: `/best/${c.tag}`,
  }));
  return [...printerResults, ...categoryResults, ...TOOLS];
}

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const allResults = useMemo(() => getAllResults(), []);

  const filtered = useMemo(() => {
    if (!query.trim()) return allResults.slice(0, 8);
    const q = query.toLowerCase();
    return allResults.filter(
      (r) => r.label.toLowerCase().includes(q) || r.sublabel.toLowerCase().includes(q)
    ).slice(0, 10);
  }, [query, allResults]);

  useEffect(() => {
    setSelectedIdx(0);
  }, [query]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [open]);

  function navigate(href: string) {
    setOpen(false);
    window.location.href = href;
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && filtered[selectedIdx]) {
      navigate(filtered[selectedIdx].href);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-border/60 bg-card px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors focus-visible:outline-2 focus-visible:outline-primary"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
          ⌘K
        </kbd>
      </button>

      {/* Modal overlay */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-lg mx-4 rounded-xl border border-border bg-background shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search printers, categories, tools..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Results */}
            <div className="max-h-[40vh] overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <p className="px-4 py-6 text-center text-sm text-muted-foreground">No results found.</p>
              ) : (
                filtered.map((result, i) => (
                  <button
                    key={result.href}
                    onClick={() => navigate(result.href)}
                    onMouseEnter={() => setSelectedIdx(i)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                      i === selectedIdx ? "bg-primary/8 text-foreground" : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <span className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      result.type === "printer" ? "bg-primary/10 text-primary" :
                      result.type === "category" ? "bg-amber-100 text-amber-700" :
                      "bg-zinc-100 text-zinc-600"
                    }`}>
                      {result.type === "printer" ? "Printer" : result.type === "category" ? "Category" : "Tool"}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium truncate">{result.label}</div>
                      <div className="text-xs text-muted-foreground truncate">{result.sublabel}</div>
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* Footer hint */}
            <div className="border-t border-border px-4 py-2 flex items-center gap-3 text-[10px] text-muted-foreground">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>esc Close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
