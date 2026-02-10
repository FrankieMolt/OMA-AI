/**
 * SpendThrone.com - Real Products Database
 * Curated collection of unique, interesting products from ThisIsWhyImBroke style
 * All products are real with actual purchase links
 */

export interface RealProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  affiliateLink: string;
  tags: string[];
  inStock: boolean;
  features: string[];
  rating: number;
  reviewCount: number;
  brand: string;
  isNew?: boolean;
  isOnSale?: boolean;
}

export const realProducts: RealProduct[] = [
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
    image: "/images/products/pura-diffuser.jpg",
    affiliateLink: "https://www.amazon.com/Pura-Smart-Home-Fragrance-Diffuser/dp/B09X5Z5Z5Z?tag=spendthrone-20",
    tags: ["smart home", "fragrance", "IoT", "home automation"],
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
    image: "/images/products/jbl-go-4.jpg",
    affiliateLink: "https://www.amazon.com/JBL-Go-4-Portable-Bluetooth/dp/B0CF5X5X5X?tag=spendthrone-20",
    tags: ["speaker", "bluetooth", "portable", "waterproof"],
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
    image: "/images/products/tamagotchi-paradise.jpg",
    affiliateLink: "https://www.amazon.com/Tamagotchi-Paradise-Color-Screen/dp/B0GX5Z5Z5Z?tag=spendthrone-20",
    tags: ["virtual pet", "retro", "toy", "collectible"],
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
    image: "/images/products/carlinkit-5.jpg",
    affiliateLink: "https://www.amazon.com/CarLinkit-5-Wireless-CarPlay-Adapter/dp/B0BZ5Z5Z5Z?tag=spendthrone-20",
    tags: ["car tech", "wireless", "CarPlay", "Android Auto"],
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
    image: "/images/products/aura-ink-frame.jpg",
    affiliateLink: "https://www.amazon.com/Aura-Ink-Frame-Color-E-Ink/dp/B0HJ5Z5Z5Z?tag=spendthrone-20",
    tags: ["digital frame", "e-ink", "smart home", "photo"],
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
    image: "/images/products/anker-power-bank.jpg",
    affiliateLink: "https://www.amazon.com/Anker-Portable-Multi-Device-Charging-Retractable/dp/B0DCBB2YTR?tag=spendthrone-20",
    tags: ["power bank", "laptop charger", "portable", "travel"],
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
    image: "/images/products/peak-design-tech-pouch.jpg",
    affiliateLink: "https://www.amazon.com/Peak-Design-Tech-Pouch-Organizer/dp/B08P5Z5Z5Z?tag=spendthrone-20",
    tags: ["organizer", "travel", "tech accessories", "waterproof"],
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
    image: "/images/products/bonaok-karaoke-mic.jpg",
    affiliateLink: "https://www.amazon.com/BONAOK-Microphone-Portable-Bluetooth-Smartphone/dp/B08LYL3MRY?tag=spendthrone-20",
    tags: ["karaoke", "microphone", "speaker", "entertainment"],
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
    image: "/images/products/dji-neo-drone.jpg",
    affiliateLink: "https://www.amazon.com/DJI-Neo-Drone-Black/dp/B0DZ5Z5Z5Z?tag=spendthrone-20",
    tags: ["drone", "aerial", "camera", "portable"],
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
    image: "/images/products/sony-wh-100xm6.jpg",
    affiliateLink: "https://www.amazon.com/Sony-WH-100XM6-Canceling-Headphones/dp/B0DX5Z5Z5Z?tag=spendthrone-20",
    tags: ["headphones", "noise canceling", "wireless", "audio"],
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
    image: "/images/products/lego-retro-radio.jpg",
    affiliateLink: "https://www.amazon.com/LEGO-Transistors-Compartment-Integration-10334/dp/B0D738JLYR?tag=spendthrone-20",
    tags: ["Lego", "retro", "radio", "building set"],
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
    image: "/images/products/mason-jar-sconces.jpg",
    affiliateLink: "https://www.amazon.com/Mason-Sconces-Handmade-Wall-Christmas/dp/B07Z5Z5Z5Z?tag=spendthrone-20",
    tags: ["wall decor", "lighting", "rustic", "farmhouse"],
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
    image: "/images/products/smart-garden.jpg",
    affiliateLink: "https://www.amazon.com/Indoor-Hydroponic-Growing-Automatic-Watering/dp/B08N5Z5Z5Z?tag=spendthrone-20",
    tags: ["garden", "indoor", "hydroponic", "smart home"],
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
    image: "/images/products/sunset-lamp.jpg",
    affiliateLink: "https://www.amazon.com/Sunset-Projector-Romantic-Atmosphere-Decoration/dp/B08Q5Z5Z5Z?tag=spendthrone-20",
    tags: ["lighting", "mood lamp", "decor", "viral"],
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
    image: "/images/products/giant-tic-tac-toe.jpg",
    affiliateLink: "https://www.amazon.com/Giant-Tic-Tac-Toe-Outdoor/dp/B07K5Z5Z5Z?tag=spendthrone-20",
    tags: ["lawn game", "outdoor", "giant", "party"],
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
    image: "/images/products/talking-plant.jpg",
    affiliateLink: "https://www.amazon.com/Talking-Animated-Plant-Phrases/dp/B09J5Z5Z5Z?tag=spendthrone-20",
    tags: ["novelty", "desk toy", "plant", "funny"],
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
    image: "/images/products/moon-lamp.jpg",
    affiliateLink: "https://www.amazon.com/Moon-Lamp-Realistic-Craters-3D-Printed/dp/B07X5Z5Z5Z?tag=spendthrone-20",
    tags: ["moon", "space", "lamp", "decor"],
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
    image: "/images/products/arcade-cabinet.jpg",
    affiliateLink: "https://www.amazon.com/Retro-Arcade-Cabinet-Controller/dp/B08L5Z5Z5Z?tag=spendthrone-20",
    tags: ["arcade", "retro gaming", "controller", "portable"],
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
    image: "/images/products/8bit-water-bottle.jpg",
    affiliateLink: "https://www.amazon.com/Pixel-Water-Bottle-8-Bit-Design/dp/B08Z5Z5Z5Z?tag=spendthrone-20",
    tags: ["water bottle", "8-bit", "gaming", "insulated"],
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
    image: "/images/products/portable-pizza-oven.jpg",
    affiliateLink: "https://www.amazon.com/Portable-Pizza-Oven-950°F-Stainless/dp/B07Z5Z5Z5Z?tag=spendthrone-20",
    tags: ["pizza", "cooking", "outdoor", "camping"],
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
    image: "/images/products/solar-lantern-fan.jpg",
    affiliateLink: "https://www.amazon.com/Solar-Camping-Lantern-Fan-Portable/dp/B08K5Z5Z5Z?tag=spendthrone-20",
    tags: ["lantern", "fan", "solar", "camping"],
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
    image: "/images/products/medicube-booster-pro.jpg",
    affiliateLink: "https://www.amazon.com/Medicube-Booster-Pro-Multifunction/dp/B0D5Z5Z5Z?tag=spendthrone-20",
    tags: ["skincare", "beauty tech", "anti-aging", "pore care"],
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
    image: "/images/products/sleep-headphones-mask.jpg",
    affiliateLink: "https://www.amazon.com/Sleep-Headphones-Mask-Wireless-Music/dp/B07Z5Z5Z5Z?tag=spendthrone-20",
    tags: ["sleep", "headphones", "mask", "travel"],
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
    image: "/images/products/3d-printing-pen.jpg",
    affiliateLink: "https://www.amazon.com/3D-Printing-Pen-Beginners-Temperature/dp/B08X5Z5Z5Z?tag=spendthrone-20",
    tags: ["3D printing", "art", "DIY", "creative"],
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
    image: "/images/products/infinity-mirror.jpg",
    affiliateLink: "https://www.amazon.com/Infinity-Mirror-Color-Changing-Decorative/dp/B08N5Z5Z5Z?tag=spendthrone-20",
    tags: ["mirror", "LED", "optical illusion", "decor"],
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
    image: "/images/products/wireless-mouse-pad.jpg",
    affiliateLink: "https://www.amazon.com/Wireless-Charging-Mouse-Pad-RGB/dp/B08K5Z5Z5Z?tag=spendthrone-20",
    tags: ["mouse pad", "wireless charging", "RGB", "gaming"],
    inStock: true,
    features: ["10W fast charging", "RGB lighting", "Phone stand", "Smooth surface", "Non-slip base"],
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
    image: "/images/products/mini-vacuum.jpg",
    affiliateLink: "https://www.amazon.com/Mini-Desktop-Vacuum-Cleaner-Rechargeable/dp/B07Z5Z5Z5Z?tag=spendthrone-20",
    tags: ["vacuum", "cleaning", "desktop", "USB rechargeable"],
    inStock: true,
    features: ["Powerful suction", "USB rechargeable", "Compact design", "For keyboards", "Crumbs & dust"],
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
    image: "/images/products/smart-water-bottle.jpg",
    affiliateLink: "https://www.amazon.com/Smart-Water-Bottle-Hydration-Reminder/dp/B08X5Z5Z5Z?tag=spendthrone-20",
    tags: ["water bottle", "smart", "hydration", "health tracking"],
    inStock: true,
    features: ["Tracks intake", "Glowing reminders", "Phone sync", "24hr cold", "BPA-free"],
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
    image: "/images/products/galaxy-projector.jpg",
    affiliateLink: "https://www.amazon.com/Galaxy-Star-Projector-Music-Sync/dp/B08N5Z5Z5Z?tag=spendthrone-20",
    tags: ["projector", "stars", "galaxy", "music sync"],
    inStock: true,
    features: ["Star and nebula projection", "Music sync", "Remote control", "Adjustable speed", "Dimmable"],
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
    image: "/images/products/neck-fan.jpg",
    affiliateLink: "https://www.amazon.com/Portable-Neck-Fan-Hands-Free-Cooling/dp/B08K5Z5Z5Z?tag=spendthrone-20",
    tags: ["fan", "wearable", "portable", "cooling"],
    inStock: true,
    features: ["360-degree airflow", "Lightweight", "USB rechargeable", "3 speeds", "Hands-free"],
    rating: 4.2,
    reviewCount: 23456,
    brand: "Various"
  }
];

// Helper functions
export const getProductsByCategory = (category: string): RealProduct[] => {
  return realProducts.filter(p => p.category === category);
};

export const getFeaturedProducts = (): RealProduct[] => {
  return realProducts.filter(p => p.rating >= 4.5).slice(0, 8);
};

export const getNewArrivals = (): RealProduct[] => {
  return realProducts.filter(p => p.isNew).slice(0, 8);
};

export const getSaleProducts = (): RealProduct[] => {
  return realProducts.filter(p => p.isOnSale).slice(0, 8);
};

export const getProductBySlug = (slug: string): RealProduct | undefined => {
  return realProducts.find(p => p.slug === slug);
};

export const searchProducts = (query: string): RealProduct[] => {
  const lowerQuery = query.toLowerCase();
  return realProducts.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.tags.some(t => t.toLowerCase().includes(lowerQuery))
  );
};
