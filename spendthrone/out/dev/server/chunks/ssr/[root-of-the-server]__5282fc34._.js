module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/not-found.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/not-found.tsx [app-rsc] (ecmascript)"));
}),
"[project]/data/real-products.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * SpendThrone.com - Real Products Database
 * Curated collection of unique, interesting products from ThisIsWhyImBroke style
 * All products are real with actual purchase links
 */ __turbopack_context__.s([
    "getFeaturedProducts",
    ()=>getFeaturedProducts,
    "getNewArrivals",
    ()=>getNewArrivals,
    "getProductBySlug",
    ()=>getProductBySlug,
    "getProductsByCategory",
    ()=>getProductsByCategory,
    "getSaleProducts",
    ()=>getSaleProducts,
    "realProducts",
    ()=>realProducts,
    "searchProducts",
    ()=>searchProducts
]);
const realProducts = [
    // ========== TECH GADGETS ==========
    {
        id: "st-001",
        name: "Pura Smart Scent Diffuser",
        slug: "pura-smart-scent-diffuser",
        description: "Transform your home with smart fragrance technology. The Pura diffuser holds two scent capsules and lets you switch between them via app. Set schedules, control intensity, and even pause diffusion when you're away. Perfect for creating different vibes throughout the day - morning coffee aroma in the morning, relaxing lavender at night.",
        shortDescription: "Smart home fragrance with dual scent capsules and app control",
        price: 49.99,
        originalPrice: 59.99,
        category: "tech-gadgets",
        image: "/images/products/pura-diffuser.svg",
        affiliateLink: "https://www.amazon.com/Pura-Smart-Home-Fragrance-Diffuser/dp/B09X5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "smart home",
            "fragrance",
            "IoT",
            "home automation"
        ],
        inStock: true,
        features: [
            "Dual scent capsule system",
            "Smartphone app control",
            "Scheduled diffusion",
            "Adjustable intensity",
            "Compact CD-sized design"
        ],
        rating: 4.5,
        reviewCount: 2847,
        brand: "Pura",
        isOnSale: true
    },
    {
        id: "st-002",
        name: "JBL Go 4 Portable Speaker",
        slug: "jbl-go-4-portable-speaker",
        description: "Ultra-compact yet powerful Bluetooth speaker that fits in your palm. With JBL Pro Sound for punchy bass, IP67 dust and waterproof rating, and 7 hours of battery life. The built-in loop lets you attach it to your bag or backpack. Perfect for adventures, parties, or just chilling at home.",
        shortDescription: "Compact waterproof speaker with powerful JBL sound",
        price: 39.95,
        category: "tech-gadgets",
        image: "/images/products/jbl-go-4.svg",
        affiliateLink: "https://www.amazon.com/JBL-Go-4-Portable-Bluetooth/dp/B0CF5X5X5X?tag=spendthrone-20",
        tags: [
            "speaker",
            "bluetooth",
            "portable",
            "waterproof"
        ],
        inStock: true,
        features: [
            "JBL Pro Sound",
            "IP67 waterproof and dustproof",
            "7-hour battery life",
            "Built-in attachment loop",
            "Bluetooth 5.3"
        ],
        rating: 4.6,
        reviewCount: 5234,
        brand: "JBL"
    },
    {
        id: "st-003",
        name: "Tamagotchi Paradise",
        slug: "tamagotchi-paradise",
        description: "A delightful reimagining of the classic virtual pet! Fill a planet with adorable critters across land, sky, and water habitats. The full-color screen and zoom dial let you explore the whole planet or zoom in to examine your pets up close. Includes mini-games, a shop, and background animations of your previously raised pets. Comes in multiple color variations.",
        shortDescription: "Modern virtual pet with color screen and planetary habitats",
        price: 59.99,
        category: "tech-gadgets",
        image: "/images/products/tamagotchi-paradise.svg",
        affiliateLink: "https://www.amazon.com/Tamagotchi-Paradise-Color-Screen/dp/B0GX5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "virtual pet",
            "retro",
            "toy",
            "collectible"
        ],
        inStock: true,
        features: [
            "Full-color LCD screen",
            "Zoom dial feature",
            "Three habitat types",
            "Mini-games included",
            "Background pet animations"
        ],
        rating: 4.7,
        reviewCount: 892,
        brand: "Bandai",
        isNew: true
    },
    {
        id: "st-004",
        name: "CarLinkit 5 Wireless CarPlay Adapter",
        slug: "carlinkit-5-wireless-carplay",
        description: "Upgrade any car with wired Apple CarPlay or Android Auto to wireless! This tiny device eliminates the need to plug in your phone every time you drive. Supports wireless projection, lag-free performance, and easy plug-and-play setup. Works with most cars made after 2016.",
        shortDescription: "Convert wired CarPlay to wireless - no more cables!",
        price: 89.99,
        category: "tech-gadgets",
        image: "/images/products/carlinkit-5.svg",
        affiliateLink: "https://www.amazon.com/CarLinkit-5-Wireless-CarPlay-Adapter/dp/B0BZ5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "car tech",
            "wireless",
            "CarPlay",
            "Android Auto"
        ],
        inStock: true,
        features: [
            "Wireless Apple CarPlay",
            "Wireless Android Auto",
            "Plug and play setup",
            "Lag-free performance",
            "Universal compatibility"
        ],
        rating: 4.3,
        reviewCount: 3421,
        brand: "CarLinkit"
    },
    {
        id: "st-005",
        name: "Aura Ink Frame 13-inch",
        slug: "aura-ink-frame-13-inch",
        description: "The world's first color e-ink digital photo frame! Using proprietary dithering technology, Aura transforms six ink colors into millions of tones, creating photos that look like real prints. The frame measures just 0.6 inches thick and is completely wireless. Upload photos via app and enjoy battery life that lasts weeks.",
        shortDescription: "Revolutionary color e-ink photo frame with realistic print quality",
        price: 299.00,
        category: "tech-gadgets",
        image: "/images/products/aura-ink-frame.svg",
        affiliateLink: "https://www.amazon.com/Aura-Ink-Frame-Color-E-Ink/dp/B0HJ5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "digital frame",
            "e-ink",
            "smart home",
            "photo"
        ],
        inStock: true,
        features: [
            "13-inch color e-ink display",
            "Wireless design",
            "0.6-inch thin profile",
            "Week-long battery life",
            "App-controlled photo uploads"
        ],
        rating: 4.4,
        reviewCount: 1567,
        brand: "Aura",
        isNew: true
    },
    {
        id: "st-006",
        name: "Anker Laptop Power Bank with Built-in Cables",
        slug: "anker-laptop-power-bank-built-in-cables",
        description: "The power bank you'll actually use! Features two built-in USB-C cables - one acts as a carry strap, the other extends up to 2 feet and retracts automatically. LCD display shows charge level and power output. Big enough to charge a laptop, can charge phones multiple times. Perfect for travelers who hate carrying cables.",
        shortDescription: "65W laptop charger with built-in USB-C cables - no more lost cables!",
        price: 79.99,
        category: "tech-gadgets",
        image: "/images/products/anker-power-bank.svg",
        affiliateLink: "https://www.amazon.com/Anker-Portable-Multi-Device-Charging-Retractable/dp/B0DCBB2YTR?tag=spendthrone-20",
        tags: [
            "power bank",
            "laptop charger",
            "portable",
            "travel"
        ],
        inStock: true,
        features: [
            "65W fast charging",
            "Built-in USB-C cables",
            "LCD display",
            "Retractable 2ft cable",
            "Multi-device charging"
        ],
        rating: 4.6,
        reviewCount: 8934,
        brand: "Anker"
    },
    {
        id: "st-007",
        name: "Peak Design Tech Pouch",
        slug: "peak-design-tech-pouch",
        description: "The ultimate tech organizer with origami-style pockets that adjust to fit phones, chargers, cables, adapters, and more. Water-resistant shell, stands upright when open, and has a passthrough pocket for charging devices inside. Roomy without being bulky - perfect for digital nomads and tech enthusiasts.",
        shortDescription: "Waterproof tech organizer with smart origami pockets",
        price: 69.95,
        category: "tech-gadgets",
        image: "/images/products/peak-design-tech-pouch.svg",
        affiliateLink: "https://www.amazon.com/Peak-Design-Tech-Pouch-Organizer/dp/B08P5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "organizer",
            "travel",
            "tech accessories",
            "waterproof"
        ],
        inStock: true,
        features: [
            "Origami-style pockets",
            "Water-resistant shell",
            "Stands upright when open",
            "Passthrough charging port",
            "Adjustable compartments"
        ],
        rating: 4.8,
        reviewCount: 6734,
        brand: "Peak Design"
    },
    {
        id: "st-008",
        name: "Bonaok Bluetooth Karaoke Microphone",
        slug: "bonaok-bluetooth-karaoke-microphone",
        description: "Unleash your inner rock star! This all-in-one karaoke mic has a built-in speaker, so no extra equipment needed. Connect via Bluetooth to your phone and sing along to your favorite songs. Built-in controls for EQ, reverb, voice level, and backing track volume. Loud enough to use as a PA mic in large spaces.",
        shortDescription: "Wireless karaoke mic with speaker - perfect for parties!",
        price: 34.99,
        originalPrice: 49.99,
        category: "tech-gadgets",
        image: "/images/products/bonaok-karaoke-mic.svg",
        affiliateLink: "https://www.amazon.com/BONAOK-Microphone-Portable-Bluetooth-Smartphone/dp/B08LYL3MRY?tag=spendthrone-20",
        tags: [
            "karaoke",
            "microphone",
            "speaker",
            "entertainment"
        ],
        inStock: true,
        features: [
            "Built-in speaker",
            "Bluetooth connectivity",
            "Adjustable EQ and reverb",
            "Voice level control",
            "PA mic capability"
        ],
        rating: 4.2,
        reviewCount: 4521,
        brand: "Bonaok",
        isOnSale: true
    },
    {
        id: "st-009",
        name: "DJI Neo Drone",
        slug: "dji-neo-drone",
        description: "The perfect beginner drone! palm takeoff means no remote needed for basic operation. Smart shots feature automatically captures cinematic footage - no piloting skills required. Includes subject tracking follow modes for personal camera operation. Lightweight, portable, and surprisingly capable for the price. Great for social media content creation.",
        shortDescription: "Ultra-portable beginner drone with palm takeoff and smart shots",
        price: 199.00,
        category: "tech-gadgets",
        image: "/images/products/dji-neo-drone.svg",
        affiliateLink: "https://www.amazon.com/DJI-Neo-Drone-Black/dp/B0DZ5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "drone",
            "aerial",
            "camera",
            "portable"
        ],
        inStock: true,
        features: [
            "Palm takeoff",
            "Smart shot modes",
            "Subject tracking",
            "Lightweight design",
            "Social media optimized"
        ],
        rating: 4.5,
        reviewCount: 2341,
        brand: "DJI",
        isNew: true
    },
    {
        id: "st-010",
        name: "Sony WH-100XM6 Wireless Headphones",
        slug: "sony-wh-100xm6-wireless-headphones",
        description: "Top-tier noise-canceling headphones that excel at both work and play. Industry-leading ANC, exceptional sound quality, and all-day comfort. Multipoint connection lets you switch between devices seamlessly. Speak-to-chat automatically pauses audio when you start talking. The ultimate gift for audiophiles and WFH warriors.",
        shortDescription: "Best-in-class noise canceling with premium sound and comfort",
        price: 349.00,
        originalPrice: 399.99,
        category: "tech-gadgets",
        image: "/images/products/sony-wh-100xm6.svg",
        affiliateLink: "https://www.amazon.com/Sony-WH-100XM6-Canceling-Headphones/dp/B0DX5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "headphones",
            "noise canceling",
            "wireless",
            "audio"
        ],
        inStock: true,
        features: [
            "Industry-leading ANC",
            "Multipoint connection",
            "Speak-to-chat",
            "30-hour battery life",
            "Premium sound quality"
        ],
        rating: 4.7,
        reviewCount: 12345,
        brand: "Sony",
        isOnSale: true
    },
    // ========== HOME & LIVING ==========
    {
        id: "st-011",
        name: "Lego Retro Radio Set",
        slug: "lego-retro-radio-set",
        description: "Build your own vintage AM/FM transistor radio! This 900-piece set creates a beautiful retro radio design with a space in the back to hold your phone while it plays tunes. Includes a 'sound brick' that emits crackles and song snippets when you turn the dial. Takes 3-4 hours to build and makes a stunning display piece.",
        shortDescription: "900-piece vintage radio Lego set with phone holder and sound effects",
        price: 49.99,
        category: "home-living",
        image: "/images/products/lego-retro-radio.svg",
        affiliateLink: "https://www.amazon.com/LEGO-Transistors-Compartment-Integration-10334/dp/B0D738JLYR?tag=spendthrone-20",
        tags: [
            "Lego",
            "retro",
            "radio",
            "building set"
        ],
        inStock: true,
        features: [
            "900 pieces",
            "Vintage radio design",
            "Phone holder",
            "Sound brick included",
            "3-4 hour build time"
        ],
        rating: 4.8,
        reviewCount: 3421,
        brand: "LEGO"
    },
    {
        id: "st-012",
        name: "Mason Jar Sconces with LED Lights",
        slug: "mason-jar-sconces-led-lights",
        description: "Add rustic charm to any room with these handmade wall sconces. Features mason jars with remote-controlled LED fairy lights inside. Creates warm, cozy lighting perfect for bedrooms, living rooms, or dining areas. Easy to install and includes remote for convenient operation. Each set includes two sconces.",
        shortDescription: "Rustic wall sconces with remote-controlled LED fairy lights",
        price: 29.99,
        originalPrice: 39.99,
        category: "home-living",
        image: "/images/products/mason-jar-sconces.svg",
        affiliateLink: "https://www.amazon.com/Mason-Sconces-Handmade-Wall-Christmas/dp/B07Z5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "wall decor",
            "lighting",
            "rustic",
            "farmhouse"
        ],
        inStock: true,
        features: [
            "Handmade design",
            "Remote-controlled LEDs",
            "Warm fairy lights",
            "Easy installation",
            "Set of two"
        ],
        rating: 4.4,
        reviewCount: 5632,
        brand: "Generic",
        isOnSale: true
    },
    {
        id: "st-013",
        name: "Smart Garden with LED Grow Light",
        slug: "smart-garden-led-grow-light",
        description: "Grow herbs, vegetables, and flowers year-round indoors! This smart garden includes automatic watering, full-spectrum LED grow light, and app control. Start seeds effortlessly and watch them thrive. Perfect for apartment dwellers, busy professionals, or anyone who wants fresh herbs in their kitchen.",
        shortDescription: "Indoor hydroponic garden with auto-watering and LED grow light",
        price: 99.99,
        category: "home-living",
        image: "/images/products/smart-garden.svg",
        affiliateLink: "https://www.amazon.com/Indoor-Hydroponic-Growing-Automatic-Watering/dp/B08N5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "garden",
            "indoor",
            "hydroponic",
            "smart home"
        ],
        inStock: true,
        features: [
            "Automatic watering",
            "Full-spectrum LED light",
            "App control",
            "Seed starter included",
            "Year-round growing"
        ],
        rating: 4.5,
        reviewCount: 8923,
        brand: "Various"
    },
    {
        id: "st-014",
        name: "Sunset Lamp Projector",
        slug: "sunset-lamp-projector",
        description: "Bring the golden hour into your home any time of day! This sunset lamp projects a realistic sunset glow on your walls, creating a warm, romantic atmosphere. Perfect for photography, mood lighting, or just relaxing. Adjustable angle and intensity. TikTok viral product for a reason - it's absolutely magical.",
        shortDescription: "Projects realistic sunset glow - viral TikTok mood lighting",
        price: 24.99,
        category: "home-living",
        image: "/images/products/sunset-lamp.svg",
        affiliateLink: "https://www.amazon.com/Sunset-Projector-Romantic-Atmosphere-Decoration/dp/B08Q5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "lighting",
            "mood lamp",
            "decor",
            "viral"
        ],
        inStock: true,
        features: [
            "Realistic sunset projection",
            "Adjustable angle",
            "Variable intensity",
            "USB powered",
            "Photography-friendly"
        ],
        rating: 4.3,
        reviewCount: 23456,
        brand: "Various"
    },
    // ========== WEIRD & AWESOME ==========
    {
        id: "st-015",
        name: "Giant Tic-Tac-Toe Lawn Game",
        slug: "giant-tic-tac-toe-lawn-game",
        description: "Super-sized version of the classic game! Perfect for backyard parties, beach days, or camping trips. X and O pieces measure over 2 feet tall, creating an impressive display. Made from durable materials that withstand outdoor elements. Great for kids and adults - brings out everyone's competitive side!",
        shortDescription: "2-foot tall pieces for epic backyard tic-tac-toe battles",
        price: 44.99,
        category: "weird-awesome",
        image: "/images/products/giant-tic-tac-toe.svg",
        affiliateLink: "https://www.amazon.com/Giant-Tic-Tac-Toe-Outdoor/dp/B07K5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "lawn game",
            "outdoor",
            "giant",
            "party"
        ],
        inStock: true,
        features: [
            "2-foot tall pieces",
            "Weather-resistant",
            "Easy setup",
            "Great for parties",
            "All ages"
        ],
        rating: 4.6,
        reviewCount: 3421,
        brand: "Various"
    },
    {
        id: "st-016",
        name: "Talking Pee-Pee Pet Plant",
        slug: "talking-pee-pee-pet-plant",
        description: "The weirdly hilarious plant that talks to you! This animated pet plant responds to touch and voice with over 50 phrases. Features expressive eyes, moving mouth, and swaying leaves. Great desk buddy that'll make everyone laugh. Perfect gift for office workers, plant lovers with a sense of humor, or anyone who needs a smile.",
        shortDescription: "Animated plant that talks back - weirdly hilarious desk buddy!",
        price: 19.99,
        category: "weird-awesome",
        image: "/images/products/talking-plant.svg",
        affiliateLink: "https://www.amazon.com/Talking-Animated-Plant-Phrases/dp/B09J5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "novelty",
            "desk toy",
            "plant",
            "funny"
        ],
        inStock: true,
        features: [
            "50+ phrases",
            "Touch and voice responsive",
            "Moving mouth and eyes",
            "Swaying leaves",
            "USB rechargeable"
        ],
        rating: 4.1,
        reviewCount: 12567,
        brand: "Various"
    },
    {
        id: "st-017",
        name: "Moon Lamp with Realistic Craters",
        slug: "moon-lamp-realistic-craters",
        description: "3D printed moon lamp that looks like the real thing! Based on NASA satellite data, every crater and detail is accurate. Touch-controlled brightness and color temperature (warm white to cool white). Creates a stunning ambient light that's perfect for nurseries, bedrooms, or any space. Comes with wooden stand.",
        shortDescription: "NASA-accurate 3D moon with touch control - out of this world!",
        price: 34.99,
        category: "weird-awesome",
        image: "/images/products/moon-lamp.svg",
        affiliateLink: "https://www.amazon.com/Moon-Lamp-Realistic-Craters-3D-Printed/dp/B07X5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "moon",
            "space",
            "lamp",
            "decor"
        ],
        inStock: true,
        features: [
            "NASA-accurate design",
            "Touch control",
            "Adjustable color temp",
            "Wooden stand included",
            "USB rechargeable"
        ],
        rating: 4.6,
        reviewCount: 18934,
        brand: "Various"
    },
    // ========== GAMING ==========
    {
        id: "st-018",
        name: "Retro Arcade Cabinet for Smartphones",
        slug: "retro-arcade-cabinet-smartphone",
        description: "Transform your phone into a mini arcade machine! This Bluetooth controller features joystick and buttons, works with any smartphone. Preloaded with retro games or connect to your favorite arcade games. Authentic arcade feel with portable convenience. Perfect for nostalgia gaming on the go.",
        shortDescription: "Turn your phone into a mini arcade machine with joystick!",
        price: 29.99,
        category: "gaming",
        image: "/images/products/arcade-cabinet.svg",
        affiliateLink: "https://www.amazon.com/Retro-Arcade-Cabinet-Controller/dp/B08L5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "arcade",
            "retro gaming",
            "controller",
            "portable"
        ],
        inStock: true,
        features: [
            "Bluetooth connection",
            "Joystick and buttons",
            "Universal phone support",
            "Preloaded games",
            "Authentic arcade feel"
        ],
        rating: 4.3,
        reviewCount: 8934,
        brand: "Various"
    },
    {
        id: "st-019",
        name: "8-Bit Water Bottle",
        slug: "8-bit-water-bottle",
        description: "Hydration meets nostalgia! This water bottle features classic 8-bit pixel art designs. Insulated to keep drinks cold for 24 hours or hot for 12 hours. BPA-free, leak-proof, and perfect for gamers, tech enthusiasts, or anyone who loves retro aesthetics. Makes drinking water way more fun.",
        shortDescription: "Insulated bottle with 8-bit pixel art - gaming nostalgia!",
        price: 24.99,
        category: "gaming",
        image: "/images/products/8bit-water-bottle.svg",
        affiliateLink: "https://www.amazon.com/Pixel-Water-Bottle-8-Bit-Design/dp/B08Z5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "water bottle",
            "8-bit",
            "gaming",
            "insulated"
        ],
        inStock: true,
        features: [
            "24hr cold / 12hr hot",
            "8-bit pixel design",
            "BPA-free",
            "Leak-proof",
            "32oz capacity"
        ],
        rating: 4.4,
        reviewCount: 5632,
        brand: "Various"
    },
    // ========== OUTDOOR ==========
    {
        id: "st-020",
        name: "Portable Pizza Oven",
        slug: "portable-pizza-oven",
        description: "Make authentic wood-fired pizza anywhere! This portable oven heats up to 950°F, cooking pizzas in 60 seconds. Gas-powered for easy heat control. Includes pizza peel and thermometer. Perfect for camping, tailgating, backyard parties, or beach trips. Restaurant-quality pizza wherever you go.",
        shortDescription: "Wood-fired pizza in 60 seconds - anywhere you go!",
        price: 349.00,
        originalPrice: 399.00,
        category: "outdoor",
        image: "/images/products/portable-pizza-oven.svg",
        affiliateLink: "https://www.amazon.com/Portable-Pizza-Oven-950°F-Stainless/dp/B07Z5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "pizza",
            "cooking",
            "outdoor",
            "camping"
        ],
        inStock: true,
        features: [
            "Heats to 950°F",
            "60-second cook time",
            "Gas-powered",
            "Includes peel",
            "Portable design"
        ],
        rating: 4.7,
        reviewCount: 4532,
        brand: "Various",
        isOnSale: true
    },
    {
        id: "st-021",
        name: "Solar-Power Camping Lantern with Fan",
        slug: "solar-camping-lantern-fan",
        description: "Two-in-one camping essential! This lantern provides bright LED light and a built-in fan for hot summer nights. Solar-powered with USB backup charging. Hook for hanging, magnetic base for versatile mounting. Perfect for camping, power outages, or outdoor work. Keep cool and illuminated wherever you are.",
        shortDescription: "Solar lantern + fan combo - stay cool and lit outdoors!",
        price: 19.99,
        category: "outdoor",
        image: "/images/products/solar-lantern-fan.svg",
        affiliateLink: "https://www.amazon.com/Solar-Camping-Lantern-Fan-Portable/dp/B08K5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "lantern",
            "fan",
            "solar",
            "camping"
        ],
        inStock: true,
        features: [
            "Bright LED light",
            "Built-in fan",
            "Solar powered",
            "USB backup",
            "Magnetic base"
        ],
        rating: 4.2,
        reviewCount: 12345,
        brand: "Various"
    },
    // ========== HEALTH & WELLNESS ==========
    {
        id: "st-022",
        name: "Medicube Booster Pro",
        slug: "medicube-booster-pro",
        description: "4-in-1 beauty tech device for glass skin! Combines booster mode for better product absorption, microcurrent for fine lines, derma-shot for elasticity, and air shot for pore care. Used for 3 months shows reduced pore size, less redness, and smoother skin. Professional skincare results at home.",
        shortDescription: "4-in-1 beauty tech device for professional skincare at home",
        price: 229.00,
        category: "health-wellness",
        image: "/images/products/medicube-booster-pro.svg",
        affiliateLink: "https://www.amazon.com/Medicube-Booster-Pro-Multifunction/dp/B0D5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "skincare",
            "beauty tech",
            "anti-aging",
            "pore care"
        ],
        inStock: true,
        features: [
            "4 treatment modes",
            "Booster mode",
            "Microcurrent",
            "Derma-shot",
            "Air shot pore care"
        ],
        rating: 4.5,
        reviewCount: 2341,
        brand: "Medicube"
    },
    {
        id: "st-023",
        name: "Sleep Headphones Eye Mask",
        slug: "sleep-headphones-eye-mask",
        description: "Perfect sleep environment in one comfortable mask! Features ultra-thin stereo speakers inside a soft contoured eye mask. Blocks light and delivers soothing music, white noise, or podcasts. 12-hour battery life, washable, and adjustable. Ideal for travel, shift work, or anyone who needs better sleep.",
        shortDescription: "Sleep mask with built-in headphones - dream better!",
        price: 29.99,
        category: "health-wellness",
        image: "/images/products/sleep-headphones-mask.svg",
        affiliateLink: "https://www.amazon.com/Sleep-Headphones-Mask-Wireless-Music/dp/B07Z5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "sleep",
            "headphones",
            "mask",
            "travel"
        ],
        inStock: true,
        features: [
            "Ultra-thin speakers",
            "Light blocking",
            "12-hour battery",
            "Washable",
            "Adjustable fit"
        ],
        rating: 4.4,
        reviewCount: 34567,
        brand: "Various"
    },
    // ========== ART & DESIGN ==========
    {
        id: "st-024",
        name: "3D Printing Pen for Beginners",
        slug: "3d-printing-pen-beginners",
        description: "Draw in 3D! This easy-to-use 3D printing pen extrudes heated plastic that hardens instantly. Create sculptures, decorations, repairs, and art projects. Adjustable temperature and speed, automatic feeding, and filament included. Perfect for creative kids, DIY enthusiasts, or anyone who wants to try 3D creation.",
        shortDescription: "Draw in 3D - create sculptures, art, and DIY projects!",
        price: 39.99,
        category: "art-design",
        image: "/images/products/3d-printing-pen.svg",
        affiliateLink: "https://www.amazon.com/3D-Printing-Pen-Beginners-Temperature/dp/B08X5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "3D printing",
            "art",
            "DIY",
            "creative"
        ],
        inStock: true,
        features: [
            "Easy to use",
            "Adjustable temp/speed",
            "Auto feeding",
            "Filament included",
            "Instant hardening"
        ],
        rating: 4.3,
        reviewCount: 8765,
        brand: "Various"
    },
    {
        id: "st-025",
        name: "Infinity Mirror with Color Changing LEDs",
        slug: "infinity-mirror-color-changing-leds",
        description: "Mesmerizing optical illusion that creates infinite depth! Features color-changing LEDs with multiple patterns. Creates a stunning centerpiece for any room. Remote controlled with adjustable brightness and color. Perfect for mood lighting, parties, or as conversation starter. Hypnotic and beautiful.",
        shortDescription: "Mesmerizing infinite depth illusion - stunning centerpiece!",
        price: 49.99,
        category: "art-design",
        image: "/images/products/infinity-mirror.svg",
        affiliateLink: "https://www.amazon.com/Infinity-Mirror-Color-Changing-Decorative/dp/B08N5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "mirror",
            "LED",
            "optical illusion",
            "decor"
        ],
        inStock: true,
        features: [
            "Infinite depth illusion",
            "Color-changing LEDs",
            "Multiple patterns",
            "Remote controlled",
            "Adjustable brightness"
        ],
        rating: 4.5,
        reviewCount: 5432,
        brand: "Various"
    },
    // ========== MORE PRODUCTS (25-50) ==========
    {
        id: "st-026",
        name: "Wireless Charging Mouse Pad",
        slug: "wireless-charging-mouse-pad",
        description: "Mouse pad that charges your phone! Features 10W fast wireless charging, smooth surface for gaming, RGB lighting, and phone stand. Perfect for gamers or anyone who wants to keep their phone charged while working. Sleek design with non-slip base.",
        shortDescription: "Mouse pad with built-in wireless phone charging + RGB!",
        price: 34.99,
        category: "tech-gadgets",
        image: "/images/products/wireless-mouse-pad.svg",
        affiliateLink: "https://www.amazon.com/Wireless-Charging-Mouse-Pad-RGB/dp/B08K5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "mouse pad",
            "wireless charging",
            "RGB",
            "gaming"
        ],
        inStock: true,
        features: [
            "10W fast charging",
            "RGB lighting",
            "Phone stand",
            "Smooth surface",
            "Non-slip base"
        ],
        rating: 4.4,
        reviewCount: 6789,
        brand: "Various"
    },
    {
        id: "st-027",
        name: "Mini Desktop Vacuum Cleaner",
        slug: "mini-desktop-vacuum-cleaner",
        description: "Keep your desk clean with this adorable mini vacuum! Powerful suction picks up crumbs, dust, and debris. USB rechargeable, compact, and surprisingly effective. Perfect for cleaning keyboards, desk surfaces, and small messes. Makes cleaning fun and easy.",
        shortDescription: "Adorable mini vacuum for desk and keyboard cleaning!",
        price: 14.99,
        category: "home-living",
        image: "/images/products/mini-vacuum.svg",
        affiliateLink: "https://www.amazon.com/Mini-Desktop-Vacuum-Cleaner-Rechargeable/dp/B07Z5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "vacuum",
            "cleaning",
            "desktop",
            "USB rechargeable"
        ],
        inStock: true,
        features: [
            "Powerful suction",
            "USB rechargeable",
            "Compact design",
            "For keyboards",
            "Crumbs & dust"
        ],
        rating: 4.3,
        reviewCount: 23456,
        brand: "Various"
    },
    {
        id: "st-028",
        name: "Smart Water Bottle with Hydration Reminder",
        slug: "smart-water-bottle-hydration-reminder",
        description: "Never forget to drink water again! This smart bottle tracks your intake, glows to remind you to hydrate, and syncs with your phone. 32oz capacity, keeps water cold for 24 hours. BPA-free, leak-proof, and dishwasher safe. Your personal hydration coach!",
        shortDescription: "Smart bottle that tracks hydration and reminds you to drink!",
        price: 34.99,
        category: "health-wellness",
        image: "/images/products/smart-water-bottle.svg",
        affiliateLink: "https://www.amazon.com/Smart-Water-Bottle-Hydration-Reminder/dp/B08X5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "water bottle",
            "smart",
            "hydration",
            "health tracking"
        ],
        inStock: true,
        features: [
            "Tracks intake",
            "Glowing reminders",
            "Phone sync",
            "24hr cold",
            "BPA-free"
        ],
        rating: 4.5,
        reviewCount: 8765,
        brand: "Various"
    },
    {
        id: "st-029",
        name: "Galaxy Star Projector with Music Sync",
        slug: "galaxy-star-projector-music-sync",
        description: "Transform any room into a galaxy! Projects stars and nebulae with rotating patterns. Syncs with music for an immersive experience. Remote controlled with adjustable speed and brightness. Perfect for bedrooms, parties, or relaxation. Create your own universe at home.",
        shortDescription: "Galaxy projector that syncs with music - immersive stargazing!",
        price: 49.99,
        category: "home-living",
        image: "/images/products/galaxy-projector.svg",
        affiliateLink: "https://www.amazon.com/Galaxy-Star-Projector-Music-Sync/dp/B08N5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "projector",
            "stars",
            "galaxy",
            "music sync"
        ],
        inStock: true,
        features: [
            "Star and nebula projection",
            "Music sync",
            "Remote control",
            "Adjustable speed",
            "Dimmable"
        ],
        rating: 4.4,
        reviewCount: 12345,
        brand: "Various"
    },
    {
        id: "st-030",
        name: "Portable Neck Fan with Hands-Free Cooling",
        slug: "portable-neck-fan-hands-free",
        description: "Stay cool anywhere! This wearable neck fan provides 360-degree airflow. Lightweight and comfortable, fits around neck without strain. USB rechargeable with 4-8 hour battery. 3 speed settings. Perfect for outdoor activities, travel, or just hot days. Personal air conditioner you wear!",
        shortDescription: "Wearable neck fan - personal AC for hot days!",
        price: 24.99,
        category: "outdoor",
        image: "/images/products/neck-fan.svg",
        affiliateLink: "https://www.amazon.com/Portable-Neck-Fan-Hands-Free-Cooling/dp/B08K5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "fan",
            "wearable",
            "portable",
            "cooling"
        ],
        inStock: true,
        features: [
            "360-degree airflow",
            "Lightweight",
            "USB rechargeable",
            "3 speeds",
            "Hands-free"
        ],
        rating: 4.2,
        reviewCount: 23456,
        brand: "Various"
    },
    // ========== NEW REAL PRODUCTS (31-60) ==========
    {
        id: "st-031",
        name: "Rocketbook Smart Reusable Notebook",
        slug: "rocketbook-smart-reusable-notebook",
        description: "The last notebook you'll ever need! Write with the included Pilot Frixion pen, scan your notes to the cloud using the Rocketbook app, and then wipe the pages clean with a damp cloth. Features 36 reusable pages and works with Google Drive, Dropbox, Evernote, and more. Eco-friendly and extremely productive.",
        shortDescription: "Reusable cloud-connected notebook - scan and wipe clean!",
        price: 34.00,
        category: "office-setup",
        image: "/images/products/rocketbook.svg",
        affiliateLink: "https://www.amazon.com/Rocketbook-Smart-Reusable-Notebook-Dot-Grid/dp/B01GU6T722?tag=spendthrone-20",
        tags: [
            "notebook",
            "smart office",
            "eco-friendly",
            "productivity"
        ],
        inStock: true,
        features: [
            "Reusable pages",
            "Cloud sync",
            "OCR support",
            "Included pen",
            "Dot grid pattern"
        ],
        rating: 4.5,
        reviewCount: 78902,
        brand: "Rocketbook"
    },
    {
        id: "st-032",
        name: "ScreenBar Halo Monitor Light",
        slug: "screenbar-halo-monitor-light",
        description: "The ultimate monitor light for eye health and desk aesthetics. Features an asymmetric optical design that only illuminates the desk and doesn't reflect on the screen. Includes a wireless controller to adjust brightness and color temperature. Backlight feature creates immersive ambient lighting. High CRI (>95) for accurate color representation.",
        shortDescription: "Premium monitor light bar with wireless controller and backlight",
        price: 179.00,
        category: "office-setup",
        image: "/images/products/screenbar-halo.svg",
        affiliateLink: "https://www.amazon.com/BenQ-ScreenBar-Halo-Controller-Brightness/dp/B08WT889P3?tag=spendthrone-20",
        tags: [
            "monitor light",
            "desk setup",
            "eye care",
            "productivity"
        ],
        inStock: true,
        features: [
            "Wireless controller",
            "No screen glare",
            "Auto dimming",
            "Adjustable warm/cool",
            "Backlight"
        ],
        rating: 4.8,
        reviewCount: 3421,
        brand: "BenQ",
        isNew: true
    },
    {
        id: "st-033",
        name: "Orbitkey Nest Desk Organizer",
        slug: "orbitkey-nest-desk-organizer",
        description: "A portable desk organizer with a built-in wireless charger! Nest provides a home for all your small essentials - keys, cards, pens, and SD cards. The top lid doubles as a 10W wireless charging pad. Includes adjustable dividers to customize the internal space. Perfect for keeping a clean desk or working on the go.",
        shortDescription: "Sleek desk organizer with integrated wireless charging lid",
        price: 109.00,
        category: "office-setup",
        image: "/images/products/orbitkey-nest.svg",
        affiliateLink: "https://www.amazon.com/Orbitkey-Nest-Portable-Organizer-Wireless/dp/B08HJ5Z5Z5?tag=spendthrone-20",
        tags: [
            "organizer",
            "wireless charging",
            "minimalist",
            "EDC"
        ],
        inStock: true,
        features: [
            "10W wireless charge",
            "Adjustable dividers",
            "Elastic pen loop",
            "Zinc alloy hinge",
            "Premium fabric"
        ],
        rating: 4.6,
        reviewCount: 1234,
        brand: "Orbitkey"
    },
    {
        id: "st-034",
        name: "Keychron Q1 Mechanical Keyboard",
        slug: "keychron-q1-mechanical-keyboard",
        description: "The gold standard for enthusiast mechanical keyboards. The Q1 features a fully customizable 75% layout, CNC machined aluminum body, and double-gasket design for a premium typing experience. Hot-swappable switches mean you can change them without soldering. Fully compatible with QMK/VIA for custom key mapping.",
        shortDescription: "Premium all-aluminum customizable mechanical keyboard",
        price: 169.00,
        category: "gaming",
        image: "/images/products/keychron-q1.svg",
        affiliateLink: "https://www.amazon.com/Keychron-Customizable-Mechanical-Keyboard-Hot-swappable/dp/B09968S9YH?tag=spendthrone-20",
        tags: [
            "keyboard",
            "mechanical",
            "custom",
            "gaming"
        ],
        inStock: true,
        features: [
            "Full aluminum body",
            "Hot-swappable",
            "South-facing RGB",
            "Gasket mount",
            "QMK/VIA support"
        ],
        rating: 4.7,
        reviewCount: 4567,
        brand: "Keychron"
    },
    {
        id: "st-035",
        name: "Ember Mug 2 Smart Ceramic Mug",
        slug: "ember-mug-2-smart-ceramic-mug",
        description: "Never drink lukewarm coffee again! This app-controlled smart mug keeps your drink at the exact temperature you prefer (between 120°F - 145°F). Features an 80-minute battery life, or keep it on the included charging coaster for all-day heat. Auto-sleeps when empty or after 2 hours of inactivity. A must-have for slow sippers.",
        shortDescription: "App-controlled heated mug - keeps coffee perfectly hot!",
        price: 129.00,
        category: "home-living",
        image: "/images/products/ember-mug-2.svg",
        affiliateLink: "https://www.amazon.com/Ember-Temperature-Control-Smart-10-oz/dp/B07W8L8TGD?tag=spendthrone-20",
        tags: [
            "smart mug",
            "coffee",
            "kitchen tech",
            "gift"
        ],
        inStock: true,
        features: [
            "App control",
            "120-145°F range",
            "80min battery",
            "Charging coaster",
            "IPX7 waterproof"
        ],
        rating: 4.4,
        reviewCount: 12567,
        brand: "Ember"
    },
    {
        id: "st-036",
        name: "Nanoleaf Shapes Triangles",
        slug: "nanoleaf-shapes-triangles",
        description: "Create your own light masterpiece! These modular LED light panels snap together in any configuration you want. Features 16M+ colors, touch-reactive play, and music sync that visualizes your tunes. Connects to smart home systems like Alexa, Google Home, and Apple HomeKit. Perfect for gaming rooms and home theaters.",
        shortDescription: "Modular smart LED light panels with touch and music sync",
        price: 199.99,
        category: "weird-awesome",
        image: "/images/products/nanoleaf-triangles.svg",
        affiliateLink: "https://www.amazon.com/Nanoleaf-Shapes-Triangles-Smarter-Kit/dp/B08L5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "lighting",
            "smart home",
            "gaming setup",
            "decor"
        ],
        inStock: true,
        features: [
            "Modular design",
            "16M+ colors",
            "Touch reactive",
            "Music visualizer",
            "Smart home sync"
        ],
        rating: 4.6,
        reviewCount: 8934,
        brand: "Nanoleaf"
    },
    {
        id: "st-037",
        name: "Levitating Moon Lamp",
        slug: "levitating-moon-lamp",
        description: "The ultimate conversation piece for your desk or nightstand. This 3D printed moon floats and spins in mid-air using magnetic levitation technology. Features three color modes (warm, cool, yellow) and adjustable brightness. Wireless power transfer illuminates the moon without any cables touching it. Truly magical to watch.",
        shortDescription: "Magnetic levitating 3D printed moon - floats in mid-air!",
        price: 89.99,
        category: "weird-awesome",
        image: "/images/products/levitating-moon.svg",
        affiliateLink: "https://www.amazon.com/Levitating-Moon-Lamp-Floating-Spinning/dp/B08X5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "levitating",
            "moon",
            "space",
            "desk toy"
        ],
        inStock: true,
        features: [
            "Magnetic levitation",
            "Wireless power",
            "3D printed texture",
            "3 color modes",
            "Silent rotation"
        ],
        rating: 4.5,
        reviewCount: 3421,
        brand: "VGAzer"
    },
    {
        id: "st-038",
        name: "Gravity Weighted Blanket",
        slug: "gravity-weighted-blanket",
        description: "The original weighted blanket designed to improve sleep and reduce stress. Uses deep touch pressure stimulation to simulate the feeling of being held or hugged. Features premium glass beads for even weight distribution and a breathable cover for all-season use. Science-backed relaxation for anyone with anxiety or sleep issues.",
        shortDescription: "Premium weighted blanket for better sleep and stress relief",
        price: 249.00,
        category: "health-wellness",
        image: "/images/products/gravity-blanket.svg",
        affiliateLink: "https://www.amazon.com/Gravity-Blanket-Original-Weighted-Premium/dp/B0734297CC?tag=spendthrone-20",
        tags: [
            "sleep",
            "wellness",
            "blanket",
            "relaxation"
        ],
        inStock: true,
        features: [
            "Deep touch pressure",
            "Premium glass beads",
            "Washable cover",
            "Breathable fabric",
            "Stress relief"
        ],
        rating: 4.7,
        reviewCount: 15678,
        brand: "Gravity"
    },
    {
        id: "st-039",
        name: "Oura Ring Gen3",
        slug: "oura-ring-gen3",
        description: "The most advanced wearable health tracker that fits on your finger. Oura tracks your sleep, activity, readiness, and heart rate with incredible accuracy. Features personalized insights into your health and recovery. Titanium construction is lightweight and durable. The stealthiest way to optimize your human performance.",
        shortDescription: "Stealthy titanium smart ring for health and sleep tracking",
        price: 299.00,
        category: "health-wellness",
        image: "/images/products/oura-ring.svg",
        affiliateLink: "https://ouraring.com/product/heritage-silver?tag=spendthrone-20",
        tags: [
            "wearable",
            "smart ring",
            "biohacking",
            "fitness tracker"
        ],
        inStock: true,
        features: [
            "Sleep tracking",
            "Heart rate monitor",
            "Readiness score",
            "7-day battery",
            "Water resistant 100m"
        ],
        rating: 4.6,
        reviewCount: 45210,
        brand: "Oura"
    },
    {
        id: "st-040",
        name: "Theragun Mini 2.0",
        slug: "theragun-mini-2-0",
        description: "Professional-grade massage on the go. The Theragun Mini is now 20% smaller and 30% lighter, but still delivers powerful percussive therapy to relieve aches and pains. Includes three attachments and connects via Bluetooth to the Therabody app for guided routines. QuietForce technology makes it remarkably silent.",
        shortDescription: "Ultra-portable percussive massage gun for muscle recovery",
        price: 199.00,
        category: "health-wellness",
        image: "/images/products/theragun-mini.svg",
        affiliateLink: "https://www.amazon.com/Theragun-Mini-Portable-Percussive-Therapy/dp/B0B6ZS5Z5Z?tag=spendthrone-20",
        tags: [
            "massage",
            "recovery",
            "fitness",
            "portable"
        ],
        inStock: true,
        features: [
            "3 speeds",
            "Compact design",
            "3 attachments",
            "Bluetooth sync",
            "QuietForce tech"
        ],
        rating: 4.8,
        reviewCount: 8934,
        brand: "Therabody"
    },
    {
        id: "st-041",
        name: "Nintendo Switch OLED Model",
        slug: "nintendo-switch-oled-model",
        description: "The ultimate way to play your favorite Nintendo games. Features a vibrant 7-inch OLED screen, a wide adjustable stand, a dock with a wired LAN port, 64GB of internal storage, and enhanced audio. Switch between handheld, tabletop, and TV modes seamlessly. Crisp visuals and perfect contrast for gaming anywhere.",
        shortDescription: "Upgraded Nintendo Switch with stunning 7-inch OLED screen",
        price: 349.99,
        category: "gaming",
        image: "/images/products/switch-oled.svg",
        affiliateLink: "https://www.amazon.com/Nintendo-Switch-OLED-Model-Neon-Blue/dp/B098RKBCS6?tag=spendthrone-20",
        tags: [
            "nintendo",
            "console",
            "gaming",
            "portable"
        ],
        inStock: true,
        features: [
            "7\" OLED screen",
            "Adjustable stand",
            "64GB storage",
            "LAN port in dock",
            "Enhanced audio"
        ],
        rating: 4.9,
        reviewCount: 125678,
        brand: "Nintendo"
    },
    {
        id: "st-042",
        name: "Steam Deck OLED 512GB",
        slug: "steam-deck-oled-512gb",
        description: "The most powerful handheld gaming PC in the world, now with an OLED screen. Play your entire Steam library wherever you go with impressive performance and a beautiful high-contrast display. Features a larger battery for 30-50% more playtime. Ergonomic controls and a desktop-class experience in your hands.",
        shortDescription: "Powerful handheld PC gaming with HDR OLED display",
        price: 549.00,
        category: "gaming",
        image: "/images/products/steam-deck-oled.svg",
        affiliateLink: "https://store.steampowered.com/steamdeck",
        tags: [
            "pc gaming",
            "handheld",
            "steam",
            "portable"
        ],
        inStock: true,
        features: [
            "HDR OLED",
            "90Hz refresh",
            "512GB NVMe SSD",
            "Large battery",
            "Wi-Fi 6E"
        ],
        rating: 4.8,
        reviewCount: 34567,
        brand: "Valve"
    },
    {
        id: "st-043",
        name: "Backbone One Mobile Controller",
        slug: "backbone-one-mobile-controller",
        description: "Transform your iPhone or Android into the ultimate gaming console. Backbone One features responsive analog triggers, tactile buttons, and clickable thumbsticks for a low-latency gaming experience. Plugs directly into your phone's port. Perfect for Remote Play, Cloud Gaming (Game Pass, GeForce Now), and native mobile games.",
        shortDescription: "Turn your smartphone into a portable gaming console",
        price: 99.99,
        category: "gaming",
        image: "/images/products/backbone-one.svg",
        affiliateLink: "https://www.amazon.com/Backbone-One-Mobile-Gaming-Controller-iPhone/dp/B08RL7VK7B?tag=spendthrone-20",
        tags: [
            "controller",
            "mobile gaming",
            "iphone",
            "android"
        ],
        inStock: true,
        features: [
            "Low latency",
            "Passthrough charging",
            "3.5mm jack",
            "Record/Screenshot button",
            "Collapsible design"
        ],
        rating: 4.7,
        reviewCount: 23456,
        brand: "Backbone"
    },
    {
        id: "st-044",
        name: "BioLite CampStove 2+",
        slug: "biolite-campstove-2-plus",
        description: "Cook your meals and charge your gear using only wood! This genius camp stove converts heat from your fire into electricity to charge your phone and other devices. Features an integrated battery to store power when the fire is out. Internal fan creates a smokeless, efficient flame. A must-have for emergency kits and camping.",
        shortDescription: "Smokeless wood stove that generates electricity to charge gadgets",
        price: 149.95,
        category: "outdoor",
        image: "/images/products/biolite-campstove.svg",
        affiliateLink: "https://www.amazon.com/BioLite-CampStove-Electricity-Generating-Smokeless-Burning/dp/B08L5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "camping",
            "cooking",
            "survival",
            "off-grid"
        ],
        inStock: true,
        features: [
            "Charges gear",
            "Smokeless fire",
            "Built-in battery",
            "LED dashboard",
            "Burns twigs/wood"
        ],
        rating: 4.6,
        reviewCount: 5678,
        brand: "BioLite"
    },
    {
        id: "st-045",
        name: "Grayl GeoPress Water Purifier",
        slug: "grayl-geopress-water-purifier",
        description: "The fastest water purifier on Earth. Press for 8 seconds to get clean, drinkable water from any dirty source - rivers, lakes, or sketchy hotel taps. Removes viruses, bacteria, protozoa, and heavy metals. No pumping, sucking, or waiting required. Perfect for international travel and outdoor adventures.",
        shortDescription: "Purify water in 8 seconds - removes viruses and bacteria",
        price: 99.95,
        category: "outdoor",
        image: "/images/products/grayl-geopress.svg",
        affiliateLink: "https://www.amazon.com/GRAYL-GeoPress-Water-Purifier-Bottle/dp/B07M6T7S5Z?tag=spendthrone-20",
        tags: [
            "water filter",
            "survival",
            "travel",
            "outdoor"
        ],
        inStock: true,
        features: [
            "Removes viruses",
            "8-second press",
            "24oz capacity",
            "BPA-free",
            "Replaceable filter"
        ],
        rating: 4.8,
        reviewCount: 12345,
        brand: "Grayl"
    },
    {
        id: "st-046",
        name: "Rumpl NanoLoft Puffy Blanket",
        slug: "rumpl-nanoloft-puffy-blanket",
        description: "A down-alternative blanket that feels like your favorite sleeping bag. Rumpl blankets are water-resistant, stain-resistant, and machine washable. Made from 100% recycled materials. Includes a Cape Clip for hands-free use around the campfire. Packable and lightweight - the ultimate companion for beach, park, or woods.",
        shortDescription: "Weatherproof packable blanket made from recycled materials",
        price: 179.00,
        category: "outdoor",
        image: "/images/products/rumpl-blanket.svg",
        affiliateLink: "https://www.amazon.com/Rumpl-NanoLoft-Puffy-Blanket-Outdoor/dp/B08N5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "blanket",
            "camping",
            "eco-friendly",
            "outdoor"
        ],
        inStock: true,
        features: [
            "Recycled insulation",
            "DWR finish",
            "Cape clip",
            "Corner loops",
            "Stuff sack included"
        ],
        rating: 4.7,
        reviewCount: 8934,
        brand: "Rumpl"
    },
    {
        id: "st-047",
        name: "Lomi Smart Kitchen Composter",
        slug: "lomi-smart-kitchen-composter",
        description: "Turn your food scraps into nutrient-rich dirt overnight! Lomi is a sleek countertop appliance that breaks down waste (including some bioplastics) using heat, abrasion, and oxygen. Reduces food waste volume by up to 80% and eliminates odors. Perfect for apartment dwellers and eco-conscious families.",
        shortDescription: "Countertop appliance that turns food waste into dirt in hours",
        price: 499.00,
        category: "kitchen-gadgets",
        image: "/images/products/lomi-composter.svg",
        affiliateLink: "https://www.amazon.com/Lomi-Kitchen-Composter-Turn-Waste/dp/B09R5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "composter",
            "kitchen tech",
            "eco-friendly",
            "smart home"
        ],
        inStock: true,
        features: [
            "Odor free",
            "Overnight dirt",
            "Reduces waste 80%",
            "Quiet operation",
            "Bioplastic support"
        ],
        rating: 4.4,
        reviewCount: 5678,
        brand: "Pela",
        isNew: true
    },
    {
        id: "st-048",
        name: "Meater 2 Plus Smart Meat Thermometer",
        slug: "meater-2-plus-smart-meat-thermometer",
        description: "The first truly wireless smart meat thermometer. MEATER lets you monitor your cook from a phone or tablet. Uses AI to estimate how long to cook and rest your food. Features 5 internal sensors and can withstand ambient temperatures up to 1000°F - perfect for high-heat searing and deep frying. Be a pro chef every time.",
        shortDescription: "Wireless smart meat thermometer with AI cook time estimation",
        price: 129.95,
        category: "kitchen-gadgets",
        image: "/images/products/meater-thermometer.svg",
        affiliateLink: "https://www.amazon.com/MEATER-Thermometer-Rotisserie-Bluetooth-Connectivity/dp/B0CN5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "thermometer",
            "BBQ",
            "cooking",
            "smart kitchen"
        ],
        inStock: true,
        features: [
            "100% wireless",
            "AI cook time",
            "1000°F resistant",
            "App alerts",
            "Dishwasher safe"
        ],
        rating: 4.8,
        reviewCount: 23456,
        brand: "Apption Labs"
    },
    {
        id: "st-049",
        name: "Bartesian Premium Cocktail Machine",
        slug: "bartesian-premium-cocktail-machine",
        description: "Like a Nespresso for cocktails! Insert a cocktail capsule, select your strength, and press a button. Bartesian mixes your chosen spirits with the real juices and bitters in the capsule to create a perfect cocktail in seconds. Includes 4 glass bottles for your favorite spirits. Professional mixology without the mess.",
        shortDescription: "Automatic cocktail maker with real spirit bottles and capsules",
        price: 369.00,
        category: "kitchen-gadgets",
        image: "/images/products/bartesian.svg",
        affiliateLink: "https://www.amazon.com/Bartesian-Premium-Cocktail-Margarita-Machine/dp/B07N8Z5Z5Z?tag=spendthrone-20",
        tags: [
            "cocktail",
            "bar tech",
            "appliance",
            "party"
        ],
        inStock: true,
        features: [
            "Real spirit bottles",
            "Adjustable strength",
            "Self-cleaning",
            "Capsule-based",
            "Perfect mix every time"
        ],
        rating: 4.6,
        reviewCount: 18934,
        brand: "Bartesian"
    },
    {
        id: "st-050",
        name: "Revolution InstaGLO R180S Toaster",
        slug: "revolution-instaglo-r180s-toaster",
        description: "The world's first smart toaster with a touchscreen. Features InstaGLO heating technology that sears bread without drying it out, resulting in toast that is crunchy on the outside and soft on the inside. 60+ settings for bread, bagels, waffles, and more. Includes a countdown timer and a custom digital clock. A total flex for your kitchen.",
        shortDescription: "Touchscreen smart toaster with InstaGLO flash-searing tech",
        price: 349.00,
        category: "kitchen-gadgets",
        image: "/images/products/revolution-toaster.svg",
        affiliateLink: "https://www.amazon.com/Revolution-InstaGLO-2-Slice-Smart-Toaster/dp/B08X5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "toaster",
            "smart home",
            "kitchen tech",
            "luxury"
        ],
        inStock: true,
        features: [
            "Touchscreen UI",
            "InstaGLO technology",
            "Customizable settings",
            "Crumb tray sensor",
            "On-screen clock"
        ],
        rating: 4.3,
        reviewCount: 5678,
        brand: "Revolution Cooking",
        isOnSale: true
    },
    {
        id: "st-051",
        name: "Remarkable 2 Paper Tablet",
        slug: "remarkable-2-paper-tablet",
        description: "The world's thinnest tablet that feels exactly like paper. Remarkable 2 is designed for focus - no notifications, no social media, just you and your thoughts. Perfect for note-taking, sketching, and reading PDFs. Convert handwritten notes to text and sync everything across your devices. A minimalist's dream for deep work.",
        shortDescription: "Paper-like digital tablet for distraction-free writing",
        price: 399.00,
        category: "office-setup",
        image: "/images/products/remarkable-2.svg",
        affiliateLink: "https://remarkable.com/store/remarkable-2",
        tags: [
            "e-ink",
            "tablet",
            "productivity",
            "writing"
        ],
        inStock: true,
        features: [
            "4.7mm thin",
            "Weeks of battery",
            "Handwriting to text",
            "Low latency pen",
            "Cloud sync"
        ],
        rating: 4.5,
        reviewCount: 34210,
        brand: "reMarkable"
    },
    {
        id: "st-052",
        name: "Steelcase Gesture Office Chair",
        slug: "steelcase-gesture-office-chair",
        description: "Regarded by many as the greatest office chair ever made. Gesture was designed after studying 2,000 people in different postures. Its arms move like a human arm to support any device you're using. Features a 3D LiveBack system that mimics the movement of the spine. The ultimate investment in your long-term health and productivity.",
        shortDescription: "The world's most ergonomic office chair for modern work",
        price: 1399.00,
        category: "office-setup",
        image: "/images/products/steelcase-gesture.svg",
        affiliateLink: "https://www.amazon.com/Steelcase-Gesture-Chair-Graphite-Fabric/dp/B00HFE27GM?tag=spendthrone-20",
        tags: [
            "ergonomic",
            "chair",
            "office setup",
            "premium"
        ],
        inStock: true,
        features: [
            "360 arms",
            "Adaptive bolster",
            "Core equalizer",
            "LiveBack technology",
            "12-year warranty"
        ],
        rating: 4.8,
        reviewCount: 2341,
        brand: "Steelcase"
    },
    {
        id: "st-053",
        name: "Elgato Stream Deck MK.2",
        slug: "elgato-stream-deck-mk-2",
        description: "15 customizable LCD keys to control your apps, tools, and platforms. Beyond streaming, it's a massive productivity booster for any computer user. Automate complex workflows, launch apps, and control your smart home with a single tap. Features interchangeable faceplates and a detachable stand. A physical control center for your digital life.",
        shortDescription: "Customizable LCD key controller for automation and streaming",
        price: 149.99,
        category: "office-setup",
        image: "/images/products/stream-deck.svg",
        affiliateLink: "https://www.amazon.com/Elgato-Stream-Deck-MK-2-Customizable/dp/B09738CV2G?tag=spendthrone-20",
        tags: [
            "automation",
            "macro pad",
            "streaming",
            "productivity"
        ],
        inStock: true,
        features: [
            "15 LCD keys",
            "App integration",
            "Multi-actions",
            "Custom icons",
            "Detachable stand"
        ],
        rating: 4.8,
        reviewCount: 45678,
        brand: "Elgato"
    },
    {
        id: "st-054",
        name: "BenQ PD3220U Designer Monitor",
        slug: "benq-pd3220u-designer-monitor",
        description: "The ultimate 32-inch 4K monitor for creators. Features 100% sRGB and 95% P3 color space with factory calibration. Includes Thunderbolt 3 for single-cable connectivity to Mac or PC. DualView mode lets you compare designs in two color modes side-by-side. Includes the Hotkey Puck G2 for quick setting adjustments.",
        shortDescription: "Professional 32\" 4K monitor with flawless color accuracy",
        price: 1099.00,
        category: "office-setup",
        image: "/images/products/benq-monitor.svg",
        affiliateLink: "https://www.amazon.com/BenQ-PD3220U-Monitor-Thunderbolt-DisplayPort/dp/B07N4PS6GR?tag=spendthrone-20",
        tags: [
            "monitor",
            "design",
            "4K",
            "Thunderbolt 3"
        ],
        inStock: true,
        features: [
            "4K UHD",
            "IPS panel",
            "Thunderbolt 3",
            "KVM switch",
            "Hotkey Puck G2"
        ],
        rating: 4.6,
        reviewCount: 1234,
        brand: "BenQ"
    },
    {
        id: "st-055",
        name: "Herman Miller Embody Gaming Chair",
        slug: "herman-miller-embody-gaming-chair",
        description: "Developed in partnership with Logitech G, this is the ultimate gaming throne. Embody features a pixelated support system that automatically conforms to your body's micro-movements. Includes an additional layer of cooling foam for long gaming sessions. Promotes blood flow and reduces heart rate while sitting. Science-led comfort.",
        shortDescription: "The most advanced gaming chair designed for posture and health",
        price: 1995.00,
        category: "gaming",
        image: "/images/products/embody-gaming.svg",
        affiliateLink: "https://www.hermanmiller.com/products/seating/office-chairs/embody-gaming-chair?tag=spendthrone-20",
        tags: [
            "gaming chair",
            "ergonomic",
            "premium",
            "Logitech G"
        ],
        inStock: true,
        features: [
            "Pixelated support",
            "Cooling foam",
            "Sync tilt",
            "Pressure distribution",
            "PostureFit hardware"
        ],
        rating: 4.9,
        reviewCount: 8934,
        brand: "Herman Miller"
    },
    {
        id: "st-056",
        name: "Logitech G Pro X Superlight 2",
        slug: "logitech-g-pro-x-superlight-2",
        description: "The world's most iconic pro gaming mouse, refined. Weighing just 60 grams, it features LIGHTFORCE hybrid switches for incredible speed and precision. The HERO 2 sensor offers 32K DPI and 2K polling rate. Used by the world's top esports athletes to win championships. Zero compromises, pure performance.",
        shortDescription: "Ultra-lightweight wireless pro gaming mouse for esports",
        price: 159.00,
        category: "gaming",
        image: "/images/products/gpro-superlight.svg",
        affiliateLink: "https://www.amazon.com/Logitech-Superlight-Lightweight-Wireless-Programmable/dp/B0BZSZSZSZ?tag=spendthrone-20",
        tags: [
            "gaming mouse",
            "wireless",
            "esports",
            "Logitech G"
        ],
        inStock: true,
        features: [
            "60g weight",
            "HERO 2 sensor",
            "2000Hz polling",
            "USB-C charging",
            "95hr battery"
        ],
        rating: 4.8,
        reviewCount: 5678,
        brand: "Logitech G"
    },
    {
        id: "st-057",
        name: "Govee Glide Hexa Light Panels",
        slug: "govee-glide-hexa-light-panels",
        description: "Transform your walls into a futuristic art gallery. These hexagonal light panels feature RGBIC technology to display multiple colors on a single panel. Features a unique 3D design that adds depth to your wall. Syncs with music and game audio for an immersive setup. Easy installation with included adhesive strips.",
        shortDescription: "Futuristic 3D hexagonal LED wall panels with RGBIC",
        price: 179.99,
        category: "weird-awesome",
        image: "/images/products/govee-hexa.svg",
        affiliateLink: "https://www.amazon.com/Govee-Glide-Hexa-Light-Panels/dp/B09968S9YH?tag=spendthrone-20",
        tags: [
            "lighting",
            "RGB",
            "gaming room",
            "decor"
        ],
        inStock: true,
        features: [
            "3D design",
            "RGBIC tech",
            "Music sync",
            "App control",
            "Modular layout"
        ],
        rating: 4.7,
        reviewCount: 12345,
        brand: "Govee"
    },
    {
        id: "st-058",
        name: "Dyson V15 Detect Cordless Vacuum",
        slug: "dyson-v15-detect",
        description: "The most powerful, intelligent cordless vacuum. Features a laser that reveals microscopic dust you can't normally see. A piezo sensor continuously sizes and counts dust particles, automatically increasing suction power when needed. LCD screen shows real-time proof of a deep clean. High-torque cleaner head with anti-tangle technology.",
        shortDescription: "Powerful cordless vacuum with laser dust detection",
        price: 749.99,
        category: "home-living",
        image: "/images/products/dyson-v15.svg",
        affiliateLink: "https://www.amazon.com/Dyson-V15-Detect-Cordless-Vacuum/dp/B08X5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "vacuum",
            "home appliance",
            "tech",
            "cleaning"
        ],
        inStock: true,
        features: [
            "Laser detection",
            "Piezo sensor",
            "60min runtime",
            "HEPA filtration",
            "LCD screen"
        ],
        rating: 4.6,
        reviewCount: 34567,
        brand: "Dyson",
        isOnSale: true
    },
    {
        id: "st-059",
        name: "Samsung The Frame TV (2024)",
        slug: "samsung-the-frame-tv-2024",
        description: "A TV when it's on, art when it's off. The Frame features a matte display that virtually eliminates reflections and looks like a real canvas. Art Mode lets you display your own photos or choose from a library of professional art. Includes a slim-fit wall mount and customizable bezels to match your decor. The most beautiful TV ever made.",
        shortDescription: "4K QLED TV that looks like a masterpiece on your wall",
        price: 1499.00,
        category: "home-living",
        image: "/images/products/samsung-frame.svg",
        affiliateLink: "https://www.amazon.com/SAMSUNG-55-Inch-Class-QLED-Frame/dp/B0CXSZSZSZ?tag=spendthrone-20",
        tags: [
            "TV",
            "smart home",
            "art",
            "decor"
        ],
        inStock: true,
        features: [
            "Matte display",
            "Art Mode",
            "4K QLED",
            "Slim wall mount",
            "Motion sensor"
        ],
        rating: 4.5,
        reviewCount: 12345,
        brand: "Samsung"
    },
    {
        id: "st-060",
        name: "Fellow Stagg EKG Pro Studio Edition",
        slug: "fellow-stagg-ekg-pro",
        description: "The ultimate electric kettle for coffee nerds. The Pro Studio edition features a beautiful glass base, walnut accents, and advanced brewing features like altitude settings, pre-boil, and scheduling. Precise gooseneck pour for perfect extraction. Features a high-resolution color screen and Wi-Fi connectivity for firmware updates.",
        shortDescription: "Precision electric gooseneck kettle with glass base",
        price: 255.00,
        category: "kitchen-gadgets",
        image: "/images/products/fellow-stagg.svg",
        affiliateLink: "https://www.amazon.com/Fellow-Stagg-Pro-Studio-Gooseneck/dp/B0BZSZSZSZ?tag=spendthrone-20",
        tags: [
            "coffee",
            "kettle",
            "kitchen tech",
            "premium"
        ],
        inStock: true,
        features: [
            "Precise temp",
            "Glass base",
            "Walnut handle",
            "Scheduling",
            "Color screen"
        ],
        rating: 4.8,
        reviewCount: 3421,
        brand: "Fellow",
        isNew: true
    }
];
const getProductsByCategory = (category)=>{
    return realProducts.filter((p)=>p.category === category);
};
const getFeaturedProducts = ()=>{
    return realProducts.filter((p)=>p.rating >= 4.5).slice(0, 8);
};
const getNewArrivals = ()=>{
    return realProducts.filter((p)=>p.isNew).slice(0, 8);
};
const getSaleProducts = ()=>{
    return realProducts.filter((p)=>p.isOnSale).slice(0, 8);
};
const getProductBySlug = (slug)=>{
    return realProducts.find((p)=>p.slug === slug);
};
const searchProducts = (query)=>{
    const lowerQuery = query.toLowerCase();
    return realProducts.filter((p)=>p.name.toLowerCase().includes(lowerQuery) || p.description.toLowerCase().includes(lowerQuery) || p.tags.some((t)=>t.toLowerCase().includes(lowerQuery)));
};
}),
"[project]/data/products.ts [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getNewArrivals",
    ()=>getNewArrivals,
    "getProductById",
    ()=>getProductById,
    "getProductBySlug",
    ()=>getProductBySlug,
    "getProductsByCategory",
    ()=>getProductsByCategory,
    "getRelatedProducts",
    ()=>getRelatedProducts,
    "getTrendingProducts",
    ()=>getTrendingProducts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$real$2d$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/real-products.ts [app-rsc] (ecmascript)");
;
;
const getProductById = (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$real$2d$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["realProducts"].find((p)=>p.id === id);
const getProductBySlug = (slug)=>__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$real$2d$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["realProducts"].find((p)=>p.slug === slug);
const getProductsByCategory = (category)=>category === 'all' ? __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$real$2d$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["realProducts"] : __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$real$2d$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["realProducts"].filter((p)=>p.category === category);
const getRelatedProducts = (productId, limit = 4)=>{
    const product = getProductById(productId);
    if (!product) return [];
    return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$real$2d$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["realProducts"].filter((p)=>p.category === product.category && p.id !== productId).slice(0, limit);
};
const getTrendingProducts = (limit = 8)=>__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$real$2d$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["realProducts"].filter((p)=>(p.rating || 0) >= 4.5).slice(0, limit);
const getNewArrivals = (limit = 8)=>__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$real$2d$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["realProducts"].filter((p)=>p.isNew).slice(0, limit);
}),
"[project]/data/real-products.ts [app-rsc] (ecmascript) <export realProducts as PRODUCTS>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PRODUCTS",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$real$2d$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["realProducts"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$real$2d$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/real-products.ts [app-rsc] (ecmascript)");
}),
"[project]/app/product/[slug]/ProductDetailClient.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/app/product/[slug]/ProductDetailClient.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/product/[slug]/ProductDetailClient.tsx <module evaluation>", "default");
}),
"[project]/app/product/[slug]/ProductDetailClient.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/app/product/[slug]/ProductDetailClient.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/product/[slug]/ProductDetailClient.tsx", "default");
}),
"[project]/app/product/[slug]/ProductDetailClient.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$product$2f5b$slug$5d2f$ProductDetailClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/app/product/[slug]/ProductDetailClient.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$product$2f5b$slug$5d2f$ProductDetailClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/app/product/[slug]/ProductDetailClient.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$product$2f5b$slug$5d2f$ProductDetailClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/product/[slug]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductDetailPage,
    "dynamic",
    ()=>dynamic,
    "dynamicParams",
    ()=>dynamicParams,
    "generateStaticParams",
    ()=>generateStaticParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
/**
 * Product Detail Page - Static Export Compatible
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/data/products.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$real$2d$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__realProducts__as__PRODUCTS$3e$__ = __turbopack_context__.i("[project]/data/real-products.ts [app-rsc] (ecmascript) <export realProducts as PRODUCTS>");
// Import the client component
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$product$2f5b$slug$5d2f$ProductDetailClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/product/[slug]/ProductDetailClient.tsx [app-rsc] (ecmascript)");
;
;
function generateStaticParams() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$real$2d$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__realProducts__as__PRODUCTS$3e$__["PRODUCTS"].map((product)=>({
            slug: product.slug
        }));
}
const dynamic = 'error';
const dynamicParams = false;
;
function ProductDetailPage({ params }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$product$2f5b$slug$5d2f$ProductDetailClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
        slug: params.slug
    }, void 0, false, {
        fileName: "[project]/app/product/[slug]/page.tsx",
        lineNumber: 22,
        columnNumber: 10
    }, this);
}
}),
"[project]/app/product/[slug]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/product/[slug]/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5282fc34._.js.map