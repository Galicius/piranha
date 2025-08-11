# 📸 Image Management Guide - Piranha Cocktail Bureau

## 🗂 Current Image Setup

Your images are currently loaded from **external URLs** (Unsplash/Pexels) but I've created a complete local image system for you.

### **Current Status:**
- ✅ **External images**: Working (Unsplash/Pexels URLs)
- 🔄 **Local images**: Ready to use (folder structure created)
- 🎯 **Hybrid system**: Automatically falls back to external if local not found

## 📁 Image Folder Structure

```
frontend/public/images/
├── cocktails/
│   ├── signature/          # Your 6 signature cocktails
│   │   ├── black-gold-old-fashioned.webp
│   │   ├── piranha-negroni.webp
│   │   ├── nocturne-sour.webp
│   │   ├── amber-boulevardier.webp
│   │   ├── emerald-highball.webp
│   │   └── velvet-espresso.webp
│   ├── classics/           # Classic cocktail variations
│   └── seasonal/           # Seasonal specials
├── gallery/
│   ├── bar/               # Bar atmosphere photos
│   ├── ingredients/       # Close-up ingredient shots
│   └── process/           # Cocktail making process
├── branding/              # Logo, brand assets
└── ui/                    # Icons, UI elements
```

## 🚀 How to Add Your Own Images

### **Step 1: Prepare Your Images**
- **Format**: WebP preferred (smaller file size), JPEG as backup
- **Size**: 800px width for standard, 1200px for high-res
- **Quality**: 80-85% compression
- **Naming**: Use kebab-case (e.g., `black-gold-old-fashioned.webp`)

### **Step 2: Add Images to Folders**
Place your cocktail photos in the appropriate folders:

```bash
# Signature cocktails (main menu items)
frontend/public/images/cocktails/signature/

# Gallery/atmosphere photos
frontend/public/images/gallery/bar/

# Ingredient close-ups
frontend/public/images/gallery/ingredients/

# Process shots (making cocktails)
frontend/public/images/gallery/process/
```

### **Step 3: Images Automatically Work**
The system will automatically:
- ✅ **Use local images** when available
- ✅ **Fallback to external** if local image missing
- ✅ **Optimize loading** with proper sizing
- ✅ **Handle responsive** images for different screens

## 🎯 Recommended Images to Add

### **Priority 1: Signature Cocktails (6 images)**
1. `black-gold-old-fashioned.webp` - Dark, moody whiskey cocktail
2. `piranha-negroni.webp` - Red/orange Negroni with garnish
3. `nocturne-sour.webp` - Foamy sour with dramatic lighting
4. `amber-boulevardier.webp` - Rich amber cocktail being poured
5. `emerald-highball.webp` - Tall green/clear highball
6. `velvet-espresso.webp` - Dark espresso cocktail with foam

### **Priority 2: Gallery Images (8-12 images)**
- Bar interior shots (dark, moody atmosphere)
- Ingredient close-ups (citrus, herbs, spirits)
- Process shots (shaking, stirring, pouring)
- Finished cocktails in your actual bar setting

### **Priority 3: Branding Assets**
- High-res logo variations
- Brand colors/patterns
- Social media assets

## 🛠 Image Optimization Tips

### **For Best Performance:**
```bash
# Recommended image sizes:
- Thumbnail: 400px width
- Standard: 800px width  
- High-res: 1200px width
- Original: Keep under 2000px width
```

### **WebP Conversion:**
You can convert JPEG to WebP using:
- **Online**: squoosh.app, cloudconvert.com
- **Tools**: Photoshop, GIMP, ImageOptim
- **Command line**: `cwebp input.jpg -q 80 -o output.webp`

## 🔄 Current Fallback System

Right now your site uses this smart system:

1. **Checks for local image** in `/images/` folder
2. **Falls back to external URL** if local not found
3. **Optimizes loading** with proper sizing and lazy loading
4. **Works immediately** - no code changes needed

## 📊 Benefits of Local Images

### **Performance:**
- ✅ **Faster loading** - No external requests
- ✅ **Better caching** - Images cached with your site
- ✅ **Reliable** - No dependency on external services
- ✅ **Optimized** - Perfect sizes for your use case

### **Control:**
- ✅ **Consistent quality** - All images match your brand
- ✅ **No surprises** - External images can't change/disappear
- ✅ **SEO benefits** - Better site performance scores
- ✅ **Professional** - Your own branded photography

## 🎨 Photography Guidelines

### **Style Consistency:**
- **Dark backgrounds** - Match your noir theme
- **Gold accents** - Complement your brand colors
- **Moody lighting** - Professional bar atmosphere
- **High contrast** - Dramatic shadows and highlights

### **Composition:**
- **Close-ups** - Show cocktail details and garnishes
- **Process shots** - Behind-the-scenes cocktail making
- **Atmosphere** - Capture the bar's ambiance
- **Ingredients** - Beautiful ingredient photography

## 🚀 Next Steps

1. **Start with signature cocktails** - Add 6 main cocktail photos
2. **Test the system** - Upload one image and see it work
3. **Add gallery images** - Enhance the gallery section
4. **Optimize and refine** - Adjust sizes and quality as needed

Your image system is ready to go! Just add your photos to the folders and they'll automatically appear on your beautiful website. 🍸✨