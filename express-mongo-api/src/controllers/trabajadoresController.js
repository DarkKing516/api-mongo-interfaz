const Trabajador = require('../models/trabajadorModel');

const trabajadoresController = {
  getAllTrabajadores: async (req, res) => {
    try {
      const trabajadores = await Trabajador.find();
      res.json(trabajadores);
    } catch (error) {
      console.error('Error al obtener trabajadores:', error);
      res.status(500).send('Error interno del servidor');
    }
  },

  getTrabajadorById: async (req, res) => {
    const trabajadorId = req.params.id;
    try {
      const trabajador = await Trabajador.findById(trabajadorId);
      if (!trabajador) {
        return res.status(404).send('Trabajador no encontrado');
      }
      res.json(trabajador);
    } catch (error) {
      console.error('Error al obtener el trabajador:', error);
      res.status(500).send('Error interno del servidor');
    }
  },

  createTrabajador: async (req, res) => {
    // Lógica para crear un nuevo trabajador...
  },

  updateTrabajador: async (req, res) => {
    // Lógica para actualizar un trabajador...
  },

  deleteTrabajador: async (req, res) => {
    // Lógica para eliminar un trabajador...
  },
};

module.exports = trabajadoresController;
