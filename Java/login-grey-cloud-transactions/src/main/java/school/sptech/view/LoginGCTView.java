package school.sptech.view;

import school.sptech.controler.LoginGCTController;

import java.util.Scanner;

public class LoginGCTView {
    public static void start(){
        criacao();
    }

    private static void criacao() {
        String mensagem = """
                    Bem vindo ao Grey Cloud Transactions!!
                    
                    REALIZE O SEU LOGIN PARA CONTINUAR!
                    """;

        String msglogin = """
                    Informe o seu EMAIL de login:""";

        String msgsenha = """
                    Informe a senha:""";

        System.out.println(mensagem);

        System.out.println(msglogin);

        Scanner leitor = new Scanner(System.in);

        String email = leitor.next();

        System.out.println(msgsenha);

        String senha = leitor.next();

        LoginGCTController controller = new LoginGCTController(email,senha);

        System.out.println(controller.criarLoginSelectFuncionario());
    }
}
