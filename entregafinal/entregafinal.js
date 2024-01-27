const stockproductos = [
    { id: 1, producto: "manzana", precio: 150, origen: "nacional", Imagen: "manzana.jpeg", tipo: "" },
    { id: 2, producto: "naranja", precio: 100, origen: "nacional", Imagen: "naranja.jpeg", tipo: "" },
    { id: 3, producto: "banana", precio: 200, origen: "importado", Imagen: "banana.jpeg", tipo: "" },
    { id: 4, producto: "peras", precio: 80, origen: "nacional", Imagen: "pera.jpeg", tipo: "" },
    { id: 5, producto: "frutillas", precio: 350, origen: "importado", Imagen: "frutilla.jpeg", tipo: "" },
    { id: 6, producto: "tomates", precio: 85, origen: "nacional", Imagen: "tomate.jpeg", tipo: "" },
    { id: 7, producto: "Quilmes", tipo: "Cerveza", precio: 1000, origen: "", Imagen: "" },
    { id: 8, producto: "andes", tipo: "Cerveza", precio: 1500, origen: "", Imagen: "" },
    { id: 9, producto: "brama", tipo: "Cerveza", precio: 1800, origen: "", Imagen: "" },
    { id: 10, producto: "patagonia", tipo: "Cerveza", precio: 1600, origen: "", Imagen: "" },
    { id: 11, producto: "toro", tipo: "vino", precio: 1100, origen: "", Imagen: "" },
    { id: 12, producto: "perdices", tipo: "vino", precio: 1900, origen: "", Imagen: "" },
    { id: 13, producto: "rutini", tipo: "vino", precio: 2000, origen: "", Imagen: "" },
    { id: 14, producto: "wiski", tipo: "licor", precio: 1100, origen: "", Imagen: "" },
    { id: 15, producto: "vodka", tipo: "licor", precio: 1000, origen: "", Imagen: "" }
];


let tarjetas = document.getElementById("tarjetas");
let carrito = [];

// Obtener datos del carrito desde el Local Storage (si existen)
const carritoJSON = localStorage.getItem("carrito");
if (carritoJSON) {
    carrito = JSON.parse(carritoJSON);
}


tarjetas.innerHTML = "";
stockproductos.forEach(elemento => {
    let tarjetita = document.createElement("div");
    tarjetita.className = "estiloTarjeta";
    tarjetita.style = "margin:5px"
    tarjetita.innerHTML = `
        <img class="card-img-top" src="imagenes/${elemento.Imagen}"
            <div>
            <h5 class="card-title">${elemento.producto}</h5>
            TIPO: ${elemento.tipo} ${elemento.origen}</p>
            <h3>PRECIO: ${elemento.precio}$</h3>
            </div>
            <button class="btn btn-primary" onclick="agregarAlCarrito(${elemento.id})">Agregar al carrito</button>
        `;
    tarjetas.appendChild(tarjetita);
});

/* 
function mostrarCarrito() {
    let carritoContainer = document.getElementById("carrito");
    carritoContainer.innerHTML = "";
    carrito.forEach(item => {
        let itemCarrito = document.createElement("div");
        itemCarrito.className = "itemCarrito";

        itemCarrito.innerHTML = `
            <h3>${item.producto }</h3>
            <p>Precio: ${item.precio}$</p>
            <p>Cantidad: ${item.cantidad}</p>
            <button class="btn btn-primary" id = "${item.id}" />-</button>
            <button class="btn btn-primary" id="${item.id}">+</button>
            <button class="btn btn-primary" onclick="eliminarItem(${item.id})">Eliminar</button>
        `;
        carritoContainer.appendChild(itemCarrito);
    });

    // Guardar los datos del carrito en el Local Storage
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(id) {
    let producto = stockproductos.find(item => item.id === id);
    let itemCarrito = carrito.find(item => item.id === id);

    if (itemCarrito) {
        itemCarrito.cantidad++;
    } else {
        // Realizar una copia profunda del objeto producto
        let nuevoProducto = JSON.parse(JSON.stringify(producto));
        carrito.push({ ...nuevoProducto, cantidad: 1 });
    }

    mostrarCarrito();
} */

function mostrarCarrito() {
    let carritoContainer = document.getElementById("carrito");
    carritoContainer.innerHTML = "";
    carrito.forEach(item => {
        let itemCarrito = document.createElement("div");
        itemCarrito.className = "itemCarrito";

        itemCarrito.innerHTML = `
        <h3>${item.producto}</h3>
        <p>Precio: ${item.precio}$</p>
        <p>Cantidad: ${item.cantidad}</p>
        <button class="btn btn-primary btn-menos" data-id="${item.id}">-</button>
        <button class="btn btn-primary btn-mas" data-id="${item.id}">+</button>
        <button class="btn btn-primary" onclick="eliminarItem(${item.id})">Eliminar</button>
        `;
        carritoContainer.appendChild(itemCarrito);
    });

    // Guardar los datos del carrito en el Local Storage
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(id) {
    let producto = stockproductos.find(item => item.id === id);
    let itemCarrito = carrito.find(item => item.id === id);

    if (itemCarrito) {
        itemCarrito.cantidad++;
    } else {
        // Realizar una copia profunda del objeto producto
        let nuevoProducto = JSON.parse(JSON.stringify(producto));
        carrito.push({ ...nuevoProducto, cantidad: 1 });
    }

    mostrarCarrito();
}

function eliminarItem(id) {
    let itemCarrito = carrito.find(item => item.id === id);
    if (itemCarrito) {
        carrito.splice(carrito.indexOf(itemCarrito), 1);
        mostrarCarrito();
    }
}
function onBtnMasClick(event) {
    let id = event.target.dataset.id;
    let itemCarrito = carrito.find(item => item.id === id);

    if (itemCarrito.cantidad < stockproductos.find(item => item.id === id).stock) {
        itemCarrito.cantidad++;
    }

    mostrarCarrito();
}
function onBtnMenosClick(event) {
    let id = event.target.dataset.id;
    let itemCarrito = carrito.find(item => item.id === id);

    if (itemCarrito.cantidad > 0) {
        itemCarrito.cantidad--;
    }

    mostrarCarrito();
}
function onBtnEliminarClick(event) {
    let id = event.target.dataset.id;
    let itemCarrito = carrito.find(item => item.id === id);

    if (itemCarrito) {
        carrito.splice(carrito.indexOf(itemCarrito), 1);
    }

    mostrarCarrito();
}