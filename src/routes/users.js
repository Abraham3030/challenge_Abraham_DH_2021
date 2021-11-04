const express = require('express');
const router = express.Router();

// Importacion del controlador index
const userController = require('../controllers/userController');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

//Rutas necesarias para crear usuario
router.get('/register', userController.add);
router.post('/register', validations, userController.create)
router.get('/login',  userController.login);
router.post('/login', userController.loginProcess);
router.get('/logout', authMiddleware, userController.logout);

module.exports = router;