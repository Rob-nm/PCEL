const Product = require('../models/product');

exports.crearProducto = async (req, res) => {
    try {
        // Creamos el producto con nombre, categoria y precio que vienen del form
        const nuevoProducto = new Product(req.body);

        // SOLO asignamos el usuario si realmente existe en la petición
        // Esto evita que MongoDB de error si req.usuario es undefined
        if (req.usuario) {
            nuevoProducto.usuario = req.usuario;
        }

        // Guardamos en la base de datos
        await nuevoProducto.save();

        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.error("Error en MongoDB:", error);
        res.status(500).json({ 
            mensaje: "Hubo un error al crear el componente",
            error: error.message 
        });
    }
};

exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Product.find().populate('usuario', 'nombre');
        res.json(productos);
    } catch (error) {
        res.status(500).send('Hubo un error al obtener los productos');
    }
};

// Actualizar un producto (Precio o cualquier campo)
exports.actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        // Usamos $set para actualizar solo los campos que vengan en el body
        const productoActualizado = await Product.findByIdAndUpdate(
            id, 
            { $set: req.body }, 
            { new: true }
        );

        if (!productoActualizado) return res.status(404).json({ mensaje: 'Producto no encontrado' });
        res.json(productoActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el precio' });
    }
};

// Eliminar un producto
exports.eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Product.findByIdAndDelete(id);
        if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
        res.json({ mensaje: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar' });
    }
};