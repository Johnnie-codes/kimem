<script setup>
import { onMounted, useTemplateRef } from 'vue'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

const emit = defineEmits(['reveal', 'done'])
const root = useTemplateRef('root')
const mark = useTemplateRef('mark')
const track = useTemplateRef('track')
const bar = useTemplateRef('bar')

const MIN_MS = 1300 // never flash the curtain
const MAX_MS = 3200 // never make people wait on slow images

onMounted(async () => {
  if (prefersReducedMotion) {
    emit('reveal')
    emit('done')
    return
  }

  const started = performance.now()
  gsap.to(bar.value, { scaleX: 1, duration: 1.7, ease: 'power2.inOut' })

  const loaded = new Promise((resolve) => {
    if (document.readyState === 'complete') resolve()
    else window.addEventListener('load', resolve, { once: true })
  })
  const fonts = document.fonts?.ready ?? Promise.resolve()
  await Promise.race([
    Promise.all([loaded, fonts]),
    new Promise((resolve) => setTimeout(resolve, MAX_MS)),
  ])
  await new Promise((resolve) =>
    setTimeout(resolve, Math.max(0, MIN_MS - (performance.now() - started))),
  )

  gsap
    .timeline({ onComplete: () => emit('done') })
    .to(bar.value, { scaleX: 1, duration: 0.3, ease: 'power2.out' })
    .to(
      [mark.value, track.value],
      { y: -22, opacity: 0, duration: 0.55, stagger: 0.06, ease: 'power3.in' },
      '-=0.1',
    )
    .to(root.value, { yPercent: -100, duration: 1.15, ease: 'expo.inOut' }, '-=0.05')
    .call(() => emit('reveal'), null, '<0.42')
})
</script>

<template>
  <div ref="root" class="preloader" aria-hidden="true">
    <div ref="mark" class="preloader__mark">Kimem</div>
    <div ref="track" class="preloader__bar"><span ref="bar"></span></div>
  </div>
</template>

<style scoped>
.preloader {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  background: var(--espresso);
  color: var(--ivory);
  will-change: transform;
}
.preloader__mark {
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 3vw, 2.5rem);
  font-weight: 400;
  letter-spacing: 0.44em;
  text-transform: uppercase;
  padding-left: 0.44em;
  line-height: 1;
}
.preloader__bar {
  width: 140px;
  height: 1px;
  background: rgba(244, 239, 230, 0.16);
  overflow: hidden;
}
.preloader__bar span {
  display: block;
  height: 100%;
  background: var(--gold);
  transform: scaleX(0);
  transform-origin: left;
}
</style>
