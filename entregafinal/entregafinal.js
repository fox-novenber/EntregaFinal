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

mostrarCarrito();

function mostrarCarrito() {
    let carritoContainer = document.querySelector(".carrito-item");
    carritoContainer.innerHTML = "";
    carrito.forEach(item => {
        let itemCarrito = document.createElement("div");
        itemCarrito.className = "itemCarrito";

        itemCarrito.innerHTML = `
        <div class="carrito-item">
        <img src=${item.Imagen} alt="" width="30px">
        <div class="carrito-item-detalles">
            <spam class="carrito-item-titulo"> ${item.producto} </spam>
            <div class="selector-cantidad">
                <i class="fa-solid fa-minus restar-cantidad"></i>
                <input type="number" value="${item.cantidad}"class="carrito-item-cantidad" disabled>
                <i class="fa-solid fa-plus sumar-cantidad"></i>                                    
            </div>
            <span class="carrito-item-precio">${item.precio}</span>
        </div>
        <button class="btn btn-primary" onclick="eliminarItem(${item.id})">Eliminar <i class="fa-solid fa-trash"></i></button>
    </div>
        
        `;
        carritoContainer.appendChild(itemCarrito);
    });

    let botonSumarCantidad = document.getElementsByClassName("sumar-cantidad");
    for (let i = 0; i< carrito.length; i++) {
        let boton = botonSumarCantidad[i];
        boton.addEventListener('click',sumarCantidad)
        }
    
        let botonRestarCantidad = document.getElementsByClassName("restar-cantidad");
        for (let i = 0; i< carrito.length; i++) {
            let boton = botonRestarCantidad[i];
            boton.addEventListener('click',restarCantidad)
            }

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


function sumarCantidad(event) {
    
    let botonClick = event.target;
    let selector = botonClick.parentElement;
    let cantidadActual = selector.getElementsByClassName("carrito-item-cantidad")[0].value;
    console.log(cantidadActual );
    cantidadActual++
     selector.getElementsByClassName("carrito-item-cantidad")[0].value = cantidadActual;
     onsole.log(cantidadActual)
    mostrarCarrito() 
}
function restarCantidad(event) {
    
    let botonClick = event.target;
    let selector = botonClick.parentElement;
    let cantidadActual = selector.getElementsByClassName("carrito-item-cantidad")[0].value;
    console.log(cantidadActual );
    cantidadActual--
     selector.getElementsByClassName("carrito-item-cantidad")[0].value = cantidadActual;
     onsole.log(cantidadActual)
    mostrarCarrito() 
}