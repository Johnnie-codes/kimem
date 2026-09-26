import { shallowRef } from 'vue'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'

/**
 * Singleton smooth-scroll layer (Lenis) wired into GSAP's ticker so that
 * ScrollTrigger and Lenis share one clock. Also owns in-page anchor scrolling.
 */
const lenis = shallowRef(null)
let initialized = false
let stoppedFallback = false

function scrollTo(target, options = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return
  if (lenis.value) {
    lenis.value.scrollTo(el, {
      offset: -24,
      duration: 1.6,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      force: true,
      ...options,
    })
  } else {
    el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' })
  }
}

function onAnchorClick(e) {
  const a = e.target.closest('a[href^="#"]')
  if (!a) return
  const hash = a.getAttribute('href')
  if (hash === '#') {
    e.preventDefault()
    return
  }
  const el = document.querySelector(hash)
  if (!el) return
  e.preventDefault()
  scrollTo(el)
}

function init() {
  if (initialized) return
  initialized = true
  document.addEventListener('click', onAnchorClick)
  if (prefersReducedMotion) return

  const instance = new Lenis({
    autoRaf: false,
    lerp: 0.09,
    smoothWheel: true,
  })
  instance.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => instance.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  lenis.value = instance
}

function stop() {
  if (lenis.value) lenis.value.stop()
  else {
    stoppedFallback = true
    document.documentElement.style.overflow = 'hidden'
  }
}

function start() {
  if (lenis.value) lenis.value.start()
  else if (stoppedFallback) {
    stoppedFallback = false
    document.documentElement.style.overflow = ''
  }
}

export function useScroll() {
  return { lenis, init, scrollTo, stop, start }
}
