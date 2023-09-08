
    function voltarCadastroEmpresa() {
        primeiraParte.style.display = 'block';
        segundaParte.style.display = 'none';
        voltar.style.display = 'none';
    }

    function irParaProximaEtapa() {
        primeiraParte.style.display = 'none';
        segundaParte.style.display = 'block';
        voltar.style.display = 'block';
    }

    // function validacoes(){

    // }

    function cadastrarEmpresaEFuncionario() {
        // dados empresa
        const razaoSocial = iptRazaoSocial.value;
        const cnpj = Number(iptCnpj.value);
        const cep = Number(iptCep.value);
        const logradouro = iptLogradouro.value;
        const numero = Number(iptNumero.value);
        const telefone = Number(iptTelefone.value);
        const email = iptEmail.value;
        // dados funcionario
        const nomeFuncionario = iptNomeFuncionario.value;
        const cpfFuncionario = iptCpfFuncionario.value;
        const cargoFuncionario = iptCargoFuncionario.value;
        const emailFuncionario = iptEmailFuncionario.value;
        const senhaFuncionario = iptSenhaFuncionario.value;
        //fkGerente
        var idEmpresa = 0;


        // if (validar()) {
        fetch("/usuarios/cadastrarEmpresa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                razaoSocialServer: razaoSocial,
                cnpjServer: cnpj,
                cepServer: cep,
                logradouroServer: logradouro,
                numeroServer: numero,
                telefoneServer: telefone,
                emailServer: email
            })
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    resposta.json().then(function (resposta) {
                        fetch(`/usuarios/pegarIdEmpresa/${cnpj}`, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        })
                            .then(function (resposta) {
                                console.log("resposta: ", resposta);

                                if (resposta.ok) {

                                    resposta.json().then(function (resposta) {
                                        console.log(`idEmpresa: ${JSON.stringify(resposta)}`);
                                        idEmpresa = resposta.idEmpresa;
                                        console.log(idEmpresa);

                                        fetch("/usuarios/cadastrarFuncionario", {
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
                                    });
                                } else {
                                    throw "Houve um erro ao tentar realizar o cadastro!";
                                }
                            })
                            .catch(function (resposta) {
                                console.log(`#ERRO: ${resposta}`);
                            });
                    });
                } else {
                    throw "Houve um erro ao tentar realizar o cadastro!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
    }
