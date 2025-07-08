const products = [
  {
    id: 1,
    cat: "Running Shoes",
    title: "AirPro x3 Green",
    price: 99.0,
    img: "images/p1.jpg",
  },
  {
    id: 2,
    cat: "Running Shoes",
    title: "AirPro x3 Yellow",
    price: 119.0,
    img: "images/p2.jpg",
  },
  {
    id: 3,
    cat: "Running Shoes",
    title: "AirPro x3 Orange",
    price: 110.0,
    img: "images/p3.jpg",
  },
  {
    id: 4,
    cat: "Running Shoes",
    title: "AirPro x3 Red",
    price: 99.0,
    img: "images/p4.jpg",
  },
  {
    id: 5,
    cat: "Running Shoes",
    title: "AirPro x3 Blue",
    price: 149.0,
    img: "images/p5.jpg",
  },
  {
    id: 6,
    cat: "Running Shoes",
    title: "AirPro x3 Aqua",
    price: 125.0,
    img: "images/p1.jpg",
  },
  {
    id: 7,
    cat: "Running Shoes",
    title: "AirPro x3 Green",
    price: 99.0,
    img: "images/p2.jpg",
  },
  {
    id: 8,
    cat: "Running Shoes",
    title: "AirPro x3 Green",
    price: 160.0,
    img: "images/p5.jpg",
  },
];

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

// Mobile Menu Toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on nav links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Shopping cart functionality
// // == Cart State ==
let cart = [];
const cartBtn = document.getElementById("cart-btn");
const cartPopup = document.getElementById("cart-popup");
const closeCartBtn = document.getElementById("close-cart");
const cartCount = document.querySelector(".cart-count");
const cartItemsBox = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

document.addEventListener("DOMContentLoaded", function () {
  const allProducts = document.getElementById("products-slide");

  products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}">
      <span>${p.cat}</span>
      <h3 class="product-title">${p.title}</h3>
      <p class="product-price">$${p.price}</p>
      <button class="add-to-cart-btn" data-product-id="${p.id}">Add to Cart</button>
    `;
    allProducts.appendChild(card);
  });

  cartBtn.addEventListener("click", () => {
    cartPopup.classList.add("open");
  });

  closeCartBtn.addEventListener("click", () => {
    cartPopup.classList.remove("open");
  });

  // Close with ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      cartPopup.classList.remove("open");
    }
  });

  // Add to Cart functionality
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = parseInt(e.target.getAttribute("data-product-id"));
      const product = products.find((p) => p.id === productId); // single object

      if (product) {
        addToCart(product);
      }
    });
  });

  function addToCart(product) {
    const existingItem = cart.find((item) => item.id === product.id); /// Array , Object , boolean

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    updateCart();
  }

  function updateCart() {
    cartCount.textContent = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );

    renderCartItems();
    calculateTotal();
  }

  function renderCartItems() {
    cartItemsBox.innerHTML = "";
    cart.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "cart-item";
      itemDiv.innerHTML = ` 
        <img src="${item.img}" alt="${item.title}" height="50" width="50">
        <div>
          <b>${item.title}</b>
          <p>$${item.price} </p>
          </div>
          <p>x ${item.quantity}</p>
    
        <button class="remove-item-btn" data-product-id="${item.id}">×</button>
      `;
      cartItemsBox.appendChild(itemDiv);

      // Remove item functionality
      itemDiv.querySelector(".remove-item-btn").addEventListener("click", () => {
          removeFromCart(item.id);
        });
    });
  }

  function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    updateCart();
  }

  function calculateTotal() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity,0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
  }
});
