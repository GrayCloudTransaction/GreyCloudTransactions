var express = require("express");
var rota = express.Router();
var rafaelController = require("../../controllers/controllersIndividuais/rafaelScheneiderController");

// Funções locais
function info(rota){
    console.log(`[Servidor Router] Rota: ${rota};`);
}

rota.post("/getPredict", (req, res) => {
    info("teste");
    rafaelController.getPredict(req,res)
});

module.exports = rota;