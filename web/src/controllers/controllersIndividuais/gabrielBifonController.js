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



module.exports = {
    buscarUltimosRegistros
}