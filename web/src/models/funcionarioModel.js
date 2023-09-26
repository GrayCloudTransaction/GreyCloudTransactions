var database = require("../database/config");

// Funções locais -- Usado somene por esse arquivo;
function info(func, query){
    console.log(`[Empresa Model] Função: ${func};\nQuery: ${query}`)
}


// Funções para exportar -- Usada por outros arquivos

function cadastrarFuncionario(nomeFuncionario, cpfFuncionario, cargoFuncionario, emailFuncionario, senhaFuncionario, fkEmpresa) {
    var instrucao = `
        INSERT INTO Funcionario VALUES (NULL , '${nomeFuncionario}', '${emailFuncionario}', '${senhaFuncionario}', '${cargoFuncionario}', ${cpfFuncionario}, '1', NULL, ${fkEmpresa});
    `;
    
    info("Cadastrar Funcionário", instrucao)

    return database.executar(instrucao);
}

function cadastrarNovoFuncionario(nomeFuncionario, emailFuncionario, senhaFuncionario, cargoFuncionario, cpfFuncionario, permissaoFuncionario, fkGerente, fkEmpresa) {
    var instrucao = `
        INSERT INTO Funcionario VALUES (NULL , '${nomeFuncionario}', '${emailFuncionario}', '${senhaFuncionario}', '${cargoFuncionario}', ${cpfFuncionario}, '${permissaoFuncionario}', ${fkGerente}, ${fkEmpresa});
    `;
    
    info("Cadastrar Novo Funcionario", instrucao)

    return database.executar(instrucao);
}

module.exports = {
    cadastrarFuncionario,
    cadastrarNovoFuncionario   
}
