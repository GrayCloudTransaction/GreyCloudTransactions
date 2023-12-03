function plotTabelaSistemas(idEmpresa){
    let tabela = document.getElementById("tabelaSistemaJava");
    tabela.innerHTML = "";

    fetch(`/felipe/java/listar/${idEmpresa}`).then((resposta) => {
        if(resposta.ok){
            resposta.json().then((json)=>{
                console.log(json);

                let servidores = [];
                for(let i = 0; i < json.length; i++){
                    servidores.push(json[i].nome);
                }

                // Removendo Duplicados
                const set = new Set(servidores);
                servidores = Array.from(set);                
      
                for(let i = 0; i < servidores.length; i++){
                    console.log(servidores[i]);
                    tabela.innerHTML += `
                    <tr class="text-center text-uppercase font-weight-bolder">
                        <td>${servidores[i]}</td>
                          
                    `;

                    for(let y = 0; y < json.length; y ++){
                        if(servidores[i] == json[y].nome){
                            tabela.innerHTML +=`
                                <td>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" name="comp" ${json[i].is_ativo == "s" ? "checked" : ""}/>
                                        <label class="form-check-label" for="comp">${json[y].comp}</label>
                                    </div>    
                                </td>
                            </tr>
                                `;
                        }
                    }

                }
            })
        }
    })
}