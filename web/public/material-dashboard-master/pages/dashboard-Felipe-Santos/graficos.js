var conta_grafico = 0;
var graficoVAR;
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

                    if(conta_grafico == 1){
                        graficoVAR = new Chart(grafico, {
                            type: 'bar',
                            data: {
                            labels: nomeLabels,
                            datasets: [{
                                label: "Valores em Reais",
                                    tension: 0,
                                    borderWidth: 0,
                                    backgroundColor: "rgb(20, 206, 57, 0.8)",
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
                                        color: 'rgba(255, 255, 255, .4)'
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
                    else{
                        atualizarGraficoBarrasCustoGeral(graficoVAR, valores);
                    }
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

function atualizarGraficoBarrasCustoGeral(grafico, dados){
    grafico.data.datasets[0].data = dados;
    grafico.update();
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

function plotarGraficoLinhasHistorico(dias, idEmpresa){
    const grafico_linha = document.getElementById("grafico-linha");
    let horas = [];
    let meses = [];
    let valores = [];

    fetch(`/felipe/listar/extrato/historico/somarizado/empresa`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idEmpresa: idEmpresa,
            dias: dias
        })
    }).then((resposta) =>{
        if(resposta.ok){
            resposta.json().then(
                (json) => {
                    console.log(json);
                    for(let i = 0; i < json.length; i++){
                        horas.push(json[i].horas);
                        meses.push(json[i].mes);
                        valores.push(json[i].valor);
                    }

                    // const data = {
                    // labels: meses,
                    // datasets: [{
                    //     label: "Valores em Reais (BRL)",
                    //     data: valores,
                    //     fill: false,
                    //     borderColor: 'rgb(75, 192, 192)',
                    //     tension: 0.1
                    // }]
                    // };
                    // const config = {
                    //     type: 'line',
                    //     data: data,
                    //   };

                    // new Chart(grafico_linha, config);

                    new Chart(grafico_linha, {
                        type: 'line',
                        data: {
                          labels: meses,
                          datasets: [{
                                label: "Valores em Reais (BRL)",
                                borderColor: 'rgb(75, 192, 12)',
                                backgroundColor: "#ffffff",
                                data: valores,
                          }]
                        },
                        options: {
                          responsive: true,
                          maintainAspectRatio: true,
                          plugins: {
                              legend: {
                                  display: false,
                              }
                          },
                          scales: {
                              y: {
                                  grid: {
                                      drawBorder: true,
                                      display: true,
                                      drawOnChartArea: true,
                                      drawTicks: false,
                                      borderDash: [5, 5],
                                      color: 'rgba(255, 255, 255, 1)'
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
        }
    })
}

function plot_kpis_ordenadas(componente, idEmpresa, dias){
    fetch('/felipe/listar/custo/ordenado/componente', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
            componente:componente,
            idEmpresa: idEmpresa,
            dias: dias
        })
    }).then((resposta) => {
            if(resposta.ok){
                resposta.json().then(
                    (json) => {
                            if(json[0].comp == "CPU"){
                                sp_nomeMaiorCustoCPU.innerHTML = "";
                                sp_nomeMaiorCustoCPU.innerHTML = json[0].nome_servidor;
                                
                                sp_maiorValorCustoCPU.innerHTML = "";
                                sp_maiorValorCustoCPU.innerHTML = parseFloat(json[0].valor).toFixed(2);

                                let tabelaCPU = document.getElementById("listaDeServidoresCPU");
                                tabelaCPU.innerHTML = "";
                                for(let i = 0; i < json.length; i++){
                                    tabelaCPU.innerHTML +=`
                                    <tr class="text-center text-uppercase font-weight-bolder" >
                                        <td>${json[i].mes} - 2023</td>
                                        <td>${json[i].nome_servidor}</td>
                                        <td>${json[i].horas}</td>
                                        <td>R$ ${parseFloat (json[i].valor).toFixed(2)}</td>
                                    </tr>                  
                                    `;
                                }
                            }
                            else if(json[0].comp == "RAM"){
                                sp_nomeMaiorCustoRAM.innerHTML = "";
                                sp_nomeMaiorCustoRAM.innerHTML = json[0].nome_servidor;
                                
                                sp_maiorValorCustoRAM.innerHTML = "";
                                sp_maiorValorCustoRAM.innerHTML = parseFloat(json[0].valor).toFixed(2);

                                let tabelaCPU = document.getElementById("listaDeServidoresRAM");
                                tabelaCPU.innerHTML = "";
                                for(let i = 0; i < json.length; i++){
                                    tabelaCPU.innerHTML +=`
                                    <tr class="text-center text-uppercase font-weight-bolder" >
                                        <td>${json[i].mes} - 2023</td>
                                        <td>${json[i].nome_servidor}</td>
                                        <td>${json[i].horas}</td>
                                        <td>R$ ${parseFloat (json[i].valor).toFixed(2)}</td>
                                    </tr>                  
                                    `;
                                }
                            }
                        
                    }
                )
            }
        })
}