-- 1. Seed: Manufacturers (Fictional brands and example domains)
INSERT INTO manufacturers (name, description, website_url) VALUES
('Aether Tech', 'High-performance computing and workstation hardware.', 'https://www.aethertech.example.com'),
('Nova Sound', 'Premium acoustic solutions and wireless audio gear.', 'https://www.novasound.example.com'),
('Apex Athletics', 'Innovative sports footwear and athletic equipment.', 'https://www.apexathletics.example.com'),
('Lumina Devices', 'Smart mobile devices and display technologies.', 'https://www.luminadevices.example.com');

-- 2. Seed: Categories
INSERT INTO categories (name, description) VALUES
('Smartphones', 'Mobile devices, phones, and accessories.'),
('Computers', 'Laptops, workstations, and computing gear.'),
('Audio', 'Headphones, earbuds, and audio accessories.'),
('Footwear', 'Performance athletic shoes and sneakers.');

-- 3. Seed: Products (Fictional products with free public domain / Unsplash photos)
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id) VALUES
(
    'AETH-LAP-14',
    'AetherBook Pro 14',
    'Ultra-thin 14-inch performance laptop with 16GB RAM and 512GB NVMe SSD.',
    1499.00,
    30,
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Aether Tech')
),
(
    'LUMN-PHN-01',
    'Lumina One 5G',
    'Flagship 5G smartphone featuring an OLED display and triple-camera array.',
    849.00,
    45,
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Lumina Devices')
),
(
    'NOVA-AUD-X5',
    'NovaTune X5 Wireless',
    'Over-ear noise-canceling headphones with 40-hour battery life.',
    249.99,
    60,
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Nova Sound')
),
(
    'APEX-RUN-V2',
    'Apex Velocity Runner',
    'Lightweight breathable road running sneakers with high-rebound cushioning.',
    115.00,
    80,
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Apex Athletics')
);

-- 4. Seed: Product Categories Linkage
INSERT INTO product_categories (product_id, category_id) VALUES
(
    (SELECT id FROM products WHERE sku = 'AETH-LAP-14'),
    (SELECT id FROM categories WHERE name = 'Computers')
),
(
    (SELECT id FROM products WHERE sku = 'LUMN-PHN-01'),
    (SELECT id FROM categories WHERE name = 'Smartphones')
),
(
    (SELECT id FROM products WHERE sku = 'NOVA-AUD-X5'),
    (SELECT id FROM categories WHERE name = 'Audio')
),
(
    (SELECT id FROM products WHERE sku = 'APEX-RUN-V2'),
    (SELECT id FROM categories WHERE name = 'Footwear')
);

-- 5. Seed: Users
-- Note: Password for both accounts is "password" (BCrypt hash)
INSERT INTO users (email, password_hash, first_name, last_name, role, is_enabled) VALUES
(
    'admin@mystore.example.com',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    'Admin',
    'User',
    'ROLE_ADMIN',
    TRUE
),
(
    'customer@mystore.example.com',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    'Alex',
    'Smith',
    'ROLE_USER',
    TRUE
);
