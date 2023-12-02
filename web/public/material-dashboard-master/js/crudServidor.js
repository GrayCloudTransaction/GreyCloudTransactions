function listarServidor() {

    var idEmpresa = sessionStorage.ID_EMPRESA;

    fetch(`/servidor/listar/${idEmpresa}`, {cache: 'no-store'})
    .then(function (resposta) {
        console.log(resposta);
        
        if (resposta.ok) {
            resposta.json().then((json) => {
                console.log(json);
                console.log(JSON.stringify(json));

                for (i = 0; i < json.length; i++) {
                    var servidor = json[i];
                    var idServidor = servidor.id_servidor;
                    var texto_prioridade = ``;
                    var cor = ""

                    if(servidor.prioridade <= 0){
                      texto_prioridade = `Seguro`
                      cor = "green"
                    }
                    else if(servidor.prioridade < 4){
                      texto_prioridade = `Alerta`
                      cor = "darkgoldenrod"
                    }
                    else if(servidor.prioridade < 8){
                      texto_prioridade = `Perigo`
                      cor = "brown"
                    }
                    else{
                      texto_prioridade = `PERIGO MÁXIMO`
                      cor = "maroon"
                    }

                    listaDeServidores.innerHTML += `
                    <tr id="${idServidor}">
                      <td>
                        <div class="d-flex px-2 py-1 justify-content-center">
                          <div class="d-flex flex-column justify-content-center">
                            <h6 class="mb-0 text-sm"><a href="dashboardAnalista.html" id="codigo_${idServidor}" onclick="salvarIdServidor(${idServidor})">${servidor.codigo}</a></h6>
                          </div>
                        </div>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="text-xs font-weight-bold" style="color:${cor};">${texto_prioridade}</span>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="text-xs font-weight-bold" id="nome_${idServidor}">${servidor.nome}</span>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="text-xs font-weight-bold" id="tipo_${idServidor}">${servidor.tipo}</span>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="text-xs font-weight-bold" id="descricao_${idServidor}">${servidor.descricao}</span>
                      </td>
                      <td class="align-middle">
                        <a onclick="editarServidor(${idServidor})" class="btn btn-link text-dark px-3 mb-0">
                        <i class="material-icons text-sm me-2">edit</i>
                        Editar
                        </a>
                      </td>
              <td class="align-middle">
                <a onclick="excluirServidor(${idServidor})" class="btn btn-link text-danger text-gradient px-3 mb-0">
                <i class="material-icons text-sm me-2">delete</i>
                  Excluir
                </a>
              </td>
                    </tr>
                    `
                }

                listaDeServidores.innerHTML += `
                <tr>
                      <td>
                        <div class="d-flex px-2 py-1">
                          <div class="d-flex flex-column justify-content-center">
                            <a onclick="cadastrarServidor()"
                              class="text-secondary font-weight-bold text-xs addFunc-button" style="cursor: pointer;" data-toggle="tooltip"
                              data-original-title="Edit user">
                              Adicionar +
                          </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                `
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

function salvarIdServidor(idServidor) {
    sessionStorage.ID_SERVIDOR = idServidor;
  
}

function modalCadastrar() {
    var modal = document.getElementById("modalCadastrarServidor");
    var modal_wrapper = document.getElementById("modalWrapperCadastrarServidor");
  
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
  
function cadastrarServidor() {
    
    modalCadastrar();
  
    var inputFocus = document.getElementById("iptCadastrarNomeServidor")
  
    inputFocus.focus();
  
    var btnCadastrar = document.getElementById("btnCadastrar");
  
    btnCadastrar.onclick = function (){
  
        var nome = iptCadastrarNomeServidor.value;
        var codigo = iptCadastrarCodigoServidor.value;
        var tipo = iptCadastrarTipoServidor.value;
        var descricao = iptCadastrarDescricaoServidor.value;
        var idEmpresa = sessionStorage.ID_EMPRESA;
      
        fetch(`/servidor/inserir/${idEmpresa}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomeServer: nome,
          codigoServer: codigo,
          tipoServer: tipo,
          descricaoServer: descricao
        }),
      })
        .then(function (resposta) {
          console.log("resposta: ", resposta);
          
          if (resposta.ok) {
            
            Swal.fire(
              "Sucesso!",
              "Servidor cadastrado com sucesso!",
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

function modalEditar() {
    var modal = document.getElementById("modalEditarServidor");
    var modal_wrapper = document.getElementById("modalWrapperEditarServidor");
  
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

function editarServidor (idServidor) {
  
    modalEditar();
  
    var codigo = document.querySelector(`#codigo_${idServidor}`).textContent;
    var nome = document.querySelector(`#nome_${idServidor}`).textContent;
    var tipo = document.querySelector(`#tipo_${idServidor}`).textContent;
    var descricao = document.querySelector(`#descricao_${idServidor}`).textContent;
  
    iptEditarCodigoServidor.value = codigo;
    iptEditarNomeServidor.value = nome;
    iptEditarTipoServidor.value = tipo;
    iptEditarDescricaoServidor.value = descricao;
  
    var btnEditar = document.getElementById("btnEditar");
  
    btnEditar.onclick = function () {
  
        codigo = iptEditarCodigoServidor.value;
        nome = iptEditarNomeServidor.value;
        tipo = iptEditarTipoServidor.value;
        descricao = iptEditarDescricaoServidor.value;
  
        fetch(`/servidor/alterar/${idServidor}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nomeServer: nome,
            codigoServer: codigo,
            tipoServer: tipo,
            descricaoServer: descricao
          }),
        })
        .then(function (resposta) {
          console.log(resposta);
      
          if (resposta.ok) {
            Swal.fire(
              "Sucesso!",
              "Servidor atualizado com sucesso!",
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

function modalExcluir() {

    var modal = document.getElementById("modalExcluirServidor");
    var modal_wrapper = document.getElementById("modalWrapperExcluirServidor");
  
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
  
function excluirServidor(idServidor) {
  
    modalExcluir();
  
    var btnExcluir = document.getElementById("btnExcluir");
  
    btnExcluir.onclick = function (){
  
        fetch(`/servidor/deletar/${idServidor}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(function (resposta) {
          console.log(resposta);
      
          if (resposta.ok) {
            Swal.fire(
              "Sucesso!",
              "Servidor excluido com sucesso!",
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