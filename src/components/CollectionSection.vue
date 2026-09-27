<script setup>
import { catalogue as products, batch, isDemo } from '@/data/catalogue'
import { images } from '@/data/images'
import { useI18n } from '@/i18n'
import ProductCard from './ProductCard.vue'
import IconArrow from './IconArrow.vue'
import BatchCounter from './BatchCounter.vue'

const { t } = useI18n()
</script>

<template>
  <section id="collection" class="collection" v-theme="'light'">
    <div class="container">
      <header class="section-head" v-reveal.group>
        <div>
          <p class="eyebrow">{{ t('collection.eyebrow') }}</p>
          <h2 class="section-title">{{ t('collection.titleA') }} <em>{{ t('collection.titleB') }}</em></h2>
        </div>
        <div class="collection__side">
          <p class="lead collection__lead">{{ t('collection.lead') }}</p>
          <BatchCounter v-if="batch && products.length" v-bind="batch" />
        </div>
      </header>

      <p v-if="isDemo" class="collection__demo">{{ t('collection.demo') }}</p>

      <div v-if="products.length" class="products" v-reveal.group="{ stagger: 0.12 }">
        <ProductCard v-for="p in products" :key="p.id" :product="p" />
      </div>

      <div v-else class="soon" v-reveal>
        <div class="soon__media">
          <img :src="images.bottles.src" :alt="images.bottles.alt" loading="lazy" decoding="async" />
        </div>
        <div class="soon__body">
          <p class="eyebrow">{{ t('collection.soonEyebrow') }}</p>
          <p class="soon__title">{{ t('collection.soonA') }} <em>{{ t('collection.soonB') }}</em></p>
          <p class="lead">{{ t('collection.soonLead') }}</p>
          <a href="#letter" class="link-arrow">{{ t('collection.soonLink') }} <IconArrow /></a>
        </div>
      </div>

      <ul v-if="products.length" class="assurance" v-reveal>
        <li v-for="a in t('collection.assurances')" :key="a">{{ a }}</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.collection {
  padding: clamp(6rem, 12vw, 11rem) 0 clamp(3rem, 6vw, 5rem);
}
.collection__side {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
}
.collection__demo {
  margin-bottom: 1.5rem;
  padding: 0.6rem 1rem;
  border: 1px dashed var(--accent);
  border-radius: 4px;
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
}
.collection__lead {
  max-width: 38ch;
  padding-bottom: 0.4rem;
}
.products {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(1rem, 2vw, 2rem);
}
.soon {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: clamp(2rem, 5vw, 5rem);
  align-items: center;
}
.soon__media {
  aspect-ratio: 16 / 11;
  overflow: hidden;
  border-radius: 4px;
  background: var(--surface);
}
.soon__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 68%;
}
.soon__body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
}
.soon__title {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: clamp(2rem, 3.4vw, 3.2rem);
  line-height: 1.05;
}
.assurance {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem 3rem;
  margin-top: clamp(3rem, 6vw, 5rem);
  padding: 1.6rem 0;
  border-block: 1px solid var(--line);
  font-size: 0.66rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--fg-2);
  transition: border-color var(--t-theme);
}
.assurance li {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.assurance li::before {
  content: '✦';
  font-size: 0.6rem;
  color: var(--accent);
}
@media (max-width: 1000px) {
  .products {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 820px) {
  .soon {
    grid-template-columns: 1fr;
  }
  .section-head {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
