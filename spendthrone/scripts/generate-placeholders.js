/**
 * Product Image Placeholder Generator
 * 
 * This script creates SVG placeholder images for products when real images are not available.
 * Run: node scripts/generate-placeholders.js
 */

const fs = require('fs');
const path = require('path');

const productsDir = path.join(__dirname, '../public/products');

// Ensure products directory exists
if (!fs.existsSync(productsDir)) {
  fs.mkdirSync(productsDir, { recursive: true });
}

// Product image mappings
const products = [
  { file: 'quantum-desk.jpg', name: 'Quantum Desk', color: '#8B5CF6' },
  { file: 'neural-cat-tower.jpg', name: 'Cat Tower', color: '#EC4899' },
  { file: 'time-insurance.jpg', name: 'Time Insurance', color: '#F59E0B' },
  { file: 'invisible-bike.jpg', name: 'Invisible Bike', color: '#10B981' },
  { file: 'emotional-toaster.jpg', name: 'Smart Toaster', color: '#EF4444' },
  { file: 'underwater-plot.jpg', name: 'Ocean Plot', color: '#06B6D4' },
  { file: 'cloud-storage.jpg', name: 'Cloud Storage', color: '#6366F1' },
  { file: 'holo-wardrobe.jpg', name: 'Holo Wardrobe', color: '#D946EF' },
  { file: 'edible-case.jpg', name: 'Edible Case', color: '#84CC16' },
  { file: 'gravity-shoes.jpg', name: 'Gravity Shoes', color: '#F97316' },
  { file: 'teleport-safe.jpg', name: 'Teleport Safe', color: '#64748B' },
  { file: 'haunted-doll.jpg', name: 'AI Doll', color: '#DC2626' },
  { file: 'auto-diary.jpg', name: 'Smart Diary', color: '#14B8A6' },
  { file: 'moonlight-sub.jpg', name: 'Moonlight', color: '#EAB308' },
  { file: 'yoga-mat.jpg', name: 'Yoga Mat', color: '#22D3EE' },
];

function generateSVG(name, color) {
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  
  return `<svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color};stop-opacity:0.8" />
        <stop offset="100%" style="stop-color:#1a1a2e;stop-opacity:1" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect width="600" height="600" fill="url(#grad)"/>
    <circle cx="300" cy="250" r="120" fill="rgba(255,255,255,0.1)" filter="url(#glow)"/>
    <text x="300" y="280" font-family="system-ui, sans-serif" font-size="72" font-weight="bold" fill="white" text-anchor="middle" filter="url(#glow)">${initials}</text>
    <text x="300" y="420" font-family="system-ui, sans-serif" font-size="24" font-weight="500" fill="rgba(255,255,255,0.8)" text-anchor="middle">${name}</text>
    <text x="300" y="460" font-family="system-ui, sans-serif" font-size="14" fill="rgba(255,255,255,0.5)" text-anchor="middle">SpendThrone Exclusive</text>
  </svg>`;
}

// Generate SVG placeholders (converted to simple approach - will save as SVG)
products.forEach(product => {
  const svgPath = path.join(productsDir, product.file.replace('.jpg', '.svg'));
  const svg = generateSVG(product.name, product.color);
  fs.writeFileSync(svgPath, svg);
  console.log(`Created: ${svgPath}`);
});

console.log(`\n✅ Generated ${products.length} product placeholders`);
console.log('Note: Using SVG placeholders. Replace with actual images for production.');
