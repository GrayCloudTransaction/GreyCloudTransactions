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
        if (resposta.ok) {
            resposta.json().then((json) => {
                console.log(json[0])
                codigoServidor.innerHTML = json[0].codigo
                for(i in json[1]){
                    if(json[1][i].tipo_componente == 'CPU'){
                        // modeloCPU.innerHTML = json[1][i].modelo
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

function obterDadosGrafico(id_servidor) {
    //if (proximaAtualizacao != undefined) {
    //    clearTimeout(proximaAtualizacao);
    //}
    
    fetch(`/registro/ultimas/${id_servidor}`, {
         cache: 'no-store' 
        }
        ).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                console.log(resposta)
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

    
}