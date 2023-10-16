// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var permissao = sessionStorage.PERMISSAO;
    if (email == undefined && nome == undefined) {
        // Swal.fire({
        //     icon: 'error',
        //     title: 'Oops...',
        //     text: `Faça login para acessar essa área do site`
        //   })
        console.log("Faça login");
        alert("Faça login");
        window.location = "../../login.html";
    } else {
        if (permissao == 1) {
            link_dashboard.href = "../pages/dashboardGerente.html";
        } else {
            
            link_dashboard.style.display = "none";
        }
    }
}

function limparSessao() {
    
    // Manter conectado 
    if(sessionStorage.MANTER_CONECTADO){
        window.location = "../../index.html";
    } else {
        sessionStorage.clear();
    }
}
