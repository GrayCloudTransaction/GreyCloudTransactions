var database = require("../database/config")

// Funções locais
function info(func, query){
    console.log(`[Servidor Model] Função: ${func};\nQuery: ${query}`)
}

function pegarInfoServidor(id_servidor){
    var query = `
        SELECT * FROM servidor WHERE id_servidor = ${id_servidor};
    `;

    info("Pegar info do servidor", query)

    return database.executar(query);
}

function pegarInfoCompsServidor(id_servidor){
    var query = `
        SELECT * FROM modelo_componente, componente
        WHERE fk_modelo_componente = id_modelo_componente AND fk_servidor = ${id_servidor};    
    `;

    info("Pegar info do servidor", query)

    return database.executar(query);
}


// Funções para exportar
function listar(idEmpresa) {
    var query = `
        SELECT * FROM servidor WHERE fk_empresa = ${idEmpresa} ORDER BY prioridade desc;
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

function deletar(id_servidor){
    var query = `
    DELETE FROM servidor WHERE id_servidor = ${id_servidor};
    `
    info("Deletar", query)

    return database.executar(query);
}

function servidorForaDoAr(id_servidor){
    // Essa divisão por 60 é para trazer os minutos, pois a conta retorna segundos
    var query =`
    SELECT TIME_TO_SEC(TIMEDIFF(NOW(), data_registro)) AS tempo_sem_registro FROM vw_registro_geral 
        WHERE fk_servidor = ${id_servidor}
        ORDER BY tempo_sem_registro ASC
        LIMIT 1;
    `
    info("Servidor Fora Do Ar", query)
    return database.executar(query);
}

module.exports = {
    listar,
    alterar,
    inserir,
    deletar,
    pegarInfoServidor,
    pegarInfoCompsServidor,
    servidorForaDoAr
};