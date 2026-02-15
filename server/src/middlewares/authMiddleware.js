const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Leer el token del header
    const token = req.header('x-auth-token');

    // Revisar si no hay token
    if (!token) {
        return res.status(401).json({ mensaje: 'No hay token, permiso no válido' });
    }

    // Validar el token
    try {
        const cifrado = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = cifrado.usuarioId; // Añadimos el ID del usuario a la petición
        next(); // Continuar al siguiente paso
    } catch (error) {
        res.status(401).json({ mensaje: 'Token no válido' });
    }
};