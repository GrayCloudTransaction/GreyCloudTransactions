package school.sptech.model;

import school.sptech.engine.MySQLConectionEngine;

import java.sql.ResultSet;
import java.sql.SQLException;

public class LoginGCTModel {
    private String email;
    private String senha;

    public LoginGCTModel(String email, String senha){
        this.email = email;
        this.senha = senha;
    }
    public String getEmail() {
        return email;
    }
    public String getSenha() {
        return senha;
    }

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
                return nome;
            }catch (SQLException e){
                MySQLConectionEngine.shared.fecharConexao();
                return "Esta coluna não existe.";
            }
        }
    }

}
