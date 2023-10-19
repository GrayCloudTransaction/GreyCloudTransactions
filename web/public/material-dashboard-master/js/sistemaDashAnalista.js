function pegarInfoServidor(){
    var id_servidor = sessionStorage.ID_SERVIDOR;

    fetch("/servidor/getInfoServidor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idServidorServer: id_servidor,
        }),
      })
    .then(function (resposta) {
        console.log(resposta);

        if (resposta.ok) {
            resposta.json().then((json) => {
                console.log(json[0])
                codigoServidor.innerHTML = json[0].codigo
                for(i in json[1]){
                    if(json[1][i].tipo_componente == 'CPU'){
                        valorCPU.innerHTML = json[1][i].valor_registro
                        modeloCPU.innerHTML = json[1][i].modelo
                    }
                    else if(json[1][i].tipo_componente == 'RAM'){
                        valorRAM.innerHTML = json[1][i].valor_registro
                    }
                    else{
                        valorDisco.innerHTML = json[1][i].valor_registro
                    }
                }
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