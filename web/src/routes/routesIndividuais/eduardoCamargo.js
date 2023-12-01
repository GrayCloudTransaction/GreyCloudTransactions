var express = require("express");
var rota = express.Router();
var eduardoCamargoController = require("../../controllers/controllersIndividuais/eduardoCamargoController");

// Funções locais
function info(rota){
    console.log(`[Registro Router] Rota: ${rota};`);
}

// Rotas
rota.get("/ultimas", (req, res) => {
    info("Ultimas");
    eduardoCamargoController.buscarUltimosRegistros(req, res);
});

module.exports = rota;