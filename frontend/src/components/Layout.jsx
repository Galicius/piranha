import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";

import { Menu, X, Instagram, Phone, MapPin } from "lucide-react";
import { brand, address } from "../mock";

import { Link, useLocation } from "react-router-dom";
import RippleBackground from "./RippleBackground";



export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Handle hash scrolling when location changes
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.substring(1); // Remove '#'
      const element = document.getElementById(sectionId);
      if (element) {
        // Small delay to ensure the page has rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const NavA = ({ to, href, children }) => {
    const isRoute = !!to;
    const props = {
      className: "text-sm tracking-wide text-muted-foreground hover:text-primary transition-colors",
      onClick: () => setOpen(false),
    };

    // Handle hash links that should navigate to home page first
    if (to && to.startsWith('/#')) {
      return (
        <Link
          to={to}
          {...props}
          onClick={(e) => {
            setOpen(false);
            // If we're not on the home page, navigate there first
            if (window.location.pathname !== '/') {
              // Let React Router handle the navigation
              return;
            }
            // If we're already on home page, just scroll to the section
            e.preventDefault();
            const sectionId = to.substring(2); // Remove '/#'
            const element = document.getElementById(sectionId);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          {children}
        </Link>
      );
    }

    return isRoute ? (
      <Link to={to} {...props}>{children}</Link>
    ) : (
      <a href={href} {...props}>{children}</a>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Ripple Background Effect */}
      <RippleBackground />

      {/* Header */}
      <header className="site-header fixed inset-x-0 top-0 z-50">
        <div className="content-container px-4">
          <div className="mt-4 flex items-center justify-between glass rounded-xl px-4 py-3">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <DiamondLogo />
              <div className="leading-none">
                <div className="font-serif text-xl tracking-[0.2em] text-primary">{brand.name.toUpperCase()}</div>
                <div className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">{brand.tagline}</div>
              </div>
            </Link>

            <nav className="hidden items-center gap-6 md:flex">
              <NavA to="/cocktajli">Meni</NavA>
              <NavA to="/#about">O nas</NavA>
              <NavA to="/galerija">Galerija</NavA>
              <NavA to="/#hours">Delovni čas</NavA>
              <NavA to="/#contact">
                <Button className="bg-primary text-black hover:brightness-110">Kontakt</Button>
              </NavA>
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
          <div className="content-container px-4">
            <div className="mt-2 rounded-xl border border-white/10 bg-black/60 p-4 backdrop-blur-xl md:hidden">
              <div className="grid gap-3">
                <NavA to="/cocktajli">Meni</NavA>
                <NavA to="/#about">O nas</NavA>
                <NavA to="/galerija">Galerija</NavA>
                <NavA to="/#hours">Delovni čas</NavA>
                <NavA to="/#contact">
                  <Button className="w-full bg-primary text-black hover:brightness-110">Kontakt</Button>
                </NavA>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Scroll-only gradient veil */}
      <div id="scroll-veil" className="pointer-events-none fixed inset-0 z-10 opacity-0" style={{ background: "radial-gradient(800px 300px at 20% -10%, rgba(244,206,144,0.06), transparent), radial-gradient(800px 300px at 80% -10%, rgba(11,120,138,0.04), transparent)" }} />

      <main id="top" className="pt-24">
        <div className="content-container px-4">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-white/10/ bg-black/60 dark:bg-black/60">
        <div className="content-container px-4 py-12">
          <div className="grid gap-10 md:grid-cols-3">
            <div className="flex items-center gap-3">
              <DiamondLogo />
              <div>
                <div className="font-serif text-lg tracking-[0.2em] text-primary">{brand.name.toUpperCase()}</div>
                <div className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">{brand.tagline}</div>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              <div className="mb-2 flex items-center gap-2">
                <Phone size={14} className="text-primary" />
                <a
                  href={`tel:${address.phone.replace(/\s/g, '')}`}
                  className="text-primary hover:brightness-110 transition-colors"
                >
                  {address.phone}
                </a>
              </div>
              <div className="mb-2 flex items-center gap-2">
                <MapPin size={14} className="text-primary" />
                <a
                  href={address.map}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:brightness-110 transition-colors"
                >
                  {address.line1}, {address.city}
                </a>
              </div>
              <div className="mb-2 flex items-center gap-2">
                <Instagram size={14} className="text-primary" />
                <a
                  href={`https://instagram.com/${address.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:brightness-110 transition-colors"
                >
                  {address.instagram}
                </a>
              </div>
            </div>

            <div className="text-right md:text-left">
              <Link to="/#contact">
                <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">Kontaktiraj nas</Button>
              </Link>
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