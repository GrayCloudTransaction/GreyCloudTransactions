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

  function obterDadosGraficoRede(graficoRede) {

    var valorDownload
    var valorUpload
    var ping
    var labelRede
  
  
    fetch(`/eduardoCamargo/ultimas`, {
      cache: "no-store",
    })
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (resposta) {
            console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
  
            for (i in resposta) {
              var datetime = new Date(resposta[i].data_registro).toLocaleString("pt-BR");
  
              if (resposta[i].interfaces != "eth0") {
                console.log("Achou rede");
  
                valorDownload = Math.round(resposta[i].vel_download);
                valorUpload = Math.round(resposta[i].vel_upload);
                ping = Math.round(resposta[i].ping);
  
  
                labelRede = datetime
                valorDownloadID.innerHTML = valorDownload + "Mbps"
                valorUploadID.innerHTML = valorUpload + "Mbps"
                pingID.innerHTML = ping
  
                if (ping > 15) {
                  pingID.style.color = "red"
                }
                else if (ping >= 10 && ping <= 15) {
                  pingID.style.color = "darkgoldenrod"
                }
                else {
                  pingID.style.color = "green"
                }
  
                if (valorDownload <= 10) {
                  valorDownloadID.style.color = "red"
                } else if (valorDownload <= 20) {
                  valorDownloadID.style.color = "darkgoldenrod"
                }else{
                  valorDownloadID.style.color = "green"
                }
  
                if (valorUpload <= 10) {
                  valorUploadID.style.color = "red"
                } else if (valorDownload <= 20) {
                  valorUploadID.style.color = "darkgoldenrod"
                }else{
                  valorUploadID.style.color = "green"
                }
  
              } else {
                console.log("Dados incorretos.");
              }
            }
  
  
            atualizarGrafico(ping,valorDownload,valorUpload, labelRede, graficoRede, 0,1,2);
  
  
          });
        } else {
          console.error("Nenhum dado encontrado ou erro na API");
        }
      })
      .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });
  }
  
  
  
  
  
  
  
  
  function atualizarGrafico(valor1,valor2, valor3, label, ctx, i,j,k) {
    if (ctx.data.datasets[i].data.length < 5) {
      ctx.data.labels.push(label);
      ctx.data.datasets[i].data.push(valor1);
      ctx.data.datasets[j].data.push(valor2);
      ctx.data.datasets[k].data.push(valor3);
  
      ctx.update();
    }
    else {
      ctx.data.labels.shift();
      ctx.data.labels.push(label);
  
      ctx.data.datasets[i].data.shift();
      ctx.data.datasets[j].data.shift();
      ctx.data.datasets[k].data.shift();
      ctx.data.datasets[i].data.push(valor1);
      ctx.data.datasets[j].data.push(valor2);
      ctx.data.datasets[k].data.push(valor3);
  
      ctx.update();
    }
  
  }
  
  
  function teste() {

    var ctx4 = document.getElementById("chart-rede").getContext("2d");

    chart4 = new Chart(ctx4, {
        type: "line",
        data: {
          labels: [],
          datasets: [
            {
              label: "ping",
              tension: 0,
              borderWidth: 0,
              pointRadius: 5,
              pointBackgroundColor: "rgba(0,0,255, .8)",
              pointBorderColor: "transparent",
              borderColor: "rgba(0,0,255, .8)",
              borderWidth: 4,
              backgroundColor: "transparent",
              fill: true,
              data: [],
              //maxBarThickness: 6,
            },
    
            {
              label: "vel_down",
              tension: 0,
              borderWidth: 0,
              pointRadius: 5,
              pointBackgroundColor: "rgba(169,169,169, .8)",
              pointBorderColor: "transparent",
              borderColor: "rgba(169,169,169, .8)",
              borderWidth: 4,
              backgroundColor: "transparent",
              fill: true,
              data: [],
              //maxBarThickness: 6,
            },
    
            {
              label: "vel_up",
              tension: 0,
              borderWidth: 0,
              pointRadius: 5,
              pointBackgroundColor: "rgba(220,20,60, .8)",
              pointBorderColor: "transparent",
              borderColor: "rgba(220,20,60, .8)",
              borderWidth: 4,
              backgroundColor: "transparent",
              fill: true,
              data: [],
              //maxBarThickness: 6,
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
    
      //obterDadosGrafico(id_servidor, chart1, chart2, chart3)
      setInterval(() => obterDadosGraficoRede(chart4), 5000)
      obterDadosGraficoRede(chart4)
    }