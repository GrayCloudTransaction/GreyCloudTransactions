var database = require("../database/config")

// Funções locais -- Usado somene por esse arquivo;
function info(func, query){
    console.log(`[Usuário Model] Função: ${func};\nQuery: ${query}`)
}


// Funções para exportar -- Usada por outros arquivos
function autenticar(email, senha) {
    var instrucao = `
        SELECT * FROM Funcionario WHERE email = '${email}' AND senha = '${senha}';
    `;

    info("Autenticar", instrucao)

    return database.executar(instrucao);
}

module.exports = {
    autenticar,
};