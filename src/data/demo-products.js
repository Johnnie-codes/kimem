import { images } from './images'

/*
 * DEVELOPMENT ONLY. Invented products so the shop can be built and tested before the real
 * collection exists. Loaded only by `npm run dev` with `?demo` in the URL; a production
 * build never includes them (see catalogue.js).
 */
const bottle = { src: images.bottles.src, alt: 'Demo product: perfume bottles on a stone block' }

export const demoProducts = [
  {
    id: 'demo-set',
    name: 'Demo Set',
    kind: 'Discovery · 4 × 7.5 ml',
    notes: 'One of each demo composition',
    description: 'A sample feature product. Replace with the real discovery set, if there is one.',
    price: 95,
    image: bottle,
    feature: true,
    tag: 'Demo',
    moods: ['warmth', 'ripeness', 'morning', 'stillness'],
    pyramid: { top: ['Demo top'], heart: ['Demo heart'], base: ['Demo base'] },
  },
  {
    id: 'demo-one',
    name: 'Demo Nº 1',
    kind: 'Eau de parfum · 50 ml',
    notes: 'Bright · Airy · Clean',
    description: 'Placeholder composition for testing the shop.',
    price: 165,
    image: bottle,
    engravable: true,
    moods: ['warmth', 'morning'],
    pyramid: { top: ['Bright accord'], heart: ['Soft floral'], base: ['Clean musk'] },
  },
  {
    id: 'demo-two',
    name: 'Demo Nº 2',
    kind: 'Eau de parfum · 50 ml',
    notes: 'Round · Sweet · Warm',
    description: 'Placeholder composition for testing the shop.',
    price: 180,
    image: bottle,
    engravable: true,
    tag: 'New',
    moods: ['ripeness', 'warmth'],
    pyramid: { top: ['Fruit accord'], heart: ['Warm floral'], base: ['Amber'] },
  },
  {
    id: 'demo-three',
    name: 'Demo Nº 3',
    kind: 'Extrait · 50 ml',
    notes: 'Dry · Smoky · Deep',
    description: 'Placeholder composition for testing the shop.',
    price: 195,
    image: bottle,
    engravable: true,
    moods: ['stillness'],
    pyramid: { top: ['Spice accord'], heart: ['Woods'], base: ['Resin accord'] },
  },
]

export const demoBatch = { number: 1, remaining: 142 }
