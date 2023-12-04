var giovannaMenezesModel = require("../../models/modelsIndividuais/giovannaMenezesModel");

function info(func){
    console.log(`[Giovanna Menezes Controller] - Função: ${func};`);
}

function listarProcessos(req, res) {
    info("Listar processos");

    var id_servidor = req.params.id_servidor;

    if(id_servidor != null & id_servidor != "") {
        giovannaMenezesModel.listarProcessos(id_servidor).then(function(resultado){
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

function listarProcessosConsumidores(req, res) {
    info("Listar processos que mais consomem CPU");

    var id_servidor = req.params.id_servidor;

    if(id_servidor != null & id_servidor != "") {
        giovannaMenezesModel.listarProcessosConsumidores(id_servidor).then(function(resultado){
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
        res.status(400).send("O id_servidor está vazio ou undefined!")
    }
}

function buscarUltimosProcessos(req, res) {
    info("Buscar últimos processos");

    var id_servidor = req.params.id_servidor;
    var limite = req.params.limite;

    if(id_servidor != null & id_servidor != "") {
        giovannaMenezesModel.buscarUltimosProcessos(id_servidor, limite).then(function(resultado){
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

function buscarProcessosConsumidores(req, res) {
    info("Buscar últimos processos consumidores");

    var id_servidor = req.params.id_servidor;
    var limite = req.params.limite;

    if(id_servidor != null & id_servidor != "") {
        giovannaMenezesModel.buscarProcessosConsumidores(id_servidor, limite).then(function(resultado){
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
    listarProcessos,
    listarProcessosConsumidores,
    buscarUltimosProcessos,
    buscarProcessosConsumidores,
    getServidorPorUsoCpu
}