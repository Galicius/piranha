'use client';

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { brand, galleryImages, signatureCocktails, imageById, aboutQuotes, hours, address, getOpenStatus } from "@/data/mock";
import { getImageUrl } from "@/utils/images";
import { CheckCircle2, ArrowRight } from "lucide-react";
import useGsapAnimations from "@/hooks/useGsapAnimations";
import ImageLightbox from "@/components/ImageLightbox";

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative ${className}`}>{children}</section>
  );
}

export default function Landing() {
  useGsapAnimations();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  }, []);

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  }, []);

  return (
    <div>
      <Hero openLightbox={openLightbox} />
      <SignatureMenu />
      <About />
      <Gallery openLightbox={openLightbox} />
      <CTA />
      <Contact />
      <Hours />

      {/* Lightbox */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={galleryImages}
        currentIndex={currentImageIndex}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />
    </div>
  );
}

function Hero({ openLightbox }: { openLightbox: (index: number) => void }) {
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
    <div className="relative overflow-hidden">
      {/* subtle top glow */}
      <div className="pointer-events-none absolute inset-x-0 -top-32 z-0 h-72 bg-gradient-to-b from-white/10 to-transparent blur-2xl dark:from-white/10" />

      <Section className="flex flex-col items-center gap-12 pb-20 pt-16 md:flex-row md:items-end md:gap-16 md:pb-28 md:pt-24">
        {/* Left copy */}
        <div className="relative z-10 max-w-xl" data-anim="fade-up">
          <p className="text-xs uppercase tracking-[0.35em] text-[hsl(var(--brand-accent))]">{brand.message}</p>
          <h1 className="mt-3 font-serif text-5xl leading-[1.1] md:text-6xl">
            {brand.name} <span className="text-primary">Cocktail</span> Bureau
          </h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            Črno ozadje. Zlate podrobnosti. Koktajli, ki ukradejo pozornost. Dobrodošli v Piranhi – doma najboljših pijač.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={handleContactEmail}>
              <Button className="bg-primary text-black hover:brightness-110">Kontaktiraj nas</Button>
            </button>
            <a href="#menu">
              <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">Poglej meni</Button>
            </a>
          </div>
        </div>

        {/* Right media carousel */}
        <div className="relative z-10 w-full max-w-xl md:max-w-2xl" data-anim="fade-up">
          <div className="glass rounded-2xl p-3 border border-[#0B788A]/30">
            <Carousel className="w-full" plugins={[Autoplay({ delay: 4000, stopOnMouseEnter: true, stopOnInteraction: false })]}>
              <CarouselContent>
                {galleryImages
                  .filter(img => img.localPath.includes('process'))
                  .map((img, index) => (
                    <CarouselItem key={img.id} className="basis-full">
                      <div className="overflow-hidden rounded-xl">
                        <img
                          src={getImageUrl(img.localPath) || ''}
                          alt={img.alt}
                          className="h-[420px] w-full object-cover cursor-pointer hover:brightness-110 transition-all duration-300"
                          loading={index === 0 ? "eager" : "lazy"}
                          onClick={() => openLightbox(galleryImages.findIndex(g => g.id === img.id))}
                        />
                      </div>
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <CarouselPrevious className="-left-3 border-white/20 bg-black/40 hover:bg-black/60" />
              <CarouselNext className="-right-3 border-white/20 bg-black/40 hover:bg-black/60" />
            </Carousel>
          </div>
        </div>
      </Section>
    </div>
  );
}

function SignatureMenu() {
  const [cocktailLightboxOpen, setCocktailLightboxOpen] = useState(false);
  const [currentCocktailIndex, setCurrentCocktailIndex] = useState(0);

  const openCocktailLightbox = useCallback((index: number) => {
    setCurrentCocktailIndex(index);
    setCocktailLightboxOpen(true);
  }, []);

  const closeCocktailLightbox = useCallback(() => {
    setCocktailLightboxOpen(false);
  }, []);

  const goToPreviousCocktail = useCallback(() => {
    setCurrentCocktailIndex((prev) =>
      prev === 0 ? signatureCocktails.length - 1 : prev - 1
    );
  }, []);

  const goToNextCocktail = useCallback(() => {
    setCurrentCocktailIndex((prev) =>
      prev === signatureCocktails.length - 1 ? 0 : prev + 1
    );
  }, []);

  // Transform cocktails data for lightbox
  const cocktailsForLightbox = signatureCocktails.map(c => ({
    id: c.id,
    localPath: galleryImages.find(img => img.id === c.imageId)?.localPath,
    alt: c.name,
    name: c.name,
    price: c.price,
    blurb: c.blurb,
    tags: c.tags
  }));

  return (
    <Section id="menu" className="py-20">
      <div className="mb-10 flex items-end justify-between" data-anim="fade-up">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl">Signature koktajli</h2>
          <p className="mt-2 text-sm text-muted-foreground">Najbolj priljubljene kreacije hiše Piranha.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/cocktajli">
            <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 group">
              Vsi koktajli
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="reveal-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {signatureCocktails.map((c, index) => (
          <Card key={c.id} className="reveal-card group relative overflow-hidden border-white/10 bg-black/40 dark:bg-black/40">
            <div className="overflow-hidden">
              <img
                src={imageById(c.imageId) || ''}
                alt={c.name}
                className="h-56 w-full object-cover transition-[filter] duration-500 group-hover:brightness-110 cursor-pointer"
                onClick={() => openCocktailLightbox(index)}
              />
            </div>
            <CardContent className="space-y-2 p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl">{c.name}</h3>
                <span className="rounded-md border border-primary/40 px-2 py-0.5 text-sm text-primary">€ {c.price}</span>
              </div>
              <p className="text-sm text-muted-foreground">{c.blurb}</p>
              <div className="flex flex-wrap gap-2 pt-1">
                {c.tags.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 px-2 py-0.5 text-[12px] text-muted-foreground">{t}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cocktail Lightbox */}
      <ImageLightbox
        isOpen={cocktailLightboxOpen}
        onClose={closeCocktailLightbox}
        images={cocktailsForLightbox}
        currentIndex={currentCocktailIndex}
        onPrevious={goToPreviousCocktail}
        onNext={goToNextCocktail}
      />
    </Section>
  );
}

function About() {
  return (
    <Section id="about" className="py-24">
      <div className="grid items-start gap-12 md:grid-cols-2">
        <div data-anim="fade-up">
          <p className="text-xs uppercase tracking-[0.35em] text-[hsl(var(--brand-accent))]">PROFESIONALIZEM</p>
          <h3 className="mt-2 font-serif text-3xl">Naš standard</h3>
          <p className="prose prose-invert mt-4 max-w-prose whitespace-pre-line text-muted-foreground">{aboutQuotes.profesionalizem}</p>
        </div>
        <div data-anim="fade-up">
          <p className="text-xs uppercase tracking-[0.35em] text-[hsl(var(--brand-accent))]">HEDONIZEM</p>
          <h3 className="mt-2 font-serif text-3xl">Naša pot</h3>
          <p className="prose prose-invert mt-4 max-w-prose whitespace-pre-line text-muted-foreground">{aboutQuotes.hedonizem}</p>

          <div className="mt-8" data-anim="fade-up">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">Sestavine</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">Najboljši destilati, sveži sokovi in butične bitters – skrbno izbrani za vsako pijačo.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">Tehnike</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">Clarity, fat-washing in cold brew infuzije za globino okusa in kristalno čiste koktajle.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">Ekipa</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">Kolektiv z desetletnimi izkušnjami in obsedenostjo z detajli – vsak večer, vsak kozarec.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Gallery({ openLightbox }: { openLightbox: (index: number) => void }) {
  return (
    <Section id="gallery" className="py-20">
      <div className="mb-8 flex items-end justify-between" data-anim="fade-up">
        <div>
          <h2 className="font-serif text-3xl">Galerija</h2>
          <p className="mt-2 text-sm text-muted-foreground">Izbrani trenutki – moody fotografija in detajli naših pijač.</p>
        </div>
        <Link href="/galerija">
          <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 group">
            Vsa galerija
            <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
      <Carousel className="w-full" data-anim="fade-up" plugins={[Autoplay({ delay: 3000, stopOnMouseEnter: true, stopOnInteraction: false })]}>
        <CarouselContent>
          {galleryImages.map((img, index) => (
            <CarouselItem key={img.id} className="basis-full md:basis-1/2 lg:basis-1/3">
              <div className="glass overflow-hidden rounded-xl">
                <img
                  src={getImageUrl(img.localPath) || ''}
                  alt={img.alt}
                  className="h-64 w-full object-cover cursor-pointer hover:brightness-110 transition-all duration-300"
                  onClick={() => openLightbox(index)}
                  loading={index < 3 ? "eager" : "lazy"}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-3 border-white/20 bg-black/40 hover:bg-black/60" />
        <CarouselNext className="-right-3 border-white/20 bg-black/40 hover:bg-black/60" />
      </Carousel>
    </Section>
  );
}

function CTA() {
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
    <Section className="py-12">
      <div className="cta-reveal relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-white/5 to-white/0 p-8 dark:from-white/5">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(600px_200px_at_30%_-20%,rgba(244,206,144,.25),transparent)]" />
        <div className="grid items-center gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-serif text-3xl">Pripravljeni na izkušnjo?</h3>
            <p className="mt-2 max-w-prose text-sm text-muted-foreground">Pišite nam in pripravili bomo mizo ali tasting, ki vam bo sedel kot ulit.</p>
          </div>
          <div className="text-right">
            <button onClick={handleContactEmail}>
              <Button size="lg" className="bg-primary px-8 text-black hover:brightness-110">Kontakt</Button>
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Contact() {
  const { register, handleSubmit, reset } = useForm();

  function onSubmit(data: any) {
    try {
      const existing = JSON.parse(localStorage.getItem("piranha_inquiries") || "[]");
      const payload = { ...data, createdAt: new Date().toISOString() };
      localStorage.setItem("piranha_inquiries", JSON.stringify([payload, ...existing].slice(0, 50)));
      toast.success("Hvala! Sporočilo je shranjeno. Odgovorili vam bomo kmalu.");
      reset();
    } catch (e) {
      toast.error("Napaka. Poskusite znova.");
    }
  }

  return (
    <Section id="contact" className="py-24">
      <div className="grid gap-10 md:grid-cols-2">
        <div data-anim="fade-up">
          <h2 className="font-serif text-3xl">Kontakt</h2>
          <p className="mt-2 text-sm text-muted-foreground">Za rezervacije, dogodke ali degustacije nas kontaktirajte. Odgovorimo hitro.</p>

          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> Rezervacije miz in skupin</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> Privatni eventi in pop-upi</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> Tasting meniji po meri</li>
          </ul>

          <div className="mt-8 space-y-3 text-sm">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Naslov</p>
              <a
                href={address.map}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:brightness-110 transition-colors"
              >
                {address.line1}<br />
                {address.city}
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Telefon</p>
              <a
                href={`tel:${address.phone.replace(/\s/g, '')}`}
                className="text-primary hover:brightness-110 transition-colors"
              >
                {address.phone}
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Email</p>
              <a
                href={`mailto:${address.email}`}
                className="text-primary hover:brightness-110 transition-colors"
              >
                {address.email}
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Instagram</p>
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
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="glass rounded-2xl p-6" data-anim="fade-up">
          <div className="grid gap-4">
            <div>
              <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Ime in priimek</label>
              <Input required placeholder="Vaše ime" className="bg-black/40 dark:bg-black/40" {...register("name", { required: true })} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Email</label>
                <Input type="email" required placeholder="vi@example.com" className="bg-black/40 dark:bg-black/40" {...register("email", { required: true })} />
              </div>
              <div>
                <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Telefon</label>
                <Input placeholder="Optional" className="bg-black/40 dark:bg-black/40" {...register("phone")} />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Sporočilo</label>
              <Textarea rows={5} required placeholder="Kako vam lahko pomagamo?" className="resize-none bg-black/40 dark:bg-black/40" {...register("message", { required: true })} />
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Z oddajo soglašate z našimi pogoji storitve.</p>
              <Button type="submit" className="bg-primary text-black hover:brightness-110">Pošlji</Button>
            </div>
          </div>
        </form>
      </div>
    </Section>
  );
}

function Hours() {
  const [openStatus, setOpenStatus] = useState(getOpenStatus());

  // Update status every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setOpenStatus(getOpenStatus());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <Section id="hours" className="py-20" data-anim="fade-up">
      <div className="rounded-2xl border border-white/10 bg-black/40 p-6 dark:bg-black/40">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-2xl">Delovni čas</h3>
          <div className="text-right">
            <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${openStatus.isOpen
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
              <div className={`h-2 w-2 rounded-full ${openStatus.isOpen ? 'bg-green-400' : 'bg-red-400'
                }`} />
              {openStatus.status}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {openStatus.timeInfo}
            </p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {hours.map((h, index) => {
            const now = new Date();
            const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
            const dayMap = [6, 0, 1, 2, 3, 4, 5]; // Sunday=6, Monday=0, etc.
            const todayIndex = dayMap[currentDay];
            const isToday = index === todayIndex;

            return (
              <div
                key={h.day}
                className={`flex items-center justify-between rounded-lg border px-4 py-3 ${isToday
                    ? 'border-primary/50 bg-primary/10 dark:bg-primary/10'
                    : 'border-white/5 bg-black/30 dark:bg-black/30'
                  }`}
              >
                <span className={`text-sm ${isToday ? 'text-primary font-medium' : 'text-muted-foreground'
                  }`}>
                  {h.day}
                  {isToday && <span className="ml-2 text-xs">(danes)</span>}
                </span>
                <span className={`text-sm ${isToday ? 'text-primary font-medium' : 'text-foreground'
                  }`}>
                  {h.time}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}