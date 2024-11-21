// Recuperar el carrito de localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para calcular el precio total
function calculateTotal() {
  return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
}

// Función para renderizar el carrito
function renderCart() {
  const cartList = document.getElementById('lista-carrito');
  const totalPriceElement = document.getElementById('total-price');

  cartList.innerHTML = ''; // Limpiar la lista actual

  // Si el carrito está vacío
  if (cart.length === 0) {
    cartList.innerHTML = '<li>El carrito está vacío.</li>';
    totalPriceElement.innerText = '0.00';
    return;
  }

  // Renderizar productos en el carrito
  cart.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      ${item.name} - $${item.price.toFixed(2)}
      <button class="remove-item" data-index="${index}">Eliminar</button>
    `;
    cartList.appendChild(listItem);
  });

  // Mostrar el precio total
  totalPriceElement.innerText = calculateTotal();

  // Añadir eventos para eliminar productos
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      removeFromCart(index);
    });
  });
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
  const removedItem = cart.splice(index, 1); // Remover producto
  localStorage.setItem('cart', JSON.stringify(cart)); // Actualizar localStorage
  alert(`${removedItem[0].name} ha sido eliminado del carrito.`);
  renderCart(); // Actualizar vista del carrito
}

// Renderizar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', renderCart);
