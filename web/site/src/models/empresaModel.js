var database = require("../database/config");

// Funções locais -- Usado somene por esse arquivo;
function info(func, query){
    console.log(`[Empresa Model] Função: ${func};\nQuery: ${query}`)
}


// Funções para exportar -- Usada por outros arquivos
function cadastrar(razaoSocial, cnpj, logradouro, numero, cep, telefone, email) {
    var instrucao = `
        INSERT INTO Empresa VALUES (NULL , '${razaoSocial}', '${cnpj}', '${logradouro}', ${numero}, '${cep}','${email}', '${telefone}');
    `;

    info("Cadastrar", instrucao)

    return database.executar(instrucao);
}

function pegarId(cnpj) {
    var instrucao = `
    select idEmpresa from Empresa where cnpj = ${cnpj};
    `

    info("Pegar Id", instrucao)

    return database.executar(instrucao);
}

module.exports = {
    cadastrar,
    pegarId
}
