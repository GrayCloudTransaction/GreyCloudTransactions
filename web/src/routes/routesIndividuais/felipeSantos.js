var express = require("express");
var router = express.Router();
var felipeSantosController = require("../../controllers/controllersIndividuais/felipeSantosController");

// Funções locais;
function info(rota){
    console.log(`[Felipe Santos Router] Rota: ${rota};`)
}

// Rotas
router.post("/listar/extrato", function (req, res) {
    info("/listar/extrato")
    felipeSantosController.listar_extrato(req, res);
})

router.post("/listar/extrato/atual", function(req, res){
    info("/listar/extrato/atual");
    felipeSantosController.listar_extrato_atual(req, res);
})

router.post("/listar/extrato/acumulado", function(req, res){
    info("/listar/extrato/acumulado");
    felipeSantosController.listar_extrato_acumulado(req, res);
})

router.get("/listar/preco/componente", (req, res) =>{
    info("/listar/preco/componente");
    felipeSantosController.listar_preco_componente(req, res);
})

router.post("/listar/preco/disco", (req, res)=> {
    info("/listar/preco/disco");
    felipeSantosController.lista_preco_disco(req, res);
})

router.post("/listar/extrato/historico/somarizado", (req, res) => {
    info("/listar/extrato/historico/somarizado");
    felipeSantosController.historico_somarizado_por_servidor(req, res);
})

module.exports = router;