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

function validarCadastrar() {
  var nomeFuncionario = iptCadastrarNomeFuncionario.value;
  var cpfFuncionario = iptCadastrarCpfFuncionario.value;
  var cargoFuncionario = iptCadastrarCargoFuncionario.value;
  var emailFuncionario = iptCadastrarEmailFuncionario.value;
  var senhaFuncionario = iptCadastrarSenhaFuncionario.value;
  var confSenhaFuncionario = iptCadastrarConfirmarSenhaFuncionario.value;

  var correcaoEmail = emailFuncionario.indexOf("@") <= -1 || emailFuncionario.indexOf(".") <= -1;
  var correcaoCpf = cpfFuncionario.length != 14;
  var correcaoConfirmacaoSenha = confSenhaFuncionario != senhaFuncionario;

  var textoAlerta = "";

  var campos = [
    nomeFuncionario,
    cpfFuncionario,
    cargoFuncionario,
    emailFuncionario,
    senhaFuncionario,
    confSenhaFuncionario,
  ];

  for (var i = 0; i < campos.length; i++) {
    if (campos[i] == "") {
      textoAlerta += "Preencha todos os campos.\n";
      break;
    }
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

function modalCadastrar() {
  var modal = document.getElementById("modalCadastrarFuncionario");
  var modal_wrapper = document.getElementById("modalWrapperCadastrarFuncionario");

  var span = document.getElementsByClassName("close")[0];

  modal.style.display = "block";

  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal || event.target == modal_wrapper) {
      modal.style.display = "none";
    }
  }
}

function cadastrarNovoFuncionario() {
  
  modalCadastrar();

  var inputFocus = document.getElementById("iptCadastrarNomeFuncionario")

  inputFocus.focus();

  var btnCadastrar = document.getElementById("btnCadastrar");

  btnCadastrar.onclick = function (){

    if (validarCadastrar()) {

      var nomeFuncionario = iptCadastrarNomeFuncionario.value;
      var cpfFuncionario = iptCadastrarCpfFuncionario.value;
      var cargoFuncionario = iptCadastrarCargoFuncionario.value;
      var emailFuncionario = iptCadastrarEmailFuncionario.value;
      var permissaoFuncionario = iptCadastrarPermissaoFuncionario.value;
      var senhaFuncionario = iptCadastrarSenhaFuncionario.value;
      var fkGerente = sessionStorage.ID_USUARIO;
      var idEmpresa = sessionStorage.ID_EMPRESA;
    
      fetch("/funcionario/cadastrarNovo", {
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
          
          Swal.fire(
            "Sucesso!",
            "Funcionário cadastrado com sucesso!",
            "success"
            ); 

            setTimeout(() => {
              location.reload();
            }, 3000);

        } else {
          
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Houve um erro no cadastro!",
          });
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });
    }
  }
}
        

function listarFuncionarios() {
  
  var idEmpresa = sessionStorage.ID_EMPRESA;

  fetch("/funcionario/select", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idEmpresaServer: idEmpresa,
    }),
  })
    .then(function (resposta) {
      console.log(resposta);

      if (resposta.ok) {
        resposta.json().then((json) => {
          console.log(json);
          console.log(JSON.stringify(json));
          
          for (i = 0; i < json.length; i++) {
            var funcionario = json[i];
            var idFuncionario = json[i].id_funcionario;

            listaDeFuncionarios.innerHTML += `
            <tr id="funcionario_${idFuncionario}">
              <td>
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm" id="nome_${idFuncionario}">${funcionario.nome}</h6>
                    <p class="text-xs text-secondary mb-0" id="email_${idFuncionario}">${funcionario.email}</p>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0" id="cargo_${idFuncionario}">${funcionario.cargo}</p>
              </td>
              <td class="password">
                <p class="text-xs font-weight-bold mb-0" id="senha_${idFuncionario}">${funcionario.senha}</p>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0" id="cpf_${idFuncionario}">${funcionario.cpf}</p>
              </td>
              <td class="align-middle">
                <p class=" text-xs font-weight-bold mb-0" id="permissao_${idFuncionario}">${funcionario.permissao}</p>
              </td>
              <td class="align-middle">
                <a onclick="editarFuncionario(${idFuncionario})" class="btn btn-link text-dark px-3 mb-0">
                
                <i class="material-icons text-sm me-2">edit</i>
                  EDITAR
                </a>
              </td>
              <td class="align-middle">
                <a onclick="excluirFuncionario(${idFuncionario})" class="btn btn-link text-danger text-gradient px-3 mb-0">
                <i class="material-icons text-sm me-2">delete</i>
                  EXCLUIR
                </a>
              </td>
            </tr>`;
          }

          //Adicionar o botão de adicionar funcionário no final da tabela
          listaDeFuncionarios.innerHTML += `
          <tr>
            <td>
              <div class="d-flex px-2 py-1">
                <div class="d-flex flex-column justify-content-center">
                  <a onclick="cadastrarNovoFuncionario()" class="text-secondary font-weight-bold text-xs addFunc-button display-func" data-toggle="tooltip" data-original-title="Edit user" onclick="adicionarFuncionario()">
                    Adicionar +
                  </a>
                </div>
              </div>
            </td>
          </tr>`
        });
      } else {
      
        resposta.text().then((texto) => {
          console.error(texto);
        });
      }
    })
    .catch(function (erro) {
      console.log(erro);
    });
   
}


function validarEditar() {
  var nomeFuncionario = iptEditarNomeFuncionario.value;
  var cpfFuncionario = iptEditarCpfFuncionario.value;
  var cargoFuncionario = iptEditarCargoFuncionario.value;
  var emailFuncionario = iptEditarEmailFuncionario.value;

  var correcaoEmail = emailFuncionario.indexOf("@") <= -1 || emailFuncionario.indexOf(".") <= -1;
  var correcaoCpf = cpfFuncionario.length != 14;

  var textoAlerta = "";

  var campos = [
    nomeFuncionario,
    cpfFuncionario,
    cargoFuncionario,
    emailFuncionario,
  ];

  for (var i = 0; i < campos.length; i++) {
    if (campos[i] == "") {
      textoAlerta += "Preencha todos os campos.\n";
      break;
    }
  }

  if (correcaoEmail) {
    textoAlerta += "Favor inserir um e-mail válido.\n";
  }

  if (correcaoCpf) {
    textoAlerta += "Favor inserir um CPF válido.\n";
  }


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

function modalEditar() {
  var modal = document.getElementById("modalEditarFuncionario");
  var modal_wrapper = document.getElementById("modalWrapperEditarFuncionario");

  var span = document.getElementsByClassName("close")[1];

  modal.style.display = "block";

  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal || event.target == modal_wrapper) {
      modal.style.display = "none";
    }
  }
}

function editarFuncionario (idFuncionario) {
  
  modalEditar();

  var nome = document.querySelector(`#nome_${idFuncionario}`).textContent;
  var email = document.querySelector(`#email_${idFuncionario}`).textContent;
  var cargo = document.querySelector(`#cargo_${idFuncionario}`).textContent;
  var cpf = document.querySelector(`#cpf_${idFuncionario}`).textContent;
  var permissao = document.querySelector(`#permissao_${idFuncionario}`).textContent;

  iptEditarNomeFuncionario.value = nome;
  iptEditarEmailFuncionario.value = email;
  iptEditarCargoFuncionario.value = cargo;
  iptEditarCpfFuncionario.value = cpf;
  iptEditarPermissaoFuncionario.value = permissao;

  var btnEditar = document.getElementById("btnEditar");

  btnEditar.onclick = function (){

    nome = iptEditarNomeFuncionario.value;
    email = iptEditarEmailFuncionario.value;
    cargo = iptEditarCargoFuncionario.value;
    cpf = iptEditarCpfFuncionario.value;
    permissao = iptEditarPermissaoFuncionario.value;

    if (validarEditar()) {

      fetch("/funcionario/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomeServer: nome,
          emailServer: email,
          cargoServer: cargo,
          cpfServer: cpf,
          permissaoServer: permissao,
          idFuncionarioServer: idFuncionario
        }),
      })
      .then(function (resposta) {
        console.log(resposta);
    
        if (resposta.ok) {
          Swal.fire(
            "Sucesso!",
            "Funcionário atualizado com sucesso!",
            "success"
          );
          
          setTimeout(() => {
            location.reload();
          }, 3000);
          
                
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Houve um erro ao tentar atualizar!'
          })
        }
  
        resposta.text().then((texto) => {
          console.error(texto);
        });
      })
      .catch(function (erro) {
        console.log(erro);
      });      
    }
  }
}


function modalExcluir() {

  var modal = document.getElementById("modalExcluirFuncionario");
  var modal_wrapper = document.getElementById("modalWrapperExcluirFuncionario");

  var span = document.getElementsByClassName("close")[2];

  modal.style.display = "block";

  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal || event.target == modal_wrapper) {
      modal.style.display = "none";
    }
  }

}

function excluirFuncionario(idFuncionario) {


  modalExcluir();

  var btnExcluir = document.getElementById("btnExcluir");

  btnExcluir.onclick = function (){

      fetch("/funcionario/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idFuncionarioServer: idFuncionario
        }),
      })
      .then(function (resposta) {
        console.log(resposta);
    
        if (resposta.ok) {
          Swal.fire(
            "Sucesso!",
            "Funcionário excluido com sucesso!",
            "success"
          );
          
          setTimeout(() => {
            location.reload();
          }, 3000);
            
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Houve um erro ao tentar excluir!'
          })
        }
  
        resposta.text().then((texto) => {
          console.error(texto);
        });
      })
      .catch(function (erro) {
        console.log(erro);
      });      
    }

}