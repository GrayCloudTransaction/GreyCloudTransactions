function entrar() {
  var emailVar = email_input.value;
  var senhaVar = senha_input.value;

  if (emailVar == "" || senhaVar == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Email e/ou senha nulos!",
    });
  } else {
    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailServer: emailVar,
        senhaServer: senhaVar,
      }),
    })
      .then(function (resposta) {
        console.log(resposta);

        if (resposta.ok) {
          resposta.json().then((json) => {
            console.log(json);
            console.log(JSON.stringify(json));
            sessionStorage.ID_USUARIO = json.id_funcionario;
            sessionStorage.EMAIL_USUARIO = json.email;
            sessionStorage.NOME_USUARIO = json.nome;
            sessionStorage.ID_EMPRESA = json.fk_empresa;
            sessionStorage.PERMISSAO = json.permissao;
            
            // Manter Conectado
            // if(!sessionStorage.MANTER_CONECTADO){
            //   if(document.getElementById("remember").checked){
            //     sessionStorage.SENHA_USER = json.senha;
            //     sessionStorage.MANTER_CONECTADO = true;
            //   }else{
            //     sessionStorage.MANTER_CONECTADO = false;
            //   }
            // }
            Swal.fire(
              "Sucesso!",
              "Você será redirecionado em segundos!",
              "success"
            );
  
            if(sessionStorage.PERMISSAO == 1){
              setTimeout(() => {
                window.location =
                  "material-dashboard-master/pages/dashboardGerente.html";
              }, 2000);
            } else{
  
              setTimeout(() => {
                window.location =
                  "material-dashboard-master/pages/dashboardAnalista.html";
              }, 2000);
            }

          });
          
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email e/ou senha incorretos!",
          });

          resposta.text().then((texto) => {
            console.error(texto);
          });
        }
      })
      .catch(function (erro) {
        console.log(erro);
      });

    return false;
  }
}

// function manterConectado(){
//   if(sessionStorage.MANTER_CONECTADO){
//     email_input.value = sessionStorage.EMAIL_USUARIO;
//     senha_input.value = sessionStorage.SENHA_USER;
//     entrar()
//   }
//}