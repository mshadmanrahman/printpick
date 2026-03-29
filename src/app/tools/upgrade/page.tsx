import type { Metadata } from "next";
import { UpgradeAdvisor } from "./advisor";

export const metadata: Metadata = {
  title: "Upgrade Path Advisor — What Should I Upgrade To?",
  description: "Already have a 3D printer? Tell us which one and we'll recommend the best upgrade based on your needs.",
};

export default function UpgradePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Upgrade Path Advisor</h1>
      <p className="mt-2 text-muted-foreground">
        Already have a printer? Select it below and we&apos;ll show you the best upgrade options.
      </p>
      <UpgradeAdvisor />
    </div>
  );
}
