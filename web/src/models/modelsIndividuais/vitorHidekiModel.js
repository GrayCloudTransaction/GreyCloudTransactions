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
    CREATE TABLE #process_tree (
        id_processo INT NOT NULL,
        pid INT NOT NULL,
        ppid INT NULL,
        nome VARCHAR(100) NULL,
        prioridade INT NULL,
        usuario VARCHAR(100) NULL,
        estado VARCHAR(15) NULL,
        uso_ram DECIMAL(5,2) NULL,
        bytes_lidos BIGINT NULL,
        bytes_escritos BIGINT NULL,
        comando TEXT NULL,
        horario DATETIME NOT NULL,
        fk_servidor INT NOT NULL,
    );
    
    INSERT INTO #process_tree
        SELECT *
        FROM vw_registro_processo_ultimos
        WHERE pid = ${pid};
    

    DECLARE @rowCount INT = 1;
    
    WHILE @rowCount > 0
    BEGIN
        INSERT INTO #process_tree
            SELECT vw.*
                FROM vw_registro_processo_ultimos AS vw
            INNER JOIN #process_tree AS pt ON vw.pid = pt.ppid AND pt.pid != 0
            WHERE NOT EXISTS (SELECT 1 FROM #process_tree WHERE pid = vw.pid)
            OPTION (MAXRECURSION 0);
        SET @rowCount = @@ROWCOUNT;
    END;

    SELECT * FROM #process_tree WHERE fk_servidor = 1;
    
    DROP TABLE #process_tree;
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