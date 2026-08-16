@echo off
title EduJustice Local Server
cd /d "%~dp0"
where npm >nul 2>nul
if errorlevel 1 (
  echo Node.js and npm are required to start EduJustice.
  echo Install Node.js, then run this file again.
  pause
  exit /b 1
)
if not exist node_modules (
  echo Installing EduJustice dependencies...
  call npm install
  if errorlevel 1 (
    echo Installation failed. Check the internet connection and try again.
    pause
    exit /b 1
  )
)
echo Starting EduJustice at http://127.0.0.1:5173/
call npm start
pause
