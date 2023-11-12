// routes/index.js
const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');


router.get('/', indexController.getIndex);

module.exports = router;
