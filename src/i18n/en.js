/* English copy. Keys mirror the page top to bottom. `*word*` marks italic emphasis. */
export default {
  meta: { title: 'Kimem — Memory, distilled' },

  common: {
    close: 'Close',
    addToBag: 'Add to bag',
    addedToBag: 'Added to bag',
    view: 'View',
    viewProduct: 'View {name}',
    fewer: 'One fewer',
    more: 'One more',
    quantity: 'Quantity',
    quantityOf: 'Quantity of {name}',
    language: 'Language',
  },

  nav: {
    collection: 'Collection',
    notes: 'Notes',
    atelier: 'Atelier',
    maison: 'Maison',
    letter: 'The letter',
    bag: 'Bag',
    bagLabel_one: 'Open bag, {n} item',
    bagLabel_other: 'Open bag, {n} items',
    backToTop: 'Kimem — back to top',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    menu: 'Menu',
    primary: 'Primary',
    tagline: 'Maison de Parfum',
    soundOn: 'Play ambient sound',
    soundOff: 'Stop ambient sound',
    sound: 'Sound',
  },

  hero: {
    eyebrow: 'Maison de Parfum',
    collectionNo: 'Collection Nº 01',
    lede: 'Small-batch fragrances made to be remembered rather than noticed. Composed by hand, two hundred bottles at a time.',
    titleA: 'Memory,',
    titleB: 'distilled.',
    gallery: 'The world of Kimem',
    theCollection: 'The collection',
    goTo: '{label} — go to section',
    explore: 'Explore the collection',
    process: 'Our process',
    scroll: 'Scroll',
    cursor: 'Explore',
  },

  moods: {
    warmth: { label: 'Warmth', line: 'Sunlight on stone, the middle of the afternoon.' },
    ripeness: { label: 'Ripeness', line: 'Something sweet, just before it turns.' },
    morning: { label: 'Morning', line: 'Cold water, green things, the day not yet begun.' },
    stillness: { label: 'Stillness', line: 'Smoke rising in a quiet room.' },
  },

  manifesto: {
    seal: 'Kimem · Maison de Parfum · Composed from memory ·',
    eyebrow: 'The maison',
    text: "We don't compose perfumes to be noticed. We compose them to be *remembered* — the way a room keeps the trace of whoever left it last.",
    lead: 'Kimem began with a single vial, blended one August afternoon and kept far too long. What remained was less a scent than a place. Every composition since has started the same way: with something worth keeping.',
    link: 'How we work',
  },

  notes: {
    eyebrow: 'Anatomy of a scent',
    titleA: 'Three notes,',
    titleB: 'one slow reveal.',
    lead: 'A Kimem composition unfolds the way a memory does: a bright first impression, a warmth that settles, and something that stays long after.',
    top: {
      layer: 'Top note',
      tagline: 'the first breath',
      title: 'Opening',
      timing: 'The first minutes',
      text: 'The brightest, lightest materials rise first. They are what you notice the moment it touches skin, and they are gone almost as soon as you have named them.',
    },
    heart: {
      layer: 'Heart note',
      tagline: 'what settles in',
      title: 'Heart',
      timing: 'The hours after',
      text: 'As the opening lifts, the character of the composition comes through. Rounder, warmer, closer to the skin: this is the part people will know you by.',
    },
    base: {
      layer: 'Base note',
      tagline: 'what remains',
      title: 'Trail',
      timing: 'Into the next day',
      text: 'The heaviest materials move slowest. They anchor everything above them and linger on a collar or a scarf long after the rest has faded.',
    },
  },

  atelier: {
    eyebrow: 'The atelier',
    titleA: 'Made slowly,',
    titleB: 'by hand.',
    lead: 'Every composition is weighed, blended and bottled by hand, in batches small enough to know each one by name. Every batch rests in the dark for {weeks} weeks before a single bottle is filled.',
    statRefill: 'refillable glass, forever',
    statRest: 'resting in the dark',
    statRestUnit: 'wks',
    statBatch: 'bottles per batch, numbered by hand',
    link: 'Discover the collection',
  },

  finder: {
    eyebrow: 'Find yours',
    titleA: 'Choose a feeling,',
    titleB: 'not a note.',
    lead: 'Pick one or two. We will point you to the bottle that holds them.',
    group: 'Moods',
    none: 'Nothing chosen yet.',
    noMatch: 'Nothing in this batch for that feeling yet. Try another.',
  },

  collection: {
    eyebrow: 'The collection',
    titleA: 'Made to be kept.',
    titleB: 'One memory each.',
    lead: 'Every bottle is hand-numbered and refillable, forever.',
    demo: 'Demo products — development only',
    soonEyebrow: 'Collection Nº 01',
    soonA: 'The first compositions',
    soonB: 'are resting.',
    soonLead: 'They will be released in a single numbered batch. Join the letter to hear the day they are ready.',
    soonLink: 'Receive the first drop',
    assurances: ['Refillable glass, forever', 'Hand-numbered bottles'],
  },

  batch: {
    label: 'Batch Nº {n}',
    left: 'of {size} bottles left',
  },

  product: {
    moods: 'Moods',
    opening: 'Opening',
    heart: 'Heart',
    trail: 'Trail',
    engrave: 'Engrave initials on the bottle',
    engraveHint: 'Up to three letters',
    engravePlaceholder: 'e.g. AMK',
    engravePreview: 'Preview. The engraving is cut by hand, so every one is slightly different.',
    bottleEngraved: 'Bottle engraved {initials}',
    bottlePlain: 'Bottle, not engraved',
    addWithPrice: 'Add to bag · {price}',
  },

  bag: {
    label: 'Your bag',
    bottles_one: '{n} bottle',
    bottles_other: '{n} bottles',
    empty: 'Empty, for now.',
    emptyText: 'Nothing here yet. Open a perfume in the collection to add it.',
    sentTitle: 'Almost yours.',
    engraved: 'Engraved',
    remove: 'Remove',
    note: 'Note for us (optional)',
    notePlaceholder: 'Card message, delivery details…',
    subtotal: 'Subtotal',
    orderBy: 'Order by {channel}',
    noPayment: 'No payment is taken here. Your order goes to us as a message; we reply to confirm availability, delivery and how to pay.',
    sentTelegramCopied: 'Your order is copied. Paste it into the Telegram chat that just opened and we will reply there.',
    sentTelegram: 'Copy your order below and paste it into the Telegram chat that just opened. We will reply there.',
    sentWhatsapp: 'WhatsApp should have opened with your order written out. Press send and we will reply there.',
    sentEmail: 'Your email app should have opened with your order written out. Send it and we will reply to confirm.',
    done: 'Done, clear my bag',
    back: 'Back to bag',
    channels: { email: 'email', whatsapp: 'WhatsApp', telegram: 'Telegram' },
  },

  order: {
    greeting: 'Hello {name}, I would like to order:',
    engraved: 'engraved "{initials}"',
    subtotal: 'Subtotal: {price}',
    note: 'Note: {note}',
    closing: 'Please confirm availability, delivery and payment.',
    subject: 'Order — {name}',
  },

  letter: {
    eyebrow: 'The letter',
    titleA: 'Receive the',
    titleB: 'first drop.',
    lead: 'One letter a month. New compositions, notes from the atelier, and early access to each batch. Never more than that.',
    label: 'Email address',
    placeholder: 'Your email',
    submit: 'Subscribe',
    thanks: 'Thank you. The next letter will find you.',
    hint: 'By subscribing you agree to receive our letter. Unsubscribe any time.',
    invalid: 'Please enter a valid email address.',
    failed: 'That did not go through. Try again, or write to {email}.',
    mailed: 'Your mail app should have opened. If not, write to {email}.',
    mailSubject: 'Add me to the Kimem letter',
    mailBody: 'Please add {email} to the letter.',
  },

  footer: {
    tagline: 'Maison de parfum. Small batches, composed from memory.',
    shop: 'Shop',
    maison: 'Maison',
    care: 'Care',
    collection: 'Collection',
    story: 'Our story',
    atelier: 'The atelier',
    letter: 'The letter',
    rights: '© {year} Kimem — Maison de Parfum',
  },

  pages: {
    writeToUs: 'Write to us',
    fallbackTitle: 'Information',
    refills: {
      title: 'Refills',
      body: [
        'Every Kimem bottle is made to be kept. When yours runs low, bring or send it back and we refill it from the same batch notes, for less than a new bottle.',
        'Write to {email} to arrange a refill.',
      ],
    },
    gifting: {
      title: 'Gifting',
      body: [
        'Any bottle can be engraved with up to three initials and sent with a handwritten card. Add the engraving when you choose your perfume, and tell us the card message in your order note.',
      ],
    },
    contact: {
      title: 'Contact',
      body: [
        'For orders, refills, stockists and press, write to {email}. We answer every message ourselves, usually within two working days.',
      ],
    },
    shipping: {
      title: 'Shipping',
      body: [
        'Orders are packed by hand and sent within three working days of confirmation.',
        'Delivery costs and times depend on where you are; we confirm both before you pay.',
      ],
    },
    returns: {
      title: 'Returns',
      body: [
        'Unopened bottles can be returned within 14 days of delivery for a full refund.',
        'Engraved bottles are made for one person and cannot be returned unless they arrive damaged.',
      ],
    },
    questions: {
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
          a: 'Write to {email} and we will tell you where to smell the collection.',
        },
      ],
    },
    privacy: {
      title: 'Privacy',
      body: [
        'We collect only what we need to answer you and send your order: your name, contact details and address.',
        'If you join the letter we keep your email address until you unsubscribe. We never sell or share it.',
        'This site stores your bag and preferences in your own browser only. It uses no advertising or tracking cookies.',
      ],
    },
    terms: {
      title: 'Terms',
      body: [
        'Prices are shown including tax. An order is confirmed only when we reply to it.',
        'Batches are limited; if a perfume sells out before we confirm your order, we tell you and you pay nothing.',
      ],
    },
  },
}
