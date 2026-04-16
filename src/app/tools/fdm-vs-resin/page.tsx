import type { Metadata } from "next";
import { FdmVsResinQuiz } from "./quiz";

export const metadata: Metadata = {
  title: "FDM vs Resin: Which Should You Actually Buy?",
  description:
    "This isn't a blog post. Answer 5 questions about what you're making, where you live, and how messy you're willing to get. You'll have an answer in under two minutes.",
};

export default function FdmVsResinPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">FDM vs Resin Quiz</h1>
      <p className="mt-2 text-muted-foreground">
        The choice comes down to what you&apos;re making and where you&apos;re printing.
        Five questions, honest answer.
      </p>
      <FdmVsResinQuiz />
    </div>
  );
}
