// models/trabajadorModel.js
const mongoose = require('mongoose');

const trabajadorSchema = new mongoose.Schema({
  nombre: String,
  puesto: String,
  salario: Number
  // Otros campos que puedas necesitar...
});

const Trabajador = mongoose.model('Trabajador', trabajadorSchema);

module.exports = Trabajador;
