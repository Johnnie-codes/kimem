<script setup>
import { onBeforeUnmount, onMounted, reactive, ref, useTemplateRef } from 'vue'
import { gsap, hasFinePointer, prefersReducedMotion } from '@/lib/gsap'

const enabled = ref(false)
const state = reactive({ hover: false, link: false, out: true, label: '' })
const dot = useTemplateRef('dot')
const ring = useTemplateRef('ring')
let cleanup = () => {}

const INTERACTIVE = 'a, button, input, textarea, select, label, [role="button"]'

onMounted(() => {
  if (!hasFinePointer || prefersReducedMotion) return
  enabled.value = true
  document.documentElement.classList.add('has-cursor')

  let x = window.innerWidth / 2
  let y = window.innerHeight / 2
  let rx = x
  let ry = y

  const move = (e) => {
    x = e.clientX
    y = e.clientY
    state.out = false
    if (dot.value) dot.value.style.translate = `${x}px ${y}px`
  }
  const tick = () => {
    rx += (x - rx) * 0.16
    ry += (y - ry) * 0.16
    if (ring.value) ring.value.style.translate = `${rx.toFixed(2)}px ${ry.toFixed(2)}px`
  }
  const over = (e) => {
    const labelled = e.target.closest('[data-cursor]')
    if (labelled) {
      state.hover = true
      state.label = labelled.dataset.cursor
    }
    if (e.target.closest(INTERACTIVE)) state.link = true
  }
  const out = (e) => {
    const labelled = e.target.closest('[data-cursor]')
    if (labelled && !labelled.contains(e.relatedTarget)) state.hover = false
    const interactive = e.target.closest(INTERACTIVE)
    if (interactive && !interactive.contains(e.relatedTarget)) state.link = false
  }
  const leave = () => (state.out = true)
  const enter = () => (state.out = false)

  window.addEventListener('pointermove', move, { passive: true })
  document.addEventListener('mouseover', over)
  document.addEventListener('mouseout', out)
  document.documentElement.addEventListener('mouseleave', leave)
  document.documentElement.addEventListener('mouseenter', enter)
  gsap.ticker.add(tick)

  cleanup = () => {
    window.removeEventListener('pointermove', move)
    document.removeEventListener('mouseover', over)
    document.removeEventListener('mouseout', out)
    document.documentElement.removeEventListener('mouseleave', leave)
    document.documentElement.removeEventListener('mouseenter', enter)
    gsap.ticker.remove(tick)
    document.documentElement.classList.remove('has-cursor')
  }
})

onBeforeUnmount(() => cleanup())
</script>

<template>
  <div
    class="cursor"
    :class="{
      'is-enabled': enabled,
      'is-hover': state.hover,
      'is-link': state.link,
      'is-out': state.out,
    }"
    aria-hidden="true"
  >
    <div ref="dot" class="cursor__dot"></div>
    <div ref="ring" class="cursor__ring">
      <span class="cursor__label">{{ state.label }}</span>
    </div>
  </div>
</template>

<style scoped>
.cursor {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  pointer-events: none;
  transition: opacity 0.4s;
}
.cursor.is-enabled {
  display: block;
}
.cursor.is-out {
  opacity: 0;
}
.cursor__dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 6px;
  height: 6px;
  margin: -3px 0 0 -3px;
  border-radius: 50%;
  background: var(--fg);
  transition:
    background-color var(--t-theme),
    opacity 0.3s;
}
.cursor__ring {
  position: fixed;
  top: 0;
  left: 0;
  width: 36px;
  height: 36px;
  margin: -18px 0 0 -18px;
  border-radius: 50%;
  border: 1px solid var(--line-strong);
  display: grid;
  place-items: center;
  transition:
    width 0.5s var(--ease-out),
    height 0.5s var(--ease-out),
    margin 0.5s var(--ease-out),
    background-color 0.5s var(--ease-out),
    border-color 0.5s var(--ease-out);
}
.cursor.is-link .cursor__ring {
  width: 14px;
  height: 14px;
  margin: -7px 0 0 -7px;
  border-color: var(--fg);
}
.cursor.is-link .cursor__dot {
  opacity: 0;
}
.cursor.is-hover .cursor__ring {
  width: 88px;
  height: 88px;
  margin: -44px 0 0 -44px;
  background: var(--fg);
  border-color: transparent;
}
.cursor.is-hover .cursor__dot {
  opacity: 0;
}
.cursor__label {
  font-size: 0.56rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  padding-left: 0.22em;
  color: var(--bg);
  opacity: 0;
  transition: opacity 0.3s;
}
.cursor.is-hover .cursor__label {
  opacity: 1;
}
</style>
