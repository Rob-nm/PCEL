# PCEL Store - Sistema de Gestión de Inventario

¡Bienvenido a **PCEL Store**! Esta es una aplicación Full Stack diseñada para administrar componentes tecnológicos de manera eficiente y segura. 

Este proyecto fue desarrollado como parte de la formación en **Universidad Tecmilenio**, implementando un CRUD completo, autenticación con JWT y despliegue automatizado.

---

## 🚀 Ver el proyecto en vivo (SaaS)
Para una revisión rápida, puedes acceder a la aplicación ya desplegada en la nube:
👉 https://pcel-sable.vercel.app/ 

---

## 🛠️ Guía Rápida para el Usuario (Cómo probarlo)

Para que tu experiencia revisando el proyecto sea perfecta, sigue estos pasos:

1.  **Página de Inicio:** Entrarás a la Landing Page responsiva inspirada en la tienda real de PCEL.
2.  **Registro:** Ve a "Crear Cuenta" y registra un usuario nuevo (tus datos están protegidos con encriptación Bcrypt).
3.  **Login:** Inicia sesión con tus credenciales para recibir tu Token de acceso (JWT).
4.  **Dashboard:** ¡Aquí sucede la magia!
    * **Crear:** Añade un producto (ej: Teclado, Mouse).
    * **Editar:** Haz clic en el botón de "Precio" para modificarlo al instante.
    * **Eliminar:** Borra productos con el icono de basura.
5.  **Responsivo:** Prueba achicando la ventana del navegador o abriéndolo en tu celular; verás cómo el diseño se adapta.

---

## 💻 Ejecución en Local (Para Desarrolladores)

Si deseas correr el proyecto en tu propia máquina, sigue estas instrucciones:

### 1. Requisitos Previos
* Tener instalado [Node.js](https://nodejs.org/)
* Una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (o una base de datos local).

### 2. Configuración
Clona el repositorio y entra a la carpeta del servidor:
bash
git clone [https://github.com/TU_USUARIO/PCEL.git](https://github.com/TU_USUARIO/PCEL.git)
cd PCEL/server

Instala las dependencias:

Bash
npm install
Configura tu archivo .env en la carpeta server con tu URI de MongoDB:

Fragmento de código
PORT=3000
MONGO_URI=tu_cadena_de_conexion_aqui
JWT_SECRET=una_palabra_secreta_segura
3. Ejecución
Inicia el servidor:

Bash
npm run dev
Abre el archivo client/index.html en tu navegador para interactuar con la interfaz.

4. Pruebas Unitarias
Para verificar que todo funciona correctamente (Rutas y Auth):

Bash
npm test

🏗️ Arquitectura y Herramientas
Backend: Node.js + Express.js

Base de Datos: MongoDB Atlas (NoSQL)

Seguridad: JSON Web Tokens (JWT) y Bcrypt

Pruebas: Jest + Supertest

Despliegue: CI/CD mediante GitHub Actions y Vercel


