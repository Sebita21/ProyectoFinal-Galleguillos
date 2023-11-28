
const file = '../DATA/productos.js';

let itemsCarrito = [];
let totalCarrito = 0;

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
      Swal.fire(`Total a Pagar: $${totalCarrito}`);
     itemsCarrito = [];
     totalCarrito = 0;

     localStorage.removeItem("itemsCarrito");
     localStorage.removeItem("totalCarrito");

     guardarCarrito();
   } else {
   
    Swal.fire(
      'El carrito está vacío. ¡Agrega productos antes de realizar el pedido!'
    );
   }
 }

