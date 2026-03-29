import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Photo Credits",
  description: "Credits and attribution for all photographers whose work appears on PrintPick.",
};

interface Credit {
  readonly photographer: string;
  readonly unsplashUrl: string;
  readonly photoId: string;
  readonly image: string;
  readonly description: string;
}

const credits: readonly Credit[] = [
  // New batch — photographer names in filenames
  { photographer: "Jakub Zerdzicki", unsplashUrl: "https://unsplash.com/@jakubzerdzicki", photoId: "DAebxanbCaA", image: "/images/printing-closeup.jpg", description: "3D printer manufacturing orange prototype" },
  { photographer: "Jakub Zerdzicki", unsplashUrl: "https://unsplash.com/@jakubzerdzicki", photoId: "GSgCqLoTM7Q", image: "/images/speed.jpg", description: "3D printer with red light illumination" },
  { photographer: "Jakub Zerdzicki", unsplashUrl: "https://unsplash.com/@jakubzerdzicki", photoId: "NbJLUsYKUUI", image: "/images/nozzle-glow.jpg", description: "Printer head with purple and green lights" },
  { photographer: "Jakub Zerdzicki", unsplashUrl: "https://unsplash.com/@jakubzerdzicki", photoId: "V-XQ59ZDy-s", image: "/images/skull.jpg", description: "3D printed skull on digital scale" },
  { photographer: "Jakub Zerdzicki", unsplashUrl: "https://unsplash.com/@jakubzerdzicki", photoId: "vNiO8zGdQXU", image: "/images/diy-wires.jpg", description: "3D printer with exposed wires" },
  { photographer: "Jakub Zerdzicki", unsplashUrl: "https://unsplash.com/@jakubzerdzicki", photoId: "ny9nVE0PEuo", image: "/images/rgb-printer.jpg", description: "Printer with colorful RGB lights" },
  { photographer: "Jubbar J.", unsplashUrl: "https://unsplash.com/@jubbar", photoId: "BxSKZNvpHqg", image: "/images/makerspace.jpg", description: "Makerspace with multiple 3D printers" },
  { photographer: "Keyvan Max", unsplashUrl: "https://unsplash.com/@keyvanmax", photoId: "9CUrN031aq4", image: "/images/budget.jpg", description: "Budget 3D printer setup" },
  { photographer: "Osmany M. Leyva Aldana", unsplashUrl: "https://unsplash.com/@osmany_m_leyva_aldana", photoId: "LTm-dMC7t2o", image: "/images/thinker-modern.jpg", description: "Modern Thinker statue with smartphone" },
  { photographer: "Snapmaker", unsplashUrl: "https://unsplash.com/@snapmaker3dprinter", photoId: "G0B5u9qShJc", image: "/images/snapmaker-workspace.jpg", description: "Clean workspace with Snapmaker printer" },
  { photographer: "Snapmaker", unsplashUrl: "https://unsplash.com/@snapmaker3dprinter", photoId: "j6JPxXcVHsY", image: "/images/filament-spools.jpg", description: "Multiple printers and filament spools" },
  { photographer: "Xiaole Tao", unsplashUrl: "https://unsplash.com/@xiaole_tao", photoId: "Fo-HQUlRGkU", image: "/images/compact.jpg", description: "Laptop beside compact 3D printer" },
  { photographer: "Declan Sun", unsplashUrl: "https://unsplash.com/@declansun", photoId: "7c-WPgFRjFU", image: "/images/wave-art.jpg", description: "3D printed wave art with vibrant colors" },
  { photographer: "EProjets Lab", unsplashUrl: "https://unsplash.com/@eprojets_lab", photoId: "dgvD77juPZ8", image: "/images/lamp.jpg", description: "3D printed minimalist lamp" },
  // Original AVIF batch — photographers unknown (downloaded without slug metadata)
  // If you recognize these photos, please let us know so we can properly credit the photographers
  { photographer: "Unsplash Photographer", unsplashUrl: "https://unsplash.com", photoId: "hero", image: "/images/hero.avif", description: "FDM printer with glowing orange model" },
  { photographer: "Unsplash Photographer", unsplashUrl: "https://unsplash.com", photoId: "fdm", image: "/images/fdm.avif", description: "Multi-color printer printing rabbit figurine" },
  { photographer: "Unsplash Photographer", unsplashUrl: "https://unsplash.com", photoId: "resin", image: "/images/resin.avif", description: "Glossy black resin elephant figurine" },
  { photographer: "Unsplash Photographer", unsplashUrl: "https://unsplash.com", photoId: "beginners", image: "/images/beginners.avif", description: "Colorful geometric planters" },
  { photographer: "Unsplash Photographer", unsplashUrl: "https://unsplash.com", photoId: "detail", image: "/images/detail.avif", description: "Green crystal figurine macro" },
  { photographer: "Unsplash Photographer", unsplashUrl: "https://unsplash.com", photoId: "miniature", image: "/images/miniature.avif", description: "Tiny miniature folding chair" },
  { photographer: "Unsplash Photographer", unsplashUrl: "https://unsplash.com", photoId: "stormtrooper", image: "/images/stormtrooper.avif", description: "Stormtrooper helmet on shelf" },
  { photographer: "Unsplash Photographer", unsplashUrl: "https://unsplash.com", photoId: "thinker", image: "/images/thinker.avif", description: "Low-poly Thinker sculpture" },
  { photographer: "Unsplash Photographer", unsplashUrl: "https://unsplash.com", photoId: "workspace", image: "/images/workspace.avif", description: "Home desk with printer and colorful prints" },
  { photographer: "Unsplash Photographer", unsplashUrl: "https://unsplash.com", photoId: "tools", image: "/images/tools.avif", description: "Printer with accessories on dark surface" },
  { photographer: "Unsplash Photographer", unsplashUrl: "https://unsplash.com", photoId: "compare", image: "/images/compare.avif", description: "Wide printer unboxing shot" },
  { photographer: "Unsplash Photographer", unsplashUrl: "https://unsplash.com", photoId: "geometric", image: "/images/geometric.avif", description: "Abstract stacked geometric shapes" },
  { photographer: "Unsplash Photographer", unsplashUrl: "https://unsplash.com", photoId: "cubes", image: "/images/cubes.avif", description: "Dark 3D printed cubes" },
  { photographer: "Unsplash Photographer", unsplashUrl: "https://unsplash.com", photoId: "abstract", image: "/images/abstract.avif", description: "Abstract dark geometric blocks" },
];

// Group by photographer
function groupByPhotographer(items: readonly Credit[]): Record<string, readonly Credit[]> {
  const groups: Record<string, Credit[]> = {};
  for (const item of items) {
    const key = item.photographer;
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  }
  return groups;
}

export default function CreditsPage() {
  const grouped = groupByPhotographer(credits);
  const namedPhotographers = Object.entries(grouped)
    .filter(([name]) => name !== "Unsplash Photographer")
    .sort((a, b) => b[1].length - a[1].length);
  const unknownPhotographers = grouped["Unsplash Photographer"] ?? [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Photo Credits</h1>
      <p className="mt-2 text-muted-foreground">
        PrintPick uses photographs from talented photographers on{" "}
        <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          Unsplash
        </a>
        . All photos are used under the{" "}
        <a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          Unsplash License
        </a>
        . We believe in giving credit where it&apos;s due.
      </p>

      <div className="mt-10 space-y-10">
        {namedPhotographers.map(([photographer, photos]) => (
          <section key={photographer}>
            <h2 className="text-lg font-bold">
              <a
                href={photos[0].unsplashUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                {photographer}
              </a>
              <span className="ml-2 text-xs text-muted-foreground font-normal">
                {photos.length} photo{photos.length > 1 ? "s" : ""}
              </span>
            </h2>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {photos.map((photo) => (
                <a
                  key={photo.photoId}
                  href={`https://unsplash.com/photos/${photo.photoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group overflow-hidden rounded-lg border border-border/40 hover:border-primary/30 transition-all"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={photo.image}
                      alt={photo.description}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-2">
                    <p className="text-[11px] text-muted-foreground line-clamp-1">{photo.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}

        {unknownPhotographers.length > 0 && (
          <section>
            <h2 className="text-lg font-bold">
              Additional Unsplash Photos
              <span className="ml-2 text-xs text-muted-foreground font-normal">
                {unknownPhotographers.length} photos
              </span>
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              These photos were downloaded from Unsplash without photographer metadata.
              If you recognize your work here, please{" "}
              <a href="mailto:connectshadman@gmail.com" className="text-primary hover:underline">
                contact us
              </a>{" "}
              so we can properly credit you.
            </p>
            <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
              {unknownPhotographers.map((photo) => (
                <div key={photo.photoId} className="overflow-hidden rounded-lg border border-border/40">
                  <div className="relative aspect-square">
                    <Image
                      src={photo.image}
                      alt={photo.description}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 33vw, 16vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="mt-12 rounded-lg border border-primary/20 bg-primary/5 p-5 text-sm">
        <h3 className="font-semibold">About Photo Usage</h3>
        <p className="mt-1 text-muted-foreground">
          All photographs on PrintPick are sourced from{" "}
          <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            Unsplash
          </a>{" "}
          and used under their free license. While Unsplash doesn&apos;t require attribution,
          we believe photographers deserve recognition for their work. If you&apos;re a
          photographer and would like your photo removed, please contact us.
        </p>
      </div>
    </div>
  );
}
