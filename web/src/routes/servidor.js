var express = require("express");
var rota = express.Router();
var servidorController = require("../controllers/servidorController");

// Funções locais
function info(rota){
    console.log(`[Servidor Router] Rota: ${rota};`);
}

// Rotas
rota.get("/idEmpresa/:idEmpresa", (req, res) => {
    info("Listar");
    servidorController.listar(req, res);
});

rota.put("/alterar/:idServidor", (req, res) => {
    info("Alterar");
    servidorController.alterar(req, res);
})

rota.post("/inserir/:fk_empresa", (req, res) =>{
    info("Inserir");
    servidorController.inserir(req, res);
})

rota.delete("/deletar/:id_servidor", (req, res) =>{
    info("Deletar");
    servidorController.deletar(req, res);
})


module.exports = rota;