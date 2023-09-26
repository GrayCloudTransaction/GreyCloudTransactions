var express = require("express");
var router = express.Router();

var aquarioController = require("../controllers/empresaController");

router.get("/:idUsuario", function (req, res) {
  aquarioController.buscarAquariosPorUsuario(req, res);
});

router.post("/cadastrar", function (req, res) {
  aquarioController.cadastrar(req, res);
})

module.exports = router;