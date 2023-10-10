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

function verificarCpf(cpf) {

  var soma = 0;
  var resto;
  var primeiroDigitoVerificador;
  var segundoDigitoVerificador;
  
  var primeirosDigitos = cpf.substring(0, 3) + cpf.substring(4, 7) + cpf.substring(8, 11);

  for (var i = 0; i < primeirosDigitos.length; i++) {
    
    soma += Number(primeirosDigitos.substring(i,i+1)) * (10 - i)
    
  }
  
  resto = soma % 11;
  primeiroDigitoVerificador = 11 - resto;
  
  if (primeiroDigitoVerificador >= 10) {
      primeiroDigitoVerificador = 0;
  }
  
  if (primeiroDigitoVerificador != Number(cpf[12])) {
    
    return true;
  }
  
  /* --------------------------------------------------- Segunda Parte --------------------------------------------------- */
  
  soma = 0;
  resto = 0;
  primeirosDigitos = cpf.substring(0, 3) + cpf.substring(4, 7) + cpf.substring(8, 11) + cpf.substring(12, 13);
  
  for (var i = 0; i < primeirosDigitos.length; i++) {
    
    soma += Number(primeirosDigitos.substring(i,i+1)) * (10 - i)
    
  }
  
  resto = soma % 11;
  segundoDigitoVerificador = 11 - resto;
  
  if (segundoDigitoVerificador >= 10) {

      segundoDigitoVerificador = 0;
  }
  
  if (segundoDigitoVerificador != Number(cpf[13])) {

    return true;
  } else {

    return false;
  }
  
}

function verificarCnpj(cnpj) {

  var soma = 0;
  var resto;
  var primeiroDigitoVerificador;
  var segundoDigitoVerificador;
  
  var primeirosDigitos = cnpj.substring(11, 15).split("").reverse().join("") + cnpj.substring(7, 10).split("").reverse().join("") + cnpj.substring(3, 6).split("").reverse().join("") + cnpj.substring(0, 2).split("").reverse().join("");

  console.log(primeirosDigitos)

  for (var i = 0; i < primeirosDigitos.length; i++) {
    
    if (i == 0) {
      var multiplicador = 2;
      
    } else {
      multiplicador++;
    }
    
    if (multiplicador == 10) {
      multiplicador = 2;
    }
    
    soma += Number(primeirosDigitos.substring(i,i+1)) * multiplicador;
    
  }
  
  resto = soma % 11;
  primeiroDigitoVerificador = 11 - resto;
  
  if (primeiroDigitoVerificador >= 10) {
      primeiroDigitoVerificador = 0;
  }
  
  if (primeiroDigitoVerificador != Number(cnpj[16])) {
    console.log("true")
    return true;
  }
  
  // Segunda parte
  
  soma = 0;
  resto = 0;
  
  primeirosDigitos = cnpj.substring(16,17) + cnpj.substring(11, 15).split("").reverse().join("") + cnpj.substring(7, 10).split("").reverse().join("") + cnpj.substring(3, 6).split("").reverse().join("") + cnpj.substring(0, 2).split("").reverse().join("");

  console.log(primeirosDigitos)

  for (var i = 0; i < primeirosDigitos.length; i++) {
    
    if (i == 0) {
      var multiplicador = 2;
      
    } else {
      multiplicador++;
    }
    
    if (multiplicador == 10) {
      multiplicador = 2;
    }
    
    soma += Number(primeirosDigitos.substring(i,i+1)) * multiplicador;
    
  }
  
  resto = soma % 11;
  segundoDigitoVerificador = 11 - resto;
  
  if (segundoDigitoVerificador >= 10) {
      segundoDigitoVerificador = 0;
  }
  
  if (segundoDigitoVerificador != Number(cnpj[17])) {
    console.log("true")
    return true;
  } else {
    console.log("false")
    return false;
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
  var correcaoEmailFuncionario = email.indexOf("@") <= -1 || email.indexOf(".") <= -1 || email.length > 45;
  var correcaoConfirmacaoSenha = confirmarSenha != senhaFuncionario;

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
    emailFuncionario,
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
  } else {
    if (verificarCnpj(cnpj)) {
      textoAlerta += "Favor inserir um CNPJ válido.\n";
    }
  }

  if (correcaoCep) {
    textoAlerta += "Favor inserir um CEP válido.\n";
  }

  if (correcaoEmail) {
    textoAlerta += "Favor inserir um e-mail válido.\n";
  }

  if (correcaoCpf) {
    textoAlerta += "Favor inserir um CPF válido.\n";
  } else {
    if(verificarCpf(cpfFuncionario)) {
      textoAlerta += "Favor inserir um CPF válido.\n";
    }
  }

  if (correcaoEmailFuncionario) {
    textoAlerta += "Favor inserir um e-mail válido.\n";
  }

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
