<script setup>
import { activeSocials } from '@/data/site'
import { pageHref } from '@/composables/usePageSheet'
import { useI18n } from '@/i18n'

const { t } = useI18n()
const year = new Date().getFullYear()

/* labels are i18n keys */
const columns = [
  {
    title: 'footer.shop',
    links: [
      { label: 'footer.collection', href: '#collection' },
      { label: 'pages.refills.title', href: pageHref('refills') },
      { label: 'pages.gifting.title', href: pageHref('gifting') },
    ],
  },
  {
    title: 'footer.maison',
    links: [
      { label: 'footer.story', href: '#story' },
      { label: 'footer.atelier', href: '#atelier' },
      { label: 'footer.letter', href: '#letter' },
    ],
  },
  {
    title: 'footer.care',
    links: [
      { label: 'pages.contact.title', href: pageHref('contact') },
      { label: 'pages.shipping.title', href: pageHref('shipping') },
      { label: 'pages.returns.title', href: pageHref('returns') },
      { label: 'pages.questions.title', href: pageHref('questions') },
    ],
  },
]
</script>

<template>
  <footer class="footer" v-theme="'dark'">
    <div class="container">
      <div class="footer__top">
        <div class="footer__brand">
          <a href="#top" class="footer__wordmark">Kimem</a>
          <p>{{ t('footer.tagline') }}</p>
        </div>
        <div v-for="c in columns" :key="c.title" class="footer__col">
          <h4>{{ t(c.title) }}</h4>
          <a v-for="l in c.links" :key="l.href" :href="l.href">{{ t(l.label) }}</a>
        </div>
      </div>
      <div class="footer__bottom">
        <span>{{ t('footer.rights', { year }) }}</span>
        <span v-if="activeSocials.length" class="footer__links">
          <a v-for="s in activeSocials" :key="s.label" :href="s.url" target="_blank" rel="noopener">{{
            s.label
          }}</a>
        </span>
        <span class="footer__links">
          <a :href="pageHref('privacy')">{{ t('pages.privacy.title') }}</a
          ><a :href="pageHref('terms')">{{ t('pages.terms.title') }}</a>
        </span>
      </div>
    </div>
    <div class="footer__giant" aria-hidden="true">Kimem</div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  overflow: hidden;
  padding-top: clamp(4rem, 8vw, 7rem);
}
.footer__top {
  display: grid;
  grid-template-columns: 1.4fr repeat(3, 1fr);
  gap: 2rem;
  padding-bottom: clamp(3rem, 5vw, 4.5rem);
  border-bottom: 1px solid var(--line);
  transition: border-color var(--t-theme);
}
.footer__wordmark {
  display: inline-block;
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 500;
  letter-spacing: 0.36em;
  text-transform: uppercase;
  line-height: 1;
}
.footer__brand p {
  max-width: 26ch;
  margin-top: 1.25rem;
  font-size: 0.9rem;
  color: var(--fg-2);
}
.footer__col h4 {
  margin-bottom: 1.25rem;
  font-family: var(--font-sans);
  font-size: 0.64rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--fg-3);
}
.footer__col a {
  display: block;
  padding: 0.3rem 0;
  font-size: 0.92rem;
  color: var(--fg-2);
  transition: color 0.3s;
}
.footer__col a:hover {
  color: var(--fg);
}
.footer__bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem 2rem;
  padding: 1.5rem 0;
  font-size: 0.64rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--fg-3);
}
.footer__links {
  display: flex;
  gap: 1.5rem;
}
.footer__links a:hover {
  color: var(--fg);
}
.footer__giant {
  margin-top: 1rem;
  margin-bottom: -0.1em;
  font-family: var(--font-display);
  font-size: clamp(6rem, 24vw, 26rem);
  font-weight: 300;
  line-height: 0.74;
  letter-spacing: 0.08em;
  text-align: center;
  text-transform: uppercase;
  color: color-mix(in oklab, var(--fg) 7%, transparent);
  user-select: none;
  white-space: nowrap;
}
@media (max-width: 820px) {
  .footer__top {
    grid-template-columns: 1fr 1fr;
  }
  .footer__brand {
    grid-column: 1 / -1;
  }
  .footer__bottom {
    flex-direction: column;
  }
}
</style>
