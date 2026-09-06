/**
 * myStore Frontend - API Client & Mock Fallback Layer
 */

class ApiService {
    constructor() {
        this.baseUrl = window.CONFIG ? window.CONFIG.API_BASE_URL : 'http://localhost:8080/api/v1';
        this.useMock = false; // Evaluated dynamically
        this.isOnline = null;
    }

    /**
     * Check if backend API is reachable
     */
    async checkBackendHealth() {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2000);
            
            const response = await fetch(`${this.baseUrl}/products`, {
                method: 'GET',
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            
            if (response.ok) {
                this.isOnline = true;
                this.useMock = false;
            } else {
                this.isOnline = false;
                this.useMock = true;
            }
        } catch (e) {
            this.isOnline = false;
            this.useMock = true;
        }
        return this.isOnline;
    }

    /**
     * Generic Helper for HTTP Requests with Auth Header Injection
     */
    async request(endpoint, options = {}) {
        const token = localStorage.getItem(window.CONFIG.ACCESS_TOKEN_KEY);
        
        const headers = {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            ...options.headers
        };

        const config = {
            ...options,
            headers
        };

        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, config);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: response.statusText }));
                throw new Error(errorData.message || `Error HTTP ${response.status}`);
            }
            if (response.status === 204) return null;
            return await response.json();
        } catch (error) {
            console.warn(`[API] Error request to ${endpoint}:`, error.message);
            throw error;
        }
    }

    // --- PRODUCTS API ---
    async getProducts() {
        if (this.useMock) {
            return window.MOCK_DATA.products;
        }
        try {
            return await this.request('/products');
        } catch (err) {
            this.useMock = true;
            return window.MOCK_DATA.products;
        }
    }

    async getProductById(id) {
        if (this.useMock) {
            return window.MOCK_DATA.products.find(p => p.id === id) || window.MOCK_DATA.products[0];
        }
        try {
            return await this.request(`/products/${id}`);
        } catch (err) {
            return window.MOCK_DATA.products.find(p => p.id === id);
        }
    }

    async createProduct(productData) {
        if (this.useMock) {
            const manuf = window.MOCK_DATA.manufacturers.find(m => m.id === productData.manufacturerId);
            const cats = window.MOCK_DATA.categories.filter(c => productData.categoryIds.includes(c.id)).map(c => c.name);
            
            const newProd = {
                id: 'p-' + Date.now(),
                sku: productData.sku,
                name: productData.name,
                description: productData.description || '',
                price: parseFloat(productData.price),
                stock: parseInt(productData.stock),
                imageUrl: productData.imageUrl || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80',
                isActive: true,
                manufacturerName: manuf ? manuf.name : 'Fabricante General',
                categoryNames: cats.length ? cats : ['General'],
                createdAt: new Date().toISOString()
            };
            window.MOCK_DATA.products.unshift(newProd);
            return newProd;
        }
        return await this.request('/products', {
            method: 'POST',
            body: JSON.stringify(productData)
        });
    }

    async updateProduct(id, productData) {
        if (this.useMock) {
            const index = window.MOCK_DATA.products.findIndex(p => p.id === id);
            if (index !== -1) {
                window.MOCK_DATA.products[index] = {
                    ...window.MOCK_DATA.products[index],
                    name: productData.name,
                    sku: productData.sku,
                    price: parseFloat(productData.price),
                    stock: parseInt(productData.stock),
                    description: productData.description,
                    imageUrl: productData.imageUrl || window.MOCK_DATA.products[index].imageUrl
                };
                return window.MOCK_DATA.products[index];
            }
        }
        return await this.request(`/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify(productData)
        });
    }

    async deleteProduct(id) {
        if (this.useMock) {
            window.MOCK_DATA.products = window.MOCK_DATA.products.filter(p => p.id !== id);
            return true;
        }
        return await this.request(`/products/${id}`, { method: 'DELETE' });
    }

    // --- CATEGORIES API ---
    async getCategories() {
        if (this.useMock) {
            return window.MOCK_DATA.categories;
        }
        try {
            return await this.request('/categories');
        } catch (err) {
            this.useMock = true;
            return window.MOCK_DATA.categories;
        }
    }

    async createCategory(catData) {
        if (this.useMock) {
            const newCat = {
                id: 'c-' + Date.now(),
                name: catData.name,
                description: catData.description || ''
            };
            window.MOCK_DATA.categories.push(newCat);
            return newCat;
        }
        return await this.request('/categories', {
            method: 'POST',
            body: JSON.stringify(catData)
        });
    }

    async deleteCategory(id) {
        if (this.useMock) {
            window.MOCK_DATA.categories = window.MOCK_DATA.categories.filter(c => c.id !== id);
            return true;
        }
        return await this.request(`/categories/${id}`, { method: 'DELETE' });
    }

    // --- MANUFACTURERS API ---
    async getManufacturers() {
        if (this.useMock) {
            return window.MOCK_DATA.manufacturers;
        }
        try {
            return await this.request('/manufacturers');
        } catch (err) {
            this.useMock = true;
            return window.MOCK_DATA.manufacturers;
        }
    }

    async createManufacturer(mfgData) {
        if (this.useMock) {
            const newMfg = {
                id: 'm-' + Date.now(),
                name: mfgData.name,
                address: mfgData.address || ''
            };
            window.MOCK_DATA.manufacturers.push(newMfg);
            return newMfg;
        }
        return await this.request('/manufacturers', {
            method: 'POST',
            body: JSON.stringify(mfgData)
        });
    }

    async deleteManufacturer(id) {
        if (this.useMock) {
            window.MOCK_DATA.manufacturers = window.MOCK_DATA.manufacturers.filter(m => m.id !== id);
            return true;
        }
        return await this.request(`/manufacturers/${id}`, { method: 'DELETE' });
    }

    // --- ORDERS API ---
    async getUserOrders() {
        if (this.useMock) {
            return window.MOCK_DATA.orders;
        }
        try {
            return await this.request('/orders');
        } catch (err) {
            return window.MOCK_DATA.orders;
        }
    }

    async getAllOrdersAdmin() {
        if (this.useMock) {
            return window.MOCK_DATA.orders;
        }
        try {
            return await this.request('/orders/admin/all');
        } catch (err) {
            return window.MOCK_DATA.orders;
        }
    }

    async createOrder(orderRequest) {
        if (this.useMock) {
            const total = orderRequest.items.reduce((sum, item) => {
                const prod = window.MOCK_DATA.products.find(p => p.id === item.productId);
                return sum + (prod ? prod.price * item.quantity : 0);
            }, 0);

            const itemsDetailed = orderRequest.items.map((item, idx) => {
                const prod = window.MOCK_DATA.products.find(p => p.id === item.productId);
                return {
                    id: 'item-' + idx + '-' + Date.now(),
                    productId: item.productId,
                    productName: prod ? prod.name : 'Producto',
                    unitPrice: prod ? prod.price : 0,
                    quantity: item.quantity,
                    totalPrice: prod ? prod.price * item.quantity : 0
                };
            });

            const newOrder = {
                id: 'ord-' + Math.floor(100000 + Math.random() * 900000),
                userId: 'user-auth-id',
                totalAmount: total,
                status: 'PENDING',
                items: itemsDetailed,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            window.MOCK_DATA.orders.unshift(newOrder);
            return newOrder;
        }

        return await this.request('/orders', {
            method: 'POST',
            body: JSON.stringify(orderRequest)
        });
    }

    // --- AUTH API ---
    async login(email, password) {
        if (this.useMock) {
            const role = email.includes('admin') ? 'ROLE_ADMIN' : 'ROLE_USER';
            return {
                accessToken: 'mock_jwt_access_token_' + Date.now(),
                refreshToken: 'mock_jwt_refresh_token_' + Date.now(),
                tokenType: 'Bearer',
                email: email,
                role: role
            };
        }
        return await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    }

    async register(name, email, password, role = 'ROLE_USER') {
        if (this.useMock) {
            return {
                accessToken: 'mock_jwt_access_token_' + Date.now(),
                refreshToken: 'mock_jwt_refresh_token_' + Date.now(),
                tokenType: 'Bearer',
                email: email,
                role: role
            };
        }
        return await this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password, role })
        });
    }
}

window.apiService = new ApiService();
