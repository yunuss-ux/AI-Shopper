@echo off
title AI Shopper Baslatici
color 0D

echo ===================================================
echo AI Shopper Projesi Baslatiliyor...
echo Iki sunucu da (Frontend ve Backend) ayaga kaldiriliyor!
echo ===================================================

:: Bat dosyasinin calistigi ana klasore (en dis klasore) git
cd /d "%~dp0"

:: Backend'i ayri bir pencerede baslat
echo Backend baslatiliyor...
start cmd /k "cd backend && npm run dev"

:: Frontend'i ayri bir pencerede baslat
echo Frontend baslatiliyor...
start cmd /k "cd frontend && npm run dev"

:: Sunucularin hazir olmasi icin 5 saniye bekle
echo Tarayici aciliyor...
timeout /t 5 /nobreak >nul

:: Frontend genelde Vite ile 5173 portunda calisir
start http://localhost:5173

echo.
echo Islem tamam! Bu ana siyah pencereyi kapatabilirsiniz.
echo (Acilan diger 2 terminal penceresini arka planda acik birakin)
timeout /t 3 >nul