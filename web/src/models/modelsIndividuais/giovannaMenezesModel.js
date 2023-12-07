var database = require("../../database/config");

function info(func, query) {
    console.log(`[Giovanna Model] - Função: ${func}; \nQuery: ${query}`)
}

function getProcessos(id_servidor) {
    var query = `
        SELECT * FROM processo WHERE fk_servidor = ${id_servidor} ORDER BY data_registro DESC;
    `

    info("Buscar processos", query)
    return database.executar(query);
}

function getProcessosConsumidores(id_servidor){
    var query = `
        SELECT * FROM vw_processos_consumidores WHERE fk_servidor = ${id_servidor} ORDER BY data_registro DESC;
    `

    info("Listar processos consumidores", query);
    return database.executar(query);
}

function getServidorPorUsoCpu() {
    var query = `
        SELECT servidor.codigo, COUNT(vw_processos_consumidores.id) AS qtd_processos_consumidores 
        FROM servidor 
        JOIN vw_processos_consumidores ON fk_servidor = id_servidor 
        GROUP BY id_servidor, servidor.codigo;
    `

    info("Reunindo dados dos servidores que mais utilizaram a cpu", query);
    return database.executar(query);
}

module.exports = {
    getProcessos,
    getProcessosConsumidores,
    getServidorPorUsoCpu
};
