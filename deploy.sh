@echo off
echo Starting deployment process for Brick It Web App...

REM Check if Netlify CLI is installed
where netlify >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Netlify CLI is not installed.
    echo Installing Netlify CLI globally...
    npm install -g netlify-cli
)

REM Ensure we're in the app directory
cd "%~dp0"

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    if %ERRORLEVEL% NEQ 0 (
        echo Failed to install dependencies
        exit /b 1
    )
)

REM Build the project
echo Building the project...
npm run build
if %ERRORLEVEL% NEQ 0 (
    echo Build failed
    exit /b 1
)

REM Check if user is logged in to Netlify
echo Checking Netlify login status...
netlify status >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Please log in to Netlify:
    netlify login
)

REM Deploy to Netlify
echo Deploying to Netlify...
netlify deploy --prod

echo Deployment process completed! 