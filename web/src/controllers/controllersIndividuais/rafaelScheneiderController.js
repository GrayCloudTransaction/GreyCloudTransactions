var rafaelModel = require("../../models/modelsIndividuais/rafaelScheneiderModel");

function info(func){
    console.log(`[Rafael Controller] Função: ${func};`)
}

function getPredict(req, res) {
    info("getPredict");
    let codigoEmpresa = "XPTO-0987"

    let teste
    //GET DB JSON
    rafaelModel.listar(codigoEmpresa).then(function (resultado) {
        if (resultado.length > 0) { 
            teste = resultado
        }
        else {
            res.status(204).send("Nenhum resultado encontrado!")
        }

    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao realizar a consulta!\nErro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);

    }).then(function(){
        var fs = require('fs');
        const path = require('node:path');
        const execSync = require("child_process").execSync;
        const util = require('util')

        const pathController = path.join(__dirname, '..')

        // CREATE CSV
        let converter = require('json-2-csv');
        const csv = converter.json2csv(teste);

        const writeFile = util.promisify(fs.writeFile)

        writeFile(`${pathController}/predict_data/jonas.csv`, csv, function (err) {
        if (err) {
            console.log('Some error occured - file either not saved or corrupted file saved.');
        } else{
            console.log('It\'s saved!');
        }
        }).then(function(){
            //PASS LM
            const result = execSync(`Rscript ${pathController}/predict_data/predict_R.r`);
        
            let resultList = result.toString().split(' ')
        
            res.send(resultList)
        })
    });

}

module.exports = {
    getPredict
}