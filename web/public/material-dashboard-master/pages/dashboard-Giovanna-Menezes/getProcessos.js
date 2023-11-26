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

                for (let i = json.length - 1; i >= json.length-limite; i--) {
                    processoPID.innerHTML += `<p class="text-sm mb-1">${json[i].pid}</p>`
                    processoNome.innerHTML += `<p class="text-sm mb-1">${json[i].nome}</p>`
                    processoCPU.innerHTML += `<p class="text-sm mb-1">${json[i].uso_cpu}</p>`
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

function exibirProcessosConsumidores() {
    var idServidor = sessionStorage.ID_SERVIDOR;

    fetch(`/giovannaMenezes/buscarProcessosConsumidores/${idServidor}`, {cache: 'no-store'}).then(function(resposta){
        console.log(resposta);

        if(resposta.ok) {
            resposta.json().then((json) => {
                console.log(json);
                console.log(JSON.stringify(json));

                qtdConsumidores.innerHTML += `${json.length}`

                for (let i = 0; i < json.length; i++) {
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