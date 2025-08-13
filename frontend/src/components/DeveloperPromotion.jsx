import React from 'react';
import { Button } from './ui/button';
import { Mail, ExternalLink, Code2 } from 'lucide-react';

export default function DeveloperPromotion({
  enabled = true,
  developerName = "Web Developer",
  tagline = "Professional Web Development",
  contactEmail = "",
  portfolioUrl = "",
  message = "Like this website?",
  callToAction = "I can create one for you too!",
  buttonText = "Contact Me"
}) {
  // Don't render if disabled
  if (!enabled) return null;

  const handleEmailClick = () => {
    if (contactEmail) {
      const subject = encodeURIComponent("Želim si spletno stran");
      const body = encodeURIComponent(`Pozdravljeni,

Videl/a sem vaše delo na spletni strani Piranha Cocktail Bureau in me zanima podoben projekt.

Podajam še uporabne informacije za prvi sestanek: (uredite šetvilke po svojih merah)
- Moj rang cene spletne strani: 1500€-3500€
- Času izdelave: 1 mesec
- Možnostih oblikovanja: 3 posvetovanja po gotovi spletni strani

Lep pozdrav

`);
      window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    }
  };

  const handlePortfolioClick = () => {
    if (portfolioUrl) {
      window.open(portfolioUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="mt-16 mb-8">
      <div className="glass rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/0 p-6 md:p-8">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(600px_200px_at_50%_-20%,rgba(244,206,144,.08),transparent)] rounded-2xl" />
        
        <div className="relative z-10">
          {/* Header with icon */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/20 border border-primary/30">
              <Code2 size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-serif text-xl text-primary">{message}</h3>
              <p className="text-sm text-muted-foreground">{callToAction}</p>
            </div>
          </div>

          {/* Developer info and CTA */}
          <div className="grid gap-4 md:grid-cols-2 md:items-center">
            <div>
              <h4 className="font-semibold text-foreground">{developerName}</h4>
              <p className="text-sm text-muted-foreground mb-3">{tagline}</p>
              
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  React & Next.js
                </span>
                <span className="px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  Tailwind CSS
                </span>
                <span className="px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  Responsive Design
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
              {contactEmail && (
                <Button
                  onClick={handleEmailClick}
                  className="bg-primary text-black hover:brightness-110 transition-all duration-200"
                >
                  <Mail size={16} className="mr-2" />
                  {buttonText}
                </Button>
              )}
              
              {portfolioUrl && (
                <Button
                  onClick={handlePortfolioClick}
                  variant="outline"
                  className="border-primary/50 text-primary hover:bg-primary/10 transition-all duration-200"
                >
                  <ExternalLink size={16} className="mr-2" />
                  Portfolio
                </Button>
              )}
            </div>
          </div>

          {/* Subtle separator */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <p className="text-xs text-muted-foreground/70 text-center">
              Professional web development services • Custom design & development • Responsive & modern
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}