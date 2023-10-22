function pegarInfoServidor() {
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
    var labelsGrafico = [];
    var ctx = document.getElementById("chart-bars").getContext("2d");
    var ctx2 = document.getElementById("chart-line").getContext("2d");
    var ctx3 = document.getElementById("chart-line-tasks").getContext("2d");
    var dadosCpu;
    var dadosRam;
    var dadosDisco;
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
                for (i in resposta) {
                    if (resposta[i].tipo_componente == 'CPU') {
                        console.log('Achou cpu')
                        listaCpu.push(resposta.modelo)
                    } else if (resposta[i].tipo_componente == 'RAM') {
                        console.log('Achou ram')
                        listaRam.push(resposta.modelo)
                    } else if (resposta[i].tipo_componente == 'Disco') {
                        console.log('Achou disco')
                        listaDisco.push(resposta.modelo)
                    } else {
                        console.log("Dados incorretos.")
                    }
                }

                for (i = 0; i < resposta.length; i++) {
                    var registro = resposta[i];
                    labelsGrafico.push(registro.data_registro);
                }
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });



    obterDadosGrafico(id_servidor);

    new Chart(ctx, {
        type: "line",
        data: {
          labels: labelsGrafico,
          datasets: [{
            label: "Porcentagem",
            tension: 0,
            borderWidth: 0,
            pointRadius: 5,
            pointBackgroundColor: "rgba(255, 255, 255, .8)",
            pointBorderColor: "transparent",
            borderColor: "rgba(255, 255, 255, .8)",
            borderWidth: 4,
            backgroundColor: "transparent",
            fill: true,
            data: listaCpu,
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
                padding: 10,
                color: '#f8f9fa',
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

    setTimeout(() => atualizarGraficoCpu(id_servidor, listaCpu, ctx), 2000);

    new Chart(ctx2, {
        type: "line",
        data: {
          labels: labelsGrafico,
          datasets: [{
            label: "Porcentagem",
            tension: 0,
            borderWidth: 0,
            pointRadius: 5,
            pointBackgroundColor: "rgba(255, 255, 255, .8)",
            pointBorderColor: "transparent",
            borderColor: "rgba(255, 255, 255, .8)",
            borderWidth: 4,
            backgroundColor: "transparent",
            fill: true,
            data: listaRam,
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
                padding: 10,
                color: '#f8f9fa',
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

    setTimeout(() => atualizarGraficoRam(id_servidor, listaRam, ctx2), 2000);

    new Chart(ctx3, {
        type: "line",
        data: {
          labels: labelsGrafico,
          datasets: [{
            label: "Porcentagem",
            tension: 0,
            borderWidth: 0,
            pointRadius: 5,
            pointBackgroundColor: "rgba(255, 255, 255, .8)",
            pointBorderColor: "transparent",
            borderColor: "rgba(255, 255, 255, .8)",
            borderWidth: 4,
            backgroundColor: "transparent",
            fill: true,
            data: listaDisco,
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
                padding: 10,
                color: '#f8f9fa',
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

    setTimeout(() => atualizarGraficoDisco(id_servidor, listaDisco, ctx3), 2000);

}

function atualizarGraficoCpu(id_servidor, listaCpu, ctx) {

    fetch(`/registro/ultimas/${id_servidor}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {


                obterDadosGrafico(id_servidor);


                if (novoRegistro[0].data_registro == ctx.labels[ctx.labels.length - 1]) {
                    avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado. <br> Como não há dados novos a exibir, o gráfico não atualizará."
                } else {
                    // tirando e colocando valores no gráfico
                    ctx.labels.shift(); // apagar o primeiro
                    ctx.labels.push(novoRegistro[0].data_registro); // incluir um novo momento

                    ctx.datasets[0].data.shift();  // apagar o primeiro de umidade
                    ctx.datasets[0].data.push(novoRegistro[0].dadosCpu); // incluir uma nova medida de umidade

                    ctx.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGraficoCpu(id_servidor, listaCpu, ctx), 4000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGraficoCpu(id_servidor, listaCpu, ctx), 4000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function atualizarGraficoRam(id_servidor, listaRam, ctx2) {

    fetch(`/registro/ultimas/${id_servidor}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {


                obterDadosGrafico(id_servidor);


                if (novoRegistro[0].data_registro == ctx2.labels[ctx2.labels.length - 1]) {
                    avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
                } else {
                    // tirando e colocando valores no gráfico
                    ctx2.labels.shift(); // apagar o primeiro
                    ctx2.labels.push(novoRegistro[0].data_registro); // incluir um novo momento

                    ctx2.datasets[0].data.shift();  // apagar o primeiro de umidade
                    ctx2.datasets[0].data.push(novoRegistro[0].dadosRam); // incluir uma nova medida de umidade

                    ctx2.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGraficoRam(id_servidor, listaRam, ctx2), 4000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGraficoRam(id_servidor, listaRam, ctx2), 4000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function atualizarGraficoDisco(id_servidor, listaDisco, ctx3) {

    fetch(`/registro/ultimas/${id_servidor}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {


                obterDadosGrafico(id_servidor);
                

                if (novoRegistro[0].data_registro == ctx3.labels[ctx3.labels.length - 1]) {
                    avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
                } else {
                    // tirando e colocando valores no gráfico
                    ctx3.labels.shift(); // apagar o primeiro
                    ctx3.labels.push(novoRegistro[0].data_registro); // incluir um novo momento

                    ctx3.datasets[0].data.shift();  // apagar o primeiro de umidade
                    ctx3.datasets[0].data.push(novoRegistro[0].listaDisco); // incluir uma nova medida de umidade

                    ctx3.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGraficoDisco(id_servidor, listaDisco, ctx3), 4000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGraficoDisco(id_servidor, listaDisco, ctx3), 4000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}