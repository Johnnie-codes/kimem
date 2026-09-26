<script setup>
import { products } from '@/data/products'
import ProductCard from './ProductCard.vue'
</script>

<template>
  <section id="collection" class="collection" v-theme="'light'">
    <div class="container">
      <header class="section-head" v-reveal.group>
        <div>
          <p class="eyebrow">The collection</p>
          <h2 class="section-title">Four compositions. <em>One memory each.</em></h2>
        </div>
        <p class="lead collection__lead">
          Every bottle is hand-numbered and refillable, forever. Begin with the discovery set, or
          go straight to the one you can already smell.
        </p>
      </header>

      <div class="products" v-reveal.group="{ stagger: 0.12 }">
        <ProductCard v-for="p in products" :key="p.id" :product="p" />
      </div>

      <ul class="assurance" v-reveal>
        <li>Complimentary shipping over €120</li>
        <li>Refillable glass, forever</li>
        <li>Two samples with every order</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.collection {
  padding: clamp(6rem, 12vw, 11rem) 0 clamp(3rem, 6vw, 5rem);
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
  .section-head {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
