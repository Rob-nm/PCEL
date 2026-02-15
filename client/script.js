const loginForm = document.getElementById('loginForm');
const mensajeDiv = document.getElementById('mensaje');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // --- CAMBIO DEFINITIVO ---
        // Usamos solo la barra '/' al inicio. 
        // El navegador completará automáticamente con el dominio donde estés (localhost o Vercel).
        const respuesta = await fetch('/api/auth/login', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await respuesta.json();

        if (respuesta.ok) {
            mensajeDiv.textContent = "¡Login correcto! Redirigiendo...";
            mensajeDiv.className = "mensaje success";
            
            // Guardamos el token para usarlo después
            localStorage.setItem('token', data.token);
            
            // (Opcional) Aquí podrías redirigir a otra página
            // window.location.href = '/dashboard.html'; 
        } else {
            mensajeDiv.textContent = data.mensaje || "Error al iniciar sesión";
            mensajeDiv.className = "mensaje error";
        }
    } catch (error) {
        console.error("Error en el fetch:", error);
        mensajeDiv.textContent = "No se pudo conectar con el servidor";
        mensajeDiv.className = "mensaje error";
    }
});