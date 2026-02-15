const lista = document.getElementById('lista-productos');
const formProducto = document.getElementById('form-producto');
const mensajeForm = document.getElementById('mensaje-form');

// 1. Verificación de Seguridad: ¿Hay token?
const token = localStorage.getItem('token');
if (!token) {
    window.location.href = 'index.html';
}

// 2. Función para Cerrar Sesión
function logout() {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}

// 3. Cargar productos (GET)
async function cargarProductos() {
    try {
        const respuesta = await fetch('/api/productos', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!respuesta.ok) {
            if (respuesta.status === 401 || respuesta.status === 403) {
                logout(); // Si el token expiró, sacamos al usuario
            }
            throw new Error('Error al obtener los datos del servidor');
        }

        const productos = await respuesta.json();
        lista.innerHTML = '';
        
        if (productos.length === 0) {
            lista.innerHTML = '<p>No hay productos registrados en la base de datos.</p>';
            return;
        }

        productos.forEach(prod => {
            const div = document.createElement('div');
            div.className = 'card';
            div.innerHTML = `
                <h3>${prod.nombre}</h3>
                <p><strong>Categoría:</strong> ${prod.categoria || 'Sin categoría'}</p>
                <p class="precio">$${prod.precio}</p>
            `;
            lista.appendChild(div);
        });

    } catch (error) {
        console.error("Error cargando productos:", error);
        lista.innerHTML = '<p style="color:red">Error de conexión al cargar la lista.</p>';
    }
}

// 4. Agregar producto (POST)
if (formProducto) {
    formProducto.addEventListener('submit', async (e) => {
        e.preventDefault(); // Detiene el refresco de pantalla

        // Limpiar mensajes previos
        mensajeForm.textContent = "Enviando datos al servidor...";
        mensajeForm.style.color = "blue";

        // Captura de valores del formulario
        const nombre = document.getElementById('nombre').value;
        const categoria = document.getElementById('categoria').value;
        const precio = document.getElementById('precio').value;

        // Construimos el objeto respetando lo que tu ProductController espera (req.body)
        const nuevoProducto = {
            nombre: nombre,
            categoria: categoria,
            precio: Number(precio) // Aseguramos que el precio viaje como número
        };

        try {
            const respuesta = await fetch('/api/productos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(nuevoProducto)
            });

            const data = await respuesta.json();

            if (respuesta.ok) {
                // ÉXITO
                mensajeForm.style.color = 'green';
                mensajeForm.textContent = '¡Producto guardado exitosamente en MongoDB! ✅';
                
                formProducto.reset(); // Limpia el formulario
                
                // Recargamos la lista para ver el nuevo producto sin refrescar la página
                await cargarProductos(); 
                
                // Borrar el mensaje de éxito después de 3 segundos
                setTimeout(() => { mensajeForm.textContent = ""; }, 3000);

            } else {
                // ERROR DEL SERVIDOR (ej. validación fallida)
                mensajeForm.style.color = 'red';
                mensajeForm.textContent = data.mensaje || 'No se pudo guardar el producto.';
            }
        } catch (error) {
            // ERROR DE RED
            console.error("Error en la petición POST:", error);
            mensajeForm.style.color = 'red';
            mensajeForm.textContent = 'Error de red: El servidor no responde.';
        }
    });
}

// Ejecutar la carga inicial al entrar
cargarProductos();