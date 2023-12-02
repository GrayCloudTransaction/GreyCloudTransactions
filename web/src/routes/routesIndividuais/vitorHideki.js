var express = require("express");
var rota = express.Router();
var vitorHidekiController = require("../../controllers/controllersIndividuais/vitorHidekiController");

function info(rota){
    console.log(`[Hideki Router] Rota: ${rota};`);
}

rota.get("/getQtdTotalProcessos/:idServidor", (req, res) => {
    info("getQtdTotalProcessos");
    vitorHidekiController.getQtdTotalProcessos(req, res);
});

rota.get("/getProcessos/:idServidor", (req, res) => {
    info("getProcessos");
    vitorHidekiController.getProcessos(req, res);
});

rota.get("/getProcessosMaiorConsumo/:idServidor", (req, res) => {
    info("getProcessosMaiorConsumo");
    vitorHidekiController.getProcessosMaiorConsumo(req, res);
});

rota.post("/getProcessTree/:idServidor", (req, res) => {
    info("getProcessTree");
    vitorHidekiController.getProcessTree(req, res);
});

module.exports = rota;