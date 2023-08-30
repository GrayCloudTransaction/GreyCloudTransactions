package school.sptech.model;

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
}
