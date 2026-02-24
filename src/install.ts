import { Service } from "node-windows";
import path from "path";
import notifier from "node-notifier";

const svc = new Service({
  name: "BSFechamentos",
  description: "Monitor XML",

  script: path.resolve("dist/main.js")
});

function installFresh() {

  if (svc.exists) {

    console.log("Serviço já existe ? removendo...");

    svc.on("uninstall", () => {
      console.log("Removido. Instalando versão nova...");
      svc.install();
    });

    svc.uninstall();

  } else {

    svc.install();

  }

}

svc.on("install", () => {
  console.log("Instalado. Iniciando...");
  svc.start();
  notifier.notify({
    title: "BSFechamentos",
    message: "Serviço instalado e iniciado"
  });
});

installFresh();