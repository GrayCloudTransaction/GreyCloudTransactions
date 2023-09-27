var express = require("express");
var router = express.Router();
var emailSender = require("../controllers/emailSender");

function info(rota){
    console.log(`[Email Router] Rota: ${rota};`)
}

router.post("/enviar", function (req, res) {
    emailSender.enviarEmail(req, res);
});


module.exports = router;