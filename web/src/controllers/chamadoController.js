var chamadoModel = require("../models/chamadoModel");

// Funções locais
function info(func){
    console.log(`[Chamado Controller] Função: ${func};`);
}

// Funções para Exportar
function listarPorEmpresa(req, res){
    info("listar Por Empresa");

    var id_empresa = req.params.id_empresa;

    if(id_empresa != null && id_empresa != ""){
        chamadoModel.listarPorEmpresa(id_empresa)
        .then(function (resultado){
            if(resultado.length > 0){
                res.status(200).json(resultado);
            }
            else{
                res.status(204).send("Nenhum chamado encontrado");
            }
        }).catch(function (erro){
            console.log(erro);
            console.log("Houve um erro ao realizar a consulta!\nErro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        })
    }
    else{
        res.status(400).send("O ID Empresa está vazio ou Undefined!")
    }

}

function listarPorServidor(req, res){
    info("Listar Por Servidor");

    var id_empresa = req.params.id_empresa;
    var opcao = req.body.opcaoServer;
    var data = req.body.dataServer;

    console.log(id_empresa, opcao, data);

    if(id_empresa != null && id_empresa != ""){
        if (data != "") {
            chamadoModel.listarPorServidor(id_empresa, data, opcao)
            .then(function (resultado){
                if(resultado.length > 0){
                    res.status(200).json(resultado);
                }
                else{
                    res.status(204).send("Nenhum chamado encontrado");
                }
            }).catch(function (erro){
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta!\nErro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            })
        }
    }
    else{
        res.status(400).send("O ID Empresa está vazio ou Undefined!")
    }

}

function listarPorMes(req, res){
    info("Listar Por Mês");

    var id_empresa = req.params.id_empresa;

    if(id_empresa != null && id_empresa != ""){
        chamadoModel.listarPorMes(id_empresa)
        .then(function (resultado){
            if(resultado.length > 0){
                res.status(200).json(resultado);
            }
            else{
                res.status(204).send("Nenhum chamado encontrado");
            }
        }).catch(function (erro){
            console.log(erro);
            console.log("Houve um erro ao realizar a consulta!\nErro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        })
    }
    else{
        res.status(400).send("O ID Empresa está vazio ou Undefined!")
    }

}

function listarUltimosChamados(req, res){
    info("Listar Últimos Chamados");

    var id_empresa = req.params.id_empresa;

    if(id_empresa != null && id_empresa != ""){
        chamadoModel.listarUltimosChamados(id_empresa)
        .then(function (resultado){
            if(resultado.length > 0){
                res.status(200).json(resultado);
            }
            else{
                res.status(204).send("Nenhum chamado encontrado");
            }
        }).catch(function (erro){
            console.log(erro);
            console.log("Houve um erro ao realizar a consulta!\nErro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        })
    }
    else{
        res.status(400).send("O ID Empresa está vazio ou Undefined!")
    }

}

module.exports = {
    listarPorEmpresa,
    listarPorServidor,
    listarPorMes,
    listarUltimosChamados
}