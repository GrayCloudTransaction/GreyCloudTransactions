var giovannaMenezesModel = require("../../models/modelsIndividuais/giovannaMenezesModel");

function info(func){
    console.log(`[Giovanna Menezes Controller] - Função: ${func};`);
}

function getProcessos(req, res) {
    info("Get últimos processos");

    var id_servidor = req.params.id_servidor;

    if(id_servidor != null & id_servidor != "") {
        giovannaMenezesModel.getProcessos(id_servidor).then(function(resultado){
            if(resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum processo encontrado!");
            }
        }).catch(function(erro){
            console.log(erro);
            console.log("Houve um erro ao realizar a consulta!\nErro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        })
    } else{
        res.status(400).send("O id_servidor está vazio ou undefined!")
    }
}

function getProcessosConsumidores(req, res) {
    info("Get últimos processos consumidores");

    var id_servidor = req.params.id_servidor;

    if(id_servidor != null & id_servidor != "") {
        giovannaMenezesModel.getProcessosConsumidores(id_servidor).then(function(resultado){
            if(resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum processo consumidor encontrado!");
            }
        }).catch(function(erro){
            console.log(erro);
            console.log("Houve um erro ao realizar a consulta!\nErro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        })
    } else{
        res.status(400).send("O id_servidor ou o filtro está vazio ou undefined!")
    }
}

function getServidorPorUsoCpu(req, res) {
    info("Reunindo dados dos servidores que mais utilizaram a cpu");

    giovannaMenezesModel.getServidorPorUsoCpu().then(function(resultado){
        if(resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum servidor foi encontrado!");
        }
    }).catch(function(erro){
        console.log(erro);
        console.log("Houve um erro ao realizar a consulta!\nErro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    })
}

module.exports = {
    getProcessos,
    getProcessosConsumidores,
    getServidorPorUsoCpu
}
