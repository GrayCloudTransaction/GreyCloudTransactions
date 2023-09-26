var express = require("express");
var router = express.Router();
var usuarioController = require("../controllers/usuarioController");


// Funções locais -- Usado somene por esse arquivo;
function info(rota){
    console.log(`[Usuário Router] Rota: ${rota};`)
}


// Funções para exportar -- Usada por outros arquivos

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

module.exports = router;