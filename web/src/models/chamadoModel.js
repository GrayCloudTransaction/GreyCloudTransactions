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
    info("Listar por empresa", query);
    return database.executar(query);
}

function listarPorServidor(id_empresa, data, opcao) {

    if (opcao == "personalizado") {
        var query = `
        SELECT 
            servidor.id_servidor,
            servidor.nome,
            servidor.codigo,
            COUNT(*) AS "qtd_chamados"
        FROM chamados 
            JOIN componente ON chamados.fk_componente = componente.id_componente 
            JOIN servidor ON componente.fk_servidor = servidor.id_servidor
        WHERE chamados.fk_empresa = ${id_empresa} AND chamados.data_hora BETWEEN "${data[0]}" AND DATE_ADD("${data[1]}", INTERVAL 1 DAY) GROUP BY id_servidor;
        `;
    } else if (opcao == "total") {
        var query = `
        SELECT 
            servidor.id_servidor,
            servidor.nome,
            servidor.codigo,
            COUNT(*) AS "qtd_chamados"
        FROM chamados 
            JOIN componente ON chamados.fk_componente = componente.id_componente 
            JOIN servidor ON componente.fk_servidor = servidor.id_servidor
        WHERE chamados.fk_empresa = ${id_empresa} GROUP BY id_servidor;
        `;
    } else {
        var query = `
        SELECT 
            servidor.id_servidor,
            servidor.nome,
            servidor.codigo,
            COUNT(*) AS "qtd_chamados"
        FROM chamados 
            JOIN componente ON chamados.fk_componente = componente.id_componente 
            JOIN servidor ON componente.fk_servidor = servidor.id_servidor
        WHERE chamados.fk_empresa = ${id_empresa} AND chamados.data_hora LIKE "%${data}%" GROUP BY id_servidor;
        `;
    }
    
    info(`Listar por servidor [${opcao}]`, query);
    return database.executar(query);
}

function listarPorMes(id_empresa) {

    var query = `
    SELECT 
	    DATE_FORMAT(chamados.data_hora,'%Y%m') AS "ano_mes",
	    COUNT(*) AS "qtd_chamados"
    FROM chamados WHERE chamados.fk_empresa = ${id_empresa} 
    GROUP BY ano_mes;
    `;
    info("Listar por mês", query);
    return database.executar(query);
}

function listarUltimosChamados(id_empresa) {

    var query = `
    SELECT
	    servidor.nome,
        servidor.codigo,
        chamados.titulo,
        chamados.descricao, 
        TIME_TO_SEC(TIMEDIFF(NOW(), chamados.data_hora)) AS "tempo"
    FROM chamados
	    JOIN componente ON chamados.fk_componente = componente.id_componente 
	    JOIN servidor ON componente.fk_servidor = servidor.id_servidor  
	WHERE servidor.fk_empresa = ${id_empresa} AND chamados.status = "Aberto"
    ORDER BY tempo ASC;
    `;
    info("Listar por mês", query);
    return database.executar(query);
}

module.exports = {
    listarPorEmpresa,
    listarPorServidor,
    listarPorMes,
    listarUltimosChamados
}