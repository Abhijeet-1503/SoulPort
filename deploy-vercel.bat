@echo off
echo.
echo ==========================================
echo   Vercel Deployment Setup
echo ==========================================
echo.

echo Installing Vercel CLI...
npm install -g vercel

echo.
echo Installing project dependencies...
npm install

echo.
echo ==========================================
echo   Deploying to Vercel
echo ==========================================
echo.

echo Step 1: Login to Vercel (if not already logged in)
vercel login

echo.
echo Step 2: Deploy to production
vercel --prod

echo.
echo ==========================================
echo   Deployment Complete!
echo ==========================================
echo.
echo Your portfolio is now live on Vercel!
echo Check the URL provided above.
echo.
echo For future deployments, just run:
echo   npm run deploy
echo.
pause
