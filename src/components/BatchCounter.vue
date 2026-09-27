<script setup>
import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue'
import { prefersReducedMotion } from '@/lib/gsap'
import { useI18n } from '@/i18n'

const { t } = useI18n()

const props = defineProps({
  number: { type: Number, required: true },
  remaining: { type: Number, required: true },
  size: { type: Number, required: true },
})

const R = 26
const C = 2 * Math.PI * R
const left = computed(() => Math.max(0, Math.min(props.remaining, props.size)))
const target = computed(() => left.value / props.size)

/* the ring fills and the number counts down the first time it scrolls into view */
const root = useTemplateRef('root')
const shownFrac = ref(prefersReducedMotion ? target.value : 1)
const shownLeft = ref(prefersReducedMotion ? left.value : props.size)
let io
let raf

function play() {
  const start = performance.now()
  const dur = 1800
  const step = (now) => {
    const t = Math.min(1, (now - start) / dur)
    const e = 1 - Math.pow(1 - t, 4)
    shownFrac.value = 1 - (1 - target.value) * e
    shownLeft.value = Math.round(props.size - (props.size - left.value) * e)
    if (t < 1) raf = requestAnimationFrame(step)
  }
  raf = requestAnimationFrame(step)
}

onMounted(() => {
  if (prefersReducedMotion) return
  io = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      play()
    },
    { threshold: 0.6 },
  )
  io.observe(root.value)
})
onBeforeUnmount(() => {
  io?.disconnect()
  cancelAnimationFrame(raf)
})
</script>

<template>
  <div ref="root" class="batch" role="status">
    <svg viewBox="0 0 64 64" class="batch__ring" aria-hidden="true">
      <circle cx="32" cy="32" :r="R" class="batch__track" />
      <circle
        cx="32"
        cy="32"
        :r="R"
        class="batch__fill"
        :stroke-dasharray="C"
        :stroke-dashoffset="C * (1 - shownFrac)"
      />
    </svg>
    <p>
      <span class="batch__label">{{ t('batch.label', { n: String(number).padStart(2, '0') }) }}</span>
      <span class="batch__count">
        <strong>{{ shownLeft }}</strong> {{ t('batch.left', { size }) }}
      </span>
    </p>
  </div>
</template>

<style scoped>
.batch {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
}
.batch__ring {
  width: 3.5rem;
  height: 3.5rem;
  rotate: -90deg;
}
.batch__track,
.batch__fill {
  fill: none;
  stroke-width: 2;
}
.batch__track {
  stroke: var(--line);
}
.batch__fill {
  stroke: var(--accent);
  stroke-linecap: round;
}
.batch p {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
}
.batch__label {
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--fg-3);
}
.batch__count {
  font-size: 0.9rem;
  color: var(--fg-2);
}
.batch__count strong {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--fg);
}
</style>
