import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return Policy, PrintPick",
  description: "PrintPick is a comparison site. We don't sell anything. Returns go through the retailer you bought from.",
  robots: { index: false },
};

export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Return Policy</h1>
      <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
        <p>
          PrintPick is a comparison and review site. We don&apos;t sell anything, ship anything, or
          touch your order at any point. Every product on this site is sold by a third-party retailer,
          usually Amazon.
        </p>
        <p>
          If you bought through one of our affiliate links, the purchase went directly to that retailer.
          Returns, refunds, exchanges, and warranty claims are all handled by them.
        </p>
        <h2 className="text-xl font-semibold text-foreground pt-4">Amazon Returns</h2>
        <p>
          Most Amazon orders are returnable within 30 days of delivery. Visit{" "}
          <a
            href="https://www.amazon.com/gp/help/customer/display.html?nodeId=GKM69DUUYKQWKBER"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            Amazon&apos;s return page
          </a>{" "}
          or start one directly from your account.
        </p>
        <h2 className="text-xl font-semibold text-foreground pt-4">Questions about a review?</h2>
        <p>
          Reach out at printpick@pm.me.
        </p>
      </div>
    </div>
  );
}
