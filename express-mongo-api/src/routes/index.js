// routes/index.js
const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const usuarioController = require('../controllers/usuarioController');

router.get('/', indexController.getIndex);

// Rutas de usuarios
router.get('/usuarios', usuarioController.getAllUsuarios);
router.post('/usuarios', usuarioController.createUsuario);

module.exports = router;
