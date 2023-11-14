// src/App.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');  // Importa el middleware CORS
const routes = require('./routes');

const app = express();
const PORT = 3000;

// Middleware para procesar datos en formato JSON
app.use(bodyParser.json());

// Middleware CORS
app.use(cors());

// Conexión a la base de datos en MongoDB Atlas
mongoose.connect('mongodb+srv://USUARIO:CONTRASENA@sena.kpooaa3.mongodb.net/NOMBRE_BD', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Usar las rutas definidas en el archivo routes/index.js
app.use('/', routes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
