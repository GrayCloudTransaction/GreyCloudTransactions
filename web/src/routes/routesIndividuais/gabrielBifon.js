var express = require("express");
var rota = express.Router();
var gabrielController = require("../../controllers/controllersIndividuais/gabrielBifonController");

// Funções locais
function info(rota){
    console.log(`[Registro Router] Rota: ${rota};`);
}

// Rotas
rota.get("/ultimas/:id_servidor", (req, res) => {
    info("Ultimas bifon");
    gabrielController.buscarUltimosRegistros(req, res);
});

module.exports = rota;