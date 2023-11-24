var fefeModel = require("../../models/modelsIndividuais/felipeSantosModel");

// Funções Locais
function info(func){
    console.log(`[Felipe Santos Controller] Funções: ${func}`);
}


// Funções para exportar
function listar_extrato(req, res){
    info("Listar Extrato");

    var idServidor = req.body.idServidor

    if (idServidor == undefined ){
        res.status(400).send("ID do Servidor está Undefined!!!")
    }
    else{
        fefeModel.listar_extrato(idServidor).then(
            function (resultado){
                console.log(`Resultados: ${JSON.stringify(resultado.length)}`);
                res.status(200).json(resultado)    
            }
        ).catch(
            function (erro){
                console.log("\nHouve um erro ao consultar! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        )
    }
}


module.exports = {
    listar_extrato,
}