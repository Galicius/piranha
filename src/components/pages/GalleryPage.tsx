'use client';

import React, { useState, useCallback } from "react";
import { galleryImages } from "@/data/mock";
import useGsapAnimations from "@/hooks/useGsapAnimations";
import { getImageUrl } from "@/utils/images";

export default function GalleryPage() {
  useGsapAnimations();

  return (
    <section className="py-16">
      <div data-anim="fade-up" className="mb-8">
        <h1 className="font-serif text-4xl">Galerija</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Izbrani trenutki – moody fotografija in detajli naših pijač.
        </p>
      </div>

      {/* Auto-scrolling hero gallery */}
      <div className="mb-12" data-anim="fade-up">
        <div className="glass rounded-2xl p-3 overflow-hidden relative">
          <div className="auto-scroll-gallery h-[460px] flex" style={{ width: '200%' }}>
            {/* Duplicate images for seamless loop */}
            {[...galleryImages.slice(0, 6), ...galleryImages.slice(0, 6)].map((img, index) => (
              <div 
                key={`${img.id}-${index}`} 
                className="flex-shrink-0 relative"
                style={{ width: `${100 / 12}%` }}
              >
                <img 
                  src={getImageUrl(img.localPath) || ''} 
                  alt={img.alt} 
                  className="h-[460px] w-full rounded-xl object-cover cursor-pointer hover:brightness-110 transition-all duration-300" 
                  loading={index < 2 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
          
          {/* Pause on hover indicator */}
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white/70 opacity-0 hover:opacity-100 transition-opacity duration-300">
            Hover to pause
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="reveal-grid columns-1 gap-4 md:columns-2 lg:columns-3" data-anim="fade-up">
        {galleryImages.map((img, index) => (
          <div key={img.id} className="reveal-card mb-4 break-inside-avoid">
            <img 
              src={getImageUrl(img.localPath) || ''} 
              alt={img.alt} 
              className="w-full rounded-xl border border-white/10 cursor-pointer hover:brightness-110 hover:scale-[1.02] transition-all duration-300" 
              loading={index < 6 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>
    </section>
  );
}