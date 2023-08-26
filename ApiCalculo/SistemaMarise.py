from datetime import date, datetime
import math
import os
from time import sleep
import psutil
from colorama import Fore, Back, Style
import mysql.connector
import mysql.connector.errorcode

visualizacaoDesejada = 0


def MostrarMsgGCT():
    print("=" * 100)
    print(
    """

     ██████╗ ██████╗  █████╗ ██╗   ██╗
    ██╔════╝ ██╔══██╗██╔══██╗╚██╗ ██╔╝
    ██║  ██╗ ██████╔╝███████║ ╚████╔╝ 
    ██║  ╚██╗██╔══██╗██╔══██║  ╚██╔╝  
    ╚██████╔╝██║  ██║██║  ██║   ██║   
     ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   

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

        print('-' * 100)
        print("\n" + "Quantidade de Cores:" + str(qtdCores) + " Quantidade Threads: " + str(qtdThreads) + "\n")
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
        
        
        
        
        print("=" * 100)
        sleep(2)

def MostrarValoresDiscoLocal():

    print('a')
    # byteToMegabyte = (float(psutil.disk_usage('/').total) / 1024)
    # megaByteToGigabyte = byteToMegabyte / 1024
    # gigaByteToTerabyte = megaByteToGigabyte / 1024
    # clearConsole()
    # MostrarMsgGCT()
    # print(psutil.disk_partitions())
    # print(megaByteToGigabyte)

def MostrarValoresRAM():

    valoresMemoriaRam = psutil.virtual_memory()

    clearConsole()
    print("Memória RAM total: " + str(valoresMemoriaRam.total) + "\n"
          + "Memória RAM disponível: ")
    print('b')

def MostrarTodosValores():
    while True:
        MostrarValoresCPU()
        MostrarValoresDiscoLocal()
        MostrarValoresRAM()




MostrarMsgGCT()

conexao = mysql.connector.connect(
    host = "localhost",
    user = "urubu100",
    password = "urubu100",
    port = 3306,
    database = "ScriptGCT"
)

comando = conexao.cursor()

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