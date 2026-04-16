import type { Metadata } from "next";
import { UpgradeAdvisor } from "./advisor";

export const metadata: Metadata = {
  title: "Should I Upgrade My 3D Printer? Find Your Next Machine",
  description: "You've outgrown your printer. Or you think you have. Pick your current machine and I'll show you the realistic next step based on what you actually want to do.",
};

export default function UpgradePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Upgrade Path Advisor</h1>
      <p className="mt-2 text-muted-foreground">
        Pick your current printer. I&apos;ll show you where to go next, and why
        each option is worth considering.
      </p>
      <UpgradeAdvisor />
    </div>
  );
}
