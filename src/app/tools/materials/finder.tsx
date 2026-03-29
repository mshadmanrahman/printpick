"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Check, AlertTriangle, Shield } from "lucide-react";
import { printers, getOverallScore } from "@/data/printers";
import { MATERIALS, MATERIAL_COMPATIBILITY, type Material } from "@/data/tool-data";

export function MaterialFinder() {
  const [selected, setSelected] = useState<Material | null>(null);

  const materialInfo = MATERIALS.find((m) => m.name === selected);

  const compatiblePrinters = useMemo(() => {
    if (!selected) return [];
    return printers
      .filter((p) => MATERIAL_COMPATIBILITY[p.slug]?.includes(selected))
      .sort((a, b) => getOverallScore(b) - getOverallScore(a));
  }, [selected]);

  return (
    <div className="mt-8">
      {/* Material grid */}
      <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {MATERIALS.map((m) => (
          <button
            key={m.name}
            onClick={() => setSelected(m.name)}
            className={`rounded-xl border p-3 text-left transition-all ${
              selected === m.name
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border/60 bg-card hover:border-primary/30"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">{m.name}</span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                m.type === "fdm" ? "bg-primary/10 text-primary" : "bg-amber-100 text-amber-700"
              }`}>
                {m.type.toUpperCase()}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{m.bestFor}</p>
          </button>
        ))}
      </div>

      {/* Material details */}
      {materialInfo && (
        <div className="mt-6 rounded-xl border border-border/60 bg-card p-5">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h2 className="text-xl font-bold">{materialInfo.name}</h2>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
              materialInfo.difficulty === "Easy" ? "bg-emerald-50 text-emerald-600 border border-emerald-200" :
              materialInfo.difficulty === "Moderate" ? "bg-amber-50 text-amber-600 border border-amber-200" :
              "bg-red-50 text-red-600 border border-red-200"
            }`}>
              {materialInfo.difficulty}
            </span>
            {materialInfo.needsEnclosure && (
              <span className="flex items-center gap-1 rounded-full bg-zinc-100 border border-zinc-200 px-2.5 py-0.5 text-xs font-medium text-zinc-600">
                <Shield className="h-3 w-3" /> Enclosure needed
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{materialInfo.description}</p>
          <p className="mt-2 text-sm"><span className="font-medium">Best for:</span> {materialInfo.bestFor}</p>

          {materialInfo.needsEnclosure && (
            <div className="mt-3 flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 p-3">
              <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800">
                This material requires an enclosed printer with ventilation. Open-frame printers will have warping and adhesion issues.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Compatible printers */}
      {selected && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-3">
            {compatiblePrinters.length} printer{compatiblePrinters.length !== 1 ? "s" : ""} compatible with {selected}
          </h3>
          <div className="space-y-2">
            {compatiblePrinters.map((printer) => (
              <a
                key={printer.slug}
                href={`/printers/${printer.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-border/60 bg-card p-3 transition-all hover:border-primary/30 hover:shadow-sm"
              >
                <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0">
                  <Image src={printer.image} alt={printer.name} fill className="object-cover" sizes="48px" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span className="text-sm font-medium truncate group-hover:text-primary transition-colors">{printer.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{printer.brand} · ${printer.price}</p>
                </div>
                <span className="text-xs font-medium text-primary shrink-0">{getOverallScore(printer)}/10</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
