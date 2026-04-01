import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return Policy",
  description: "PrintPick is an affiliate comparison site. Products are sold and fulfilled by third-party retailers.",
  robots: { index: false },
};

export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Return Policy</h1>
      <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
        <p>
          PrintPick is a product comparison and review website. We do not sell, ship,
          or fulfill any products directly. All products featured on this site are sold
          by third-party retailers, primarily Amazon.
        </p>
        <p>
          If you purchased a product through one of our affiliate links, your purchase
          was made directly with the retailer (e.g., Amazon). All returns, exchanges,
          refunds, and warranty claims are handled by that retailer according to their
          own policies.
        </p>
        <h2 className="text-xl font-semibold text-foreground pt-4">Amazon Returns</h2>
        <p>
          Most products purchased through Amazon can be returned within 30 days of
          delivery. Visit{" "}
          <a
            href="https://www.amazon.com/gp/help/customer/display.html?nodeId=GKM69DUUYKQWKBER"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            Amazon&apos;s Return Policy
          </a>{" "}
          for full details or initiate a return through your Amazon account.
        </p>
        <h2 className="text-xl font-semibold text-foreground pt-4">Questions?</h2>
        <p>
          If you have questions about a product review or comparison on PrintPick,
          reach out at printpick@pm.me.
        </p>
      </div>
    </div>
  );
}
