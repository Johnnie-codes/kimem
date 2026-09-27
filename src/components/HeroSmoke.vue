<script setup>
import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue'
import { prefersReducedMotion } from '@/lib/gsap'

/*
 * Slow, warm smoke drifting up behind the hero. One soft puff is pre-rendered once and
 * redrawn scaled and faded, so each frame is just a few dozen drawImage calls. Runs only
 * while the hero is on screen and the tab is visible; skipped for reduced motion.
 */
const canvas = useTemplateRef('canvas')
let raf = 0
let io
let running = false
let onResize

onMounted(() => {
  if (prefersReducedMotion) return
  const el = canvas.value
  const ctx = el.getContext('2d')
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
  let w = 0
  let h = 0

  // one soft puff, drawn once
  const sprite = document.createElement('canvas')
  sprite.width = sprite.height = 256
  const s = sprite.getContext('2d')
  const g = s.createRadialGradient(128, 128, 0, 128, 128, 128)
  g.addColorStop(0, 'rgba(150, 128, 108, 0.55)')
  g.addColorStop(0.45, 'rgba(150, 128, 108, 0.22)')
  g.addColorStop(1, 'rgba(150, 128, 108, 0)')
  s.fillStyle = g
  s.fillRect(0, 0, 256, 256)

  const COUNT = window.innerWidth < 821 ? 14 : 26
  const rand = (a, b) => a + Math.random() * (b - a)
  const spawn = (p, anywhere) => {
    p.x = rand(-0.1, 1.1) * w
    p.y = anywhere ? rand(0, 1) * h : h + rand(40, 160)
    p.r = rand(90, 240)
    p.vy = rand(7, 18)
    p.sway = rand(12, 38)
    p.phase = rand(0, Math.PI * 2)
    p.life = 0
    p.span = rand(14, 26)
    return p
  }

  const resize = () => {
    w = el.clientWidth
    h = el.clientHeight
    el.width = Math.round(w * dpr)
    el.height = Math.round(h * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }
  resize()
  const puffs = Array.from({ length: COUNT }, () => spawn({}, true))

  let last = performance.now()
  const frame = (now) => {
    const dt = Math.min(0.05, (now - last) / 1000)
    last = now
    ctx.clearRect(0, 0, w, h)
    for (const p of puffs) {
      p.life += dt
      p.y -= p.vy * dt
      p.r += dt * 4
      const t = p.life / p.span
      if (t >= 1 || p.y < -p.r) spawn(p, false)
      const alpha = Math.sin(Math.min(1, t) * Math.PI) * 0.5
      const x = p.x + Math.sin(p.phase + p.life * 0.25) * p.sway
      ctx.globalAlpha = alpha
      ctx.drawImage(sprite, x - p.r, p.y - p.r, p.r * 2, p.r * 2)
    }
    raf = requestAnimationFrame(frame)
  }

  const start = () => {
    if (running || document.hidden) return
    running = true
    last = performance.now()
    raf = requestAnimationFrame(frame)
  }
  const stop = () => {
    running = false
    cancelAnimationFrame(raf)
  }

  io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()))
  io.observe(el)
  onResize = resize
  window.addEventListener('resize', onResize)
  document.addEventListener('visibilitychange', onVisibility)
  function onVisibility() {
    document.hidden ? stop() : start()
  }
  el.__visibility = onVisibility
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  io?.disconnect()
  if (onResize) window.removeEventListener('resize', onResize)
  if (canvas.value?.__visibility) document.removeEventListener('visibilitychange', canvas.value.__visibility)
})
</script>

<template>
  <canvas ref="canvas" class="smoke" aria-hidden="true"></canvas>
</template>

<style scoped>
.smoke {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.9;
}
:global(.is-dark) .smoke {
  opacity: 0.35;
}
</style>
