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

  fetch(`/chamado/listarPorServidor/${idEmpresa}`, { cache: 'no-store' })
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

function obterDadosGrafico(id_servidor, graficoRede) {
  var valorDataRecv
  var valorDataSent
  var labelDataRecv
  var labelDataSent
  console.log('entrando no obter dados grafico')


  fetch(`/gabriel/ultimas/${id_servidor}`, {
    cache: "no-store",
  })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
          console.log(resposta);

          for (i in resposta) {
            var datetime = new Date(resposta[i].data_registro).toLocaleString("pt-BR");
            
            macAddress.innerHTML = resposta[i].mac_address;
            ipPublico.innerHTML = resposta[i].ip_publico;
            cidadeServidor.innerHTML = resposta[i].cidade;
            temperaturaCidade.innerHTML = resposta[i].valor_temperatura;
            
            valorDataRecv = resposta[i].dataRecv;
            valorDataSent = resposta[i].dataSent;
            
            labelDataRecv = datetime
          
            //valorDataRecvID.innerHTML = valorDataRecv + "MB"
            //valorDataSentID.innerHTML = valorDataSent + "MB"

            /* if(valorDataRecv > 500){
              valorDataRecvID.style.color = "red"
            }else if(valorDataRecv > 300){
              valorDataRecvID.style.color = "darkgoldenrod"
            }else{
              valorDataRecvID.style.color = "green"
            } */

            /* if(valorDataSent > 500){
              valorDataSentID.style.color = "red"
            }else if(valorDataSent > 300){
              valorDataSentID.style.color = "darkgoldenrod"
            }else{
              valorDataSentID.style.color = "green"
            } */
          }

          atualizarGrafico(valorDataRecv, valorDataSent, labelDataRecv, graficoRede);
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function atualizarGrafico(valor, valor2, label, ctx) {
  if(ctx.data.labels.length < 5){
    ctx.data.labels.push(label);
    ctx.data.datasets[0].data.push(valor);
    ctx.data.datasets[1].data.push(valor2)
    ctx.update();
  }
  else{
    ctx.data.labels.shift();
    ctx.data.labels.push(label);

    ctx.data.datasets[0].data.shift();
    ctx.data.datasets[1].data.shift();
    ctx.data.datasets[0].data.push(valor);
    ctx.data.datasets[1].data.push(valor2);
    ctx.update();
  }
}

function teste(id_servidor){
  var ctx1 = document.getElementById("chart-rede").getContext("2d");

  chart1 = new Chart(ctx1, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "Pacotes Recebidos",
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
        {
          label: "Pacotes Enviados",
          tension: 0,
          borderWidth: 0,
          pointRadius: 5,
          pointBackgroundColor: "rgba(255, 255, 155, .8)",
          pointBorderColor: "transparent",
          borderColor: "rgba(255, 255, 155, .8)",
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

  obterDadosGrafico(id_servidor, chart1)
  setInterval(() => obterDadosGrafico(id_servidor, chart1), 5500)
}

function correlacao(id_servidor){
  fetch(`/gabriel/getCorrelacao/${id_servidor}`, {
    cache: "no-store"
  }).then(function (resposta) {
    console.log(resposta)
    if (resposta.ok) {
      alert('jonas')
      resposta.json().then((json) => {
        
        interferenciaID.innerHTML = json[0]
        });
    }else{
      resposta.text().then((texto) => {
        console.erro(texto);
      });
    }
  })
  .catch(function (erro) {
    console.log(erro);
  });
}