var database = require("../../database/config");

// Funções Locais
function info(func, query){
    console.log(`[Felipe Santos Model] Função: ${func};\nQuery: ${query}`)
}

// Funções para Exportar
function listar_extrato(idServidor){
    var query = `SELECT * FROM vw_extrato WHERE id_servidor = ${idServidor}`;
    info("Listar tabela de Preço Componente", query);    
    return database.executar(query);
}

function listar_extrato_atual(idServidor){
    var query = `
    SELECT nome_servidor, MONTH(dia) AS mes, tipo_componente, SUM(qtd_horas) FROM vw_extrato 
	WHERE id_servidor = ${idServidor} 
    GROUP BY 
		tipo_componente,
        mes
	ORDER BY 
		mes DESC
	LIMIT 3;`
    info("Listar Extrato Atual", query);
    return database.executar(query);
}

function listar_extrato_acumulado(idEmpresa, dias){
    var query = `
    SELECT 
        MONTH(dia) AS 'mes',
        tipo_componente AS 'comp', 
        SUM(qtd_horas) AS 'horas',
        SUM(valor_calculado) AS 'valor'
    FROM vw_extrato 
        WHERE id_empresa = ${idEmpresa} AND 
        dia >= DATE_SUB(NOW(), INTERVAL ${dias} DAY)
            GROUP BY
                comp,
                MONTH(dia)
            ORDER BY 
                MONTH(dia) DESC;`
        
    info("Listar Extrato Acumulado", query);
    return database.executar(query);
}

function listar_preco_componente(){
    var query = `
    SELECT c.tipo_componente AS 'comp', 
        pc.preco 
    FROM tb_preco_componente AS pc 
		    INNER JOIN componente AS c ON pc.fk_componente = c.id_componente;`
    
    info("Listar preço dos Componente", query);
    return database.executar(query);
}

function lista_preco_disco(idServidor){
    var query = 
    `SELECT 
	    pc.preco AS preco,
        ebs.espaco_alocado AS espaco
    FROM 
	    tb_extrato_ebs AS ebs INNER JOIN tb_preco_componente AS pc ON
		    pc.id_preco_componente = ebs.fk_preco_componente
        WHERE fk_servidor = ${idServidor};
    `
    info("Listar preço do Disco", query);
    return database.executar(query)
}

function historico_somarizado_por_servidor(idEmpresa, dias){
    var query = `
    SELECT 
        id_servidor,
        nome_servidor,
        SUM(valor_calculado) AS 'valor'
    FROM vw_extrato 
        WHERE id_empresa = ${idEmpresa} AND 
           dia >= DATE_SUB(NOW(), INTERVAL ${dias} DAY)
            GROUP BY
                id_servidor,
                nome_servidor;
    `;

    info("historico somarizado por servidor", query);
    return database.executar(query);
}

function historico_somarizado_por_empresa(idEmpresa, dias){
    var query = `
    SELECT 
        MONTH(dia) AS mes,
        SUM(qtd_horas) AS horas,
        SUM(valor_calculado) AS valor
    FROM vw_extrato 
        WHERE id_empresa = ${idEmpresa} AND 
            dia >= DATE_SUB(NOW(), INTERVAL ${dias} DAY)
            GROUP BY
                MONTH(dia)
            ORDER BY 
                MONTH(dia) ASC;
    `;
    info("historico somarizado por empresa", query);
    return database.executar(query);
}

function custo_ordenado_kpi(componente, idEmpresa, dias){
    var query = `
    SELECT 
        nome_servidor,
        MONTH(dia) AS 'mes',
        tipo_componente AS 'comp', 
        SUM(qtd_horas) AS 'horas',
        SUM(valor_calculado) AS 'valor'
    FROM vw_extrato 
        WHERE id_empresa = ${idEmpresa} AND 
        dia >= DATE_SUB(NOW(), INTERVAL ${dias} DAY) AND
        tipo_componente = '${componente}'
            GROUP BY
                nome_servidor,
                comp,
                MONTH(dia)
            ORDER BY 
                valor desc;
    `;
    info("custo ordenado kpi", query);
    return database.executar(query);
}

function lista_sistema_java(idEmpresa){
    var query = `
    SELECT 
        s.nome
        , f.* 
    FROM tb_felipe_config AS f
        INNER JOIN servidor AS s ON s.id_servidor = f.fk_servidor
        WHERE f.fk_empresa = ${idEmpresa}
        ORDER BY
            s.nome; 
    `
    info("Sistema Java - Listagem", query);
    return database.executar(query);
}

function atualizar_sistema_java(is_ativo, id_config){
    var query = `
    UPDATE tb_felipe_config SET is_ativo = "${is_ativo}" WHERE id_config = ${id_config};
    `;
    info("Sistema Java - Atualização", query);
    return database.executar(query);
}

module.exports = {
    listar_extrato,
    listar_extrato_atual,
    listar_extrato_acumulado,
    listar_preco_componente,
    lista_preco_disco,
    historico_somarizado_por_servidor,
    historico_somarizado_por_empresa,
    custo_ordenado_kpi,
    lista_sistema_java,
    atualizar_sistema_java
};