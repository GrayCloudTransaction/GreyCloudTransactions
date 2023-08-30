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

    public String criarLoginSelectFuncionario(){
        return model.criarLoginSelectFuncionario();
    }
}
