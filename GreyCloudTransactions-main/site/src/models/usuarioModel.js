var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM Funcionario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(razaoSocial, cnpj, logradouro, numero, cep, telefone, email) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",razaoSocial, cnpj, logradouro, numero, cep, telefone, email);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Empresa VALUES (NULL , '${razaoSocial}', '${cnpj}', '${logradouro}', ${numero}, ${cep},'${email}', ${telefone});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarFuncionario(nomeFuncionario, cpfFuncionario, cargoFuncionario, emailFuncionario, senhaFuncionario, fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",nomeFuncionario, cpfFuncionario, cargoFuncionario, emailFuncionario,senhaFuncionario, fkEmpresa);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Funcionario VALUES (NULL , '${nomeFuncionario}', '${emailFuncionario}', '${senhaFuncionario}', '${cargoFuncionario}', ${cpfFuncionario}, NULL, ${fkEmpresa});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function pegarIdEmpresa(cnpj) {
    console.log("Acessei o Usuário Model \n", cnpj)
    var instrucao = `
    select idEmpresa from Empresa where cnpj = ${cnpj};
    `
    console.log("Executando Instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    autenticar,
    cadastrar,
    cadastrarFuncionario,
    pegarIdEmpresa
};