caminho = getwd()
caminho <- paste(caminho, "/src/controllers/predict_data/jonas.csv", sep = "")

jonas = read.csv(caminho, header = TRUE)

RAM = jonas$valor_registro[jonas$tipo_componente == "RAM"]
CPU = jonas$valor_registro[jonas$tipo_componente == "CPU"]

df = data.frame(RAM, CPU)

treino <- sample(1:nrow(df), length(df$RAM)*0.90)
teste <- setdiff(1:nrow(df), treino)

modelo1 <- lm(RAM ~ CPU, data = df[treino, ])

inter = coef(modelo1)[1]
x = coef(modelo1)[2]

previsao = predict(modelo1, df[teste,])

cat(c(previsao)) 