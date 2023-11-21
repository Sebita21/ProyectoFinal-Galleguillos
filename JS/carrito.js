
let itemsCarrito=[];
let totalCarrito=0;

const producto = [
  {
    id: 1,
    marca: "Mouse Logitech",
    imgen: "./IMAGENES/imagen1.png",
    precio: 89000,
    modelo: "MX Master 3S",
  },

  {
    id: 2,
    marca: "Teclado Logitech",
    imgen: "./IMAGENES/imagen2.png",
    precio: 180000,
    modelo: "MX Mechanical Mini Español",
  },

  {
    id: 3,
    marca: "Audifono Gamer Logitech",
    imgen: "./IMAGENES/imagen3.png",
    precio: 70000,
    modelo: "Astro A10 Blancos",
  },
  {
    id: 4,
    marca: "Camara Web",
    imgen: "./IMAGENES/imagen4.png",
    precio: 30000,
    modelo: "C310 HD 720p negro",
  },
  {
    id: 5,
    marca: "Logitech",
    imgen: "./IMAGENES/imagen5.png",
    precio: 450000,
    modelo: "Volante Palanca G920 para Xbox Series X-S Xbox One y PC.",
  },
  {
    id: 6,
    marca: "Logitech G",
    imgen: "./IMAGENES/imagen6.png",
    precio: 49000,
    modelo: "Alfombra XL 840 K/DA XL 900 X 400mm.",
  },
];

 function cargarProducto() {
   const productoList = document.getElementById("producto-list");

   producto.forEach((producto) => {
     const productoDiv = document.createElement("div");
     productoDiv.classList.add("producto");

     productoDiv.innerHTML = `
      <img src="${producto.imgen}" alt="${producto.marca}">
      <h3>${producto.marca}</h3>
      <p>Modelo: ${producto.modelo}</p>
      <p>Precio: $${producto.precio}</p>
      <button class="agregar-en-carrito" onclick="agregarCarrito(${producto.id}, '${producto.marca}', ${producto.precio})">Agregar al carrito</button>
    `;

     productoList.appendChild(productoDiv);
   });
 }
 window.onload = function () {
   const almacenarCarrito = JSON.parse(localStorage.getItem("itemsCarrito"));
   const almacenarTotal = localStorage.getItem("totalCarrito");

   if (almacenarCarrito && almacenarTotal) {
     itemsCarrito = almacenarCarrito;
     totalCarrito = parseFloat(almacenarTotal);
     guardarCarrito();

   }

   cargarProducto();
 };

 function agregarCarrito(productoId, productoMarca, precio) {
   itemsCarrito.push({ id: productoId, marca: productoMarca, precio: precio });
   totalCarrito += precio;

   localStorage.setItem("itemsCarrito", JSON.stringify(itemsCarrito));
   localStorage.setItem("totalCarrito", totalCarrito.toString());

   guardarCarrito();
 }

 function eliminarProducto(elimiId, elimPrecio){
    itemsCarrito = itemsCarrito.filter(item=> item.id !== elimiId);
    totalCarrito -= elimPrecio;

    localStorage.setItem ('itemsCarrito', JSON.stringify(itemsCarrito));
    localStorage.setItem('totalCarrito', totalCarrito.toString()) ;

    guardarCarrito();
 }

 function guardarCarrito() {

  const carritoList = document.getElementById('list-carrito');
  carritoList.innerHTML = '';

  itemsCarrito.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.marca} - $${item.precio}</span>
      <button class="fa fa-trash" onclick="eliminarProducto(${item.id}, ${item.precio})"></button>
    `;
    carritoList.appendChild(li);
  });

  document.getElementById("total-carrito").textContent = totalCarrito;
}
 
 function totalApagar() {
   if (itemsCarrito.length > 0) {
     alert(`Total a pagar: $${totalCarrito}`);
     itemsCarrito = [];
     totalCarrito = 0;

     localStorage.removeItem("itemsCarrito");
     localStorage.removeItem("totalCarrito");

     guardarCarrito();
   } else {
     alert(
       "El carrito está vacío. ¡Agrega productos antes de realizar el pedido!"
     );
   }
 }