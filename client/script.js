const loginForm = document.getElementById('loginForm');
const mensajeDiv = document.getElementById('mensaje');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const respuesta = await fetch('http://localhost:3000/api/auth/login', {
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
            console.log("Token guardado:", data.token);
        } else {
            mensajeDiv.textContent = data.mensaje || "Error al iniciar sesión";
            mensajeDiv.className = "mensaje error";
        }
    } catch (error) {
        mensajeDiv.textContent = "No se pudo conectar con el servidor";
        mensajeDiv.className = "mensaje error";
    }
});