package school.sptech.model;

import school.sptech.engine.MySQLConectionEngine;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
// Esta classe é a classe Model, ela deve funcionar para armazenar os dados recebidos pelo banco
// para utilizá-los ao decorrer da aplicação
public class LoginGCTModel {

//    Criação dos atributos da classe LoginGCTModel
//    ATRIBUTOS DEVEM SER PRIVATE.
    private String email;
    private String senha;

//  Construtor de instâncias recebendo como parâmetro duas Strings.
//  Será utilizado para criação de instâncias (Objetos) da classe Model.
    public LoginGCTModel(String email, String senha){
        this.email = email;
        this.senha = senha;
    }

//    Getters dos atributos privados tipo String Email e Senha.
    public String getEmail() {
        return email;
    }
    public String getSenha() {
        return senha;
    }

//    NÃO É O IDEAL ESTE MÉTODO ESTAR AQUI, ELE DEVERIA IR PARA A ENGINE
//    Método que criará a query de Select para ser executada na Engine (Services).
    public String criarLoginSelectFuncionario(){
        String query = "SELECT Nome FROM Funcionario WHERE Email = '%s' AND Senha = '%s'".formatted( getEmail(), getSenha());

        ResultSet retorno = MySQLConectionEngine.shared.criarQuery(query);

        if (retorno == null){
            return "Retornou NULO";
        } else {
            try {
                String nome = null;
                if(retorno.next()){
                    nome = retorno.getString("Nome");
                }
                MySQLConectionEngine.shared.fecharConexao();
                try {

                    ProcessBuilder builder = new ProcessBuilder("cmd.exe", "/c", "start C:\\Faculdade\\GreyCloudTransactions\\ApiCalculo\\dist/SistemaMarise.exe");

                    Process process = builder.start();

                } catch (IOException e) {
                    e.printStackTrace();
                }
                return nome;
            }catch (SQLException e){
                MySQLConectionEngine.shared.fecharConexao();
                return "Esta coluna não existe.";
            }
        }
    }

}
