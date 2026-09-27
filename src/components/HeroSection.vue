<script setup>
import { onBeforeUnmount, onMounted, useTemplateRef, watch } from 'vue'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import { useAppState } from '@/composables/useAppState'
import { useScroll } from '@/composables/useScroll'
import { images } from '@/data/images'
import { useI18n } from '@/i18n'
import IconArrow from './IconArrow.vue'
import HeroSmoke from './HeroSmoke.vue'

const { t } = useI18n()
const { ready } = useAppState()
const { scrollTo } = useScroll()
const root = useTemplateRef('root')

/* Mood images, not fragrances: captions describe a feeling, never a note or product.
   label = i18n key, speed = scroll parallax, depth = pointer parallax */
const items = [
  { key: 'citrus', image: images.citrus, num: '01', label: 'moods.warmth.label', to: '#notes', speed: 0.35, depth: 0.9 },
  { key: 'papaya', image: images.papaya, num: '02', label: 'moods.ripeness.label', to: '#notes', speed: 0.15, depth: 0.5 },
  { key: 'bottles', image: images.bottles, num: 'Nº 01', label: 'hero.theCollection', to: '#collection', speed: 0.55, depth: 1.3 },
  { key: 'leaves', image: images.leaves, num: '03', label: 'moods.morning.label', to: '#atelier', speed: 0.2, depth: 0.6 },
  { key: 'smoke', image: images.smoke, num: '04', label: 'moods.stillness.label', to: '#notes', speed: 0.4, depth: 1 },
]

let ctx
let mm
let intro
let pendingPlay = false

onMounted(() => {
  ctx = gsap.context(() => {
    /* --- entrance, played once the preloader lifts --- */
    intro = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } })
    intro
      .fromTo('.line__in', { yPercent: 110 }, { yPercent: 0, duration: 1.5, stagger: 0.16 }, 0)
      .fromTo(
        '.hero__item',
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, stagger: { each: 0.09, from: 'center' } },
        0.3,
      )
      .fromTo(
        '.hero__item img',
        { scale: 1.35 },
        { scale: 1, duration: 1.9, stagger: { each: 0.09, from: 'center' } },
        0.3,
      )
      .fromTo(
        '[data-hero]',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.1, ease: 'power3.out' },
        0.7,
      )

    if (prefersReducedMotion) intro.progress(1)
    else if (pendingPlay) intro.play()

    /* --- parallax layers, desktop + motion allowed only --- */
    mm = gsap.matchMedia()
    mm.add('(min-width: 821px) and (prefers-reduced-motion: no-preference)', () => {
      const bounds = { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true }

      gsap.utils.toArray('.hero__item').forEach((el) => {
        gsap.to(el, {
          y: () => -(parseFloat(el.dataset.speed) || 0) * 240,
          ease: 'none',
          scrollTrigger: bounds,
        })
      })
      gsap.to('.hero__title-a', { y: 70, ease: 'none', scrollTrigger: bounds })
      gsap.to('.hero__title-b', { y: -40, ease: 'none', scrollTrigger: bounds })

      /* liquid ripple: one shared SVG filter, lent to whichever photo is hovered */
      const turbulence = root.value.querySelector('#hero-ripple feTurbulence')
      const displace = root.value.querySelector('#hero-ripple feDisplacementMap')
      let rippleTl
      let rippled
      const clearRipple = () => {
        if (rippled) rippled.style.filter = ''
        rippled = null
      }
      const onItemEnter = (e) => {
        const media = e.currentTarget.querySelector('.hero__item-media')
        rippleTl?.kill()
        clearRipple()
        rippled = media
        media.style.filter = 'url(#hero-ripple)'
        const state = { scale: 0, freq: 0.012 }
        rippleTl = gsap
          .timeline({ onComplete: clearRipple })
          .to(state, { scale: 22, freq: 0.02, duration: 0.45, ease: 'power2.out' })
          .to(state, { scale: 0, freq: 0.012, duration: 1.3, ease: 'power3.out' })
          .eventCallback('onUpdate', () => {
            displace.setAttribute('scale', state.scale.toFixed(2))
            turbulence.setAttribute('baseFrequency', `${state.freq.toFixed(4)} ${(state.freq * 2.4).toFixed(4)}`)
          })
      }
      const itemEls = gsap.utils.toArray('.hero__item')
      itemEls.forEach((el) => el.addEventListener('pointerenter', onItemEnter))

      const inners = gsap.utils.toArray('.hero__item-inner')
      const target = { x: 0, y: 0 }
      const eased = { x: 0, y: 0 }
      const onMove = (e) => {
        const r = root.value.getBoundingClientRect()
        target.x = (e.clientX - r.left) / r.width - 0.5
        target.y = (e.clientY - r.top) / r.height - 0.5
      }
      const onLeave = () => {
        target.x = 0
        target.y = 0
      }
      const tick = () => {
        eased.x += (target.x - eased.x) * 0.05
        eased.y += (target.y - eased.y) * 0.05
        inners.forEach((el) => {
          const d = parseFloat(el.dataset.depth) || 0
          el.style.translate = `${(-eased.x * d * 28).toFixed(2)}px ${(-eased.y * d * 20).toFixed(2)}px`
        })
      }
      root.value.addEventListener('pointermove', onMove, { passive: true })
      root.value.addEventListener('pointerleave', onLeave)
      gsap.ticker.add(tick)

      return () => {
        root.value?.removeEventListener('pointermove', onMove)
        root.value?.removeEventListener('pointerleave', onLeave)
        itemEls.forEach((el) => el.removeEventListener('pointerenter', onItemEnter))
        rippleTl?.kill()
        clearRipple()
        gsap.ticker.remove(tick)
        inners.forEach((el) => (el.style.translate = ''))
      }
    })
  }, root.value)
})

watch(
  ready,
  (isReady) => {
    if (!isReady || prefersReducedMotion) return
    if (intro) intro.play()
    else pendingPlay = true
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  mm?.revert()
  ctx?.revert()
})
</script>

<template>
  <section id="top" ref="root" class="hero" v-theme="'light'">
    <HeroSmoke />
    <svg class="hero__filters" aria-hidden="true" focusable="false">
      <filter id="hero-ripple" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.012 0.029" numOctaves="2" seed="7" />
        <feDisplacementMap in="SourceGraphic" scale="0" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
    <div class="container hero__inner">
      <p class="eyebrow hero__eyebrow" data-hero>
        {{ t('hero.eyebrow') }}<span class="hero__sep" aria-hidden="true">·</span>{{ t('hero.collectionNo') }}
      </p>

      <p class="hero__lede" data-hero>
        {{ t('hero.lede') }}
      </p>

      <h1 class="hero__title">
        <span class="hero__title-a">
          <span class="line"><span class="line__in">{{ t('hero.titleA') }}</span></span>
        </span>
        <span class="hero__title-b">
          <span class="line"><span class="line__in"><em>{{ t('hero.titleB') }}</em></span></span>
        </span>
      </h1>

      <div class="hero__gallery" role="list" :aria-label="t('hero.gallery')">
        <figure
          v-for="item in items"
          :key="item.key"
          class="hero__item"
          :class="`hero__item--${item.key}`"
          :data-speed="item.speed"
          :data-cursor="t('hero.cursor')"
          role="listitem"
        >
          <button
            type="button"
            class="hero__item-btn"
            :aria-label="t('hero.goTo', { label: t(item.label) })"
            @click="scrollTo(item.to)"
          >
            <span class="hero__item-inner" :data-depth="item.depth">
              <span class="hero__item-media">
                <img :src="item.image.src" :alt="item.image.alt" loading="eager" decoding="async" />
              </span>
            </span>
          </button>
          <figcaption class="hero__caption">
            <span>{{ item.num }}</span>{{ t(item.label) }}
          </figcaption>
        </figure>
      </div>

      <div class="hero__cta" data-hero>
        <div class="hero__actions">
          <a href="#collection" class="btn btn--solid" v-magnetic>{{ t('hero.explore') }}</a>
          <a href="#atelier" class="link-arrow">{{ t('hero.process') }} <IconArrow /></a>
        </div>
        <div class="hero__scroll" aria-hidden="true"><i></i><span>{{ t('hero.scroll') }}</span></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: calc(var(--nav-h) + 1rem);
  padding-bottom: clamp(2rem, 4vw, 4rem);
}
.hero__filters {
  position: absolute;
  width: 0;
  height: 0;
}
.hero__inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas:
    'eyebrow eyebrow'
    'title1 lede'
    'gallery gallery'
    'cta title2';
  column-gap: 3rem;
  align-items: end;
}
.hero__eyebrow {
  grid-area: eyebrow;
  margin-bottom: 0.5rem;
}
.hero__sep {
  margin: 0 0.6em;
  color: var(--accent);
}
.hero__lede {
  grid-area: lede;
  align-self: end;
  max-width: 34ch;
  padding-bottom: calc(var(--hero-fs) * 0.1);
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--fg-2);
}

/* the headline is split around the gallery: "Memory," above, "distilled." below */
.hero__title {
  display: contents;
  font-family: var(--font-display);
  font-weight: 300;
  font-size: var(--hero-fs);
  line-height: 0.9;
  letter-spacing: -0.02em;
}
.hero__title-a {
  grid-area: title1;
}
.hero__title-b {
  grid-area: title2;
  justify-self: end;
  align-self: end;
  text-align: right;
  padding-top: clamp(0.75rem, 1.5vw, 1.5rem);
}
.hero__title-b em {
  padding-right: 0.06em;
}
.line {
  display: block;
  overflow: hidden;
  line-height: 1.02;
}
.line__in {
  display: block;
  will-change: transform;
}

/* gallery */
.hero__gallery {
  grid-area: gallery;
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 0.82fr 1.28fr 0.82fr 1fr;
  gap: clamp(0.6rem, 1.4vw, 1.4rem);
  align-items: end;
  width: min(100%, 116vh);
  margin-inline: auto;
  margin-top: calc(var(--hero-fs) * -0.14);
}
.hero__item {
  position: relative;
  overflow: hidden;
  border-radius: 3px;
  aspect-ratio: 3 / 4;
  background: var(--surface);
  will-change: clip-path, transform;
}
.hero__item--papaya,
.hero__item--leaves {
  aspect-ratio: 4 / 5;
}
.hero__item--citrus,
.hero__item--smoke {
  margin-bottom: clamp(0.75rem, 2vw, 2rem);
}
.hero__item--bottles {
  margin-bottom: clamp(1.5rem, 3.5vw, 3.5rem);
}
.hero__item-btn {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
}
.hero__item-inner {
  position: absolute;
  inset: -5%;
  display: block;
}
.hero__item-media {
  display: block;
  width: 100%;
  height: 100%;
  transition: transform 1.4s var(--ease-out);
}
.hero__item:hover .hero__item-media {
  transform: scale(1.045);
}
.hero__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hero__caption {
  position: absolute;
  left: 1.1rem;
  bottom: 1rem;
  z-index: 2;
  display: flex;
  align-items: baseline;
  gap: 0.7rem;
  pointer-events: none;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ivory);
  text-shadow: 0 1px 14px rgba(0, 0, 0, 0.45);
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity 0.6s var(--ease-out),
    transform 0.6s var(--ease-out);
}
.hero__caption span {
  font-family: var(--font-display);
  font-size: 1rem;
  letter-spacing: 0.05em;
  color: var(--gold);
}
.hero__item:hover .hero__caption,
.hero__item:focus-within .hero__caption {
  opacity: 1;
  transform: none;
}

/* call to action + scroll hint */
.hero__cta {
  grid-area: cta;
  align-self: end;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  padding-top: clamp(1rem, 2vw, 2rem);
}
.hero__actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
}
.hero__scroll {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  font-size: 0.6rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--fg-3);
}
.hero__scroll i {
  position: relative;
  display: block;
  width: 1px;
  height: 3rem;
  background: var(--line-strong);
  overflow: hidden;
}
.hero__scroll i::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--fg);
  animation: scrollLine 2.4s var(--ease-in-out) infinite;
}
@keyframes scrollLine {
  0% {
    transform: translateY(-100%);
  }
  55% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
}

@media (max-width: 820px) {
  .hero {
    justify-content: flex-start;
    padding-top: calc(var(--nav-h) + 0.5rem);
  }
  .hero__inner {
    grid-template-columns: 1fr;
    grid-template-areas:
      'eyebrow'
      'title1'
      'title2'
      'gallery'
      'lede'
      'cta';
  }
  .hero__title-b {
    justify-self: start;
    text-align: left;
    padding-top: 0;
  }
  .hero__gallery {
    display: flex;
    gap: 0.75rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    width: auto;
    margin-top: 1.75rem;
    margin-inline: calc(var(--gutter) * -1);
    padding-inline: var(--gutter);
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }
  .hero__gallery::-webkit-scrollbar {
    display: none;
  }
  .hero__item,
  .hero__item--papaya,
  .hero__item--leaves,
  .hero__item--bottles {
    flex: 0 0 66vw;
    aspect-ratio: 3 / 4;
    margin-bottom: 0;
    scroll-snap-align: start;
  }
  .hero__caption {
    opacity: 1;
    transform: none;
  }
  .hero__lede {
    max-width: none;
    padding-top: 1.5rem;
  }
  .hero__cta {
    padding-top: 1.5rem;
  }
}
</style>
