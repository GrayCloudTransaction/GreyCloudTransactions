function teste() {
    var ctx1 = document.getElementById("chart-ram").getContext("2d");
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


    var ctx2 = document.getElementById("chart-cpu").getContext("2d");
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
    fetch("/rafael/getPredict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },body: JSON.stringify({
        idServidorServer: sessionStorage.ID_SERVIDOR,
      })
    })
      .then(function (resposta) {
        if (resposta.ok) {
          resposta.json().then((json) => {
            for (let y = 0; y < json[0].length; y++){
              chart1.data.labels.push("valor " + y);

              if(json[0][y] <= 0){
                chart1.data.datasets[0].data.push(0);
              }
              else{
                chart1.data.datasets[0].data.push(json[0][y]);
              }

              chart1.update();
            }
            for (let y = 0; y < json[1].length; y++){
              chart2.data.labels.push("valor " + y);

              if(json[1][y] <= 0){
                chart2.data.datasets[0].data.push(0);
              }
              else{
                chart2.data.datasets[0].data.push(json[1][y]);
              }

              chart2.update();
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