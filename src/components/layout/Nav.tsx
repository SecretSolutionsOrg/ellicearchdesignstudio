"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { studio } from "@/data/studio";

const links = [
  { href: "#gallery", label: "Gallery" },
  { href: "#services", label: "Services" },
  { href: "#team", label: "Team" },
  { href: "#about", label: "About" },
  { href: "#location", label: "Location" },
  { href: "#appointments", label: "Book" },
];

type Props = { visible: boolean };

export function Nav({ visible }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-30 transition-all duration-500 ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <Image src="/branding/logo.jpg" alt={studio.name} width={36} height={36} />
          <span className="hidden sm:block font-display text-sm tracking-display uppercase text-foreground/90">
            {studio.shortName}
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs uppercase tracking-display text-foreground/70 hover:text-accent transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden h-9 w-9 rounded-full border border-border flex items-center justify-center cursor-pointer"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open ? (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <nav className="px-5 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-display text-foreground/80 py-2"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
