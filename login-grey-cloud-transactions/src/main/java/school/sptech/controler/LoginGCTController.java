package school.sptech.controler;

import school.sptech.engine.MySQLConectionEngine;
import school.sptech.model.LoginGCTModel;

import java.sql.ResultSet;
import java.sql.SQLException;

// Esta classe faz o controle, direcionando para onde irão os dados.
public class LoginGCTController {

//     ATRIBUTO TIPO LoginGCTModel
    private LoginGCTModel model;

// Construtor da classe recebendo paremetros e os utilizando para criar uma instancia do tipo Model
    public LoginGCTController(String email, String senha){
        model = new LoginGCTModel(email, senha);
    }

//    Método para direcionar os dados para a execução e dados da query SELECT
    public String criarLoginSelectFuncionario(){
        return model.criarLoginSelectFuncionario();
    }
}
