

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
                    sessionStorage.EMAIL_USUARIO = json.email;
                    sessionStorage.NOME_USUARIO = json.nome;
                    sessionStorage.ID_USUARIO = json.id;
                    sessionStorage.AQUARIOS = JSON.stringify(json.aquarios)
                    
                    setTimeout(function () {
                        window.location = "./dashboard/cards.html";
                    }, 1000); // apenas para exibir o loading
                    
                });
                
               window.location = "index.html"
               
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