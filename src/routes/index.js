const express = require('express');
const router = express.Router();

// Importacion del controlador index
const indexController = require('../controllers/indexController');

router.get('/register', indexController.register);
router.get('/login', indexController.login);

router.get('/', indexController.index);
router.get('/detail/:id', indexController.detail);
//Rutas necesarias para la creación del CRUD de peliculas
router.get('/add', indexController.add);
router.post('/create', indexController.create);
router.get('/edit/:id', indexController.edit);
router.post('/update/:id', indexController.update);
router.get('/delete/:id', indexController.destroy);
//Rutas necesarias para crear usuario
router.get('/add/user', indexController.addUser);
router.post('/create/user', indexController.createUser);


module.exports = router;
