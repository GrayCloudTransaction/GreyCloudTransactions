package school.sptech;

import com.github.britooo.looca.api.group.rede.RedeInterface;
import com.github.britooo.looca.api.core.Looca;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class Main {

    public static void main(String[] args) {
     JdbcTemplate con;
     Conexao conexao = new Conexao();;

        Looca looca = new Looca();

        con = conexao.getConexaoDoBanco();

        List<Looca> selects = con.query("SELECT * FROM interfaces", new BeanPropertyRowMapper<>(Looca.class));

        con.execute("DROP TABLE IF EXISTS interfaces");
        String query = "CREATE TABLE IF NOT EXISTS `interfaces`(\n" +
                "`interfaces` VARCHAR(100),\n" +
                "`id_interface` INT PRIMARY KEY AUTO_INCREMENT\n"+
                ");";
        con.execute(query);

        List<RedeInterface> listaInterface = looca.getRede().getGrupoDeInterfaces().getInterfaces();
        for (RedeInterface rede : listaInterface) {
            System.out.println(rede.getNome());

            con.update("INSERT INTO interfaces (interfaces) VALUES (?)", rede.getNome());
        }
    }
}
