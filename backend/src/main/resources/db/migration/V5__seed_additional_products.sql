-- ==========================================================================
-- V5__seed_additional_products.sql
-- Seeder migration adding 50 new products across diverse categories & brands
-- Enables rich catalog browsing and frontend pagination
-- ==========================================================================

-- 1. Seed: Additional Manufacturers
INSERT INTO manufacturers (name, description, website_url) VALUES
('Vortex Gaming', 'Pro-grade esports peripherals and gaming systems.', 'https://www.vortexgaming.example.com'),
('Echo Optics', 'Cutting-edge optical engineering and imaging sensors.', 'https://www.echooptics.example.com'),
('Stellar Mobile', 'Next-generation smart devices and connected mobility.', 'https://www.stellarmobile.example.com'),
('Zenith Displays', 'Ultra-high-definition professional monitors and visual displays.', 'https://www.zenithdisplays.example.com'),
('Horizon Audio', 'Audiophile-grade studio monitors and high-fidelity sound gear.', 'https://www.horizonaudio.example.com'),
('Quantum Gear', 'Smart workspace equipment, docks, and ergonomic tech.', 'https://www.quantumgear.example.com'),
('Omni Home', 'Intelligent home automation and ambient IoT appliances.', 'https://www.omnihome.example.com'),
('Pulse Athletics', 'Biometric performance sportswear and technical footwear.', 'https://www.pulseathletics.example.com')
ON CONFLICT (name) DO NOTHING;

-- 2. Seed: Additional Categories
INSERT INTO categories (name, description) VALUES
('Wearables', 'Smartwatches, fitness bands, and wearable technology.'),
('Gaming', 'Gaming mice, mechanical keyboards, headsets, and consoles.'),
('Cameras & Photography', 'Mirrorless cameras, lenses, and photography gear.'),
('Smart Home', 'Connected devices, smart lighting, and ambient controllers.'),
('Accessories', 'Cables, docks, chargers, and ergonomic desk accessories.'),
('Monitors & Displays', '4K displays, ultrawide gaming monitors, and color-accurate screens.')
ON CONFLICT (name) DO NOTHING;

-- 3. Seed: 50 New Fictional Products
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'AETH-LAP-16',
    'AetherBook Studio 16',
    'Creator workstation with 16-inch 4K OLED display, 32GB RAM, and 1TB PCIe 4.0 SSD.',
    2199.00,
    25,
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Aether Tech')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'AETH-LAP-AIR',
    'AetherAir Ultra 13',
    'Featherlight 13.3-inch fanless laptop with 18-hour battery life and fast charging.',
    999.00,
    40,
    'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Aether Tech')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'VRTX-PC-APEX',
    'Vortex Apex Gaming Desktop',
    'Pre-built liquid-cooled gaming PC with high-end dedicated graphics and 32GB DDR5.',
    2499.00,
    15,
    'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Vortex Gaming')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'AETH-MINI-01',
    'AetherMini Workstation Hub',
    'Compact form-factor mini desktop capable of driving four 4K displays simultaneously.',
    749.00,
    35,
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Aether Tech')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'AETH-TAB-PRO',
    'AetherSlate 12.9 Tablet',
    'Productivity tablet featuring a 120Hz mini-LED panel and pressure-sensitive stylus support.',
    899.00,
    50,
    'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Aether Tech')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'AETH-LAP-EDU',
    'AetherBook Go 11',
    'Durable, spill-resistant lightweight laptop designed for students and classroom use.',
    429.00,
    60,
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Aether Tech')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'LUMN-PHN-PRO',
    'Lumina One Pro 5G',
    'Premium titanium body, periscope telephoto zoom, and all-day intelligent battery optimization.',
    1099.00,
    30,
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Lumina Devices')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'LUMN-PHN-LITE',
    'Lumina Lite 4G',
    'Slim everyday smartphone with vivid 90Hz AMOLED display and dual 50MP rear cameras.',
    349.00,
    75,
    'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Lumina Devices')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'STLR-PHN-01',
    'Stellar Horizon Flip',
    'Foldable pocket-sized smartphone with flexible dynamic AMOLED display and armored hinge.',
    1199.00,
    20,
    'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Stellar Mobile')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'STLR-PHN-02',
    'Stellar Nova Max',
    '6.8-inch edge-to-edge smartphone engineered with satellite SOS connectivity and 5000mAh battery.',
    929.00,
    45,
    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Stellar Mobile')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'LUMN-TAB-08',
    'Lumina Tab 8 Mini',
    'Compact 8.4-inch media reader and streaming tablet with stereo Dolby Atmos speakers.',
    219.00,
    65,
    'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Lumina Devices')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'STLR-PWR-MAG',
    'Stellar MagCharge 10K',
    'Magnetic 10,000mAh wireless power bank with foldable kickstand and USB-C Power Delivery.',
    59.99,
    90,
    'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Stellar Mobile')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'NOVA-EAR-PRO',
    'NovaBuds Pro ANC',
    'True wireless earbuds with active noise cancellation, spatial audio, and wireless charging case.',
    179.00,
    85,
    'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Nova Sound')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'NOVA-SPK-GO',
    'NovaPulse Outdoor Speaker',
    'Rugged IP67 waterproof Bluetooth speaker with 360-degree sound and 24-hour playtime.',
    129.00,
    70,
    'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Nova Sound')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'HRZN-STUDIO-7',
    'Horizon Reference 7 Monitors',
    'Pair of bi-amplified studio reference monitors delivering crystal-clear frequency response.',
    399.00,
    25,
    'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Horizon Audio')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'HRZN-DAC-HD',
    'Horizon High-Res DAC Amplifier',
    'Audiophile desktop USB digital-to-analog converter supporting 32-bit/768kHz lossless playback.',
    199.00,
    40,
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Horizon Audio')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'NOVA-BAR-300',
    'NovaCinema Soundbar 3.1',
    'Slim home theater soundbar with wireless subwoofer and Dolby Atmos surround emulation.',
    329.00,
    30,
    'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Nova Sound')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'HRZN-MIC-PRO',
    'Horizon Studio Vocal Mic',
    'Cardioid condenser microphone with integrated pop filter and low-noise preamp circuitry.',
    149.00,
    55,
    'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Horizon Audio')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'VRTX-MOU-PRO',
    'Vortex HyperGlide Wireless Mouse',
    'Ultra-lightweight 58-gram competitive esports mouse with 26,000 DPI optical sensor.',
    89.99,
    95,
    'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Vortex Gaming')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'VRTX-KBD-RGB',
    'Vortex Strike Mechanical Keyboard',
    'Hot-swappable linear mechanical gaming keyboard with per-key RGB illumination and PBT keycaps.',
    139.99,
    80,
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Vortex Gaming')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'VRTX-PAD-WIRE',
    'Vortex Apex Wireless Gamepad',
    'Ergonomic controller featuring Hall Effect analog triggers, customizable paddles, and vibration feedback.',
    69.99,
    110,
    'https://images.unsplash.com/photo-1612287232235-901a1f0a51be?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Vortex Gaming')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'VRTX-HSET-SUR',
    'Vortex Immersion 7.1 Headset',
    'Surround sound gaming headset with detachable broadcast microphone and breathable memory foam cups.',
    119.00,
    65,
    'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Vortex Gaming')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'VRTX-CHR-PRO',
    'Vortex Stealth Ergonomic Gaming Chair',
    'Heavy-duty lumbar support gaming chair with 4D armrests, cold-cure foam, and steel frame.',
    349.00,
    20,
    'https://images.unsplash.com/photo-1618788372246-79faff0c3742?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Vortex Gaming')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'VRTX-MAT-DESK',
    'Vortex XL Desk Gaming Mat',
    'Water-resistant microfiber extended desk pad (900x400mm) with anti-fray stitched borders.',
    29.99,
    140,
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Vortex Gaming')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'LUMN-WCH-01',
    'Lumina Watch Active',
    'Fitness smartwatch with continuous ECG monitoring, built-in GPS, and 7-day battery endurance.',
    199.00,
    55,
    'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Lumina Devices')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'LUMN-WCH-CLASSIC',
    'Lumina Watch Heritage Classic',
    'Stainless steel luxury smartwatch featuring sapphire crystal glass and genuine leather strap.',
    299.00,
    35,
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Lumina Devices')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'PULS-BND-HR',
    'PulseFit Horizon Band',
    'Ultra-slim biometric activity tracker with blood oxygen sensor, sleep stage scoring, and water resistance.',
    79.00,
    120,
    'https://images.unsplash.com/photo-1579586337278-3f5f3a0937a3?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Pulse Athletics')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'PULS-WCH-TRAIL',
    'Pulse Summit GPS Explorer',
    'Titanium outdoor multisport watch with topographic offline maps, solar charging, and altimeter.',
    499.00,
    25,
    'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Pulse Athletics')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'STLR-GLS-AI',
    'Stellar Smart Frames',
    'Lightweight audio smart glasses with directional micro-speakers and voice assistant integration.',
    229.00,
    40,
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Stellar Mobile')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'ECHO-CAM-R5',
    'Echo R5 Mirrorless Camera',
    'Full-frame 45MP mirrorless body with 8K video capture, IBIS stabilization, and dual card slots.',
    2399.00,
    18,
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Echo Optics')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'ECHO-LENS-50',
    'Echo Prime 50mm f/1.4 Lens',
    'Fast standard prime lens with nano-coating, silent autofocus motor, and creamy background bokeh.',
    489.00,
    35,
    'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Echo Optics')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'ECHO-CAM-RETRO',
    'Echo Classic Rangefinder',
    'Vintage-inspired mirrorless digital camera with tactile aluminum exposure dials and film simulation modes.',
    1199.00,
    28,
    'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Echo Optics')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'ECHO-SNAP-INST',
    'Echo Instant Pop Camera',
    'Hybrid instant film camera with digital preview LCD screen and creative tint filters.',
    99.00,
    70,
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Echo Optics')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'ECHO-CAM-VLOG',
    'Echo Creator Pocket Cam',
    'Pocket gimbal camera with 3-axis mechanical stabilization and face-tracking algorithm for vloggers.',
    319.00,
    45,
    'https://images.unsplash.com/photo-1507646227500-4d389b0012be?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Echo Optics')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'ZNTH-MON-34U',
    'Zenith CurveView 34 Ultrawide',
    '34-inch 1440p curved OLED display with 175Hz refresh rate and USB-C 90W single-cable dock.',
    899.00,
    22,
    'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Zenith Displays')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'ZNTH-MON-27P',
    'Zenith ColorPro 27 4K',
    'Color-accurate 27-inch 4K IPS display covering 99% Adobe RGB with hardware calibration support.',
    649.00,
    30,
    'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Zenith Displays')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'ZNTH-MON-24E',
    'Zenith Essential 24 FHD',
    'Frameless 24-inch full HD monitor with 100Hz smooth scroll and low blue light eye protection.',
    139.00,
    80,
    'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Zenith Displays')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'ZNTH-ARM-DUAL',
    'Zenith Dual Monitor Arm Mount',
    'Heavy-duty gas spring dual monitor desk mount supporting displays up to 32 inches each.',
    79.99,
    60,
    'https://images.unsplash.com/photo-1551645120-d70bfe84c826?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Zenith Displays')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'ZNTH-MON-16P',
    'Zenith Portable View 16',
    'Ultra-portable 15.6-inch 1080p travel monitor powered via single USB-C cable with folding kickstand.',
    189.00,
    50,
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Zenith Displays')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'OMNI-HUB-01',
    'OmniHub Smart Display 10',
    'Touchscreen smart hub with automated thermostat controls, security video feeds, and voice commands.',
    169.00,
    45,
    'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Omni Home')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'OMNI-LGT-BAR',
    'OmniGlow Smart Desk Lightbar',
    'Monitor-mounted screenbar with auto-dimming ambient sensor and touch color temperature adjustments.',
    59.00,
    90,
    'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Omni Home')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'QNTM-DCK-TB4',
    'Quantum Thunderbolt 4 Dock',
    '12-in-1 high-speed aluminum docking station delivering 96W charging, dual 4K HDMI, and 2.5GbE LAN.',
    229.00,
    35,
    'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Quantum Gear')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'QNTM-CHG-3IN1',
    'Quantum MagStand 3-in-1 Charger',
    'Wireless magnetic charging station fast-charging phone, smartwatch, and wireless earbuds simultaneously.',
    89.00,
    75,
    'https://images.unsplash.com/photo-1622445262464-84b14e3235b3?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Quantum Gear')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'QNTM-ORG-PAD',
    'Quantum Felt Desk Mat & Tray',
    'Eco-friendly wool felt desk mat with magnetic cable routing channel and pen dock.',
    39.00,
    85,
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Quantum Gear')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'OMNI-CAM-SEC',
    'OmniGuard 2K Indoor Cam',
    'AI motion-detecting indoor security camera with two-way audio and local encrypted micro-SD storage.',
    49.99,
    100,
    'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Omni Home')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'APEX-TRAIL-GTX',
    'Apex Terra Grip Trail Runner',
    'Waterproof trail running shoe with rugged lug outsole and rock-plate stone shielding.',
    145.00,
    60,
    'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Apex Athletics')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'APEX-STRIDE-PRO',
    'Apex Carbon Stride Pro',
    'Marathon racing shoe embedded with full-length carbon fiber propulsion plate and super-foam sole.',
    199.00,
    40,
    'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Apex Athletics')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'APEX-COURT-MID',
    'Apex Street High-Top Retro',
    'Vintage leather basketball sneaker reimagined with cushioned OrthoLite insole for streetwear.',
    125.00,
    70,
    'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Apex Athletics')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'APEX-LITE-WHT',
    'Apex Pure Comfort Sneaker',
    'Minimalist all-white breathable knit sneaker engineered for effortless all-day casual wear.',
    89.00,
    95,
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Apex Athletics')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'PULS-AERO-FLY',
    'Pulse Velocity Aero Trainer',
    'High-response gym and interval training shoe featuring responsive lateral stabilizing wings.',
    110.00,
    80,
    'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Pulse Athletics')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'PULS-RECOV-SLD',
    'Pulse Recovery Slide Sandal',
    'Thick ergonomic recovery slide designed to relieve foot fatigue after high-intensity training.',
    45.00,
    130,
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Pulse Athletics')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'APEX-RACE-W',
    'Apex WindSpeed Lightweight Racer',
    'Featherlight 170-gram road racing flat with open mesh upper and responsive zero-drop profile.',
    135.00,
    50,
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Apex Athletics')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'PULS-CROSS-FIT',
    'Pulse IronCross Lifting Shoe',
    'Rigid high-density heel lifting shoe engineered for stable squats and heavy Olympic lifts.',
    155.00,
    35,
    'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Pulse Athletics')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'PULS-TRAIL-ELT',
    'Pulse Alpine Ridge Hiker',
    'Mid-cut waterproof trekking boot offering ankle support, durable suede exterior, and Vibram grip.',
    169.00,
    45,
    'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Pulse Athletics')
)
ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, name, description, price, stock, image_url, is_active, manufacturer_id)
VALUES (
    'APEX-ECO-KNIT',
    'Apex EcoWeave Sustainable Sneaker',
    'Crafted entirely from recycled ocean plastics and algae foam for an ultra-low carbon footprint.',
    98.00,
    85,
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    TRUE,
    (SELECT id FROM manufacturers WHERE name = 'Apex Athletics')
)
ON CONFLICT (sku) DO NOTHING;

-- 4. Seed: Product Categories Linkages
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'AETH-LAP-16'),
    (SELECT id FROM categories WHERE name = 'Computers')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'AETH-LAP-AIR'),
    (SELECT id FROM categories WHERE name = 'Computers')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'VRTX-PC-APEX'),
    (SELECT id FROM categories WHERE name = 'Computers')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'VRTX-PC-APEX'),
    (SELECT id FROM categories WHERE name = 'Gaming')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'AETH-MINI-01'),
    (SELECT id FROM categories WHERE name = 'Computers')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'AETH-TAB-PRO'),
    (SELECT id FROM categories WHERE name = 'Computers')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'AETH-TAB-PRO'),
    (SELECT id FROM categories WHERE name = 'Accessories')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'AETH-LAP-EDU'),
    (SELECT id FROM categories WHERE name = 'Computers')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'LUMN-PHN-PRO'),
    (SELECT id FROM categories WHERE name = 'Smartphones')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'LUMN-PHN-LITE'),
    (SELECT id FROM categories WHERE name = 'Smartphones')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'STLR-PHN-01'),
    (SELECT id FROM categories WHERE name = 'Smartphones')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'STLR-PHN-02'),
    (SELECT id FROM categories WHERE name = 'Smartphones')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'LUMN-TAB-08'),
    (SELECT id FROM categories WHERE name = 'Smartphones')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'LUMN-TAB-08'),
    (SELECT id FROM categories WHERE name = 'Computers')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'STLR-PWR-MAG'),
    (SELECT id FROM categories WHERE name = 'Smartphones')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'STLR-PWR-MAG'),
    (SELECT id FROM categories WHERE name = 'Accessories')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'NOVA-EAR-PRO'),
    (SELECT id FROM categories WHERE name = 'Audio')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'NOVA-SPK-GO'),
    (SELECT id FROM categories WHERE name = 'Audio')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'HRZN-STUDIO-7'),
    (SELECT id FROM categories WHERE name = 'Audio')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'HRZN-DAC-HD'),
    (SELECT id FROM categories WHERE name = 'Audio')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'HRZN-DAC-HD'),
    (SELECT id FROM categories WHERE name = 'Accessories')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'NOVA-BAR-300'),
    (SELECT id FROM categories WHERE name = 'Audio')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'NOVA-BAR-300'),
    (SELECT id FROM categories WHERE name = 'Smart Home')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'HRZN-MIC-PRO'),
    (SELECT id FROM categories WHERE name = 'Audio')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'HRZN-MIC-PRO'),
    (SELECT id FROM categories WHERE name = 'Accessories')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'VRTX-MOU-PRO'),
    (SELECT id FROM categories WHERE name = 'Gaming')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'VRTX-MOU-PRO'),
    (SELECT id FROM categories WHERE name = 'Accessories')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'VRTX-KBD-RGB'),
    (SELECT id FROM categories WHERE name = 'Gaming')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'VRTX-KBD-RGB'),
    (SELECT id FROM categories WHERE name = 'Accessories')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'VRTX-PAD-WIRE'),
    (SELECT id FROM categories WHERE name = 'Gaming')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'VRTX-HSET-SUR'),
    (SELECT id FROM categories WHERE name = 'Gaming')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'VRTX-HSET-SUR'),
    (SELECT id FROM categories WHERE name = 'Audio')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'VRTX-CHR-PRO'),
    (SELECT id FROM categories WHERE name = 'Gaming')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'VRTX-MAT-DESK'),
    (SELECT id FROM categories WHERE name = 'Gaming')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'VRTX-MAT-DESK'),
    (SELECT id FROM categories WHERE name = 'Accessories')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'LUMN-WCH-01'),
    (SELECT id FROM categories WHERE name = 'Wearables')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'LUMN-WCH-CLASSIC'),
    (SELECT id FROM categories WHERE name = 'Wearables')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'PULS-BND-HR'),
    (SELECT id FROM categories WHERE name = 'Wearables')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'PULS-BND-HR'),
    (SELECT id FROM categories WHERE name = 'Footwear')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'PULS-WCH-TRAIL'),
    (SELECT id FROM categories WHERE name = 'Wearables')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'STLR-GLS-AI'),
    (SELECT id FROM categories WHERE name = 'Wearables')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'STLR-GLS-AI'),
    (SELECT id FROM categories WHERE name = 'Audio')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'ECHO-CAM-R5'),
    (SELECT id FROM categories WHERE name = 'Cameras & Photography')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'ECHO-LENS-50'),
    (SELECT id FROM categories WHERE name = 'Cameras & Photography')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'ECHO-LENS-50'),
    (SELECT id FROM categories WHERE name = 'Accessories')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'ECHO-CAM-RETRO'),
    (SELECT id FROM categories WHERE name = 'Cameras & Photography')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'ECHO-SNAP-INST'),
    (SELECT id FROM categories WHERE name = 'Cameras & Photography')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'ECHO-CAM-VLOG'),
    (SELECT id FROM categories WHERE name = 'Cameras & Photography')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'ZNTH-MON-34U'),
    (SELECT id FROM categories WHERE name = 'Monitors & Displays')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'ZNTH-MON-34U'),
    (SELECT id FROM categories WHERE name = 'Gaming')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'ZNTH-MON-27P'),
    (SELECT id FROM categories WHERE name = 'Monitors & Displays')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'ZNTH-MON-27P'),
    (SELECT id FROM categories WHERE name = 'Computers')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'ZNTH-MON-24E'),
    (SELECT id FROM categories WHERE name = 'Monitors & Displays')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'ZNTH-ARM-DUAL'),
    (SELECT id FROM categories WHERE name = 'Monitors & Displays')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'ZNTH-ARM-DUAL'),
    (SELECT id FROM categories WHERE name = 'Accessories')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'ZNTH-MON-16P'),
    (SELECT id FROM categories WHERE name = 'Monitors & Displays')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'ZNTH-MON-16P'),
    (SELECT id FROM categories WHERE name = 'Computers')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'OMNI-HUB-01'),
    (SELECT id FROM categories WHERE name = 'Smart Home')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'OMNI-LGT-BAR'),
    (SELECT id FROM categories WHERE name = 'Smart Home')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'OMNI-LGT-BAR'),
    (SELECT id FROM categories WHERE name = 'Accessories')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'QNTM-DCK-TB4'),
    (SELECT id FROM categories WHERE name = 'Accessories')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'QNTM-DCK-TB4'),
    (SELECT id FROM categories WHERE name = 'Computers')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'QNTM-CHG-3IN1'),
    (SELECT id FROM categories WHERE name = 'Accessories')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'QNTM-CHG-3IN1'),
    (SELECT id FROM categories WHERE name = 'Smartphones')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'QNTM-ORG-PAD'),
    (SELECT id FROM categories WHERE name = 'Accessories')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'OMNI-CAM-SEC'),
    (SELECT id FROM categories WHERE name = 'Smart Home')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'APEX-TRAIL-GTX'),
    (SELECT id FROM categories WHERE name = 'Footwear')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'APEX-STRIDE-PRO'),
    (SELECT id FROM categories WHERE name = 'Footwear')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'APEX-COURT-MID'),
    (SELECT id FROM categories WHERE name = 'Footwear')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'APEX-LITE-WHT'),
    (SELECT id FROM categories WHERE name = 'Footwear')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'PULS-AERO-FLY'),
    (SELECT id FROM categories WHERE name = 'Footwear')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'PULS-RECOV-SLD'),
    (SELECT id FROM categories WHERE name = 'Footwear')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'APEX-RACE-W'),
    (SELECT id FROM categories WHERE name = 'Footwear')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'PULS-CROSS-FIT'),
    (SELECT id FROM categories WHERE name = 'Footwear')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'PULS-TRAIL-ELT'),
    (SELECT id FROM categories WHERE name = 'Footwear')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
INSERT INTO product_categories (product_id, category_id)
VALUES (
    (SELECT id FROM products WHERE sku = 'APEX-ECO-KNIT'),
    (SELECT id FROM categories WHERE name = 'Footwear')
)
ON CONFLICT (product_id, category_id) DO NOTHING;
