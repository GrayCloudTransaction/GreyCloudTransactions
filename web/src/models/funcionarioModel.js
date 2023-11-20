var database = require("../database/config");

// Funções locais -- Usado somene por esse arquivo;
function info(func, query){
    console.log(`[Funcionario Model] Função: ${func};\nQuery: ${query}`)
}


// Funções para exportar -- Usada por outros arquivos

function cadastrarFuncionario(nomeFuncionario, cpfFuncionario, cargoFuncionario, emailFuncionario, senhaFuncionario, fkEmpresa) {
    var instrucao = `
        INSERT INTO funcionario (nome, email, senha, cargo, cpf, permissao, fk_gerente, fk_empresa)
        VALUES ('${nomeFuncionario}', '${emailFuncionario}', '${senhaFuncionario}', '${cargoFuncionario}', '${cpfFuncionario}', 1, NULL, ${fkEmpresa});
    `;
    
    info("Cadastrar Funcionário", instrucao)

    return database.executar(instrucao);
}

function cadastrarNovoFuncionario(nomeFuncionario, emailFuncionario, senhaFuncionario, cargoFuncionario, cpfFuncionario, permissaoFuncionario, fkGerente, fkEmpresa) {
    var instrucao = `
        INSERT INTO funcionario (nome, email, senha, cargo, cpf, permissao, fk_gerente, fk_empresa) 
        VALUES ('${nomeFuncionario}', '${emailFuncionario}', '${senhaFuncionario}', '${cargoFuncionario}', '${cpfFuncionario}', ${permissaoFuncionario}, ${fkGerente}, ${fkEmpresa});
    `;
    
    info("Cadastrar Novo Funcionario", instrucao)

    return database.executar(instrucao);
}

function select_funcionario(id_empresa){
    var instrucao = `
        SELECT * FROM funcionario WHERE fk_empresa = ${id_empresa}
    `
    info("Select dos Funcionarios", instrucao)

    return database.executar(instrucao);
}

function delete_funcionario(id_funcionario){
    var instrucao = `
        DELETE FROM funcionario WHERE id_funcionario = ${id_funcionario}
    `
    info("Delete dos Funcionarios", instrucao)

    return database.executar(instrucao);
}

function update_funcionario(nome, email, cargo, cpf, permissao, id_funcionario){
    var instrucao = `
        UPDATE funcionario SET nome = '${nome}', email = '${email}', cargo = '${cargo}', cpf = '${cpf}', permissao = ${permissao} WHERE id_funcionario = ${id_funcionario};
    `
    info("Update dos Funcionarios", instrucao)

    return database.executar(instrucao);
}

module.exports = {
    cadastrarFuncionario,
    cadastrarNovoFuncionario,
    select_funcionario,
    delete_funcionario,
    update_funcionario
}
