var database = require("../../database/config")

// Funções locais
function info(func, query){
    console.log(`[Rafael Model] Função: ${func};\nQuery: ${query}`)
}

// Funções para exportar
function listar(idServidor) {
    var query = `
        SELECT registro.*, tipo_componente
        FROM registro, componente
        WHERE tipo_componente IN ("CPU", "RAM")
        AND id_componente = fk_componente
        AND fk_servidor = ${idServidor}
        ORDER BY data_registro DESC
        LIMIT 2;
    `;

    info("Listar", query)

    return database.executar(query);
}


module.exports = {
    listar
};