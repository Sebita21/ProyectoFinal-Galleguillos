
const file = 
  'https://raw.githubusercontent.com/Sebita21/Entregable2-Galleguillos/main/DATA/productos.json';

let itemsCarrito = [];
let totalCarrito = 0;

async function cargarProducto() {

  const  producto = await realizarPeticion(file);

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

 async function realizarPeticion(datos){
    try{
      const response = await fetch(datos);

      if (!response.ok) {
        throw new Error(`Error en la Petición: ${response.status} ${response.statusText}`);
      }
       const data = await response.json();

       return data;  
    }catch(error){
        console.error(error)
    }
 }
