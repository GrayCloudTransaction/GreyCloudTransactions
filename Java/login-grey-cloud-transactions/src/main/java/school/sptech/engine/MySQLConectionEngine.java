package school.sptech.engine;

import school.sptech.model.LoginGCTModel;

import java.sql.*;

public class MySQLConectionEngine {

    private Connection connection;

    private  String status = "Não conectou...";
    private MySQLConectionEngine() {

    }
    public static MySQLConectionEngine shared = new MySQLConectionEngine();
    public String statusConection() {
        return status;
    }

    public ResultSet criarQuery(String query){
        Connection connection = getMySQLConectionEngine();

        try {
            Statement st = connection.createStatement();
            ResultSet rt = st.executeQuery(query);
            return rt;
        }catch (SQLException e){
            System.out.println(e.getSQLState());
            fecharConexao();
        }
        return null;
    }

    private Connection getMySQLConectionEngine() {
        this.connection = null;

        try {
            String driverName = "com.mysql.cj.jdbc.Driver";
            Class.forName(driverName);
            String serverName = "localhost";
            String mydatabase = "ScriptGCT" ;
            String username = "aluno";
            String password = "sptech";
            String url = "jdbc:mysql://" + serverName + "/" + mydatabase;

            this.connection = DriverManager.getConnection(url, username, password);

            if (this.connection != null) {
                status = ("STATUS--->Conectado com sucesso!");

            } else {
                status = ("STATUS--->Não foi possivel realizar conexão");

            }
            System.out.println(statusConection());
            return this.connection;
        } catch (ClassNotFoundException e) {
            System.out.println("O driver expecificado nao foi encontrado.");
            return null;

        } catch (SQLException e) {
            System.out.println("Nao foi possivel conectar ao Banco de Dados.");
            return null;

        }
    }
    public void fecharConexao() {
        try {
            if(connection!=null) {
                connection.close();
            }
        } catch (SQLException e) {
            System.out.println("Algum erro ao fechar conexão");
        }
    }
}
