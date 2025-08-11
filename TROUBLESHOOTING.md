# 🔧 GitHub Pages Troubleshooting Guide

## Issue: Site Shows README Instead of React App

If your site at `piranha.si` is showing the README file instead of your React app, here are the steps to fix it:

### 1. Check GitHub Pages Settings
1. Go to your GitHub repository
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Ensure **Source** is set to **"GitHub Actions"** (not "Deploy from a branch")

### 2. Check Repository Structure
Your repository should look like this:
```
your-repo/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── build/ (created during build)
├── README.md
└── DEPLOYMENT.md
```

### 3. Check GitHub Actions Logs
1. Go to **Actions** tab in your repository
2. Click on the latest workflow run
3. Check the "Build" job logs
4. Look for the "List build contents (debug)" step
5. Verify that `frontend/build/` contains:
   - `index.html`
   - `static/` folder with CSS/JS files
   - Other React build files

### 4. Common Issues & Solutions

**Issue: Build folder is empty**
- Check if `yarn build` runs successfully locally
- Ensure all dependencies are installed
- Check for build errors in the Actions logs

**Issue: Wrong source selected**
- In Settings > Pages, source must be "GitHub Actions"
- NOT "Deploy from a branch"

**Issue: Custom domain not working**
- Ensure `CNAME` file contains only: `piranha.si`
- Check DNS settings with your domain registrar
- Wait up to 48 hours for DNS propagation

**Issue: 404 errors on page refresh**
- The `404.html` file should handle React Router
- Ensure both `404.html` and updated `index.html` are deployed

### 5. Manual Verification Steps

**Test locally:**
```bash
cd frontend
yarn build
cd build
python -m http.server 8000
# Visit http://localhost:8000
```

**Check build output:**
```bash
cd frontend
yarn build
ls -la build/
# Should see index.html, static/, etc.
```

### 6. Force Rebuild
If nothing else works:
1. Make a small change to any file
2. Commit and push to trigger new deployment
3. Check Actions tab for new workflow run

### 7. DNS Verification
Check if your domain is properly configured:
```bash
nslookup piranha.si
# Should show GitHub Pages IPs:
# 185.199.108.153
# 185.199.109.153
# 185.199.110.153
# 185.199.111.153
```

## Expected Result
After fixing, your site should show:
- ✅ Beautiful dark cocktail bar website
- ✅ Working navigation between pages
- ✅ Image lightbox functionality
- ✅ Responsive design
- ✅ Custom domain `piranha.si` working

## Still Having Issues?
1. Check the GitHub Actions logs for specific error messages
2. Ensure your repository is public (required for free GitHub Pages)
3. Verify all files are committed and pushed to the `main` branch
4. Try accessing the site via the GitHub Pages URL first: `https://yourusername.github.io/your-repo-name`