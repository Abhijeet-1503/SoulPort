@echo off
echo.
echo ==========================================
echo   GitHub Deployment Setup
echo ==========================================
echo.

echo Step 1: Create a new repository on GitHub
echo    - Go to https://github.com/new
echo    - Repository name: FutureSoulPortfolio
echo    - Make it public
echo    - Don't initialize with README (we already have one)
echo.

echo Step 2: Copy and run these commands:
echo.
echo git remote add origin https://github.com/YOURUSERNAME/FutureSoulPortfolio.git
echo git branch -M main
echo git push -u origin main
echo.

echo Step 3: Enable GitHub Pages
echo    - Go to repository Settings
echo    - Scroll to Pages section
echo    - Source: Deploy from a branch
echo    - Branch: main / (root)
echo    - Click Save
echo.

echo Step 4: Your site will be live at:
echo https://YOURUSERNAME.github.io/FutureSoulPortfolio
echo.

echo Replace YOURUSERNAME with your actual GitHub username
echo.
pause
