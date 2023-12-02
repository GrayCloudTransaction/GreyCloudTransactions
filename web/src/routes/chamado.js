var express = require("express");
var rota = express.Router();
var chamadoController = require("../controllers/chamadoController");

// Funções locais
function info(rota){
    console.log(`[Chamado Router] Rota: ${rota};`);
}

// Rotas
rota.get("/listarPorEmpresa/:id_empresa", (req, res) => {
    info("Listar Por Empresa");
    chamadoController.listarPorEmpresa(req, res);
});

rota.post("/listarPorServidor/:id_empresa", (req, res) => {
    info("Listar Por Servidor");
    chamadoController.listarPorServidor(req, res);
});

rota.get("/listarPorMes/:id_empresa", (req, res) => {
    info("Listar Por Mês");
    chamadoController.listarPorMes(req, res);
});

rota.get("/listarUltimosChamados/:id_empresa", (req, res) => {
    info("Listar Últimos Chamados");
    chamadoController.listarUltimosChamados(req, res);
});

module.exports = rota;