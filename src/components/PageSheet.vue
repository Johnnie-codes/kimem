<script setup>
import { computed, ref, watch } from 'vue'
import { usePageSheet } from '@/composables/usePageSheet'
import { site } from '@/data/site'
import BaseSheet from './BaseSheet.vue'

const { current, close } = usePageSheet()

/* keep the last page rendered while the panel animates out */
const shown = ref(null)
watch(current, (p) => p && (shown.value = p))
const open = computed(() => Boolean(current.value))

const mail = computed(() => `mailto:${site.email}`)
</script>

<template>
  <BaseSheet :open="open" :label="shown?.title ?? 'Information'" @close="close">
    <article v-if="shown" class="page">
      <p class="eyebrow">Kimem</p>
      <h2 class="sheet-title">{{ shown.title }}</h2>

      <div v-if="shown.body" class="page__body">
        <p v-for="(para, i) in shown.body" :key="i">{{ para }}</p>
      </div>

      <div v-if="shown.faq" class="page__faq">
        <details v-for="item in shown.faq" :key="item.q">
          <summary>
            <span class="page__q">{{ item.q }}</span>
          </summary>
          <p class="page__a">{{ item.a }}</p>
        </details>
      </div>

      <a v-if="shown.contact" :href="mail" class="btn btn--solid page__cta">Write to us</a>
    </article>
  </BaseSheet>
</template>

<style scoped>
.page .eyebrow {
  margin-bottom: 1rem;
}
.page__body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
  color: var(--fg-2);
}
.page__faq {
  margin-top: 2rem;
  border-top: 1px solid var(--line);
}
.page__faq details {
  border-bottom: 1px solid var(--line);
}
.page__faq summary {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.1rem 0;
  list-style: none;
  cursor: pointer;
}
.page__faq summary::-webkit-details-marker {
  display: none;
}
.page__faq summary::after {
  content: '+';
  font-family: var(--font-display);
  font-size: 1.4rem;
  line-height: 1;
  transition: transform 0.4s var(--ease-out);
}
.page__faq details[open] summary::after {
  transform: rotate(45deg);
}
.page__q {
  font-family: var(--font-display);
  font-size: 1.3rem;
  line-height: 1.2;
}
.page__a {
  padding-bottom: 1.2rem;
  color: var(--fg-2);
}
.page__cta {
  margin-top: 2rem;
}
</style>
