<script setup>
/* Opening, heart and trail of one perfume as three stacked tiers, widest at the base. */
import { useI18n } from '@/i18n'

const { t } = useI18n()
defineProps({
  pyramid: { type: Object, required: true },
})
const tiers = [
  { key: 'top', label: 'product.opening', width: 58 },
  { key: 'heart', label: 'product.heart', width: 78 },
  { key: 'base', label: 'product.trail', width: 100 },
]
</script>

<template>
  <ol class="pyramid">
    <li
      v-for="(tier, i) in tiers"
      :key="tier.key"
      class="pyramid__tier"
      :style="{ '--w': `${tier.width}%`, '--i': i }"
    >
      <span class="pyramid__label">{{ t(tier.label) }}</span>
      <span class="pyramid__notes">{{ (pyramid[tier.key] || []).join(' · ') || '—' }}</span>
    </li>
  </ol>
</template>

<style scoped>
.pyramid {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.pyramid__tier {
  width: var(--w);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
  padding: 0.7rem 0.75rem;
  border: 1px solid var(--line-strong);
  border-radius: 3px;
  background: color-mix(in oklab, var(--accent) calc(8% + var(--i) * 6%), transparent);
  text-align: center;
  animation: tier 0.9s var(--ease-out) both;
  animation-delay: calc(0.15s + var(--i) * 0.12s);
}
.pyramid__label {
  font-size: 0.58rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--fg-3);
}
.pyramid__notes {
  font-family: var(--font-display);
  font-size: 1.05rem;
  line-height: 1.2;
}
@keyframes tier {
  from {
    opacity: 0;
    transform: translateY(12px) scaleX(0.9);
  }
}
</style>
