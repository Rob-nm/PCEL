const lista = document.getElementById('lista-productos');
const mensajeForm = document.getElementById('mensaje-form');
const token = localStorage.getItem('token');

if (!token) window.location.href = 'index.html';

function logout() {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}

// 1. CARGAR PRODUCTOS CON DISEÑO DE TARJETAS
async function cargarProductos() {
    try {
        const res = await fetch('/api/productos', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const productos = await res.json();
        lista.innerHTML = '';

        productos.forEach(prod => {
            const div = document.createElement('div');
            div.className = 'card';
            // Imagen aleatoria de tecnología para cada producto
            const imgUrl = `https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=300&q=80&sig=${prod._id}`;
            
            div.innerHTML = `
                <img src="${imgUrl}" alt="tech">
                <h3>${prod.nombre}</h3>
                <p>Categoría: ${prod.categoria}</p>
                <p class="precio">$${prod.precio}</p>
                <div class="actions">
                    <button class="btn-edit" onclick="editarPrecio('${prod._id}', ${prod.precio})">
                        <i class="fas fa-edit"></i> Precio
                    </button>
                    <button class="btn-del" onclick="eliminarProducto('${prod._id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            lista.appendChild(div);
        });
    } catch (error) {
        console.error(error);
    }
}

// 2. CREAR PRODUCTO (Actualizado para el nuevo diseño)
async function crearProducto() {
    const nombre = document.getElementById('nombre').value;
    const categoria = document.getElementById('categoria').value;
    const precio = document.getElementById('precio').value;

    if(!nombre || !precio) return alert("Llena los campos básicos");

    try {
        const res = await fetch('/api/productos', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ 
                nombre, 
                categoria, 
                precio: Number(precio),
                marca: "PCEL Brand", 
                stock: 10 
            })
        });

        if (res.ok) {
            document.getElementById('nombre').value = '';
            document.getElementById('precio').value = '';
            cargarProductos();
        }
    } catch (error) {
        alert("Error al guardar");
    }
}

// 3. EDITAR PRECIO (PUT)
async function editarPrecio(id, precioActual) {
    const nuevoPrecio = prompt("Introduce el nuevo precio:", precioActual);
    
    if (nuevoPrecio && !isNaN(nuevoPrecio)) {
        try {
            const res = await fetch(`/api/productos/${id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ precio: Number(nuevoPrecio) })
            });

            if (res.ok) cargarProductos();
        } catch (error) {
            alert("No se pudo actualizar");
        }
    }
}

// 4. ELIMINAR PRODUCTO (DELETE)
async function eliminarProducto(id) {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
        try {
            const res = await fetch(`/api/productos/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) cargarProductos();
        } catch (error) {
            alert("Error al eliminar");
        }
    }
}

cargarProductos();