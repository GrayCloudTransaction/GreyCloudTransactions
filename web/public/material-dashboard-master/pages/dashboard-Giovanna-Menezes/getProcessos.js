var listaProcessos = [];
var listaProcessosConsumidores = [];

function totaisDeProcessos() {
  var idServidor = sessionStorage.ID_SERVIDOR;

  fetch(`/giovannaMenezes/listarProcessos/${idServidor}`, { cache: "no-store" })
    .then(function (resposta) {
      console.log(resposta);

      if (resposta.ok) {
        resposta.json().then((json) => {
          console.log(json);
          console.log(JSON.stringify(json));

          qtdProcessosTotais.innerHTML = json[0].qtd_processos;

          if (json[0].qtd_processos <= 0) {
            listaProcessos.innerHTML = "<p>Nenhum processo foi capturado</p>";
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

function totaisDeProcessosConsumidores() {
  var idServidor = sessionStorage.ID_SERVIDOR;

  fetch(`/giovannaMenezes/listarProcessosConsumidores/${idServidor}`, {
    cache: "no-store",
  })
    .then(function (resposta) {
      console.log(resposta);

      if (resposta.ok) {
        resposta.json().then((json) => {
          console.log(json);
          console.log(JSON.stringify(json));
          qtdConsumidoresTotais.innerHTML = json[0].qtd_processos_consumidores;

          if (json[0].qtd_processos_consumidores <= 0) {
            qtdConsumidores.innerHTML = 0;
            listaProcessosConsumidores.innerHTML =
              "<p>Nenhum processo consumidor foi capturado</p>";

            var element = document.getElementById("chart_canvas");

            element.style.display = "block";
            card_grafico.innerHTML =
              "<p class='text-m mb-1 text-center'>Nenhum processo consumindo CPU foi capturado</p>";
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

function obterProcessos(limite) {
  // select limite = limite
  var idServidor = sessionStorage.ID_SERVIDOR;

  fetch(
    `/giovannaMenezes/buscarUltimosProcessos/id_servidor/${idServidor}/limite/${limite}`,
    { cache: "no-store" }
  )
    .then(function (resposta) {
      console.log(resposta);

      if (resposta.ok) {
        resposta.json().then((json) => {
          console.log(json);
          console.log(JSON.stringify(json));

          processoPID.innerHTML = "";
          processoNome.innerHTML = "";
          processoCPU.innerHTML = "";

            qtdProcessos.innerHTML = limite;

            for (let i = json.length - 1; i <= json.length - limite; i--) {
              processoPID.innerHTML += `<p class="text-sm mb-1">${json[i].pid}</p>`;
              processoNome.innerHTML += `<p class="text-sm mb-1">${json[i].nome}</p>`;
              processoCPU.innerHTML += `<p class="text-sm mb-1">${json[i].uso_cpu}</p>`;
            }

          return json;
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

    setInterval(() => {
      obterProcessos(limite);
    }, 2000);

  // return lista doq foi recebido
}

// function exibirProcessos(limite) {
//   // fazer um foreach com a lista e printar os dados

//   var pidAtual = 0;

//     for (let f = 0; f < listaProcessos.length; f++) {
//         if (pidAtual == listaProcessos[i].pid) {
//             delete listaProcessos[i];
//         } else {
//             pidAtual = listaProcessos[i];
//         }    
//     }
// }



function obterProcessosConsumidores() {
  var idServidor = sessionStorage.ID_SERVIDOR;

  fetch(
        `/giovannaMenezes/buscarProcessosConsumidores/${idServidor}/limite/${limite}`,
        { cache: "no-store" }
    )
        .then(function (resposta) {
        console.log(resposta);

        if (resposta.ok) {
            resposta.json().then((json) => {
            console.log(json);
            console.log(JSON.stringify(json));

            listaProcessosConsumidores = json;
            return json;
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

function exibirProcessosConsumidores(limiteConsumidor) {
  if (json.length <= limiteConsumidor) {
    qtdConsumidores.innerHTML = json.length;
  } else {
    qtdConsumidores.innerHTML = limiteConsumidor;
  }

  for (let i = json.length - 1; i <= json.length - limiteConsumidor; i--) {
    processoConsumidorPID.innerHTML += `<p class="text-sm mb-1">${json[i].pid}</p>`;
    if (json[i].uso_cpu > 50 && json[i].uso_cpu < 70) {
      comandoRecomendado.innerHTML += `<p class="text-sm mb-1">suspend processo</p>`;
    } else {
      comandoRecomendado.innerHTML += `<p class="text-sm mb-1">kill process</p>`;
    }
  }
}

function graficoServerXcpu() {
  var ctx5 = document.getElementById("chart-bars").getContext("2d");
  var labelsGrafico = [];
  var dataGrafico = [];

  fetch(`/giovannaMenezes/getServidorPorUsoCpu/`, { cache: "no-store" })
    .then(function (resposta) {
      console.log(resposta);

      if (resposta.ok) {
        resposta.json().then((json) => {
          console.log(json);
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
                datasets: [
                  {
                    label: "Qtd. de processos consumidores",
                    tension: 0,
                    borderWidth: 0,
                    borderWidth: 0,
                    backgroundColor: "#F5C217",
                    fill: true,
                    data: dataGrafico,
                    barThickness: 60,
                    maxBarThickness: 100,
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

function wordcloud() {
  anychart.onDocumentReady(function() {
    // var data = $.csv.toObjects(csv)
    var data = []

  // create a tag (word) cloud chart
  var chart = anychart.tagCloud(data);

  // set a chart title
  chart.title('Processos mais frequentes')
  // set an array of angles at which the words will be laid out
  chart.angles([0])
  // enable a color range
  chart.colorRange(true);
  // set the color range length
  chart.colorRange().length('80%');

  // display the word cloud chart
  chart.container("container");
  chart.draw();

  var formatter = "{%value}{scale:(1)(1000)(1000)(1000)|( processos)( thousand)( million)( billion)}";
  tooltip.format(formatter);
  });
}
