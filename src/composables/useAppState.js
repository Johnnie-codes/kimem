import { ref } from 'vue'
import { prefersReducedMotion } from '@/lib/gsap'

/** `ready` flips to true once the preloader lifts; the hero intro waits for it. */
const ready = ref(false)

export function useAppState() {
  return { ready, reduced: prefersReducedMotion }
}
