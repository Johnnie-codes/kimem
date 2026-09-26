<script setup>
const year = new Date().getFullYear()

const columns = [
  { title: 'Shop', links: ['Collection', 'Discovery set', 'Refills', 'Gifting'] },
  { title: 'Maison', links: ['Our story', 'The atelier', 'Journal', 'Stockists'] },
  { title: 'Care', links: ['Contact', 'Shipping', 'Returns', 'Questions'] },
]
</script>

<template>
  <footer class="footer" v-theme="'dark'">
    <div class="container">
      <div class="footer__top">
        <div class="footer__brand">
          <a href="#top" class="footer__wordmark">Kimem</a>
          <p>Maison de parfum. Small batches, composed from memory.</p>
        </div>
        <div v-for="c in columns" :key="c.title" class="footer__col">
          <h4>{{ c.title }}</h4>
          <a v-for="l in c.links" :key="l" href="#">{{ l }}</a>
        </div>
      </div>
      <div class="footer__bottom">
        <span>© {{ year }} Kimem — Maison de Parfum</span>
        <span class="footer__links"><a href="#">Instagram</a><a href="#">Pinterest</a></span>
        <span class="footer__links"><a href="#">Privacy</a><a href="#">Terms</a></span>
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
