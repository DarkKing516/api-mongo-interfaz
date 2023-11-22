// models/pedidoModel.js
const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  servicios: [{
    tipo_servicio: {
      nombre_tipo_servicio: String,
      estado_tipo_servicio: String
    },
    nombre_servicio: String,
    estado_servicio: String,
    cantidad_servicio: Number,
    precio_servicio: Number,
    estado_servicio_catalogo: String,
    subtotal: Number
  }],
  productos: [{
    tipo_producto: {
      nombre_tipo_producto: String,
      estado_tipo_producto: String
    },
    nombre_producto: String,
    estado_producto: String,
    cantidad_producto: Number,
    precio_producto: Number,
    estado_producto_catalogo: String,
    subtotal: Number
  }],
  fecha_creacion: String,
  fecha_pedido: String,
  total_pedido: Number,
  estado_pedido: String,
  nombre_usuario: String
}, { versionKey: false });

const Pedido = mongoose.model('Pedido', pedidoSchema, 'gestion_pedidos');

module.exports = Pedido;
