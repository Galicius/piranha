# 🚀 Piranha Cocktail Bureau - GitHub Pages Deployment Guide

## Prerequisites
- GitHub account
- Your domain `piranha.si` configured with your domain registrar
- Git installed on your computer

## Step 1: Install GitHub Pages Package
```bash
cd frontend
yarn add --dev gh-pages
```

## Step 2: Create GitHub Repository
1. Go to [GitHub.com](https://github.com) and create a new repository
2. Name it something like `piranha-cocktail-bureau` or `piranha-website`
3. Make it **public** (required for GitHub Pages on free accounts)
4. Don't initialize with README (we already have files)

## Step 3: Initialize Git and Push to GitHub
```bash
# In your project root directory
git init
git add .
git commit -m "Initial commit: Piranha Cocktail Bureau website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

## Step 4: Deploy to GitHub Pages
```bash
cd frontend
yarn deploy
```

This will:
- Build your React app for production
- Create a `gh-pages` branch
- Deploy the built files to GitHub Pages

## Step 5: Configure GitHub Pages Settings
1. Go to your GitHub repository
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Select **gh-pages** branch and **/ (root)** folder
6. Click **Save**

## Step 6: Configure Your Domain (piranha.si)

### A. In GitHub Repository:
1. In **Settings > Pages**
2. Under **Custom domain**, enter: `piranha.si`
3. Check **Enforce HTTPS** (recommended)
4. Click **Save**

### B. With Your Domain Registrar:
You need to configure DNS records with your domain registrar. Add these DNS records:

**Option 1: Using A Records (Recommended)**
```
Type: A
Name: @ (or leave blank for root domain)
Value: 185.199.108.153

Type: A  
Name: @ (or leave blank for root domain)
Value: 185.199.109.153

Type: A
Name: @ (or leave blank for root domain)  
Value: 185.199.110.153

Type: A
Name: @ (or leave blank for root domain)
Value: 185.199.111.153
```

**Option 2: Using CNAME (Alternative)**
```
Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
```

## Step 7: Wait for DNS Propagation
- DNS changes can take 24-48 hours to fully propagate
- You can check status at: https://www.whatsmydns.net/

## Step 8: Verify Deployment
1. Visit `https://piranha.si` (may take time for DNS)
2. Initially accessible at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

## 🔄 Future Updates

To update your website:
```bash
# Make your changes to the code
git add .
git commit -m "Update website content"
git push origin main

# Deploy the changes
cd frontend
yarn deploy
```

## 🛠 Troubleshooting

### Common Issues:

**1. 404 Error on Refresh**
- This is normal for React Router on GitHub Pages
- The app handles routing client-side

**2. Domain Not Working**
- Check DNS settings with your registrar
- Ensure CNAME file contains only: `piranha.si`
- Wait for DNS propagation (up to 48 hours)

**3. HTTPS Certificate Issues**
- GitHub automatically provides SSL certificates
- May take a few hours after domain configuration

**4. Build Errors**
- Ensure all dependencies are installed: `yarn install`
- Check for any console errors: `yarn build`

## 📱 Performance Optimizations Already Included

Your site includes:
✅ **Lazy Loading** - Images load as needed
✅ **Code Splitting** - Pages load on demand  
✅ **Optimized Images** - WebP format with compression
✅ **Minified Assets** - Reduced file sizes
✅ **CDN Delivery** - Fast global loading via GitHub's CDN

## 🎯 Final Result

Once deployed, your professional cocktail bar website will be live at:
- **Primary URL**: https://piranha.si
- **Backup URL**: https://YOUR_USERNAME.github.io/YOUR_REPO_NAME

The site will feature:
- Beautiful dark theme with gold accents
- Image lightbox functionality
- Responsive design for all devices
- Fast loading and smooth animations
- Professional SEO optimization

## 🔐 Security & Best Practices

✅ **HTTPS Enforced** - Secure connection
✅ **No Sensitive Data** - All content is public-safe
✅ **Optimized Performance** - Fast loading times
✅ **Mobile Responsive** - Works on all devices
✅ **SEO Optimized** - Search engine friendly

---

**Need Help?** 
- GitHub Pages Documentation: https://docs.github.com/en/pages
- Custom Domain Setup: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site