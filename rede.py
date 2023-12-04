import speedtest
import mysql.connector
from mysql.connector import errorcode

st = speedtest.Speedtest()
conexao_ok = True
interface = 'eth0'

try:
    db_connection = mysql.connector.connect(host='localhost', user='aluno', password='sptech', database='ScriptGCT')
    cursor = db_connection.cursor()
    print("Conexao feita!")

    numero_leituras = 0

    def insert(rede_vel_download, rede_vel_upload, ping, fkInterfaces):
        sql_insert = f"INSERT INTO rede (vel_download, vel_upload, ping, fkInterfaces) VALUES ({rede_vel_download},{rede_vel_upload},{ping},{fkInterfaces})"
        cursor.execute(sql_insert)
        db_connection.commit()

    def select():
        sql_select = f"SELECT (id_interface) FROM interfaces WHERE interfaces = 'eth0'"
        cursor.execute(sql_select)
        resultado = cursor.fetchall()
        return resultado[0] if resultado else None

    while conexao_ok:
        rede_vel_download = st.download() / 10**6
        rede_vel_upload = st.upload() / 10**6
        ping = st.results.ping
        
        fkInterface = select()[0]
        insert(rede_vel_download, rede_vel_upload, ping, fkInterface)
        
        print(f'  |Velocidade de download: {rede_vel_download:.2f} Mbps|')
        print(f'  |Velocidade de upload: {rede_vel_upload:.2f} Mbps|')
        print(f'  |Ping: {ping:.2f}|')
        print("----------------------------------------")


except mysql.connector.Error as error:
    if error.errno == errorcode.ER_BAD_DB_ERROR:
        print("Database nao existe")
        conexao_ok = False
    elif error.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("User name ou password esta errado")
        conexao_ok = False
    else:
        print(error)
finally:
    if 'db_connection' in locals() and db_connection.is_connected():
        cursor.close()
        db_connection.close()
