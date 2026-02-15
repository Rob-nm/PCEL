const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middlewares/authMiddleware'); // Nuestro portero

// Ruta para crear producto: POST /api/productos
// El middleware 'auth' protege esta ruta
router.post('/', auth, productController.crearProducto);
// Obtener productos (Pública o privada, según prefieras. Aquí la pondremos pública para ver el catálogo)
router.get('/', productController.obtenerProductos);

// Actualizar producto (Privada - requiere token)
router.put('/:id', auth, productController.actualizarProducto);

// Eliminar producto (Privada - requiere token)
router.delete('/:id', auth, productController.eliminarProducto);
module.exports = router;