var database = require("../../database/config");

// Funções locais -- Usado somene por esse arquivo;
function info(func, query){
    console.log(`[Registro Model] Função: ${func};\nQuery: ${query}`)
}

function buscarUltimosRegistros(id_servidor, limite) {
    var instrucao = `
        SELECT mac_address, dataSent, dataRecv
        FROM rede, servidor
        WHERE id_rede = fk_rede
        AND id_servidor = ${id_servidor}
        ORDER BY id_rede DESC
        LIMIT ${limite};
    `;
    
    info("Buscar Últimos Registros", instrucao)

    return database.executar(instrucao);
}

module.exports = {
    buscarUltimosRegistros
};