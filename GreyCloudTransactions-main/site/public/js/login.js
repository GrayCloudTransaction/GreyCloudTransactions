

function entrar() {

    
    var emailVar = email_input.value;
    var senhaVar = senha_input.value;

    if (emailVar == "" || senhaVar == "") {
        return false;
    }
    else {
        
        
        console.log("FORM LOGIN: ", emailVar);
        console.log("FORM SENHA: ", senhaVar);
        
        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: emailVar,
                senhaServer: senhaVar
            })
        }).then(function (resposta) {
            alert("ESTOU NO THEN DO entrar()!")
            console.log(resposta);
            
            
            if (resposta.ok) {
                
                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));
                    sessionStorage.ID_USUARIO = json.idFuncionario;     
                    sessionStorage.EMAIL_USUARIO = json.Email;
                    sessionStorage.NOME_USUARIO = json.Nome;
                    sessionStorage.ID_EMPRESA = json.fkEmpresa;
                    sessionStorage.PERMISSAO = json.Permissao;
                });
                
                // if(sessionStorage.PERMISSAO == 1){
                    window.location = "material-dashboard-master/pages/dashboardCliente.html"
                // } else{
                    // }
                    
                    window.location = "material-dashboard-master/pages/dashboardAnalista.html"
                
                
            } else {
                
                alert("Houve um erro ao tentar realizar o login!");
                
                resposta.text().then(texto => {
                    console.error(texto);
                });
            }
            
        }).catch(function (erro) {
            console.log(erro);
        })
        
        return false;
    }
}