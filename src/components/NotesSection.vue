<script setup>
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue'
import { ScrollTrigger } from '@/lib/gsap'
import { notes } from '@/data/notes'

const root = useTemplateRef('root')
const active = ref(0)
const pad = (n) => String(n).padStart(2, '0')
let triggers = []

onMounted(() => {
  root.value.querySelectorAll('.note').forEach((el, i) => {
    triggers.push(
      ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        end: 'bottom 60%',
        onEnter: () => (active.value = i),
        onEnterBack: () => (active.value = i),
      }),
    )
  })
})

onBeforeUnmount(() => triggers.forEach((t) => t.kill()))
</script>

<template>
  <section id="notes" ref="root" class="notes" v-theme="'dark'">
    <div class="container">
      <header class="section-head notes__head" v-reveal.group>
        <div>
          <p class="eyebrow">Anatomy of a scent</p>
          <h2 class="section-title">Three notes, <em>one slow reveal.</em></h2>
        </div>
        <p class="lead">
          A Kimem composition unfolds the way a memory does: a bright first impression, a
          warmth that settles, and something that stays long after.
        </p>
      </header>

      <div class="notes__grid">
        <div class="notes__visual">
          <div class="notes__frame">
            <img
              v-for="(n, i) in notes"
              :key="n.key"
              :src="n.image.src"
              :alt="n.image.alt"
              class="notes__img"
              :class="{ 'is-active': i === active }"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div class="notes__meta">
            <span>{{ pad(active + 1) }} — {{ pad(notes.length) }}</span>
            <span>{{ notes[active].family }}</span>
          </div>
        </div>

        <div class="notes__list">
          <article
            v-for="(n, i) in notes"
            :key="n.key"
            class="note"
            :class="{ 'is-active': i === active }"
          >
            <div class="note__media">
              <img :src="n.image.src" :alt="n.image.alt" loading="lazy" decoding="async" />
            </div>
            <div class="note__head">
              <span class="note__num">{{ pad(i + 1) }}</span>
              <p class="eyebrow">{{ n.layer }} · {{ n.tagline }}</p>
            </div>
            <h3 class="note__title">{{ n.title }}</h3>
            <p class="note__text">{{ n.text }}</p>
            <ul class="note__tags">
              <li v-for="t in n.tags" :key="t">{{ t }}</li>
            </ul>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.notes {
  padding: clamp(6rem, 12vw, 11rem) 0 clamp(4rem, 8vw, 7rem);
}
.notes__head .lead {
  max-width: 40ch;
  padding-bottom: 0.4rem;
}
.notes__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 6vw, 7rem);
  align-items: start;
}
.notes__visual {
  position: sticky;
  top: calc(var(--nav-h) + 0.5rem);
}
.notes__frame {
  position: relative;
  aspect-ratio: 4 / 5;
  max-height: calc(100svh - var(--nav-h) - 4.5rem);
  overflow: hidden;
  border-radius: 4px;
  background: var(--surface);
}
.notes__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transform: scale(1.06);
  transition:
    opacity 1.1s var(--ease-in-out),
    transform 1.8s var(--ease-out);
}
.notes__img.is-active {
  opacity: 1;
  transform: scale(1);
}
.notes__meta {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  font-size: 0.64rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--fg-3);
}
.notes__list {
  display: flex;
  flex-direction: column;
}
.note {
  min-height: 72vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem 0;
  border-top: 1px solid var(--line);
  opacity: 0.32;
  transition:
    opacity 0.8s var(--ease-out),
    border-color var(--t-theme);
}
.note:first-child {
  border-top: 0;
  padding-top: 0;
}
.note.is-active {
  opacity: 1;
}
.note__media {
  display: none;
}
.note__head {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.note__num {
  font-family: var(--font-display);
  font-size: 1.1rem;
  letter-spacing: 0.08em;
  color: var(--accent);
}
.note__title {
  font-size: clamp(3rem, 6vw, 6rem);
  margin: 1rem 0 1.25rem;
}
.note__text {
  max-width: 42ch;
  font-size: 1.05rem;
  color: var(--fg-2);
}
.note__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.75rem;
}
.note__tags li {
  padding: 0.55rem 0.95rem;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  font-size: 0.64rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

@media (max-width: 1000px) {
  .notes__grid {
    display: block;
  }
  .notes__visual {
    display: none;
  }
  .note {
    min-height: 0;
    opacity: 1;
    padding: 2.5rem 0;
  }
  .note__media {
    display: block;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    border-radius: 4px;
    margin-bottom: 1.75rem;
  }
  .note__media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
