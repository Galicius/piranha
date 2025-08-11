import React, { useState, useCallback } from "react";
import { galleryImages } from "../mock";
import useGsapAnimations from "../hooks/useGsapAnimations";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import ImageLightbox from "../components/ImageLightbox";

export default function GalleryPage() {
  useGsapAnimations();
  
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = useCallback((index) => {
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
              {galleryImages.slice(0, 6).map((img, index) => (
                <CarouselItem key={img.id} className="basis-full">
                  <img 
                    src={img.url} 
                    alt={img.alt} 
                    className="h-[460px] w-full rounded-xl object-cover cursor-pointer hover:brightness-110 transition-all duration-300" 
                    onClick={() => openLightbox(index)}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
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
        {galleryImages.map((img, index) => (
          <div key={img.id} className="reveal-card mb-4 break-inside-avoid">
            <img 
              src={img.url} 
              alt={img.alt} 
              className="w-full rounded-xl border border-white/10 cursor-pointer hover:brightness-110 hover:scale-[1.02] transition-all duration-300" 
              onClick={() => openLightbox(index)}
              loading={index < 6 ? "eager" : "lazy"}
              decoding="async"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={galleryImages}
        currentIndex={currentImageIndex}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />
    </section>
  );
}