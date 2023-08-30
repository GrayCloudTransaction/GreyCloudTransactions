var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.get("/pegarIdEmpresa/:cnpjId", function (req, res) {
    usuarioController.pegarIdEmpresa(req,res);
})

router.post("/cadastrarEmpresa", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/cadastrarFuncionario", function (req, res) {
    usuarioController.cadastrarFuncionario(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

module.exports = router;