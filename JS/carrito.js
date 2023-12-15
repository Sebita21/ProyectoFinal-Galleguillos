const file =
  'https://raw.githubusercontent.com/Sebita21/Entregable2-Galleguillos/main/DATA/productos.json';

let itemsCarrito = [];
let totalCarrito = 0;

async function cargarProducto() {
  const producto = await realizarPeticion(file);

  const productoList = document.getElementById('producto-list');

  producto.forEach((producto) => {
    const productoDiv = document.createElement('div');
    productoDiv.classList.add('producto');

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
  const almacenarCarrito = JSON.parse(localStorage.getItem('itemsCarrito'));
  const almacenarTotal = localStorage.getItem('totalCarrito');

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

  localStorage.setItem('itemsCarrito', JSON.stringify(itemsCarrito));
  localStorage.setItem('totalCarrito', totalCarrito.toString());

  guardarCarrito();
}
function eliminarProducto(elimiId, elimPrecio) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¡No podrás revertir esto!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'eliminar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      itemsCarrito = itemsCarrito.filter((item) => item.id !== elimiId);
      totalCarrito -= elimPrecio;

      localStorage.setItem('itemsCarrito', JSON.stringify(itemsCarrito));
      localStorage.setItem('totalCarrito', totalCarrito.toString());

      guardarCarrito();
    }
  });
}

function guardarCarrito() {
  const carritoList = document.getElementById('list-carrito');
  carritoList.innerHTML = '';

  itemsCarrito.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `
    <span>${item.marca} - $${item.precio}</span>
    <button class="fa fa-trash" onclick="eliminarProducto(${item.id}, ${item.precio})">
    </button>
    `;

    carritoList.appendChild(li);
  });

  const eliminarBotones = document.querySelectorAll('.fa-trash');
  eliminarBotones.forEach((boton) => {
    boton.addEventListener('click', (evento) => {
      const id = evento.target.dataset.item.id;
      const precio = evento.target.dataset.item.precio;
      eliminarProducto(id, precio);
    });
  });

  document.getElementById('total-carrito').textContent = totalCarrito;
}

function totalApagar() {
  if (itemsCarrito.length > 0) {
    Swal.fire({
      title: '¿Estás seguro de pagar?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Pagar Producto',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const compraRealizadaEvent = new CustomEvent('compraRealizada', {
          detail: {
            totalCarrito: totalCarrito,
          },
        });
        document.dispatchEvent(compraRealizadaEvent);

        itemsCarrito = [];
        totalCarrito = 0;

        localStorage.removeItem('itemsCarrito');
        localStorage.removeItem('totalCarrito');

        guardarCarrito();
      }
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Lo Sentimos',
      text: 'El carrito no se debe encontrar vacido!!',
    });
  }
}

document.addEventListener('compraRealizada', (event) => {
  const { totalCarrito } = event.detail;
  Swal.fire(
    '¡Tu Compra fue Realizada!',
    `Total a Pagar: $${totalCarrito}`,
    'success'
  );
});

async function realizarPeticion(datos) {
  try {
    const response = await fetch(datos);

    if (!response.ok) {
      throw new Error(
        `Error en la Petición: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}
