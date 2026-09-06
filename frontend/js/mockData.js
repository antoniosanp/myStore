/**
 * myStore Frontend - Rich Realistic Mock Dataset
 */

const MOCK_DATA = {
    manufacturers: [
        { id: "m1111111-1111-1111-1111-111111111111", name: "Apple Inc.", address: "Cupertino, California, EE.UU." },
        { id: "m2222222-2222-2222-2222-222222222222", name: "Samsung Electronics", address: "Suwon, Corea del Sur" },
        { id: "m3333333-3333-3333-3333-333333333333", name: "Sony Corporation", address: "Tokio, Japón" },
        { id: "m4444444-4444-4444-4444-444444444444", name: "Nike Sportswear", address: "Beaverton, Oregon, EE.UU." },
        { id: "m5555555-5555-5555-5555-555555555555", name: "Logitech Gaming", address: "Lausana, Suiza" }
    ],

    categories: [
        { id: "c1111111-1111-1111-1111-111111111111", name: "Electrónica", description: "Gadgets, smartphones, tablets y accesorios inteligentes" },
        { id: "c2222222-2222-2222-2222-222222222222", name: "Computación", description: "Laptops, componentes, periféricos y monitores" },
        { id: "c3333333-3333-3333-3333-333333333333", name: "Audio & Sonido", description: "Audífonos, bocinas y equipamiento de sonido pro" },
        { id: "c4444444-4444-4444-4444-444444444444", name: "Moda & Calzado", description: "Ropa deportiva, calzado urbano y ropa casual" },
        { id: "c5555555-5555-5555-5555-555555555555", name: "Gaming", description: "Consolas, controles y accesorios para gamers" }
    ],

    products: [
        {
            id: "p1010101-1010-1010-1010-101010101010",
            sku: "SKU-IPHONE-15PRO",
            name: "iPhone 15 Pro Max 256GB - Titanio Natural",
            description: "Super Retina XDR OLED 6.7 pulgadas, Chip A17 Pro de 3nm, cámara triple de 48 MP con zoom óptico 5x.",
            price: 1199.99,
            stock: 15,
            imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80",
            isActive: true,
            manufacturerName: "Apple Inc.",
            categoryNames: ["Electrónica", "Computación"],
            createdAt: "2026-01-10T10:00:00Z"
        },
        {
            id: "p2020202-2020-2020-2020-202020202020",
            sku: "SKU-SAMSUNG-S24U",
            name: "Samsung Galaxy S24 Ultra 5G 512GB",
            description: "Pantalla Dynamic AMOLED 2X 120Hz, Snapdragon 8 Gen 3 con IA Galaxy AI integrada, S-Pen incluido.",
            price: 1299.00,
            stock: 8,
            imageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80",
            isActive: true,
            manufacturerName: "Samsung Electronics",
            categoryNames: ["Electrónica"],
            createdAt: "2026-01-15T14:30:00Z"
        },
        {
            id: "p3030303-3030-3030-3030-303030303030",
            sku: "SKU-SONY-WH1000XM5",
            name: "Audífonos Sony WH-1000XM5 Cancelación de Ruido",
            description: "Los mejores audífonos inalámbricos Over-Ear con cancelación activa de ruido, 30 horas de batería y micrófono HD.",
            price: 398.50,
            stock: 25,
            imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
            isActive: true,
            manufacturerName: "Sony Corporation",
            categoryNames: ["Audio & Sonido", "Electrónica"],
            createdAt: "2026-02-01T09:15:00Z"
        },
        {
            id: "p4040404-4040-4040-4040-404040404040",
            sku: "SKU-MACBOOK-AIR-M3",
            name: "MacBook Air 15\" Chip M3 16GB RAM 512GB SSD",
            description: "Diseño ultradelgado de aluminio, pantalla Liquid Retina de 15.3\", autonomía de hasta 18 horas de batería.",
            price: 1499.00,
            stock: 5,
            imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
            isActive: true,
            manufacturerName: "Apple Inc.",
            categoryNames: ["Computación"],
            createdAt: "2026-02-10T11:00:00Z"
        },
        {
            id: "p5555555-5555-5555-5555-555555555555",
            sku: "SKU-LOGITECH-MXMASTER3S",
            name: "Mouse Inalámbrico Logitech MX Master 3S",
            description: "Sensor óptico de 8000 DPI, clics silenciosos, desplazamiento MagSpeed ultrasrápido y diseño ergonómico.",
            price: 99.99,
            stock: 40,
            imageUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80",
            isActive: true,
            manufacturerName: "Logitech Gaming",
            categoryNames: ["Computación", "Gaming"],
            createdAt: "2026-02-18T16:20:00Z"
        },
        {
            id: "p6666666-6666-6666-6666-666666666666",
            sku: "SKU-NIKE-AIRMAX-270",
            name: "Zapatillas Nike Air Max 270 Black Edition",
            description: "Unidad Air visible de gran volumen, malla transpirable de alta durabilidad y máxima amortiguación urbana.",
            price: 159.95,
            stock: 18,
            imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
            isActive: true,
            manufacturerName: "Nike Sportswear",
            categoryNames: ["Moda & Calzado"],
            createdAt: "2026-02-25T12:00:00Z"
        },
        {
            id: "p7777777-7777-7777-7777-777777777777",
            sku: "SKU-SONY-PS5-SLIM",
            name: "Consola PlayStation 5 Slim 1TB Edición Digital",
            description: "Juegos a 4K 120 FPS, Ray Tracing, SSD ultrarrápido y control DualSense con retroalimentación háptica.",
            price: 499.00,
            stock: 0, // Out of stock example
            imageUrl: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80",
            isActive: true,
            manufacturerName: "Sony Corporation",
            categoryNames: ["Gaming", "Electrónica"],
            createdAt: "2026-03-01T08:30:00Z"
        }
    ],

    orders: [
        {
            id: "ord-889102-mock",
            userId: "u-user-demo-id",
            totalAmount: 1698.49,
            status: "COMPLETED",
            items: [
                { id: "i1", productId: "p1010101-1010-1010-1010-101010101010", productName: "iPhone 15 Pro Max 256GB - Titanio Natural", unitPrice: 1199.99, quantity: 1, totalPrice: 1199.99 },
                { id: "i2", productId: "p7777777-7777-7777-7777-777777777777", productName: "Consola PlayStation 5 Slim 1TB Edición Digital", unitPrice: 499.00, quantity: 1, totalPrice: 499.00 }
            ],
            createdAt: "2026-03-02T15:40:00Z",
            updatedAt: "2026-03-02T16:00:00Z"
        }
    ]
};

window.MOCK_DATA = MOCK_DATA;
