"use client";

import { usePathname } from "next/navigation";

interface NavLink {
  readonly href: string;
  readonly label: string;
}

export function DesktopNav({ links }: { readonly links: readonly NavLink[] }) {
  const pathname = usePathname();

  return (
    <div className="hidden sm:flex items-center gap-1">
      {links.map((link) => {
        const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
        return (
          <a
            key={link.href}
            href={link.href}
            className={`rounded-lg px-3 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              isActive
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {link.label}
          </a>
        );
      })}
    </div>
  );
}
