var empresaModel = require("../models/empresaModel");

// Funções locais -- Usado somene por esse arquivo;
function info(func){
    console.log(`[Empresa Controller] Função: ${func};`)
}


// Funções para exportar -- Usada por outros arquivos

function cadastrar(req, res) {

    info("Cadastrar")

    var razaoSocial = req.body.razaoSocialServer;
    var cnpj = req.body.cnpjServer;
    var logradouro = req.body.logradouroServer;
    var numero = req.body.numeroServer;
    var cep = req.body.cepServer;
    var email = req.body.emailServer;
    var telefone = req.body.telefoneServer;

    empresaModel.cadastrar(razaoSocial, cnpj, logradouro, numero, cep, telefone, email)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );

}

function pegarId(req, res) {

    info("Pegar Id")

    var cnpj = req.params.cnpjId;
    empresaModel.pegarId(cnpj).then(function (resultado) {
            
            if (resultado.length == 1) {
                res.json(resultado[0]);
            } 
            else if (resultado.length == 0) {
                res.status(403).send("CNPJ INVÁLIDO")
            } 
            else {
                res.status(403).send("Mais de um CNPJ. Inválido")
            }

        }).catch(function (erro) {
            console.log(erro);
            console.log(
                "Houve um ERRO! :", erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        })
}

module.exports = {
    cadastrar,
    pegarId
}