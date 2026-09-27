<script setup>
import { computed, ref } from 'vue'
import { moods } from '@/data/moods'
import { catalogue } from '@/data/catalogue'
import { formatPrice } from '@/data/site'
import { useQuickView } from '@/composables/useQuickView'
import { useI18n } from '@/i18n'

const { t } = useI18n()

const { show } = useQuickView()
const picked = ref([])

/* only perfumes that declare moods take part; sets are left out so the answer is one bottle */
const candidates = catalogue.filter((p) => p.moods?.length && !p.feature)

function toggle(key) {
  const i = picked.value.indexOf(key)
  if (i >= 0) picked.value.splice(i, 1)
  else picked.value = [...picked.value, key].slice(-2) // at most two moods
}

const matches = computed(() => {
  if (!picked.value.length) return []
  return candidates
    .map((p) => ({ p, score: p.moods.filter((m) => picked.value.includes(m)).length }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.p.moods.length - b.p.moods.length)
    .slice(0, 2)
    .map((r) => r.p)
})
</script>

<template>
  <section v-if="candidates.length" id="finder" class="finder" v-theme="'light'">
    <div class="container">
      <header class="section-head" v-reveal.group>
        <div>
          <p class="eyebrow">{{ t('finder.eyebrow') }}</p>
          <h2 class="section-title">{{ t('finder.titleA') }} <em>{{ t('finder.titleB') }}</em></h2>
        </div>
        <p class="lead">{{ t('finder.lead') }}</p>
      </header>

      <div class="finder__moods" role="group" :aria-label="t('finder.group')" v-reveal.group="{ stagger: 0.08 }">
        <button
          v-for="m in moods"
          :key="m.key"
          type="button"
          class="mood"
          :class="{ 'is-on': picked.includes(m.key) }"
          :aria-pressed="picked.includes(m.key)"
          @click="toggle(m.key)"
        >
          <img :src="m.image.src" alt="" loading="lazy" decoding="async" />
          <span class="mood__text">
            <strong>{{ t(`moods.${m.key}.label`) }}</strong>
            <span>{{ t(`moods.${m.key}.line`) }}</span>
          </span>
          <span class="mood__check" aria-hidden="true"></span>
        </button>
      </div>

      <div class="finder__result" aria-live="polite">
        <Transition name="result" mode="out-in">
          <p v-if="!picked.length" key="none" class="finder__hint">{{ t('finder.none') }}</p>
          <p v-else-if="!matches.length" key="nomatch" class="finder__hint">
            {{ t('finder.noMatch') }}
          </p>
          <ul v-else :key="matches.map((p) => p.id).join()" class="finder__matches">
            <li v-for="p in matches" :key="p.id">
              <button type="button" class="match" @click="show(p)">
                <img :src="p.image.src" :alt="''" />
                <span>
                  <span class="match__name">{{ p.name }}</span>
                  <span class="match__meta">{{ p.notes }} · {{ formatPrice(p.price) }}</span>
                </span>
                <span class="link-arrow">{{ t('common.view') }}</span>
              </button>
            </li>
          </ul>
        </Transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
.finder {
  padding: clamp(6rem, 12vw, 11rem) 0 0;
}
.finder__moods {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(0.6rem, 1.4vw, 1.2rem);
}
.mood {
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border-radius: 4px;
  text-align: left;
  color: var(--ivory);
  isolation: isolate;
}
.mood img {
  position: absolute;
  inset: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition:
    transform 1.2s var(--ease-out),
    filter 0.6s;
  filter: saturate(0.7) brightness(0.85);
}
.mood::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(to top, rgba(20, 15, 12, 0.75), transparent 60%);
}
.mood:hover img,
.mood.is-on img {
  transform: scale(1.05);
  filter: none;
}
.mood.is-on {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}
.mood:focus-visible {
  outline: 2px solid var(--fg);
  outline-offset: 3px;
}
.mood__text {
  position: absolute;
  left: 1.1rem;
  right: 1.1rem;
  bottom: 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.mood__text strong {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 2.4vw, 2.2rem);
  font-weight: 400;
  line-height: 1;
}
.mood__text span {
  font-size: 0.78rem;
  line-height: 1.4;
  opacity: 0.85;
}
.mood__check {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 26px;
  height: 26px;
  border: 1px solid rgba(244, 239, 230, 0.8);
  border-radius: 50%;
  transition: background-color 0.3s;
}
.mood.is-on .mood__check {
  background: var(--accent);
  border-color: var(--accent);
}
.mood.is-on .mood__check::after {
  content: '✓';
  display: grid;
  place-items: center;
  height: 100%;
  font-size: 0.8rem;
}
.finder__result {
  min-height: 7rem;
  margin-top: 2rem;
}
.finder__hint {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-style: italic;
  color: var(--fg-3);
}
.finder__matches {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: 1rem;
}
.match {
  display: grid;
  grid-template-columns: 4.5rem 1fr auto;
  align-items: center;
  gap: 1.1rem;
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--line);
  border-radius: 4px;
  text-align: left;
  transition: border-color 0.3s;
}
.match:hover {
  border-color: var(--fg);
}
.match img {
  width: 4.5rem;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 3px;
}
.match > span:nth-child(2) {
  display: flex;
  flex-direction: column;
}
.match__name {
  font-family: var(--font-display);
  font-size: 1.5rem;
  line-height: 1.1;
}
.match__meta {
  font-size: 0.8rem;
  color: var(--fg-2);
}
.result-enter-active,
.result-leave-active {
  transition:
    opacity 0.4s var(--ease-out),
    transform 0.4s var(--ease-out);
}
.result-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.result-leave-to {
  opacity: 0;
}
@media (max-width: 820px) {
  .finder__moods {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
