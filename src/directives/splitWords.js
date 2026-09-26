import { gsap, prefersReducedMotion } from '@/lib/gsap'

function wrapWords(node) {
  const frag = document.createDocumentFragment()
  Array.from(node.childNodes).forEach((child) => {
    if (child.nodeType === Node.TEXT_NODE) {
      child.textContent.split(/(\s+)/).forEach((part) => {
        if (!part) return
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(' '))
          return
        }
        const span = document.createElement('span')
        span.className = 'w'
        span.textContent = part
        frag.appendChild(span)
      })
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      wrapWords(child)
      frag.appendChild(child)
    }
  })
  node.replaceChildren(frag)
}

/**
 * v-split-words — wraps every word in a span and brightens them one by one,
 * tied to scroll position, so the sentence "arrives" as you read it.
 */
export default {
  mounted(el) {
    wrapWords(el)
    if (prefersReducedMotion) return
    const words = el.querySelectorAll('.w')
    el.__split = gsap.fromTo(
      words,
      { opacity: 0.16 },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.04,
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'bottom 45%',
          scrub: 0.6,
        },
      },
    )
  },
  unmounted(el) {
    el.__split?.scrollTrigger?.kill()
    el.__split?.kill()
  },
}
