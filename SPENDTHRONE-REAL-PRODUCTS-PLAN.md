# SpendThrone.com - Real Products Plan

## Vision
SpendThrone.com will be a ThisIsWhyImBroke-style site featuring **REAL, unique, interesting products** that people actually want to buy.

## Product Categories
1. **Tech Gadgets** - Cutting-edge tech, AI devices, smart home
2. **Home & Living** - Decor, furniture, smart appliances
3. **Outdoor & Adventure** - Camping gear, travel tech, survival
4. **Weird & Awesome** - Quirky, unique, conversation starters
5. **Gaming & Entertainment** - Retro tech, gaming gear, VR
6. **Health & Wellness** - Biohacking, sleep, fitness tech
7. **Art & Design** - Creative products, 3D printing, collectibles

## Product Data Structure
Each product will have:
- id (st-001, st-002, etc.)
- name (real product name)
- slug (url-friendly)
- description (detailed, engaging)
- price (real USD price)
- category
- image (placeholder for now)
- affiliateLink (real Amazon/product link)
- tags (for search/filter)
- inStock (true/false)
- features (array of key features)
- rating (0-5)
- reviewCount (number of reviews)
- brand (real brand name)

## Product Sources
1. Amazon (unique gadgets)
2. Uncommon Goods
3. ThinkGeek
4. Firebox
5. Jamewy
6. IWOOT
7. Tech review sites (Engadget, Wirecutter, etc.)

## Target Product Count
- **Phase 1:** 50 unique products (immediate)
- **Phase 2:** 100 products (week 1)
- **Phase 3:** 200+ products (month 1)

## Real Product Examples (from research)

### Tech Gadgets
1. **Pura Smart Scent Diffuser** - $49
   - Smart home fragrance, app-controlled, dual scent capsules
   - Affiliate link: Amazon

2. **JBL Go 4 Speaker** - $39.95
   - Portable, waterproof, Bluetooth speaker
   - Affiliate link: Amazon

3. **Tamagotchi Paradise** - $59.99
   - Virtual pet with color screen, zoom features
   - Affiliate link: Amazon/Tamagotchi official

4. **CarLinkit 5** - $89
   - Wireless Apple CarPlay/Android Auto adapter
   - Affiliate link: Amazon

5. **Aura Ink Frame** - $299
   - Color e-ink digital photo frame, 13-inch
   - Affiliate link: Amazon

6. **Anker Laptop Power Bank** - $79.99
   - Built-in USB-C cables, LCD display
   - Affiliate link: Amazon

7. **Peak Design Tech Pouch** - $69.95
   - Waterproof tech organizer with origami pockets
   - Affiliate link: Peak Design/Amazon

8. **Bonaok Karaoke Microphone** - $34.99
   - Bluetooth karaoke mic with speaker, vocal effects
   - Affiliate link: Amazon

### Home & Living
9. **Lego Retro Radio** - $49.99
   - 900-piece vintage radio set, phone holder
   - Affiliate link: Amazon

10. **Mason Jar Sconces** - $29.99
    - Rustic wall sconces with LED fairy lights
    - Affiliate link: Amazon

### Outdoor & Adventure
11. **DJI Neo Drone** - $199
    - Beginner drone, palm takeoff, smart shots
    - Affiliate link: Amazon/DJI

### Gaming & Entertainment
12. **Sony WH-100XM6** - $349
    - Wireless noise-canceling headphones
    - Affiliate link: Amazon

### Health & Wellness
13. **Medicube Booster Pro** - $229
    - 4-in-1 beauty tech device
    - Affiliate link: Amazon

## Implementation Steps

### Step 1: Create Real Products Data File
- `/spendthrone/data/real-products.ts` with 50+ real products

### Step 2: Update Product Display
- Add affiliate links to product cards
- Add "Buy Now" button with affiliate tracking
- Add product rating display
- Add brand badges

### Step 3: Update Homepage
- Featured products section
- Trending products section
- New arrivals section

### Step 4: Search & Filter Enhancement
- Filter by category
- Filter by price range
- Filter by rating
- Filter by brand

### Step 5: Add Product Comparison
- Side-by-side product comparison
- Feature comparison table

## Next Actions
1. Create real-products.ts with 50+ products
2. Update ProductCard component
3. Update product detail pages
4. Test affiliate links
5. Deploy to production

---

*Last updated: 2026-02-10*
*Created by Frankie for MASTA*
