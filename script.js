// Carrito de compras almacenado en localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para agregar un producto al carrito
function addToCart(itemName, itemPrice) {
  const item = { name: itemName, price: itemPrice };
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${itemName} ha sido agregado al carrito.`);
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
  const removedItem = cart.splice(index, 1); // Remover el producto por índice
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${removedItem[0].name} ha sido eliminado del carrito.`);
  renderCart(); // Actualizar la vista del carrito
}

// Función para renderizar el carrito (solo en cart.html)
function renderCart() {
  const cartList = document.getElementById('lista-carrito');
  const totalPriceElement = document.getElementById('total-precio');
  if (!cartList) return; // Si no existe el contenedor, no ejecutar (para evitar problemas en index.html)

  cartList.innerHTML = ''; // Limpiar la lista actual

  // Si el carrito está vacío, mostrar un mensaje
  if (cart.length === 0) {
    cartList.innerHTML = '<li>El carrito está vacío.</li>';
    totalPriceElement.textContent = 'Total: $0.00'; // Total vacío
    return;
  }

  // Mostrar cada producto en el carrito
  let totalPrice = 0; // Variable para calcular el total
  cart.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      ${item.name} - $${item.price.toFixed(2)}
      <button class="remove-item" data-index="${index}">Eliminar</button>
    `;
    cartList.appendChild(listItem);
    totalPrice += item.price; // Sumar el precio al total
  });

  totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`; // Mostrar el precio total

  // Añadir event listeners a los botones de "Eliminar"
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      removeFromCart(index);
    });
  });
}

// Añadir event listeners a los botones de "Agregar al Carrito" (en index.html)
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', (e) => {
    const itemElement = e.target.parentElement;
    const itemName = itemElement.querySelector('h4').innerText;
    const itemPrice = itemElement.querySelector('p').innerText.replace('$', '');
    addToCart(itemName, parseFloat(itemPrice));
  });
});

// Renderizar el carrito solo si estamos en cart.html
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('cart.html')) {
    renderCart();
  }
});
