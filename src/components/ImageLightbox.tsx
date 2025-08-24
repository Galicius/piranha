'use client';

import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getImageUrl } from '@/utils/images';

interface LightboxImage {
  id: string;
  localPath?: string;
  blobUrl?: string | null;
  alt: string;
  name?: string;
  price?: number;
  blurb?: string;
  tags?: string[];
}

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: LightboxImage[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
}

export default function ImageLightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  onPrevious,
  onNext,
}: ImageLightboxProps) {
  if (!isOpen || !images.length) return null;

  const currentImage = images[currentIndex];
  const imageUrl = currentImage.blobUrl || getImageUrl(currentImage.localPath || '');

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrevious();
    if (e.key === 'ArrowRight') onNext();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
      >
        <X size={24} />
      </button>

      {/* Navigation buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={onPrevious}
            className="absolute left-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Image container */}
      <div className="relative max-h-[90vh] max-w-[90vw] flex items-center justify-center">
        <img
          src={imageUrl || ''}
          alt={currentImage.alt}
          className="max-h-full max-w-full object-contain"
        />
        
        {/* Image info overlay */}
        {(currentImage.name || currentImage.blurb) && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            {currentImage.name && (
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-serif text-white">{currentImage.name}</h3>
                {currentImage.price && (
                  <span className="text-primary font-medium">€ {currentImage.price}</span>
                )}
              </div>
            )}
            {currentImage.blurb && (
              <p className="text-white/90 text-sm mb-2">{currentImage.blurb}</p>
            )}
            {currentImage.tags && (
              <div className="flex flex-wrap gap-2">
                {currentImage.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/20 px-2 py-1 text-xs text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Image counter */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 rounded-full px-3 py-1 text-white text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}