var database = require("../../database/config");

// Funções Locais
function info(func, query){
    console.log(`[Felipe Santos Model] Função: ${func};\nQuery: ${query}`)
}

// Funções para Exportar
function listar_extrato(idServidor){
    var query = `SELECT * FROM vw_extrato WHERE id_servidor = ${idServidor}`;
    info("Listar tabela de Preço Componente", query);    
    return database.executar(query);
}

module.exports = {
    listar_extrato,

};