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
            sessionStorage.ID_USUARIO = json.idFuncionario;
            sessionStorage.EMAIL_USUARIO = json.Email;
            sessionStorage.NOME_USUARIO = json.Nome;
            sessionStorage.ID_EMPRESA = json.fkEmpresa;
            sessionStorage.PERMISSAO = json.Permissao;
          });
          Swal.fire(
            "Sucesso!",
            "Você será redirecionado em segundos!",
            "success"
          );

          // if(sessionStorage.PERMISSAO == 1){
          setTimeout((x) => {
            window.location =
              "material-dashboard-master/pages/dashboardCliente.html";
          }, 2000);
          // } else{
          // }

          setTimeout((y) => {
            window.location =
              "material-dashboard-master/pages/dashboardAnalista.html";
          }, 2000);
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
