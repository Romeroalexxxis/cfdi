const express = require("express");
const router = express.Router();
const { obtenerEstado } = require("../controllers/cfdiController");




router.post("/obtenerEstado", obtenerEstado);

module.exports = router;
