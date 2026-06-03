@echo off
title Triviva Image WebP Converter
echo Starting Triviva Image WebP Converter...
cd /d "%~dp0"
python admin\convert_images.py
pause
