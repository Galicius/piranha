import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";
import { Menu, X, Instagram, Phone, MapPin } from "lucide-react";
import { brand } from "../mock";

// small util (shadcn's cn function if available). Fallback simple join.
function clsx(...args) {
  return args.filter(Boolean).join(" ");
}

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);

  const NavLink = ({ href, children }) => (
    <a
      href={href}
      className="text-sm tracking-wide text-muted-foreground hover:text-primary transition-colors"
      onClick={() => setOpen(false)}
    >
      {children}
    </a>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl">
            {/* Logo */}
            <a href="#top" className="flex items-center gap-3">
              <DiamondLogo />
              <div className="leading-none">
                <div className="font-serif text-xl tracking-[0.2em] text-primary">{brand.name.toUpperCase()}</div>
                <div className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">{brand.tagline}</div>
              </div>
            </a>

            <nav className="hidden items-center gap-8 md:flex">
              <NavLink href="#menu">Meni</NavLink>
              <NavLink href="#about">O nas</NavLink>
              <NavLink href="#gallery">Galerija</NavLink>
              <NavLink href="#hours">Delovni čas</NavLink>
              <a href="#contact">
                <Button className="bg-primary text-black hover:brightness-110">Kontakt</Button>
              </a>
            </nav>

            <button
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/20 bg-black/30 text-white/90"
              onClick={() => setOpen((o) => !o)}
              aria-label="toggle menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="mx-auto max-w-7xl px-4">
            <div className="mt-2 rounded-xl border border-white/10 bg-black/60 p-4 backdrop-blur-xl md:hidden">
              <div className="grid gap-3">
                <NavLink href="#menu">Meni</NavLink>
                <NavLink href="#about">O nas</NavLink>
                <NavLink href="#gallery">Galerija</NavLink>
                <NavLink href="#hours">Delovni čas</NavLink>
                <a href="#contact">
                  <Button className="w-full bg-primary text-black hover:brightness-110">Kontakt</Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <main id="top" className="pt-24">{children}</main>

      {/* Footer */}
      <footer className="mt-24 border-t border-white/10/ bg-black/60">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid gap-10 md:grid-cols-3">
            <div className="flex items-center gap-3">
              <DiamondLogo />
              <div>
                <div className="font-serif text-lg tracking-[0.2em] text-primary">{brand.name.toUpperCase()}</div>
                <div className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">{brand.tagline}</div>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              <div className="mb-2 flex items-center gap-2"><Phone size={14} className="text-primary"/> <span>+386 40 123 456</span></div>
              <div className="mb-2 flex items-center gap-2"><MapPin size={14} className="text-primary"/> <span>Ljubljana</span></div>
              <div className="mb-2 flex items-center gap-2"><Instagram size={14} className="text-primary"/> <span>@piranha.cocktails</span></div>
            </div>

            <div className="text-right md:text-left">
              <a href="#contact">
                <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">Kontaktiraj nas</Button>
              </a>
            </div>
          </div>
          <p className="mt-8 text-xs text-muted-foreground/70">© {new Date().getFullYear()} Piranha Cocktail Bureau. Vse pravice pridržane.</p>
        </div>
      </footer>
    </div>
  );
}

function DiamondLogo() {
  return (
    <div className="relative h-8 w-8">
      <svg viewBox="0 0 48 48" className="h-8 w-8">
        <g stroke="currentColor" className="text-primary" strokeWidth="2.5" fill="none" strokeLinecap="round">
          <rect x="10" y="10" width="20" height="20" transform="rotate(45 20 20)" />
          <path d="M34 26 l6 6" />
        </g>
      </svg>
    </div>
  );
}