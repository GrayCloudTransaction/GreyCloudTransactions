var chamadoModel = require("../models/chamadoModel");

// Funções locais
function info(func){
    console.log(`[Chamado Controller] Função: ${func};`);
}

// Funções para Exportar
function listarPorEmpresa(req, res){
    info("listar Por Empresa");

    var id_empresa = req.params.id_empresa;

    if(id_empresa != null && id_empresa != 0){
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

module.exports = {
    listarPorEmpresa,
}