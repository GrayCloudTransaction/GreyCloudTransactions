
function login() {

    sessionStorage.ID_USUARIO = 0;


    var emailVar = email.value;
    var senhaVar = password.value;


    if (emailVar =="" || senhaVar =="") {
        if (emailVar == "") {
           
            email.style = 'border-color: red';
            //vEmail.style.display = 'block'
        }
        if (senhaVar == "") {
            
            password.style = 'border-color: red';
            //vSenha.style.display = 'block'
        }
    } else  { 
        console.log("FORM LOGIN: ", emailVar);
        console.log("FORM SENHA: ", senhaVar);

        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: emailVar,
                passwordServer: senhaVar
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")
            console.log(resposta)

            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));

                    sessionStorage.EMAIL_USUARIO = json.email;
                    sessionStorage.ID_USUARIO = json.idPersona;
                    console.log("idPersona " + json.idPersona)


                    // Tela personalizada conforme o usuário 
                    
                    switch (json.idPersona) {
                        case 100:
                            window.location = 'simulador.html'
                            break;
                        case  101:
                            window.location = 'dashboard2.html'
                        default:
                            window.location = "index.html"
                            break;
                    }
                });

            } else {

                console.log("Houve um erro ao tentar realizar o login!");
                alert("Houve um erro ao tentar realizar o login!");

                
            }

        }).catch(function (erro) {
            console.log(erro);
        })

        return false;
    }
}

