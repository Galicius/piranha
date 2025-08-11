import React, { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
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
        className="relative max-h-[90vh] max-w-[90vw] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage.url.replace('w=800', 'w=1200')} // Higher resolution for lightbox
          alt={currentImage.alt}
          className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
          loading="eager"
        />
        
        {/* Image info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
          <p className="text-white text-sm">{currentImage.alt}</p>
          {images.length > 1 && (
            <p className="text-white/70 text-xs mt-1">
              {currentIndex + 1} / {images.length}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}