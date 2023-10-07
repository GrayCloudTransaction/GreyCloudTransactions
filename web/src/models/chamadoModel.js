var database = require("../database/config");

// Funções Locais
function info(func, query){
    console.log(`[Alerta Model] Função: ${func};\nQuery: ${query}`);
}

// Funções para Exportar
function listarPorEmpresa(id_empresa){
    var query =`
    SELECT * FROM chamados WHERE fk_empresa = ${id_empresa};
    `;
    info("Listar", query);
    return  database.executar(query);
}

module.exports = {
    listarPorEmpresa
}