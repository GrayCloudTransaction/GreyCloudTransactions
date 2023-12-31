var bifonModel = require("../../models/modelsIndividuais/gabrielBifonModel");

function buscarUltimosRegistros(req, res) {
    const limite_linhas = 1;

    var id_servidor = req.params.id_servidor;

    console.log(id_servidor)

    bifonModel.buscarUltimosRegistros(id_servidor, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos registros", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarCorrelacao(req, res){
    var id_servidor = req.params.id_servidor;

    bifonModel.buscarCorrelacao(id_servidor).then(function (resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro){
        console.log(erro)
        console.log("Houve um erro ao buscar os últimos registros", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


// function getCorrelacao(req, res) {
//     //info("getCorrelacao");
//     var codigo = req.params.id_servidor;

//     const path = require('node:path');
//     const execSync = require("child_process").execSync;

//     const pathController = path.join(__dirname, '..')


//     const result1 = execSync(`R ${pathController}/insightsBifon/correlacao.r ${codigo}`);

//     let resultList1 = result1.toString().split(' ')
//     res.status(200).json([resultList1])
// }

module.exports = {
    buscarUltimosRegistros,
    buscarCorrelacao
}