<script setup>
import { images } from '@/data/images'
import IconArrow from './IconArrow.vue'

const stats = [
  { value: '48', unit: 'h', label: 'from harvest to first extraction' },
  { value: '12', unit: 'wks', label: 'resting in the dark' },
  { value: '200', unit: '', label: 'bottles per batch, numbered by hand' },
]
</script>

<template>
  <section id="atelier" class="atelier" v-theme="'dark'">
    <div class="container atelier__grid">
      <div class="atelier__media" v-reveal>
        <div class="atelier__main">
          <img
            :src="images.leaves.src"
            :alt="images.leaves.alt"
            v-parallax="9"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div class="atelier__small" v-reveal="{ delay: 0.25, y: 60 }">
          <img :src="images.smoke.src" :alt="images.smoke.alt" loading="lazy" decoding="async" />
        </div>
      </div>

      <div class="atelier__content" v-reveal.group>
        <p class="eyebrow">The atelier</p>
        <h2 class="section-title">Made slowly, <em>by hand.</em></h2>
        <p class="lead">
          Leaves are washed in spring water the morning they are picked. Citrus is pressed cold,
          never heated. Resins are burned, not extracted, so the smoke itself is captured. Every
          batch rests in the dark for twelve weeks before a single bottle is filled.
        </p>
        <dl class="atelier__stats">
          <div v-for="s in stats" :key="s.label">
            <dt>{{ s.value }}<small v-if="s.unit">{{ s.unit }}</small></dt>
            <dd>{{ s.label }}</dd>
          </div>
        </dl>
        <a href="#collection" class="link-arrow">Discover the collection <IconArrow /></a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.atelier {
  padding: clamp(3rem, 6vw, 6rem) 0 clamp(7rem, 14vw, 13rem);
}
.atelier__grid {
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: clamp(3rem, 7vw, 8rem);
  align-items: center;
}
.atelier__media {
  position: relative;
  padding-bottom: 10%;
}
.atelier__main {
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border-radius: 4px;
  background: var(--surface);
}
.atelier__main img {
  width: 100%;
  height: 126%;
  margin-top: -13%;
  object-fit: cover;
  will-change: transform;
}
.atelier__small {
  position: absolute;
  right: -6%;
  bottom: 0;
  width: 38%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 40px 90px -30px rgba(0, 0, 0, 0.65);
}
.atelier__small img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.atelier__content .section-title {
  margin-bottom: 1.5rem;
}
.atelier__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin: 2.75rem 0 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid var(--line);
  transition: border-color var(--t-theme);
}
.atelier__stats dt {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 3.6vw, 3.4rem);
  font-weight: 300;
  line-height: 1;
}
.atelier__stats dt small {
  font-size: 0.45em;
  font-style: italic;
  margin-left: 0.15em;
  color: var(--accent);
}
.atelier__stats dd {
  max-width: 16ch;
  margin-top: 0.6rem;
  font-size: 0.78rem;
  line-height: 1.5;
  color: var(--fg-3);
}
@media (max-width: 1000px) {
  .atelier__grid {
    grid-template-columns: 1fr;
    gap: 3.5rem;
  }
  .atelier__media {
    margin-right: 6%;
    padding-bottom: 12%;
  }
}
@media (max-width: 560px) {
  .atelier__stats {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
