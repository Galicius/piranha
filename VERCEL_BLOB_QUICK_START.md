# Vercel Blob Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### 1. Get Your Vercel Blob Token
1. Go to [Vercel Dashboard](https://vercel.com/dashboard) → Storage
2. Create a new Blob store (or use existing)
3. Copy your `BLOB_READ_WRITE_TOKEN`

### 2. Add Environment Variable
Add to your `frontend/.env` file:
```bash
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_your_token_here
```

### 3. Test & Migrate
1. Start your dev server: `npm start`
2. Visit: `http://localhost:3000/dev-tools`
3. Click "Test Vercel Blob Setup"
4. Click "Start Migration" 
5. Copy the updated mock data when complete

### 4. Update Your Code
Replace the `galleryImages` array in `frontend/src/mock.js` with the generated code.

## ✅ What You Get

- **Faster loading**: Images served from Vercel's global CDN
- **Auto-optimization**: WebP/AVIF formats, dynamic resizing
- **Better UX**: Lazy loading, responsive images, error handling
- **Scalability**: No more local image management

## 🔧 Key Files Added

- `frontend/src/utils/blobStorage.js` - Core Vercel Blob utilities
- `frontend/src/utils/imageMigration.js` - Migration helpers  
- `frontend/src/components/OptimizedImage.jsx` - Enhanced image component
- `frontend/src/components/ImageMigrationTool.jsx` - Dev migration UI
- `frontend/src/pages/DevToolsPage.jsx` - Development tools page

## 📊 Performance Impact

**Before**: Local images, no optimization, single size
**After**: CDN delivery, auto WebP/AVIF, responsive sizes, edge caching

Your cocktail images will load significantly faster, especially for users far from your server location.

## 🛠 Troubleshooting

**Images not loading?** Check browser console and verify your token is set correctly.

**Migration failing?** Ensure your local images exist in `frontend/public/images/` and are accessible.

**Dev tools not showing?** Make sure you're in development mode (`npm start`).

For detailed setup instructions, see `VERCEL_BLOB_SETUP.md`.