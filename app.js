// Estado global de la aplicación
const state = {
  products: window.PRODUCTS_DATA || [],
  cart: {}, // { [id]: cantidad }
  currentCategory: "Todas",
  searchQuery: ""
};

// Formato de moneda
function formatCurrency(amount) {
  return `$${amount.toLocaleString('es-AR')}`;
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  renderProducts();
  setupEventListeners();
});

// Renderizado de pestañas de categorías
function renderCategories() {
  const container = document.getElementById("categories-container");
  const categories = ["Todas", ...new Set(state.products.map(p => p.category))];

  container.innerHTML = categories.map(cat => `
    <button class="cat-chip ${cat === state.currentCategory ? 'active' : ''}" data-cat="${cat}">
      ${cat}
    </button>
  `).join("");

  container.querySelectorAll(".cat-chip").forEach(btn => {
    btn.addEventListener("click", () => {
      state.currentCategory = btn.dataset.cat;
      document.querySelectorAll(".cat-chip").forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      renderProducts();
    });
  });
}

// Filtrado de productos
function getFilteredProducts() {
  return state.products.filter(item => {
    const matchesCat = state.currentCategory === "Todas" || item.category === state.currentCategory;
    const q = state.searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      item.name.toLowerCase().includes(q) || 
      item.id.toLowerCase().includes(q) || 
      item.presentation.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q);
    
    return matchesCat && matchesSearch;
  });
}

// Renderizado de productos
function renderProducts() {
  const grid = document.getElementById("products-grid");
  const emptyState = document.getElementById("empty-state");
  const resultsCount = document.getElementById("results-count");
  
  const filtered = getFilteredProducts();
  resultsCount.textContent = `Mostrando ${filtered.length} productos`;

  if (filtered.length === 0) {
    grid.innerHTML = "";
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  grid.innerHTML = filtered.map(prod => {
    const qty = state.cart[prod.id] || 0;
    return `
      <div class="product-card" data-id="${prod.id}">
        <span class="product-code-tag">${prod.id}</span>
        <div class="product-icon-wrap">${prod.icon || '📦'}</div>
        <div>
          <h3 class="product-name">${prod.name}</h3>
          <p class="product-presentation">${prod.presentation}</p>
        </div>
        
        <div class="product-bottom">
          <div class="product-price">
            ${formatCurrency(prod.price)}
            <span>/ bulto</span>
          </div>

          ${qty === 0 ? `
            <button class="add-first-btn" onclick="updateQty('${prod.id}', 1)">
              <span>+ Agregar</span>
            </button>
          ` : `
            <div class="qty-controls">
              <button class="qty-btn" onclick="updateQty('${prod.id}', -1)">-</button>
              <span class="qty-input">${qty}</span>
              <button class="qty-btn" onclick="updateQty('${prod.id}', 1)">+</button>
            </div>
          `}
        </div>
      </div>
    `;
  }).join("");
}

// Modificar cantidades
window.updateQty = function(productId, delta) {
  const current = state.cart[productId] || 0;
  const updated = current + delta;

  if (updated <= 0) {
    delete state.cart[productId];
  } else {
    state.cart[productId] = updated;
  }

  updateCartUI();
  renderProducts();
};

// Actualizar barra flotante y contadores
function updateCartUI() {
  const itemIds = Object.keys(state.cart);
  let totalQty = 0;
  let totalPrice = 0;

  itemIds.forEach(id => {
    const prod = state.products.find(p => p.id === id);
    if (prod) {
      const q = state.cart[id];
      totalQty += q;
      totalPrice += prod.price * q;
    }
  });

  // Contador en header
  document.getElementById("cart-counter").textContent = totalQty;

  // Barra flotante inferior
  const floatingBar = document.getElementById("floating-cart-bar");
  if (totalQty > 0) {
    floatingBar.classList.add("visible");
    document.getElementById("floating-qty").textContent = `${totalQty} bulto${totalQty > 1 ? 's' : ''}`;
    document.getElementById("floating-total").textContent = formatCurrency(totalPrice);
  } else {
    floatingBar.classList.remove("visible");
  }

  // Render modal del carrito si está abierto
  renderCartModalItems(totalPrice);
}

// Renderizado de items dentro del modal de checkout
function renderCartModalItems(totalPrice) {
  const itemsContainer = document.getElementById("cart-items");
  const summarySubtotal = document.getElementById("summary-subtotal");
  const itemIds = Object.keys(state.cart);

  if (itemIds.length === 0) {
    itemsContainer.innerHTML = '<p style="color: #94a3b8; text-align: center; padding: 20px;">No agregaste ningún producto todavía.</p>';
    summarySubtotal.textContent = "$0";
    return;
  }

  itemsContainer.innerHTML = itemIds.map(id => {
    const prod = state.products.find(p => p.id === id);
    const qty = state.cart[id];
    const subtotal = prod.price * qty;

    return `
      <div class="cart-item-row">
        <div>
          <div class="cart-item-name">${prod.name}</div>
          <div class="cart-item-unit">${qty} x ${formatCurrency(prod.price)} (${prod.presentation})</div>
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <strong class="cart-item-price">${formatCurrency(subtotal)}</strong>
          <button style="background:none; border:none; color: #ef4444; cursor:pointer;" onclick="updateQty('${id}', -${qty})">🗑️</button>
        </div>
      </div>
    `;
  }).join("");

  summarySubtotal.textContent = formatCurrency(totalPrice);
}

// Escuchas de eventos
function setupEventListeners() {
  // Buscador
  const searchInput = document.getElementById("search-input");
  const clearBtn = document.getElementById("clear-search");

  searchInput.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    clearBtn.style.display = state.searchQuery ? "block" : "none";
    renderProducts();
  });

  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    state.searchQuery = "";
    clearBtn.style.display = "none";
    renderProducts();
  });

  document.getElementById("reset-filter-btn").addEventListener("click", () => {
    searchInput.value = "";
    state.searchQuery = "";
    state.currentCategory = "Todas";
    renderCategories();
    renderProducts();
  });

  // Modal Carrito
  const modal = document.getElementById("cart-modal");
  const openCartBtn = document.getElementById("open-cart-btn");
  const checkoutBtn = document.getElementById("checkout-trigger-btn");
  const closeCartBtn = document.getElementById("close-cart-btn");

  const openModal = () => { modal.style.display = "flex"; };
  const closeModal = () => { modal.style.display = "none"; };

  openCartBtn.addEventListener("click", openModal);
  checkoutBtn.addEventListener("click", openModal);
  closeCartBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Formulario y Envío por WhatsApp
  const checkoutForm = document.getElementById("checkout-form");
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const itemIds = Object.keys(state.cart);
    if (itemIds.length === 0) {
      alert("Por favor agregá al menos un producto al pedido.");
      return;
    }

    const name = document.getElementById("client-name").value.trim();
    const business = document.getElementById("business-client").value.trim();
    const address = document.getElementById("client-address").value.trim();
    const notes = document.getElementById("client-notes").value.trim();

    let total = 0;
    let itemsText = "";

    itemIds.forEach(id => {
      const prod = state.products.find(p => p.id === id);
      const qty = state.cart[id];
      const sub = prod.price * qty;
      total += sub;
      itemsText += `• ${qty}x [${prod.id}] ${prod.name}\n  (${prod.presentation}) → ${formatCurrency(sub)}\n`;
    });

    // Formatear mensaje limpio de WhatsApp
    let msg = `*NUEVO PEDIDO MAYORISTA - ${window.CATALOG_CONFIG.businessName}*\n\n`;
    msg += `👤 *Cliente:* ${name}\n`;
    if (business) msg += `🏢 *Comercio:* ${business}\n`;
    msg += `📍 *Dirección/Localidad:* ${address}\n`;
    if (notes) msg += `📝 *Notas/Pago:* ${notes}\n`;
    msg += `\n------------------------------\n`;
    msg += `📦 *DETALLE DEL PEDIDO:*\n`;
    msg += `${itemsText}`;
    msg += `------------------------------\n`;
    msg += `💰 *TOTAL ESTIMADO: ${formatCurrency(total)}*\n\n`;
    msg += `_Pedido generado automáticamente desde catálogo web TRÍAS_`;

    const encodedMsg = encodeURIComponent(msg);
    const waUrl = `https://wa.me/${window.CATALOG_CONFIG.whatsappNumber}?text=${encodedMsg}`;

    // Abrir WhatsApp
    window.open(waUrl, "_blank");
  });
}
