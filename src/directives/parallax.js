import { gsap, prefersReducedMotion } from '@/lib/gsap'

/**
 * v-parallax="10" — moves an (oversized) image inside its clipped parent
 * by ±10% of its height as the parent travels through the viewport.
 */
export default {
  mounted(el, binding) {
    if (prefersReducedMotion) return
    const amount = Number(binding.value ?? 10)
    el.__parallax = gsap.fromTo(
      el,
      { yPercent: -amount },
      {
        yPercent: amount,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    )
  },
  unmounted(el) {
    el.__parallax?.scrollTrigger?.kill()
    el.__parallax?.kill()
  },
}
