const Product = require('../models/product');

exports.crearProducto = async (req, res) => {
    try {
        // Creamos el producto con los datos que vienen del body
        const nuevoProducto = new Product(req.body);

        // Asignamos el ID del usuario que viene desde el middleware de auth
        nuevoProducto.usuario = req.usuario;

        // Guardamos en la base de datos
        await nuevoProducto.save();

        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Hubo un error al crear el componente" });
    }
};

// Obtener todos los productos
exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Product.find().populate('usuario', 'nombre');
        res.json(productos);
    } catch (error) {
        res.status(500).send('Hubo un error al obtener los productos');
    }
};

// Actualizar un producto
exports.actualizarProducto = async (req, res) => {
    try {
        const { nombre, marca, categoria, precio, stock, descripcion } = req.body;
        let producto = await Product.findById(req.params.id);

        if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });

        // Actualizar los campos
        producto.nombre = nombre || producto.nombre;
        producto.precio = precio || producto.precio;
        // ... puedes añadir los demás campos igual

        producto = await Product.findByIdAndUpdate(req.params.id, { $set: producto }, { new: true });
        res.json(producto);
    } catch (error) {
        res.status(500).send('Error al actualizar');
    }
};

// Eliminar un producto
exports.eliminarProducto = async (req, res) => {
    try {
        let producto = await Product.findById(req.params.id);
        if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });

        await Product.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).send('Error al eliminar');
    }
};