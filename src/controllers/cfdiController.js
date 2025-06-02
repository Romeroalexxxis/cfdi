const cfdiService = require("../services/cfdiService");

const obtenerEstado = async (req, res) => {
  try {
    const xmlDoc = req.body.xmlDoc;
    const estadoFactura = await cfdiService.consultarEstadoCFDI(xmlDoc);
    res.json({ estadoFactura });
  } catch (error) {
    console.error("Error en obtenerEstado:", error);
    res.status(500).json({ error: "Error al obtener estado del CFDI" });
  }
};

module.exports = { obtenerEstado };
