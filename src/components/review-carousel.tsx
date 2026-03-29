"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface ReviewItem {
  readonly quote: string;
  readonly source: string;
  readonly printer: string;
  readonly slug: string;
}

export function ReviewCarousel({ reviews }: { readonly reviews: readonly ReviewItem[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  function scroll(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 280 + 12; // card min-w + gap
    el.scrollBy({ left: direction === "left" ? -cardWidth * 2 : cardWidth * 2, behavior: "smooth" });
  }

  return (
    <div className="relative">
      {/* Scroll buttons */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background shadow-md hover:bg-muted transition-colors focus-visible:outline-2 focus-visible:outline-primary"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background shadow-md hover:bg-muted transition-colors focus-visible:outline-2 focus-visible:outline-primary"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      {/* Scrollable track */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {reviews.map((review) => (
          <a
            key={review.quote}
            href={`/printers/${review.slug}`}
            className="group snap-start shrink-0 w-[280px] rounded-xl border border-border/60 bg-card p-5 flex flex-col transition-all hover:border-primary/30 hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary"
          >
            <Quote className="h-5 w-5 text-primary/40 mb-2 shrink-0" />
            <p className="text-sm leading-relaxed flex-1">&ldquo;{review.quote}&rdquo;</p>
            <div className="mt-3 pt-3 border-t border-border/50">
              <p className="text-xs font-medium text-primary group-hover:underline">{review.printer}</p>
              <p className="text-xs text-muted-foreground">{review.source}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Fade edges */}
      {canScrollLeft && (
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent" />
      )}
      {canScrollRight && (
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent" />
      )}
    </div>
  );
}
