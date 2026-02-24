@echo off

echo ==== INSTALANDO SERVIÇO BSFechamentos ====
echo Esse .bat irá instalar o serviço BSFechamentos, para isso é necessário ter o Node.js instalado na máquina.
pause

echo Parando serviços semelhantes....
net stop BSFechamentos

echo Instalando Bibliotecas necessárias...
npm run install

echo Buildando serviço...
npm run build

echo Instalando serviço BSFechamentos...
npm run start
pause