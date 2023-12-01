var database = require("../../database/config");

// Funções locais -- Usado somene por esse arquivo;
function info(func, query){
    console.log(`[Registro Model] Função: ${func};\nQuery: ${query}`)
}

function buscarUltimosRegistros(id_servidor, limite) {
    var instrucao = `
        SELECT mac_address, dataSent, dataRecv, data_registro
        FROM rede 
        WHERE fk_servidor = ${id_servidor}
        ORDER BY data_registro DESC
        LIMIT ${limite};
    `;
    
    info("Buscar Últimos Registros", instrucao)

    return database.executar(instrucao);
}

module.exports = {
    buscarUltimosRegistros
};