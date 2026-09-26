import { gsap, prefersReducedMotion } from '@/lib/gsap'

/**
 * v-reveal            — fades/slides the element in when it scrolls into view
 * v-reveal.group      — staggers the element's children instead
 * v-reveal="{ y, delay, stagger, start }" — optional overrides
 */
export default {
  mounted(el, binding) {
    if (prefersReducedMotion) return
    const opts = binding.value || {}
    const group = binding.modifiers.group
    const targets = group ? Array.from(el.children) : el
    if (group && !targets.length) return

    el.__reveal = gsap.fromTo(
      targets,
      { y: opts.y ?? 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: opts.duration ?? 1.3,
        delay: opts.delay ?? 0,
        stagger: opts.stagger ?? (group ? 0.1 : 0),
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: el,
          start: opts.start ?? 'top 88%',
          once: true,
        },
      },
    )
  },
  unmounted(el) {
    el.__reveal?.scrollTrigger?.kill()
    el.__reveal?.kill()
  },
}
