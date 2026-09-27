<script setup>
import { onMounted, ref } from 'vue'
import { ScrollTrigger } from '@/lib/gsap'
import { useScroll } from '@/composables/useScroll'
import { useAppState } from '@/composables/useAppState'
import { useBag } from '@/composables/useBag'

import Preloader from '@/components/Preloader.vue'
import CustomCursor from '@/components/CustomCursor.vue'
import SiteNav from '@/components/SiteNav.vue'
import HeroSection from '@/components/HeroSection.vue'
import ManifestoSection from '@/components/ManifestoSection.vue'
import NotesSection from '@/components/NotesSection.vue'
import AtelierSection from '@/components/AtelierSection.vue'
import CollectionSection from '@/components/CollectionSection.vue'
import NewsletterSection from '@/components/NewsletterSection.vue'
import SiteFooter from '@/components/SiteFooter.vue'

const { init, stop, start } = useScroll()
const { ready } = useAppState()
const { toast } = useBag()
const loading = ref(true)

onMounted(() => {
  init()
  stop() // no scrolling while the curtain is down
})

function onReveal() {
  ready.value = true
  start()
  requestAnimationFrame(() => ScrollTrigger.refresh())
}

function onDone() {
  loading.value = false
}
</script>

<template>
  <Preloader v-if="loading" @reveal="onReveal" @done="onDone" />
  <CustomCursor />
  <SiteNav />

  <main id="main">
    <HeroSection />
    <ManifestoSection />
    <NotesSection />
    <AtelierSection />
    <CollectionSection />
    <NewsletterSection />
  </main>

  <SiteFooter />

  <Transition name="toast">
    <div v-if="toast" :key="toast.id" class="toast" role="status" aria-live="polite">
      <span class="toast__dot"></span>
      Added to bag
      <em>{{ toast.name }}</em>
    </div>
  </Transition>
</template>

<style scoped>
.toast {
  position: fixed;
  left: 50%;
  bottom: 2rem;
  z-index: 500;
  translate: -50% 0;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.9rem 1.5rem;
  border-radius: 999px;
  background: var(--fg);
  color: var(--bg);
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  white-space: nowrap;
  box-shadow: 0 24px 60px -20px rgba(0, 0, 0, 0.5);
}
.toast em {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 400;
  letter-spacing: 0;
  text-transform: none;
}
.toast__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
}
.toast-enter-active,
.toast-leave-active {
  transition:
    opacity 0.5s var(--ease-out),
    translate 0.5s var(--ease-out);
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  translate: -50% 16px;
}
</style>
