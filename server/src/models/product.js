const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del componente es obligatorio'],
        trim: true
    },
    marca: {
        type: String,
        required: [true, 'La marca es obligatoria']
    },
    categoria: {
        type: String,
        required: [true, 'La categoría es obligatoria']
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        default: 0
    },
    stock: {
        type: Number,
        required: [true, 'El stock es obligatorio'],
        default: 0
    },
    descripcion: {
        type: String
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: false // <--- CAMBIO AQUÍ: De true a false para evitar el error 500
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);