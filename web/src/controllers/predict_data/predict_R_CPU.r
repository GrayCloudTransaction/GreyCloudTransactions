args = commandArgs(trailingOnly=TRUE)

library(RMySQL)

mysqlconnection = dbConnect(RMySQL::MySQL(),
                            dbname='ScriptGCT',
                            host='localhost',
                            port=3306,
                            user='root',
                            password='')

query = paste("SELECT registro.*, codigo, tipo_componente from registro, servidor, componente WHERE fk_servidor = id_servidor AND fk_componente = id_componente AND id_servidor = ",args," AND tipo_componente IN ('RAM','CPU');")

result = dbSendQuery(mysqlconnection, query)

df_raw = fetch(result)

RAM = df_raw$valor_registro[df_raw$tipo_componente == "RAM"]
CPU = df_raw$valor_registro[df_raw$tipo_componente == "CPU"]

df = data.frame(RAM, CPU)

treino <- sample(1:nrow(df), length(df$RAM)*0.90)
teste <- setdiff(1:nrow(df), treino)

modelo1 <- lm(CPU ~ RAM, data = df[treino, ])

inter = coef(modelo1)[1]
x = coef(modelo1)[2]

previsao = predict(modelo1, df[teste,])

cat(c(previsao))