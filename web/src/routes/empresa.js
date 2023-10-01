var express = require("express");
var router = express.Router();
var empresaController = require("../controllers/empresaController");


// Funções locais -- Usado somene por esse arquivo;
function info(rota){
    console.log(`[Empresa Router] Rota: ${rota};`)
}


// Funções para exportar -- Usada por outros arquivos

router.post("/pegarId", function (req, res) {
    info("/pegarId")

    empresaController.pegarId(req,res);
})

router.post("/cadastrarEmpresa", function (req, res) {
    info("/cadastrarEmpresa")

    empresaController.cadastrar(req, res);
})

module.exports = router;