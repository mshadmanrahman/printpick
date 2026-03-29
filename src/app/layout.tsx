import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PrintPick — Find Your Perfect 3D Printer",
    template: "%s | PrintPick",
  },
  description:
    "Data-driven 3D printer comparisons, interactive tools, and honest reviews. Find the right printer for your budget and use case.",
  metadataBase: new URL("https://printpick.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://printpick.dev",
    siteName: "PrintPick",
    title: "PrintPick — Find Your Perfect 3D Printer",
    description:
      "Data-driven 3D printer comparisons, interactive tools, and honest reviews.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PrintPick — Find Your Perfect 3D Printer",
    description:
      "Data-driven 3D printer comparisons, interactive tools, and honest reviews.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <header className="sticky top-0 z-50 border-b border-border/40 bg-background/90 backdrop-blur-md">
          <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
            <a href="/" className="flex items-center gap-1.5 font-bold text-lg tracking-tight">
              <span className="flex h-7 w-7 items-center justify-center rounded-md brand-gradient text-[10px] font-black text-white">
                PP
              </span>
              <span>Print<span className="text-primary">Pick</span></span>
            </a>
            <div className="flex items-center gap-1">
              <NavLink href="/tools/finder" label="Finder" highlight />
              <NavLink href="/best" label="Rankings" />
              <NavLink href="/compare" label="Compare" />
              <NavLink href="/tools" label="Tools" />
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border/40 py-10 mt-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
              <div>
                <div className="flex items-center gap-1.5 font-bold text-lg">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md brand-gradient text-[10px] font-black text-white">
                    PP
                  </span>
                  <span>Print<span className="text-primary">Pick</span></span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground max-w-xs">
                  Data-driven 3D printer comparisons. Every printer scored across 5 dimensions.
                  No sponsored rankings.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8 text-sm">
                <div>
                  <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-3">Tools</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="/tools/finder" className="text-muted-foreground hover:text-foreground transition-colors">Printer Finder</a></li>
                    <li><a href="/tools/cost-estimator" className="text-muted-foreground hover:text-foreground transition-colors">Cost Estimator</a></li>
                    <li><a href="/tools/fdm-vs-resin" className="text-muted-foreground hover:text-foreground transition-colors">FDM vs Resin</a></li>
                    <li><a href="/compare" className="text-muted-foreground hover:text-foreground transition-colors">Compare</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-3">Categories</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="/best/beginners" className="text-muted-foreground hover:text-foreground transition-colors">Best for Beginners</a></li>
                    <li><a href="/best/budget" className="text-muted-foreground hover:text-foreground transition-colors">Best Budget</a></li>
                    <li><a href="/best/miniatures" className="text-muted-foreground hover:text-foreground transition-colors">Best for Miniatures</a></li>
                    <li><a href="/best" className="text-muted-foreground hover:text-foreground transition-colors">View All</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-border/40">
              <p className="text-[11px] text-muted-foreground">
                As an Amazon Associate, PrintPick earns from qualifying purchases.
                Product data is updated regularly but prices and availability may change.
                &copy; {new Date().getFullYear()} PrintPick. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

function NavLink({ href, label, highlight }: { readonly href: string; readonly label: string; readonly highlight?: boolean }) {
  return (
    <a
      href={href}
      className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
        highlight
          ? "bg-primary/10 text-primary font-medium hover:bg-primary/20"
          : "text-muted-foreground hover:text-foreground hover:bg-muted"
      }`}
    >
      {label}
    </a>
  );
}
