const loginForm = document.getElementById('loginForm');
const mensajeDiv = document.getElementById('mensaje');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // --- CAMBIO OBLIGATORIO ---
        // Usamos SOLO la ruta relativa.
        // Esto obliga al navegador a buscar en "el mismo sitio donde estoy".
        // Si estás en Vercel, buscará en Vercel. Si estás en local, en local.
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
            localStorage.setItem('token', data.token);
            // Opcional: window.location.href = '/dashboard.html';
        } else {
            mensajeDiv.textContent = data.mensaje || "Error al iniciar sesión";
            mensajeDiv.className = "mensaje error";
        }
    } catch (error) {
        console.error(error);
        mensajeDiv.textContent = "Error de conexión: " + error.message;
        mensajeDiv.className = "mensaje error";
    }
});