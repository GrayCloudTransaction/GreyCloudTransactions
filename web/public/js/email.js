function enviarEmail(){
    var email = email_input.value
    var nome = name_input.value
    var assunto = subject_input.value
    var mensagem = mensagem_input.value

    carregando.style.display = "block"

    fetch("/email/enviar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailServer: email,
          nomeServer: nome,
          assuntoServer: assunto,
          mensagemServer: mensagem
        }),
      }).then(function (resposta) {
        console.log("resposta: ", resposta);
  
        if (resposta.ok) {
            carregando.style.display = "none"
            enviada.style.display = "block"
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });
}