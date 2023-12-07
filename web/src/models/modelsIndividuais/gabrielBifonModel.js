var database = require("../../database/config");

// Funções locais -- Usado somene por esse arquivo;
function info(func, query){
    console.log(`[Registro Model] Função: ${func};\nQuery: ${query}`)
}

function buscarUltimosRegistros(id_servidor, limite) {
    if (process.env.AMBIENTE_PROCESSO  == "desenvolvimento") {
        var instrucao = `
        SELECT mac_address, ip_publico, dataSent, dataRecv, rede.data_registro, cidade, valor_temperatura
        FROM rede, localizacao 
        WHERE rede.fk_servidor = ${id_servidor}
        ORDER BY rede.data_registro DESC
        LIMIT ${limite};
    `;    
    } else {
        var instrucao = `
        SELECT TOP ${limite} mac_address, ip_publico, dataSent, dataRecv, rede.data_registro, cidade, valor_temperatura
        FROM rede, localizacao 
        WHERE rede.fk_servidor = ${id_servidor}
        ORDER BY rede.data_registro DESC;
    `;  
    }
    
    
    info("Buscar Últimos Registros", instrucao)

    return database.executar(instrucao);
}

module.exports = {
    buscarUltimosRegistros
};