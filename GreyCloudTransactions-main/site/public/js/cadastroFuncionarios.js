function cadastrarNovoFuncionario() {
    // dados funcionario
    const nomeFuncionario = iptNomeFuncionario.value;
    const emailFuncionario = iptEmailFuncionario.value;
    const senhaFuncionario = iptSenhaFuncionario.value;
    const cargoFuncionario = iptCargoFuncionario.value;
    const cpfFuncionario = iptCpfFuncionario.value;
    const permissaoFuncionario = iptPermissao.value;
    const fkGerente = sessionStorage.ID_USUARIO;
    var idEmpresa = sessionStorage.ID_EMPRESA;


    fetch("/usuarios/cadastrarNovoFuncionario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeFuncionarioServer: nomeFuncionario,
            cpfFuncionarioServer: cpfFuncionario,
            cargoFuncionarioServer: cargoFuncionario,
            emailFuncionarioServer: emailFuncionario,
            senhaFuncionarioServer: senhaFuncionario,

            permissaoFuncionarioServer: permissaoFuncionario,

            fkGerenteServer: fkGerente,
            fkEmpresaServer: idEmpresa
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                cardErro.style.display = "block";

                mensagem_erro.innerHTML =
                    "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

                setTimeout(() => {
                    window.location = "login.html";
                }, 2000);
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });



}