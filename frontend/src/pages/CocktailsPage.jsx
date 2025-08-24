import React, { useMemo, useState, useCallback } from "react";
import { signatureCocktails, imageById, galleryImages } from "../mock";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import useGsapAnimations from "../hooks/useGsapAnimations";
import ImageLightbox from "../components/ImageLightbox";
import OptimizedImage from "../components/OptimizedImage";

export default function CocktailsPage() {
  useGsapAnimations();
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentCocktailIndex, setCurrentCocktailIndex] = useState(0);

  const tags = useMemo(() => {
    const set = new Set();
    signatureCocktails.forEach((c) => c.tags.forEach((t) => set.add(t)));
    return ["all", ...Array.from(set)];
  }, []);

  const list = useMemo(() => {
    if (query === "" && tag === "all") {
      return signatureCocktails; // Return all if no filters
    }
    
    return signatureCocktails.filter((c) => {
      const matchesQuery = query === "" || c.name.toLowerCase().includes(query.toLowerCase());
      const matchesTag = tag === "all" || c.tags.includes(tag);
      return matchesQuery && matchesTag;
    });
  }, [query, tag]);

  const handleQueryChange = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  const handleTagChange = useCallback((newTag) => {
    setTag(newTag);
  }, []);

  const openLightbox = useCallback((cocktailId) => {
    const index = signatureCocktails.findIndex(c => c.id === cocktailId);
    setCurrentCocktailIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentCocktailIndex((prev) => 
      prev === 0 ? signatureCocktails.length - 1 : prev - 1
    );
  }, []);

  const goToNext = useCallback(() => {
    setCurrentCocktailIndex((prev) => 
      prev === signatureCocktails.length - 1 ? 0 : prev + 1
    );
  }, []);

  // Transform cocktails data for lightbox
  const cocktailsForLightbox = signatureCocktails.map(c => ({
    id: c.id,
    localPath: galleryImages.find(img => img.id === c.imageId)?.localPath,
    fallbackUrl: galleryImages.find(img => img.id === c.imageId)?.fallbackUrl,
    alt: c.name,
    name: c.name,
    price: c.price,
    blurb: c.blurb,
    tags: c.tags
  }));

  return (
    <section className="py-16">
      <div className="site-top reveal-grid mb-8 grid items-end gap-4 sm:grid-cols-2" data-anim="fade-up">
        <div data-anim="fade-up">
          <h1 className="font-serif text-4xl">Koktajli</h1>
          <p className="mt-2 text-sm text-muted-foreground">Prebrskajte naš izbor signature pijač.</p>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-3">
          <Input placeholder="Išči koktajl" value={query} onChange={handleQueryChange} className="w-48 bg-black/30 dark:bg-black/30" />
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => handleTagChange(t)}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${tag === t ? "border-primary text-primary" : "border-white/10 text-muted-foreground hover:border-white/20"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="reveal-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c, index) => (
          <Card key={c.id} className="reveal-card overflow-hidden border-white/10 bg-black/40 dark:bg-black/40">
            <OptimizedImage
              src={imageById(c.imageId)}
              alt={c.name}
              className="h-60 cursor-pointer hover:brightness-110 transition-all duration-300"
              loading={index < 6 ? "eager" : "lazy"}
              size="medium"
              responsive={true}
              onClick={() => openLightbox(c.id)}
            />
            <CardContent className="space-y-2 p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl">{c.name}</h3>
                <span className="rounded-md border border-primary/40 px-2 py-0.5 text-sm text-primary">€ {c.price}</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
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
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={cocktailsForLightbox}
        currentIndex={currentCocktailIndex}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />
    </section>
  );
}