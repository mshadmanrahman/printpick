"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, TrendingUp } from "lucide-react";
import { printers, getPrinterBySlug, getOverallScore } from "@/data/printers";
import { UPGRADE_PATHS } from "@/data/tool-data";
import { AmazonButton } from "@/components/amazon-button";

export function UpgradeAdvisor() {
  const [currentSlug, setCurrentSlug] = useState("");
  const current = getPrinterBySlug(currentSlug);
  const upgrades = currentSlug ? (UPGRADE_PATHS[currentSlug] ?? []) : [];

  return (
    <div className="mt-8">
      {/* Selector */}
      <div className="rounded-xl border border-border/60 bg-card p-5">
        <label className="block text-sm font-semibold mb-2">What printer do you currently own?</label>
        <select
          value={currentSlug}
          onChange={(e) => setCurrentSlug(e.target.value)}
          className="w-full sm:w-96 rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-primary"
        >
          <option value="">Select your printer...</option>
          {printers.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}, ${p.price}
            </option>
          ))}
        </select>
      </div>

      {/* Current printer card */}
      {current && (
        <div className="mt-6 rounded-xl border border-border/60 bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 rounded-xl overflow-hidden shrink-0">
              <Image src={current.image} alt={current.name} fill className="object-cover" sizes="80px" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Your current printer</p>
              <h3 className="text-lg font-bold">{current.name}</h3>
              <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                <span>${current.price}</span>
                <span>·</span>
                <span className="text-primary font-medium">{getOverallScore(current)}/10</span>
                <span>·</span>
                <span>{current.buildVolume.x}mm build</span>
                <span>·</span>
                <span>{current.printSpeed}mm/s</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade paths */}
      {current && upgrades.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            Recommended Upgrades
          </h3>
          <div className="space-y-3">
            {upgrades.map((upgrade) => {
              const target = getPrinterBySlug(upgrade.slug);
              if (!target) return null;
              const scoreDiff = getOverallScore(target) - getOverallScore(current);
              return (
                <div key={upgrade.slug} className="rounded-xl border border-border/60 bg-card p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* From → To */}
                    <div className="flex items-center gap-3 flex-1">
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden shrink-0">
                        <Image src={current.image} alt={current.name} fill className="object-cover" sizes="64px" />
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0" />
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden shrink-0">
                        <Image src={target.image} alt={target.name} fill className="object-cover" sizes="64px" />
                      </div>
                      <div className="min-w-0">
                        <a href={`/printers/${target.slug}`} className="text-sm font-bold hover:text-primary transition-colors">
                          {target.name}
                        </a>
                        <p className="text-xs text-muted-foreground mt-0.5">{upgrade.reason}</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-center">
                        <div className="text-lg font-bold">${target.price}</div>
                        <div className="text-[10px] text-muted-foreground">
                          +${target.price - current.price}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">{getOverallScore(target)}</div>
                        <div className={`text-[10px] font-medium ${scoreDiff > 0 ? "text-emerald-600" : scoreDiff < 0 ? "text-red-500" : "text-muted-foreground"}`}>
                          {scoreDiff > 0 ? `+${scoreDiff.toFixed(1)}` : scoreDiff.toFixed(1)} score
                        </div>
                      </div>
                      <AmazonButton asin={target.amazonAsin} printerName={target.name} price={target.price} label="Check Price" className="text-xs px-3 py-1.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {current && upgrades.length === 0 && (
        <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
          <p className="text-sm font-medium">You&apos;re at the top!</p>
          <p className="text-sm text-muted-foreground mt-1">
            The {current.name} is already one of the most capable printers available. No upgrade needed.
          </p>
        </div>
      )}
    </div>
  );
}
