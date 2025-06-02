const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cfdiRoutes = require("./routes/cfdiRoutes");
const cfdi =require ("./routes/extraerCfdi")
const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/cfdi", cfdiRoutes);
app.use("/cfd", cfdi);

app.get('/', (req, res) => {
  res.send('¡Hola, mundo! Este es el servidor de la aplicación.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Listening on PORT: ${PORT}`);
});
