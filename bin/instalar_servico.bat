@echo off

==== INSTALANDO SERVIÇO BSFechamentos ====

echo Parando serviços semelhantes....
net stop BSFechamentos

echo Instalando Bibliotecas necessárias...
npm run install

echo Buildando serviço...
npm run build

echo Instalando serviço BSFechamentos...
npm run start