# Design Document

## Overview

The image replacement system will systematically replace existing images on the Piranha Cocktail Bureau website with user-provided images while maintaining the existing hybrid image system architecture. The solution leverages the current image utilities and folder structure, adding image processing capabilities and a systematic replacement workflow.

## Architecture

### Current System Analysis
The site currently uses a sophisticated hybrid image system:
- **Local Images**: Stored in `frontend/public/images/` with organized folder structure
- **Fallback System**: External URLs (Unsplash/Pexels) used when local images unavailable
- **Image Utilities**: `frontend/src/utils/images.js` provides URL resolution and optimization
- **Optimized Component**: `OptimizedImage.jsx` handles lazy loading and performance
- **Mock Data**: `frontend/src/mock.js` defines image mappings and references

### Replacement Strategy
The replacement process will work within the existing architecture by:
1. **Preserving Structure**: Maintaining current folder organization and naming conventions
2. **Batch Processing**: Processing multiple images with consistent optimization settings
3. **Verification System**: Ensuring all replaced images work with existing components
4. **Rollback Capability**: Keeping backup of original images for safety

## Components and Interfaces

### 1. Image Processing Pipeline

```javascript
// Image processing workflow
const ImageProcessor = {
  // Analyze user-provided images
  analyzeImages(imageFiles) {
    return {
      format: 'JPEG/PNG/WebP',
      dimensions: { width, height },
      fileSize: 'bytes',
      suggestedCategory: 'signature|classics|seasonal|gallery',
      suggestedName: 'kebab-case-name'
    };
  },
  
  // Optimize images for web
  optimizeImage(imageFile, targetSpecs) {
    return {
      webp: 'optimized WebP version',
      jpeg: 'fallback JPEG version', 
      sizes: ['400w', '800w', '1200w'],
      quality: 80
    };
  },
  
  // Generate appropriate filenames
  generateFilename(originalName, category, index) {
    return 'kebab-case-filename.webp';
  }
};
```

### 2. Image Mapping System

```javascript
// Track old vs new image assignments
const ImageMapper = {
  // Create mapping between old and new images
  createMapping(oldImages, newImages) {
    return {
      'old-image-id': {
        oldPath: 'gallery/bar/old-image.webp',
        newPath: 'gallery/bar/new-image.webp',
        fallbackUrl: 'https://external-url.com/image.jpg',
        category: 'gallery/bar',
        status: 'pending|completed|failed'
      }
    };
  },
  
  // Update mock.js references
  updateImageReferences(mapping) {
    // Update galleryImages array
    // Update signatureCocktails localImagePath
    // Preserve fallback URLs
  }
};
```

### 3. Verification System

```javascript
// Verify replaced images work correctly
const ImageVerifier = {
  // Check if images load correctly
  verifyImageLoading(imagePaths) {
    return Promise.all(imagePaths.map(path => 
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve({ path, status: 'success' });
        img.onerror = () => resolve({ path, status: 'failed' });
        img.src = path;
      })
    ));
  },
  
  // Validate image dimensions and quality
  validateImageSpecs(imagePath) {
    return {
      dimensions: { width, height },
      fileSize: 'bytes',
      format: 'webp|jpeg|png',
      meetsRequirements: boolean
    };
  }
};
```

## Data Models

### Image Replacement Record
```javascript
{
  id: 'unique-replacement-id',
  originalImage: {
    path: 'gallery/bar/old-image.webp',
    fallbackUrl: 'https://external-url.com/old.jpg',
    category: 'gallery/bar',
    usedIn: ['galleryImages[0]', 'signatureCocktails[1]']
  },
  newImage: {
    originalFile: 'user-provided-file.jpg',
    processedPath: 'gallery/bar/new-image.webp',
    optimizedSizes: ['400w', '800w', '1200w'],
    fileSize: 245000,
    dimensions: { width: 1200, height: 800 }
  },
  status: 'pending|processing|completed|failed',
  timestamp: '2025-01-11T10:00:00Z',
  notes: 'Additional processing notes'
}
```

### Category Mapping
```javascript
{
  'signature-cocktails': {
    folder: 'cocktails/signature',
    expectedImages: 6,
    namingPattern: 'cocktail-name.webp',
    references: ['signatureCocktails[].localImagePath']
  },
  'gallery-bar': {
    folder: 'gallery/bar', 
    expectedImages: 'variable',
    namingPattern: 'descriptive-name.webp',
    references: ['galleryImages[].localPath']
  }
  // ... other categories
}
```

## Error Handling

### Image Processing Errors
- **Invalid Format**: Convert unsupported formats or provide clear error message
- **File Too Large**: Compress or resize images that exceed size limits
- **Corrupted Files**: Skip corrupted images and report in final summary
- **Optimization Failure**: Fall back to original image with warning

### System Integration Errors
- **Path Conflicts**: Handle cases where new images conflict with existing paths
- **Reference Updates**: Ensure all code references are properly updated
- **Fallback Preservation**: Maintain external URLs as backup system

### Rollback Procedures
- **Backup System**: Create backup of original images before replacement
- **Selective Rollback**: Allow rolling back individual images if issues occur
- **Full Restoration**: Provide option to restore entire original image set

## Testing Strategy

### Unit Tests
- **Image Processing**: Test optimization, resizing, format conversion
- **Path Generation**: Verify correct filename and path generation
- **Mapping Logic**: Test old-to-new image mapping functionality

### Integration Tests
- **Component Loading**: Verify OptimizedImage component works with new images
- **Fallback System**: Test that external URLs still work as fallbacks
- **Mock Data Updates**: Ensure mock.js references are correctly updated

### Visual Verification
- **Manual Review**: Visual inspection of all replaced images on site
- **Responsive Testing**: Check images display correctly across device sizes
- **Performance Testing**: Verify loading times meet performance requirements

### Automated Verification
- **Image Loading**: Automated tests to verify all images load successfully
- **Size Validation**: Check that optimized images meet size requirements
- **Format Verification**: Ensure WebP format is properly generated with JPEG fallbacks

## Implementation Phases

### Phase 1: Analysis and Preparation
1. Analyze user-provided images and categorize them
2. Create mapping between existing and new images
3. Generate optimized versions of all new images
4. Create backup of existing images

### Phase 2: Systematic Replacement
1. Replace images in each category (signature → classics → seasonal → gallery)
2. Update mock.js references for each replaced image
3. Verify each replacement works correctly
4. Document any issues or manual adjustments needed

### Phase 3: Verification and Cleanup
1. Run comprehensive verification tests
2. Check visual consistency across the site
3. Clean up any temporary files or backups
4. Generate final replacement report

This design maintains the existing system's strengths while adding systematic image replacement capabilities that ensure quality, performance, and maintainability.