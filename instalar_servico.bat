@echo off

:: ---- FORCAR EXECUCAO COMO ADMIN ----
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo Solicitando permissao de administrador...
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

:: ---- IR PARA PASTA DO SCRIPT ----
cd /d "%~dp0"

title Instalador BSFechamentos
color 0A

echo ======================================
echo     INSTALADOR DO SERVICO BSFechamentos
echo ======================================
echo.

echo Verificando Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERRO: Node.js nao encontrado!
    echo Instale o Node.js antes de continuar.
    pause
    exit /b
)

echo Node encontrado.
echo.

echo ================================
echo CONFIGURACAO DO ARQUIVO .ENV
echo ================================
echo.

set /p WATCH_FOLDER=Digite o caminho da pasta monitorada: 
set /p API_URL=Digite a URL da API: 
set /p API_KEY=Digite a API KEY: 

echo.
echo Salvando arquivo .env...

(
echo WATCH_FOLDER=%WATCH_FOLDER%
echo API_URL=%API_URL%
echo API_KEY=%API_KEY%
) > ".env"

echo.
echo Arquivo .env criado com sucesso!

echo Parando servico se existir...
net stop BSFechamentos >nul 2>nul

echo.
echo Instalando bibliotecas...
call npm install
if %errorlevel% neq 0 goto erro

echo.
echo Buildando servico...
call npm run build
if %errorlevel% neq 0 goto erro

echo.
echo Iniciando servico BSFechamentos...
call npm run start
if %errorlevel% neq 0 goto erro

echo.
echo ======================================
echo INSTALACAO FINALIZADA COM SUCESSO
echo ======================================
pause
exit /b

:erro
color 0C
echo.
echo ======================================
echo OCORREU UM ERRO DURANTE O PROCESSO
echo ======================================
pause
exit /b 1