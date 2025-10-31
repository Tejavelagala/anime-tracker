@echo off
echo ================================
echo   Anime Tracker Deployment
echo ================================
echo.

echo Step 1: Initializing Git...
git init
echo.

echo Step 2: Adding files...
git add .
echo.

echo Step 3: Creating commit...
git commit -m "Deploy: Complete Anime Tracker with all features"
echo.

echo Step 4: Setting up remote...
echo Please enter your GitHub username:
set /p username=Username: 
git remote add origin https://github.com/%username%/anime-tracker.git
echo.

echo Step 5: Pushing to GitHub...
git branch -M main
git push -u origin main
echo.

echo ================================
echo   Deployment Complete!
echo ================================
echo.
echo Next steps:
echo 1. Setup MongoDB Atlas at https://www.mongodb.com/cloud/atlas
echo 2. Deploy backend to Render at https://render.com
echo 3. Deploy frontend to Vercel at https://vercel.com
echo.
echo See DEPLOYMENT_GUIDE.md for detailed instructions
echo.
pause
