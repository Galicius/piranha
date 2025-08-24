'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, Instagram, Phone, MapPin, Eye, EyeOff } from "lucide-react";
import { brand, address } from "@/data/mock";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [open, setOpen] = useState(false);
  const [demoEnabled, setDemoEnabled] = useState(true);
  const pathname = usePathname();

  // Handle hash scrolling
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash) {
        const sectionId = hash.substring(1);
        const element = document.getElementById(sectionId);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    }
  }, [pathname]);

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const props = {
      className: "text-sm tracking-wide text-muted-foreground hover:text-primary transition-colors",
      onClick: () => setOpen(false),
    };

    // Handle hash links
    if (href.startsWith('/#')) {
      return (
        <Link
          href={href}
          {...props}
          onClick={(e) => {
            setOpen(false);
            if (pathname !== '/') {
              return; // Let Next.js handle navigation
            }
            e.preventDefault();
            const sectionId = href.substring(2);
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

    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  };

  const handleContactEmail = () => {
    const subject = encodeURIComponent("Želim si spletno stran");
    const body = encodeURIComponent(`Pozdravljeni,

Videl/a sem vaše delo na spletni strani Piranha Cocktail Bureau in me zanima podoben projekt.

Podajam še uporabne informacije za prvi sestanek: (uredite šetvilke po svojih merah)
- Moj rang cene spletne strani: 1500€-3500€
- Času izdelave: 1 mesec
- Možnostih oblikovanja: 3 posvetovanja po gotovi spletni strani

Lep pozdrav

`);
    window.location.href = `mailto:galgustin@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Demo Banner */}
      {demoEnabled && (
        <div className="bg-gradient-to-r from-primary/20 to-accent/20 px-4 py-2 text-center text-xs">
          <span className="text-primary">🚀 Demo spletna stran</span> - Izdelal{" "}
          <a href="mailto:galgustin@gmail.com" className="underline hover:no-underline">
            Gal Guštin
          </a>
        </div>
      )}
      
      {/* Ripple Background Effect */}
      <div className="ripple-container">
        <div className="ripple" style={{ top: '20%', left: '10%', width: '300px', height: '300px' }} />
        <div className="ripple" style={{ top: '60%', right: '15%', width: '200px', height: '200px' }} />
        <div className="ripple" style={{ top: '40%', left: '60%', width: '250px', height: '250px' }} />
        <div className="ripple" style={{ bottom: '20%', left: '20%', width: '180px', height: '180px' }} />
      </div>

      {/* Header */}
      <header className="site-header fixed inset-x-0 top-0 z-50" style={{ top: demoEnabled ? '36px' : '0' }}>
        <div className="content-container px-4">
          <div className="mt-4 flex items-center justify-between glass rounded-xl px-4 py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <DiamondLogo />
              <div className="leading-none">
                <div className="font-serif text-xl tracking-[0.2em] text-primary">{brand.name.toUpperCase()}</div>
                <div className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">{brand.tagline}</div>
              </div>
            </Link>

            <nav className="hidden items-center gap-6 md:flex">
              <NavLink href="/cocktajli">Meni</NavLink>
              <NavLink href="/#about">O nas</NavLink>
              <NavLink href="/galerija">Galerija</NavLink>
              <NavLink href="/#hours">Delovni čas</NavLink>
              
              {/* Demo Toggle */}
              <button
                onClick={() => setDemoEnabled(!demoEnabled)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/20 bg-black/30 text-white/90 hover:bg-black/50 transition-colors text-xs"
                title={demoEnabled ? "Hide demo indicators" : "Show demo indicators"}
              >
                {demoEnabled ? <EyeOff size={14} /> : <Eye size={14} />}
                <span className="hidden lg:inline">
                  {demoEnabled ? "Hide Demo" : "Show Demo"}
                </span>
              </button>
              
              <Button onClick={handleContactEmail} className="bg-primary text-black hover:brightness-110">
                Kontakt
              </Button>
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
                <NavLink href="/cocktajli">Meni</NavLink>
                <NavLink href="/#about">O nas</NavLink>
                <NavLink href="/galerija">Galerija</NavLink>
                <NavLink href="/#hours">Delovni čas</NavLink>
                
                {/* Mobile Demo Toggle */}
                <button
                  onClick={() => setDemoEnabled(!demoEnabled)}
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded-md border border-white/20 bg-black/30 text-white/90 hover:bg-black/50 transition-colors text-sm"
                >
                  {demoEnabled ? <EyeOff size={16} /> : <Eye size={16} />}
                  <span>{demoEnabled ? "Hide Demo" : "Show Demo"}</span>
                </button>
                
                <Button onClick={handleContactEmail} className="w-full bg-primary text-black hover:brightness-110">
                  Kontakt
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main id="top" className={demoEnabled ? "pt-28" : "pt-24"}>
        <div className="content-container px-4">
          {children}
          
          {/* Developer Promotion */}
          {demoEnabled && (
            <div className="mt-24 p-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <div className="text-center">
                <h3 className="font-serif text-2xl mb-2">Potrebujete podobno spletno stran?</h3>
                <p className="text-muted-foreground mb-4">
                  Ta spletna stran je bila izdelana kot demo projekt. Kontaktirajte me za vaš projekt!
                </p>
                <Button onClick={handleContactEmail} className="bg-primary text-black hover:brightness-110">
                  Kontaktiraj razvijalca
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-white/10 bg-black/60">
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
              <Button onClick={handleContactEmail} variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                Kontaktiraj nas
              </Button>
            </div>
          </div>
          <p className="mt-8 text-xs text-muted-foreground/70">
            © {new Date().getFullYear()} Piranha Cocktail Bureau. Vse pravice pridržane.
          </p>
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