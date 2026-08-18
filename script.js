// Shopping cart state
let cart = [];

// Your AWS API Gateway endpoint
const API_URL =
  "https://1uu2vlno88.execute-api.ap-southeast-2.amazonaws.com/orders";

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

  const placeOrderBtn = document.getElementById("placeOrderBtn");
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", placeOrder);
  }

  renderCart();
});

function addToCart(item) {
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
  const checkoutForm = document.getElementById("checkout-form");

  const existingList = cartBox.querySelector(".cart-list");
  if (existingList) existingList.remove();

  if (cart.length === 0) {
    emptyMessage.style.display = "block";
    totalHeading.textContent = "Total: $0";
    if (checkoutForm) checkoutForm.style.display = "none";
    return;
  }

  emptyMessage.style.display = "none";
  if (checkoutForm) checkoutForm.style.display = "block";

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

  cartBox.insertBefore(list, totalHeading);

  list.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => removeFromCart(btn.dataset.name));
  });

  totalHeading.textContent = `Total: $${total.toFixed(2)}`;
}

async function placeOrder() {
  const nameInput = document.getElementById("customerName");
  const emailInput = document.getElementById("customerEmail");
  const statusEl = document.getElementById("orderStatus");
  const placeOrderBtn = document.getElementById("placeOrderBtn");

  if (cart.length === 0) {
    statusEl.textContent = "Your cart is empty.";
    statusEl.className = "error";
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const orderData = {
    items: cart,
    total: total,
    customerName: nameInput.value || "Guest",
    customerEmail: emailInput.value || "",
  };

  placeOrderBtn.disabled = true;
  placeOrderBtn.textContent = "Placing order...";
  statusEl.textContent = "";
  statusEl.className = "";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    const result = await response.json();

    if (result.success) {
      statusEl.textContent = `Order placed! Order ID: ${result.orderId}`;
      statusEl.className = "success";
      cart = [];
      nameInput.value = "";
      emailInput.value = "";
      renderCart();
    } else {
      statusEl.textContent = "Something went wrong. Please try again.";
      statusEl.className = "error";
    }
  } catch (err) {
    statusEl.textContent = "Could not connect. Please try again.";
    statusEl.className = "error";
  } finally {
    placeOrderBtn.disabled = false;
    placeOrderBtn.textContent = "Place Order";
  }
}
