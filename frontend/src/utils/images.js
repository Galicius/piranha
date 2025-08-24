// Image utility functions for Piranha Cocktail Bureau
import { getOptimizedBlobUrl, getBlobResponsiveSrcSet } from './blobStorage';

/**
 * Get the public URL for an image (supports both local and Vercel Blob)
 * @param {string} imagePath - Path relative to /images/ folder or Vercel Blob URL
 * @param {string} fallbackUrl - External URL to use as fallback
 * @returns {string} - Complete image URL
 */
export const getImageUrl = (imagePath, fallbackUrl = null) => {
  // If it's a Vercel Blob URL, return as-is
  if (imagePath && imagePath.includes('vercel-storage.com')) {
    return imagePath;
  }

  // Only use local images - no fallbacks to external URLs
  if (imagePath && !imagePath.startsWith('http')) {
    // In development, PUBLIC_URL is often empty, so we need to handle that
    const publicUrl = process.env.PUBLIC_URL || '';
    return `${publicUrl}/images/${imagePath}`;
  }

  // For external URLs, return as-is (but we won't use these)
  return imagePath;
};

/**
 * Get optimized image URL with different sizes (supports both local and Vercel Blob)
 * @param {string} imagePath - Path relative to /images/ folder or Vercel Blob URL
 * @param {string} size - Size variant ('thumb', 'medium', 'large', 'original')
 * @param {string} fallbackUrl - External URL to use as fallback
 * @returns {string} - Optimized image URL
 */
export const getOptimizedImageUrl = (imagePath, size = 'medium', fallbackUrl = null) => {
  if (!imagePath) {
    return fallbackUrl;
  }

  // Handle Vercel Blob URLs with optimization
  if (imagePath.includes('vercel-storage.com')) {
    const sizeMap = {
      thumb: { width: 400, quality: 80 },
      medium: { width: 800, quality: 85 },
      large: { width: 1200, quality: 90 },
      original: {}
    };

    const options = sizeMap[size] || sizeMap.medium;
    return getOptimizedBlobUrl(imagePath, options);
  }

  // Handle external URLs
  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  // Handle local images
  const sizeMap = {
    thumb: '400',
    medium: '800',
    large: '1200',
    original: ''
  };

  const width = sizeMap[size];
  const baseUrl = `${process.env.PUBLIC_URL}/images/${imagePath}`;

  // If we have size variants, append size to filename
  if (width && imagePath.includes('.')) {
    const [name, ext] = imagePath.split('.');
    return `${process.env.PUBLIC_URL}/images/${name}-${width}w.${ext}`;
  }

  return baseUrl;
};

/**
 * Preload an image for better performance (supports both local and Vercel Blob)
 * @param {string} imageUrl - URL of the image to preload
 * @param {Object} options - Optimization options for Vercel Blob images
 * @returns {Promise} - Promise that resolves when image is loaded
 */
export const preloadImage = (imageUrl, options = {}) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = reject;
    
    // Use optimized URL for Vercel Blob images
    if (imageUrl && imageUrl.includes('vercel-storage.com')) {
      img.src = getOptimizedBlobUrl(imageUrl, options);
    } else {
      img.src = imageUrl;
    }
  });
};

/**
 * Get responsive image srcSet for different screen densities (supports both local and Vercel Blob)
 * @param {string} imagePath - Path relative to /images/ folder or Vercel Blob URL
 * @param {string} fallbackUrl - External URL to use as fallback
 * @returns {string} - srcSet string for responsive images
 */
export const getResponsiveSrcSet = (imagePath, fallbackUrl = null) => {
  if (!imagePath) {
    return fallbackUrl;
  }

  // Handle Vercel Blob URLs
  if (imagePath.includes('vercel-storage.com')) {
    return getBlobResponsiveSrcSet(imagePath);
  }

  // Handle external URLs
  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  // Handle local images
  const baseUrl = `${process.env.PUBLIC_URL}/images/${imagePath}`;

  if (imagePath.includes('.')) {
    const [name, ext] = imagePath.split('.');
    return [
      `${process.env.PUBLIC_URL}/images/${name}-400w.${ext} 400w`,
      `${process.env.PUBLIC_URL}/images/${name}-800w.${ext} 800w`,
      `${process.env.PUBLIC_URL}/images/${name}-1200w.${ext} 1200w`
    ].join(', ');
  }

  return baseUrl;
};

// Image categories for organization
export const IMAGE_CATEGORIES = {
  COCKTAILS: {
    SIGNATURE: 'cocktails/signature',
    CLASSICS: 'cocktails/classics',
    SEASONAL: 'cocktails/seasonal'
  },
  GALLERY: {
    BAR: 'gallery/bar',
    INGREDIENTS: 'gallery/ingredients',
    PROCESS: 'gallery/process'
  },
  BRANDING: 'branding',
  UI: 'ui'
};

// Default image paths for cocktails
export const COCKTAIL_IMAGES = {
  'black-gold-old-fashioned': 'cocktails/signature/black-gold-old-fashioned.webp',
  'piranha-negroni': 'cocktails/signature/piranha-negroni.webp',
  'nocturne-sour': 'cocktails/signature/nocturne-sour.webp',
  'amber-boulevardier': 'cocktails/signature/amber-boulevardier.webp',
  'emerald-highball': 'cocktails/signature/emerald-highball.webp',
  'velvet-espresso': 'cocktails/signature/velvet-espresso.webp'
};