
import { Font, Script, Category, FontPairing } from './types';

export const FONTS: Font[] = [
  {
    id: 'hind',
    name: 'Hind Akshara',
    family: "'AksharaHindLocal', 'Hind', sans-serif",
    scripts: [Script.HINDI, Script.MIXED],
    category: Category.SANS,
    weights: [400, 700],
    licenseType: 'OFL',
    price: 0,
    description: 'A robust Devanagari UI font served locally for maximum performance and reliability.',
    tone: ['Modern', 'Clean', 'Professional', 'Local']
  },
  {
    id: 'rozha',
    name: 'Rozha Heritage',
    family: "'Rozha One', serif",
    scripts: [Script.HINDI, Script.MIXED],
    category: Category.DISPLAY,
    weights: [400],
    licenseType: 'Commercial',
    price: 1499,
    description: 'A high-contrast serif font that celebrates traditional calligraphy with modern flair.',
    tone: ['Elegant', 'Traditional', 'Bold']
  },
  {
    id: 'poppins',
    name: 'Poppins Global',
    family: "'Poppins', sans-serif",
    scripts: [Script.ENGLISH, Script.HINDI, Script.MIXED],
    category: Category.SANS,
    weights: [300, 400, 500, 600, 700],
    licenseType: 'Subscription',
    price: 999,
    description: 'A versatile geometric sans-serif that supports both Latin and Devanagari seamlessly.',
    tone: ['Modern', 'Friendly', 'Geometric']
  },
  {
    id: 'rajdhani',
    name: 'Rajdhani Tech',
    family: "'Rajdhani', sans-serif",
    scripts: [Script.HINDI, Script.ENGLISH],
    category: Category.UI,
    weights: [300, 400, 500, 600, 700],
    licenseType: 'OFL',
    price: 0,
    description: 'Square-ish terminals and a condensed feel perfect for dashboard and tech UIs.',
    tone: ['Industrial', 'Compressed', 'Technical']
  },
  {
    id: 'kalam',
    name: 'Kalam Script',
    family: "'Kalam', cursive",
    scripts: [Script.HINDI, Script.ENGLISH],
    category: Category.DISPLAY,
    weights: [300, 400, 700],
    licenseType: 'OFL',
    price: 0,
    description: 'A handwriting style font that captures the organic feel of ink on paper.',
    tone: ['Casual', 'Organic', 'Friendly']
  },
  {
    id: 'lora',
    name: 'Lora Serene',
    family: "'Lora', serif",
    scripts: [Script.ENGLISH],
    category: Category.SERIF,
    weights: [400, 700],
    licenseType: 'OFL',
    price: 0,
    description: 'A contemporary serif with roots in calligraphy, great for long-form reading.',
    tone: ['Literary', 'Serene', 'Classic']
  }
];

export const PAIRINGS: FontPairing[] = [
  {
    id: 'p1',
    headlineFontId: 'rozha',
    bodyFontId: 'hind',
    description: 'Elegant high-contrast display for headlines paired with hyper-readable local UI sans for body text.',
    tags: ['Editorial', 'Luxury', 'Bilingual Blog']
  },
  {
    id: 'p2',
    headlineFontId: 'rajdhani',
    bodyFontId: 'poppins',
    description: 'Modern technical look with a compressed header and a friendly, geometric body font.',
    tags: ['SaaS', 'Modern', 'Dashboard']
  },
  {
    id: 'p3',
    headlineFontId: 'lora',
    bodyFontId: 'hind',
    description: 'Classic English serif paired with a sturdy local Devanagari sans-serif for academic or literary content.',
    tags: ['Scholarly', 'Classic', 'Traditional']
  }
];
