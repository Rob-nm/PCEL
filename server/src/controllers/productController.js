const Product = require('../models/product');

exports.crearProducto = async (req, res) => {
    try {
        const nuevoProducto = new Product(req.body);
        // Asignamos el ID del usuario si tu middleware de auth lo provee
        if (req.usuario) {
            nuevoProducto.usuario = req.usuario;
        }
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Hubo un error al crear el componente" });
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

exports.actualizarProducto = async (req, res) => {
    try {
        const { nombre, marca, categoria, precio, stock, descripcion } = req.body;
        let producto = await Product.findById(req.params.id);
        if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
        
        producto.nombre = nombre || producto.nombre;
        producto.precio = precio || producto.precio;

        producto = await Product.findByIdAndUpdate(req.params.id, { $set: producto }, { new: true });
        res.json(producto);
    } catch (error) {
        res.status(500).send('Error al actualizar');
    }
};

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