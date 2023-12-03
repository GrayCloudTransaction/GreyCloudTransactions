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


function listar_extrato_atual(req, res){
    info("Listar Extrato Atual");

    var idServidor = req.body.idServidor;

    if(idServidor == undefined){
        res.status(400).send("ID do Servidor está Undefined!!!");
    }
    else{
        fefeModel.listar_extrato_atual(idServidor).then(
            (resultado) => {
                res.status(200).json(resultado);
            }
        ).catch(
            (erro) => {
                console.log("\nHouve um erro ao consultar! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        )
    }
}

function listar_extrato_acumulado(req, res){
    info("Listar Extrato Acumulado");

    var idEmpresa = req.body.idEmpresa;
    var dias = req.body.dias;

    if(idEmpresa == undefined){
        res.status(400).send("ID do Servidor está Undefined!!!");
    }
    else if(dias == undefined){
        res.status(400).send("A variável dia está Undefined!!!");
    }
    else{
        fefeModel.listar_extrato_acumulado(idEmpresa, dias).then(
            (resultado) => {
                res.status(200).json(resultado);
            }
        ).catch(
            (erro) => {
                console.log("\nHouve um erro ao consultar! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        )
    }
}

function listar_preco_componente(req, res){
    fefeModel.listar_preco_componente().then(
        (resultado) => {
            res.status(200).json(resultado);
        }
    ).catch(
        (erro) => {
            console.log("\nHouve um erro ao fazer a listagem! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    )
}

function lista_preco_disco(req, res){
    idServidor = req.body.idServidor;

    if(idServidor == undefined ){
        res.status(400).send("ID do Servidor está Undefined!!!");    
    }
    else{
        fefeModel.lista_preco_disco(idServidor).then((resultado)=>{
                res.status(200).json(resultado);
            }
        ).catch((erro)=>{
            res.status(500).json(erro.sqlMessage);
        })
    }
}

function historico_somarizado_por_servidor(req, res){
    idEmpresa = req.body.idEmpresa;
    dias = req.body.dias;

    if(idEmpresa == undefined){
        res.status(400).send("ID da Empresa está Undefined!!!");    
    }
    else if(dias == undefined){
        res.status(400).send("Os dias estão Undefined!!!");    
    }
    else{
        fefeModel.historico_somarizado_por_servidor(idEmpresa, dias).then(
            (resultado)=>{
                res.status(200).json(resultado);
            }
        ).catch(
            (erro)=> {
                res.status(500).json(erro.sqlMessage);
            }
        )
    }
}

function historico_somarizado_por_empresa(req, res){
    idEmpresa = req.body.idEmpresa;
    dias = req.body.dias;

    if(idEmpresa == undefined){
        res.status(400).send("ID da Empresa está Undefined!!!");    
    }
    else if(dias == undefined){
        res.status(400).send("Os dias estão Undefined!!!");    
    }
    else{
        fefeModel.historico_somarizado_por_empresa(idEmpresa, dias).then(
            (resultado)=>{
                res.status(200).json(resultado);
            }
        ).catch(
            (erro)=> {
                res.status(500).json(erro.sqlMessage);
            }
        )
    }
}

function custo_ordenado_kpi(req, res){
    idEmpresa = req.body.idEmpresa;
    dias = req.body.dias;
    componente = req.body.componente;

    if(idEmpresa == undefined){
        res.status(400).send("ID da Empresa está Undefined!!!");    
    }
    else if(dias == undefined){
        res.status(400).send("Os dias estão Undefined!!!");    
    }
    else if(componente == undefined || componente == "" ){
        res.status(400).send("O componente está Undefined!!!");    
    }
    else{
        fefeModel.custo_ordenado_kpi(componente, idEmpresa, dias).then(
            (resultado)=>{
                res.status(200).json(resultado);
            }
        ).catch(
            (erro)=> {
                res.status(500).json(erro.sqlMessage);
            }
        )
    }
}

module.exports = {
    listar_extrato,
    listar_extrato_atual,
    listar_extrato_acumulado,
    listar_preco_componente,
    lista_preco_disco,
    historico_somarizado_por_servidor,
    historico_somarizado_por_empresa,
    custo_ordenado_kpi
    
}