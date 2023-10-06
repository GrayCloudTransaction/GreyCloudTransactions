var express = require("express");
var router = express.Router();
var funcionarioController = require("../controllers/funcionarioController");


// Funções locais -- Usado somene por esse arquivo;
function info(rota){
    console.log(`[Funcionário Router] Rota: ${rota};`)
}


// Funções para exportar -- Usada por outros arquivos
router.post("/cadastrar", function (req, res) {
    funcionarioController.cadastrarFuncionario(req, res);
})

router.post("/cadastrarNovo", function (req, res) {
    funcionarioController.cadastrarNovoFuncionario(req, res);
})

router.post("/select", function (req, res) {
    funcionarioController.select_funcionario(req, res);
})

router.post("/delete", function (req, res) {
    funcionarioController.delete_funcionario(req, res);
})

router.post("/update", function(req, res){
    funcionarioController.update_funcionario(req, res)
})


module.exports = router;