document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("productList");
  if (productList) {
    fetch("http://localhost:8080/products")
      .then(res => res.json())
      .then(products => {
        products.forEach(p => {
          const card = document.createElement("div");
          card.className = "product-card";
          card.innerHTML = `<h3>${p.name}</h3><p>${p.quantity}</p><p>₹${p.price}/unit</p><p>${p.description}</p>`;
          productList.appendChild(card);
        });
      });
  }

  const productForm = document.getElementById("productForm");
  if (productForm) {
    productForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = {
        name: document.getElementById("productName").value,
        quantity: document.getElementById("quantity").value,
        price: document.getElementById("price").value,
        description: document.getElementById("description").value
      };
      fetch("http://localhost:8080/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(() => alert("Product posted!"));
    });
  }

  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        role: document.getElementById("role").value,
        password: document.getElementById("password").value
      };
      fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(() => alert("Registered successfully!"));
    });
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = {
        email: document.getElementById("loginEmail").value,
        password: document.getElementById("loginPassword").value
      };
      fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(user => {
        alert("Login successful! Welcome " + user.name);
        window.location.href = "dashboard.html";
      });
    });
  }
});