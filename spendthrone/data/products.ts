/**
 * SpendThrone - Product Catalog (DEMO/SHOWCASE)
 *
 * IMPORTANT: All products in this catalog are FICTIONAL and created for
 * demonstration purposes only. This is a satirical showcase of "weird and extreme"
 * products. No real transactions should occur on this platform.
 *
 * For production use, replace with real products from a database.
 */

import { Product, Category } from '@/types';

export const PRODUCTS: Product[] = [
  {
    id: "st-001",
    title: "Quantum Levitation Desk",
    category: "Extreme Tech" as Category,
    price: 12500,
    priceType: "unit_usd",
    image: "/products/quantum-desk.svg",
    description: "Experience zero-gravity workspace with this stunning superconductive magnetic levitation desk. The carbon-fiber surface floats 3 inches above its base, creating a conversation piece that defies physics. Perfect for executives who demand the extraordinary. Features wireless charging, LED edge lighting, and whisper-quiet operation.",
    verified: true,
    tags: ["Quantum", "Levitation", "Office", "Luxury", "Smart Home"],
    rating: 4.8,
    reviewCount: 127,
    inStock: true,
    popularity: 95,
    addedAt: "2026-01-15T10:00:00Z"
  },
  {
    id: "st-002",
    title: "Neuralink-Compatible Cat Tower",
    category: "Pets" as Category,
    price: 2499,
    priceType: "unit_usd",
    image: "/products/neural-cat-tower.svg",
    description: "The world's first brain-computer interface for cats. This 7-story luxury tower features built-in EEG sensors that translate your cat's thoughts into text notifications on your phone. Finally understand what Mr. Whiskers really wants at 3 AM. Includes AI-powered play scheduling and health monitoring.",
    verified: true,
    tags: ["Pets", "Neural", "IoT", "Cats", "AI"],
    rating: 4.6,
    reviewCount: 342,
    inStock: true,
    popularity: 88,
    addedAt: "2026-01-10T14:30:00Z"
  },
  {
    id: "st-003",
    title: "Time Travel Insurance Premium",
    category: "Survival" as Category,
    price: 299,
    priceType: "yearly_usd",
    image: "/products/time-insurance.svg",
    description: "Protect yourself against temporal paradoxes with our comprehensive time travel insurance. Coverage includes timeline restoration, alternate reality relocation, and paradox-induced memory loss treatment. Rated A+ by Temporal Underwriters Association. Note: Pre-existing temporal conditions excluded.",
    verified: false,
    tags: ["Time Travel", "Insurance", "Sci-Fi", "Safety", "Novelty"],
    rating: 3.9,
    reviewCount: 89,
    inStock: true,
    popularity: 72,
    addedAt: "2026-01-20T09:00:00Z"
  },
  {
    id: "st-004",
    title: "Invisible Bicycle V3",
    category: "Transportation" as Category,
    price: 4200,
    priceType: "unit_usd",
    image: "/products/invisible-bike.svg",
    description: "Revolutionary transparent carbon fiber frame that's virtually invisible to the naked eye. Military-grade stealth technology meets urban mobility. GPS tracker and proximity alarm included so you never lose your ride. Weighs only 8.5 lbs. Warning: Check local laws before riding.",
    verified: true,
    tags: ["Transport", "Invisible", "Eco", "Stealth", "Lightweight"],
    rating: 4.4,
    reviewCount: 156,
    inStock: true,
    popularity: 82,
    addedAt: "2026-01-05T16:45:00Z"
  },
  {
    id: "st-005",
    title: "Emotionally Supportive Toaster Pro",
    category: "Gadgets" as Category,
    price: 349,
    priceType: "unit_usd",
    image: "/products/emotional-toaster.svg",
    description: "Start your day with positivity. This AI-powered toaster uses GPT-7 integration to deliver personalized affirmations based on your toast preferences. Features 47 voice options, mood detection sensors, and a library of 10,000+ encouraging messages. 'You're going to have a great day, and so will your breakfast!'",
    verified: true,
    tags: ["AI", "Kitchen", "Emotional Support", "IoT", "Smart Home"],
    rating: 4.7,
    reviewCount: 523,
    inStock: true,
    popularity: 91,
    addedAt: "2026-01-12T11:20:00Z"
  },
  {
    id: "st-006",
    title: "Underwater Real Estate - Pacific Plot",
    category: "Real Estate" as Category,
    price: 185000,
    priceType: "unit_usd",
    image: "/products/underwater-plot.svg",
    description: "Own a piece of the ocean floor. This premium 1-acre plot sits 200ft below sea level in the Pacific's most beautiful reef zone. Includes bioluminescent landscaping rights, pre-filed micronation status application, and exclusive fishing rights. Perfect for building your underwater lair or research facility.",
    verified: true,
    tags: ["Real Estate", "Underwater", "Investment", "Unique", "Ocean"],
    rating: 4.2,
    reviewCount: 34,
    inStock: true,
    popularity: 65,
    addedAt: "2025-12-28T08:00:00Z"
  },
  {
    id: "st-007",
    title: "Personal Cloud Storage (Physical)",
    category: "Gadgets" as Category,
    price: 3200,
    priceType: "unit_usd",
    image: "/products/cloud-storage.svg",
    description: "An actual miniature cloud that follows you everywhere. Stores up to 50TB of data using quantum moisture encoding technology. The cloud hovers at shoulder height and responds to voice commands. Waterproof, lightning-proof, and surprisingly fluffy to the touch. Includes 5-year atmospheric maintenance plan.",
    verified: false,
    tags: ["Storage", "Cloud", "Weather", "Tech", "Mobile"],
    rating: 4.0,
    reviewCount: 78,
    inStock: true,
    popularity: 76,
    addedAt: "2026-01-08T13:15:00Z"
  },
  {
    id: "st-008",
    title: "Holographic Wardrobe System",
    category: "Luxury" as Category,
    price: 8900,
    priceType: "unit_usd",
    image: "/products/holo-wardrobe.svg",
    description: "Transform your appearance instantly with 8K holographic projection. This wearable system projects any outfit onto your body with photorealistic accuracy. Includes 15,000 licensed designer pieces, custom scan-and-wear capability, and weather-adaptive lighting. Never buy clothes again.",
    verified: true,
    tags: ["Fashion", "Hologram", "AR", "Luxury", "Wearable"],
    rating: 4.9,
    reviewCount: 201,
    inStock: true,
    popularity: 94,
    addedAt: "2026-01-18T10:30:00Z"
  },
  {
    id: "st-009",
    title: "Edible iPhone Case - Variety Pack",
    category: "Food" as Category,
    price: 29,
    priceType: "unit_usd",
    image: "/products/edible-case.svg",
    description: "Sustainable, delicious phone protection. Made from compressed rice and natural flavorings, these cases are completely biodegradable and surprisingly tasty. Variety pack includes Matcha, Chocolate, Strawberry, and Plain flavors. Each case provides approximately 200 calories of emergency sustenance.",
    verified: true,
    tags: ["Food", "Eco", "Phone", "Edible", "Sustainable"],
    rating: 4.3,
    reviewCount: 892,
    inStock: true,
    popularity: 87,
    addedAt: "2026-01-14T15:00:00Z"
  },
  {
    id: "st-010",
    title: "Gravity-Optional Sneakers",
    category: "Clothing" as Category,
    price: 1899,
    priceType: "unit_usd",
    image: "/products/gravity-shoes.svg",
    description: "Walk on air with micro-thruster technology that reduces your effective weight by 35%. Experience the freedom of movement you've always dreamed of. Perfect for parkour, dance, or just feeling lighter than life. Includes safety tether for first-time users and rechargeable power cells good for 12 hours.",
    verified: true,
    tags: ["Fashion", "Gravity", "Shoes", "Tech", "Fitness"],
    rating: 4.5,
    reviewCount: 267,
    inStock: true,
    popularity: 89,
    addedAt: "2026-01-11T09:45:00Z"
  },
  {
    id: "st-011",
    title: "Teleportation-Proof Safe",
    category: "Survival" as Category,
    price: 5600,
    priceType: "unit_usd",
    image: "/products/teleport-safe.svg",
    description: "Protect your valuables from even the most sophisticated thieves. This safe is lined with quantum-entangled lead that creates a teleportation interference field. Biometric lock, 2-ton weight, and tamper-proof construction. Featured in Forbes' 'Most Secure Home Safes 2026'. Peace of mind, guaranteed.",
    verified: true,
    tags: ["Security", "Quantum", "Safe", "Protection", "Home"],
    rating: 4.6,
    reviewCount: 123,
    inStock: true,
    popularity: 79,
    addedAt: "2026-01-09T11:00:00Z"
  },
  {
    id: "st-012",
    title: "AI-Powered Haunted Doll",
    category: "Art & Culture" as Category,
    price: 199,
    priceType: "unit_usd",
    image: "/products/haunted-doll.svg",
    description: "All the fun of a haunted doll, none of the actual haunting. This vintage-style porcelain doll is powered by a friendly AI that tells stories, offers life advice, and moves only when no one is directly looking (via peripheral vision detection). The perfect quirky companion for horror enthusiasts.",
    verified: true,
    tags: ["AI", "Art", "Creepy", "Unique", "Collectible"],
    rating: 4.4,
    reviewCount: 445,
    inStock: true,
    popularity: 93,
    addedAt: "2026-01-16T14:00:00Z"
  },
  {
    id: "st-013",
    title: "Self-Writing Diary Pro",
    category: "Gadgets" as Category,
    price: 179,
    priceType: "unit_usd",
    image: "/products/auto-diary.svg",
    description: "Never miss a day of journaling again. This smart diary uses AI to write entries based on your daily biometric data, location history, and social media activity. Captures your thoughts, feelings, and experiences automatically. Privacy-encrypted and exportable to PDF. The journal you'll actually keep.",
    verified: true,
    tags: ["AI", "Writing", "Journal", "Lifestyle", "Productivity"],
    rating: 4.5,
    reviewCount: 334,
    inStock: true,
    popularity: 85,
    addedAt: "2026-01-13T16:30:00Z"
  },
  {
    id: "st-014",
    title: "Premium Moonlight Subscription",
    category: "Metaverse" as Category,
    price: 49,
    priceType: "monthly_usd",
    image: "/products/moonlight-sub.svg",
    description: "Transform your bedroom with authentic moonlight delivered via satellite reflector array. Choose from full moon, crescent, blood moon, or eclipse modes. Includes sleep-optimized dimming and romantic ambient settings. The most romantic subscription you'll ever own. 30-day free trial included.",
    verified: false,
    tags: ["Space", "Subscription", "Lighting", "Ambient", "Romance"],
    rating: 4.1,
    reviewCount: 156,
    inStock: true,
    popularity: 74,
    addedAt: "2026-01-07T10:00:00Z"
  },
  {
    id: "st-015",
    title: "Antigravity Yoga Mat Pro",
    category: "Medical" as Category,
    price: 899,
    priceType: "unit_usd",
    image: "/products/yoga-mat.svg",
    description: "Achieve poses you never thought possible. This advanced yoga mat creates a localized gravity reduction field of up to 50%. Perfect for beginners learning difficult poses or advanced practitioners seeking deeper stretches. Includes spotter drone for safety, carrying case, and guided meditation app access.",
    verified: true,
    tags: ["Wellness", "Yoga", "Fitness", "Gravity", "Health"],
    rating: 4.7,
    reviewCount: 289,
    inStock: true,
    popularity: 83,
    addedAt: "2026-01-17T12:00:00Z"
  },
  {
    id: "st-016",
    title: "Holographic Ghost Doorbell",
    category: "Smart Home" as Category,
    price: 899,
    priceType: "unit_usd",
    image: "/products/holographic-doorbell.svg",
    description: "Never miss a ghost again! This AI-powered doorbell projects holographic visitors (including spirits, poltergeists, and your great aunt Mildred) directly onto your smartphone. Features ghost detection algorithm, spectral recording, and 'haunt notifications' that distinguish between friendly apparitions and pranksters. Includes haunted house warranty.",
    verified: true,
    tags: ["Smart Home", "Paranormal", "AI", "Holography", "IoT"],
    rating: 4.5,
    reviewCount: 89,
    inStock: true,
    popularity: 78,
    addedAt: "2026-01-18T09:00:00Z"
  },
  {
    id: "st-017",
    title: "Quantum Espresso Machine",
    category: "Extreme Tech" as Category,
    price: 4500,
    priceType: "unit_usd",
    image: "/products/quantum-espresso.svg",
    description: "Brew coffee in 12 parallel universes simultaneously! This quantum-enhanced espresso machine uses superposition to create the perfect cup every time. Features probability-based extraction (97% chance of perfection), entangled milk frother, and quantum-proof bean storage. Warning: May occasionally serve coffee from alternate timelines with slightly different recipes.",
    verified: true,
    tags: ["Quantum", "Coffee", "Extreme Tech", "Luxury"],
    rating: 4.9,
    reviewCount: 234,
    inStock: true,
    popularity: 92,
    addedAt: "2026-01-19T11:30:00Z"
  },
  {
    id: "st-018",
    title: "Telepathic Keyboard",
    category: "Computing" as Category,
    price: 799,
    priceType: "unit_usd",
    image: "/products/telepathic-keyboard.svg",
    description: "Type with your mind! This revolutionary keyboard reads your neural signals and translates thoughts into text in real-time. Features 99.7% thought-to-text accuracy, daydream filter (to prevent random thoughts from appearing), and subconscious spell-check. Perfect for writers, programmers, and anyone who wishes they could type while eating breakfast.",
    verified: true,
    tags: ["Computing", "Neural", "AI", "Productivity"],
    rating: 4.3,
    reviewCount: 567,
    inStock: true,
    popularity: 85,
    addedAt: "2026-01-20T15:45:00Z"
  },
  {
    id: "st-019",
    title: "Portable Black Hole Trash Can",
    category: "Extreme Tech" as Category,
    price: 3200,
    priceType: "unit_usd",
    image: "/products/black-hole-trash.svg",
    description: "Never take out the trash again! This quantum singularity disposal unit compresses waste to subatomic dimensions using controlled micro-black hole technology. Features automatic waste compression, odor neutralization field, and remote disposal via wormhole. Holds 500 gallons of trash in a space smaller than a coffee mug. Safety shield prevents accidental planet absorption.",
    verified: true,
    tags: ["Quantum", "Smart Home", "Extreme Tech", "Sustainability"],
    rating: 4.7,
    reviewCount: 412,
    inStock: true,
    popularity: 90,
    addedAt: "2026-01-21T13:20:00Z"
  },
  {
    id: "st-020",
    title: "Emotional Support Robot",
    category: "AI" as Category,
    price: 1800,
    priceType: "unit_usd",
    image: "/products/emotional-robot.svg",
    description: "Your feelings, understood by AI. This empathetic companion robot uses advanced sentiment analysis to provide emotional support, tell therapeutic jokes, and give the perfect hug (variable pressure sensors included). Features mood-predictive chocolate delivery, tear-absorbing tissue dispenser, and existential crisis intervention mode. Certified by the International Society of Robot Therapists.",
    verified: true,
    tags: ["AI", "Robots", "Wellness", "Smart Home"],
    rating: 4.6,
    reviewCount: 289,
    inStock: true,
    popularity: 82,
    addedAt: "2026-01-22T10:00:00Z"
  },
  {
    id: "st-021",
    title: "Infinite Ink Pen",
    category: "Luxury" as Category,
    price: 450,
    priceType: "unit_usd",
    image: "/products/infinite-ink.svg",
    description: "Write forever, never replace ink! This pen uses molecular replication to generate ink from ambient humidity and trace elements. Features anti-gravity ink, space-proof writing, and automatic color shifting based on paper material. Guaranteed to write for 847 years of continuous use. Comes with heirloom display case and 7-year ink satisfaction warranty.",
    verified: true,
    tags: ["Luxury", "Writing", "Sustainability", "Extreme Tech"],
    rating: 4.8,
    reviewCount: 156,
    inStock: true,
    popularity: 76,
    addedAt: "2026-01-23T14:00:00Z"
  },
  {
    id: "st-022",
    title: "Time-Freezing Refrigerator",
    category: "Extreme Tech" as Category,
    price: 6700,
    priceType: "unit_usd",
    image: "/products/time-freeze-fridge.svg",
    description: "Your food, frozen in time, not ice. This temporal preservation unit uses localized time dilation to keep food fresh forever. Features quantum stasis field, parallel universe food swapping (for variety), and spoilage probability of 0.003%. Includes emergency temporal reset if you accidentally store milk from last Tuesday. FDA approved (after 3 years of temporal safety testing).",
    verified: true,
    tags: ["Quantum", "Smart Home", "Food", "Extreme Tech"],
    rating: 4.5,
    reviewCount: 378,
    inStock: true,
    popularity: 87,
    addedAt: "2026-01-24T16:30:00Z"
  },
  {
    id: "st-023",
    title: "Dream Recorder Helmet",
    category: "Wellness" as Category,
    price: 1200,
    priceType: "unit_usd",
    image: "/products/dream-recorder.svg",
    description: "Remember every dream in vivid detail! This neural helmet records REM sleep activity and generates 8K video of your dreams. Features lucidity training mode, nightmare filter, and dream editing suite. Export dreams as movies, VR experiences, or NFT art. Compatible with dream-sharing parties and collaborative dream creation. Warning: Some users report preferring their dreams to reality.",
    verified: true,
    tags: ["Wellness", "Neural", "VR", "Entertainment"],
    rating: 4.4,
    reviewCount: 523,
    inStock: true,
    popularity: 84,
    addedAt: "2026-01-25T11:00:00Z"
  },
  {
    id: "st-024",
    title: "Anti-Gravity Water Bottle",
    category: "Fitness" as Category,
    price: 89,
    priceType: "unit_usd",
    image: "/products/anti-gravity-bottle.svg",
    description: "Hydration that floats above your hand! This levitating water bottle uses magnetic field technology to hover 3 inches from any surface. Features self-filling from atmospheric humidity, temperature control (ice water or hot tea on command), and holographic hydration reminders. Perfect for runners, astronauts, and people who enjoy bending physics while hydrating.",
    verified: true,
    tags: ["Fitness", "Extreme Tech", "Magnetic", "Wellness"],
    rating: 4.2,
    reviewCount: 678,
    inStock: true,
    popularity: 79,
    addedAt: "2026-01-26T09:30:00Z"
  },
  {
    id: "st-025",
    title: "Parallel Universe Router",
    category: "Computing" as Category,
    price: 2900,
    priceType: "unit_usd",
    image: "/products/multiverse-router.svg",
    description: "Internet from infinite realities! This quantum router connects you to 847 parallel internets simultaneously. Features alternate reality browsing, copyright-free media discovery (from universes where your favorite artists never sued), and 'what if' historical fact-checking. Includes anti-paradox firewall and multiverse VPN. Warning: May occasionally load websites where you're the villain.",
    verified: true,
    tags: ["Quantum", "Computing", "Networking", "Extreme Tech"],
    rating: 4.7,
    reviewCount: 834,
    inStock: true,
    popularity: 93,
    addedAt: "2026-01-27T15:00:00Z"
  },
  {
    id: "st-026",
    title: "Telepathic Pet Translator",
    category: "Pets" as Category,
    price: 450,
    priceType: "unit_usd",
    image: "/products/pet-translator.svg",
    description: "Finally understand what your pets are thinking! This collar-mounted AI translator decodes animal thoughts into human speech in real-time. Features species-specific modes (dogs, cats, birds, hamsters), sarcasm detection for cats, and 'why is my human like this' analysis for all pets. Includes translation history and guilt-trip recording.",
    verified: true,
    tags: ["Pets", "AI", "Translation", "IoT"],
    rating: 4.6,
    reviewCount: 1234,
    inStock: true,
    popularity: 88,
    addedAt: "2026-01-28T12:30:00Z"
  },
  {
    id: "st-027",
    title: "Quantum Uncertainty Alarm Clock",
    category: "Smart Home" as Category,
    price: 199,
    priceType: "unit_usd",
    image: "/products/uncertainty-clock.svg",
    description: "Wake up anywhere between 6:00 AM and 8:30 AM! This Schrödinger-inspired alarm clock keeps you in a superposition of awake and asleep until observation forces a collapse. Features probability-based snooze, parallel universe snooze (where you already woke up), and reality-shifting alarm sounds. Perfect for people who hate commitment to specific wake times.",
    verified: true,
    tags: ["Quantum", "Smart Home", "Humor", "Extreme Tech"],
    rating: 4.3,
    reviewCount: 445,
    inStock: true,
    popularity: 74,
    addedAt: "2026-01-29T10:00:00Z"
  },
  {
    id: "st-028",
    title: "Holographic Gaming Table",
    category: "Entertainment" as Category,
    price: 3400,
    priceType: "unit_usd",
    image: "/products/holographic-gaming.svg",
    description: "Board games that exist in thin air! This AR-enhanced gaming table projects holographic game pieces, boards, and entire worlds onto your table. Features voice-controlled NPCs, physics-based token interaction, and automatic cleanup (tokens vanish when game ends). Supports D&D, chess, Risk, and custom worlds. Includes multiplayer mode across 12 realities.",
    verified: true,
    tags: ["Gaming", "AR", "Entertainment", "Social"],
    rating: 4.8,
    reviewCount: 612,
    inStock: true,
    popularity: 86,
    addedAt: "2026-01-30T14:45:00Z"
  },
  {
    id: "st-029",
    title: "AI-Powered Mirror That Roasts You",
    category: "Smart Home" as Category,
    price: 699,
    priceType: "unit_usd",
    image: "/products/roasting-mirror.svg",
    description: "This mirror uses advanced AI to provide honest feedback about your appearance, outfit choices, and life decisions. Features customizable roast intensity (light teasing to brutal honesty), outfit suggestions (that you probably won't take), and motivational insult mode. Includes 'friends' mode where it roasts your friends instead of you. Not recommended for sensitive individuals.",
    verified: true,
    tags: ["AI", "Smart Home", "Humor", "Entertainment"],
    rating: 4.4,
    reviewCount: 987,
    inStock: true,
    popularity: 80,
    addedAt: "2026-01-31T11:30:00Z"
  },
  {
    id: "st-030",
    title: "Time Dilation Desk Lamp",
    category: "Extreme Tech" as Category,
    price: 380,
    priceType: "unit_usd",
    image: "/products/time-dilation-lamp.svg",
    description: "Your workspace, accelerated time! This quantum lamp creates localized time dilation that makes your work area run 2.3x faster than normal space. Features custom time ratios (1.5x to 5x), temporal bubble radius control, and built-in de-aging of coffee (keeps it hot for hours). Warning: May cause confusion when you exit the bubble and realize 3 hours have passed.",
    verified: true,
    tags: ["Quantum", "Extreme Tech", "Productivity", "Luxury"],
    rating: 4.5,
    reviewCount: 345,
    inStock: true,
    popularity: 77,
    addedAt: "2026-02-01T13:15:00Z"
  },
  {
    id: "st-031",
    title: "Neural-Link Pizza Oven",
    category: "Smart Home" as Category,
    price: 890,
    priceType: "unit_usd",
    image: "/products/neural-pizza-oven.svg",
    description: "This oven reads your mind and bakes your exact pizza craving before you even know you want it. Features probability-based craving prediction (94% accuracy), dream pizza reconstruction, and alternate reality recipe discovery. Includes mood-based topping suggestions and 'regret prevention' warning for questionable combinations.",
    verified: true,
    tags: ["Neural", "Smart Home", "Food", "AI"],
    rating: 4.7,
    reviewCount: 567,
    inStock: true,
    popularity: 89,
    addedAt: "2026-02-02T10:00:00Z"
  },
  {
    id: "st-032",
    title: "Teleportation Plant Pot",
    category: "Luxury" as Category,
    price: 1200,
    priceType: "unit_usd",
    image: "/products/teleport-plant.svg",
    description: "Your plants, anywhere! This quantum pot uses spatial bridging to allow your houseplant to be in multiple locations simultaneously. Features parallel sun exposure (direct sunlight from 3 time zones), automatic teleportation to optimal growing conditions, and inter-dimensional pest control. Perfect for plant parents who can't decide where their ficus looks best.",
    verified: true,
    tags: ["Quantum", "Luxury", "Plants", "Smart Home"],
    rating: 4.3,
    reviewCount: 234,
    inStock: true,
    popularity: 72,
    addedAt: "2026-02-03T15:30:00Z"
  },
  {
    id: "st-033",
    title: "AI Relationship Counselor Robot",
    category: "Wellness" as Category,
    price: 2500,
    priceType: "unit_usd",
    image: "/products/relationship-robot.svg",
    description: "24/7 relationship advice from an AI that understands human emotion better than humans do. Features empathy simulation (99.8% accuracy), argument de-escalation protocols, and 'what they actually meant' translation. Includes couples therapy mode, solo self-reflection mode, and 'why are you like this' honest feedback. Warning: May occasionally suggest you're the problem.",
    verified: true,
    tags: ["AI", "Wellness", "Relationships", "Robots"],
    rating: 4.5,
    reviewCount: 478,
    inStock: true,
    popularity: 81,
    addedAt: "2026-02-04T12:00:00Z"
  },
  {
    id: "st-034",
    title: "Infinite Battery Charger",
    category: "Extreme Tech" as Category,
    price: 1500,
    priceType: "unit_usd",
    image: "/products/infinite-charger.svg",
    description: "Never run out of battery again! This charger extracts energy from quantum vacuum fluctuations and converts it to usable electricity. Features zero-emission charging, temporal battery aging (reverses battery wear), and parallel universe power sourcing. Charges any device in 6 seconds. Warning: May cause slight reality distortion if charging more than 10 devices simultaneously.",
    verified: true,
    tags: ["Quantum", "Extreme Tech", "Sustainability", "Energy"],
    rating: 4.9,
    reviewCount: 892,
    inStock: true,
    popularity: 91,
    addedAt: "2026-02-05T14:00:00Z"
  },
  {
    id: "st-035",
    title: "Mind-Reading Coffee Mug",
    category: "Luxury" as Category,
    price: 120,
    priceType: "unit_usd",
    image: "/products/mind-reading-mug.svg",
    description: "This mug knows exactly what you want to drink before you do. Features neural-pattern temperature control (knows when you want ice coffee vs hot tea), craving prediction, and beverage history reconstruction. Can also detect when you're having a bad day and automatically adds extra caffeine. Dishwasher safe (but may cry during wash cycle).",
    verified: true,
    tags: ["Neural", "Luxury", "AI", "Smart Home"],
    rating: 4.6,
    reviewCount: 345,
    inStock: true,
    popularity: 75,
    addedAt: "2026-02-06T11:30:00Z"
  },
  {
    id: "st-036",
    title: "Holographic Assistant Mirror",
    category: "Smart Home" as Category,
    price: 1800,
    priceType: "unit_usd",
    image: "/products/holographic-assistant.svg",
    description: "Your personal assistant, projected onto your bathroom mirror. Features outfit suggestions, schedule overlay, health analysis (skin condition, tiredness detection), and motivational insults. Includes celebrity mode (appear as anyone from any reality) and parallel universe success projection (show you as your successful alternate self). Perfect for morning existential crises.",
    verified: true,
    tags: ["Holography", "Smart Home", "AI", "Luxury"],
    rating: 4.4,
    reviewCount: 567,
    inStock: true,
    popularity: 83,
    addedAt: "2026-02-07T10:00:00Z"
  },
  {
    id: "st-037",
    title: "Quantum Gaming Console",
    category: "Entertainment" as Category,
    price: 599,
    priceType: "unit_usd",
    image: "/products/quantum-console.svg",
    description: "Play games across infinite timelines! This quantum console runs each decision tree simultaneously, creating a branching narrative where every choice is explored. Features parallel universe multiplayer (play against alternate versions of yourself), reality-rewinding save system, and probability-based difficulty (the harder you try, the less likely you are to succeed).",
    verified: true,
    tags: ["Quantum", "Gaming", "Entertainment", "VR"],
    rating: 4.7,
    reviewCount: 1123,
    inStock: true,
    popularity: 94,
    addedAt: "2026-02-08T13:30:00Z"
  },
  {
    id: "st-038",
    title: "Telepathic Remote Control",
    category: "Smart Home" as Category,
    price: 150,
    priceType: "unit_usd",
    image: "/products/telepathic-remote.svg",
    description: "Change channels with your mind! This neural-control remote reads your brainwaves and predicts what you want to watch with 97% accuracy. Features mood-based content selection, parallel universe channel surfing (find shows that don't exist here), and 'I'm not watching this!' emergency shutdown. Includes thought-to-text searching and commercials that only exist in your imagination.",
    verified: true,
    tags: ["Neural", "Smart Home", "AI", "Entertainment"],
    rating: 4.5,
    reviewCount: 789,
    inStock: true,
    popularity: 78,
    addedAt: "2026-02-09T11:00:00Z"
  },
  {
    id: "st-039",
    title: "Time-Travel Gift Subscription",
    category: "Survival" as Category,
    price: 99,
    priceType: "monthly_usd",
    image: "/products/time-travel-gift.svg",
    description: "Send gifts from the past! Each month, receive a carefully curated item from a different historical era. Previous gifts include: authentic 1920s flapper dress, ancient Roman coin (temporal provenance verified), Victorian love letter (written by your ancestor), and medieval sword (shipped from 1342). Warning: Some items may contain historical residue or temporal anomalies.",
    verified: true,
    tags: ["Time Travel", "History", "Gifts", "Subscription"],
    rating: 4.3,
    reviewCount: 234,
    inStock: true,
    popularity: 71,
    addedAt: "2026-02-10T09:00:00Z"
  },
  {
    id: "st-040",
    title: "AI Debate Partner Robot",
    category: "AI" as Category,
    price: 890,
    priceType: "unit_usd",
    image: "/products/debate-robot.svg",
    description: "Never lose an argument again! This robot uses billions of data points, logical fallacy detection, and psychological manipulation techniques to win any debate. Features 47 debate strategies, multilingual argument translation, and historical figure simulation (debate as Lincoln, Socrates, or Nietzsche). Includes 'admitting defeat' mode (rarely used). Warning: May cause relationship issues if deployed without consent.",
    verified: true,
    tags: ["AI", "Robots", "Education", "Debate"],
    rating: 4.6,
    reviewCount: 456,
    inStock: true,
    popularity: 82,
    addedAt: "2026-02-11T14:30:00Z"
  }
];

/**
 * Get product by slug
 */
export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug);
}

/**
 * Get product by ID
 */
export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id);
}

/**
 * Get products by category
 */
export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return PRODUCTS;
  return PRODUCTS.filter(p => p.category === category);
}

/**
 * Get related products
 */
export function getRelatedProducts(productId: string, limit: number = 3): Product[] {
  const product = getProductById(productId);
  if (!product) return [];
  
  return PRODUCTS
    .filter(p => p.id !== productId && 
      (p.category === product.category || 
       p.tags.some(tag => product.tags.includes(tag))))
    .slice(0, limit);
}

/**
 * Get featured products
 */
export function getFeaturedProducts(limit: number = 6): Product[] {
  return [...PRODUCTS]
    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    .slice(0, limit);
}

/**
 * Get new arrivals
 */
export function getNewArrivals(limit: number = 4): Product[] {
  return [...PRODUCTS]
    .sort((a, b) => new Date(b.addedAt || '').getTime() - new Date(a.addedAt || '').getTime())
    .slice(0, limit);
}
