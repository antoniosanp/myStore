/**
 * myStore Frontend - Reactive Application State Management
 */

class AppState {
    constructor() {
        // Initial state
        this.products = [];
        this.categories = [];
        this.manufacturers = [];
        this.orders = [];

        this.cart = this.loadCartFromStorage();
        this.user = this.loadUserFromStorage();
        this.theme = localStorage.getItem(window.CONFIG.THEME_KEY) || 'light';

        this.currentView = 'catalog';
        this.selectedProductModal = null;

        // Catalog Filters State
        this.filters = {
            search: '',
            category: '',
            manufacturer: '',
            maxPrice: 5000,
            inStockOnly: false,
            sort: 'newest'
        };

        // Listeners for Pub/Sub pattern
        this.listeners = [];
    }

    // Subscribe to state updates
    subscribe(listener) {
        this.listeners.push(listener);
    }

    notify(changeType) {
        this.listeners.forEach(cb => cb(this, changeType));
    }

    // --- CART MANAGEMENT ---
    loadCartFromStorage() {
        try {
            const raw = localStorage.getItem(window.CONFIG.CART_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            return [];
        }
    }

    saveCartToStorage() {
        localStorage.setItem(window.CONFIG.CART_KEY, JSON.stringify(this.cart));
        this.notify('cart');
    }

    addToCart(product, quantity = 1) {
        const existing = this.cart.find(item => item.product.id === product.id);
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.cart.push({
                product: product,
                quantity: quantity
            });
        }
        this.saveCartToStorage();
    }

    updateCartQuantity(productId, quantity) {
        if (quantity <= 0) {
            this.removeFromCart(productId);
            return;
        }
        const item = this.cart.find(i => i.product.id === productId);
        if (item) {
            item.quantity = quantity;
            this.saveCartToStorage();
        }
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.product.id !== productId);
        this.saveCartToStorage();
    }

    clearCart() {
        this.cart = [];
        this.saveCartToStorage();
    }

    getCartTotal() {
        return this.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    }

    getCartItemCount() {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    // --- USER / AUTH MANAGEMENT ---
    loadUserFromStorage() {
        try {
            const raw = localStorage.getItem(window.CONFIG.USER_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    }

    setUserSession(authData) {
        localStorage.setItem(window.CONFIG.ACCESS_TOKEN_KEY, authData.accessToken);
        if (authData.refreshToken) {
            localStorage.setItem(window.CONFIG.REFRESH_TOKEN_KEY, authData.refreshToken);
        }
        const userInfo = {
            email: authData.email,
            role: authData.role
        };
        localStorage.setItem(window.CONFIG.USER_KEY, JSON.stringify(userInfo));
        this.user = userInfo;
        this.notify('user');
    }

    logout() {
        localStorage.removeItem(window.CONFIG.ACCESS_TOKEN_KEY);
        localStorage.removeItem(window.CONFIG.REFRESH_TOKEN_KEY);
        localStorage.removeItem(window.CONFIG.USER_KEY);
        this.user = null;
        this.notify('user');
    }

    isAdmin() {
        return this.user && (this.user.role === 'ROLE_ADMIN' || this.user.role === 'ADMIN');
    }

    // --- FILTERS MANAGEMENT ---
    setFilter(key, value) {
        this.filters[key] = value;
        this.notify('filters');
    }

    resetFilters() {
        this.filters = {
            search: '',
            category: '',
            manufacturer: '',
            maxPrice: 5000,
            inStockOnly: false,
            sort: 'newest'
        };
        this.notify('filters');
    }

    // Filtered Products Computing Logic
    getFilteredProducts() {
        return this.products.filter(product => {
            // Search query filter (matches name, SKU, description, category, brand)
            if (this.filters.search) {
                const q = this.filters.search.toLowerCase();
                const matchName = product.name.toLowerCase().includes(q);
                const matchSku = product.sku.toLowerCase().includes(q);
                const matchDesc = (product.description || '').toLowerCase().includes(q);
                const matchBrand = (product.manufacturerName || '').toLowerCase().includes(q);
                if (!matchName && !matchSku && !matchDesc && !matchBrand) return false;
            }

            // Category filter
            if (this.filters.category) {
                if (!product.categoryNames || !product.categoryNames.includes(this.filters.category)) {
                    return false;
                }
            }

            // Manufacturer filter
            if (this.filters.manufacturer) {
                if (product.manufacturerName !== this.filters.manufacturer) {
                    return false;
                }
            }

            // Price filter
            if (product.price > this.filters.maxPrice) {
                return false;
            }

            // In-stock filter
            if (this.filters.inStockOnly && product.stock <= 0) {
                return false;
            }

            return true;
        }).sort((a, b) => {
            if (this.filters.sort === 'price-asc') return a.price - b.price;
            if (this.filters.sort === 'price-desc') return b.price - a.price;
            if (this.filters.sort === 'name-asc') return a.name.localeCompare(b.name);
            // Default newest
            return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        });
    }

    // --- THEME TOGGLE ---
    setTheme(newTheme) {
        this.theme = newTheme;
        localStorage.setItem(window.CONFIG.THEME_KEY, newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        this.notify('theme');
    }
}

window.appState = new AppState();
