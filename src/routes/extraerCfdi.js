const express = require("express");
const router = express.Router();

const { extraerMultiplesXML } = require('../controllers/extraerCfdi');

// Ruta GET para leer XML desde archivo local
router.post("/", extraerMultiplesXML);


module.exports = router;
