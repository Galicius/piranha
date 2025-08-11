import React from "react";
import { galleryImages } from "../mock";
import useGsapAnimations from "../hooks/useGsapAnimations";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function GalleryPage() {
  useGsapAnimations();
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div data-anim="fade-up" className="mb-8">
        <h1 className="font-serif text-4xl">Galerija</h1>
        <p className="mt-2 text-sm text-muted-foreground">Izbrani trenutki – moody fotografija in detajli naših pijač.</p>
      </div>

      {/* Autoplay hero carousel */}
      <div className="mb-12" data-anim="fade-up">
        <div className="glass rounded-2xl p-3">
          <Carousel plugins={[Autoplay({ delay: 2800, stopOnMouseEnter: true, stopOnInteraction: false })]}>
            <CarouselContent>
              {galleryImages.slice(0, 6).map((img) => (
                <CarouselItem key={img.id} className="basis-full">
                  <img src={img.url} alt={img.alt} className="h-[460px] w-full rounded-xl object-cover" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-3 border-white/20 bg-black/40 hover:bg-black/60" />
            <CarouselNext className="-right-3 border-white/20 bg-black/40 hover:bg-black/60" />
          </Carousel>
        </div>
      </div>

      {/* Grid */}
      <div className="reveal-grid columns-1 gap-4 md:columns-2 lg:columns-3" data-anim="fade-up">
        {galleryImages.map((img) => (
          <div key={img.id} className="reveal-card mb-4 break-inside-avoid">
            <img src={img.url} alt={img.alt} className="w-full rounded-xl border border-white/10" />
          </div>
        ))}
      </div>
    </section>
  );
}