<script setup>
/* A drawn Kimem bottle with the customer's initials etched into the glass. */
defineProps({
  initials: { type: String, default: '' },
})
</script>

<template>
  <svg class="bottle" viewBox="0 0 200 280" role="img" :aria-label="initials ? `Bottle engraved ${initials}` : 'Bottle, not engraved'">
    <defs>
      <linearGradient id="bp-juice" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#d9a863" />
        <stop offset="1" stop-color="#8a5526" />
      </linearGradient>
      <linearGradient id="bp-glass" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#fff" stop-opacity="0.35" />
        <stop offset="0.18" stop-color="#fff" stop-opacity="0.05" />
        <stop offset="0.8" stop-color="#fff" stop-opacity="0" />
        <stop offset="1" stop-color="#fff" stop-opacity="0.22" />
      </linearGradient>
      <linearGradient id="bp-cap" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#6b4a32" />
        <stop offset="0.45" stop-color="#9c7353" />
        <stop offset="1" stop-color="#4e3524" />
      </linearGradient>
    </defs>

    <!-- cap and collar -->
    <rect x="72" y="14" width="56" height="54" rx="6" fill="url(#bp-cap)" />
    <rect x="80" y="66" width="40" height="12" fill="#c9b79a" opacity="0.8" />

    <!-- glass body, juice, highlights -->
    <rect x="34" y="76" width="132" height="188" rx="10" fill="#efe6d6" opacity="0.5" />
    <rect x="40" y="104" width="120" height="154" rx="6" fill="url(#bp-juice)" />
    <rect x="34" y="76" width="132" height="188" rx="10" fill="url(#bp-glass)" stroke="#b9a58a" stroke-opacity="0.6" />

    <!-- label -->
    <text x="100" y="138" text-anchor="middle" class="bottle__brand">KIMEM</text>
    <line x1="80" y1="148" x2="120" y2="148" stroke="#f4efe6" stroke-opacity="0.5" />

    <!-- engraving -->
    <Transition name="etch" mode="out-in">
      <text :key="initials" x="100" y="212" text-anchor="middle" class="bottle__initials">
        {{ initials || '·' }}
      </text>
    </Transition>
  </svg>
</template>

<style scoped>
.bottle {
  width: 100%;
  height: auto;
  overflow: visible;
}
.bottle__brand {
  font-family: var(--font-display);
  font-size: 15px;
  letter-spacing: 6px;
  fill: #f4efe6;
  opacity: 0.85;
}
.bottle__initials {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 46px;
  letter-spacing: 4px;
  fill: #fff;
  fill-opacity: 0.55;
  stroke: #5a3517;
  stroke-opacity: 0.35;
  stroke-width: 0.8;
}
.etch-enter-active,
.etch-leave-active {
  transition:
    opacity 0.4s var(--ease-out),
    transform 0.4s var(--ease-out);
}
.etch-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.etch-leave-to {
  opacity: 0;
}
</style>
