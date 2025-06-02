const axios = require("axios");
const fs = require("fs");

async function probarCFDI() {
  // Lee tu XML CFDI (asegúrate de poner la ruta correcta)
  const xmlCFDI = fs.readFileSync("./E2384DC7-2376-4CB2-B41D-E9F27F73AB9D@1000000000XX0.xml", "utf-8");

  try {
    const response = await axios.post("http://localhost:3000/obtenerEstado", {
      xmlDoc: xmlCFDI
    });
    console.log("Respuesta:", response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

probarCFDI();
