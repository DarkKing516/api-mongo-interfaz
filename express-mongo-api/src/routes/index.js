// routes/index.js
const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const usuarioController = require('../controllers/usuarioController');
const pedidoController = require('../controllers/pedidoController');

router.get('/', indexController.getIndex);


// Rutas de usuarios
router.get('/usuarios', usuarioController.getAllUsuarios);
router.get('/usuarios/:id', usuarioController.getOneUsuario);
router.post('/usuarios', usuarioController.createUsuario);
router.put('/usuarios/:id', usuarioController.updateUsuario);
router.delete('/usuarios/:id', usuarioController.deleteOneUsuario); // Nueva ruta para eliminar un usuario


// Rutas de Pedidos
router.get('/pedidos', pedidoController.getAllPedidos); // Ruta para Obtener todos los Pedidos
router.get('/pedidos/:id', pedidoController.getOnePedido); // Ruta para Obtener un solo Pedido
router.post('/pedidos', pedidoController.createPedido); // Ruta para Crear un Pedido
router.put('/pedidos/:id', pedidoController.updatePedido); // Ruta para Actualizar un Pedido
router.delete('/pedidos/:id', pedidoController.deleteOnePedido); // Ruta para Eliminar un Pedido



module.exports = router;
