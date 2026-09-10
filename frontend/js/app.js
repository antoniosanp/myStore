/**
 * myStore Frontend - Main Application Logic Controller
 */

document.addEventListener('DOMContentLoaded', async () => {
    // --- 1. INITIALIZE API HEALTH & DATA ---
    await initializeApp();

    // --- 2. SUBSCRIBE TO STATE CHANGES ---
    window.appState.subscribe((state, changeType) => {
        if (changeType === 'filters' || changeType === 'products') {
            renderCatalogGrid();
        }
        if (changeType === 'cart') {
            renderCartUI();
        }
        if (changeType === 'user') {
            renderUserUI();
        }
        if (changeType === 'theme') {
            updateThemeUI();
        }
    });

    // --- 3. ATTACH EVENT LISTENERS ---
    setupEventListeners();
});

/**
 * App Initialization Flow
 */
async function initializeApp() {
    // Apply Theme
    document.documentElement.setAttribute('data-theme', window.appState.theme);
    updateThemeUI();

    // Check Backend API Connection
    const isOnline = await window.apiService.checkBackendHealth();
    updateApiStatusUI(isOnline);

    // Load Data from API / Mock
    try {
        const [products, categories, manufacturers] = await Promise.all([
            window.apiService.getProducts(),
            window.apiService.getCategories(),
            window.apiService.getManufacturers()
        ]);

        window.appState.products = products || [];
        window.appState.categories = categories || [];
        window.appState.manufacturers = manufacturers || [];

        // Render Initial UI Elements
        renderCategoryChips();
        populateFilterDropdowns();
        renderCatalogGrid();
        renderCartUI();
        renderUserUI();

    } catch (error) {
        console.error("Initialization error:", error);
        window.Components.showToast("Error cargando datos iniciales.", "error");
    }
}

/**
 * Update Top Bar API Connection Status
 */
function updateApiStatusUI(isOnline) {
    const indicator = document.getElementById('statusIndicator');
    const text = document.getElementById('statusText');
    if (!indicator || !text) return;

    if (isOnline) {
        indicator.className = 'status-indicator online';
        text.textContent = 'Backend Conectado (API Live: localhost:8080)';
    } else {
        indicator.className = 'status-indicator offline';
        text.textContent = 'Modo Demostración (Offline / Mock Data Activo)';
    }
}

/**
 * Render Category Chips Bar
 */
function renderCategoryChips() {
    const container = document.getElementById('categoryChipsList');
    if (!container) return;

    let html = `
        <button class="chip ${!window.appState.filters.category ? 'active' : ''}" data-cat="">
            <i class="fa-solid fa-border-all"></i> Todos
        </button>
    `;

    window.appState.categories.forEach(cat => {
        const isActive = window.appState.filters.category === cat.name;
        html += `
            <button class="chip ${isActive ? 'active' : ''}" data-cat="${cat.name}">
                ${cat.name}
            </button>
        `;
    });

    container.innerHTML = html;
}

/**
 * Populate Dropdowns for Filters and Admin Forms
 */
function populateFilterDropdowns() {
    const catSelect = document.getElementById('categoryFilterSelect');
    const mfgSelect = document.getElementById('manufacturerFilterSelect');
    const adminMfgSelect = document.getElementById('adminProdManufacturer');
    const adminCatSelect = document.getElementById('adminProdCategories');

    if (catSelect) {
        catSelect.innerHTML = '<option value="">Todas las categorías</option>' + 
            window.appState.categories.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
    }

    if (mfgSelect) {
        mfgSelect.innerHTML = '<option value="">Todos los fabricantes</option>' + 
            window.appState.manufacturers.map(m => `<option value="${m.name}">${m.name}</option>`).join('');
    }

    if (adminMfgSelect) {
        adminMfgSelect.innerHTML = window.appState.manufacturers.map(m => `<option value="${m.id}">${m.name}</option>`).join('');
    }

    if (adminCatSelect) {
        adminCatSelect.innerHTML = window.appState.categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    }
}

/**
 * Render Product Cards Grid
 */
function renderCatalogGrid() {
    const container = document.getElementById('productsGridContainer');
    const countText = document.getElementById('productCountText');
    const emptyState = document.getElementById('noProductsEmptyState');
    if (!container) return;

    const filtered = window.appState.getFilteredProducts();

    if (countText) countText.textContent = filtered.length;

    if (filtered.length === 0) {
        container.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    }

    if (emptyState) emptyState.classList.add('hidden');

    container.innerHTML = filtered.map(p => window.Components.renderProductCard(p)).join('');
}

/**
 * Render Cart Drawer UI
 */
function renderCartUI() {
    const badgeCount = document.getElementById('cartBadgeCount');
    const bodyItems = document.getElementById('cartBodyItems');
    const subtotalEl = document.getElementById('cartSubtotal');
    const totalEl = document.getElementById('cartTotal');

    const totalCount = window.appState.getCartItemCount();
    const totalPrice = window.appState.getCartTotal();

    if (badgeCount) {
        badgeCount.textContent = totalCount;
        badgeCount.classList.toggle('hidden', totalCount === 0);
    }

    if (bodyItems) {
        if (window.appState.cart.length === 0) {
            bodyItems.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-basket-shopping empty-icon"></i>
                    <h4>Tu carrito está vacío</h4>
                    <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;">Agrega productos desde el catálogo para comenzar tu compra.</p>
                </div>
            `;
        } else {
            bodyItems.innerHTML = window.appState.cart.map(item => window.Components.renderCartItem(item)).join('');
        }
    }

    if (subtotalEl) subtotalEl.textContent = window.Components.formatCurrency(totalPrice);
    if (totalEl) totalEl.textContent = window.Components.formatCurrency(totalPrice);
}

/**
 * Render User Navigation UI
 */
function renderUserUI() {
    const authBtn = document.getElementById('openAuthModalBtn');
    const userDropdown = document.getElementById('userDropdown');
    const emailText = document.getElementById('userEmailText');
    const roleBadge = document.getElementById('userRoleBadge');
    const avatar = document.getElementById('userAvatar');
    const adminNavLink = document.getElementById('adminNavLinkItem');
    const navAdminPanel = document.getElementById('navAdminPanel');

    if (window.appState.user) {
        if (authBtn) authBtn.classList.add('hidden');
        if (emailText) emailText.textContent = window.appState.user.email;
        if (roleBadge) roleBadge.textContent = window.appState.user.role;
        if (avatar) avatar.textContent = (window.appState.user.email || 'U').charAt(0).toUpperCase();

        const isAdmin = window.appState.isAdmin();
        if (adminNavLink) adminNavLink.classList.toggle('hidden', !isAdmin);
        if (navAdminPanel) navAdminPanel.classList.toggle('hidden', !isAdmin);
    } else {
        if (authBtn) authBtn.classList.remove('hidden');
        if (userDropdown) userDropdown.classList.add('hidden');
        if (adminNavLink) adminNavLink.classList.add('hidden');
    }
}

/**
 * Update Theme Icon & UI
 */
function updateThemeUI() {
    const btn = document.getElementById('themeToggleBtn');
    if (!btn) return;
    const isDark = window.appState.theme === 'dark';
    btn.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
}

/**
 * Setup All Event Listeners
 */
function setupEventListeners() {
    // --- Navigation Links (SPA View Switching) ---
    document.querySelectorAll('[data-view]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const viewName = link.getAttribute('data-view');
            switchView(viewName);
        });
    });

    // Theme Toggle
    document.getElementById('themeToggleBtn')?.addEventListener('click', () => {
        const nextTheme = window.appState.theme === 'light' ? 'dark' : 'light';
        window.appState.setTheme(nextTheme);
    });

    // Manual API Health Re-check
    document.getElementById('toggleApiModeBtn')?.addEventListener('click', async () => {
        window.Components.showToast("Verificando servidor backend...", "warning");
        const isOnline = await window.apiService.checkBackendHealth();
        updateApiStatusUI(isOnline);
        await initializeApp();
        window.Components.showToast(isOnline ? "¡Conectado exitosamente al Backend Live!" : "Modo Demostración activado.", isOnline ? "success" : "warning");
    });

    // --- Search Autocomplete & Filter Event Listeners ---
    const searchInput = document.getElementById('globalSearchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const searchDropdown = document.getElementById('searchResultsDropdown');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value;
            window.appState.setFilter('search', query);
            clearSearchBtn?.classList.toggle('hidden', !query);

            if (query.trim().length > 1) {
                const results = window.appState.getFilteredProducts().slice(0, 5);
                if (results.length > 0) {
                    searchDropdown.innerHTML = results.map(p => `
                        <div class="search-item" data-id="${p.id}">
                            <img src="${p.imageUrl}" alt="${p.name}">
                            <div class="search-item-info">
                                <div class="search-item-title">${p.name}</div>
                                <div class="search-item-price">${window.Components.formatCurrency(p.price)}</div>
                            </div>
                        </div>
                    `).join('');
                    searchDropdown.classList.remove('hidden');
                } else {
                    searchDropdown.classList.add('hidden');
                }
            } else {
                searchDropdown?.classList.add('hidden');
            }
        });
    }

    clearSearchBtn?.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        window.appState.setFilter('search', '');
        clearSearchBtn.classList.add('hidden');
        searchDropdown?.classList.add('hidden');
    });

    // Click outside search dropdown
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.header-search')) {
            searchDropdown?.classList.add('hidden');
        }
    });

    // Search item click inside dropdown
    searchDropdown?.addEventListener('click', (e) => {
        const item = e.target.closest('.search-item');
        if (item) {
            const id = item.getAttribute('data-id');
            openProductQuickView(id);
            searchDropdown.classList.add('hidden');
        }
    });

    // Category Chips Click
    document.getElementById('categoryChipsList')?.addEventListener('click', (e) => {
        const chip = e.target.closest('.chip');
        if (chip) {
            const catName = chip.getAttribute('data-cat');
            window.appState.setFilter('category', catName);
            renderCategoryChips();
        }
    });

    // Category & Manufacturer Select Filters
    document.getElementById('categoryFilterSelect')?.addEventListener('change', (e) => {
        window.appState.setFilter('category', e.target.value);
        renderCategoryChips();
    });

    document.getElementById('manufacturerFilterSelect')?.addEventListener('change', (e) => {
        window.appState.setFilter('manufacturer', e.target.value);
    });

    // Price Range Filter
    const priceRangeInput = document.getElementById('priceRangeInput');
    const priceRangeValue = document.getElementById('priceRangeValue');
    if (priceRangeInput && priceRangeValue) {
        priceRangeInput.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            priceRangeValue.textContent = window.Components.formatCurrency(val);
            window.appState.setFilter('maxPrice', val);
        });
    }

    // In Stock Only Checkbox
    document.getElementById('inStockOnlyCheckbox')?.addEventListener('change', (e) => {
        window.appState.setFilter('inStockOnly', e.target.checked);
    });

    // Sorting Select
    document.getElementById('sortSelect')?.addEventListener('change', (e) => {
        window.appState.setFilter('sort', e.target.value);
    });

    // Reset Filters Buttons
    const resetFn = () => {
        window.appState.resetFilters();
        if (searchInput) searchInput.value = '';
        if (priceRangeInput) priceRangeInput.value = 5000;
        if (priceRangeValue) priceRangeValue.textContent = '$5,000.00';
        document.getElementById('categoryFilterSelect').value = '';
        document.getElementById('manufacturerFilterSelect').value = '';
        document.getElementById('inStockOnlyCheckbox').checked = false;
        renderCategoryChips();
    };
    document.getElementById('resetFiltersBtn')?.addEventListener('click', resetFn);
    document.getElementById('clearFiltersStateBtn')?.addEventListener('click', resetFn);

    // --- Product Cards Click Delegation (Add to cart & Quick View) ---
    document.getElementById('productsGridContainer')?.addEventListener('click', (e) => {
        const addCartBtn = e.target.closest('.add-cart-btn');
        if (addCartBtn) {
            const prodId = addCartBtn.getAttribute('data-id');
            const prod = window.appState.products.find(p => p.id === prodId);
            if (prod && prod.stock > 0) {
                window.appState.addToCart(prod, 1);
                window.Components.showToast(`"${prod.name}" añadido al carrito.`, "success");
            }
            return;
        }

        const quickViewBtn = e.target.closest('.quick-view-btn');
        if (quickViewBtn) {
            const prodId = quickViewBtn.getAttribute('data-id');
            openProductQuickView(prodId);
        }
    });

    // --- Cart Drawer Controls ---
    const openCartBtn = document.getElementById('openCartBtn');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartDrawer = document.getElementById('cartDrawer');

    const toggleCart = (open) => {
        cartOverlay?.classList.toggle('hidden', !open);
        cartDrawer?.classList.toggle('hidden', !open);
    };

    openCartBtn?.addEventListener('click', () => toggleCart(true));
    closeCartBtn?.addEventListener('click', () => toggleCart(false));
    cartOverlay?.addEventListener('click', () => toggleCart(false));

    // Cart Quantity Buttons Delegation
    document.getElementById('cartBodyItems')?.addEventListener('click', (e) => {
        const incBtn = e.target.closest('.inc-qty-btn');
        const decBtn = e.target.closest('.dec-qty-btn');
        const removeBtn = e.target.closest('.remove-cart-item');

        if (incBtn) {
            const id = incBtn.getAttribute('data-id');
            const item = window.appState.cart.find(i => i.product.id === id);
            if (item) window.appState.updateCartQuantity(id, item.quantity + 1);
        }
        if (decBtn) {
            const id = decBtn.getAttribute('data-id');
            const item = window.appState.cart.find(i => i.product.id === id);
            if (item) window.appState.updateCartQuantity(id, item.quantity - 1);
        }
        if (removeBtn) {
            const id = removeBtn.getAttribute('data-id');
            window.appState.removeFromCart(id);
            window.Components.showToast("Producto eliminado del carrito.", "warning");
        }
    });

    document.getElementById('clearCartBtn')?.addEventListener('click', () => {
        window.appState.clearCart();
        window.Components.showToast("Carrito vaciado.", "warning");
    });

    // Proceed to Checkout
    document.getElementById('proceedCheckoutBtn')?.addEventListener('click', () => {
        if (window.appState.cart.length === 0) {
            window.Components.showToast("Agrega productos al carrito antes de pagar.", "warning");
            return;
        }
        toggleCart(false);
        openCheckoutModal();
    });

    // --- Checkout & Payment Form ---
    const checkoutOverlay = document.getElementById('checkoutModalOverlay');
    const closeCheckoutBtn = document.getElementById('closeCheckoutModalBtn');
    const cancelCheckoutBtn = document.getElementById('cancelCheckoutBtn');
    const checkoutForm = document.getElementById('checkoutForm');

    const closeCheckout = () => checkoutOverlay?.classList.add('hidden');
    closeCheckoutBtn?.addEventListener('click', closeCheckout);
    cancelCheckoutBtn?.addEventListener('click', closeCheckout);

    // Payment Method Selection Toggle
    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            document.querySelectorAll('.payment-method-card').forEach(card => card.classList.remove('active'));
            e.target.closest('.payment-method-card')?.classList.add('active');

            const ccBox = document.getElementById('creditCardFields');
            if (ccBox) ccBox.style.display = e.target.value === 'CREDIT_CARD' ? 'block' : 'none';
        });
    });

    checkoutForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('submitOrderBtn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Procesando Orden...';

        try {
            const orderPayload = {
                items: window.appState.cart.map(item => ({
                    productId: item.product.id,
                    quantity: item.quantity
                }))
            };

            const createdOrder = await window.apiService.createOrder(orderPayload);
            window.appState.clearCart();
            closeCheckout();

            window.Components.showToast(`Orden #${createdOrder.id} creada. Consultando pasarela de pago...`, "warning");

            // Poll payment microservice for up to 3 seconds for RabbitMQ & Mercado Pago preference creation
            let payment = null;
            for (let i = 0; i < 6; i++) {
                await new Promise(resolve => setTimeout(resolve, 500));
                payment = await window.apiService.getPaymentForOrder(createdOrder.id);
                if (payment && payment.initPoint) break;
            }

            if (payment && payment.initPoint) {
                window.Components.showToast(`¡Redirigiendo a Mercado Pago!`, "success");
                window.location.href = payment.initPoint;
                return;
            } else {
                window.Components.showToast(`¡Orden #${createdOrder.id} realizada con éxito!`, "success");
            }

            switchView('orders');

        } catch (err) {
            window.Components.showToast(`Error al procesar orden: ${err.message}`, "error");
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fa-solid fa-check-circle"></i> Confirmar y Pagar Orden';
        }
    });

    // --- Product Modal Controls ---
    const productModalOverlay = document.getElementById('productModalOverlay');
    const closeProductModalBtn = document.getElementById('closeProductModalBtn');
    closeProductModalBtn?.addEventListener('click', () => productModalOverlay?.classList.add('hidden'));

    document.getElementById('productModalContent')?.addEventListener('click', (e) => {
        const modalCartBtn = e.target.closest('.add-cart-btn-modal');
        if (modalCartBtn) {
            const id = modalCartBtn.getAttribute('data-id');
            const prod = window.appState.products.find(p => p.id === id);
            if (prod && prod.stock > 0) {
                window.appState.addToCart(prod, 1);
                window.Components.showToast(`"${prod.name}" añadido al carrito.`, "success");
                productModalOverlay?.classList.add('hidden');
            }
        }
    });

    // --- User Auth Modal & Dropdown ---
    const authOverlay = document.getElementById('authModalOverlay');
    const openAuthBtn = document.getElementById('openAuthModalBtn');
    const closeAuthBtn = document.getElementById('closeAuthModalBtn');
    const loginTabBtn = document.getElementById('loginTabBtn');
    const registerTabBtn = document.getElementById('registerTabBtn');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const userMenuWrapper = document.getElementById('userMenuWrapper');
    const userDropdown = document.getElementById('userDropdown');

    openAuthBtn?.addEventListener('click', () => authOverlay?.classList.remove('hidden'));
    closeAuthBtn?.addEventListener('click', () => authOverlay?.classList.add('hidden'));

    // User Avatar / Dropdown toggle
    document.getElementById('userAvatar')?.parentElement?.parentElement?.addEventListener('click', (e) => {
        if (window.appState.user) {
            userDropdown?.classList.toggle('hidden');
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('#userMenuWrapper')) {
            userDropdown?.classList.add('hidden');
        }
    });

    loginTabBtn?.addEventListener('click', () => {
        loginTabBtn.classList.add('active');
        registerTabBtn.classList.remove('active');
        loginForm.classList.remove('hidden');
        loginForm.classList.add('active');
        registerForm.classList.add('hidden');
    });

    registerTabBtn?.addEventListener('click', () => {
        registerTabBtn.classList.add('active');
        loginTabBtn.classList.remove('active');
        registerForm.classList.remove('hidden');
        registerForm.classList.add('active');
        loginForm.classList.add('hidden');
    });

    // Demo Accounts Quick Fill
    document.getElementById('demoAdminBtn')?.addEventListener('click', () => {
        document.getElementById('loginEmail').value = 'admin@mystore.example.com';
        document.getElementById('loginPassword').value = 'password';
    });

    document.getElementById('demoUserBtn')?.addEventListener('click', () => {
        document.getElementById('loginEmail').value = 'customer@mystore.example.com';
        document.getElementById('loginPassword').value = 'password';
    });

    // Login Submit
    loginForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const pass = document.getElementById('loginPassword').value;

        try {
            const authRes = await window.apiService.login(email, pass);
            window.appState.setUserSession(authRes);
            authOverlay?.classList.add('hidden');
            window.Components.showToast(`Bienvenido de nuevo, ${email}`, "success");
        } catch (err) {
            window.Components.showToast(`Error al iniciar sesión: ${err.message}`, "error");
        }
    });

    // Register Submit
    registerForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const pass = document.getElementById('regPassword').value;
        const role = document.getElementById('regRole').value;

        try {
            const authRes = await window.apiService.register(name, email, pass, role);
            window.appState.setUserSession(authRes);
            authOverlay?.classList.add('hidden');
            window.Components.showToast(`¡Cuenta creada con éxito! Sesión iniciada.`, "success");
        } catch (err) {
            window.Components.showToast(`Error de registro: ${err.message}`, "error");
        }
    });

    // Logout
    document.getElementById('logoutBtn')?.addEventListener('click', () => {
        window.appState.logout();
        switchView('catalog');
        window.Components.showToast("Sesión cerrada correctamente.", "warning");
    });

    // --- Admin Dashboard Tabs & Action Modals ---
    document.querySelectorAll('.admin-tab-btn').forEach(tabBtn => {
        tabBtn.addEventListener('click', () => {
            document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.add('hidden'));

            tabBtn.classList.add('active');
            const targetTab = tabBtn.getAttribute('data-tab');
            document.getElementById(targetTab)?.classList.remove('hidden');
        });
    });

    // Admin Create/Edit Product Modals
    const adminProductOverlay = document.getElementById('adminProductModalOverlay');
    const openCreateProdBtn = document.getElementById('openCreateProductModalBtn');
    const closeAdminProdBtn = document.getElementById('closeAdminProductModalBtn');
    const cancelAdminProdBtn = document.getElementById('cancelAdminProductBtn');
    const adminProductForm = document.getElementById('adminProductForm');

    const closeAdminProductModal = () => adminProductOverlay?.classList.add('hidden');
    closeAdminProdBtn?.addEventListener('click', closeAdminProductModal);
    cancelAdminProdBtn?.addEventListener('click', closeAdminProductModal);

    openCreateProdBtn?.addEventListener('click', () => {
        document.getElementById('adminProductModalTitle').textContent = 'Crear Nuevo Producto';
        document.getElementById('adminProductId').value = '';
        adminProductForm.reset();
        populateFilterDropdowns();
        adminProductOverlay?.classList.remove('hidden');
    });

    adminProductForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('adminProductId').value;
        const sku = document.getElementById('adminProdSku').value;
        const name = document.getElementById('adminProdName').value;
        const description = document.getElementById('adminProdDesc').value;
        const price = parseFloat(document.getElementById('adminProdPrice').value);
        const stock = parseInt(document.getElementById('adminProdStock').value);
        const imageUrl = document.getElementById('adminProdImage').value;
        const manufacturerId = document.getElementById('adminProdManufacturer').value;

        const catSelect = document.getElementById('adminProdCategories');
        const categoryIds = Array.from(catSelect.selectedOptions).map(opt => opt.value);

        const payload = { sku, name, description, price, stock, imageUrl, manufacturerId, categoryIds };

        try {
            if (id) {
                await window.apiService.updateProduct(id, payload);
                window.Components.showToast("Producto actualizado exitosamente.", "success");
            } else {
                await window.apiService.createProduct(payload);
                window.Components.showToast("Producto creado exitosamente.", "success");
            }

            closeAdminProductModal();
            const products = await window.apiService.getProducts();
            window.appState.products = products;
            renderCatalogGrid();
            renderAdminProductsTable();
        } catch (err) {
            window.Components.showToast(`Error al guardar producto: ${err.message}`, "error");
        }
    });

    // Admin Category Create Modal
    const adminCategoryOverlay = document.getElementById('adminCategoryModalOverlay');
    const openCreateCatBtn = document.getElementById('openCreateCategoryModalBtn');
    const closeAdminCatBtn = document.getElementById('closeAdminCategoryModalBtn');
    const cancelAdminCatBtn = document.getElementById('cancelAdminCategoryBtn');
    const adminCategoryForm = document.getElementById('adminCategoryForm');

    openCreateCatBtn?.addEventListener('click', () => adminCategoryOverlay?.classList.remove('hidden'));
    closeAdminCatBtn?.addEventListener('click', () => adminCategoryOverlay?.classList.add('hidden'));
    cancelAdminCatBtn?.addEventListener('click', () => adminCategoryOverlay?.classList.add('hidden'));

    adminCategoryForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('adminCatName').value;
        const description = document.getElementById('adminCatDesc').value;

        try {
            await window.apiService.createCategory({ name, description });
            adminCategoryOverlay?.classList.add('hidden');
            adminCategoryForm.reset();
            window.appState.categories = await window.apiService.getCategories();
            populateFilterDropdowns();
            renderCategoryChips();
            renderAdminCategoriesTable();
            window.Components.showToast("Categoría creada con éxito.", "success");
        } catch (err) {
            window.Components.showToast(`Error: ${err.message}`, "error");
        }
    });

    // Admin Manufacturer Create Modal
    const adminManufOverlay = document.getElementById('adminManufacturerModalOverlay');
    const openCreateManufBtn = document.getElementById('openCreateManufacturerModalBtn');
    const closeAdminManufBtn = document.getElementById('closeAdminManufacturerModalBtn');
    const cancelAdminManufBtn = document.getElementById('cancelAdminManufacturerBtn');
    const adminManufacturerForm = document.getElementById('adminManufacturerForm');

    openCreateManufBtn?.addEventListener('click', () => adminManufOverlay?.classList.remove('hidden'));
    closeAdminManufBtn?.addEventListener('click', () => adminManufOverlay?.classList.add('hidden'));
    cancelAdminManufBtn?.addEventListener('click', () => adminManufOverlay?.classList.add('hidden'));

    adminManufacturerForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('adminManufName').value;
        const address = document.getElementById('adminManufAddress').value;

        try {
            await window.apiService.createManufacturer({ name, address });
            adminManufOverlay?.classList.add('hidden');
            adminManufacturerForm.reset();
            window.appState.manufacturers = await window.apiService.getManufacturers();
            populateFilterDropdowns();
            renderAdminManufacturersTable();
            window.Components.showToast("Fabricante creado con éxito.", "success");
        } catch (err) {
            window.Components.showToast(`Error: ${err.message}`, "error");
        }
    });

    // Admin Products Table Actions (Edit / Delete)
    document.getElementById('adminProductsTableBody')?.addEventListener('click', async (e) => {
        const editBtn = e.target.closest('.edit-admin-product-btn');
        const deleteBtn = e.target.closest('.delete-admin-product-btn');

        if (editBtn) {
            const id = editBtn.getAttribute('data-id');
            const prod = window.appState.products.find(p => p.id === id);
            if (prod) {
                document.getElementById('adminProductModalTitle').textContent = 'Editar Producto';
                document.getElementById('adminProductId').value = prod.id;
                document.getElementById('adminProdSku').value = prod.sku;
                document.getElementById('adminProdName').value = prod.name;
                document.getElementById('adminProdDesc').value = prod.description || '';
                document.getElementById('adminProdPrice').value = prod.price;
                document.getElementById('adminProdStock').value = prod.stock;
                document.getElementById('adminProdImage').value = prod.imageUrl;

                populateFilterDropdowns();
                adminProductOverlay?.classList.remove('hidden');
            }
        }

        if (deleteBtn) {
            const id = deleteBtn.getAttribute('data-id');
            if (confirm("¿Estás seguro de desactivar/eliminar este producto?")) {
                try {
                    await window.apiService.deleteProduct(id);
                    window.appState.products = await window.apiService.getProducts();
                    renderCatalogGrid();
                    renderAdminProductsTable();
                    window.Components.showToast("Producto desactivado/eliminado.", "warning");
                } catch (err) {
                    window.Components.showToast(`Error al eliminar: ${err.message}`, "error");
                }
            }
        }
    });

    // Admin Categories Table Actions
    document.getElementById('adminCategoriesTableBody')?.addEventListener('click', async (e) => {
        const deleteBtn = e.target.closest('.delete-admin-cat-btn');
        if (deleteBtn) {
            const id = deleteBtn.getAttribute('data-id');
            if (confirm("¿Eliminar esta categoría?")) {
                await window.apiService.deleteCategory(id);
                window.appState.categories = await window.apiService.getCategories();
                renderCategoryChips();
                populateFilterDropdowns();
                renderAdminCategoriesTable();
                window.Components.showToast("Categoría eliminada.", "warning");
            }
        }
    });

    // Admin Manufacturers Table Actions
    document.getElementById('adminManufacturersTableBody')?.addEventListener('click', async (e) => {
        const deleteBtn = e.target.closest('.delete-admin-mfg-btn');
        if (deleteBtn) {
            const id = deleteBtn.getAttribute('data-id');
            if (confirm("¿Eliminar este fabricante?")) {
                await window.apiService.deleteManufacturer(id);
                window.appState.manufacturers = await window.apiService.getManufacturers();
                populateFilterDropdowns();
                renderAdminManufacturersTable();
                window.Components.showToast("Fabricante eliminado.", "warning");
            }
        }
    });

    // Pay with Mercado Pago button listener on user orders view
    document.getElementById('ordersContent')?.addEventListener('click', async (e) => {
        const payBtn = e.target.closest('.pay-mercadopago-btn');
        if (payBtn) {
            const orderId = payBtn.getAttribute('data-order-id');
            payBtn.disabled = true;
            payBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Cargando...';

            try {
                const payment = await window.apiService.getPaymentForOrder(orderId);
                if (payment && payment.initPoint) {
                    window.Components.showToast("Redirigiendo a pasarela de Mercado Pago...", "success");
                    window.location.href = payment.initPoint;
                } else {
                    window.Components.showToast("No se encontró preferencia de pago para esta orden.", "warning");
                }
            } catch (err) {
                window.Components.showToast("Error al obtener datos de pago.", "error");
            } finally {
                payBtn.disabled = false;
                payBtn.innerHTML = '<i class="fa-solid fa-credit-card"></i> Pagar con Mercado Pago';
            }
        }
    });
}

/**
 * Switch Active View (SPA Navigation)
 */
async function switchView(viewName) {
    window.appState.currentView = viewName;

    // Update nav links active state
    document.querySelectorAll('.nav-link').forEach(link => {
        const target = link.getAttribute('data-view');
        link.classList.toggle('active', target === viewName);
    });

    // Toggle view section visibility
    document.querySelectorAll('.view-section').forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('active');
    });

    const targetSection = document.getElementById(`${viewName}View`);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        targetSection.classList.add('active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Load specific view data
    if (viewName === 'categories') {
        renderCategoriesView();
    } else if (viewName === 'manufacturers') {
        renderManufacturersView();
    } else if (viewName === 'orders') {
        renderOrdersView();
    } else if (viewName === 'admin') {
        renderAdminDashboard();
    }
}

/**
 * Render Quick View Modal
 */
function openProductQuickView(productId) {
    const prod = window.appState.products.find(p => p.id === productId);
    if (!prod) return;

    const modalContent = document.getElementById('productModalContent');
    const overlay = document.getElementById('productModalOverlay');

    if (modalContent && overlay) {
        modalContent.innerHTML = window.Components.renderProductQuickView(prod);
        overlay.classList.remove('hidden');
    }
}

/**
 * Open Checkout Modal
 */
function openCheckoutModal() {
    const overlay = document.getElementById('checkoutModalOverlay');
    const checkoutTotal = document.getElementById('checkoutTotalAmount');
    if (checkoutTotal) {
        checkoutTotal.textContent = window.Components.formatCurrency(window.appState.getCartTotal());
    }
    overlay?.classList.remove('hidden');
}

/**
 * Render Categories Grid View
 */
function renderCategoriesView() {
    const container = document.getElementById('categoriesGridContainer');
    if (!container) return;

    container.innerHTML = window.appState.categories.map(cat => `
        <div class="info-card" data-cat="${cat.name}">
            <div class="info-card-icon"><i class="fa-solid fa-layer-group"></i></div>
            <div class="info-card-body">
                <h3>${cat.name}</h3>
                <p>${cat.description || 'Sin descripción disponible.'}</p>
                <button class="btn btn-outline btn-sm filter-by-cat-btn" data-cat="${cat.name}" style="margin-top: 1rem;">
                    Ver Productos <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `).join('');

    container.querySelectorAll('.filter-by-cat-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cat = btn.getAttribute('data-cat');
            window.appState.setFilter('category', cat);
            switchView('catalog');
            renderCategoryChips();
        });
    });
}

/**
 * Render Manufacturers Grid View
 */
function renderManufacturersView() {
    const container = document.getElementById('manufacturersGridContainer');
    if (!container) return;

    container.innerHTML = window.appState.manufacturers.map(mfg => `
        <div class="info-card">
            <div class="info-card-icon"><i class="fa-solid fa-industry"></i></div>
            <div class="info-card-body">
                <h3>${mfg.name}</h3>
                <p><i class="fa-solid fa-location-dot"></i> ${mfg.address || 'Ubicación Global'}</p>
                <button class="btn btn-outline btn-sm filter-by-mfg-btn" data-mfg="${mfg.name}" style="margin-top: 1rem;">
                    Ver Catálogo <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `).join('');

    container.querySelectorAll('.filter-by-mfg-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const mfg = btn.getAttribute('data-mfg');
            window.appState.setFilter('manufacturer', mfg);
            switchView('catalog');
        });
    });
}

/**
 * Render User Orders History View
 */
async function renderOrdersView() {
    const container = document.getElementById('ordersContent');
    if (!container) return;

    container.innerHTML = `<div style="text-align: center; padding: 2rem;"><i class="fa-solid fa-spinner fa-spin fa-2x"></i></div>`;

    const orders = await window.apiService.getUserOrders();
    window.appState.orders = orders || [];

    if (orders.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-clock-rotate-left empty-icon"></i>
                <h3>No tienes pedidos aún</h3>
                <p>Realiza tu primera compra en nuestro catálogo.</p>
                <button class="btn btn-primary" onclick="switchView('catalog')">Ir al Catálogo</button>
            </div>
        `;
        return;
    }

    container.innerHTML = orders.map(o => window.Components.renderOrderCard(o)).join('');
}

/**
 * Render Admin Dashboard
 */
async function renderAdminDashboard() {
    const statProds = document.getElementById('statTotalProducts');
    const statCats = document.getElementById('statTotalCategories');
    const statMfgs = document.getElementById('statTotalManufacturers');
    const statOrders = document.getElementById('statTotalOrders');

    if (statProds) statProds.textContent = window.appState.products.length;
    if (statCats) statCats.textContent = window.appState.categories.length;
    if (statMfgs) statMfgs.textContent = window.appState.manufacturers.length;

    const allOrders = await window.apiService.getAllOrdersAdmin();
    if (statOrders) statOrders.textContent = (allOrders || []).length;

    renderAdminProductsTable();
    renderAdminCategoriesTable();
    renderAdminManufacturersTable();
    renderAdminOrdersTable(allOrders);
}

function renderAdminProductsTable() {
    const tbody = document.getElementById('adminProductsTableBody');
    if (!tbody) return;

    tbody.innerHTML = window.appState.products.map(p => window.Components.renderAdminProductRow(p)).join('');
}

function renderAdminCategoriesTable() {
    const tbody = document.getElementById('adminCategoriesTableBody');
    if (!tbody) return;

    tbody.innerHTML = window.appState.categories.map(c => `
        <tr>
            <td><code>${c.id}</code></td>
            <td><strong>${c.name}</strong></td>
            <td>${c.description || 'Sin descripción'}</td>
            <td>
                <button class="btn btn-danger-light btn-sm delete-admin-cat-btn" data-id="${c.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function renderAdminManufacturersTable() {
    const tbody = document.getElementById('adminManufacturersTableBody');
    if (!tbody) return;

    tbody.innerHTML = window.appState.manufacturers.map(m => `
        <tr>
            <td><code>${m.id}</code></td>
            <td><strong>${m.name}</strong></td>
            <td>${m.address || 'N/A'}</td>
            <td>
                <button class="btn btn-danger-light btn-sm delete-admin-mfg-btn" data-id="${m.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function renderAdminOrdersTable(orders) {
    const tbody = document.getElementById('adminOrdersTableBody');
    if (!tbody) return;

    tbody.innerHTML = (orders || []).map(o => `
        <tr>
            <td><code>${o.id}</code></td>
            <td><small>${o.userId || 'N/A'}</small></td>
            <td><strong>${window.Components.formatCurrency(o.totalAmount)}</strong></td>
            <td><span class="status-badge ${o.status}">${o.status}</span></td>
            <td>${window.Components.formatDate(o.createdAt)}</td>
            <td>${(o.items || []).length} productos</td>
        </tr>
    `).join('');
}
