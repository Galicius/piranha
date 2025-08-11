import React, { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { getImageUrl } from "../utils/images";

export default function ImageLightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  onPrevious,
  onNext
}) {
  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        onPrevious();
        break;
      case 'ArrowRight':
        onNext();
        break;
      default:
        break;
    }
  }, [isOpen, onClose, onPrevious, onNext]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !images[currentIndex]) return null;

  const currentImage = images[currentIndex];

  const lightboxContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
        aria-label="Close lightbox"
      >
        <X size={24} />
      </button>

      {/* Navigation buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Image container */}
      <div
        className="relative max-h-[80vh] max-w-[80vw] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={getImageUrl(currentImage.localPath, currentImage.fallbackUrl)}
          alt={currentImage.alt}
          className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
          style={{ maxWidth: '800px', maxHeight: '600px' }}
          loading="eager"
        />

        {/* Image info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
          {currentImage.name ? (
            // Cocktail info
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white text-lg font-serif">{currentImage.name}</h3>
                {currentImage.price && (
                  <span className="text-primary text-sm font-medium">€{currentImage.price}</span>
                )}
              </div>
              {currentImage.blurb && (
                <p className="text-white/90 text-sm mb-2">{currentImage.blurb}</p>
              )}
              {currentImage.tags && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {currentImage.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-white/20 text-white/80 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {images.length > 1 && (
                <p className="text-white/70 text-xs">
                  {currentIndex + 1} / {images.length}
                </p>
              )}
            </div>
          ) : (
            // Gallery info
            <div>
              <p className="text-white text-sm">{currentImage.alt}</p>
              {images.length > 1 && (
                <p className="text-white/70 text-xs mt-1">
                  {currentIndex + 1} / {images.length}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(lightboxContent, document.body);
}