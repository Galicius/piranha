'use client';

import React, { useState, useRef, useEffect } from "react";
import { getOptimizedImageUrl, getResponsiveSrcSet } from "@/utils/images";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  size?: "thumb" | "medium" | "large" | "original";
  responsive?: boolean;
  placeholder?: string;
}

// Optimized image component with lazy loading, intersection observer, and Vercel Blob support
export default function OptimizedImage({ 
  src, 
  alt, 
  className = "", 
  loading = "lazy",
  size = "medium",
  responsive = false,
  placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='100%25' height='100%25' fill='%23000'/%3E%3C/svg%3E",
  ...props 
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(loading === "eager");
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loading === "eager") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  // Get optimized image URL
  const optimizedSrc = getOptimizedImageUrl(src, size);
  const srcSet = responsive ? getResponsiveSrcSet(src) : undefined;

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          aria-hidden="true"
        />
      )}
      {isInView && !hasError && optimizedSrc && (
        <img
          src={optimizedSrc}
          srcSet={srcSet || undefined}
          sizes={responsive ? "(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px" : undefined}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading={loading}
          {...props}
        />
      )}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-400">
          <span className="text-sm">Image not available</span>
        </div>
      )}
    </div>
  );
}