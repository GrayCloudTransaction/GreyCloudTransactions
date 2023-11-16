var database = require("../../database/config")

// Funções locais
function info(func, query){
    console.log(`[Rafael Model] Função: ${func};\nQuery: ${query}`)
}

// Funções para exportar
function listar(codigoEmpresa) {
    var query = `
        SELECT registro.*, codigo, tipo_componente from registro, servidor, componente WHERE
        fk_servidor = id_servidor AND fk_componente = id_componente AND codigo = "${codigoEmpresa}" AND tipo_componente IN ('RAM','CPU');
    `;

    info("Listar", query)

    return database.executar(query);
}


module.exports = {
    listar
};