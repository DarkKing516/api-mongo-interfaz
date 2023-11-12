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
  },

  getOneUsuario: async (req, res) => {
    const { id } = req.params;
    try {
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        return res.status(404).send('Usuario no encontrado');
      }
      res.json(usuario);
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      res.status(500).send('Error interno del servidor');
    }
  },

  updateUsuario: async (req, res) => {
    const { id } = req.params;
    const { nombre, correo } = req.body;
    try {
      const usuario = await Usuario.findByIdAndUpdate(id, { nombre, correo }, { new: true });
      if (!usuario) {
        return res.status(404).send('Usuario no encontrado');
      }
      res.json(usuario);
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(500).send('Error interno del servidor');
    }
  }
  // Puedes añadir más funciones según tus necesidades
};

module.exports = usuarioController;
