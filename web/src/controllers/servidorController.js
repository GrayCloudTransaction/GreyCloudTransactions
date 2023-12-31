var servidorModel = require("../models/servidorModel");

// Funções locais
function info(func) {
    console.log(`[servidor Controller] Função: ${func};`);
}

function pegarInfoServidor(req, res) {
    info("pegarInfoServidor");

    console.log(req)

    var id_servidor = req.body.idServidorServer;

    console.log(id_servidor)

    if (id_servidor != "") {
        servidorModel.pegarInfoServidor(id_servidor).then(function (resultado) {
            if (resultado.length > 0) {
                pow = resultado
                
                servidorModel.pegarInfoCompsServidor(id_servidor).then(function (resultado2){
                    pow.push(resultado2)
                    res.status(200).json(pow);
                }).catch(function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar a consulta!\nErro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                })
                
            }
            else {
                res.status(204).send("Nenhum resultado encontrado!")
            }

        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao realizar a consulta!\nErro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);

        })

    }
    else {
        res.status(400).send("ID Empresa está vazio ou undefined");
    }
}

// Funções para exportar
function listar(req, res) {
    info("Listar");

    var idEmpresa = req.params.idEmpresa;

    if (idEmpresa != "" || idEmpresa != undefined) {
        servidorModel.listar(idEmpresa).then(function (resultado) {
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

    }
    else {
        res.status(400).send("ID Empresa está vazio ou undefined");
    }
}

function alterar(req, res) {
    info("Alterar");

    var idServidor = req.params.idServidor;
    var nome = req.body.nomeServer;
    var codigo = req.body.codigoServer;
    var tipo = req.body.tipoServer;
    var descricao = req.body.descricaoServer;

    if (idServidor != "" || idServidor != undefined) {
        if ((nome || codigo || tipo || descricao) != undefined) {

            servidorModel.alterar(idServidor, nome, codigo, tipo, descricao)
                .then(function (resultado) {
                    res.status(200).json(resultado);

                }).catch(function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar o UPDATE!\nErro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);

                })

        }
        else {
            res.status(400).send(`Dados undefined\nNome: ${nome}\nCódigo: ${codigo}\nTipo: ${tipo}\nDescrição: ${descricao}`);
        }
    }
    else {
        res.status(400).send("ID Servidor está vazio ou undefined");
    }
}


function inserir(req, res) {
    info("Inserir");

    var nome = req.body.nomeServer;
    var codigo = req.body.codigoServer;
    var tipo = req.body.tipoServer;
    var descricao = req.body.descricaoServer;
    var fk_empresa = req.params.fk_empresa;

    if (fk_empresa != "" || fk_empresa != undefined) {
        if ((nome || codigo || tipo || descricao) != undefined) {

            servidorModel.inserir(nome, codigo, tipo, descricao, fk_empresa)
                .then(function (resultado) {
                    res.status(200).json(resultado);

                }).catch(function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar o INSERT!\nErro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);

                })

        }
        else {
            res.status(400).send(`Dados undefined\nNome: ${nome}\nCódigo: ${codigo}\nTipo: ${tipo}\nDescrição: ${descricao}`);
        }
    }
    else {
        res.status(400).send("FK da Empresa está vazio ou undefined");
    }
}

function deletar(req, res) {
    info("Deletar");

    var id_servidor = req.params.id_servidor;

    if (id_servidor != "" || id_servidor != undefined) {

        servidorModel.deletar(id_servidor).then(function (resultado) {

            res.json(resultado);

        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao realizar o DELETE!\nErro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);

        })

    }
    else {
        res.status(400).send("ID Servidor está vazio ou undefined");
    }
}

function servidorForaDoAr(req, res) {
    info("Servidor Fora do Ar");

    var id_servidor = req.params.id_servidor;

    if (id_servidor != "" || id_servidor != undefined) {

        servidorModel.servidorForaDoAr(id_servidor).then(function (resultado) {

            if (resultado.length > 0) {
                res.status(200).json(resultado);
            }
            else {
                res.status(204).send("Nenhum resultado encontrado!")
            }

        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao realizar a CONSULTA!\nErro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);

        })

    }
    else {
        res.status(400).send("ID Servidor está vazio ou undefined");
    }
}

module.exports = {
    listar,
    alterar,
    inserir,
    deletar,
    pegarInfoServidor,
    servidorForaDoAr
}