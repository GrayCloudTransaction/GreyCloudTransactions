var rafaelModel = require("../../models/modelsIndividuais/rafaelScheneiderModel");

function info(func){
    console.log(`[Rafael Controller] Função: ${func};`)
}

function getPredict(req, res) {
    info("getPredict");
    var codigo = req.body.idServidorServer;


    // Aqui era onde seria criado o CSV, por conta da descoberta da tecnologia de passar variavel para terminal não é mais necessário essa parte


    //var fs = require('fs');
    //const util = require('util')

    const path = require('node:path');
    const execSync = require("child_process").execSync;

    const pathController = path.join(__dirname, '..')

    // // CREATE CSV
    // let converter = require('json-2-csv');
    // const csv = converter.json2csv(teste);

    // const writeFile = util.promisify(fs.writeFile)

    // writeFile(`${pathController}/predict_data/jonas.csv`, csv, function (err) {
    // if (err) {
    //     console.log('Some error occured - file either not saved or corrupted file saved.');
    // } else{
    //     console.log('It\'s saved!');
    // }
    //}).then(function(){


    //PASS LM
    const result1 = execSync(`Rscript ${pathController}/predict_data/predict_R_RAM.r ${codigo}`);
    const result2 = execSync(`Rscript ${pathController}/predict_data/predict_R_CPU.r ${codigo}`);


    let resultList1 = result1.toString().split(' ')
    let resultList2 = result2.toString().split(' ')

    res.status(200).json([resultList1, resultList2])
}

module.exports = {
    getPredict
}