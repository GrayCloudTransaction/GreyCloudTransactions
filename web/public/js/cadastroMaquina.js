function cadastarMaquina() {
    const nomeServidor = iptNomeServidor.value;
    const codigoServidor = iptCodigoServidor.value;
    const modeloComponente = iptModeloComponente.value;
    const fabricanteComponente = iptFabricanteComponente.value;
    var tipoComponete = iptTipoComponente.value;

    if (nomeServidor == "" || codigoServidor == "") {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "nome do servidor e/ou codigo do servidor estão nulos!",
        });
    } else if (modeloComponente == "" || fabricanteComponente == "" || tipoComponete == "Selecionar") {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "modelo do componente e/ou fabricante do componente e/ou tipo do componente estão nulos!",
        });
    } else {
        fetch("/maquina/cadastrarMaquina", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeServer: nomeServidor,
                codigoServer: codigoServidor,
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    resposta.json().then(function (resposta) {
                        fetch(`/maquina/cadastrarMaquina`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                modeloServer: modeloComponente,
                                fabricanteServer: fabricanteComponente,
                                tipoServer: tipoComponete,
                            })
                        })
                            .then(function (resposta) {
                                console.log("resposta: ", resposta);

                                if (resposta.ok) {
                                    Swal.fire(
                                        "Sucesso!",
                                        "Cadastro Realizado!",
                                        "success"
                                    );
                                    
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
    };
}

