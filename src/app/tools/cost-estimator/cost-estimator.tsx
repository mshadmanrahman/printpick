"use client";

import { useState } from "react";

interface CostInputs {
  readonly filamentWeightG: number;
  readonly filamentPricePerKg: number;
  readonly printTimeHours: number;
  readonly printerWattage: number;
  readonly electricityCostPerKwh: number;
  readonly printerCost: number;
  readonly printerLifespanHours: number;
}

const DEFAULTS: CostInputs = {
  filamentWeightG: 50,
  filamentPricePerKg: 20,
  printTimeHours: 4,
  printerWattage: 200,
  electricityCostPerKwh: 0.12,
  printerCost: 400,
  printerLifespanHours: 2000,
};

const FILAMENT_PRESETS = [
  { name: "PLA (Budget)", pricePerKg: 16 },
  { name: "PLA (Premium)", pricePerKg: 25 },
  { name: "PETG", pricePerKg: 22 },
  { name: "ABS", pricePerKg: 20 },
  { name: "TPU (Flexible)", pricePerKg: 35 },
  { name: "Nylon", pricePerKg: 45 },
  { name: "Carbon Fiber PLA", pricePerKg: 50 },
  { name: "Resin (Standard)", pricePerKg: 35 },
  { name: "Resin (ABS-like)", pricePerKg: 45 },
] as const;

function calculateCost(inputs: CostInputs) {
  const filamentCost = (inputs.filamentWeightG / 1000) * inputs.filamentPricePerKg;
  const electricityCost =
    (inputs.printerWattage / 1000) * inputs.printTimeHours * inputs.electricityCostPerKwh;
  const depreciationCost =
    (inputs.printerCost / inputs.printerLifespanHours) * inputs.printTimeHours;
  const totalCost = filamentCost + electricityCost + depreciationCost;

  return {
    filamentCost,
    electricityCost,
    depreciationCost,
    totalCost,
    filamentPercent: (filamentCost / totalCost) * 100,
    electricityPercent: (electricityCost / totalCost) * 100,
    depreciationPercent: (depreciationCost / totalCost) * 100,
  };
}

function NumberInput({
  label,
  value,
  onChange,
  unit,
  min = 0,
  max,
  step = 1,
}: {
  readonly label: string;
  readonly value: number;
  readonly onChange: (v: number) => void;
  readonly unit: string;
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          max={max}
          step={step}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <span className="text-xs text-muted-foreground whitespace-nowrap">{unit}</span>
      </div>
    </div>
  );
}

export function CostEstimator() {
  const [inputs, setInputs] = useState<CostInputs>(DEFAULTS);

  const update = (field: keyof CostInputs, value: number) =>
    setInputs((prev) => ({ ...prev, [field]: value }));

  const result = calculateCost(inputs);

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-2">
      {/* Inputs */}
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold mb-3">Filament</h3>
          <div className="space-y-3">
            <NumberInput
              label="Print weight"
              value={inputs.filamentWeightG}
              onChange={(v) => update("filamentWeightG", v)}
              unit="grams"
              min={1}
              max={10000}
            />
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Filament type
              </label>
              <div className="flex flex-wrap gap-1.5">
                {FILAMENT_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => update("filamentPricePerKg", preset.pricePerKg)}
                    className={`rounded-full px-2.5 py-1 text-xs transition-colors ${
                      inputs.filamentPricePerKg === preset.pricePerKg
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
            <NumberInput
              label="Filament price"
              value={inputs.filamentPricePerKg}
              onChange={(v) => update("filamentPricePerKg", v)}
              unit="$/kg"
              min={1}
              max={200}
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-3">Print Time</h3>
          <NumberInput
            label="Estimated print time"
            value={inputs.printTimeHours}
            onChange={(v) => update("printTimeHours", v)}
            unit="hours"
            min={0.1}
            max={200}
            step={0.5}
          />
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-3">Printer &amp; Power</h3>
          <div className="space-y-3">
            <NumberInput
              label="Printer power draw"
              value={inputs.printerWattage}
              onChange={(v) => update("printerWattage", v)}
              unit="watts"
              min={50}
              max={1000}
            />
            <NumberInput
              label="Electricity cost"
              value={inputs.electricityCostPerKwh}
              onChange={(v) => update("electricityCostPerKwh", v)}
              unit="$/kWh"
              min={0.01}
              max={1}
              step={0.01}
            />
            <NumberInput
              label="Printer purchase price"
              value={inputs.printerCost}
              onChange={(v) => update("printerCost", v)}
              unit="$"
              min={50}
              max={10000}
            />
            <NumberInput
              label="Expected lifespan"
              value={inputs.printerLifespanHours}
              onChange={(v) => update("printerLifespanHours", v)}
              unit="hours"
              min={100}
              max={50000}
              step={100}
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="lg:sticky lg:top-20 lg:self-start">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-muted-foreground">Total Cost Per Print</h3>
          <div className="mt-2 text-4xl font-bold font-mono tracking-tight">
            ${result.totalCost.toFixed(2)}
          </div>

          <div className="mt-6 space-y-3">
            <CostRow
              label="Filament"
              amount={result.filamentCost}
              percent={result.filamentPercent}
              color="bg-blue-500"
            />
            <CostRow
              label="Electricity"
              amount={result.electricityCost}
              percent={result.electricityPercent}
              color="bg-amber-500"
            />
            <CostRow
              label="Printer wear"
              amount={result.depreciationCost}
              percent={result.depreciationPercent}
              color="bg-emerald-500"
            />
          </div>

          {/* Stacked bar */}
          <div className="mt-4 flex h-3 overflow-hidden rounded-full">
            <div className="bg-blue-500" style={{ width: `${result.filamentPercent}%` }} />
            <div className="bg-amber-500" style={{ width: `${result.electricityPercent}%` }} />
            <div className="bg-emerald-500" style={{ width: `${result.depreciationPercent}%` }} />
          </div>

          <div className="mt-6 rounded-md bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Cost per gram:</strong>{" "}
              <span className="font-mono">
                ${(result.totalCost / Math.max(inputs.filamentWeightG, 1)).toFixed(3)}
              </span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              <strong className="text-foreground">Cost per hour:</strong>{" "}
              <span className="font-mono">
                ${(result.totalCost / Math.max(inputs.printTimeHours, 0.1)).toFixed(2)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CostRow({
  label,
  amount,
  percent,
  color,
}: {
  readonly label: string;
  readonly amount: number;
  readonly percent: number;
  readonly color: string;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2">
        <div className={`h-2.5 w-2.5 rounded-full ${color}`} />
        <span className="text-muted-foreground">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-mono">${amount.toFixed(2)}</span>
        <span className="text-xs text-muted-foreground w-10 text-right">
          {percent.toFixed(0)}%
        </span>
      </div>
    </div>
  );
}
