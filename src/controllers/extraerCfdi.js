const xml2js = require('xml2js');

const parser = new xml2js.Parser({ explicitArray: false });

const extraerMultiplesXML = async (req, res) => {
  const archivos = req.body.archivos;

  if (!archivos || !Array.isArray(archivos) || archivos.length === 0) {
    return res.status(400).json({ error: 'No se enviaron archivos XML' });
  }

  try {
    const resultados = [];

    for (const archivo of archivos) {
      const { nombre, contenido } = archivo;

      // Parsear cada XML en contenido
      const result = await parser.parseStringPromise(contenido);
      resultados.push({ nombre, contenidoParseado: result });
    }

    res.json({ archivosProcesados: resultados });
  } catch (error) {
    console.error('Error al parsear archivos XML:', error);
    res.status(500).json({ error: 'Error al procesar archivos XML' });
  }
};

module.exports = {
  extraerMultiplesXML,
};
