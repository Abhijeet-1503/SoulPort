# 🚀 GitHub Deployment Guide

## Quick Setup for GitHub Pages

### 1. Create GitHub Repository

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial portfolio setup"

# Add GitHub remote (replace with your username)
git remote add origin https://github.com/yourusername/FutureSoulPortfolio.git

# Push to GitHub
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **"Deploy from a branch"**
5. Choose **"main"** branch and **"/ (root)"** folder
6. Click **Save**

### 3. Your Site Will Be Live At:
```
https://yourusername.github.io/FutureSoulPortfolio
```

## Alternative: Using GitHub Actions (Automated)

The repository includes a GitHub Actions workflow that automatically deploys your site when you push to the main branch.

### To use GitHub Actions:

1. Go to repository **Settings** → **Pages**
2. Under **Source**, select **"GitHub Actions"**
3. The workflow will automatically deploy on every push to main

## 🌐 Other Deployment Options

### Netlify
1. Drag and drop your project folder to Netlify
2. Or connect your GitHub repository
3. Automatic deployments on git push

### Vercel
1. Import your GitHub repository
2. Zero configuration needed
3. Automatic deployments

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 📝 Customization Before Deployment

### Update Personal Information
- Edit `index.html` with your details
- Update social media links
- Replace placeholder content

### Update Repository URLs
- Update `README.md` with your GitHub username
- Update repository URLs in documentation

### SEO Optimization
- Update `index.html` meta tags
- Add your domain to Open Graph tags
- Update `robots.txt` with your domain

## 🔧 Troubleshooting

### Common Issues:

1. **404 Error**: Make sure `index.html` is in the root directory
2. **CSS/JS Not Loading**: Check file paths are relative (no leading `/`)
3. **GitHub Pages Not Updating**: Check Actions tab for deployment status

### Performance Tips:
- Images are optimized
- CSS/JS are minified in production
- Lazy loading is implemented
- All resources are properly cached

## ✅ Pre-Deployment Checklist

- [ ] Updated personal information
- [ ] Tested locally with `npm start`
- [ ] Checked all links work
- [ ] Verified mobile responsiveness
- [ ] Updated meta tags and SEO
- [ ] Added custom domain (optional)

Your portfolio is now ready for deployment! 🎉
