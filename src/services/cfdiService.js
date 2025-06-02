const axios = require("axios");
const { parseStringPromise } = require("xml2js");

const consultarEstadoCFDI = async (xmlDoc) => {
  const result = await parseStringPromise(xmlDoc, { explicitArray: false });

  const timbreFiscal =
    result["cfdi:Comprobante"]["cfdi:Complemento"]["tfd:TimbreFiscalDigital"]["$"];

  const rfcEmisor = result["cfdi:Comprobante"]["cfdi:Emisor"]["$"]["Rfc"];
  const rfcReceptor = result["cfdi:Comprobante"]["cfdi:Receptor"]["$"]["Rfc"];
  const totalComprobante = result["cfdi:Comprobante"]["$"]["Total"];
  const uuidReq = timbreFiscal["UUID"];
  const selloEmisor = timbreFiscal["SelloCFD"];
  const ultimosOchoCaracteres = selloEmisor.slice(-8);

  const datosCFDI = {
    re: rfcEmisor,
    rr: rfcReceptor,
    tt: totalComprobante,
    id: uuidReq,
    fe: ultimosOchoCaracteres,
  };

  const xmlBody = `
    <soapenv:Envelope
       xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
       xmlns:tem="http://tempuri.org/">
       <soapenv:Header/>
       <soapenv:Body>
          <tem:Consulta>
             <tem:expresionImpresa>
                <![CDATA[?re=${datosCFDI.re}&rr=${datosCFDI.rr}&tt=${datosCFDI.tt}&id=${datosCFDI.id}&fe=${selloEmisor}]]>
             </tem:expresionImpresa>
          </tem:Consulta>
       </soapenv:Body>
    </soapenv:Envelope>`;

  const config = {
    headers: {
      "Content-Type": "text/xml;charset=utf-8",
      Accept: "text/xml",
      SOAPAction: "http://tempuri.org/IConsultaCFDIService/Consulta",
    },
  };

  const url = "https://consultaqr.facturaelectronica.sat.gob.mx/ConsultaCFDIService.svc";

  const response = await axios.post(url, xmlBody, config);
  const responseData = response.data;

  const resultConsulta = await parseStringPromise(responseData, { explicitArray: false });

  const estadoFactura =
    resultConsulta["s:Envelope"]["s:Body"]["ConsultaResponse"]["ConsultaResult"]["a:Estado"];

  return estadoFactura;
};

module.exports = { consultarEstadoCFDI };
