// models/usuarioModel.js
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  correo: String
}, { versionKey: false });

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;