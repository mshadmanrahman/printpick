import type { Metadata } from "next";
import { FdmVsResinQuiz } from "./quiz";

export const metadata: Metadata = {
  title: "FDM vs Resin Quiz — Which 3D Printing Technology Should You Choose?",
  description:
    "Not sure if you need FDM or resin? Take our 5-question quiz to find out which 3D printing technology matches your projects, space, and budget.",
};

export default function FdmVsResinPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">FDM vs Resin Quiz</h1>
      <p className="mt-2 text-muted-foreground">
        Not sure whether to go FDM (filament) or Resin? Answer 5 questions and
        we&apos;ll recommend the right technology for you.
      </p>
      <FdmVsResinQuiz />
    </div>
  );
}
