import tkinter
from tkinter import *
from time import sleep	
from datetime import date, datetime
import psutil
from psutil import *

class Teste:

    def getDadosCPU():
            
        porcentagemUtilizacaoCPU = psutil.cpu_percent()
        porcentagemUtilizacaoThread = []
        qtdCores = psutil.cpu_count(logical=False)
        qtdThreads = psutil.cpu_count()
        temposCpu = psutil.cpu_times()
        porcentagemUtilizacaoThread = psutil.cpu_percent(percpu=True)
        porcentagemUtilizacaoCPU = psutil.cpu_percent()
        frequenciaCpu = psutil.cpu_freq() 
        

        return [porcentagemUtilizacaoCPU,porcentagemUtilizacaoThread, qtdCores, 
                qtdThreads, temposCpu, frequenciaCpu]

    def getDadosRAM():
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

        return [valoresMemoriaRam, ramPercentualUtilizado, ramByteToGigabyteTotal, 
                ramByteToGigabyteUsando, ramByteToGigabyteDisponivel, ramByteToGigabyteLivre]


    def getDadosHD():
        totalDisco = psutil.disk_usage('C:').total
        sendoUsado = psutil.disk_usage('C:').used
        espacoLivre = psutil.disk_usage('C:').free
        porcentagemEmUso = psutil.disk_usage('C:').percent
        byteToGigabyteTotal = (float(totalDisco) * (1 * pow(10,-9)))
        byteToGigabyteUsando = (float(sendoUsado) * (1 * pow(10,-9)))
        byteToGigabyteLivre = (float(espacoLivre) * (1 * pow(10,-9)))

        return [porcentagemEmUso, byteToGigabyteTotal, byteToGigabyteUsando, byteToGigabyteLivre]

        


    def __init__(self,master=None):
        
    
        root.title('GreyCloudTransaction')
        root.geometry('1500x1000')
        self.widget1 = Frame(root, pady=25)
        
        self.labelCpu = Label(self.widget1, text='CPU', highlightbackground="black", highlightthickness=1, width=49, height=2, bg="gray", foreground="white", font=(14))
        self.labelRAM = Label(self.widget1, text='RAM', highlightbackground="black", highlightthickness=1, width=49, height=2, bg="gray", foreground="white", font=(14))
        self.labelHD = Label(self.widget1, text='HD', highlightbackground="black", highlightthickness=1, width=49, height=2, bg="gray", foreground="white", font=(14))

        self.labelCpu.grid(row=0, column=0)
        self.labelRAM.grid(row=0, column=1)
        self.labelHD.grid(row=0, column=2)

        self.labelQntdCoresThreads = Label(self.widget1, text= "inserirValor", highlightbackground="black", highlightcolor="black", highlightthickness=1, width=49, font=(12), height=6)
        self.labelQntdCoresThreads.grid(row=1, column=0)

        self.labelTituloTemposCpu = Label(self.widget1, text='TEMPOS DA CPU', highlightbackground="black", highlightthickness=1, width=49, font=(14), height=2, bg="gray", foreground="white")
        self.labelTituloTemposCpu.grid(row=2, column=0)

        self.labelTemposCpu = Label(self.widget1, text="InsirirValor", highlightbackground="black", highlightcolor="black", highlightthickness=1, width=49, font=(12), height=6)
        self.labelTemposCpu.grid(row=3, column=0)

        # self.labelTituloPercentUtilizacaoCpu = Label(self.widget1, text='UTILIZACAO DA CPU', highlightbackground="black", highlightthickness=1, width=49, font=(14), height=2, bg="gray", foreground="white")
        # self.labelTituloPercentUtilizacaoCpu.grid(row=4, column=0)

        # self.labelPercentUtilizacaoCpu = Label(self.widget1, text="inserirValor", highlightbackground="black", highlightcolor="black", highlightthickness=1, width=49, font=(12))
        # self.labelPercentUtilizacaoCpu.grid(row=5, column=0)

        self.labelTituloPercentUtilizacaoThread = Label(self.widget1, text='UTILIZACAO DAS THREADS', highlightbackground="black", highlightthickness=1, width=49, font=(14), height=2, bg="gray", foreground="white")
        self.labelTituloPercentUtilizacaoThread.grid(row=6, column=0)

        self.labelPercentUtilizacaoThread = Label(self.widget1, highlightbackground="black", highlightcolor="black", highlightthickness=1, width=49, font=(12))
        self.labelPercentUtilizacaoThread.grid(row=7, column=0)

        

        self.labelTituloFrenquenciaCpu = Label(self.widget1, text='FREQUENCIA DA CPU', highlightbackground="black", highlightthickness=1, width=49, font=(14), height=2, bg="gray", foreground="white")
        self.labelTituloFrenquenciaCpu.grid(row=8, column=0)

        self.labelFrequenciaCpu = Label(self.widget1, text="inserirDados", highlightbackground="black", highlightcolor="black", highlightthickness=1, width=49, font=(12))
        self.labelFrequenciaCpu.grid(row=9, column=0)

        self.labelPorcentagemRAM = Label(self.widget1, text="inserirValor", highlightbackground="black", highlightcolor="black", highlightthickness=1, width=49, font=(12), height=6)
        self.labelPorcentagemRAM.grid(row=1, column=1)

        self.labelTituloQuantidadeRAM = Label(self.widget1, text='QUANTIDADE MEMÓRIA RAM', highlightbackground="black", highlightthickness=1, width=49, font=(14), height=2, bg="gray", foreground="white")
        self.labelTituloQuantidadeRAM.grid(row=2, column=1)        

        self.labelQuantidadeRAM = Label(self.widget1, text="inserirDados", highlightbackground="black", highlightcolor="black", highlightthickness=1, width=49, font=(12))
        self.labelQuantidadeRAM.grid(row=3, column=1)

        self.labelPorcentagemHD = Label(self.widget1, text="InserirDados", highlightbackground="black", highlightcolor="black", highlightthickness=1, width=49, font=(12), height=6)
        self.labelPorcentagemHD.grid(row=1, column=2)

        self.labelTituloQuantidadeHD = Label(self.widget1, text='MEMÓRIA DO DISCO RÍGIDO', highlightbackground="black", highlightthickness=1, width=49, font=(14), height=2, bg="gray", foreground="white")
        self.labelTituloQuantidadeHD.grid(row=2, column=2)

        self.labelQuantidadeHD = Label(self.widget1, text="inserirDados", highlightbackground="black", highlightcolor="black", highlightthickness=1, width=49, font=(12), height=6)
        self.labelQuantidadeHD.grid(row=3, column=2)

        while True:
            
            sleep(2)  

            self.labelQntdCoresThreads["text"] = f"""
            Uso da CPU: {Teste.getDadosCPU()[0]} 
            Quantidade de Cores: {Teste.getDadosCPU()[2]} 
            Quantidade de Threads: {Teste.getDadosCPU()[3]}
            """
    
            self.labelTemposCpu["text"] = f"""
            Processos do Usuário (user): {"{:.2f}".format(Teste.getDadosCPU()[4].user)} s
            Processos do Sistema (system): {"{:.2f}".format(Teste.getDadosCPU()[4].system)} s
            Tempo Ocioso (idle): {"{:.2f}".format(Teste.getDadosCPU()[4].idle)} s  
            """

            self.labelPercentUtilizacaoThread['text'] = ''
            for i in range(len(Teste.getDadosCPU()[1])):
                  text = self.labelPercentUtilizacaoThread.cget("text") + f"\n Thread {i + 1}: {Teste.getDadosCPU()[1][i]} %"
                  self.labelPercentUtilizacaoThread.configure(text=text)

            

            self.labelFrequenciaCpu["text"] = f"""
                Frequência Atual: {Teste.getDadosCPU()[5].current} MHz
                Frequência Máxima: {Teste.getDadosCPU()[5].max} MHz
                Frequência Mínima: {Teste.getDadosCPU()[5].min} MHz
                """
            
            self.labelPorcentagemRAM["text"] = f"""
            Uso da RAM: {Teste.getDadosCPU()[2]} %
            """

            self.labelQuantidadeRAM["text"] = f"""
                Quantidade Total de Memória: {"{:.2f}".format(Teste.getDadosRAM()[2])} GB
                Quantidade Usada de Memória: {"{:.2f}".format(Teste.getDadosRAM()[3])} GB
                Quantidade Disponível de Memória: {"{:.2f}".format(Teste.getDadosRAM()[4])} GB
                Quantidade Livre de Memória: {"{:.2f}".format(Teste.getDadosRAM()[5])} GB
                """
            
            self.labelQuantidadeHD["text"] = f"""
            Quantidade Total de Disco Rígido: {"{:.2f}".format(Teste.getDadosHD()[1])} GB
            Quantidade Em Uso do Disco Rígido: {"{:.2f}".format(Teste.getDadosHD()[2])} GB
            Quantidade Livre de Disco Rígido: {"{:.2f}".format(Teste.getDadosHD()[3])} GB
            """

            self.labelPorcentagemHD["text"] =f"""
                Uso do HD: {Teste.getDadosHD()[0]} %
                """
            # self.labelPercentUsoHD["text"] =f"""
            #     Uso do HD: {Teste.getDadosHD()[0]} %
            #     """
            self.widget1.grid()

            root.update()
            
            
root = Tk()
teste = Teste(root)
root.mainloop()