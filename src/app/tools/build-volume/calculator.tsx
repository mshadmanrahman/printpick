"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Check, X } from "lucide-react";
import { printers, getOverallScore } from "@/data/printers";

export function BuildVolumeCalculator() {
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [z, setZ] = useState("");

  const dims = {
    x: parseFloat(x) || 0,
    y: parseFloat(y) || 0,
    z: parseFloat(z) || 0,
  };

  const hasInput = dims.x > 0 && dims.y > 0 && dims.z > 0;

  const results = useMemo(() => {
    if (!hasInput) return [];
    return [...printers]
      .map((p) => {
        const fits = dims.x <= p.buildVolume.x && dims.y <= p.buildVolume.y && dims.z <= p.buildVolume.z;
        const headroom = fits
          ? Math.min(
              ((p.buildVolume.x - dims.x) / p.buildVolume.x) * 100,
              ((p.buildVolume.y - dims.y) / p.buildVolume.y) * 100,
              ((p.buildVolume.z - dims.z) / p.buildVolume.z) * 100,
            )
          : 0;
        return { printer: p, fits, headroom };
      })
      .sort((a, b) => {
        if (a.fits && !b.fits) return -1;
        if (!a.fits && b.fits) return 1;
        if (a.fits && b.fits) return getOverallScore(b.printer) - getOverallScore(a.printer);
        return 0;
      });
  }, [dims.x, dims.y, dims.z, hasInput]);

  const fitsCount = results.filter((r) => r.fits).length;

  return (
    <div className="mt-8">
      {/* Input */}
      <div className="rounded-xl border border-border/60 bg-card p-5">
        <h2 className="text-sm font-semibold mb-3">Model Dimensions (mm)</h2>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Width (X)</label>
            <input
              type="number"
              value={x}
              onChange={(e) => setX(e.target.value)}
              placeholder="e.g. 150"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono focus-visible:outline-2 focus-visible:outline-primary"
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Depth (Y)</label>
            <input
              type="number"
              value={y}
              onChange={(e) => setY(e.target.value)}
              placeholder="e.g. 150"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono focus-visible:outline-2 focus-visible:outline-primary"
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Height (Z)</label>
            <input
              type="number"
              value={z}
              onChange={(e) => setZ(e.target.value)}
              placeholder="e.g. 200"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono focus-visible:outline-2 focus-visible:outline-primary"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      {hasInput && (
        <div className="mt-6">
          <p className="text-sm text-muted-foreground mb-4">
            <span className="font-bold text-foreground">{fitsCount}</span> of {printers.length} printers can print your {dims.x} x {dims.y} x {dims.z}mm model.
          </p>
          <div className="space-y-2">
            {results.map(({ printer, fits, headroom }) => (
              <a
                key={printer.slug}
                href={`/printers/${printer.slug}`}
                className={`group flex items-center gap-3 rounded-xl border p-3 transition-all hover:shadow-sm ${
                  fits
                    ? "border-emerald-200 bg-emerald-50/50 hover:border-emerald-300"
                    : "border-border/40 bg-card opacity-60"
                }`}
              >
                <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0">
                  <Image src={printer.image} alt={printer.name} fill className="object-cover" sizes="48px" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {fits ? (
                      <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    ) : (
                      <X className="h-4 w-4 text-red-400 shrink-0" />
                    )}
                    <span className="text-sm font-medium truncate group-hover:text-primary transition-colors">{printer.name}</span>
                    <span className="text-xs text-muted-foreground">${printer.price}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Build: {printer.buildVolume.x} x {printer.buildVolume.y} x {printer.buildVolume.z}mm
                    {fits && headroom > 0 && (
                      <span className="text-emerald-600 ml-2">({Math.round(headroom)}% headroom)</span>
                    )}
                  </div>
                </div>
                <span className="text-xs font-medium text-primary shrink-0">{getOverallScore(printer)}/10</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {!hasInput && (
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Enter all three dimensions above to see which printers fit your model.
        </p>
      )}
    </div>
  );
}
