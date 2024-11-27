JavaScript;

// Function to display the banner
function showBanner() {
  const banner = document.querySelector("#banner");
  
  // Select a random product to feature
  const featuredProduct = products[Math.floor(Math.random() * products.length)];

  banner.innerHTML = `
    <div style="
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #f4f4f4;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 1em;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    ">
      <img src="${featuredProduct.image}" alt="${featuredProduct.name}" style="width: 100px; height: auto; border-radius: 5px;">
      <div style="flex: 1; margin-left: 1em;">
        <h3 style="margin: 0;">${featuredProduct.name}</h3>
        <p style="margin: 0.5em 0;">Price: N${featuredProduct.price.toFixed(2)}</p>
        <button style="
          background: #007bff;
          color: white;
          border: none;
          padding: 0.5em 1em;
          border-radius: 4px;
          font-size: 1em;
          cursor: pointer;
        " onclick="addToCart(${featuredProduct.id})">Add to Cart</button>
      </div>
      <button style="
        background: #dc3545;
        color: white;
        border: none;
        padding: 0.3em 0.7em;
        border-radius: 4px;
        font-size: 0.9em;
        cursor: pointer;
      " onclick="hideBanner()">X</button>
    </div>
  `;

  // Display the banner
  banner.style.display = "block";
}

// Function to hide the banner
function hideBanner() {
  const banner = document.querySelector("#banner");
  banner.style.display = "none";
}

// Show the banner after 5 seconds
setTimeout(showBanner, 3000);

 // Mock product data
const products = [
  { id: 1, name: "Product 1", price: 10.99, image: "images/product1.jpg" },
  { id: 2, name: "Product 2", price: 20.99, image: "images/product2.jpg" },
  { id: 3, name: "Product 3", price: 15.99, image: "images/product3.jpg" },
];

// Initialize cart
let cart = [];

// Authentication-related functions
function isAuthenticated() {
  return localStorage.getItem("loggedInUser") !== null;
}

function logout() {
  localStorage.removeItem("loggedInUser");
  alert("You have logged out.");
  toggleAuthUI();
}

// Show login/register UI conditionally
function toggleAuthUI() {
  const loginSection = document.querySelector("#login");
  const registerSection = document.querySelector("#register");
  const productsSection = document.querySelector("#products");
  const cartSection = document.querySelector("#cart");
  const loginLink = document.querySelector("#login-link");
  const logoutLink = document.querySelector("#logout-link");

  if (isAuthenticated()) {
    loginSection.style.display = "none";
    registerSection.style.display = "none";
    productsSection.style.display = "block";
    cartSection.style.display = "block";
    loginLink.style.display = "none";
    logoutLink.style.display = "inline";
  } else {
    loginSection.style.display = "block";
    registerSection.style.display = "none";
    productsSection.style.display = "none";
    cartSection.style.display = "none";
    loginLink.style.display = "inline";
    logoutLink.style.display = "none";
  }
}

// Register new user
document.querySelector("#register-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.querySelector("#register-username").value;
  const password = document.querySelector("#register-password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find((user) => user.username === username)) {
    alert("Username already exists!");
  } else {
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful! Please login.");
    showLogin();
  }
});

// Login user
document.querySelector("#login-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.querySelector("#login-username").value;
  const password = document.querySelector("#login-password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    localStorage.setItem("loggedInUser", username);
    alert("Login successful!");
    toggleAuthUI();
  } else {
    alert("Invalid username or password!");
  }
});

// Show login form
function showLogin() {
  document.querySelector("#login").style.display = "block";
  document.querySelector("#register").style.display = "none";
}

// Show register form
function showRegister() {
  document.querySelector("#register").style.display = "block";
  document.querySelector("#login").style.display = "none";
}

// Load products
function loadProducts() {
  const productContainer = document.querySelector(".product-list");
  productContainer.innerHTML = ""; // Clear existing products

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Price: N${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productContainer.appendChild(productDiv);
  });
}

// Add to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const cartItem = cart.find((item) => item.id === productId);

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

// Render cart items
function renderCart() {
  const cartContainer = document.querySelector(".cart-items");
  const totalContainer = document.querySelector("#cart-total");
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>No items in the cart yet.</p>";
    totalContainer.textContent = "0.00";
    return;
  }

  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity;
    const cartItemDiv = document.createElement("div");
    cartItemDiv.classList.add("cart-item");
    cartItemDiv.innerHTML = `
      <p>${item.name} (x${item.quantity}) - N${(
      item.price * item.quantity
    ).toFixed(2)}</p>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cartContainer.appendChild(cartItemDiv);
  });

  totalContainer.textContent = total.toFixed(2);
}

// Remove from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  renderCart();
}

// Handle checkout
document.querySelector("#checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
  } else {
    alert("Thank you for your purchase!");
    cart = [];
    renderCart();
  }
});

// Initialize app
toggleAuthUI();
loadProducts();