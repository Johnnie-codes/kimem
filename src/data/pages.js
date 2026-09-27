import { site } from './site'

/*
 * Short information pages opened from the footer and menu (as #page-<id>).
 * DRAFT: this is starter copy so no link is dead. The owner must review every policy page
 * (shipping, returns, privacy, terms) before launch; none of it is legal advice.
 */
export const pages = [
  {
    id: 'refills',
    title: 'Refills',
    body: [
      'Every Kimem bottle is made to be kept. When yours runs low, bring or send it back and we refill it from the same batch notes, for less than a new bottle.',
      `Write to ${site.email} to arrange a refill.`,
    ],
  },
  {
    id: 'gifting',
    title: 'Gifting',
    body: [
      'Any bottle can be engraved with up to three initials and sent with a handwritten card. Add the engraving when you choose your perfume, and tell us the card message in your order note.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    body: [
      `For orders, refills, stockists and press, write to ${site.email}. We answer every message ourselves, usually within two working days.`,
    ],
    contact: true,
  },
  {
    id: 'shipping',
    title: 'Shipping',
    body: [
      'Orders are packed by hand and sent within three working days of confirmation.',
      'Delivery costs and times depend on where you are; we confirm both before you pay.',
    ],
  },
  {
    id: 'returns',
    title: 'Returns',
    body: [
      'Unopened bottles can be returned within 14 days of delivery for a full refund.',
      'Engraved bottles are made for one person and cannot be returned unless they arrive damaged.',
    ],
  },
  {
    id: 'questions',
    title: 'Questions',
    faq: [
      {
        q: 'How long does a perfume last on skin?',
        a: 'Eau de parfum usually stays six to eight hours, longer on clothing. The opening fades within minutes; the trail is what stays.',
      },
      {
        q: 'How should I store my bottle?',
        a: 'Away from sunlight and heat, with the cap on. A drawer is better than a bathroom shelf.',
      },
      {
        q: 'Why small batches?',
        a: 'So every batch can rest as long as it needs and every bottle can be numbered by hand.',
      },
      {
        q: 'Can I try before I buy?',
        a: `Write to ${site.email} and we will tell you where to smell the collection.`,
      },
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy',
    body: [
      'We collect only what we need to answer you and send your order: your name, contact details and address.',
      'If you join the letter we keep your email address until you unsubscribe. We never sell or share it.',
      'This site stores your bag and preferences in your own browser only. It uses no advertising or tracking cookies.',
    ],
  },
  {
    id: 'terms',
    title: 'Terms',
    body: [
      'Prices are shown including tax. An order is confirmed only when we reply to it.',
      'Batches are limited; if a perfume sells out before we confirm your order, we tell you and you pay nothing.',
    ],
  },
]

export const pageById = Object.fromEntries(pages.map((p) => [p.id, p]))
