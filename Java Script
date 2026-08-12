// Shopping cart state
let cart = [];

// Wait for the DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".product-card button");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".product-card");
      const name = card.querySelector("h3").textContent;
      const priceText = card.querySelector("p").textContent; // e.g. "$50"
      const price = parseFloat(priceText.replace("$", ""));

      addToCart({ name, price });
    });
  });

  renderCart();
});

function addToCart(item) {
  // If item already in cart, increase quantity instead of duplicating
  const existing = cart.find((i) => i.name === item.name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  renderCart();
}

function removeFromCart(name) {
  cart = cart.filter((i) => i.name !== name);
  renderCart();
}

function renderCart() {
  const cartBox = document.querySelector("#cart .cart-box");
  const emptyMessage = cartBox.querySelector("p");
  const totalHeading = cartBox.querySelector("h3");

  // Remove any previously rendered cart list
  const existingList = cartBox.querySelector(".cart-list");
  if (existingList) existingList.remove();

  if (cart.length === 0) {
    emptyMessage.style.display = "block";
    totalHeading.textContent = "Total: $0";
    return;
  }

  emptyMessage.style.display = "none";

  const list = document.createElement("ul");
  list.className = "cart-list";

  let total = 0;

  cart.forEach((item) => {
    const lineTotal = item.price * item.quantity;
    total += lineTotal;

    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `
      <span>${item.name} x${item.quantity} - $${lineTotal.toFixed(2)}</span>
      <button class="remove-btn" data-name="${item.name}">Remove</button>
    `;
    list.appendChild(li);
  });

  // Insert the cart list before the total heading
  cartBox.insertBefore(list, totalHeading);

  // Wire up remove buttons
  list.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => removeFromCart(btn.dataset.name));
  });

  totalHeading.textContent = `Total: $${total.toFixed(2)}`;
}
