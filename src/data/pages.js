/*
 * Short information pages opened from the footer and menu (as #page-<id>).
 * Copy lives in the i18n files under `pages.<id>`; `{email}` is replaced with site.email.
 * DRAFT: starter copy so no link is dead. The owner must review every policy page
 * (shipping, returns, privacy, terms) before launch; none of it is legal advice.
 */
export const pages = [
  { id: 'refills' },
  { id: 'gifting' },
  { id: 'contact', contact: true },
  { id: 'shipping' },
  { id: 'returns' },
  { id: 'questions' },
  { id: 'privacy' },
  { id: 'terms' },
]

export const pageById = Object.fromEntries(pages.map((p) => [p.id, p]))
