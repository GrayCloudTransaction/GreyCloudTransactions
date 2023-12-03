var express = require("express");
var rota = express.Router();
var giovannaMenezesController = require("../../controllers/controllersIndividuais/giovannaMenezesController");

function info(rota) {
    console.log(`[Giovanna Menezes Router] - Rota: ${rota}`);
}

rota.get("/listarProcessos/:id_servidor", (req, res) => {
    info("Listar processos");
    giovannaMenezesController.listarProcessos(req, res);
})

rota.get("/listarProcessosConsumidores/:id_servidor", (req, res) => {
    info("Listar processos que mais consomem CPU");
    giovannaMenezesController.listarProcessosConsumidores(req, res);
})

rota.get("/buscarUltimosProcessos/id_servidor/:id_servidor/limite/:limite", (req, res) => {
    info("Buscar últimos processos");
    giovannaMenezesController.buscarUltimosProcessos(req, res);
})

rota.get("/buscarProcessosConsumidores/:id_servidor/limite/:limite", (req, res) => {
    info("Buscar últimos processos consumidores");
    giovannaMenezesController.buscarProcessosConsumidores(req, res);
})

rota.get("/getServidorPorUsoCpu", (req, res) => {
    info("Reunindo dados dos servidores que mais utilizaram a cpu");
    giovannaMenezesController.getServidorPorUsoCpu(req, res);
})

module.exports = rota;