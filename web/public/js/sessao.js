// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    if (email == undefined && nome == undefined) {
        // Swal.fire({
        //     icon: 'error',
        //     title: 'Oops...',
        //     text: `Faça login para acessar essa área do site`
        //   })
        console.log("Faça login")
        alert("Faça login")
        window.location = "../../login.html";
    } 
}

function limparSessao() {
    sessionStorage.clear();
    //window.location = "../../index.html";
}