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

function validar() {
  var razaoSocial = iptRazaoSocial.value;
  var cnpj = Number(iptCnpj.value);
  var cep = Number(iptCep.value);
  var logradouro = iptLogradouro.value;
  var numero = Number(iptNumero.value);
  var telefone = Number(iptTelefone.value);
  var email = iptEmail.value;
  // dados funcionario
  var nomeFuncionario = iptNomeFuncionario.value;
  var cpfFuncionario = iptCpfFuncionario.value;
  var cargoFuncionario = iptCargoFuncionario.value;
  var emailFuncionario = iptEmailFuncionario.value;
  var senhaFuncionario = iptSenhaFuncionario.value;
  var confirmarSenha = iptConfirmarSenhaFuncionario.value;

  var correcaoRazaoSocial = razaoSocial.length >= 45;
  var correcaoCnpj = cnpj.length != 14;
  console.log(cnpj);
  console.log(correcaoCnpj);
  var correcaoCep = cep.length != 8;
  var correcaoLogradouro = logradouro.length >= 120;
  var correcaoEmail = email.indexOf("@") <= -1 || email.length > 45;

  var correcaoNomeFuncionario = nomeFuncionario.length >= 45;
  var correcaoCpf = cpfFuncionario.length != 11;

  var correcaoConfirmacaoSenha = confirmarSenha != senhaFuncionario;

  var tamanhoCargoFuncionario = cargoFuncionario.length;
  var tamanhoEmailEmpresa = email.length;
  var tamanhoEmailFuncionario = emailFuncionario.length;
  var tamanhoSenha = senhaFuncionario.length;
  // var tamanho_celular = ax_celular.length;

  var senha_correta =
    senhaFuncionario.indexOf(0) >= 1 ||
    senhaFuncionario.indexOf(1) >= 1 ||
    senhaFuncionario.indexOf(2) >= 1 ||
    senhaFuncionario.indexOf(3) >= 1 ||
    senhaFuncionario.indexOf(4) >= 1 ||
    senhaFuncionario.indexOf(5) >= 1 ||
    senhaFuncionario.indexOf(6) >= 1 ||
    senhaFuncionario.indexOf(7) >= 1 ||
    senhaFuncionario.indexOf(8) >= 1 ||
    senhaFuncionario.indexOf(9) >= 1;

  var senha_correta02 =
    senhaFuncionario.indexOf("*") == 1 ||
    senhaFuncionario.indexOf("#") == 1 ||
    senhaFuncionario.indexOf("_") >= 1;

  var textoAlerta = "";

  var campos = [
    razaoSocial,
    cnpj,
    cep,
    logradouro,
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

  if (cnpj.toString().length != 14) {
    textoAlerta += "Favor inserir um CNPJ válido, sem pontuações.\n";
  }
  if (correcaoEmail) {
    textoAlerta += "Favor inserir um e-mail válido.\n";
  }
  if (correcaoCpf) {
    textoAlerta +=
      "Favor inserir um CPF válido, sem pontuações (11 caracteres).\n";
  }
  if (senha_correta == false && senha_correta02 == false) {
    textoAlerta +=
      "Insira pelo menos um número e um caracter especial (*, # ou _ ) na senha.\n";
  }
  if (correcaoConfirmacaoSenha) {
    textoAlerta +=
      "A senha do campo 'Confirmar senha' está diferente da senha inserida anteriormente.\n";
  }

  // -----------------------------------------------------------------------------------------
  if (tamanhoCargoFuncionario > 45) {
    textoAlerta +=
      "O nome do representante deve ter no máximo 75 caracteres.\n";
  }
  if (tamanhoEmailEmpresa > 45) {
    textoAlerta += "O email da Empresa deve ter no máximo 45 caracteres.\n";
  }
  if (tamanhoEmailFuncionario > 45) {
    textoAlerta += "O email do Funcionario deve ter no máximo 45 caracteres.\n";
  }
  if (tamanhoSenha > 45) {
    textoAlerta += "A senha deve ter no máximo 45 caracteres.\n";
  }
  // if (tamanho_celular > 11) {
  //     textoAlerta += "O celular com o DDD e sem pontuação, deve ter no máximo 11 caracteres.";
  // }

  if (textoAlerta == "") {
    return true;
  } else {
    alert(textoAlerta);
    return false;
  }
}

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

  if (validar()) {
    fetch("/usuarios/cadastrarEmpresa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
        emailServer: email,
      }),
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
                        fkEmpresaServer: idEmpresa,
                      }),
                    })
                      .then(function (resposta) {
                        console.log("resposta: ", resposta);

                        if (resposta.ok) {
                          cardErro.style.display = "block";

                          mensagem_erro.innerHTML =
                            "Cadastro realizado com sucesso! Redirecionando para tela de Login...";
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
}
