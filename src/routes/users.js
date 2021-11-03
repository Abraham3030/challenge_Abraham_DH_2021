const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

// Coniguracion de login y logout
// Iniciar sesion de usuario
router.get('/login', usersController.login);
// Procesar informacion
router.post('/login', usersController.loginProcess);
// users Logout
router.get('/logout', usersController.logout);

// 2. Formulario de creación de usuario
// Crear Usuario/ Obtener información con fromulario
router.get('/register', usersController.create);
// 4.Procesar formulario de usuarios
router.post('/register', usersController.store);

// 3. Detalle de un usuario particular
// Obtener un Usuario/ Detalle de usuario
router.get('/:id', usersController.userProfile);
// Fin obtener un Usuario

module.exports = router;