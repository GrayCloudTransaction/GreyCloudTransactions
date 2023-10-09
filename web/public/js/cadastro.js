function voltarCadastroEmpresa() {
  primeiraParte.style.display = "block";
  segundaParte.style.display = "none";
  voltar.style.display = "none";
}

function irParaProximaEtapa() {
  primeiraParte.style.display = "none";
  segundaParte.style.display = "block";
  voltar.style.display = "block";
}

function mascara(input,tipo) {
  var valorInput = input.value;

  if (isNaN(valorInput[valorInput.length-1])) {
    input.value = valorInput.substring(0, valorInput.length-1);
    return;
  }
 
  if (tipo == "cpf") {
    if (valorInput.length == 3 || valorInput.length == 7) {   
      input.value += ".";
    } else if (valorInput.length == 11) {   
      input.value += "-";
    } 
  }

  if (tipo == "cnpj") {
    if (valorInput.length == 2 || valorInput.length == 6) {
      input.value += ".";
    } else if (valorInput.length == 10) {
      input.value += "/";
    } else if (valorInput.length == 15) {
      input.value += "-";
    }
  }

  if (tipo == "cep") {   
    if (valorInput.length == 5) {
      input.value += "-";
    }
  }

  if (tipo == "tel") { 
    if (valorInput.length == 1) {
      input.value = "(" + valorInput;
    } else if (valorInput.length == 3) {
      input.value = valorInput + ")";
    } else if (valorInput.length == 8) {
      input.value = valorInput + "-";
    }
  }
}

function validar() {
  var razaoSocial = iptRazaoSocial.value;
  var cnpj = iptCnpj.value;
  var cep = iptCep.value;
  var numero = Number(iptNumero.value);
  var telefone = iptTelefone.value;
  var email = iptEmail.value;
  // dados funcionario
  var nomeFuncionario = iptNomeFuncionario.value;
  var cpfFuncionario = iptCpfFuncionario.value;
  var cargoFuncionario = iptCargoFuncionario.value;
  var emailFuncionario = iptEmailFuncionario.value;
  var senhaFuncionario = iptSenhaFuncionario.value;
  var confirmarSenha = iptConfirmarSenhaFuncionario.value;

  var correcaoCnpj = cnpj.length != 18;
  var correcaoCep = cep.length != 9;
  var correcaoEmail = email.indexOf("@") <= -1 || email.indexOf(".") <= -1 || email.length > 45;

  var correcaoCpf = cpfFuncionario.length != 14;
  var correcaoConfirmacaoSenha = confirmarSenha != senhaFuncionario;
  // var correcaoSenha =
  //   senhaFuncionario.indexOf(0) >= 1 ||
  //   senhaFuncionario.indexOf(1) >= 1 ||
  //   senhaFuncionario.indexOf(2) >= 1 ||
  //   senhaFuncionario.indexOf(3) >= 1 ||
  //   senhaFuncionario.indexOf(4) >= 1 ||
  //   senhaFuncionario.indexOf(5) >= 1 ||
  //   senhaFuncionario.indexOf(6) >= 1 ||
  //   senhaFuncionario.indexOf(7) >= 1 ||
  //   senhaFuncionario.indexOf(8) >= 1 ||
  //   senhaFuncionario.indexOf(9) >= 1;

  var textoAlerta = "";

  var campos = [
    razaoSocial,
    cnpj,
    cep,
    numero,
    telefone,
    email,
    nomeFuncionario,
    cpfFuncionario,
    cargoFuncionario,
    email,
    senhaFuncionario,
    confirmarSenha,
  ];

  for (var i = 0; i < campos.length; i++) {
    if (campos[i] == "") {
      textoAlerta += "Preencha todos os campos.\n";
      break;
    }
  }

  if (correcaoCnpj) {
    textoAlerta += "Favor inserir um CNPJ válido.\n";
  }

  if (correcaoEmail) {
    textoAlerta += "Favor inserir um e-mail válido.\n";
  }

  if (correcaoCpf) {
    textoAlerta += "Favor inserir um CPF válido.\n";
  }

  // if (correcaoSenha) {
  //   textoAlerta += "Insira pelo menos um número e um caracter especial (*, # ou _ ) na senha.\n";
  // }

  if (correcaoConfirmacaoSenha) {
    textoAlerta += "A senha do campo 'Confirmar senha' está diferente da senha inserida anteriormente.\n";
  }

  // -----------------------------------------------------------------------------------------

  if (textoAlerta == "") {
    return true;
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `${textoAlerta}`
    })
    return false;
  }
}

function cadastrarEmpresaEFuncionario() {
  // dados empresa
  const razaoSocial = iptRazaoSocial.value;
  const cnpj = iptCnpj.value;
  const cep = iptCep.value;
  const numero = Number(iptNumero.value);
  const telefone = iptTelefone.value;
  const email = iptEmail.value;
  // dados funcionario
  const nomeFuncionario = iptNomeFuncionario.value;
  const cpfFuncionario = iptCpfFuncionario.value;
  const cargoFuncionario = iptCargoFuncionario.value;
  const emailFuncionario = iptEmailFuncionario.value;
  const senhaFuncionario = iptSenhaFuncionario.value;
  //fkGerente
  var idEmpresa = 0;

  if (validar()) {
    fetch("/empresa/cadastrarEmpresa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        razaoSocialServer: razaoSocial,
        cnpjServer: cnpj,
        cepServer: cep,
        numeroServer: numero,
        telefoneServer: telefone,
        emailServer: email,
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          resposta.json().then(function (resposta) {
            fetch(`/empresa/pegarId`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                cnpjServer: cnpj
              })
            })
              .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                  resposta.json().then(function (resposta) {
                    console.log(`idEmpresa: ${JSON.stringify(resposta)}`);

                    idEmpresa = resposta.id_empresa;
                    console.log(idEmpresa);

                    fetch("/funcionario/cadastrar", {
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
                        fkEmpresaServer: idEmpresa,
                      }),
                    })
                      .then(function (resposta) {
                        console.log("resposta: ", resposta);

                        if (resposta.ok) {
                          Swal.fire(
                            "Sucesso!",
                            "Cadastro Realizado!",
                            "success"
                          );
                          setTimeout(() => {
                            window.location = "login.html";
                          }, 2000);
                        } else {
                          Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Houve um erro ao tentar realizar o cadastro!'
                          })
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
}
