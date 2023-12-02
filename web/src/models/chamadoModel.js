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
            COUNT(*) AS qtd_chamados
        FROM chamados 
            INNER JOIN componente ON chamados.fk_componente = componente.id_componente 
            INNER JOIN servidor ON componente.fk_servidor = servidor.id_servidor
        WHERE chamados.fk_empresa = ${id_empresa} AND chamados.data_hora BETWEEN '${data[0]}' AND DATEADD(DAY, 1, '${data[1]}')
        GROUP BY servidor.id_servidor, servidor.nome, servidor.codigo;
        `;
    } else if (opcao == "total") {
        var query = `
        SELECT 
            servidor.id_servidor,
            servidor.nome,
            servidor.codigo,
            COUNT(*) AS "qtd_chamados"
        FROM chamados 
            INNER JOIN componente ON chamados.fk_componente = componente.id_componente 
            INNER JOIN servidor ON componente.fk_servidor = servidor.id_servidor
        WHERE chamados.fk_empresa = ${id_empresa} GROUP BY servidor.id_servidor, servidor.nome, servidor.codigo;
        `;
    } else {
        var query = `
        SELECT 
            servidor.id_servidor,
            servidor.nome,
            servidor.codigo,
            COUNT(*) AS qtd_chamados
        FROM chamados 
            INNER JOIN componente ON chamados.fk_componente = componente.id_componente 
            INNER JOIN servidor ON componente.fk_servidor = servidor.id_servidor
        WHERE chamados.fk_empresa = ${id_empresa} AND CONVERT(VARCHAR(10), chamados.data_hora, 111) LIKE '${data}%'
        GROUP BY servidor.id_servidor, servidor.nome, servidor.codigo;
        `;
    }
    
    info(`Listar por servidor [${opcao}]`, query);
    return database.executar(query);
}

function listarPorMes(id_empresa) {

    var query = `
    SELECT 
        FORMAT(chamados.data_hora, 'yyyyMM') AS ano_mes,
        COUNT(*) AS qtd_chamados
    FROM chamados 
    WHERE chamados.fk_empresa = ${id_empresa}
    GROUP BY FORMAT(chamados.data_hora, 'yyyyMM');
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
        DATEDIFF(SECOND, chamados.data_hora, GETDATE()) AS tempo
    FROM chamados
        INNER JOIN componente ON chamados.fk_componente = componente.id_componente 
        INNER JOIN servidor ON componente.fk_servidor = servidor.id_servidor  
    WHERE servidor.fk_empresa = ${id_empresa} AND chamados.status = 'Aberto'
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