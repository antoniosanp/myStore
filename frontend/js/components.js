/**
 * myStore Frontend - Component Renderers & Helpers
 */

const Components = {
    /**
     * Format number to Currency ($ USD)
     */
    formatCurrency(amount) {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(amount || 0);
    },

    /**
     * Format ISO Date string to localized readable string
     */
    formatDate(isoString) {
        if (!isoString) return 'N/A';
        try {
            return new Date(isoString).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (e) {
            return isoString;
        }
    },

    /**
     * Render Single Product Card HTML
     */
    renderProductCard(product) {
        const categoriesText = Array.isArray(product.categoryNames) 
            ? product.categoryNames.join(', ') 
            : (product.categoryNames ? Array.from(product.categoryNames).join(', ') : 'General');
            
        const isOutOfStock = product.stock <= 0;

        return `
            <div class="product-card" data-id="${product.id}">
                <div class="product-image-box">
                    <div class="card-badges">
                        <span class="badge-tag badge-brand">${product.manufacturerName || 'Marca'}</span>
                        ${isOutOfStock ? `<span class="badge-tag badge-stock-out">Agotado</span>` : ''}
                    </div>
                    <img src="${product.imageUrl || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80'}" alt="${product.name}" loading="lazy">
                    <div class="quick-view-overlay">
                        <button class="btn btn-glass btn-sm quick-view-btn" data-id="${product.id}">
                            <i class="fa-solid fa-eye"></i> Vista Rápida
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <div class="product-categories">${categoriesText}</div>
                    <h3 class="product-name" title="${product.name}">${product.name}</h3>
                    <div class="product-sku">SKU: ${product.sku}</div>
                    <div class="product-footer">
                        <div class="product-price">${this.formatCurrency(product.price)}</div>
                        <button class="add-cart-btn ${isOutOfStock ? 'disabled' : ''}" 
                                data-id="${product.id}" 
                                ${isOutOfStock ? 'disabled' : ''} 
                                title="${isOutOfStock ? 'Producto Agotado' : 'Agregar al Carrito'}">
                            <i class="fa-solid fa-cart-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Render Product Quick View Modal Content
     */
    renderProductQuickView(product) {
        const isOutOfStock = product.stock <= 0;
        const categoriesList = Array.from(product.categoryNames || []).map(cat => `<span class="meta-pill">${cat}</span>`).join(' ');

        return `
            <div class="modal-img-box">
                <img src="${product.imageUrl || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80'}" alt="${product.name}">
            </div>
            <div class="modal-product-details">
                <h2>${product.name}</h2>
                <div class="modal-product-sku">SKU: ${product.sku} | Marca: <strong>${product.manufacturerName}</strong></div>
                <div class="modal-product-price">${this.formatCurrency(product.price)}</div>
                
                <div class="modal-meta-row">
                    ${categoriesList}
                    <span class="meta-pill" style="background: ${isOutOfStock ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)'}; color: ${isOutOfStock ? '#ef4444' : '#10b981'};">
                        ${isOutOfStock ? 'Agotado' : `Stock: ${product.stock} unidades`}
                    </span>
                </div>

                <p class="modal-product-desc">${product.description || 'Sin descripción detallada disponible para este producto.'}</p>
                
                <div style="margin-top: auto; display: flex; gap: 1rem;">
                    <button class="btn btn-primary btn-lg flex-1 add-cart-btn-modal" data-id="${product.id}" ${isOutOfStock ? 'disabled' : ''}>
                        <i class="fa-solid fa-cart-shopping"></i> Agregar al Carrito
                    </button>
                </div>
            </div>
        `;
    },

    /**
     * Render Cart Drawer Item
     */
    renderCartItem(item) {
        return `
            <div class="cart-item" data-id="${item.product.id}">
                <img src="${item.product.imageUrl}" alt="${item.product.name}">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.product.name}</div>
                    <div class="cart-item-price">${this.formatCurrency(item.product.price)}</div>
                    <div class="cart-item-controls">
                        <button class="qty-btn dec-qty-btn" data-id="${item.product.id}">-</button>
                        <span class="qty-val">${item.quantity}</span>
                        <button class="qty-btn inc-qty-btn" data-id="${item.product.id}">+</button>
                        <button class="remove-cart-item" data-id="${item.product.id}" title="Eliminar del carrito">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Render Admin Table Product Row
     */
    renderAdminProductRow(product) {
        return `
            <tr>
                <td><img src="${product.imageUrl}" class="table-img" alt="${product.name}"></td>
                <td><code>${product.sku}</code></td>
                <td><strong>${product.name}</strong></td>
                <td>${this.formatCurrency(product.price)}</td>
                <td><span class="status-badge ${product.stock > 0 ? 'active' : 'CANCELLED'}">${product.stock} un.</span></td>
                <td>${product.manufacturerName || 'N/A'}</td>
                <td><span class="status-badge ${product.isActive !== false ? 'active' : 'CANCELLED'}">${product.isActive !== false ? 'Activo' : 'Inactivo'}</span></td>
                <td>
                    <button class="btn btn-outline btn-sm edit-admin-product-btn" data-id="${product.id}">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="btn btn-danger-light btn-sm delete-admin-product-btn" data-id="${product.id}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    },

    /**
     * Render Order History Card (User View)
     */
    renderOrderCard(order) {
        const itemsHtml = (order.items || []).map(item => `
            <div class="order-item-row">
                <span>${item.productName || 'Producto'} x ${item.quantity}</span>
                <strong>${this.formatCurrency(item.totalPrice || (item.unitPrice * item.quantity))}</strong>
            </div>
        `).join('');

        return `
            <div class="order-card">
                <div class="order-card-header">
                    <div>
                        <div class="order-id">Orden #${order.id}</div>
                        <div class="order-date"><i class="fa-regular fa-calendar"></i> ${this.formatDate(order.createdAt)}</div>
                    </div>
                    <span class="status-badge ${order.status}">${order.status}</span>
                </div>
                <div class="order-items-list">
                    ${itemsHtml}
                </div>
                <div style="display: flex; justify-content: space-between; font-weight: 800; font-size: 1.1rem; border-top: 1px dashed var(--border-color); padding-top: 0.75rem;">
                    <span>Total Pagado:</span>
                    <span style="color: var(--primary);">${this.formatCurrency(order.totalAmount)}</span>
                </div>
            </div>
        `;
    },

    /**
     * Render Floating Toast Notification
     */
    showToast(message, type = 'success') {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        let icon = 'fa-check-circle';
        if (type === 'error') icon = 'fa-circle-xmark';
        if (type === 'warning') icon = 'fa-triangle-exclamation';

        toast.innerHTML = `
            <i class="fa-solid ${icon}"></i>
            <span>${message}</span>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }
};

window.Components = Components;
