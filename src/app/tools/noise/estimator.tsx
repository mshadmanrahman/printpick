"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Volume2, Moon, Building, Wrench } from "lucide-react";
import { printers, getPrinterBySlug, getOverallScore } from "@/data/printers";
import { NOISE_LEVELS, getNoiseColor, getNoiseBg } from "@/data/tool-data";

const ENVIRONMENTS = [
  { id: "bedroom", label: "Bedroom", icon: Moon, maxDb: 45, description: "Needs to be very quiet — you'll sleep near it" },
  { id: "office", label: "Office / Living Room", icon: Building, maxDb: 52, description: "Moderate noise OK — background hum level" },
  { id: "workshop", label: "Workshop / Garage", icon: Wrench, maxDb: 100, description: "Noise doesn't matter — dedicated space" },
] as const;

const REFERENCE_LEVELS = [
  { db: 30, label: "Whisper" },
  { db: 40, label: "Library" },
  { db: 50, label: "Quiet office" },
  { db: 55, label: "Normal conversation" },
  { db: 60, label: "Loud conversation" },
];

type Environment = (typeof ENVIRONMENTS)[number]["id"];

export function NoiseEstimator() {
  const [env, setEnv] = useState<Environment | null>(null);

  const sorted = useMemo(() => {
    return [...printers]
      .map((p) => ({
        printer: p,
        noise: NOISE_LEVELS[p.slug] ?? { db: 50, label: "Moderate" },
      }))
      .sort((a, b) => a.noise.db - b.noise.db);
  }, []);

  const selectedEnv = ENVIRONMENTS.find((e) => e.id === env);

  return (
    <div className="mt-8">
      {/* Environment selector */}
      <div className="grid gap-3 sm:grid-cols-3">
        {ENVIRONMENTS.map((e) => {
          const Icon = e.icon;
          return (
            <button
              key={e.id}
              onClick={() => setEnv(e.id)}
              className={`rounded-xl border p-4 text-left transition-all ${
                env === e.id
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border/60 bg-card hover:border-primary/30"
              }`}
            >
              <Icon className={`h-5 w-5 mb-2 ${env === e.id ? "text-primary" : "text-muted-foreground"}`} />
              <h3 className="text-sm font-semibold">{e.label}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">{e.description}</p>
            </button>
          );
        })}
      </div>

      {/* Reference scale */}
      <div className="mt-6 rounded-xl border border-border/60 bg-card p-4">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Noise Reference</h3>
        <div className="flex items-center gap-1">
          {REFERENCE_LEVELS.map((ref) => (
            <div key={ref.db} className="flex-1 text-center">
              <div className={`h-2 rounded-full ${
                selectedEnv && ref.db <= selectedEnv.maxDb ? "bg-emerald-400" : "bg-zinc-200"
              }`} />
              <div className="mt-1 text-[10px] text-muted-foreground">{ref.db}dB</div>
              <div className="text-[9px] text-muted-foreground">{ref.label}</div>
            </div>
          ))}
        </div>
        {selectedEnv && (
          <p className="mt-2 text-xs text-muted-foreground text-center">
            Printers at or below <span className="font-bold text-emerald-600">{selectedEnv.maxDb}dB</span> are suitable for your {selectedEnv.label.toLowerCase()}.
          </p>
        )}
      </div>

      {/* Printer noise ranking */}
      <div className="mt-6">
        <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
          <Volume2 className="h-5 w-5 text-primary" />
          All Printers by Noise Level
        </h3>
        <div className="space-y-2">
          {sorted.map(({ printer, noise }) => {
            const suitable = selectedEnv ? noise.db <= selectedEnv.maxDb : true;
            return (
              <a
                key={printer.slug}
                href={`/printers/${printer.slug}`}
                className={`group flex items-center gap-3 rounded-xl border p-3 transition-all hover:shadow-sm ${
                  selectedEnv && !suitable
                    ? "border-border/40 bg-card opacity-50"
                    : "border-border/60 bg-card hover:border-primary/30"
                }`}
              >
                <div className="relative h-10 w-10 rounded-lg overflow-hidden shrink-0">
                  <Image src={printer.image} alt={printer.name} fill className="object-cover" sizes="40px" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium truncate group-hover:text-primary transition-colors">{printer.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">${printer.price}</span>
                </div>
                {/* Noise bar */}
                <div className="hidden sm:flex items-center gap-2 w-32">
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full rounded-full ${getNoiseBg(noise.db)}`} style={{ width: `${(noise.db / 65) * 100}%` }} />
                  </div>
                </div>
                <div className="text-right shrink-0 w-16">
                  <span className={`text-sm font-mono font-bold ${getNoiseColor(noise.db)}`}>{noise.db}dB</span>
                  <div className="text-[10px] text-muted-foreground">{noise.label}</div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
