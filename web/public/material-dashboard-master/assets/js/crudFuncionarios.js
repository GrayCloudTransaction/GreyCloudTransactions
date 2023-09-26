receberFuncLogado()

function sair(){
    sessionStorage.ID_USUARIO = null;
      window.location = "GreyCloudTransactions-main\site\public\index.html";
   }
   
   var funcionarioLogado = [];
  var outrosFuncionarios = [];

  carregarFuncLogado();
  carregarFuncsDaEmpresa();

  // function verificarSessao() {
  //   if (sessionStorage.ID_FUNCIONARIO == "null") {
  //     alert("Por favor, logue-se para continuar.");
  //     window.location = "index.html";
  //   }
  // }

  function carregarFuncLogado() {
    // verificarSessao();
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

  function receberFuncLogado() {
    // funcionarioLogado
    // idNomeUsuario.innerHTML = sessionStorage.NOME_USUARIO;
    // idNomeUsuario.innerHTML = `
    //         ${funcionarioLogado[0].nome}
    //     `;
  }

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

  function adicionarFuncionario(){
    window.location = "..\..\GreyCloudTransactions-main\site\public\cadastroFuncionarios.html";
  }