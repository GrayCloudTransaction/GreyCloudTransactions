var database = require("../database/config");

// Funções locais -- Usado somene por esse arquivo;
function info(func, query){
    console.log(`[Registro Model] Função: ${func};\nQuery: ${query}`)
}

function buscarUltimosRegistros(id_servidor, limite) {
    var instrucao = `
        SELECT TOP ${limite} registro.*, componente.tipo_componente
        FROM registro
        INNER JOIN componente ON registro.fk_componente = componente.id_componente
        WHERE componente.tipo_componente IN ('CPU', 'RAM', 'Disco')
        AND componente.fk_servidor = ${id_servidor}
        ORDER BY registro.data_registro DESC;
    `;
    
    info("Buscar Últimos Registros", instrucao)

    return database.executar(instrucao);
}

module.exports = {
    buscarUltimosRegistros
};