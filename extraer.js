const fs = require('fs');
const xml2js = require('xml2js');

const parser = new xml2js.Parser({ explicitArray: false });

fs.readFile('./E2384DC7-2376-4CB2-B41D-E9F27F73AB9D@1000000000XX0.xml', 'utf-8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo XML:', err);
    return;
  }

  parser.parseString(data, (err, result) => {
    if (err) {
      console.error('Error al parsear XML:', err);
      return;
    }

    // Aquí tienes el XML convertido a JSON
    console.log(JSON.stringify(result, null, 2));
  });
});
