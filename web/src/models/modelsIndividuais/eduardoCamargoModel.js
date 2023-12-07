var database = require("../../database/config");

// Funções locais -- Usado somene por esse arquivo;
function info(func, query){
    console.log(`[Registro Model] Função: ${func};\nQuery: ${query}`)
}

function buscarUltimosRegistros() {

    if (process.env.AMBIENTE_PROCESSO  == "desenvolvimento") {
        var query = `
        SELECT 
            registro.*, 
            tipo_componente,
            vel_download,
            vel_upload,ping 
        FROM registro, componente, rede
        WHERE tipo_componente IN ("CPU", "RAM", "Disco")
        AND id_componente = fk_componente
        AND fk_servidor = ${id_servidor}
        ORDER BY data_registro DESC
        LIMIT ${limite};
    `;
    } else {
        var query = `
        SELECT TOP 10 
            registro.data_registro,
            vel_download,
            vel_upload,
            ping 
        FROM registro, rede;
    `;
    }
        
    info("Buscar Últimos Registros", query)

    return database.executar(query);
}

module.exports = {
    buscarUltimosRegistros
};