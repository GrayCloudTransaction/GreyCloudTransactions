processos_raw <- data.frame(processos)
head(processos_raw)

library(wordcloud)
library(RColorBrewer)
library(wordcloud2)
library(tm)
library(RJSONIO)

docs <- Corpus(VectorSource(processos$nome))

dtm <- TermDocumentMatrix(docs)
matrix <- as.matrix(dtm)
words <- sort(rowSums(matrix), decreasing = TRUE)
,View(df_processos)

wordcloud2(data=df_processos, size=0.7, color="random-light", backgroundColor = "black",
           rotateRatio = 0, shape = "cicle")

wc_processos <- data.frame("words" = df_processos$word[1:100], "freq" = df_processos$freq[1:100]) 
wordcloud2(data=wc_processos, size=0.7, color="random-light", backgroundColor = "black", rotateRatio = 0, shape = "cicle")
wc_processos

exportJson <- toJSON(wc_processos)
write(exportJson, "wc_processos.json")

install.packages("webshot", "htmlwidgets")
webshot::install_phantomjs
library(wordcloud2)
hw <- wordcloud2(data=df_processos, size=0.7, color="random-light", backgroundColor = "black", rotateRatio = 0, shape = "cicle")
saveWidget(hw,"1.html",selfcontained = F)
webshot("aaa.html","aaaaaaaa.png",vwidth = 1992, vheight = 1744, delay =10)
