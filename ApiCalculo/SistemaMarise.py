from datetime import date, datetime
from math import pow
import os
from time import sleep
import psutil
from colorama import Fore, Back, Style
import mysql.connector
import mysql.connector.errorcode

visualizacaoDesejada = 0

conexao = mysql.connector.connect(
        host = "localhost",
        user = "urubu100",
        password = "urubu100",
        port = 3306,
        database = "SistemaMarise"
        )

comando = conexao.cursor()

def MostrarMsgGCT():
    print("=" * 100)
    print(
    """

     ██████╗ ██████╗ ███████╗██╗   ██╗
    ██╔════╝ ██╔══██╗██╔════╝╚██╗ ██╔╝
    ██║  ██╗ ██████╔╝█████╗   ╚████╔╝
    ██║  ╚██╗██╔══██╗██╔══╝    ╚██╔╝
    ╚██████╔╝██║  ██║███████╗   ██║
     ╚═════╝ ╚═╝  ╚═╝╚══════╝   ╚═╝

     █████╗ ██╗      █████╗ ██╗   ██╗██████╗
    ██╔══██╗██║     ██╔══██╗██║   ██║██╔══██╗
    ██║  ╚═╝██║     ██║  ██║██║   ██║██║  ██║
    ██║  ██╗██║     ██║  ██║██║   ██║██║  ██║
    ╚█████╔╝███████╗╚█████╔╝╚██████╔╝██████╔╝
     ╚════╝ ╚══════╝ ╚════╝  ╚═════╝ ╚═════╝

    ████████╗██████╗  █████╗ ███╗  ██╗ ██████╗ █████╗  █████╗ ████████╗██╗ █████╗ ███╗  ██╗ ██████╗
    ╚══██╔══╝██╔══██╗██╔══██╗████╗ ██║██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██║██╔══██╗████╗ ██║██╔════╝
       ██║   ██████╔╝███████║██╔██╗██║╚█████╗ ███████║██║  ╚═╝   ██║   ██║██║  ██║██╔██╗██║╚█████╗ 
       ██║   ██╔══██╗██╔══██║██║╚████║ ╚═══██╗██╔══██║██║  ██╗   ██║   ██║██║  ██║██║╚████║ ╚═══██╗
       ██║   ██║  ██║██║  ██║██║ ╚███║██████╔╝██║  ██║╚█████╔╝   ██║   ██║╚█████╔╝██║ ╚███║██████╔╝
       ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚══╝╚═════╝ ╚═╝  ╚═╝ ╚════╝    ╚═╝   ╚═╝ ╚════╝ ╚═╝  ╚══╝╚═════╝ 
    """
    )
    print("=" * 100)

def clearConsole():
    command = 'clear'
    if os.name in ('nt', 'dos'):  # Caso seja utilizado no Windows
        command = 'cls'
    os.system(command)

def MostrarValoresCPU():
    clearConsole()
    MostrarMsgGCT()
    porcentagemUtilizacaoCPU = psutil.cpu_percent()
    porcentagemUtilizacaoCore = []
    qtdCores = psutil.cpu_count(logical=False)
    qtdThreads = psutil.cpu_count()
    while True:
        clearConsole()

        temposCpu = psutil.cpu_times()
        porcentagemUtilizacaoCore = psutil.cpu_percent(percpu=True)
        porcentagemUtilizacaoCPU = psutil.cpu_percent()
        frequenciaCpu = psutil.cpu_freq()

        
        #conexao.close()

        print('-' * 100)
        print("\n" + "Quantidade de Cores:" + str(qtdCores) + "\nQuantidade Threads: " + str(qtdThreads) + "\n")
        print('-' * 100)

        print((" " * 45) + "Tempos da CPU: \n")
        print("Tempo gasto pelos processos do Usuário (user): " + str(temposCpu.user) + "s" +  "\n"
              + "Tempo gasto pelo sistema (system): " + str(temposCpu.system) + "s" + "\n"
              + "Tempo Ocioso (idle): " + str(temposCpu.idle) + "s" + "\n")


        print('-' * 100 + "\n")     
        print((" " * 35) + "Porcentagem de Utilização da CPU: \n")
        if(porcentagemUtilizacaoCPU > 70):
            print("\n" + "Utilização da Total da CPU:" + Fore.RED+str(porcentagemUtilizacaoCPU) + "%" + Style.RESET_ALL + "\n")
        elif porcentagemUtilizacaoCPU > 50 :
            print("\n" + "Utilização da Total da CPU:" + Fore.YELLOW+str(porcentagemUtilizacaoCPU) + "%" + Style.RESET_ALL + "\n")
        else :
            print("\n" + "Utilização da Total da CPU:" + Fore.GREEN+str(porcentagemUtilizacaoCPU) + "%" + Style.RESET_ALL + "\n")
        
        
        for i in range(len(porcentagemUtilizacaoCore)):
            if(porcentagemUtilizacaoCore[i] > 70):
                print("Thread " + str(i + 1) + ": "+ Fore.RED  + str(porcentagemUtilizacaoCore[i]) + "%" + Style.RESET_ALL)
            elif porcentagemUtilizacaoCore[i] > 50 :
                 print("Thread " + str(i + 1) + ": "+ Fore.YELLOW  + str(porcentagemUtilizacaoCore[i]) + "%" + Style.RESET_ALL)
            else :
                print("Thread " + str(i + 1) + ": "+ Fore.GREEN  + str(porcentagemUtilizacaoCore[i]) + "%" + Style.RESET_ALL)
        
        print("-" * 100)
    
        print((" "*45) + "Frequência da CPU")
        print("Frequência Atual: " + str(round(frequenciaCpu.current, 2)) + "MHz" + "\n"
              + "Frequência Mínima: " + str(frequenciaCpu.min)+ "MHz" + "\n"
              + "Frequência Máxima: " + str(frequenciaCpu.max)+ "MHz" + "\n")
        print("-" * 100)
        

        UtilizacaoCore = "{:.0f}".format(porcentagemUtilizacaoCore[i]); 
        freqCpuMin = "{:.0f}".format(frequenciaCpu.min);


        comando.execute("INSERT INTO Registro(tipoRegistro, valorRegistro, unidadeRegistro) VALUES" 
                        f"('Quantidade de Cores', '{qtdCores}', 'null')," +
                        f"('Quantidade de Threads', '{qtdThreads}', 'null')," +
                        f"('Tempo CPU User','{temposCpu.user}','segundos')," +
                        f"('Tempo CPU System','{temposCpu.system}','segundos')," +
                        f"('Tempo CPU Idle','{temposCpu.idle}','segundos')," +
                        f"('Porcentagem Utilizada Core', '{UtilizacaoCore}', '%')," + 
                        f"('Porcentagem Utilizada CPU', '{porcentagemUtilizacaoCPU}', '%')," + 
                        f"('Frequência CPU', '{frequenciaCpu.current}', 'MHz')," +
                        f"('Freq. CPU Min.','{frequenciaCpu.min}', 'MHz')," +
                        f"('Freq. CPU Max.','{frequenciaCpu.max}', 'MHz')");
        
        # print("No of Record Inserted :", comando.rowcount) 
        #print("Inserted Id :", comando.lastrowid) 
        conexao.commit()  
        
        
        
        print("=" * 100)
        sleep(2)

def MostrarValoresDiscoLocal():

    print('a')
     
    totalDisco = psutil.disk_usage('C:\\').total
    sendoUsado = psutil.disk_usage('C:\\').used
    espacoLivre = psutil.disk_usage('C:\\').free
    porcentagemEmUso = psutil.disk_usage('C:\\').percent

    # byteToMegabyteTotal = (float(totalDisco) / 1024)
    # byteToMegabyteUsando = (float(sendoUsado) / 1024)
    # byteToMegabyteLivre = (float(espacoLivre) / 1024)

    byteToGigabyteTotal = (float(totalDisco) * (1 * pow(10,-9)))
    byteToGigabyteUsando = (float(sendoUsado) * (1 * pow(10,-9)))
    byteToGigabyteLivre = (float(espacoLivre) * (1 * pow(10,-9)))

    # megaByteToGigabyteTotal = byteToMegabyteTotal / 1024
    # megaByteToGigabyteUsando = byteToMegabyteUsando / 1024
    # megaByteToGigabyteLivre = byteToMegabyteLivre / 1024

    # gigaByteToTerabyte = megaByteToGigabyte / 1024

    while True:
        clearConsole()

        MostrarMsgGCT()
    
        formatted_total1 = "{:.2f}".format(byteToGigabyteTotal)
        formatted_total2 = "{:.2f}".format(byteToGigabyteUsando)
        formatted_total3 = "{:.2f}".format(byteToGigabyteLivre)

    # print("\nQuantidade total(GB): " + str(megaByteToGigabyteTotal))
    # print("\nQuantidade em uso(GB): " + str(megaByteToGigabyteUsando))
    # print("\nEm uso: " + str(porcentagemEmUso) + "%" + " (com base no total e na quantidade em uso.)")
    # print("\nQuantidade livre(GB): " + str(megaByteToGigabyteLivre) + "\n")

        print("\nDe bytes para Gigabytes: ")
        print("\nQuantidade total: " + Fore.BLUE + str(formatted_total1) + " GB" + Style.RESET_ALL + "\n")
        print("Quantidade livre: " + Fore.BLUE + str(formatted_total3) + " GB" + Style.RESET_ALL + "\n")
        print("Quantidade em uso: " + Fore.BLUE + str(formatted_total2) + " GB" + Style.RESET_ALL + "\n")
    # print("Em uso: " + str(porcentagemEmUso) + "%" + " (com base no total e na quantidade em uso.)")

        if(porcentagemEmUso > 70):
            print("\n" + "Em uso: " + Fore.RED + str(porcentagemEmUso) + "%" + Style.RESET_ALL + "\n")
        elif porcentagemEmUso > 50 :
            print("\n" + "Em uso: " + Fore.YELLOW + str(porcentagemEmUso) + "%" + Style.RESET_ALL + "\n")
        else :
            print("\n" + "Em uso: " + Fore.GREEN + str(porcentagemEmUso) + "%" + Style.RESET_ALL + "\n")
        
        print('-' * 100)

        print("Informações sem tratamento:\n")
        print(psutil.disk_partitions())
        print('-' * 100)
        print(psutil.disk_usage('C:\\'))


        comando.execute("INSERT INTO Registro(tipoRegistro, valorRegistro, unidadeRegistro) VALUES" 
                        f"('Quantidade total de memória', '{formatted_total1}', 'Gigabytes')," +
                        f"('Quantidade livre de memória', '{formatted_total3}', 'Gigabytes')," +
                        f"('Quantidade de memória em uso','{formatted_total2}','Gigabytes')," +
                        f"('Memória em uso','{porcentagemEmUso}','%')");

        conexao.commit();
        


        print("=" * 100)
        sleep(2)

# Fim das Info Disco Local
def MostrarValoresRAM():

    valoresMemoriaRam = psutil.virtual_memory()
    ramTotal = valoresMemoriaRam.total
    ramDisponivel = valoresMemoriaRam.available
    ramPercentualUtilizado = valoresMemoriaRam.percent
    ramUtilizando = valoresMemoriaRam.used
    ramLivre = valoresMemoriaRam.free

    ramByteToGigabyteTotal = (float(ramTotal) * (1 * pow(10,-9)))
    ramByteToGigabyteUsando = (float(ramUtilizando) * (1 * pow(10,-9)))
    ramByteToGigabyteDisponivel = (float(ramDisponivel) * (1 * pow(10,-9)))
    ramByteToGigabyteLivre = (float(ramLivre) * (1 * pow(10,-9)))

    clearConsole()
    MostrarMsgGCT()

    print("Memória RAM total: " + Fore.BLUE + "{:.2f}".format(ramByteToGigabyteTotal) + " GB" + Style.RESET_ALL + "\n")
    print( "Memória RAM disponível: " + Fore.BLUE + "{:.2f}".format(ramByteToGigabyteDisponivel) + " GB" + Style.RESET_ALL + "\n")
    print( "Memória RAM usado: " + Fore.BLUE + "{:.2f}".format(ramByteToGigabyteUsando) + " GB" + Style.RESET_ALL + "\n")
    print( "Memória RAM livre: " + Fore.BLUE + "{:.2f}".format(ramByteToGigabyteLivre) + " GB" + Style.RESET_ALL + "\n")

    # print( "Memória RAM percentual: " + Fore.BLUE + str(ramPercentualUtilizado) + "%" + Style.RESET_ALL + "\n")

    print('-' * 100)

    if(ramPercentualUtilizado > 70):
            print("\n" + "Em uso: " + Fore.RED + str(ramPercentualUtilizado) + "%" + Style.RESET_ALL + "\n")
    elif ramPercentualUtilizado > 50 :
            print("\n" + "Em uso: " + Fore.YELLOW + str(ramPercentualUtilizado) + "%" + Style.RESET_ALL + "\n")
    else :
            print("\n" + "Em uso: " + Fore.GREEN + str(ramPercentualUtilizado) + "%" + Style.RESET_ALL + "\n")
        
        
    print('-' * 100)
    print(valoresMemoriaRam)


    comando.execute("INSERT INTO Registro(tipoRegistro, valorRegistro, unidadeRegistro) VALUES" 
                        f"('Memória RAM total', '{ramByteToGigabyteTotal}', 'Gigabytes')," +
                        f"('Memória RAM disponível', '{ramByteToGigabyteDisponivel}', 'Gigabytes')," +
                        f"('Memória RAM usado','{ramByteToGigabyteUsando}','Gigabytes')," +
                        f"('Memória RAM livre','{ramByteToGigabyteLivre}','Gigabytes')," +
                        f"('Memória RAM em uso','{ramPercentualUtilizado}','%')");

    conexao.commit();



    print("=" * 100)
    sleep(2)

def MostrarTodosValores():
    while True:
        MostrarValoresCPU()
        MostrarValoresDiscoLocal()
        MostrarValoresRAM()




MostrarMsgGCT()





visualizacaoDesejada = int(input("Qual componente deseja visualizar? (1 = CPU, 2 = Disco Local, 3 = Memória RAM, 4 = Todos)"))
while visualizacaoDesejada != 1 or visualizacaoDesejada != 2 or visualizacaoDesejada != 3 or visualizacaoDesejada != 4:
    if(visualizacaoDesejada == 1 or visualizacaoDesejada == 2 or visualizacaoDesejada == 3 or visualizacaoDesejada == 4):
        clearConsole()
        break
    else :
        visualizacaoDesejada = int(input("Qual componente deseja visualizar? (1 = CPU, 2 = Disco Local, 3 = Memória RAM, 4 = Todos)"))


if visualizacaoDesejada == 1:
    while True:
        MostrarValoresCPU()
elif visualizacaoDesejada == 2:
    while True:
        MostrarValoresDiscoLocal()
elif visualizacaoDesejada == 3:
    while True:
        MostrarValoresRAM()
else:
    MostrarTodosValores()



# print(Fore.RED + 'some red text')
# print(Back.GREEN + 'and with a green background')
# print(Style.DIM + 'and in dim text')
# print(Style.RESET_ALL)
# print('back to normal now')
# dataAgora = datetime.today()
# frequenciaCpuAtual = psutil.cpu_freq()


# while True:
#     print(dataAgora)
#     print((float(frequenciaCpuAtual) / 1000))
#     print("Frequência da CPU atual: " +  + " MHz")
#     print(psutil.cpu_times())
#     print(psutil.disk_partitions())
#     print(psutil.virtual_memory())
#     print(psutil.sensors_temperatures(fahrenheit=False))
#     sleep(2)