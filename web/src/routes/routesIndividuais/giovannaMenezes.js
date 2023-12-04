var express = require("express");
var rota = express.Router();
var giovannaMenezesController = require("../../controllers/controllersIndividuais/giovannaMenezesController");

function info(rota) {
    console.log(`[Giovanna Menezes Router] - Rota: ${rota}`);
}


rota.get("/getProcessos/:id_servidor", (req, res) => {
    info("Buscar processos");
    giovannaMenezesController.getProcessos(req, res);
})

rota.get("/getProcessosConsumidores/:id_servidor", (req, res) => {
    info("Buscar processos consumidores");
    giovannaMenezesController.getProcessosConsumidores(req, res);
})

rota.get("/getServidorPorUsoCpu", (req, res) => {
    info("Reunindo dados dos servidores que mais utilizaram a cpu");
    giovannaMenezesController.getServidorPorUsoCpu(req, res);
})

module.exports = rota;
