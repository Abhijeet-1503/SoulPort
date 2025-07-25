@echo off
echo.
echo ==========================================
echo   Updating Existing GitHub Repository
echo ==========================================
echo.

echo Step 1: Setting up remote repository
echo GitHub Username: Abhijeet-1503
echo Repository: SoulPort

echo.
echo Adding remote repository...
git remote add origin https://github.com/Abhijeet-1503/SoulPort.git

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
echo https://Abhijeet-1503.github.io/SoulPort
echo.
echo Make sure GitHub Pages is enabled in repository settings.
echo.
pause
