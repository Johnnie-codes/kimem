import { site, formatPrice } from '@/data/site'
import { t } from '@/i18n'

/*
 * There is no payment processor yet, so checkout turns the bag into a message a person can
 * confirm. Returns { href, copy } — `copy` is set when the channel cannot pre-fill the text
 * (Telegram), so the page should put the message on the clipboard first.
 */
export function orderMessage(items, subtotal, note = '') {
  const lines = items.map((l) => {
    const engraved = l.engraving ? ` (${t('order.engraved', { initials: l.engraving })})` : ''
    return `• ${l.qty} × ${l.product.name}, ${l.product.kind}${engraved} — ${formatPrice(l.product.price * l.qty)}`
  })
  const parts = [
    t('order.greeting', { name: site.name }),
    '',
    ...lines,
    '',
    t('order.subtotal', { price: formatPrice(subtotal) }),
  ]
  if (note.trim()) parts.push('', t('order.note', { note: note.trim() }))
  parts.push('', t('order.closing'))
  return parts.join('\n')
}

export function orderLink(message) {
  const { channel, handle } = site.order
  const digits = (handle || '').replace(/\D/g, '')
  const username = (handle || '').replace(/^@/, '')

  if (channel === 'whatsapp' && digits) {
    return { channel, href: `https://wa.me/${digits}?text=${encodeURIComponent(message)}` }
  }
  if (channel === 'telegram' && username) {
    return { channel, href: `https://t.me/${encodeURIComponent(username)}`, copy: message }
  }
  const subject = encodeURIComponent(t('order.subject', { name: site.name }))
  return {
    channel: 'email',
    href: `mailto:${site.email}?subject=${subject}&body=${encodeURIComponent(message)}`,
  }
}

