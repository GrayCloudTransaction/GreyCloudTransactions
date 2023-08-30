var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json(resultadoAutenticar[0]);
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var razaoSocial = req.body.razaoSocialServer;
    var cnpj = req.body.cnpjServer;
    var logradouro = req.body.logradouroServer;
    var numero = req.body.numeroServer;
    var cep = req.body.cepServer;
    var email = req.body.emailServer;
    var telefone = req.body.telefoneServer;

    // Faça as validações dos valores   

    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel.cadastrar(razaoSocial, cnpj, logradouro, numero, cep, telefone, email)
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

function cadastrarFuncionario(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nomeFuncionario = req.body.nomeFuncionarioServer;
    var cpfFuncionario = req.body.cpfFuncionarioServer;
    var cargoFuncionario = req.body.cargoFuncionarioServer;
    var emailFuncionario = req.body.emailFuncionarioServer;
    var senhaFuncionario = req.body.senhaFuncionarioServer;
    var fkEmpresa = req.body.fkEmpresaServer;

    // Faça as validações dos valores   

    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel.cadastrarFuncionario(nomeFuncionario, cpfFuncionario, cargoFuncionario, emailFuncionario, senhaFuncionario, fkEmpresa)
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

function pegarIdEmpresa(req, res) {
    var cnpj = req.params.cnpjId;
    usuarioModel
        .pegarIdEmpresa(cnpj)
        .then(function (resultado) {
            if (resultado.length == 1) {
                console.log(resultado);
                res.json(resultado[0]);
            } else if (resultado.length == 0) {
                res.status(403).send("CNPJ INVÁLIDO")
            } else {
                res.status(403).send("Mais de um CNPJ inválido")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log(
                "Houve um ERRO! :",erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        })
    }

module.exports = {
    autenticar,
    cadastrar,
    cadastrarFuncionario,
    pegarIdEmpresa
}