const express = require('express');
const router = express.Router();

// Importacion del controlador index
const index_controller = require('../controllers/index_controller');

router.get('/', index_controller.index);
router.get('/detail/:id', index_controller.detail);

module.exports = router;
