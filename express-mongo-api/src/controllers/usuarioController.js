// controllers/usuarioController.js
const Usuario = require('../models/usuarioModel');

const usuarioController = {
  getAllUsuarios: async (req, res) => {
    try {
      const usuarios = await Usuario.find();
      res.json(usuarios);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).send('Error interno del servidor');
    }
  },

  createUsuario: async (req, res) => {
    const { nombre, correo } = req.body;
    try {
      const nuevoUsuario = new Usuario({ nombre, correo });
      await nuevoUsuario.save();
      res.status(201).json(nuevoUsuario);
    } catch (error) {
      console.error('Error al crear usuario:', error);
      res.status(500).send('Error interno del servidor');
    }
  }
  // Puedes añadir más funciones según tus necesidades
};

module.exports = usuarioController;
