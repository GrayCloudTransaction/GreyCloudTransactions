var conta_grafico = 0;
function plotarGraficoBarrasCustoGeral(dias, idEmpresa){
    conta_grafico++;
    const grafico = document.getElementById('grafico_de_barras_02').getContext("2d");
    var nomeLabels = [];
    var valores = [];
    

    fetch(`/felipe/listar/extrato/historico/somarizado`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
            idEmpresa: idEmpresa,
            dias: dias
        })
    }).then((resposta) => {
        if(resposta.ok){
            resposta.json().then(
                (json)=>{
                    console.log(json);
                    for(var i = 0; i < json.length; i++){
                        nomeLabels.push(json[i].nome_servidor);
                        valores.push(json[i].valor);
                    }

                    new Chart(grafico, {
                        type: 'bar',
                        data: {
                          labels: nomeLabels,
                          datasets: [{
                            label: "Valores em Reais",
                                tension: 0,
                                borderWidth: 0,
                                borderWidth: 0,
                                backgroundColor: "rgba(255, 255, 255, .8)",
                                fill: true,
                                data: valores,
                                barThickness: 60,
                                maxBarThickness: 100
                          }]
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
            )
            
        } else {
            resposta.text().then((texto) => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    });

}


function teste_grafico_barras(){
    const ctx = document.getElementById('grafico_de_barras_01');

    new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
}

/*
function plotarGraficoBarrasCustoGeral(dias, idEmpresa){
    
    var grafico = document.getElementById('grafico_de_barras_02');
    var nomeLabels = [];
    var valores = [];
    

    fetch(`/felipe/listar/extrato/historico/somarizado`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
            idEmpresa: idEmpresa,
            dias: dias
        })
    }).then((resposta) => {
        if(resposta.ok){
            resposta.json().then(
                (json)=>{
                    console.log(json);
                    for(var i = 0; i < json.length; i++){
                        nomeLabels.push(json.nome_servidor);
                        valores.push(json.valor);
                    }

                    data = {
                        labels: nomeLabels,
                        datasets: [{
                            label: "Valores",
                            data: valores,
                            backgroundColor: ["#000000".repeat(valores.length)],
                            borderColor: ["#000000".repeat(valores.length)],
                            borderWidth: 1,
                        }]
                    };

                    var montagem = {
                        labels: nomeLabels,
                        datasets: [{
                          label: 'Gráficooooooo',
                          data: data,
                        }]
                      };
                
                    var config = {
                        type: 'bar',
                        data: montagem
                    }
                     
                    new Chart(grafico, config);
                }
            )
            
        } else {
            resposta.text().then((texto) => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    });

}
*/