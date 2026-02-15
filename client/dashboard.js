const lista = document.getElementById('lista-productos');

// 1. Verificación de Seguridad: ¿Tiene token?
const token = localStorage.getItem('token');
if (!token) {
    window.location.href = 'index.html'; // Si no hay token, ¡adiós!
}

// 2. Función de Cerrar Sesión
function logout() {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}

// 3. Cargar datos protegidos del Backend
async function cargarProductos() {
    try {
        // Usamos ruta relativa: funciona en Localhost y en Vercel automáticamente
        const respuesta = await fetch('/api/productos', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Enviamos el pase VIP
                'Content-Type': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error('Token inválido o expirado');
        }

        const productos = await respuesta.json();

        // Mostrar productos en HTML
        lista.innerHTML = '';
        if (productos.length === 0) {
            lista.innerHTML = '<p>No hay productos en la base de datos aún.</p>';
            return;
        }

        productos.forEach(prod => {
            const div = document.createElement('div');
            div.className = 'card';
            div.innerHTML = `
                <h3>${prod.nombre}</h3>
                <p>Categoría: ${prod.categoria || 'General'}</p>
                <p class="precio">$${prod.precio}</p>
            `;
            lista.appendChild(div);
        });

    } catch (error) {
        console.error(error);
        lista.innerHTML = '<p style="color:red">Sesión expirada. Por favor ingresa nuevamente.</p>';
        setTimeout(() => logout(), 2000);
    }
}

// Iniciar carga
cargarProductos();