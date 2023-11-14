var empresaModel = require("../../models/modelsIndividuais/rafaelScheneiderModel");

function info(func){
    console.log(`[Rafael Controller] Função: ${func};`)
}

function getPredict(req, res) {
    info("getPredict");

    const execSync = require("child_process").execSync;
    
    const result = execSync("Rscript C:\\Users\\gabri\\Desktop\\projeto_pi\\GreyCloudTransactions\\web\\src\\controllers\\predict_data\\predict_R.r");

    let resultList = result.toString().split(' ')

    res.send(resultList)
    // if (id_servidor != "") {
    //     servidorModel.pegarInfoServidor().then(function (resultado) {
    //         if (resultado.length > 0) {
    //             console.log(resultado)
               
    //         }
    //         else {
    //             res.status(204).send("Nenhum resultado encontrado!")
    //         }

    //     }).catch(function (erro) {
    //         console.log(erro);
    //         console.log("Houve um erro ao realizar a consulta!\nErro: ", erro.sqlMessage);
    //         res.status(500).json(erro.sqlMessage);

    //     })

    // }
    // else {
    //     res.status(400).send("ID Empresa está vazio ou undefined");
    // }


}

module.exports = {
    getPredict
}