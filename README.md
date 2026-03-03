# 🖥️ Client XML Sender Service (node-windows)

Serviço Windows desenvolvido em **Node.js** utilizando **node-windows**, responsável por coletar e enviar arquivos **XML** para um servidor central.

O serviço é instalado diretamente nas máquinas dos clientes e executa em segundo plano, garantindo o envio automático e contínuo dos documentos para a API concentradora.

## 🏗️ Funcionamento

1. O serviço monitora um diretório local configurado.
2. Ao identificar novos arquivos XML, realiza a leitura do conteúdo.
3. O XML é enviado via requisição HTTP para o servidor central.
4. Após envio bem-sucedido, o arquivo pode ser movido, marcado ou removido (dependendo da estratégia definida).

## 🎯 Objetivo

Automatizar o envio de documentos XML gerados localmente para um servidor central, garantindo sincronização entre unidades e centralização das informações.

## ⚙️ Características

- Execução em segundo plano como **Serviço do Windows**
- Inicialização automática com o sistema operacional
- Envio via HTTP/HTTPS
- Tratamento de falhas e tentativas de reenvio
- Log de eventos para auditoria e diagnóstico

## 📦 Estrutura Conceitual
Cliente (Windows)
└── Serviço Node.js (node-windows)
├── Monitoramento de pasta
├── Leitura de XML
├── Envio HTTP
└── Controle de status de envio


## 🧩 Papel no Ecossistema

Este serviço atua como a ponta de coleta, enquanto a API em NestJS funciona como concentrador central, organizando os arquivos por empresa e data.
