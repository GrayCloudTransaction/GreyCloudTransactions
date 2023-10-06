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
            )
              
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

// listarFuncionarios()
function listarFuncionarios() {

  // Onde estiver entre --->  <--- interpolar com os dados do banco
  // Seus respectivos IDs também devem ser interpolados, utilizando o i do for
  listaDeFuncionarios.innerHTML += `
  <tr id="funcionario_1">
    <td>
      <div class="d-flex px-2 py-1">
        <div class="d-flex flex-column justify-content-center">
          <h6 class="mb-0 text-sm" id="nome_1"> ---> NOME DO FUNCIONÁRIO <--- </h6>
          <p class="text-xs text-secondary mb-0" id="email_1"> ---> EMAIL DO FUNCIONÁRIO <--- </p>
        </div>
      </div>
    </td>
    <td>
      <p class="text-xs font-weight-bold mb-0" id="cargo_1"> ---> CARGO DO FUNCIONÁRIO <--- </p>
    </td>
    <td class="password">
      <p class="text-xs font-weight-bold mb-0" id="senha_1"> ---> SENHA DO FUNCIONÁRIO <--- </p>
    </td>
    <td>
      <p class="text-xs font-weight-bold mb-0" id="cpf_1"> ---> CPF DO FUNCIONÁRIO <--- </p>
    </td>
    <td class="align-middle">
      <p class=" text-xs font-weight-bold mb-0" id="permissao_1"> ---> PERMISSÃO DO FUNCIONÁRIO <--- </p>
    </td>
    <td class="align-middle text-center text-sm">
      <span class="badge badge-sm bg-gradient-success">Online</span>
    </td>
    <td class="align-middle">
      <a onclick="editarFuncionario(1)" class="text-secondary font-weight-bold text-xs display-func" data-toggle="tooltip" data-original-title="Edit user">
        Editar
      </a>
    </td>
  </tr>`;

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
}

function editarFuncionario (n) {

  var nome = document.querySelector(`#nome_${n}`).textContent;
  var email = document.querySelector(`#email_${n}`).textContent;
  var senha = document.querySelector(`#senha_${n}`).textContent;
  var cpf = document.querySelector(`#cpf_${n}`).textContent;
  var permissao = document.querySelector(`#permissao_${n}`).textContent;
  

  console.log(nome);
  console.log(email);
  console.log(senha);
  console.log(cpf);
  console.log(permissao);


  /*
  Chamada da atualizarFuncionário
  */
}

//receberFuncLogado()
   
//var funcionarioLogado = [];
//var outrosFuncionarios = [];

// carregarFuncLogado();
// carregarFuncsDaEmpresa();

/*
  function carregarFuncLogado() {
    fetch(`funcionarios/listarPorID/${sessionStorage.ID_FUNCIONARIO}`, {
      cache: "no-store",
    })
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (resposta) {
            console.log(`Funcionários: ${JSON.stringify(resposta)}`);
            resposta.reverse();
            funcionarioLogado = resposta;
            receberFuncLogado(funcionarioLogado);
          });
        } else {
          console.error("Nenhum dado encontrado na API");
        }
      })
      .catch(function (error) {
        console.error(`Erro na obtenção dos dados: ${error.message}`);
      });
  }
*/

/*
  function receberFuncLogado() {
    funcionarioLogado
    idNomeUsuario.innerHTML = sessionStorage.NOME_USUARIO;
    idNomeUsuario.innerHTML = `
            ${funcionarioLogado[0].nome}
        `;
  }
*/

/*
  function carregarFuncsDaEmpresa() {
    fetch(`funcionarios/listarPorEmpresa/${sessionStorage.FK_EMPRESA}`, {
      cache: "no-store",
    })
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (resposta) {
            console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
            resposta.reverse();
            outrosFuncionarios = resposta;
            receberOutrosFuncs(outrosFuncionarios, funcionarioLogado);
          });
        } else {
          console.error("Nenhum dado encontrado na API");
        }
      })
      .catch(function (error) {
        console.error(`Erro na obtenção dos dados: ${error.message}`);
      });
  }

  function receberOutrosFuncs(outrosFuncionarios, funcionarioLogado) {
    for (var i = 0; i < outrosFuncionarios.length; i++) {
      let senha = outrosFuncionarios[i].senha;
      let senhaEscondida = "";
      for (let c = 0; c < senha.length; c++) {
        senhaEscondida += "•";
      }

      listaDeFuncionarios.innerHTML += `
      <tr>
      <td>
        <div class="d-flex px-2 py-1">
          <div>
            <img src="../assets/img/team-4.jpg" class="avatar avatar-sm me-3 border-radius-lg" alt="user6">
          </div>
          <div class="d-flex flex-column justify-content-center">
            <h6 class="mb-0 text-sm">${outrosFuncionarios[i].nome}</h6>
            <p class="text-xs text-secondary mb-0">${outrosFuncionarios[i].email}</p>
          </div>
        </div>
      </td>
      <td>
        <p class="text-xs font-weight-bold mb-0">${outrosFuncionarios[i].cargo}</p>
      </td>

      // <td class="align-middle text-center text-sm">
      //   <span class="badge badge-sm bg-gradient-secondary">Offline</span>
      // </td>
      // <td class="align-middle text-center">
      //   <span class="text-secondary text-xs font-weight-bold">14/09/20</span>
      // </td>

      <td class="align-middle">
        <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user" onclick="alterarFuncionario(${i})">
          Edit
        </a>
      </td>
    </tr>`;
    }
    exibirListaDeFuncionarios.innerHTML += botaoAdicionar;
  }
*/
