const libros = [
    {
        id: 1,
        imagen: "../img/imagen1.webp",
        titulo: "Don Quijote de la mancha",
        autor: "Miguel de Cervantes",
        categoria: "Clásico",
        descripcion: "Esta obra es una de las joyas de la literatura española y mundial. Narra las aventuras y desventuras del hidalgo Alonso Quijano, quien, fascinado por los libros de caballería, se convierte en Don Quijote y emprende un viaje como caballero andante junto a su fiel escudero, Sancho Panza.",
        precio: 45000
    },
    {
        id: 2,
        imagen: "../img/imagen2.webp",
        titulo: "Boulevard",
        autor: "Flor M. Salvador",
        categoria: "Romántico",
        descripcion: "Una historia de amor juvenil y drama, en la que dos adolescentes enfrentan juntos sus problemas personales mientras intentan entender el significado de la vida y el amor.",
        precio: 35000
    },
    {
        id: 3,
        imagen: "../img/imagen3.jpg",
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        categoria: "Realismo mágico",
        descripcion: "Considerada una de las obras cumbre del realismo mágico, esta novela relata la historia de la familia Buendía en el pueblo ficticio de Macondo, explorando temas de amor, soledad, y destino en una narrativa llena de realismo mágico.",
        precio: 50000
    },
    {
        id: 4,
        imagen: "../img/imagen4.jpg",
        titulo: "María",
        autor: "Jorge Isaacs",
        categoria: "Romántico",
        descripcion: "Un clásico de la literatura romántica latinoamericana, que cuenta la trágica historia de amor entre Efraín y María, ambientada en el exuberante paisaje del Valle del Cauca en Colombia.",
        precio: 30000
    },
    {
        id: 5,
        imagen: "../img/imagen5.jpg",
        titulo: "Changó, el gran putas",
        autor: "Manuel Zapata Olivella",
        categoria: "Histórico",
        descripcion: "Una novela épica que recorre la historia y cultura afroamericana desde África hasta América Latina, explorando la herencia africana y su impacto en el continente americano.",
        precio: 48000
    },
    {
        id: 6,
        imagen: "../img/imagen6.jpg",
        titulo: "Variaciones alrededor de nada",
        autor: "León de Greiff",
        categoria: "Poesía",
        descripcion: "Un libro de poesía que refleja el estilo particular de León de Greiff, caracterizado por un tono melancólico, irónico y experimental, en una exploración de temas existenciales.",
        precio: 28000
    },
    {
        id: 7,
        imagen: "../img/imagen7.jpg",
        titulo: "Las estrellas son negras",
        autor: "Arnoldo Palacios",
        categoria: "Realismo mágico",
        descripcion: "Esta novela explora la vida y dificultades de los afrodescendientes en Colombia, centrándose en temas de injusticia, discriminación y resistencia en el contexto social de la época.",
        precio: 32000
    },
    {
        id: 8,
        imagen: "../img/imagen8.jpg",
        titulo: "Entre la libertad y el miedo",
        autor: "Germán Arciniegas",
        categoria: "Ensayo",
        descripcion: "Un ensayo profundo sobre los desafíos de la libertad y el miedo en América Latina, en el que el autor reflexiona sobre temas políticos y culturales.",
        precio: 29000
    },
    {
        id: 9,
        imagen: "../img/imagen9.jpg",
        titulo: "Morada al sur",
        autor: "Aurelio Arturo",
        categoria: "Poesía",
        descripcion: "Este poemario es una obra maestra de la poesía colombiana, conocida por su belleza lírica y descripciones evocadoras de la naturaleza y el paisaje andino.",
        precio: 26000
    },
    {
        id: 10,
        imagen: "../img/imagen10.jpg",
        titulo: "La vorágine",
        autor: "José Eustasio Rivera",
        categoria: "Clásico",
        descripcion: "Una novela que denuncia las duras condiciones de los trabajadores en la explotación del caucho en la selva amazónica, combinando elementos de denuncia social y aventuras.",
        precio: 45000
    },
    {
        id: 11,
        imagen: "../img/imagen11.jpg",
        titulo: "La casa grande",
        autor: "Álvaro Cepeda Samudio",
        categoria: "Histórico",
        descripcion: "Una novela corta basada en la masacre de las bananeras en Colombia en 1928, que explora la opresión y la injusticia social.",
        precio: 37000
    },
    {
        id: 12,
        imagen: "../img/imagen12.jpg",
        titulo: "La tejedora de coronas",
        autor: "Germán Espinosa",
        categoria: "Novela",
        descripcion: "Esta novela cuenta la historia de Genoveva Alcocer en la Cartagena colonial, donde se mezcla la historia, el erotismo y las intrigas políticas en el contexto de la Inquisición.",
        precio: 40000
    }
];

let carrito = [];

const catalogoContainer = document.getElementById("catalogo");
const filtroCategorias = document.getElementById("filtro-categorias");
const pagarButton = document.getElementById("pagarButton");
const compraExitosaToast = new bootstrap.Toast(document.getElementById("compraExitosaToast"));

// Función para crear las tarjetas de los libros
function mostrarLibros(librosFiltrados) {
    catalogoContainer.innerHTML = "";

    librosFiltrados.forEach(libro => {
        const libroCard = document.createElement("div");
        libroCard.classList.add("col");

        libroCard.innerHTML = `
            <div class="card catalogo">
                <img src="${libro.imagen}" class="mx-auto d-block" alt="${libro.titulo}">
                <ul class="list-group list-group-flush" >
                    <li class="list-group-item"><h5 class="card-title text-center">${libro.titulo}</h5></li>
                    <li class="list-group-item"><strong class="card-subtitle">Autor:</strong> ${libro.autor}</li>
                    <li class="list-group-item"><strong class="card-subtitle">Categoría:</strong> ${libro.categoria}</li>
                    <li class="list-group-item"><strong class="card-subtitle">Precio:</strong> ${libro.precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</li>
                </ul>
                <div class="card-footer text-center">
                    <button class="btn btn-info btn-sm" onclick="mostrarModal(${libro.id})"><i class="bi bi-info-circle-fill"></i> Ver detalles</button>

                    <button class="btn btn-warning btn-sm" onclick="agregarAlCarrito(${libro.id})"><i class="bi bi-cart-plus-fill"></i> Agregar al carrito</button>
                </div>
            </div>
        `;
        catalogoContainer.appendChild(libroCard);
    });
}

function mostrarModal(libroId) {
    const libro = libros.find(l => l.id === libroId);

    document.getElementById("bookImage").src = libro.imagen;
    document.getElementById("bookTitle").textContent = libro.titulo;
    document.getElementById("bookDescription").textContent = libro.descripcion;
    document.getElementById("bookCategory").textContent = libro.categoria;
    document.getElementById("bookPrice").textContent = libro.precio !== undefined ? libro.precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) : 'Precio no disponible';;

    const bookModal = new bootstrap.Modal(document.getElementById("bookModal"));
    bookModal.show();
}

// Función para filtrar los libros por categoría
function filtrarLibros() {
    const categoriaSeleccionada = filtroCategorias.value;

    const librosFiltrados = categoriaSeleccionada === "todos" ? libros : libros.filter(libro => libro.categoria === categoriaSeleccionada);

    mostrarLibros(librosFiltrados);
}

mostrarLibros(libros);
filtroCategorias.addEventListener("change", filtrarLibros);

// Función para abrir el modal del carrito
function mostrarCarrito() {
    const carritoModal = new bootstrap.Modal(document.getElementById("modalCarrito"));
    carritoModal.show();
}

// Modifica la función agregarAlCarrito para que muestre el modal al agregar un libro
function agregarAlCarrito(libroId) {
    // Busca el objeto del libro por su id en el array libros
    const libro = libros.find(l => l.id === libroId);

    if (libro) {
        carrito.push(libro); // Agrega el objeto libro completo al carrito
        actualizarCarrito();
        mostrarCarrito(); // Muestra el modal del carrito al agregar un libro
        actualizarEstadoBotonPagar();
    }
}

// Función para actualizar el contenido del carrito
function actualizarCarrito() {
    const listaCarrito = document.getElementById("listaCarrito");
    listaCarrito.innerHTML = "";

    carrito.forEach((libro, index) => {
        const titulo = libro.titulo || 'Título no disponible';
        const precio = libro.precio !== undefined ? libro.precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) : 'Precio no disponible';
        const imagen = libro.imagen || '';
    
        const item = document.createElement("li");
        item.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    
        item.innerHTML = `
            <div class="d-flex align-items-center">
                <img src="${imagen}" alt="${titulo}" style="width: 50px; height: auto; margin-right: 10px;">
                <div>
                    <h6>${titulo}</h6>
                    <span>${precio}</span>
                </div>
            </div>
            <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        
        listaCarrito.appendChild(item);
    });
    
    actualizarTotal();
    
}

function actualizarEstadoBotonPagar() {
    pagarButton.disabled = carrito.length === 0;
}


// Función para eliminar un libro del carrito
function eliminarDelCarrito(indice) {
  carrito.splice(indice, 1);
  actualizarCarrito();
  actualizarEstadoBotonPagar();
}

function actualizarTotal() {
    const total = carrito.reduce((acc, libro) => acc + (libro.precio || 0), 0);
    const totalCompra = document.getElementById("totalCompra");
    totalCompra.innerText = `Total: ${total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}`;
}

pagarButton.addEventListener('click', () => {
    if (carrito.length > 0) {
        compraExitosaToast.show();
        carrito = []; // Vacía el carrito después de la compra
        actualizarCarrito(); // Actualiza la visualización del carrito
        actualizarEstadoBotonPagar(); // Deshabilita el botón al vaciar el carrito
    }
});

actualizarEstadoBotonPagar();
