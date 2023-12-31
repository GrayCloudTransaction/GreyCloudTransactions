const processos = []
var processosConsumidores = []
var totalProcessos = 0
var totalProcessosConsumidores = 0
var limiteAtual = 10;

function setLimite(limite){
  limiteAtual = limite
}

function getProcessos(){
  idServidor = sessionStorage.ID_SERVIDOR
  fetch(`/giovannaMenezes/getProcessos/${idServidor}`, {
    method: "GET",
    headers: {
      "Content-Type": "application.json"
    }
  }).then((resposta) => {
    if(resposta.ok) {
      console.log(resposta)
      resposta.json().then((json) => {
        console.log(json)
        processos.length = 0
        for(i = 0; i < json.length; i++){
          if(processos.length < limiteAtual){
            processos.push(json[i])
            totalProcessos = json.length
          }
        }
      })
    }
  })
}

function getProcessosConsumidores(){
  idServidor = sessionStorage.ID_SERVIDOR
  fetch(`/giovannaMenezes/getProcessosConsumidores/${idServidor}`, {
    method: "GET",
    headers: {
      "Content-Type": "application.json"
    }
  }).then((resposta) => {
    if(resposta.ok) {
      console.log(resposta)
      resposta.json().then((json) => {
        console.log(json)
        processosConsumidores.length = 0
        for(i = 0; i < json.length; i++){
          if(processosConsumidores.length < limiteAtual){
              processosConsumidores.push(json[i])
              totalProcessosConsumidores = json.length
          }
        }
      })
    }
  })
}

function atualizarPagina(){
  getProcessos()
  getProcessosConsumidores()

  processoPID.innerHTML = ``
  processoNome.innerHTML = ``
  processoCPU.innerHTML = ``

    for(i = processos.length - 1; i >= 0; i--) {
      processoAtual = processos[i]

      processoPID.innerHTML += `<p class="text-sm mb-1">${processoAtual.pid}</p>`
      processoNome.innerHTML += `<p class="text-sm mb-1">${processoAtual.nome}</p>`
      processoCPU.innerHTML += `<p class="text-sm mb-1">${processoAtual.uso_cpu}</p>`
    }

  qtdProcessos.innerHTML = processos.length
  qtdProcessosTotais.innerHTML = totalProcessos

  processoConsumidorPID.innerHTML = ``
  comandoRecomendado.innerHTML = ``

    for(i = processosConsumidores.length - 1; i >= 0; i--) {
      processoConsumidorAtual = processosConsumidores[i]

      processoConsumidorPID.innerHTML += `<p class="text-sm mb-1">${processoConsumidorAtual.pid}</p>`

      if (processosConsumidores[i].uso_cpu > 50 && processosConsumidores[i].uso_cpu < 70) {
        comandoRecomendado.innerHTML += `<p class="text-sm mb-1">suspend process</p>`;
      } else {
        comandoRecomendado.innerHTML += `<p class="text-sm mb-1">kill process</p>`;
      }
    }

  qtdConsumidores.innerHTML = processosConsumidores.length
  qtdConsumidoresTotais.innerHTML = totalProcessosConsumidores
}

atualizarPagina()
setInterval( () => {
  atualizarPagina()
}, 2000 )

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

function getWcDados() {
  const fs = require('node:fs');

  fs.readFile('./wordcloud/wc_processos.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    
    console.log(data);
    return data;
  })
}

function wordcloud() {
  var json_processos = getWcDados();
  var data = [];

  anychart.onDocumentReady(function() {
    for (let i = 0; i < json_processos.length; i++) {
      data = [{
        "x": `${json_processos[i].word}`, value: json_processos[i].freq, category: "XPTO", 
      }]
    }

  // create a tag (word) cloud chart
  var chart = anychart.tagCloud(data);

  // set a chart title
  chart.title('Processos mais frequentes')
  // set an array of angles at which the words will be laid out
  chart.angles([0])
  // enable a color range
  chart.colorRange(true);
  // set the color range length
  chart.colorRange().length('100%');

  // display the word cloud chart
  chart.container("container");
  chart.draw();

  var formatter = "{%value}{scale:(1)(1000)(1000)(1000)|( processos)( thousand)( million)( billion)}";
  tooltip.format(formatter);
  });
}
