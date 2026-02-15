const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app'); 
const User = require('../src/models/user'); 

describe('Pruebas de Autenticación (Auth)', () => {
    
    // Limpiar el usuario de prueba antes de empezar para que no diga "usuario ya existe"
    beforeAll(async () => {
        await User.deleteMany({ email: 'test@pcel.com' });
    });

    afterAll(async () => {
        await User.deleteMany({ email: 'test@pcel.com' });
        await mongoose.connection.close();
    });

    // 1. Test de Registro
    it('Debe registrar un nuevo usuario exitosamente', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                nombre: 'Usuario de Prueba',
                email: 'test@pcel.com',
                password: 'password123'
            });
        
        expect(res.statusCode).toEqual(201);
        // Ajustado a "creado" que es lo que responde tu servidor real
        expect(res.body).toHaveProperty('mensaje', 'Usuario creado exitosamente');
    });

    // 2. Test de Login
    it('Debe iniciar sesión y devolver un Token JWT', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@pcel.com',
                password: 'password123'
            });
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token'); 
    });

    // 3. Test de Error (Contraseña incorrecta)
    it('No debe permitir login con contraseña errónea', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@pcel.com',
                password: 'password_falso'
            });
        
        expect(res.statusCode).toBeGreaterThanOrEqual(400);
    });
});