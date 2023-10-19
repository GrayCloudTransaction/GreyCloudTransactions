function listarServidor() {

    var idEmpresa = sessionStorage.ID_EMPRESA;

    fetch(`/servidor/listar/${idEmpresa}`, { cache: 'no-store' })
        .then(function (resposta) {
            console.log(resposta);

            if (resposta.ok) {
                resposta.json().then((json) => {
                    console.log(json);
                    console.log(JSON.stringify(json));

                    for (i = 0; i < 5; i++) {
                        var servidor = json[i];
                        var idServidor = servidor.id_servidor;

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
                        <span class="text-xs font-weight-bold">${servidor.status == 0 ? "Offline":"Online"}</span>
                      </td>
                      
                    </tr>
                    `
                    }

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

function plotarGraficoChamadosPorServidor() {

    var idEmpresa = sessionStorage.ID_EMPRESA
    var ctx5 = document.getElementById("chart-bars").getContext("2d");
    var labelsGrafico = [];
    var dataGrafico = [];

    fetch(`/chamado/listarPorServidor/${idEmpresa}`, { cache: 'no-store' })
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

                    new Chart(ctx5, {
                        type: "bar",
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
