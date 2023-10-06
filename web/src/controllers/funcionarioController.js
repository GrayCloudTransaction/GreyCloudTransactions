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

module.exports = {
    cadastrarFuncionario,
    cadastrarNovoFuncionario
}