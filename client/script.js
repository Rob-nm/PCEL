const loginForm = document.getElementById('loginForm');
const mensajeDiv = document.getElementById('mensaje');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // --- AQUÍ ESTÁ EL CAMBIO ---
    // Si la página detecta que está en 'localhost', usa la ruta completa con el puerto 3000.
    // Si NO está en localhost (o sea, está en Vercel), usa la ruta relativa '/api/auth/login'.
    const URL_DESTINO = window.location.hostname === 'localhost' 
        ? 'http://localhost:3000/api/auth/login' 
        : '/api/auth/login';

    try {
        const respuesta = await fetch(URL_DESTINO, { // <--- Usamos la variable aquí
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
    // ---------------------------

        const data = await respuesta.json();

        if (respuesta.ok) {
            mensajeDiv.textContent = "¡Login correcto! Redirigiendo...";
            mensajeDiv.className = "mensaje success";
            localStorage.setItem('token', data.token);
        } else {
            mensajeDiv.textContent = data.mensaje || "Error al iniciar sesión";
            mensajeDiv.className = "mensaje error";
        }
    } catch (error) {
        mensajeDiv.textContent = "No se pudo conectar con el servidor";
        mensajeDiv.className = "mensaje error";
    }
});