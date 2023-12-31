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
          console.log(json[0]);
          codigoServidor.innerHTML = json[0].codigo;
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

function chamadosAbertosServidor() {
  var idEmpresa = sessionStorage.ID_EMPRESA;
  var idServidor = sessionStorage.ID_SERVIDOR;
  var opcao = "total";
  var data = null;

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
                        if (json[i].id_servidor == idServidor) {
                          qtdTotalChamados.innerHTML += json[i].qtd_chamados;
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

function obterDadosGrafico(id_servidor, graficoCpu, graficoRam, graficoDisco) {
  var valorCpu
  var valorRam
  var valorDisco
  var labelCpu
  var labelRam
  var labelDisco

  fetch(`/registro/ultimas/${id_servidor}`, {
    cache: "no-store",
  })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
          console.log(resposta);

          for (i in resposta) {
            var datetime = new Date(resposta[i].data_registro).toLocaleString("pt-BR");


            if (resposta[i].tipo_componente == "CPU") {
              console.log("Achou cpu");

              valorCpu = parseFloat(resposta[i].valor_registro).toFixed(2);
              labelCpu = datetime
              valorCPUID.innerHTML = valorCpu + "%"
              if(valorCpu > 70){
                valorCPUID.style.color = "red"
              } 
              else if(valorCpu > 50){
                valorCPUID.style.color = "darkgoldenrod"
              }
              else{
                valorCPUID.style.color = "green"
              }
            } 
            
            else if (resposta[i].tipo_componente == "RAM") {
              console.log("Achou ram");

              valorRam = resposta[i].valor_registro;
              labelRam = datetime
              valorRAMID.innerHTML = valorRam + "%"
              if(valorRam > 70){
                valorRAMID.style.color = "red"
              } 
              else if(valorRam > 50){
                valorRAMID.style.color = "darkgoldenrod"
              }
              else{
                valorRAMID.style.color = "green"
              }
            
            } 
            
            else if (resposta[i].tipo_componente == "Disco") {
              console.log("Achou disco");

              valorDisco = resposta[i].valor_registro;
              labelDisco = datetime
              valorDiscoID.innerHTML = valorDisco + "%"
              if(valorDisco < 20){
                valorDiscoID.style.color = "red"
              } 
              else if(valorDisco < 40){
                valorDiscoID.style.color = "darkgoldenrod"
              }
              else{
                valorDiscoID.style.color = "green"
              }
            

            } else {
              console.log("Dados incorretos.");
            }
          }

          atualizarGrafico(valorCpu, labelCpu, graficoCpu);
          atualizarGrafico(valorRam, labelRam, graficoRam);
          atualizarGrafico(valorDisco, labelDisco, graficoDisco);
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function atualizarGrafico(valor, label, ctx) {
  if(ctx.data.labels.length < 5){
    ctx.data.labels.push(label);
    ctx.data.datasets[0].data.push(valor);

    ctx.update();
  }
  else{
    ctx.data.labels.shift();
    ctx.data.labels.push(label);

    ctx.data.datasets[0].data.shift();
    ctx.data.datasets[0].data.push(valor);

    ctx.update();
  }
}

function teste(id_servidor){
  var ctx1 = document.getElementById("chart-cpu").getContext("2d");
  var ctx2 = document.getElementById("chart-ram").getContext("2d");
  var ctx3 = document.getElementById("chart-disco").getContext("2d");

  chart1 = new Chart(ctx1, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
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
          data: [],
          maxBarThickness: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      scales: {
        y: {
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
            color: "rgba(255, 255, 255, .2)",
          },
          ticks: {
            display: true,
            padding: 10,
            color: "#f8f9fa",
            font: {
              size: 14,
              weight: 300,
              family: "Roboto",
              style: "normal",
              lineHeight: 2,
            },
          },
        },
        x: {
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: false,
            drawTicks: false,
            borderDash: [5, 5],
          },
          ticks: {
            display: true,
            color: "#f8f9fa",
            padding: 10,
            font: {
              size: 14,
              weight: 300,
              family: "Roboto",
              style: "normal",
              lineHeight: 2,
            },
          },
        },
      },
    },
  });

  chart2 = new Chart(ctx2, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
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
          data: [],
          maxBarThickness: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      scales: {
        y: {
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
            color: "rgba(255, 255, 255, .2)",
          },
          ticks: {
            display: true,
            padding: 10,
            color: "#f8f9fa",
            font: {
              size: 14,
              weight: 300,
              family: "Roboto",
              style: "normal",
              lineHeight: 2,
            },
          },
        },
        x: {
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: false,
            drawTicks: false,
            borderDash: [5, 5],
          },
          ticks: {
            display: true,
            color: "#f8f9fa",
            padding: 10,
            font: {
              size: 14,
              weight: 300,
              family: "Roboto",
              style: "normal",
              lineHeight: 2,
            },
          },
        },
      },
    },
  });

  chart3 = new Chart(ctx3, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
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
          data: [],
          maxBarThickness: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      scales: {
        y: {
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
            color: "rgba(255, 255, 255, .2)",
          },
          ticks: {
            display: true,
            padding: 10,
            color: "#f8f9fa",
            font: {
              size: 14,
              weight: 300,
              family: "Roboto",
              style: "normal",
              lineHeight: 2,
            },
          },
        },
        x: {
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: false,
            drawTicks: false,
            borderDash: [5, 5],
          },
          ticks: {
            display: true,
            color: "#f8f9fa",
            padding: 10,
            font: {
              size: 14,
              weight: 300,
              family: "Roboto",
              style: "normal",
              lineHeight: 2,
            },
          },
        },
      },
    },
  });

  obterDadosGrafico(id_servidor, chart1, chart2, chart3)
  setInterval(() => obterDadosGrafico(id_servidor, chart1, chart2, chart3), 5500)
}