@echo off
echo ========================================
echo Anime Tracker - Full Stack Setup
echo ========================================
echo.

echo [1/4] Installing Frontend Dependencies...
call npm install --legacy-peer-deps
if %errorlevel% neq 0 (
    echo ERROR: Frontend installation failed!
    pause
    exit /b 1
)
echo Frontend dependencies installed successfully!
echo.

echo [2/4] Installing Backend Dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend installation failed!
    pause
    exit /b 1
)
echo Backend dependencies installed successfully!
cd ..
echo.

echo [3/4] Checking MongoDB...
sc query MongoDB >nul 2>&1
if %errorlevel% equ 0 (
    echo MongoDB service found!
    net start MongoDB >nul 2>&1
    echo MongoDB is running.
) else (
    echo WARNING: MongoDB service not found!
    echo Please install MongoDB or use MongoDB Atlas.
    echo Visit: https://www.mongodb.com/try/download/community
)
echo.

echo [4/4] Setup Complete!
echo.
echo ========================================
echo NEXT STEPS:
echo ========================================
echo 1. Start Backend:
echo    cd server
echo    npm start
echo.
echo 2. Start Frontend (in new terminal):
echo    npm run dev
echo.
echo 3. Open browser:
echo    http://localhost:5173
echo.
echo For more info, see README_FULLSTACK.md
echo ========================================
pause
