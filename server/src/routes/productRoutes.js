const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Ruta para OBTENER productos (GET)
router.get('/', productController.obtenerProductos);

// Ruta para CREAR producto (POST)
// Usamos el nombre exacto de tu función: crearProducto
router.post('/', productController.crearProducto);

// Rutas para actualizar y eliminar
router.put('/:id', productController.actualizarProducto);
router.delete('/:id', productController.eliminarProducto);

module.exports = router;