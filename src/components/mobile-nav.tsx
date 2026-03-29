"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

interface NavLink {
  readonly href: string;
  readonly label: string;
}

export function MobileNav({ links }: { readonly links: readonly NavLink[] }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="sm:hidden" ref={menuRef}>
      <button
        ref={buttonRef}
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-14 border-b border-border/50 bg-background/95 backdrop-blur-lg shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="mx-auto max-w-5xl px-4 py-3 flex flex-col gap-1">
            {links.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
