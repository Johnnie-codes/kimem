<script setup>
import { computed } from 'vue'
import { useI18n } from '@/i18n'
import IconArrow from './IconArrow.vue'

const { t } = useI18n()
/* `*word*` in the copy marks the italic word */
const parts = computed(() =>
  t('manifesto.text')
    .split(/(\*[^*]+\*)/)
    .filter(Boolean)
    .map((p) => (p.startsWith('*') ? { em: true, text: p.slice(1, -1) } : { text: p })),
)
</script>

<template>
  <section id="story" class="manifesto" v-theme="'light'">
    <div class="container manifesto__inner">
      <div class="manifesto__seal" aria-hidden="true" v-reveal="{ y: 0, delay: 0.3 }">
        <svg viewBox="0 0 200 200">
          <defs>
            <path id="seal-path" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
          </defs>
          <text textLength="462" lengthAdjust="spacing">
            <textPath href="#seal-path">{{ t('manifesto.seal') }}</textPath>
          </text>
        </svg>
        <span>✦</span>
      </div>
      <p class="eyebrow" v-reveal>{{ t('manifesto.eyebrow') }}</p>
      <h2 class="manifesto__text" v-split-words>
        <template v-for="(p, i) in parts" :key="i"><em v-if="p.em">{{ p.text }}</em
          ><template v-else>{{ p.text }}</template></template
        >
      </h2>
      <div class="manifesto__meta">
        <p class="lead" v-reveal>
          {{ t('manifesto.lead') }}
        </p>
        <a href="#atelier" class="link-arrow" v-reveal="{ delay: 0.15 }">
          {{ t('manifesto.link') }} <IconArrow />
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.manifesto {
  padding: clamp(6rem, 14vw, 12rem) 0 clamp(4rem, 8vw, 7rem);
}
.manifesto__inner {
  position: relative;
}
.manifesto__seal {
  position: absolute;
  top: 2.5rem;
  right: 6%;
  width: clamp(120px, 12vw, 172px);
  aspect-ratio: 1;
  display: grid;
  place-items: center;
}
.manifesto__seal svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  animation: seal-spin 28s linear infinite;
  overflow: visible;
}
.manifesto__seal text {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  fill: var(--fg-2);
}
.manifesto__seal span {
  font-size: 0.75rem;
  color: var(--accent);
}
@keyframes seal-spin {
  to {
    transform: rotate(360deg);
  }
}
@media (max-width: 820px) {
  .manifesto__seal {
    display: none;
  }
}
.manifesto__text {
  max-width: 22ch;
  margin-top: 1.5rem;
  font-size: clamp(2rem, 4.8vw, 4.9rem);
  line-height: 1.1;
  letter-spacing: -0.01em;
}
.manifesto__text :deep(.w) {
  display: inline;
  will-change: opacity;
}
.manifesto__meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: clamp(3rem, 6vw, 5rem);
  padding-top: 2.5rem;
  border-top: 1px solid var(--line);
  transition: border-color var(--t-theme);
}
.manifesto__meta .lead {
  grid-column: 2;
  max-width: 46ch;
}
.manifesto__meta .link-arrow {
  grid-column: 2;
  justify-self: start;
}
@media (max-width: 820px) {
  .manifesto__meta {
    grid-template-columns: 1fr;
  }
  .manifesto__meta .lead,
  .manifesto__meta .link-arrow {
    grid-column: 1;
  }
}
</style>
