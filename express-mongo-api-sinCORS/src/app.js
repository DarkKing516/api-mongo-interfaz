// src/App.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const PORT = 3000;

// Middleware para procesar datos en formato JSON
app.use(bodyParser.json());

// Conexión a la base de datos en MongoDB Atlas
mongoose.connect('mongodb+srv://jhomai7020:1097183614@sena.kpooaa3.mongodb.net/merndb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Usar las rutas definidas en el archivo routes/index.js
app.use('/', routes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
