var express = require("express");
var rota = express.Router();
var registroController = require("../../controllers/registroController");

// Funções locais
function info(rota){
    console.log(`[Registro Router] Rota: ${rota};`);
}

// Rotas
rota.get("../ultimas/:id_servidor", (req, res) => {
    info("Ultimas");
    registroController.buscarUltimosRegistros(req, res);
});

module.exports = rota;