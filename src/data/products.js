import { images } from './images'

export const products = [
  {
    id: 'discovery',
    name: 'Discovery Set',
    kind: 'Four compositions · 7.5 ml each',
    notes: 'Solaire · Papaye · Feuille · Fumée',
    price: 95,
    image: images.bottles,
    feature: true,
    tag: 'Where to begin',
  },
  {
    id: 'solaire',
    name: 'Solaire',
    kind: 'Eau de parfum · 50 ml',
    notes: 'Blood orange · Neroli · Pink pepper',
    price: 165,
    image: images.citrus,
  },
  {
    id: 'papaye',
    name: 'Papaye',
    kind: 'Eau de parfum · 50 ml',
    notes: 'Papaya · Fig leaf · Orange blossom',
    price: 180,
    image: images.papaya,
    tag: 'New',
  },
  {
    id: 'feuille',
    name: 'Feuille',
    kind: 'Eau de parfum · 50 ml',
    notes: 'Crushed leaf · Spring water · White musk',
    price: 150,
    image: images.leaves,
  },
  {
    id: 'fumee',
    name: 'Fumée',
    kind: 'Extrait de parfum · 50 ml',
    notes: 'Palo santo · Benzoin · Dry cedar',
    price: 195,
    image: images.smoke,
  },
]

export const ingredients = [
  'Neroli',
  'Blood orange',
  'Papaya',
  'Fig leaf',
  'Pink peppercorn',
  'Orange blossom',
  'Palo santo',
  'Benzoin',
  'Green leaf',
  'Dry cedar',
]
