@echo off
title Triviva JSON Admin Portal
echo ===================================================
echo   Starting Triviva JSON Administration Server...
echo ===================================================
echo.

:: Start server in background
start "" /B python admin/server.py

:: Wait for server to bind port
timeout /t 2 /nobreak >nul

echo opening default web browser...
start http://localhost:8090

echo Server is running on http://localhost:8090
echo To close the server, close this command prompt window.
echo.
pause
