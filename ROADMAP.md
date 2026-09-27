# Kimem roadmap

Work is grouped in phases. Each phase ships on its own and leaves the page working.

## Phase 1 — Make everything honest ✅

Nothing on the page should look like it works when it doesn't.

- [x] Newsletter posts to a real endpoint (`VITE_NEWSLETTER_URL`); without one it opens a
      pre-filled email instead of faking a "thank you"
- [x] Footer and menu links all go somewhere: sections, or info pages (`#page-shipping` …)
- [x] Social links come from config and are hidden until they have a URL
- [x] Shipping / samples promises removed; the assurance strip shows only once products exist
- [x] Prices formatted from one currency setting (`VITE_CURRENCY`)
- [x] Link preview image (`public/og.jpg`) and Open Graph / Twitter tags
- [x] Preloader no longer crashes on hot reload
- [x] One config file for business facts: `src/data/site.js`

## Phase 2 — The shop ✅

Everything here stays hidden until products exist. Try it now with `npm run dev` → `/?demo`.

- [x] Bag drawer: quantities, remove, remembered between visits
- [x] Checkout hand-off by email, WhatsApp or Telegram (no payment processor yet)
- [x] Product quick view with the opening / heart / trail of each perfume
- [x] Engraving preview (initials on the bottle)
- [x] Batch counter ("Batch Nº 01 — 142 of 200 left")
- [x] Scent finder: pick moods, get a matching perfume
- [x] Demo products for development (`?demo`), never in a production build

## Phase 3 — Atmosphere ✅

- [x] Liquid ripple on hero photos
- [x] ~~Drifting smoke behind the hero~~ — removed: it read as a grey haze over the hero
- [x] English / Amharic switch (all copy in `src/i18n/`; Amharic is a first draft)
- [x] Ambient sound toggle (off by default, synthesised in the browser, no audio file)

## Phase 4 — Needs a backend or an owner decision (not built)

- Real products: names, notes, prices, product photos
- ~~Currency and order channel~~ — decided: ETB, orders via Telegram
- The shop's Telegram username (`VITE_ORDER_HANDLE`)
- Newsletter provider account
- Online payments (Stripe / Chapa) instead of the hand-off
- Memory wall (visitor submissions need storage and moderation)
- Live batch counter from a server instead of a config number
- 3D bottle (needs the real bottle shape or a 3D model)
- Native-speaker review of the Amharic
- Owner / legal review of shipping, returns, privacy and terms copy
- Confirm the batch size (200) and resting time (12 weeks)
