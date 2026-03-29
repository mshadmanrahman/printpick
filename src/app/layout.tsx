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
        <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
          <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
            <a href="/" className="flex items-center gap-2 font-semibold text-lg tracking-tight">
              <span className="text-primary">Print</span>
              <span className="text-muted-foreground">Pick</span>
            </a>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="/tools" className="hover:text-foreground transition-colors">
                Tools
              </a>
              <a href="/best" className="hover:text-foreground transition-colors">
                Best Picks
              </a>
              <a href="/compare" className="hover:text-foreground transition-colors">
                Compare
              </a>
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border/50 py-8">
          <div className="mx-auto max-w-6xl px-4">
            <p className="text-xs text-muted-foreground">
              As an Amazon Associate, PrintPick earns from qualifying purchases.
              Product data is updated regularly but prices may change.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} PrintPick. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
