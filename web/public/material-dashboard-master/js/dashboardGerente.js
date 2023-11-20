function listarServidor() {

    var idEmpresa = sessionStorage.ID_EMPRESA;
    var ctx4 = document.getElementById("chart-pie").getContext("2d");
    var dataGraficoPizza = [0, 0];
    var qtdServidor = 0;
    var qtdServidorOff = 0;

    fetch(`/servidor/listar/${idEmpresa}`, { cache: 'no-store' })
        .then(function (resposta) {
            console.log(resposta);

            if (resposta.ok) {
                resposta.json().then((json) => {
                    console.log(json);
                    console.log(JSON.stringify(json));

                    for (i = 0; i < json.length; i++) {
                        var servidor = json[i];
                        var idServidor = servidor.id_servidor;

                        if (json[i].status == 1) {
                            dataGraficoPizza[0]++;
                            qtdServidor++;
                        } else if (json[i].status == 0) {
                            dataGraficoPizza[1]++;
                            qtdServidor++;
                            qtdServidorOff++;
                        }

                        listaDeServidores.innerHTML += `
                        <tr id="${idServidor}">

                        <td>
                            <div class="d-flex px-2 py-1 justify-content-center">
                            <div class="d-flex flex-column justify-content-center">
                                <h6 class="mb-0 text-sm">${servidor.codigo}</h6>
                            </div>
                            </div>
                        </td>
                        <td class="align-middle text-center text-sm">
                            <span class="text-xs font-weight-bold">${servidor.nome}</span>
                        </td>
                        <td class="align-middle text-center text-sm">
                            <span class="text-xs font-weight-bold" id="statusServidor${idServidor}"></span>
                        </td>
                        
                        </tr>
                        `
                    }

                    servidoresForaDoAr.innerHTML += qtdServidorOff;
                    servidorTotal.innerHTML += qtdServidor;

                    listaDeServidores.innerHTML += `
                <tr>
                    <td>
                        <div class="d-flex px-2 py-1">
                            <div class="d-flex flex-column justify-content-center">
                            <a href="./maquinas.html"
                                class="text-secondary font-weight-bold text-xs addFunc-button" style="cursor: pointer;" data-toggle="tooltip"
                                data-original-title="Edit user">
                                Ver mais +
                            </a>
                            </div>
                        </div>
                    </td>
                </tr>
                `

                    new Chart(ctx4, {
                        type: "pie",
                        data: {
                            labels: ["Online", "Offline"],
                            datasets: [{
                                label: "Servidores",
                                backgroundColor: ["#66BB6A", "#EF5350"],
                                hoverBackgroundColor: ["#43A047", "#E53935"],
                                hoverOffset: 3,
                                data: dataGraficoPizza, // modificar aq com a query do banco <------------------------------------------------------------
                            }],
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: true,
                                }
                            }
                        },
                    });
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

function servidorEspecificoForaDoAr(id_servidor) {
    fetch(`/servidor/foraDoAr/${id_servidor}`, { cache: 'no-store' })
        .then((resposta) => {
            console.log(resposta)

            if (resposta.ok) {
                var statusServidor = document.getElementById(`statusServidor${id_servidor}`);

                if (resposta.status == 200) {
                    resposta.json().then((json) => {
                        console.log(json);
                        console.log(JSON.stringify(json))
                        console.log(json[0].tempo_sem_registro);
                        
                        statusServidor.innerHTML += json[0].tempo_sem_registro < 6 ? "ONLINE" : "OFFLINE";
                        tempoOciosoDosServidores.push(Number(json[0].tempo_sem_registro)); // variável global para kpi média de tempo ocioso dos servidores
                    }).catch(function (erro) {
                        console.log(erro);
                    });
                } else {
                    statusServidor.innerHTML += "OFFLINE";
                    tempoOciosoDosServidores.push(0);
                }
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

function kpiChamados() {

    var idEmpresa = sessionStorage.ID_EMPRESA;
    var chamadosAbertos = 0;
    var chamadosTotais = 0;

    fetch(`/chamado/listarPorEmpresa/${idEmpresa}`, { cache: 'no-store' })
        .then(function (resposta) {
            console.log(resposta);

            if (resposta.ok) {
                resposta.json().then((json) => {
                    console.log(json);
                    console.log(JSON.stringify(json));

                    for (i = 0; i < json.length; i++) {
                        var chamado = json[i];

                        if (chamado.status == "Aberto") {
                            chamadosAbertos++;
                            chamadosTotais++;
                        } else {
                            chamadosTotais++;
                        }

                    }

                    chamadosAberto.innerHTML += chamadosAbertos;
                    chamadosTotal.innerHTML += chamadosTotais;
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

function plotarGraficoChamadosPorMes() {

    var idEmpresa = sessionStorage.ID_EMPRESA
    var ctx2 = document.getElementById("chart-line-2").getContext("2d");
    var labelsGrafico = [];
    var dataGrafico = [];

    fetch(`/chamado/listarPorMes/${idEmpresa}`, { cache: 'no-store' })
        .then(function (resposta) {
            console.log(resposta);

            if (resposta.ok) {
                resposta.json().then((json) => {
                    console.log(json);
                    console.log(JSON.stringify(json));

                    for (var i = 0; i < json.length; i++) {

                        var anoMes = json[i].ano_mes;
                        var ano = anoMes.substring(0, 4);
                        var mes = anoMes.substring(4, 7);

                        switch (mes) {
                            case "01":
                                labelsGrafico.push(`Janeiro/${ano}`);
                                break;
                            case "02":
                                labelsGrafico.push(`Fevereiro/${ano}`);
                                break;
                            case "03":
                                labelsGrafico.push(`Março/${ano}`);
                                break;
                            case "04":
                                labelsGrafico.push(`Abril/${ano}`);
                                break;
                            case "05":
                                labelsGrafico.push(`Maio/${ano}`);
                                break;
                            case "06":
                                labelsGrafico.push(`Junho/${ano}`);
                                break;
                            case "07":
                                labelsGrafico.push(`Julho/${ano}`);
                                break;
                            case "08":
                                labelsGrafico.push(`Agosto/${ano}`);
                                break;
                            case "09":
                                labelsGrafico.push(`Setembro/${ano}`);
                                break;
                            case "10":
                                labelsGrafico.push(`Outubro/${ano}`);
                                break;
                            case "11":
                                labelsGrafico.push(`Novembro/${ano}`);
                                break;
                            case "12":
                                labelsGrafico.push(`Dezembro/${ano}`);
                                break;
                        }

                        dataGrafico.push(json[i].qtd_chamados);
                    }

                    new Chart(ctx2, {
                        type: "line",
                        data: {
                            labels: labelsGrafico,
                            datasets: [{
                                label: "Quantidade de chamados",
                                tension: 0,
                                borderWidth: 0,
                                pointRadius: 5,
                                pointBackgroundColor: "rgba(255, 255, 255, .8)",
                                pointBorderColor: "transparent",
                                borderColor: "rgba(255, 255, 255, .8)",
                                borderColor: "rgba(255, 255, 255, .8)",
                                borderWidth: 4,
                                backgroundColor: "transparent",
                                fill: true,
                                data: dataGrafico,
                                maxBarThickness: 6

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
                                        maxTicksLimit: 5,
                                    }
                                },
                            },
                        },
                    });

                })
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

function getChamadosPorServidor(atualizar) {

    var idEmpresa = sessionStorage.ID_EMPRESA
    var opcao = document.getElementById("selectPeriodo").value;
    var data;
    if (opcao == "dia") {
        data = document.getElementById("iptDia").value.replaceAll('-','/');
    } else if (opcao == "mes") {
        data = document.getElementById("iptMes").value.replaceAll('-','/');
    } else if (opcao == "personalizado") {
        data = [document.getElementById("iptDataInicio").value.replaceAll('-','/'), document.getElementById("iptDataFim").value.replaceAll('-','/')];
    } else {
        data = null;
    }
    var labelsGrafico = [];
    var dataGrafico = [];

    fetch(`/chamado/listarPorServidor/${idEmpresa}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          opcaoServer: opcao,
          dataServer: data
        }),
    })
        .then(function (resposta) {
            console.log(resposta);

            if (resposta.ok) {
                resposta.json().then((json) => {
                    console.log(json);
                    console.log(JSON.stringify(json));

                    for (var i = 0; i < json.length; i++) {
                        labelsGrafico.push(json[i].nome);
                        dataGrafico.push(json[i].qtd_chamados);
                    }

                    if (atualizar) {
                        console.warn("ATUALIZAR " + labelsGrafico, dataGrafico)
                        atualizarGraficoChamadosPorServidor(labelsGrafico, dataGrafico);
                    } else {
                        console.warn("PLOTAR " + labelsGrafico, dataGrafico)
                        plotarGraficoChamadosPorServidor(labelsGrafico, dataGrafico);
                    }
                })

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

var graficoChamadosPorServidor;
function plotarGraficoChamadosPorServidor(labels1, data1) {

    var ctx5 = document.getElementById("chart-bars").getContext("2d");
    
    graficoChamadosPorServidor = new Chart(ctx5, {
        type: "bar",
        data: {
            labels: labels1,
            datasets: [{
                label: "Quantidade de chamados",
                tension: 0,
                borderWidth: 0,
                borderWidth: 0,
                backgroundColor: "rgba(255, 255, 255, .8)",
                fill: true,
                data: data1,
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

function atualizarGraficoChamadosPorServidor(labels, data) {
    graficoChamadosPorServidor.data.labels = labels;
    graficoChamadosPorServidor.data.datasets[0].data = data;
    graficoChamadosPorServidor.update('active');
}

var tempoOciosoDosServidores = [];
function kpiMediaTempoOcioso() {
    
    var totalTempoOcioso = 0;
    for (var cont = 0; cont < tempoOciosoDosServidores.length; cont++) {
        totalTempoOcioso += tempoOciosoDosServidores[cont];
    }
    console.log("Total tempo ocioso: " + totalTempoOcioso)
    totalTempoOcioso /= tempoOciosoDosServidores.length;
    
    if (totalTempoOcioso >= 60) {
        if (totalTempoOcioso > 3600) {
            mediaTempoOcioso.innerHTML = `${Math.floor(totalTempoOcioso/3600)} h ${Math.floor((totalTempoOcioso%3600)/60)} m ${Math.floor((totalTempoOcioso%3600)%60)} s`;    
        } else {
            mediaTempoOcioso.innerHTML = `${Math.floor(totalTempoOcioso/60)} m ${Math.floor(totalTempoOcioso%60)} s`;
        }
    } else {
        mediaTempoOcioso.innerHTML = `${totalTempoOcioso.toFixed()} s`;
    }
}

