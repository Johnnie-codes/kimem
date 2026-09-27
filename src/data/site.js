/*
 * Everything about the business that the page needs to know, in one place.
 * Values marked TODO are placeholders the owner still has to confirm.
 */
const env = import.meta.env

export const site = {
  name: 'Kimem',
  url: env.VITE_SITE_URL || '',

  /* Where customers write to. Used by Contact, the order hand-off and the newsletter fallback. */
  email: env.VITE_CONTACT_EMAIL || 'hello@kimem.com', // TODO: confirm

  /* Leave a URL empty to hide that link everywhere. */
  socials: [
    { label: 'Instagram', url: env.VITE_INSTAGRAM_URL || '' },
    { label: 'Pinterest', url: env.VITE_PINTEREST_URL || '' },
    { label: 'Telegram', url: env.VITE_TELEGRAM_URL || '' },
  ],

  /* Prices are stored as plain numbers in this currency. */
  currency: env.VITE_CURRENCY || 'EUR', // TODO: EUR or ETB?
  locale: 'en-GB',

  /*
   * Newsletter. Any endpoint that accepts a POSTed form with an `email` field and answers
   * 2xx works (Formspree, Buttondown, Getform, your own API). Without one, the form opens
   * a pre-filled email to `site.email` instead of pretending to subscribe.
   */
  newsletterUrl: env.VITE_NEWSLETTER_URL || '',

  /*
   * How an order leaves the site. There is no payment processor yet, so checkout hands the
   * bag to a person: 'whatsapp' (handle = number in international format, digits only),
   * 'telegram' (handle = username without @) or 'email' (handle ignored, uses site.email).
   */
  order: {
    channel: env.VITE_ORDER_CHANNEL || 'email',
    handle: env.VITE_ORDER_HANDLE || '',
  },

  /* Atelier figures. TODO: confirm both numbers. */
  batch: {
    size: 200,
    restWeeks: 12,
    /* Set these to show the live batch counter in the collection. */
    number: env.VITE_BATCH_NUMBER ? Number(env.VITE_BATCH_NUMBER) : null,
    remaining: env.VITE_BATCH_REMAINING ? Number(env.VITE_BATCH_REMAINING) : null,
  },
}

export const activeSocials = site.socials.filter((s) => s.url)

export function formatPrice(amount) {
  return new Intl.NumberFormat(site.locale, {
    style: 'currency',
    currency: site.currency,
    maximumFractionDigits: 0,
  }).format(amount)
}
