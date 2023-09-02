import tkinter
from tkinter import *
from tkinter import ttk
import psutil
from psutil import *
from time import sleep
import colorama
from colorama import *
from datetime import date, datetime

taxaAtt = 2;
def atualizarTaxaAtt(args):
  if(args == '2 SEGUNDOS') :
    taxaAtt = 2
  elif(args == '5 SEGUNDOS') :
    taxaAtt = 5
  elif(args == '7 SEGUNDOS') :
    taxaAtt = 7
  elif(args == '9 SEGUNDOS') :
    taxaAtt = 9
  print(taxaAtt)

class MinhaGUI:
 def __init__(self):
  global taxaAtt
  #CPU
  porcentagemUtilizacaoCPU = psutil.cpu_percent()
  porcentagemUtilizacaoThread = []
  qtdCores = psutil.cpu_count(logical=False)
  qtdThreads = psutil.cpu_count()
  temposCpu = psutil.cpu_times()
  porcentagemUtilizacaoThread = psutil.cpu_percent(percpu=True)
  porcentagemUtilizacaoCPU = psutil.cpu_percent()
  frequenciaCpu = psutil.cpu_freq()  

  #RAM
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

  #HD
  totalDisco = psutil.disk_usage('C:').total
  sendoUsado = psutil.disk_usage('C:').used
  espacoLivre = psutil.disk_usage('C:').free
  porcentagemEmUso = psutil.disk_usage('C:').percent
  byteToGigabyteTotal = (float(totalDisco) * (1 * pow(10,-9)))
  byteToGigabyteUsando = (float(sendoUsado) * (1 * pow(10,-9)))
  byteToGigabyteLivre = (float(espacoLivre) * (1 * pow(10,-9)))
  formatted_total1 = "{:.2f}".format(byteToGigabyteTotal)
  formatted_total2 = "{:.2f}".format(byteToGigabyteUsando)
  formatted_total3 = "{:.2f}".format(byteToGigabyteLivre)

  # Criando a janela principal
  self.janela_principal = Tk(className='GreyCloudTransactions')
  self.janela_principal.geometry('1500x1000')
  
  # Criando os frames
  self.frame_cima = Frame(self.janela_principal, pady=25)
  
  # Criando os labels
  self.label1 = Label(self.frame_cima, text='CPU', highlightbackground="black", highlightthickness=1, width=49, height=2, bg="gray", foreground="white", font=(14))
  self.label2 = Label(self.frame_cima, text='RAM', highlightbackground="black", highlightthickness=1, width=49, height=2, bg="gray", foreground="white", font=(14))
  self.label3 = Label(self.frame_cima, text='HD', highlightbackground="black", highlightthickness=1, width=49, height=2, bg="gray", foreground="white", font=(14))
  
  self.label1.grid(row=0, column=0)
  self.label2.grid(row=0, column=1)
  self.label3.grid(row=0, column=2)

  self.labelQntdCoresThreads = Label(self.frame_cima, text=f"""
  Quantidade de Cores: {psutil.cpu_count(logical=False)}
  Quantidade de Threads: {psutil.cpu_count(logical=True)}
    """, highlightbackground="black", highlightcolor="black", highlightthickness=1, width=49, font=(12), height=6)
  self.labelQntdCoresThreads.grid(row=1, column=0)

  self.labelTituloTemposCpu = Label(self.frame_cima, text='TEMPOS DA CPU', highlightbackground="black", highlightthickness=1, width=49, font=(14), height=2, bg="gray", foreground="white")
  self.labelTituloTemposCpu.grid(row=2, column=0)

  self.labelTemposCpu = Label(self.frame_cima, text=f"""
  Tempo gasto pelos processos do Usuário (user): {temposCpu.user}s
  Tempo gasto pelo sistema (system): {temposCpu.system}s
  Tempo Ocioso (idle): {temposCpu.idle}s  
  """, highlightbackground="black", highlightcolor="black", highlightthickness=1, width=49, font=(12), height=6)
  self.labelTemposCpu.grid(row=3, column=0)

  self.labelTituloPercentUtilizacaoCpu = Label(self.frame_cima, text='UTILIZACAO DA CPU', highlightbackground="black", highlightthickness=1, width=49, font=(14), height=2, bg="gray", foreground="white")
  self.labelTituloPercentUtilizacaoCpu.grid(row=4, column=0)

  self.labelPercentUtilizacaoCpu = Label(self.frame_cima, text=f"""
  Utilização Total da CPU: {porcentagemUtilizacaoCPU}
  """, highlightbackground="black", highlightcolor="black", highlightthickness=1, width=49, font=(12))
  self.labelPercentUtilizacaoCpu.grid(row=5, column=0)

  self.labelTituloPercentUtilizacaoThread = Label(self.frame_cima, text='UTILIZACAO DAS THREADS', highlightbackground="black", highlightthickness=1, width=49, font=(14), height=2, bg="gray", foreground="white")
  self.labelTituloPercentUtilizacaoThread.grid(row=6, column=0)

  self.labelPercentUtilizacaoThread = Label(self.frame_cima, highlightbackground="black", highlightcolor="black", highlightthickness=1, width=49, font=(12))
  self.labelPercentUtilizacaoThread.grid(row=7, column=0)
  for i in range(len(porcentagemUtilizacaoThread)):
    text = self.labelPercentUtilizacaoThread.cget("text") + f"\n Thread {i + 1}: {porcentagemUtilizacaoThread[i]} %"
    self.labelPercentUtilizacaoThread.configure(text=text)

  self.labelTituloFrenquenciaCpu = Label(self.frame_cima, text='FREQUENCIA DA CPU', highlightbackground="black", highlightthickness=1, width=49, font=(14), height=2, bg="gray", foreground="white")
  self.labelTituloFrenquenciaCpu.grid(row=8, column=0)

  self.labelFrequenciaCpu = Label(self.frame_cima, text=f"""
  Frequência Atual: {frequenciaCpu.current} MHz
  Frequência Máxima: {frequenciaCpu.max} MHz
  Frequência Mínima: {frequenciaCpu.min} MHz
  """, highlightbackground="black", highlightcolor="black", highlightthickness=1, width=49, font=(12))
  self.labelFrequenciaCpu.grid(row=9, column=0)

  self.labelQuantidadeMemoriaMinMax = Label(self.frame_cima, text=f"""
  Quantidade Total de Memória: {"{:.2f}".format(ramByteToGigabyteTotal)} GB
  Quantidade Disponível de Memória: {"{:.2f}".format(ramByteToGigabyteDisponivel)} GB
  Quantidade Usada de Memória: {"{:.2f}".format(ramByteToGigabyteUsando)} GB
  Quantidade Livre de Memória: {"{:.2f}".format(ramByteToGigabyteLivre)} GB
  """, highlightbackground="black", highlightcolor="black", highlightthickness=1, width=49, font=(12))
  self.labelQuantidadeMemoriaMinMax.grid(row=1, column=1)

  self.labelQuantidadeHD = Label(self.frame_cima, text=f"""
  Quantidade Total de Disco Rígido: {formatted_total1} GB
  Quantidade Livre de Disco Rígido: {formatted_total3} GB
  Quantidade Em Uso do Disco Rígido: {formatted_total2} GB
  """, highlightbackground="black", highlightcolor="black", highlightthickness=1, width=49, font=(12), height=6)
  self.labelQuantidadeHD.grid(row=1, column=2)

  self.labelTituloPercentUsoHD = Label(self.frame_cima, text='PORCENTAGEM DE USO DO DISCO RÍGIDO', highlightbackground="black", highlightthickness=1, width=49, font=(14), height=2, bg="gray", foreground="white")
  self.labelTituloPercentUsoHD.grid(row=2, column=2)

  self.labelPercentUsoHD = Label(self.frame_cima, text=f"""
  Uso do HD: {porcentagemEmUso} %
  """, highlightbackground="black", highlightcolor="black", highlightthickness=1, width=49, font=(12), height=6)
  self.labelPercentUsoHD.grid(row=3, column=2)


  self.n = StringVar()
  self.tempoColeta = ttk.Combobox(self.frame_cima, width=27, textvariable= self.n)

  self.tempoColeta['values'] = ('2 SEGUNDOS',
                               '5 SEGUNDOS',
                               '7 SEGUNDOS',
                               '9 SEGUNDOS')
  self.tempoColeta.grid(row=11, column=1)
  self.tempoColeta.current(0)

  self.tempoColeta.bind("<<ComboboxSelected>>", lambda e: atualizarTaxaAtt(self.tempoColeta.get()))
    
  self.labelTempoColeta = Label(self.frame_cima, text="Tempo de Coleta de dados", font=(12), pady=10)
  self.labelTempoColeta.grid(row=10, column=1)
  # Posicionando o frame
  self.frame_cima.pack()

  # Fazer o Tkinter exibir o looping da janela
  mainloop()

minha_gui = MinhaGUI()