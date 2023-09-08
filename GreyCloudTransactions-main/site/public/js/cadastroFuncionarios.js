function cadastrarNovoFuncionario(){
     // dados funcionario
     const fkGerente = sessionStorage.ID_USUARIO;
     const nomeFuncionario = iptNomeFuncionario.value;
     const cpfFuncionario = iptCpfFuncionario.value;
     const cargoFuncionario = iptCargoFuncionario.value;
     const emailFuncionario = iptEmailFuncionario.value;
     const senhaFuncionario = iptSenhaFuncionario.value;
     const permissaoFuncionario = iptPermissao.value;
     var idEmpresa = 0;

                    fetch(`/usuarios/pegarIdEmpresaDoFuncionario/${fkGerente}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                        .then(function (resposta) {
                            console.log("resposta: ", resposta);

                            if (resposta.ok) {

                                resposta.json().then(function (resposta) {
                                    console.log(`fkEmpresa: ${JSON.stringify(resposta)}`);
                                    idEmpresa = resposta.fkEmpresa;
                                    console.log(idEmpresa);

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
                                });
                            } else {
                                throw "Houve um erro ao tentar realizar o cadastro!";
                            }
                        })
                        .catch(function (resposta) {
                            console.log(`#ERRO: ${resposta}`);
                        });
                
}