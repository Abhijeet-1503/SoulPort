@echo off
echo Starting Portfolio Website...
echo.
cd /d "o:\Main_Quest\FutureSoulPortfolio"
echo Current directory: %CD%
echo.
echo Installing dependencies if needed...
call npm install
echo.
echo Starting server...
call npx http-server . -p 3000 -o -c-1
pause
