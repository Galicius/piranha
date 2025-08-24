// Utility functions for migrating images to Vercel Blob storage
import { uploadImage } from './blobStorage';

interface UploadResult {
  localPath: string;
  blobUrl?: string;
  blobPath?: string;
  success: boolean;
  error?: string;
}

interface GalleryImage {
  id: string;
  localPath: string;
  blobUrl: string | null;
  alt: string;
}

/**
 * Convert a local image path to a Vercel Blob path
 * @param localPath - Local image path (e.g., "cocktails/signature/old-fashioned.webp")
 * @returns Blob storage path
 */
export const getBlobPath = (localPath: string): string => {
  // Remove any leading slashes and ensure consistent path format
  const cleanPath = localPath.replace(/^\/+/, '');
  return `images/${cleanPath}`;
};

/**
 * Fetch a local image file and convert it to a File object
 * @param localPath - Local image path
 * @returns File object ready for upload
 */
export const fetchLocalImageAsFile = async (localPath: string): Promise<File> => {
  try {
    const imageUrl = `/images/${localPath}`;
    
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    
    const blob = await response.blob();
    const filename = localPath.split('/').pop() || 'image';
    
    return new File([blob], filename, { type: blob.type });
  } catch (error) {
    console.error(`Error fetching local image ${localPath}:`, error);
    throw error;
  }
};

/**
 * Upload a single cocktail image to Vercel Blob
 * @param localPath - Local image path
 * @returns Upload result with blob URL
 */
export const uploadCocktailImage = async (localPath: string): Promise<UploadResult> => {
  try {
    const file = await fetchLocalImageAsFile(localPath);
    const blobPath = getBlobPath(localPath);
    
    const result = await uploadImage(file, blobPath);
    
    if (result.success) {
      console.log(`✅ Uploaded ${localPath} to ${result.url}`);
      return {
        localPath,
        blobUrl: result.url,
        blobPath: result.pathname,
        success: true,
      };
    } else {
      console.error(`❌ Failed to upload ${localPath}:`, result.error);
      return {
        localPath,
        success: false,
        error: result.error,
      };
    }
  } catch (error: any) {
    console.error(`❌ Error uploading ${localPath}:`, error);
    return {
      localPath,
      success: false,
      error: error.message,
    };
  }
};

/**
 * Upload all cocktail images to Vercel Blob
 * @param imagePaths - Array of local image paths
 * @returns Array of upload results
 */
export const uploadAllCocktailImages = async (imagePaths: string[]): Promise<UploadResult[]> => {
  console.log(`🚀 Starting upload of ${imagePaths.length} images to Vercel Blob...`);
  
  const uploadPromises = imagePaths.map(async (localPath) => {
    return await uploadCocktailImage(localPath);
  });
  
  try {
    const results = await Promise.all(uploadPromises);
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);
    
    console.log(`✅ Successfully uploaded ${successful.length} images`);
    if (failed.length > 0) {
      console.log(`❌ Failed to upload ${failed.length} images:`, failed);
    }
    
    return results;
  } catch (error) {
    console.error('❌ Error during batch upload:', error);
    throw error;
  }
};

/**
 * Generate updated mock data with Vercel Blob URLs
 * @param uploadResults - Results from uploadAllCocktailImages
 * @param originalGalleryImages - Original gallery images array
 * @returns Updated gallery images with blob URLs
 */
export const generateUpdatedMockData = (uploadResults: UploadResult[], originalGalleryImages: GalleryImage[]): GalleryImage[] => {
  const urlMap = new Map<string, string>();
  
  // Create a map of local paths to blob URLs
  uploadResults.forEach(result => {
    if (result.success && result.blobUrl) {
      urlMap.set(result.localPath, result.blobUrl);
    }
  });
  
  // Update gallery images with blob URLs
  return originalGalleryImages.map(image => {
    const blobUrl = urlMap.get(image.localPath);
    if (blobUrl) {
      return {
        ...image,
        blobUrl, // Add blob URL
        localPath: image.localPath, // Keep local path as fallback
      };
    }
    return image;
  });
};

/**
 * Batch upload with progress tracking
 * @param imagePaths - Array of local image paths
 * @param onProgress - Progress callback (current, total, currentImage)
 * @returns Array of upload results
 */
export const uploadWithProgress = async (
  imagePaths: string[], 
  onProgress?: (current: number, total: number, currentImage: string) => void
): Promise<UploadResult[]> => {
  const results: UploadResult[] = [];
  
  for (let i = 0; i < imagePaths.length; i++) {
    const localPath = imagePaths[i];
    
    if (onProgress) {
      onProgress(i + 1, imagePaths.length, localPath);
    }
    
    const result = await uploadCocktailImage(localPath);
    results.push(result);
    
    // Small delay to avoid overwhelming the API
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return results;
};

/**
 * Test Vercel Blob setup
 * @returns Promise that resolves to true if setup is working
 */
export const testBlobSetup = async (): Promise<boolean> => {
  try {
    const { listImages } = await import('./blobStorage');
    await listImages('images/');
    return true;
  } catch (error) {
    console.error('Blob setup test failed:', error);
    return false;
  }
};