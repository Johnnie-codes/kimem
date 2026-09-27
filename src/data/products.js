/*
 * The real collection goes here. Shape of one entry (ProductCard reads these fields):
 *
 *   {
 *     id: 'slug',
 *     name: 'Name',
 *     kind: 'Eau de parfum · 50 ml',
 *     notes: 'Note · Note · Note',
 *     price: 165,
 *     image: { src, alt },   // a photo of the product itself, not one of the mood images
 *     feature: true,         // optional: the large card
 *     tag: 'New',            // optional
 *     description: '…',      // optional: shown in the quick view
 *     pyramid: { top: [], heart: [], base: [] },  // optional: quick view note diagram
 *     moods: ['warmth'],     // optional: scent finder (keys from moods.js)
 *     engravable: true,      // optional: offer initials on the bottle
 *   }
 *
 * To see the shop with invented products while developing: `npm run dev`, then open /?demo
 *
 * While the list is empty, CollectionSection shows a "coming soon" panel instead of cards.
 */
export const products = []
