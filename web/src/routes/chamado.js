var express = require("express");
var rota = express.Router();
var chamadoController = require("../controllers/chamadoController");

// Funções locais
function info(rota){
    console.log(`[Chamado Router] Rota: ${rota};`);
}

// Rotas
rota.get("/listar/:idEmpresa", (req, res) => {
    info("Listar");
    chamadoController.listarPorEmpresa(req, res);
});

module.exports = rota;