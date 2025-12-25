@echo off
echo Starting PathMakers System...

:: Start Backend in a new PowerShell window
echo Starting Backend...
start powershell -NoExit -Command "cd backend; node server.js"

:: Start Frontend in the current window
echo Starting Frontend...
cd frontend
npm run dev

pause
