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
    var listaCpu = [];
    var listaRam = [];
    var listaDisco = [];
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
                for(i in json[1]){
                    if(json[1][i].tipo_componente == 'CPU'){
                        listaCpu.push(json[1][i].modelo)
                    }else if(json[1][i].tipo_componente == 'RAM'){
                        listaRam.push(json[1][i].modelo)
                    }else if(json[1][i].tipo_componente == 'Disco'){
                        listaDisco.push(json[1][i].modelo)
                    }else{
                        console.log("Dados incorretos.")
                    }
                }
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

function plotarGraficoCpu(resposta, id_servidor, ctx){
    let dadosCpu = {
        labels: labels,
        datasets: [{
            label: 'Porcentagem',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    }

    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labels.push(registro.data_registro);
        dadosCpu.datasets[0].data.push(registro.tipo_componente);
    }
    
    const config = {
        type: 'line',
        data: dadosCpu,
    };

    // Adicionando gráfico criado em div na tela
    let myChart = new Chart(
        document.getElementById(`myChartCanvas${id_servidor}`),
        config
    );

    setTimeout(() => atualizarGraficoCpu(id_servidor, dadosCpu, myChart), 2000);
}

function plotarGraficoRam(resposta, id_servidor, ctx2){
    let dadosRam = {
        labels: labels,
        datasets: [{
            label: 'Porcentagem',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    }

    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labels.push(registro.data_registro);
        dadosRam.datasets[0].data.push(registro.tipo_componente);
    }
    
    const config = {
        type: 'line',
        data: dadosRam,
    };

    // Adicionando gráfico criado em div na tela
    let myChart = new Chart(
        document.getElementById(`myChartCanvas${id_servidor}`),
        config
    );

    setTimeout(() => atualizarGraficoRam(id_servidor, dadosRam, myChart), 2000);
}

function plotarGraficoDisco(resposta, id_servidor, ctx3){
    let dadosDisco = {
        labels: labels,
        datasets: [{
            label: 'Porcentagem',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    }

    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labels.push(registro.data_registro);
        dadosDisco.datasets[0].data.push(registro.tipo_componente);
    }
    
    const config = {
        type: 'line',
        data: dadosDisco,
    };

    // Adicionando gráfico criado em div na tela
    let myChart = new Chart(
        document.getElementById(`myChartCanvas${id_servidor}`),
        config
    );

    setTimeout(() => atualizarGraficoDisco(id_servidor, dadosDisco, myChart), 2000);
}

function atualizarGraficoCpu(id_servidor, dadosCpu, myChart){

    fetch(`/medidas/tempo-real/${id_servidor}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                obterdados(id_servidor);
                // alertar(novoRegistro, idAquario);

                let avisoCaptura = document.getElementById(`avisoCaptura${id_servidor}`)
                avisoCaptura.innerHTML = ""


                if (novoRegistro[0].data_registro == dadosCpu.labels[dadosCpu.labels.length - 1]) {
                    avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
                } else {
                    // tirando e colocando valores no gráfico
                    dadosCpu.labels.shift(); // apagar o primeiro
                    dadosCpu.labels.push(novoRegistro[0].data_registro); // incluir um novo momento

                    dadosCpu.datasets[0].data.shift();  // apagar o primeiro de umidade
                    dadosCpu.datasets[0].data.push(novoRegistro[0].dadosCpu); // incluir uma nova medida de umidade

                    myChart.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGraficoCpu(idAquario, dadosCpu, myChart), 4000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGraficoCpu(idAquario, dadosCpu, myChart), 4000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function atualizarGraficoRam(id_servidor, dadosRam, myChart){

    fetch(`/medidas/tempo-real/${id_servidor}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                obterdados(id_servidor);
                // alertar(novoRegistro, idAquario);

                let avisoCaptura = document.getElementById(`avisoCaptura${id_servidor}`)
                avisoCaptura.innerHTML = ""


                if (novoRegistro[0].data_registro == dadosRam.labels[dadosRam.labels.length - 1]) {
                    avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
                } else {
                    // tirando e colocando valores no gráfico
                    dadosRam.labels.shift(); // apagar o primeiro
                    dadosRam.labels.push(novoRegistro[0].data_registro); // incluir um novo momento

                    dadosRam.datasets[0].data.shift();  // apagar o primeiro de umidade
                    dadosRam.datasets[0].data.push(novoRegistro[0].dadosRam); // incluir uma nova medida de umidade

                    myChart.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGraficoRam(idAquario, dadosRam, myChart), 4000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGraficoRam(idAquario, dadosRam, myChart), 4000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function atualizarGraficoDisco(id_servidor, dadosDisco, myChart){

    fetch(`/medidas/tempo-real/${id_servidor}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                obterdados(id_servidor);
                // alertar(novoRegistro, idAquario);

                let avisoCaptura = document.getElementById(`avisoCaptura${id_servidor}`)
                avisoCaptura.innerHTML = ""


                if (novoRegistro[0].data_registro == dadosDisco.labels[dadosDisco.labels.length - 1]) {
                    avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
                } else {
                    // tirando e colocando valores no gráfico
                    dadosDisco.labels.shift(); // apagar o primeiro
                    dadosDisco.labels.push(novoRegistro[0].data_registro); // incluir um novo momento

                    dadosDisco.datasets[0].data.shift();  // apagar o primeiro de umidade
                    dadosDisco.datasets[0].data.push(novoRegistro[0].dadosDisco); // incluir uma nova medida de umidade

                    myChart.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGraficoDisco(idAquario, dadosDisco, myChart), 4000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGraficoDisco(idAquario, dadosDisco, myChart), 4000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}