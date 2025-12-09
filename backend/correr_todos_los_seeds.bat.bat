@echo off
title Ejecutando TODOS los seeds desde /backend...
echo ============================================
echo   INICIANDO PROCESO DE SEED AUTOMATICO
echo ============================================
echo.

REM --- MOVERSE A LA CARPETA DONDE ESTA ESTE .BAT ---
cd /d "%~dp0"

echo Ubicación actual:
cd
echo.

REM --- INSTALAR DEPENDENCIAS SI NO EXISTEN ---
if not exist "node_modules" (
    echo Instalando dependencias...
    npm install
    echo.
)

echo Buscando archivos .js dentro de backend...
echo.

REM --- EJECUTAR TODOS LOS SEEDS ---
for %%f in (seed_*.js) do (
    echo Ejecutando: %%f
    node "%%f"
    echo --------------------------------------------
)

echo.
echo ============================================
echo   TODOS LOS SEEDS HAN SIDO EJECUTADOS
echo ============================================
pause

