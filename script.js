const API_BASE = "http://localhost:8080";

document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("productList");
  if (productList) {
    fetch(`${API_BASE}/products`)
      .then(res => res.json())
      .then(products => {
        productList.innerHTML = "";
        products.forEach(p => {
          const card = document.createElement("div");
          card.className = "product-card";
          const farmerName = p.farmer ? p.farmer.name : "Unknown";
          card.innerHTML = `
            <h3>${escapeHtml(p.name)}</h3>
            <p><strong>Price:</strong> ₹${p.price}</p>
            <p><strong>Quantity:</strong> ${escapeHtml(p.quantity)}</p>
            <p><strong>Farmer:</strong> ${escapeHtml(farmerName)}</p>
            <p>${escapeHtml(p.description || "")}</p>
          `;
          productList.appendChild(card);
        });
      })
      .catch(err => console.error("Error fetching products:", err));
  }

  // register
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", e => {
      e.preventDefault();
      const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        role: document.getElementById("role").value
      };
      fetch(`${API_BASE}/api/farmer/register`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(() => alert("Registered successfully! Please login."))
      .catch(err => console.error(err));
    });
  }


  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      const data = {
        email: document.getElementById("loginEmail").value,
        password: document.getElementById("loginPassword").value
      };
      fetch(`${API_BASE}/api/farmer/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      })
      .then(res => {
        if (!res.ok) throw new Error("Invalid credentials");
        return res.json();
      })
      .then(user => {
        // Save user in localStorage (very basic, not secure)
        localStorage.setItem("currentUser", JSON.stringify(user));
        alert("Login successful! Welcome " + user.name);
        window.location.href = "dashboard.html";
      })
      .catch(err => {
        console.error(err);
        const msg = document.getElementById("loginMsg");
        if (msg) msg.textContent = "Invalid credentials";
      });
    });
  }

  const productForm = document.getElementById("productForm");
  if (productForm) {
    productForm.addEventListener("submit", e => {
      e.preventDefault();
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
      if (!currentUser || currentUser.role !== "farmer") {
        alert("You must be logged in as a farmer to post a product.");
        return;
      }
      const data = {
        name: document.getElementById("productName").value,
        quantity: document.getElementById("quantity").value,
        price: parseFloat(document.getElementById("price").value),
        description: document.getElementById("description").value,
        farmerId: currentUser.id
      };
      fetch(`${API_BASE}/api/farmer/addProduct`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      })
      .then(res => {
        if (!res.ok) throw new Error("Failed to post product");
        return res.json();
      })
      .then(() => {
        document.getElementById("postMsg").textContent = "Product posted!";
        // optional: redirect to dashboard
        setTimeout(()=> window.location.href="dashboard.html", 800);
      })
      .catch(err => {
        console.error(err);
        document.getElementById("postMsg").textContent = "Error posting product.";
      });
    });
  }
});

function escapeHtml(text) {
  if (!text && text !== 0) return "";
  return String(text).replace(/[&<>"'`=\/]/g, function(s) {
    return ({
      '&': '&amp;','<': '&lt;','>': '&gt;','"': '&quot;',"'": '&#39;','/': '&#x2F;','`': '&#x60;','=': '&#x3D;'
    })[s];
  });
}
