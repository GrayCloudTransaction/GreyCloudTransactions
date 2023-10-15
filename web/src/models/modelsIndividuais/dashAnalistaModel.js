var database = require("../database/config");

// Funções locais -- Usado somene por esse arquivo;
function info(func, query){
    console.log(`[Empresa Model] Função: ${func};\nQuery: ${query}`)
}



function select_dashAnalistaRAM(id_empresa){
    var instrucao = `
    SELECT valor_registro FROM vw_registro_RAM WHERE fk_servidor = ${idServidor}
    `
    info("Select dos Funcionarios", instrucao)

    return database.executar(instrucao);
}