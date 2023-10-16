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
                console.log(json);
                console.log(JSON.stringify(json));

                for (i = 0; i < json.length; i++) {
                    console.log(json[i])
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