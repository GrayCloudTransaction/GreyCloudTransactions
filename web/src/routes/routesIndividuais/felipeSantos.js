var express = require("express");
var router = express.Router();
var felipeSantosController = require("../../controllers/controllersIndividuais/felipeSantosController");

// Funções locais;
function info(rota){
    console.log(`[Felipe Santos Router] Rota: ${rota};`)
}

// Rotas
router.post("/listaExtrato", function (req, res) {
    info("/listaExtrato")
    felipeSantosController.listar_extrato(req, res);
})

module.exports = router;