const mongoose = require('mongoose');

const conectarDB = async () => {
    console.log(' Intentando conectar a la URI:', process.env.MONGO_URI); // Paso 1
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Conectado exitosamente a Atlas'); // Paso 2
    } catch (error) {
        console.error('❌ Error detallado de conexión:', error); // Paso 3 (si falla)
        process.exit(1);
    }
};

module.exports = conectarDB;