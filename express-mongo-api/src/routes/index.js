// routes/index.js
const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const usuarioController = require('../controllers/usuarioController');

router.get('/', indexController.getIndex);

// Rutas de usuarios
router.get('/usuarios', usuarioController.getAllUsuarios);
router.get('/usuarios/:id', usuarioController.getOneUsuario);
router.post('/usuarios', usuarioController.createUsuario);
router.put('/usuarios/:id', usuarioController.updateUsuario); // Nueva ruta para actualizar un usuario

module.exports = router;
