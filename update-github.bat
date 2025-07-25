@echo off
echo.
echo ==========================================
echo   Updating Existing GitHub Repository
echo ==========================================
echo.

echo Step 1: Setting up remote repository
echo Please enter your GitHub username:
set /p username="GitHub Username: "

echo.
echo Adding remote repository...
git remote add origin https://github.com/%username%/FutureSoulPortfolio.git

echo.
echo Step 2: Checking if remote was added successfully...
git remote -v

echo.
echo Step 3: Pushing all updates to GitHub...
git push -u origin main

echo.
echo ==========================================
echo   Repository Updated Successfully!
echo ==========================================
echo.
echo Your enhanced portfolio is now live at:
echo https://%username%.github.io/FutureSoulPortfolio
echo.
echo Make sure GitHub Pages is enabled in repository settings.
echo.
pause
