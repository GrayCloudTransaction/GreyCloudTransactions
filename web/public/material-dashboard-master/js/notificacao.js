function listarUltimosChamados() {
    var idEmpresa = sessionStorage.ID_EMPRESA;
    fetch(`/chamado/listarUltimosChamados/${idEmpresa}`, { cache: 'no-store' })
        .then((resposta) => {
            console.log(resposta)

            if (resposta.ok) {
                resposta.json().then((json) => {
                    console.log(json);
                    console.log(JSON.stringify(json))
                    
                    for (var i = 0; i < json.length; i++) {

                        if (json[i].tempo >= 60) {
                            if (json[i].tempo > 3600) {
                                if (json[i].tempo > 86400) {
                                    var tempo = Math.floor(json[i].tempo/86400);
                                    if (tempo < 2) {
                                        tempo = `${tempo} dia atrás`;
                                    } else {
                                        tempo = `${tempo} dias atrás`;    
                                    }
                                } else {
                                    var tempo = Math.floor(json[i].tempo/3600);
                                    if (tempo < 2) {
                                        tempo = `${tempo} hora atrás`;
                                    } else {
                                        tempo = `${tempo} horas atrás`;    
                                    }
                                }
                                
                            } else {
                                var tempo = Math.floor(json[i].tempo/60);
                                tempo = `${tempo} minutos atrás`;
                            }
                        } else {
                            var tempo = json[i].tempo.toFixed();
                            if (tempo < 2) {
                                tempo = `${tempo} segundo atrás`;
                            } else {
                                tempo = `${tempo} segundos atrás`;    
                            }
                        }

                        if (i < 3) {
                            listaNotificacoes.innerHTML += `
                            <li class="mb-2">
                                <a class="dropdown-item border-radius-md" href="notificacoes.html">
                                    <div class="d-flex py-1">
                                    <div class="my-auto">
                                        <img src="../assets/img/icons/icon-notification.png" class="avatar avatar-sm  me-3 ">
                                    </div>
                                    <div class="d-flex flex-column justify-content-center" href="notifications.html">
                                        <h6 class="text-sm font-weight-bold mb-1">
                                            ${json[i].titulo}
                                        </h6>
                                        <h5 class="text-xs font-weight-normal mb-1">
                                            ${json[i].nome} - ${json[i].codigo}
                                        </h5>
                                        <p class="text-xs text-secondary mb-0">
                                        <i class="fa fa-clock me-1"></i>
                                            ${tempo}
                                        </p>
                                    </div>
                                    </div>
                                </a>
                            </li>
                            `
                        }
                        
                        if (window.location.pathname.split("/").pop() != "notificacoes.html") {
                            
                            if (i < 5) {

                                notificacoes.innerHTML += `
                            <div class="toast show fade p-2 mt-2 bg-white" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header p-2">
                                    <i class="material-icons text-danger me-2">
                                        campaign
                                    </i>
                                    <span class="me-auto text-gradient text-danger font-weight-bold"> ${json[i].titulo} </span>
                                    <small class="text-body">${tempo}</small>
                                    <i class="fas fa-times text-md ms-3 cursor-pointer" data-bs-dismiss="toast" aria-label="Close"></i>
                                </div>
                                <hr class="horizontal dark m-0">
                                <div class="toast-body p-2">
                                    <p class="mb-1"> ${json[i].nome} - ${json[i].codigo} </p>
                                    <div class="mb-0">
                                        <a type="button" href="./notificacoes.html" class="btn btn-danger btn-sm mb-0">NOTIFICAÇÕES</a>
                                        <a type="button" href="${json[i].link}" class="btn btn-danger btn-sm mb-0">JIRA</a>
                                    </div>
                                </div>
                            </div>
                            `

                            }
                            
                            
                        } else {

                            notificacoes.innerHTML += `
                            <div class="alert alert-danger alert-dismissible text-white" role="alert">
                                <div class="d-flex m-0 align-items-baseline" style="justify-content: space-between">
                                    <span class="text-md text-bold mb-0">${json[i].titulo}</span>
                                    <span class="text-xs mb-0">
                                    <i class="fa fa-clock me-1"></i>
                                        ${tempo}
                                    </span>
                                </div>
                                <p class="mb-1"> ${json[i].nome} - ${json[i].codigo} </p>
                                <p class="text-sm mb-0">${json[i].descricao}. <a href="${json[i].link}" class="alert-link text-white">Acessar no JIRA</a></p>

                                <button type="button" class="btn-close text-lg py-3 opacity-10" data-bs-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            `

                        }
  
                    }

                    listaNotificacoes.innerHTML += `
                        <li>
                            <a class="dropdown-item border-radius-md" href="notifications.html">
                                <span class="text-xs font-weight-bold">
                                    Ver mais +
                                </span>
                            </a>
                        </li>
                        `
                })
                .catch(function (erro) {
                    console.log(erro);
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