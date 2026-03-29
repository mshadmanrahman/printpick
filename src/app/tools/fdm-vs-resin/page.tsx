import type { Metadata } from "next";
import { FdmVsResinQuiz } from "./quiz";

export const metadata: Metadata = {
  title: "FDM vs Resin — Which 3D Printing Technology Is Right for You?",
  description:
    "Answer 5 quick questions and we'll tell you whether FDM (filament) or Resin (MSLA) 3D printing is better for your needs.",
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
