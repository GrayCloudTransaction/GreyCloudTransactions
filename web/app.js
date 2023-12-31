// process.env.AMBIENTE_PROCESSO = "desenvolvimento";
process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 443;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var empresaRouter = require("./src/routes/empresa");
var funcionarioRouter = require("./src/routes/funcionario");
var emailRouter = require("./src/routes/email");
var servidorRouter = require("./src/routes/servidor");
var chamadoRouter = require("./src/routes/chamado");
var registroRouter = require("./src/routes/registro");
var eduardoCamargo = require("./src/routes/routesIndividuais/eduardoCamargo")
var giovannaMenezesRouter = require("./src/routes/routesIndividuais/giovannaMenezes"); 
var rafaelScheneiderRouter = require("./src/routes/routesIndividuais/rafaelScheneider")
var gabrielRouter = require("./src/routes/routesIndividuais/gabrielBifon")
var vitorHidekiRouter = require("./src/routes/routesIndividuais/vitorHideki")

var felipeRouter = require("./src/routes/routesIndividuais/felipeSantos")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/empresa", empresaRouter);
app.use("/funcionario", funcionarioRouter);
app.use("/email", emailRouter);
app.use("/servidor", servidorRouter);
app.use("/chamado", chamadoRouter);
app.use("/registro", registroRouter);
app.use("/eduardoCamargo", eduardoCamargo)
app.use("/felipe", felipeRouter);
app.use("/giovannaMenezes", giovannaMenezesRouter);
app.use("/rafael", rafaelScheneiderRouter)
app.use("/gabriel", gabrielRouter)
app.use("/vitorHideki", vitorHidekiRouter)

app.listen(PORTA, function () {
    console.log(`URL do Site: https://localhost:${PORTA} \n
    Rodando aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO}`);
});
