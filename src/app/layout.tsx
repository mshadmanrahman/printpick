import type { Metadata } from "next";
import type { WebSite, WithContext } from "schema-dts";
import Image from "next/image";
import { Sora, Outfit, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { MobileNav } from "@/components/mobile-nav";
import { DesktopNav } from "@/components/desktop-nav";
import { SearchCommand } from "@/components/search-command";
import { JsonLd } from "@/components/json-ld";
import "./globals.css";

const sora = Sora({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
  alternates: {
    canonical: "https://printpick.dev",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://printpick.dev",
    siteName: "PrintPick",
    title: "PrintPick — Find Your Perfect 3D Printer",
    description:
      "Data-driven 3D printer comparisons, interactive tools, and honest reviews.",
    images: [
      {
        url: "https://printpick.dev/api/og",
        width: 1200,
        height: 630,
        alt: "PrintPick — Find Your Perfect 3D Printer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PrintPick — Find Your Perfect 3D Printer",
    description:
      "Data-driven 3D printer comparisons, interactive tools, and honest reviews.",
    images: ["https://printpick.dev/api/og"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

function Logo({ size = 28 }: { readonly size?: number }) {
  return (
    <Image
      src="/logo.svg"
      alt="PrintPick logo"
      width={size}
      height={size}
    />
  );
}

const websiteSchema: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "PrintPick",
  url: "https://printpick.dev",
  description:
    "Data-driven 3D printer comparisons, interactive tools, and honest reviews.",
  publisher: {
    "@type": "Organization",
    name: "PrintPick",
    url: "https://printpick.dev",
    logo: { "@type": "ImageObject", url: "https://printpick.dev/logo.svg" },
  },
};

const NAV_LINKS = [
  { href: "/tools/finder", label: "Finder" },
  { href: "/best", label: "Rankings" },
  { href: "/compare", label: "Compare" },
  { href: "/blog", label: "Blog" },
  { href: "/tools", label: "Tools" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${outfit.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <JsonLd data={websiteSchema} />
        <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
          <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
            <a href="/" className="flex items-center gap-2 font-semibold text-lg tracking-tight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-lg">
              <Logo />
              <span>Print<span className="text-primary">Pick</span></span>
            </a>
            <div className="flex items-center gap-2">
              {/* Desktop nav — highlights based on current path */}
              <DesktopNav links={NAV_LINKS} />
              {/* Search */}
              <SearchCommand />
              {/* Mobile nav */}
              <MobileNav links={NAV_LINKS} />
            </div>
          </nav>
        </header>
        <Analytics />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border/50 py-10 mt-16 bg-muted/30">
          <div className="mx-auto max-w-5xl px-4">
            <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
              <div>
                <div className="flex items-center gap-2 font-semibold text-lg">
                  <Logo />
                  <span>Print<span className="text-primary">Pick</span></span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground max-w-xs leading-relaxed">
                  Data-driven 3D printer comparisons. Every printer scored across 5 dimensions.
                  No sponsored rankings.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8 text-sm">
                <div>
                  <h4 className="font-medium text-xs text-muted-foreground uppercase tracking-wider mb-3">Tools</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="/tools/finder" className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary rounded">Printer Finder</a></li>
                    <li><a href="/tools/cost-estimator" className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary rounded">Cost Estimator</a></li>
                    <li><a href="/tools/fdm-vs-resin" className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary rounded">FDM vs Resin</a></li>
                    <li><a href="/compare" className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary rounded">Compare</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-xs text-muted-foreground uppercase tracking-wider mb-3">Categories</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="/best/beginners" className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary rounded">Best for Beginners</a></li>
                    <li><a href="/best/budget" className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary rounded">Best Budget</a></li>
                    <li><a href="/best/miniatures" className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary rounded">Best for Miniatures</a></li>
                    <li><a href="/best" className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary rounded">View All</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-border/50">
              <p className="text-xs text-muted-foreground">
                As an Amazon Associate, PrintPick earns from qualifying purchases.
                Product data is updated regularly but prices and availability may change.
                Photos by talented photographers on Unsplash — <a href="/credits" className="text-primary hover:underline">view credits</a>.
                &copy; {new Date().getFullYear()} PrintPick. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

