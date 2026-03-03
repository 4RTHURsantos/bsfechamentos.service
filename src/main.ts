import chokidar from "chokidar";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import notifier from "node-notifier";
import axios from "axios";
import { XMLBuilder, XMLParser } from "fast-xml-parser";

dotenv.config();

function notify(message: string) {
  notifier.notify({
    title: "BSFechamentos",
    message
  });
}

function createLog(message: string) {
  const logPath = path.join("C:\\Logs", "BSFechamentosService.log");
  fs.mkdirSync("C:\\Logs", { recursive: true });

  if (!fs.existsSync(logPath)) {
    fs.writeFileSync(logPath, `[${new Date().toISOString()}] Log criado\n`);
  } else {

  }

  fs.writeFileSync(logPath, fs.existsSync(logPath) ? fs.readFileSync(logPath, "utf-8") + `[${new Date().toISOString()}] ${message}\n` : `[${new Date().toISOString()}] ${message}\n`);
}

const folder = process.env.WATCH_FOLDER;
const API_URL = process.env.API_URL || "http://localhost:3000/api/fechamentos";

if (!folder) {
  notify("WATCH_FOLDER não definido");
  createLog("WATCH_FOLDER não definido");
  process.exit(1);
}



createLog(`Monitorando: ${folder}`);
notify(`Monitorando: ${folder}`);

const watcher = chokidar.watch(folder, {
  persistent: true,
  ignoreInitial: true,
  depth: 99,
  awaitWriteFinish: {
    stabilityThreshold: 3000,
    pollInterval: 500
  }
});

watcher.on("add", async (filePath) => {

  if (path.extname(filePath).toLowerCase() !== ".xml") return;

  createLog(`Novo XML: ${filePath}`);

  try {

    const xml_parsed = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "_@", parseTagValue: false, parseAttributeValue: false }).parse(fs.readFileSync(filePath, "utf-8"))
    const xml = new XMLBuilder({ ignoreAttributes: false, attributeNamePrefix: "_@", format: false}).build(xml_parsed);
    const nfe = xml_parsed.nfeProc.NFe.infNFe

    const response = await axios.post(
      API_URL,
      {
        event: 'nfe.new',
        nfe_mod: nfe.ide.mod,
        nfe_key: nfe["_@Id"],
        nfe_number: nfe.ide.nNF,
        nfe_series: nfe.ide.serie,
        issue_date: nfe.ide.dhEmi,
        document: nfe.emit.CNPJ,
        xml
      },
      {
        headers: {
          "Content-Type": "application/json"
        },
        maxBodyLength: Infinity,
        timeout: 30000
      }
    );

    createLog(`XML processado com sucesso: ${response.status}`);

  } catch (err: any) {
    createLog(`Erro processando XML: ${err} - ${err.response?.data?.message || 'unknown error'}`);
    notify(`Erro processando XML: ${err}`);
  }

});