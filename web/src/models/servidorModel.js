var database = require("../database/config")

// Funções locais
function info(func, query){
    console.log(`[Servidor Model] Função: ${func};\nQuery: ${query}`)
}


// Funções para exportar
function listar(idEmpresa) {
    var query = `
        SELECT * FROM servidor WHERE fk_empresa = ${idEmpresa};
    `;

    info("Listar", query)

    return database.executar(query);
}

function alterar(id_servidor, nome, codigo, tipo, descricao){
    var query = `
    UPDATE servidor 
        SET nome = "${nome}"
        , codigo= "${codigo}"
        , tipo = "${tipo}"
        , descricao = "${descricao}"
        WHERE id_servidor = ${id_servidor};
    `
    info("Alterar", query);

    return database.executar(query);
}

function inserir(nome, codigo, tipo, descricao, fk_empresa){
    var query =`
    INSERT INTO servidor (nome, codigo, tipo, descricao, fk_empresa)
    VALUES ('${nome}', '${codigo}', '${tipo}', '${descricao}', ${fk_empresa});
    `;
    info("Inserir", query);

    return database.executar(query);
}

module.exports = {
    listar,
    alterar,
    inserir
};