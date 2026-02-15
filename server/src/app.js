require('dotenv').config(); 
const express = require('express');
const cors = require('cors')
const conectarDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

// IMPORTANTE: Llamamos a la función
console.log('Llamando a la función conectarDB...');
conectarDB();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/productos', productRoutes);
const PORT = process.env.PORT || 3000;

module.exports = app;