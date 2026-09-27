<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useBag } from '@/composables/useBag'
import { useScroll } from '@/composables/useScroll'
import { activeSocials } from '@/data/site'
import { catalogue } from '@/data/catalogue'
import { useI18n } from '@/i18n'
import { useAmbient } from '@/composables/useAmbient'

const { t, locale, locales, setLocale } = useI18n()
const { playing, toggle: toggleSound } = useAmbient()

const links = computed(() => [
  { label: t('nav.collection'), href: '#collection' },
  { label: t('nav.notes'), href: '#notes' },
  { label: t('nav.atelier'), href: '#atelier' },
])
const menuLinks = computed(() => [
  ...links.value,
  { label: t('nav.maison'), href: '#story' },
  { label: t('nav.letter'), href: '#letter' },
])

const { count, openBag } = useBag()
const hasShop = catalogue.length > 0
const { stop, start } = useScroll()

const scrolled = ref(false)
const hidden = ref(false)
const menuOpen = ref(false)
let lastY = 0

function onScroll() {
  const y = window.scrollY
  scrolled.value = y > 40
  if (menuOpen.value) hidden.value = false
  else if (y > lastY + 8 && y > 260) hidden.value = true
  else if (y < lastY - 8) hidden.value = false
  lastY = y
}

function onKey(e) {
  if (e.key === 'Escape') close()
}

function toggle() {
  menuOpen.value = !menuOpen.value
}
function close() {
  menuOpen.value = false
}

watch(menuOpen, (open) => {
  document.body.classList.toggle('menu-open', open)
  if (open) {
    hidden.value = false
    stop()
  } else {
    start()
  }
})

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
  onScroll()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <header
    class="nav"
    :class="{ 'is-scrolled': scrolled && !menuOpen, 'is-hidden': hidden, 'is-menu': menuOpen }"
  >
    <div class="container nav__inner">
      <nav class="nav__links" :aria-label="t('nav.primary')">
        <a v-for="l in links" :key="l.href" :href="l.href" class="nav__link">{{ l.label }}</a>
      </nav>

      <a href="#top" class="nav__brand" :aria-label="t('nav.backToTop')">Kimem</a>

      <div class="nav__actions">
        <div class="nav__prefs nav__link--secondary">
          <div class="lang" role="group" :aria-label="t('common.language')">
            <button
              v-for="l in locales"
              :key="l.code"
              type="button"
              class="lang__btn"
              :class="{ 'is-on': locale === l.code }"
              :aria-pressed="locale === l.code"
              :lang="l.code"
              :title="l.name"
              @click="setLocale(l.code)"
            >
              {{ l.label }}
            </button>
          </div>
          <button
            type="button"
            class="sound"
            :class="{ 'is-on': playing }"
            :aria-pressed="playing"
            :aria-label="playing ? t('nav.soundOff') : t('nav.soundOn')"
            :title="playing ? t('nav.soundOff') : t('nav.soundOn')"
            @click="toggleSound"
          >
            <i></i><i></i><i></i><i></i>
          </button>
        </div>
        <button
          v-if="hasShop"
          type="button"
          class="nav__link nav__bag"
          :aria-label="t(count === 1 ? 'nav.bagLabel_one' : 'nav.bagLabel_other', { n: count })"
          @click="openBag"
        >
          {{ t('nav.bag') }}
          <Transition name="bump" mode="out-in">
            <sup :key="count">{{ count }}</sup>
          </Transition>
        </button>
        <button
          class="nav__toggle"
          type="button"
          :aria-expanded="menuOpen"
          aria-controls="menu"
          :aria-label="menuOpen ? t('nav.closeMenu') : t('nav.openMenu')"
          @click="toggle"
        >
          <span></span><span></span>
        </button>
      </div>
    </div>
  </header>

  <Transition name="menu">
    <div v-if="menuOpen" id="menu" class="menu">
      <nav class="menu__links" :aria-label="t('nav.menu')">
        <a
          v-for="(l, i) in menuLinks"
          :key="l.href"
          :href="l.href"
          :style="{ '--i': i }"
          @click="close"
        >
          {{ l.label }}
        </a>
      </nav>
      <div class="menu__foot">
        <span class="menu__prefs">
          <button
            v-for="l in locales"
            :key="l.code"
            type="button"
            :class="{ 'is-on': locale === l.code }"
            :aria-pressed="locale === l.code"
            :lang="l.code"
            @click="setLocale(l.code)"
          >
            {{ l.name }}
          </button>
          <button type="button" :aria-pressed="playing" @click="toggleSound">
            {{ t('nav.sound') }} {{ playing ? '●' : '○' }}
          </button>
        </span>
        <span v-if="activeSocials.length" class="menu__socials">
          <a v-for="s in activeSocials" :key="s.label" :href="s.url" target="_blank" rel="noopener">{{
            s.label
          }}</a>
        </span>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 100;
  height: var(--nav-h);
  display: flex;
  align-items: center;
  transition:
    height 0.5s var(--ease-out),
    transform 0.6s var(--ease-out),
    background-color 0.6s,
    color var(--t-theme);
}
.nav::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: var(--line);
  opacity: 0;
  transition: opacity 0.5s;
}
.nav.is-scrolled {
  height: 4.25rem;
  background: var(--glass);
  -webkit-backdrop-filter: blur(18px) saturate(1.3);
  backdrop-filter: blur(18px) saturate(1.3);
}
.nav.is-scrolled::after {
  opacity: 1;
}
.nav.is-hidden {
  transform: translateY(-100%);
}
.nav.is-menu {
  color: var(--ivory);
}
.nav__inner {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}
.nav__links {
  display: flex;
  gap: 2.25rem;
}
.nav__link {
  position: relative;
  padding: 0.25rem 0;
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  white-space: nowrap;
}
.nav__link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.5s var(--ease-out);
}
.nav__link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
.nav__brand {
  font-family: var(--font-display);
  font-size: 1.55rem;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.36em;
  text-transform: uppercase;
  padding-left: 0.36em;
}
.nav__actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2.25rem;
}
.nav__prefs {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.lang {
  display: flex;
  gap: 0.2rem;
}
.lang__btn {
  padding: 0.25rem 0.35rem;
  font-size: 0.64rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  opacity: 0.45;
  transition: opacity 0.3s;
}
.lang__btn:hover,
.lang__btn.is-on {
  opacity: 1;
}
.lang__btn:lang(am) {
  letter-spacing: 0;
}
/* sound: four bars, still when off, breathing when on */
.sound {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 14px;
  padding: 0 0.2rem;
  box-sizing: content-box;
}
.sound i {
  width: 2px;
  height: 3px;
  background: currentColor;
  opacity: 0.6;
  transition: height 0.4s var(--ease-out);
}
.sound.is-on i {
  opacity: 1;
  animation: bars 1.4s var(--ease-in-out) infinite alternate;
}
.sound.is-on i:nth-child(2) {
  animation-delay: -0.5s;
}
.sound.is-on i:nth-child(3) {
  animation-delay: -0.9s;
}
.sound.is-on i:nth-child(4) {
  animation-delay: -0.2s;
}
@keyframes bars {
  from {
    height: 3px;
  }
  to {
    height: 14px;
  }
}
.nav__bag sup {
  display: inline-block;
  font-family: var(--font-display);
  font-size: 0.85em;
  margin-left: 0.35em;
  vertical-align: top;
  line-height: 1;
}
.bump-enter-active,
.bump-leave-active {
  transition:
    transform 0.25s var(--ease-out),
    opacity 0.25s;
}
.bump-enter-from {
  transform: translateY(6px);
  opacity: 0;
}
.bump-leave-to {
  transform: translateY(-6px);
  opacity: 0;
}
.nav__toggle {
  display: none;
  position: relative;
  z-index: 2;
  width: 44px;
  height: 44px;
  margin-right: -10px;
}
.nav__toggle span {
  position: absolute;
  left: 12px;
  right: 12px;
  height: 1px;
  background: currentColor;
  transition:
    transform 0.5s var(--ease-out),
    top 0.5s var(--ease-out);
}
.nav__toggle span:nth-child(1) {
  top: 18px;
}
.nav__toggle span:nth-child(2) {
  top: 25px;
}
.is-menu .nav__toggle span {
  top: 22px;
}
.is-menu .nav__toggle span:nth-child(1) {
  transform: rotate(45deg);
}
.is-menu .nav__toggle span:nth-child(2) {
  transform: rotate(-45deg);
}

/* full-screen menu */
.menu {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--nav-h) var(--gutter) 2rem;
  background: var(--espresso);
  color: var(--ivory);
}
.menu__links a {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(2.6rem, 10vw, 5.5rem);
  font-weight: 300;
  line-height: 1.15;
  transition:
    opacity 0.8s var(--ease-out),
    transform 0.8s var(--ease-out);
  transition-delay: calc(0.15s + var(--i) * 0.07s);
}
.menu__foot {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  font-size: 0.64rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(244, 239, 230, 0.5);
}
.menu__prefs {
  display: flex;
  gap: 1.25rem;
}
.menu__prefs button {
  font-size: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
  color: inherit;
}
.menu__prefs .is-on {
  color: var(--ivory);
}
.menu__socials {
  display: flex;
  gap: 1.25rem;
}
.menu-enter-active {
  transition: clip-path 0.9s var(--ease-in-out);
}
.menu-leave-active {
  transition: clip-path 0.7s var(--ease-in-out);
}
.menu-enter-from,
.menu-leave-to {
  clip-path: inset(0 0 100% 0);
}
.menu-enter-from .menu__links a {
  opacity: 0;
  transform: translateY(28px);
}

@media (max-width: 820px) {
  .nav__inner {
    grid-template-columns: auto 1fr auto;
  }
  .nav__links,
  .nav__link--secondary {
    display: none;
  }
  .nav__brand {
    grid-column: 1;
    padding-left: 0;
    letter-spacing: 0.3em;
    font-size: 1.35rem;
  }
  .nav__actions {
    grid-column: 3;
    gap: 1.25rem;
  }
  .nav__toggle {
    display: block;
  }
}
</style>
