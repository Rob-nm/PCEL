const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

// Lógica para registrar un usuario
exports.registrarUsuario = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // 1. Revisar si el usuario ya existe
        let usuario = await User.findOne({ email });
        if (usuario) {
            return res.status(400).json({ mensaje: "El usuario ya existe" });
        }

        // 2. Crear el nuevo usuario
        usuario = new User({ nombre, email, password });

        // 3. Encriptar la contraseña (Hashing)
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(password, salt);

        // 4. Guardar en la base de datos
        await usuario.save();

        res.status(201).json({ mensaje: "Usuario creado exitosamente" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Hubo un error al registrar el usuario" });
    }
};

// Lógica para iniciar sesión
exports.loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Verificar si el usuario existe
        let usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ mensaje: "Credenciales inválidas (email)" });
        }

        // 2. Comparar la contraseña ingresada con la encriptada
        const esCorrecta = await bcrypt.compare(password, usuario.password);
        if (!esCorrecta) {
            return res.status(400).json({ mensaje: "Credenciales inválidas (password)" });
        }

        // 3. Si todo es correcto, crear el Token JWT
        const payload = { usuarioId: usuario.id }; // Guardamos el ID del usuario en el token

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '2h' // El token expira en 2 horas
        });

        res.json({ 
            mensaje: "Login exitoso",
            token: token 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Hubo un error en el servidor" });
    }
};