function validarCadastrar() {
  var nomeFuncionario = iptNomeFuncionario.value;
  var cpfFuncionario = iptCpfFuncionario.value;
  var cargoFuncionario = iptCargoFuncionario.value;
  var emailFuncionario = iptEmailFuncionario.value;
  var senhaFuncionario = iptSenhaFuncionario.value;
  var confSenhaFuncionario = iptConfirmarSenhaFuncionario.value;
  var fkGerente = sessionStorage.ID_USUARIO;
  var idEmpresa = sessionStorage.ID_EMPRESA;

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

function cadastrarNovoFuncionario() {
  
  var nomeFuncionario = iptNomeFuncionario.value;
  var cpfFuncionario = iptCpfFuncionario.value;
  var cargoFuncionario = iptCargoFuncionario.value;
  var emailFuncionario = iptEmailFuncionario.value;
  var permissaoFuncionario = iptPermissao.value;
  var senhaFuncionario = iptSenhaFuncionario.value;
  var confSenhaFuncionario = iptConfirmarSenhaFuncionario.value;
  var fkGerente = sessionStorage.ID_USUARIO;
  var idEmpresa = sessionStorage.ID_EMPRESA;

  if (validarCadastrar()) {
    
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
                <a onclick="editarFuncionario(${idFuncionario})" class="text-secondary font-weight-bold text-xs display-func" data-toggle="tooltip" data-original-title="Edit user">
                  Editar
                </a>
              </td>
              <td class="align-middle">
                <a onclick="excluirFuncionario(${idFuncionario})" class="text-secondary font-weight-bold text-xs display-func" data-toggle="tooltip" data-original-title="Edit user">
                  Excluir
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
                  <a href="./cadastroFuncionarios.html" class="text-secondary font-weight-bold text-xs addFunc-button display-func" data-toggle="tooltip" data-original-title="Edit user" onclick="adicionarFuncionario()">
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
  var nomeFuncionario = iptNomeFuncionario.value;
  var cpfFuncionario = iptCpfFuncionario.value;
  var cargoFuncionario = iptCargoFuncionario.value;
  var emailFuncionario = iptEmailFuncionario.value;
  var senhaFuncionario = iptSenhaFuncionario.value;
  var confSenhaFuncionario = iptConfirmarSenhaFuncionario.value;

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
  }

  if (correcaoConfirmacaoSenha) {
    textoAlerta += "A senha do campo 'Confirmar senha' está diferente da senha inserida anteriormente.\n";
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

function modal() {
  var modal = document.getElementById("modalEditarFuncionario");
  var modal_wrapper = document.getElementById("modalWrapperEditarFuncionario");

  var span = document.getElementsByClassName("close")[0];

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

function editarFuncionario (idFuncionario) {
  
  modal();

  var nome = document.querySelector(`#nome_${idFuncionario}`).textContent;
  var email = document.querySelector(`#email_${idFuncionario}`).textContent;
  var senha = document.querySelector(`#senha_${idFuncionario}`).textContent;
  var cargo = document.querySelector(`#cargo_${idFuncionario}`).textContent;
  var cpf = document.querySelector(`#cpf_${idFuncionario}`).textContent;
  var permissao = document.querySelector(`#permissao_${idFuncionario}`).textContent;

  iptNomeFuncionario.value = nome;
  iptEmailFuncionario.value = email;
  iptSenhaFuncionario.value = senha;
  iptCargoFuncionario.value = cargo;
  iptCpfFuncionario.value = cpf;
  iptPermissaoFuncionario.value = permissao;

  var btnEditar = document.getElementById("btnEditar");

  btnEditar.onclick = function (){
    if (validarEditar()) {

      fetch("/funcionario/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomeServer: nome,
          emailServer: email,
          senhaServer: senha,
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

