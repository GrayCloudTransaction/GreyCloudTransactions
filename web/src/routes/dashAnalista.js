 // const express = require('express');
// const router = express.Router();

// const db = require('../database')

var express = require("express");
var router = express.Router();
var dashAnalistaController = require("../controllers/dashAnalistaController");


router.post("/select", function (req, res) {
    dashAnalistaController.select_dashAnalistaRAM(req, res);
})