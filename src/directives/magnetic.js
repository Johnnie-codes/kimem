import { gsap, hasFinePointer, prefersReducedMotion } from '@/lib/gsap'

/** v-magnetic — the element leans gently toward the pointer. */
export default {
  mounted(el, binding) {
    if (!hasFinePointer || prefersReducedMotion) return
    const strength = binding.value ?? 0.28
    const toX = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' })
    const toY = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' })

    const move = (e) => {
      const r = el.getBoundingClientRect()
      toX((e.clientX - r.left - r.width / 2) * strength)
      toY((e.clientY - r.top - r.height / 2) * strength)
    }
    const leave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.45)' })
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    el.__magnetic = () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  },
  unmounted(el) {
    el.__magnetic?.()
  },
}
