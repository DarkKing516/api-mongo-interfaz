// controllers/pedidoController.js
const Pedido = require('../models/pedidoModel');

const pedidoController = {
  getAllPedidos: async (req, res) => {
    try {
      const pedidos = await Pedido.find();
      res.json(pedidos);
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
      res.status(500).send('Error interno del servidor');
    }
  },

  createPedido: async (req, res) => {
    const { productos, servicios, fecha_creacion, fecha_pedido, total_pedido, estado_pedido, nombre_usuario } = req.body;
    try {
      const nuevoPedido = new Pedido({ productos, servicios, fecha_creacion, fecha_pedido, total_pedido, estado_pedido, nombre_usuario });
      await nuevoPedido.save();
      res.status(201).json(nuevoPedido);
    } catch (error) {
      console.error('Error al crear pedido:', error);
      res.status(500).send('Error interno del servidor');
    }
  },
  

  getOnePedido: async (req, res) => {
    const { id } = req.params;
    try {
      const pedido = await Pedido.findById(id);
      if (!pedido) {
        return res.status(404).send('Pedido no encontrado');
      }
      res.json(pedido);
    } catch (error) {
      console.error('Error al obtener pedido:', error);
      res.status(500).send('Error interno del servidor');
    }
  },

  updatePedido: async (req, res) => {
    const { id } = req.params;
    const { productos, servicios, fecha_creacion, fecha_pedido, total_pedido, estado_pedido, nombre_usuario } = req.body;
    try {
      const pedido = await Pedido.findByIdAndUpdate(id, { productos, servicios, fecha_creacion, fecha_pedido, total_pedido, estado_pedido, nombre_usuario }, { new: true });
      if (!pedido) {
        return res.status(404).send('Pedido no encontrado');
      }
      res.json(pedido);
    } catch (error) {
      console.error('Error al actualizar pedido:', error);
      res.status(500).send('Error interno del servidor');
    }
  },
  

  deleteOnePedido: async (req, res) => {
    const { id } = req.params;
    try {
      const pedido = await Pedido.findByIdAndDelete(id);
      if (!pedido) {
        return res.status(404).send('Pedido no encontrado');
      }
      res.json({ message: 'Pedido eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar pedido:', error);
      res.status(500).send('Error interno del servidor');
    }
  }
};

module.exports = pedidoController;
