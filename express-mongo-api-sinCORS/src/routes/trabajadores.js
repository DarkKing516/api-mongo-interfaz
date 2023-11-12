const express = require('express');
const router = express.Router();
const trabajadoresController = require('../controllers/trabajadoresController');

// Rutas para trabajadores
router.get('/', trabajadoresController.getAllTrabajadores);
router.get('/:id', trabajadoresController.getTrabajadorById);
router.post('/', trabajadoresController.createTrabajador);
router.put('/:id', trabajadoresController.updateTrabajador);
router.delete('/:id', trabajadoresController.deleteTrabajador);

module.exports = router;
