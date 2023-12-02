var vitorHidekiModel = require("../../models/modelsIndividuais/vitorHidekiModel");

function info(func) {
    console.log(`[Hideki Controller] Função: ${func};`);
}

function getQtdTotalProcessos(req, res) {
    info("getQtdTotalProcessos");

    var idServidor = req.params.idServidor;

    if (idServidor != "") {
        vitorHidekiModel.getQtdTotalProcessos(idServidor).then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            }
            else {
                res.status(204).send("Nenhum resultado encontrado!")
            }

        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao realizar a consulta!\nErro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);

        })

    } else {
        res.status(400).send("ID Servidor está vazio ou undefined");
    }
}

function getProcessos(req, res) {
    info("getProcessos");

    var idServidor = req.params.idServidor;

    if (idServidor != "") {
        vitorHidekiModel.getProcessos(idServidor).then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            }
            else {
                res.status(204).send("Nenhum resultado encontrado!")
            }

        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao realizar a consulta!\nErro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);

        })

    } else {
        res.status(400).send("ID Servidor está vazio ou undefined");
    }
}

function getProcessosMaiorConsumo(req, res) {
    info("getProcessosMaiorConsumo");

    var idServidor = req.params.idServidor;

    if (idServidor != "") {
        vitorHidekiModel.getProcessosMaiorConsumo(idServidor).then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            }
            else {
                res.status(204).send("Nenhum resultado encontrado!")
            }

        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao realizar a consulta!\nErro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);

        })

    } else {
        res.status(400).send("ID Servidor está vazio ou undefined");
    }
}

function getProcessTree(req, res) {
    info("getProcessTree");

    var idServidor = req.params.idServidor;
    var pid = req.body.pidServer;

    if (idServidor != "") {
        vitorHidekiModel.getProcessTree(idServidor, pid).then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            }
            else {
                res.status(204).send("Nenhum resultado encontrado!")
            }

        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao realizar a consulta!\nErro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);

        })

    } else {
        res.status(400).send("ID Servidor está vazio ou undefined");
    }
}

module.exports = {
    getQtdTotalProcessos,
    getProcessos,
    getProcessosMaiorConsumo,
    getProcessTree  
};