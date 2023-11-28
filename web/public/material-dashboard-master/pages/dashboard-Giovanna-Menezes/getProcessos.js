function totaisDeProcessos() {
    var idServidor = sessionStorage.ID_SERVIDOR;

    fetch(`/giovannaMenezes/listarProcessos/${idServidor}`, {cache: 'no-store'}).then(function(resposta){
        console.log(resposta);

        if(resposta.ok) {
            resposta.json().then((json) => {
                console.log(json);
                console.log(JSON.stringify(json));
;
                qtdProcessosTotais.innerHTML = json[0].qtd_processos;

                if (json[0].qtd_processos <= 0) {
                    listaProcessos.innerHTML = "<p>Nenhum processo foi capturado</p>";
                }
            });
        } else {
            resposta.text().then((texto) => {
                console.error(texto);
            })
        }
    })
    .catch(function (erro) {
        console.log(erro);
    });
}

function totaisDeProcessosConsumidores() {
    var idServidor = sessionStorage.ID_SERVIDOR;

    fetch(`/giovannaMenezes/listarProcessosConsumidores/${idServidor}`, {cache: 'no-store'}).then(function(resposta){
        console.log(resposta);

        if(resposta.ok) {
            resposta.json().then((json) => {
                console.log(json);
                console.log(JSON.stringify(json));
;
            qtdConsumidoresTotais.innerHTML = json[0].qtd_processos_consumidores;

            if (json[0].qtd_processos_consumidores <= 0) {
                qtdConsumidores.innerHTML = 0;
                listaProcessosConsumidores.innerHTML = '<p>Nenhum processo consumidor foi capturado</p>';

                var element = document.getElementById("chart_canvas");

                    element.style.display = "block";
                    card_grafico.innerHTML = "<p class='text-m mb-1 text-center'>Nenhum processo consumindo CPU foi capturado</p>";
            }
            });
        } else {
            resposta.text().then((texto) => {
                console.error(texto);
            })
        }
    })
    .catch(function (erro) {
        console.log(erro);
    });
}

function exibirProcessos(limite) {
    var idServidor = sessionStorage.ID_SERVIDOR;

    fetch(`/giovannaMenezes/buscarUltimosProcessos/${idServidor}`, {cache: 'no-store'}).then(function(resposta){
        console.log(resposta);

        if(resposta.ok) {
            resposta.json().then((json) => {
                console.log(json);
                console.log(JSON.stringify(json));

                    qtdProcessos.innerHTML = limite;

                    for (let i = json.length - 1; i >= json.length-limite; i--) {
                        processoPID.innerHTML += ""
                        processoNome.innerHTML += ""
                        processoCPU.innerHTML += ""

                        processoPID.innerHTML += `<p class="text-sm mb-1">${json[i-1].pid}</p>`
                        processoNome.innerHTML += `<p class="text-sm mb-1">${json[i-1].nome}</p>`
                        processoCPU.innerHTML += `<p class="text-sm mb-1">${json[i-1].uso_cpu}</p>`
                    }
            });
        } else {
            resposta.text().then((texto) => {
                console.error(texto);
            })
        }
    })
    .catch(function (erro) {
        console.log(erro);
    });
}

function exibirProcessosConsumidores(limiteConsumidor) {
    var idServidor = sessionStorage.ID_SERVIDOR;

    fetch(`/giovannaMenezes/buscarProcessosConsumidores/${idServidor}`, {cache: 'no-store'}).then(function(resposta){
        console.log(resposta);

        if(resposta.ok) {
            resposta.json().then((json) => {
                console.log(json);
                console.log(JSON.stringify(json));

                if (json.length <= limiteConsumidor) {
                    qtdConsumidores.innerHTML = json.length;
                } else {
                    qtdConsumidores.innerHTML = limiteConsumidor;
                }

                    for (let i = json.length - 1; i >= json.length-limiteConsumidor; i--) {
                        processoConsumidorPID.innerHTML += `<p class="text-sm mb-1">${json[i].pid}</p>`
                        comandoRecomendado.innerHTML += `<p class="text-sm mb-1">kill process</p>`
                    }
            });
        } else {
            resposta.text().then((texto) => {
                console.error(texto);
            })
        }
    })
    .catch(function (erro) {
        console.log(erro);
    });
}

function graficoServerXcpu() {
    var ctx5 = document.getElementById("chart-bars").getContext("2d");
    var labelsGrafico = [];
    var dataGrafico = [];


    fetch (`/giovannaMenezes/getServidorPorUsoCpu/`, {cache: 'no-store'}).then(function(resposta) {
        console.log(resposta);

        if(resposta.ok) {
            resposta.json().then((json) => {
                console.log(json)
                console.log(JSON.stringify(json));

                if (json.length > 0) {
                    for (let i = 0; i < json.length; i++) {
                        labelsGrafico.push(json[i].codigo);
                        dataGrafico.push(json[i].qtd_processos_consumidores);
                    }
    
                    new Chart(ctx5, {
                        type: "bar",
                        data: {
                            labels: labelsGrafico,
                            datasets: [{
                                label: "Qtd. de processos consumidores",
                                tension: 0,
                                borderWidth: 0,
                                borderWidth: 0,
                                backgroundColor: "#F5C217",
                                fill: true,
                                data: dataGrafico,
                                barThickness: 60,
                                maxBarThickness: 100
    
                            }],
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: false,
                                }
                            },
                            interaction: {
                                intersect: false,
                                mode: 'index',
                            },
                            scales: {
                                y: {
                                    grid: {
                                        drawBorder: false,
                                        display: true,
                                        drawOnChartArea: true,
                                        drawTicks: false,
                                        borderDash: [5, 5],
                                        color: 'rgba(255, 255, 255, .2)'
                                    },
                                    ticks: {
                                        display: true,
                                        color: '#f8f9fa',
                                        padding: 10,
                                        font: {
                                            size: 14,
                                            weight: 300,
                                            family: "Roboto",
                                            style: 'normal',
                                            lineHeight: 2
                                        },
                                    }
                                },
                                x: {
                                    grid: {
                                        drawBorder: false,
                                        display: false,
                                        drawOnChartArea: false,
                                        drawTicks: false,
                                        borderDash: [5, 5]
                                    },
                                    ticks: {
                                        display: true,
                                        color: '#f8f9fa',
                                        padding: 10,
                                        font: {
                                            size: 14,
                                            weight: 300,
                                            family: "Roboto",
                                            style: 'normal',
                                            lineHeight: 2
                                        },
                                    }
                                },
                            },
                        },
                    });
                }
            });
        } else {
            resposta.text().then((texto) => {
                console.error(texto);
            })
        }
    })
    .catch(function(erro) {
        console.log(erro);
    })
}