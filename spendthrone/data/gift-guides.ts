/**
 * SpendThrone - Real Gift Guides
 * Curated lists of products for specific occasions/people
 */

export interface GiftGuide {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  productIds: string[];
}

export const giftGuides: GiftGuide[] = [
  {
    id: 'gg-001',
    title: 'The Ultimate Techie Gift Guide 2026',
    slug: 'techie-gift-guide-2026',
    description: 'The latest and greatest gadgets for the person who always needs the newest tech. From smart diffusers to high-end noise canceling headphones.',
    image: '/images/guides/tech-guide.jpg',
    productIds: ['st-001', 'st-002', 'st-006', 'st-009', 'st-010']
  },
  {
    id: 'gg-002',
    title: 'Cool Stuff for Your Desk',
    slug: 'cool-desk-stuff',
    description: 'Transform your workspace with these unique desk accessories. Talking plants, e-ink frames, and retro Lego sets.',
    image: '/images/guides/desk-guide.jpg',
    productIds: ['st-005', 'st-011', 'st-016', 'st-026', 'st-027']
  },
  {
    id: 'gg-003',
    title: 'Gifts for the Modern Gamer',
    slug: 'modern-gamer-gifts',
    description: 'From retro arcade nostalgia to high-tech accessories, these gifts are perfect for the gamer in your life.',
    image: '/images/guides/gamer-guide.jpg',
    productIds: ['st-003', 'st-018', 'st-019', 'st-026', 'st-029']
  },
  {
    id: 'gg-004',
    title: 'Outdoor Adventure & Travel Essentials',
    slug: 'outdoor-adventure-travel',
    description: 'Be prepared for any adventure with portable pizza ovens, solar lanterns, and tech pouches.',
    image: '/images/guides/outdoor-guide.jpg',
    productIds: ['st-007', 'st-020', 'st-021', 'st-030', 'st-009']
  }
];
