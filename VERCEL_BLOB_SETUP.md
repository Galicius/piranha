# Vercel Blob Storage Integration

This guide explains how to set up and use Vercel Blob storage for your cocktail images to improve loading performance.

## Overview

Vercel Blob storage provides:
- **Fast CDN delivery** - Images served from Vercel's global edge network
- **Automatic optimization** - Dynamic image resizing and format conversion
- **Better performance** - Reduced load times and improved user experience
- **Scalability** - No need to manage image storage infrastructure

## Setup Instructions

### 1. Create a Vercel Blob Store

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Storage** tab
3. Click **Create Database** → **Blob**
4. Choose a name for your blob store (e.g., "piranha-images")
5. Select your region (choose closest to your users)
6. Click **Create**

### 2. Get Your Access Token

1. In your newly created blob store, click **Settings**
2. Copy the **BLOB_READ_WRITE_TOKEN**
3. Keep this token secure - it provides full access to your blob storage

### 3. Configure Environment Variables

Add the token to your environment variables:

**For local development (.env file):**
```bash
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_your_token_here
```

**For production (Vercel deployment):**
1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add `BLOB_READ_WRITE_TOKEN` with your token value
4. Make sure it's available for all environments (Production, Preview, Development)

### 4. Install Dependencies

The `@vercel/blob` package is already installed. If you need to reinstall:

```bash
cd frontend
npm install @vercel/blob --legacy-peer-deps
```

## Migration Process

### Option 1: Using the Development Tool (Recommended)

1. Start your development server:
   ```bash
   cd frontend
   npm start
   ```

2. Navigate to the dev tools page:
   ```
   http://localhost:3000/dev-tools
   ```

3. Follow the migration wizard:
   - Test your Vercel Blob setup
   - Review images to be migrated
   - Start the migration process
   - Copy the updated mock data

### Option 2: Manual Migration

If you prefer to run the migration programmatically:

```javascript
import { migrateImages, testBlobSetup } from './src/scripts/migrateImages.js';

// Test setup first
const setupOk = await testBlobSetup();
if (setupOk) {
  await migrateImages();
}
```

## How It Works

### Image Resolution Priority

The system uses this priority order for images:

1. **Vercel Blob URL** (if available) - Fastest, optimized delivery
2. **Local images** (fallback) - Your existing images in `/public/images/`

### Automatic Optimization

Vercel Blob automatically optimizes images:

- **Format conversion**: WebP/AVIF for modern browsers
- **Dynamic resizing**: Different sizes based on device/viewport
- **Quality optimization**: Balanced quality vs file size
- **CDN caching**: Global edge network delivery

### Size Variants

The system provides these size variants:

- **thumb**: 400px width, 80% quality
- **medium**: 800px width, 85% quality  
- **large**: 1200px width, 90% quality
- **original**: No resizing

### Responsive Images

Images automatically generate responsive `srcSet`:

```html
<img 
  src="optimized-800w-image.webp"
  srcset="
    optimized-400w-image.webp 400w,
    optimized-800w-image.webp 800w,
    optimized-1200w-image.webp 1200w
  "
  sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
/>
```

## Usage Examples

### Basic Usage

```jsx
import OptimizedImage from './components/OptimizedImage';

<OptimizedImage
  src={imageUrl}
  alt="Cocktail description"
  size="medium"
  responsive={true}
  loading="lazy"
/>
```

### Manual URL Generation

```javascript
import { getOptimizedImageUrl, getResponsiveSrcSet } from './utils/images';

// Get optimized URL
const optimizedUrl = getOptimizedImageUrl(imageUrl, 'large');

// Get responsive srcSet
const srcSet = getResponsiveSrcSet(imageUrl);
```

### Preloading Critical Images

```javascript
import { preloadImage } from './utils/images';

// Preload hero images
await preloadImage(heroImageUrl, { width: 1200, quality: 90 });
```

## File Structure

```
frontend/src/
├── utils/
│   ├── blobStorage.js      # Core Vercel Blob utilities
│   ├── images.js           # Enhanced image utilities
│   └── imageMigration.js   # Migration helpers
├── components/
│   ├── OptimizedImage.jsx  # Enhanced image component
│   └── ImageMigrationTool.jsx # Dev migration tool
├── scripts/
│   └── migrateImages.js    # Migration script
└── pages/
    └── DevToolsPage.jsx    # Development tools page
```

## Performance Benefits

### Before (Local Images)
- Images served from your domain
- No optimization
- Fixed sizes
- No CDN caching

### After (Vercel Blob)
- Images served from global CDN
- Automatic format optimization (WebP/AVIF)
- Dynamic resizing
- Edge caching worldwide
- Lazy loading with intersection observer

## Troubleshooting

### Common Issues

**1. "BLOB_READ_WRITE_TOKEN is not defined"**
- Make sure the environment variable is set correctly
- Restart your development server after adding the token
- Check that the token is available in your deployment environment

**2. "Failed to upload image"**
- Verify your token has read/write permissions
- Check that the image file exists and is accessible
- Ensure you're not hitting rate limits

**3. "Images not loading"**
- Check browser network tab for failed requests
- Verify the blob URLs are accessible
- Ensure fallback to local images is working

**4. "Migration tool not accessible"**
- The dev tools page only works in development mode
- Make sure you're running `npm start` in development

### Debug Mode

Enable debug logging by adding to your .env:

```bash
DEBUG=vercel-blob
```

## Security Considerations

- **Token Security**: Never commit your `BLOB_READ_WRITE_TOKEN` to version control
- **Access Control**: The token provides full read/write access to your blob store
- **Environment Separation**: Use different blob stores for development/production if needed

## Cost Optimization

- **Image Formats**: Vercel automatically serves WebP/AVIF to reduce bandwidth
- **Caching**: Images are cached at the edge, reducing origin requests
- **Lazy Loading**: Only load images when they're needed
- **Size Optimization**: Use appropriate size variants for different contexts

## Monitoring

Monitor your blob storage usage:

1. Go to your Vercel Dashboard
2. Navigate to your blob store
3. Check the **Usage** tab for:
   - Storage used
   - Bandwidth consumed
   - Request count

## Next Steps

After successful migration:

1. **Update mock.js** with the new blob URLs
2. **Test thoroughly** in development and staging
3. **Deploy to production** with environment variables
4. **Monitor performance** improvements
5. **Remove local images** (optional, keep as backup)

## Support

If you encounter issues:

1. Check the [Vercel Blob documentation](https://vercel.com/docs/storage/vercel-blob)
2. Review the browser console for error messages
3. Test the setup using the development migration tool
4. Verify environment variables are correctly set