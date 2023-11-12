const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Conexión a la base de datos en MongoDB Atlas
mongoose.connect('mongodb+srv://jhomai7020:1097183614@sena.kpooaa3.mongodb.net/merndb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Definir el esquema de la colección
const usuarioSchema = new mongoose.Schema({
  nombre: String,
  correo: String
});

// Crear el modelo basado en el esquema
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Ruta para obtener todos los usuarios
app.get('/', async (req, res) => {
  try {
    // Consultar todos los documentos en la colección usuarios
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});