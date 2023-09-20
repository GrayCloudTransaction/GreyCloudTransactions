package school.sptech.engine;

import school.sptech.model.LoginGCTModel;

import java.sql.*;

// Criação da classe/tipo MySQLConectionEngine (Funciona como o Database.js da Web-data-viz)
public class MySQLConectionEngine {

//    Atributos idealmente devem ser Private.
    private Connection connection;
    private  String status = "Não conectou...";

//    Criação do Construtor, lembrando que sempre tem o mesmo nome da Classe.
//    Construtor privado, pois não queremos que instâncias sejam criadas fora da classe.
    private MySQLConectionEngine() {

    }

//    Instânciando o objeto shared, unico objeto de conexão.
//    QUALQUER MÉTODO PÚBLICO DEVE VIR ACIMA DE MÉTODOS PRIVADOS

    public static MySQLConectionEngine shared = new MySQLConectionEngine();
    public String statusConection() {
        return status;
    }

//    Método public do tipo ResultSet, significa que retornará também um tipo ResultSet
//    Método resposável por executar as Querys do banco de dados.
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


//    Método privado do tipo Connection, significa que retornará também um tipo Connection
//    Criação da conexão com o banco de dados
    private Connection getMySQLConectionEngine() {
        this.connection = null;

        try {
            String driverName = "com.mysql.cj.jdbc.Driver";
            Class.forName(driverName);
            String serverName = "localhost";
            String mydatabase = "ScriptGCT" ;
            String username = "urubu100";
            String password = "urubu100";
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

//    Método void, sem retorno.
//    Este método irá fechar a conexão
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
