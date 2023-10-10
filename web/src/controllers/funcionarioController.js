var funcionarioModel = require("../models/funcionarioModel");

// Funções locais -- Usado somene por esse arquivo;
function info(func){
    console.log(`[Funcionário Controller] Função: ${func};`)
}


// Funções para exportar -- Usada por outros arquivos

function cadastrarFuncionario(req, res) {
    
    info("Cadastrar Funcionário")

    var nomeFuncionario = req.body.nomeFuncionarioServer;
    var cpfFuncionario = req.body.cpfFuncionarioServer;
    var cargoFuncionario = req.body.cargoFuncionarioServer;
    var emailFuncionario = req.body.emailFuncionarioServer;
    var senhaFuncionario = req.body.senhaFuncionarioServer;
    var fkEmpresa = req.body.fkEmpresaServer;


    funcionarioModel.cadastrarFuncionario(nomeFuncionario, cpfFuncionario, cargoFuncionario, emailFuncionario, senhaFuncionario, fkEmpresa)
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

function cadastrarNovoFuncionario(req, res) {
    
    info("Cadastrar NOVO funcionário")

    var nomeFuncionario = req.body.nomeFuncionarioServer;
    var emailFuncionario = req.body.emailFuncionarioServer;
    var senhaFuncionario = req.body.senhaFuncionarioServer;
    var cargoFuncionario = req.body.cargoFuncionarioServer;
    var cpfFuncionario = req.body.cpfFuncionarioServer;
    var permissaoFuncionario = req.body.permissaoFuncionarioServer;
    var fkGerente = req.body.fkGerenteServer;
    var fkEmpresa = req.body.fkEmpresaServer;

    
    funcionarioModel.cadastrarNovoFuncionario(nomeFuncionario, emailFuncionario, senhaFuncionario, cargoFuncionario, cpfFuncionario, permissaoFuncionario, fkGerente, fkEmpresa)
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

function select_funcionario(req, res){
    info("Select")

    var id_empresa = req.body.idEmpresaServer;

    if (id_empresa == undefined) {
        res.status(400).send("Seu id_empresa está undefined!");
    } else {

        funcionarioModel.select_funcionario(id_empresa)
            .then(
                function (resultado_autenticar) {
                    console.log(`\nResultados encontrados: ${resultado_autenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado_autenticar)}`); // transforma JSON em String
                
                    if (resultado_autenticar.length >= 1) {
                        console.log(resultado_autenticar);
                        res.json(resultado_autenticar);

                    } else if (resultado_autenticar.length == 0) {
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

function delete_funcionario(req, res){
    info("Delete")

    var id_funcionario = req.body.idFuncionarioServer;

    if (id_funcionario == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else {
        funcionarioModel.delete_funcionario(id_funcionario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao tentar deletar! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function update_funcionario(req, res){
    info("Update")

    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var cargo = req.body.cargoServer;
    var cpf = req.body.cpfServer;
    var permissao = req.body.permissaoServer;
    var id_funcionario = req.body.idFuncionarioServer;

    if (id_funcionario == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else {
        funcionarioModel.update_funcionario(nome, email, cargo, cpf, permissao, id_funcionario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao tentar atualizar! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    cadastrarFuncionario,
    cadastrarNovoFuncionario,
    select_funcionario,
    delete_funcionario,
    update_funcionario
}