package school.sptech;

import com.mysql.cj.jdbc.MysqlDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

public class Conexao {
    private JdbcTemplate conexaoDoBanco;

    public Conexao() {
        MysqlDataSource dataSource = new MysqlDataSource();

        dataSource.setDatabaseName("ScriptGCT");
        dataSource.setUser("aluno");
        dataSource.setPassword("sptech");

        this.conexaoDoBanco = new JdbcTemplate(dataSource);
    }

    public JdbcTemplate getConexaoDoBanco() {
        return conexaoDoBanco;
    }
}
