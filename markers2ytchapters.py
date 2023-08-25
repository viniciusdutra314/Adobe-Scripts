from csv import reader
def timeconverter(string: str): 
    #remove hours if necessary
    if (string[0:2]=="00"):
        string=string[3:]
    #remove milisseconds
    return string[:-3]
print('''\t ------------------------------------------
      Os arquivos .csv do premiere são muito estranhos
      Primeiro abra no excel/libreoffice e salve ele
      Desse jeito ele estara no formato correto
      ---------------------------------------------''')
filename=input("Nome do arquivo (sem a extensão .csv):")
with open(filename+'.csv',newline='',encoding='utf-16') as csvfile:
    data=[j for j in reader(csvfile)]
    tempos=[timeconverter(j[2]) for j in data][1:]
    descricoes=[j[1].replace("\n","") for j in data][1:]
with open(filename +"-yt"+".txt","w") as txt:
    if '00:00' not in tempos:
        txt.write("00:00 intro \n")
    for i,j in zip(descricoes,tempos):
        txt.write(j+" "+i+"\n")
