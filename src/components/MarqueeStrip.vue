<script setup>
defineProps({
  items: { type: Array, required: true },
})
</script>

<template>
  <div class="marquee" aria-hidden="true">
    <div class="marquee__track">
      <div v-for="n in 2" :key="n" class="marquee__group">
        <template v-for="item in items" :key="item">
          <span>{{ item }}</span>
          <i>✦</i>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  overflow: hidden;
  margin-top: clamp(2rem, 5vw, 5rem);
  padding: 1.4rem 0;
  border-block: 1px solid var(--line);
  transition: border-color var(--t-theme);
}
.marquee__track {
  display: flex;
  width: max-content;
  animation: marquee 46s linear infinite;
}
.marquee:hover .marquee__track {
  animation-play-state: paused;
}
.marquee__group {
  display: flex;
  align-items: center;
  gap: 2.6rem;
  padding-right: 2.6rem;
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 2.6vw, 2.5rem);
  font-style: italic;
  font-weight: 300;
  white-space: nowrap;
  color: var(--fg-2);
}
.marquee__group i {
  font-style: normal;
  font-size: 0.5em;
  color: var(--accent);
}
@keyframes marquee {
  to {
    transform: translateX(-50%);
  }
}
</style>
