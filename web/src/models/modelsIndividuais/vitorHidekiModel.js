var database = require("../../database/config");

// Funções Locais
function info(func, query){
    console.log(`[Alerta Model] Função: ${func};\nQuery: ${query}`);
}

function getQtdTotalProcessos(id_servidor) {
    var query = `
        SELECT COUNT(*) AS qtd_processos FROM registro_processo WHERE fk_servidor = ${id_servidor} GROUP BY horario;
    `
    info("Pegar quantidade total de processos", query);
    return database.executar(query);
}

function getProcessos(id_servidor) {
    var query = `
        SELECT * FROM vw_registro_processo_ultimos WHERE fk_servidor = ${id_servidor};
    `
    info("Pegar útimos processos", query);
    return database.executar(query);
}

function getProcessosMaiorConsumo(id_servidor) {
    var query = `
    SELECT * FROM vw_registro_processo_ultimos 
	    WHERE fk_servidor = ${id_servidor} AND
        (uso_ram = (SELECT MAX(uso_ram) FROM vw_registro_processo_ultimos) OR
		bytes_lidos = (SELECT MAX(bytes_lidos) FROM vw_registro_processo_ultimos) OR
		bytes_escritos = (SELECT MAX(bytes_escritos) FROM vw_registro_processo_ultimos));
    `
    info("Pegar processos com maior consumo", query);
    return database.executar(query);
}

function getProcessTree(id_servidor, pid) {
    var query = `
    WITH RECURSIVE process_tree AS (
        SELECT * FROM vw_registro_processo_ultimos
        WHERE pid = ${pid}
    UNION ALL
        SELECT vw.* FROM vw_registro_processo_ultimos AS vw, process_tree AS pt
            WHERE vw.pid = pt.ppid AND pt.pid != 0
    )
    SELECT * FROM process_tree WHERE fk_servidor = ${id_servidor};
    `
    info("Pegar árvore do processo", query);
    return database.executar(query);
}


module.exports = {
    getQtdTotalProcessos,
    getProcessos,
    getProcessosMaiorConsumo,
    getProcessTree
};