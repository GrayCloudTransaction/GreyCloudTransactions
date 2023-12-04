args = commandArgs(trailingOnly=TRUE)

library(odbc)
con <- dbConnect(odbc(),
                 Driver = "SQL Server",
                 Server = "localhost",
                 Database = "ScriptGCT",
                 UID = "sa",
                 PWD = "urubu100",
                 Port = 1433)

queryDataSent = paste("SELECT dataSent FROM rede WHERE fk_servidor = id_servidor AND id_servidor = ", args, ";")
queryDataRecv = paste("SELECT dataRecv FROM rede WHERE fk_servidor = id_servidor AND id_servidor = ", args, ";")

result = (queryDataSent + queryDataRecv)/2

# df_raw <- dbGetQuery(con, query);

dados <- data.frame(result);

queryTemperatura = paste("SELECT valor_temperatura FROM localizacao WHERE fk_servidor = id_servidor AND id_servidor = ", args, ";")

temp <- data.frame(queryTemperatura);

r <- cor(dados$result, temp$queryTemperatura)
r2 <- r^2
porcentagem <- r2 * 100
porcentagem