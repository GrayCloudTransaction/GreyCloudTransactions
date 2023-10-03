
var servidorModel = require("../models/servidorModel");

// Funções locais
function info(func){
    console.log(`[servidor Controller] Função: ${func};`);
}


// Funções para exportar
function listar(req, res) {
    info("Listar");

    var idEmpresa = req.params.idEmpresa;

    if(idEmpresa != "" || idEmpresa != undefined){
        servidorModel.listar(idEmpresa).then(function (resultado) {
                
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } 
                else{
                    res.status(204).send("Nenhum resultado encontrado!")
                }
    
            }).catch(function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta!Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);

            })

    }
    else {
        res.status(400).send("ID Empresa está vazio ou undefined");
    }
}


module.exports = {
    listar
}