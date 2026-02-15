const loginForm = document.getElementById('loginForm');
const mensajeDiv = document.getElementById('mensaje');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    mensajeDiv.textContent = "Verificando...";
    mensajeDiv.className = "mensaje";

    try {
        // --- CORRECCIÓN CLAVE ---
        // Usamos solo '/api/auth/login'. El navegador sabrá si es localhost o Vercel.
        const respuesta = await fetch('/api/auth/login', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await respuesta.json();

        if (respuesta.ok) {
            mensajeDiv.textContent = "¡Bienvenido! Entrando al sistema...";
            mensajeDiv.className = "mensaje success";
            
            // 1. Guardar el Token
            localStorage.setItem('token', data.token);
            
            // 2. Redirigir al Dashboard (Esperamos 1 seg para que se lea el mensaje)
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);

        } else {
            mensajeDiv.textContent = data.mensaje || "Error al iniciar sesión";
            mensajeDiv.className = "mensaje error";
        }
    } catch (error) {
        console.error(error);
        mensajeDiv.textContent = "Error de conexión con el servidor";
        mensajeDiv.className = "mensaje error";
    }
});