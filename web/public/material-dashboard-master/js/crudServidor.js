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

                    listaDeServidores.innerHTML += `
                    <tr id="${servidor.id_servidor}">
                      <td>
                        <div class="d-flex px-2 py-1 justify-content-center">
                          <div class="d-flex flex-column justify-content-center">
                            <h6 class="mb-0 text-sm"><a href="dashboardAnalista.html" onclick="salvarIdServidor(${servidor.id_servidor})">${servidor.codigo}</a></h6>
                          </div>
                        </div>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="text-xs font-weight-bold"> 60% </span>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="text-xs font-weight-bold"> 45% </span>
                      </td>
                      <td class="align-middle">
                        <div class="progress-wrapper w-75 mx-auto">
                          <div class="progress-info">
                            <div class="progress-percentage">
                              <span class="text-xs font-weight-bold">60%</span>
                            </div>
                          </div>
                          <div class="progress">
                            <div class="progress-bar bg-gradient-info w-60" role="progressbar" aria-valuenow="60"
                              aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    `
                }

                listaDeServidores.innerHTML += `
                <tr>
                      <td>
                        <div class="d-flex px-2 py-1">
                          <div class="d-flex flex-column justify-content-center">
                            <a href="../../cadastroMaquinas.html"
                              class="text-secondary font-weight-bold text-xs addFunc-button" style="cursor: pointer;" data-toggle="tooltip"
                              data-original-title="Edit user" onclick="adicionarMaquinas()">
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