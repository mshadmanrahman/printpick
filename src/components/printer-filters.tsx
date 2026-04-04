"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, X, LayoutGrid, List } from "lucide-react";
import { type Printer, getOverallScore, getAllBrands } from "@/data/printers";
import { PrinterCard, PrinterGridCard } from "./printer-card";

const PRICE_RANGES = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under $200", min: 0, max: 200 },
  { label: "$200–$400", min: 200, max: 400 },
  { label: "$400–$800", min: 400, max: 800 },
  { label: "$800+", min: 800, max: Infinity },
] as const;

const SORT_OPTIONS = [
  { label: "Score", value: "score" },
  { label: "Price: Low", value: "price-asc" },
  { label: "Price: High", value: "price-desc" },
  { label: "Speed", value: "speed" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

interface PrinterFiltersProps {
  readonly printers: readonly Printer[];
}

export function PrinterFilters({ printers }: PrinterFiltersProps) {
  const [type, setType] = useState<"all" | "fdm" | "resin">("all");
  const [priceIdx, setPriceIdx] = useState(0);
  const [brand, setBrand] = useState("all");
  const [sort, setSort] = useState<SortValue>("score");
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  const brands = useMemo(() => getAllBrands(), []);
  const priceRange = PRICE_RANGES[priceIdx];

  const filtered = useMemo(() => {
    let result = [...printers];

    if (type !== "all") result = result.filter((p) => p.type === type);
    if (brand !== "all") result = result.filter((p) => p.brand === brand);
    result = result.filter((p) => p.price >= priceRange.min && p.price <= priceRange.max);

    switch (sort) {
      case "score":
        result.sort((a, b) => getOverallScore(b) - getOverallScore(a));
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "speed":
        result.sort((a, b) => b.printSpeed - a.printSpeed);
        break;
    }
    return result;
  }, [printers, type, brand, priceRange, sort]);

  const hasFilters = type !== "all" || priceIdx !== 0 || brand !== "all";

  function clearFilters() {
    setType("all");
    setPriceIdx(0);
    setBrand("all");
  }

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <SlidersHorizontal className="h-4 w-4 text-muted-foreground shrink-0" />

        {/* Type toggle */}
        <div className="flex rounded-lg border border-border/60 overflow-hidden">
          {(["all", "fdm", "resin"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                type === t
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {t === "all" ? "All" : t.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Price */}
        <select
          value={priceIdx}
          onChange={(e) => setPriceIdx(Number(e.target.value))}
          className="rounded-lg border border-border/60 bg-card px-3 py-1.5 text-xs font-medium text-foreground focus-visible:outline-2 focus-visible:outline-primary"
        >
          {PRICE_RANGES.map((range, i) => (
            <option key={range.label} value={i}>{range.label}</option>
          ))}
        </select>

        {/* Brand */}
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="rounded-lg border border-border/60 bg-card px-3 py-1.5 text-xs font-medium text-foreground focus-visible:outline-2 focus-visible:outline-primary"
        >
          <option value="all">All Brands</option>
          {brands.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortValue)}
          className="rounded-lg border border-border/60 bg-card px-3 py-1.5 text-xs font-medium text-foreground focus-visible:outline-2 focus-visible:outline-primary"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>Sort: {opt.label}</option>
          ))}
        </select>

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="h-3 w-3" /> Clear
          </button>
        )}

        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {filtered.length} printer{filtered.length !== 1 ? "s" : ""}
          </span>
          {/* Layout toggle */}
          <div className="flex rounded-lg border border-border/60 overflow-hidden">
            <button
              onClick={() => setLayout("grid")}
              className={`p-1.5 transition-colors ${layout === "grid" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground hover:bg-muted"}`}
              aria-label="Grid view"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setLayout("list")}
              className={`p-1.5 transition-colors ${layout === "list" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground hover:bg-muted"}`}
              aria-label="List view"
            >
              <List className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-border/60 bg-card p-8 text-center">
          <p className="text-sm text-muted-foreground">No printers match your filters.</p>
          <button onClick={clearFilters} className="mt-2 text-sm text-primary hover:underline">Clear filters</button>
        </div>
      ) : layout === "grid" ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((printer, i) => (
            <PrinterGridCard key={printer.slug} printer={printer} rank={sort === "score" ? i + 1 : undefined} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((printer, i) => (
            <PrinterCard key={printer.slug} printer={printer} rank={sort === "score" ? i + 1 : undefined} />
          ))}
        </div>
      )}
    </div>
  );
}
