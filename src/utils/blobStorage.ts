// Vercel Blob storage utilities for cocktail images
import { put, list, del } from '@vercel/blob';

interface UploadResult {
  success: boolean;
  url?: string;
  pathname?: string;
  size?: number;
  uploadedAt?: Date;
  error?: string;
}

interface BlobInfo {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: Date;
}

interface OptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: string;
  fit?: string;
}

/**
 * Upload an image to Vercel Blob storage
 * @param file - The image file to upload
 * @param pathname - The path where the file should be stored
 * @returns Upload result with URL and metadata
 */
export const uploadImage = async (file: File, pathname: string): Promise<UploadResult> => {
  try {
    const blob = await put(pathname, file, {
      access: 'public',
      addRandomSuffix: false,
    });
    
    return {
      success: true,
      url: blob.url,
      pathname: blob.pathname,
      size: blob.size,
      uploadedAt: blob.uploadedAt,
    };
  } catch (error: any) {
    console.error('Error uploading image to Vercel Blob:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Upload multiple images to Vercel Blob storage
 * @param files - Array of {file, pathname} objects
 * @returns Array of upload results
 */
export const uploadMultipleImages = async (files: Array<{file: File, pathname: string}>): Promise<UploadResult[]> => {
  const uploadPromises = files.map(({ file, pathname }) => 
    uploadImage(file, pathname)
  );
  
  try {
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error('Error uploading multiple images:', error);
    throw error;
  }
};

/**
 * List all images in Vercel Blob storage
 * @param prefix - Optional prefix to filter results
 * @returns Array of blob objects
 */
export const listImages = async (prefix: string = ''): Promise<BlobInfo[]> => {
  try {
    const { blobs } = await list({
      prefix,
      limit: 1000,
    });
    
    return blobs.map(blob => ({
      url: blob.url,
      pathname: blob.pathname,
      size: blob.size,
      uploadedAt: blob.uploadedAt,
    }));
  } catch (error) {
    console.error('Error listing images from Vercel Blob:', error);
    return [];
  }
};

/**
 * Delete an image from Vercel Blob storage
 * @param url - The URL of the image to delete
 * @returns Success status
 */
export const deleteImage = async (url: string): Promise<boolean> => {
  try {
    await del(url);
    return true;
  } catch (error) {
    console.error('Error deleting image from Vercel Blob:', error);
    return false;
  }
};

/**
 * Get optimized image URL with transformations
 * @param blobUrl - The original Vercel Blob URL
 * @param options - Transformation options
 * @returns Optimized image URL
 */
export const getOptimizedBlobUrl = (blobUrl: string, options: OptimizationOptions = {}): string => {
  if (!blobUrl || !blobUrl.includes('vercel-storage.com')) {
    return blobUrl;
  }

  const {
    width,
    height,
    quality = 85,
    format = 'auto',
    fit = 'cover',
  } = options;

  const url = new URL(blobUrl);
  const params = new URLSearchParams();

  if (width) params.set('w', width.toString());
  if (height) params.set('h', height.toString());
  if (quality !== 85) params.set('q', quality.toString());
  if (format !== 'auto') params.set('f', format);
  if (fit !== 'cover') params.set('fit', fit);

  if (params.toString()) {
    url.search = params.toString();
  }

  return url.toString();
};

/**
 * Generate responsive srcSet for Vercel Blob images
 * @param blobUrl - The original Vercel Blob URL
 * @param sizes - Array of width sizes [400, 800, 1200]
 * @returns srcSet string
 */
export const getBlobResponsiveSrcSet = (blobUrl: string, sizes: number[] = [400, 800, 1200]): string => {
  if (!blobUrl || !blobUrl.includes('vercel-storage.com')) {
    return blobUrl;
  }

  return sizes
    .map(width => `${getOptimizedBlobUrl(blobUrl, { width })} ${width}w`)
    .join(', ');
};

/**
 * Preload a Vercel Blob image
 * @param blobUrl - The Vercel Blob URL to preload
 * @param options - Optimization options
 * @returns Promise that resolves when image is loaded
 */
export const preloadBlobImage = (blobUrl: string, options: OptimizationOptions = {}): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = getOptimizedBlobUrl(blobUrl, options);
  });
};