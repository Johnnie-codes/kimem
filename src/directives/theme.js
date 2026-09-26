import { ScrollTrigger } from '@/lib/gsap'
import { useTheme } from '@/composables/useTheme'

/**
 * v-theme="'dark'" | v-theme="'light'"
 * Switches the page palette when this section occupies the viewport.
 */
export default {
  mounted(el, binding) {
    const { setDark } = useTheme()
    const dark = binding.value === 'dark'
    el.__theme = ScrollTrigger.create({
      trigger: el,
      start: 'top 62%',
      end: 'bottom 62%',
      onEnter: () => setDark(dark),
      onEnterBack: () => setDark(dark),
    })
  },
  unmounted(el) {
    el.__theme?.kill()
  },
}
