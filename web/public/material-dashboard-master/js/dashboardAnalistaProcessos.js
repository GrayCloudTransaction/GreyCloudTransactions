function getQtdTotalProcessos() {
  var idServidor = sessionStorage.ID_SERVIDOR;
  fetch(`/vitorHideki/getQtdTotalProcessos/${idServidor}`, { cache: 'no-store' })
      .then(function (resposta) {
        console.log(resposta);

        if (resposta.ok) {
            resposta.json().then((json) => {
                console.log(json);
                console.log(JSON.stringify(json));

                qtdTotalProcessos.innerHTML = `${json[json.length - 1].qtd_processos}`
                plotarHistograma(json);
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

function plotarHistograma(data) {

  const optionsProcesses = {
    container: document.getElementById('chart-processos'),
    background: {
      fill: 'rgb(255,255,255,0)',
    },
    data: data,
    series: [
      {
        type: 'histogram',
        xKey: 'qtd_processos',
        xName: 'Processos',
        fill: 'rgba(255, 255, 255, 0.8)',
        tooltip: {
          renderer: function (params) {
            return `
                <div class="ag-chart-tooltip-title" style="background-color: #1A73E8; color: #f8f9fa">
                    Processos: ${params.xValue[0]}-${params.xValue[1]}
                </div>
                <div class="ag-chart-tooltip-content">
                    Frequência: ${params.yValue}
                </div>`
          },
        },
        strokeWidth: 0,
      },
    ],
    axes: [
      {
        type: 'number',
        position: 'bottom',
        title: { 
          text: 'Processos', 
          fontStyle: 'normal',
          fontWeight: 'bold',
          fontSize: 14,
          fontFamily: 'Roboto',
          color: '#f8f9fa',
        },
        tick: { 
          color: '#f8f9fa',
        },
        label: { 
          enabled: true,
          fontStyle: 'normal',
          fontWeight: 'bold',
          fontSize: 14,
          fontFamily: 'Roboto',
          color: '#f8f9fa',
        }
      },
      {
        type: 'number',
        position: 'left',
        title: { 
          text: 'Frequência',
          fontStyle: 'normal',
          fontWeight: 'bold',
          fontSize: 14,
          fontFamily: 'Roboto',
          color: '#f8f9fa', 
        },
        label: { 
          enabled: true,
          fontStyle: 'normal',
          fontWeight: 'bold',
          fontSize: 14,
          fontFamily: 'Roboto',
          color: '#f8f9fa',
        }
      },
    ],
    highlightStyle: {
      item: {
        fill: 'rgb(255,255,255)',
        fillOpacity: 1,

      },
      series: {
        enabled: true,
        dimOpacity: 1,
        fill: 'rgb(255,255,255)',
        fillOpacity: 1,
      }
    },
  };
  
  var chart = agCharts.AgChart.create(optionsProcesses);

}

function getProcessos() {
  var idServidor = sessionStorage.ID_SERVIDOR;
  fetch(`/vitorHideki/getProcessos/${idServidor}`, { cache: 'no-store' })
      .then(function (resposta) {
        console.log(resposta);

        if (resposta.ok) {
            resposta.json().then((json) => {
                console.log(json);
                console.log(JSON.stringify(json));
                qtdProcessosAtivos.innerHTML = `
                    <i class="fa fa-check text-info" aria-hidden="true"></i>
                    ${json.length} processos ativos
                `
                for (var i = 0; i < json.length; i++) {
                    var processo = json[i];
                    var opcaoCorRam = '';
                    var opcaoCorBytesRead = '';
                    var opcaoCorBytesWrite = '';

                    if (processo.uso_ram > 10) {
                        opcaoCorRam = 'bg-danger text-white'
                    } else if (processo.uso_ram > 1) {
                        opcaoCorRam = 'bg-warning text-white'
                    }

                    if (processo.bytes_lidos > 536870912) {// 1 GB
                        opcaoCorBytesRead = 'bg-danger text-white';
                    } else if (processo.bytes_lidos > 52428800) {// 50 MB
                        opcaoCorBytesRead = 'bg-warning text-white';
                    }

                    if (processo.bytes_escritos > 536870912) {// 1 GB
                      opcaoCorBytesWrite = 'bg-danger text-white';
                    } else if (processo.bytes_escritos > 52428800) {// 50 MB
                        opcaoCorBytesWrite = 'bg-warning text-white';
                    }

                    listaDeProcessos.innerHTML += `
                        <tr id="${processo.nome}(${processo.pid})">
                            <td class="align-middle text-center text-sm">
                                <span class="text-xs font-weight-bold">${processo.pid}</span>
                            </td>
                            <td class="align-middle text-center text-sm">
                                <span class="text-xs font-weight-bold">${processo.ppid}</span>
                            </td>
                            <td class="align-middle text-center text-sm">
                                <span class="text-xs font-weight-bold">${processo.nome}</span>
                            </td>
                            <td class="align-middle text-center text-sm">
                                <span class="text-xs font-weight-bold">${processo.prioridade}</span>
                            </td>
                            <td class="align-middle text-center text-sm">
                                <span class="text-xs font-weight-bold">${processo.usuario}</span>
                            </td>
                            <td class="align-middle text-center text-sm">
                                <span class="text-xs font-weight-bold">${processo.estado}</span>
                            </td>
                            <td class="align-middle text-center text-sm ${opcaoCorRam}">
                                <span class="text-xs font-weight-bold">${processo.uso_ram + '%'}</span>
                            </td>
                            <td class="align-middle text-center text-sm ${opcaoCorBytesRead}">
                                <span class="text-xs font-weight-bold">${conversorBytes(processo.bytes_lidos)}</span>
                            </td>
                            <td class="align-middle text-center text-sm ${opcaoCorBytesWrite}">
                                <span class="text-xs font-weight-bold">${conversorBytes(processo.bytes_escritos)}</span>
                            </td>
                            <td class="text-sm ps-4">
                                <span class="text-xs font-weight-bold">${processo.comando}</span>
                            </td>
                        </tr>
                        `
                  
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

function mostrarProcessTree() {
    var divProcessos = document.getElementById('divProcessos');
    divProcessos.classList.replace('col-lg-12', 'col-lg-9');
    var divProcessTree = document.getElementById('divProcessTree');
    divProcessTree.classList.remove('invisible');
}

function esconderDivProcessTree() {
    var divProcessTree = document.getElementById('divProcessTree');
    divProcessTree.classList.add('invisible');
    var divProcessos = document.getElementById('divProcessos');
    divProcessos.classList.replace('col-lg-9', 'col-lg-12');
}

function getProcessTree() {
    var pid = iptPidProcessTree.value;
    var idServidor = sessionStorage.ID_SERVIDOR;

    fetch(`/vitorHideki/getProcessTree/${idServidor}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          pidServer: pid
      }),
  })
  .then(function (resposta) {
    console.log(resposta);

    if (resposta.ok) {
        resposta.json().then((json) => {
            console.log(json);
            console.log(JSON.stringify(json));

            processTree.innerHTML = '';
            for (var i = 0; i < json.length; i++) {
              var processo = json[json.length - (i + 1)];
              
              processTree.innerHTML += `
                  <a href="#${processo.nome}(${processo.pid})"><p class="text-center mb-1">${processo.nome}(${processo.pid})</p></a>
              `
              if (i + 1 < json.length) {
                processTree.innerHTML += `                      
                  <p class="text-center mb-1">↓</p>
                `
              }
              
            }
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

function getProcessosMaiorConsumo() {
  var idServidor = sessionStorage.ID_SERVIDOR;
  fetch(`/vitorHideki/getProcessosMaiorConsumo/${idServidor}`, { cache: 'no-store' })
      .then(function (resposta) {
        console.log(resposta);

        if (resposta.ok) {
            resposta.json().then((json) => {
                console.log(json);
                console.log(JSON.stringify(json));

                var processoRam;
                var processoBytesRead;
                var processoBytesWrite;
                for (var i = 0; i < json.length; i++) {
                    var processoDaVez = json[i];
                    if (i == 0) {
                        processoRam = processoDaVez;
                        processoBytesRead = processoDaVez;
                        processoBytesWrite = processoDaVez;
                    } else {
                        if (processoRam.uso_ram < processoDaVez.uso_ram) {
                            processoRam = processoDaVez;
                        }
                        if (processoBytesRead.bytes_lidos < processoDaVez.bytes_lidos) {
                            processoBytesRead = processoDaVez;
                        }
                        if (processoBytesWrite.bytes_escritos < processoDaVez.bytes_escritos) {
                            processoBytesWrite = processoDaVez;
                        }
                    }
                }
                
                usoRamProcessoRam.innerHTML = processoRam.uso_ram + '%';
                pidProcessoRam.innerHTML = processoRam.pid;
                nomeProcessoRam.innerHTML = processoRam.nome;
                prioridadeProcessoRam.innerHTML = processoRam.prioridade;
                userProcessoRam.innerHTML = processoRam.usuario;
                bytesReadProcessoRam.innerHTML = conversorBytes(processoRam.bytes_lidos);
                bytesWriteProcessoRam.innerHTML = conversorBytes(processoRam.bytes_escritos);
                comandoProcessoRam.innerHTML = processoRam.comando;

                bytesReadProcessoRead.innerHTML = conversorBytes(processoBytesRead.bytes_lidos);
                pidProcessoRead.innerHTML = processoBytesRead.pid;
                nomeProcessoRead.innerHTML = processoBytesRead.nome;
                prioridadeProcessoRead.innerHTML = processoBytesRead.prioridade;
                userProcessoRead.innerHTML = processoBytesRead.usuario;
                usoRamProcessoRead.innerHTML = processoBytesRead.uso_ram + '%';
                bytesWriteProcessoRead.innerHTML = conversorBytes(processoBytesRead.bytes_escritos);
                comandoProcessoRead.innerHTML = processoBytesRead.comando;

                bytesWriteProcessoWrite.innerHTML = conversorBytes(processoBytesWrite.bytes_escritos);
                pidProcessoWrite.innerHTML = processoBytesWrite.pid;
                nomeProcessoWrite.innerHTML = processoBytesWrite.nome;
                prioridadeProcessoWrite.innerHTML = processoBytesWrite.prioridade;
                userProcessoWrite.innerHTML = processoBytesWrite.usuario;
                usoRamProcessoWrite.innerHTML = processoBytesWrite.uso_ram + '%';
                bytesReadProcessoWrite.innerHTML = conversorBytes(processoBytesWrite.bytes_lidos);
                comandoProcessoWrite.innerHTML = processoBytesWrite.comando;

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



function conversorBytes(num) {
    var unidadeMedida;
    var valor;

    if (num < 1024) {
        valor = num;
        unidadeMedida = 'B';
    } else if (num < 1048576) {
        valor = num/1024;
        unidadeMedida = 'KB';
    } else if (num < 1073741824) {
        valor = num/1048576;
        unidadeMedida = 'MB';
    } else if (num < 1099511627776) {
        valor = num/1073741824;
        unidadeMedida = 'GB';
    }
    return Number(valor).toFixed(2) + ' ' + unidadeMedida;
}