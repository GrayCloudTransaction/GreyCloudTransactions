package school.sptech.controler;

import school.sptech.engine.MySQLConectionEngine;
import school.sptech.model.LoginGCTModel;

import java.sql.ResultSet;
import java.sql.SQLException;

public class LoginGCTController {

    private LoginGCTModel model;

    public LoginGCTController(String email, String senha){
        model = new LoginGCTModel(email, senha);
    }

    public void criarLoginSelectFuncionario(){
        String query = "SELECT Nome FROM Funcionario WHERE Email = '%s' AND Senha = '%s'".formatted(model.getEmail(), model.getSenha());

        ResultSet retorno = MySQLConectionEngine.shared.criarQuery(query);

        if (retorno == null){
            System.out.println("Retornou NULO");
        } else {
            try {
                String nome = null;
                if(retorno.next()){
                    nome = retorno.getString("Nome");
                }
                System.out.println(nome);
            }catch (SQLException e){
                System.out.println("Esta coluna não existe.");
            }
            MySQLConectionEngine.shared.fecharConexao();
        }
    }
}
