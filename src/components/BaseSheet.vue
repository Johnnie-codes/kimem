<script setup>
import { nextTick, onBeforeUnmount, useTemplateRef, watch } from 'vue'
import { useScroll } from '@/composables/useScroll'
import { useI18n } from '@/i18n'

/*
 * Modal panel on a native <dialog>: the browser handles focus trapping, Escape and making
 * the page behind inert. `side` slides it in from the right; `center` rises it in the middle.
 */
const props = defineProps({
  open: { type: Boolean, default: false },
  label: { type: String, required: true },
  side: { type: String, default: 'right' },
  wide: { type: Boolean, default: false },
})
const emit = defineEmits(['close'])

const dialog = useTemplateRef('dialog')
const { lock, unlock } = useScroll()
const { t } = useI18n()
let locked = false
let lastFocus = null

function show() {
  const el = dialog.value
  if (!el || el.open) return
  lastFocus = document.activeElement
  el.classList.remove('is-closing')
  el.showModal()
  if (!locked) {
    lock()
    locked = true
  }
}

function hide() {
  const el = dialog.value
  if (!el || !el.open) return
  let done = false
  const finish = () => {
    if (done) return
    done = true
    el.classList.remove('is-closing')
    el.close()
    if (locked) {
      unlock()
      locked = false
    }
    lastFocus?.focus?.({ preventScroll: true })
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return finish()
  el.classList.add('is-closing')
  el.addEventListener('animationend', finish, { once: true })
  setTimeout(finish, 600) // animations pause in background tabs; never leave it stuck open
}

watch(
  () => props.open,
  async (open) => {
    await nextTick()
    open ? show() : hide()
  },
  { immediate: true },
)

function onCancel(e) {
  e.preventDefault() // animate out instead of the instant native close
  emit('close')
}
function onBackdrop(e) {
  if (e.target === dialog.value) emit('close')
}

onBeforeUnmount(() => {
  if (locked) unlock()
})
</script>

<template>
  <dialog
    ref="dialog"
    class="sheet"
    :class="[`sheet--${side}`, { 'sheet--wide': wide }]"
    :aria-label="label"
    @cancel="onCancel"
    @click="onBackdrop"
  >
    <div class="sheet__panel" data-lenis-prevent>
      <button type="button" class="sheet__close" :aria-label="t('common.close')" @click="emit('close')">
        <span></span><span></span>
      </button>
      <slot />
    </div>
  </dialog>
</template>

<style scoped>
.sheet {
  --bg: var(--ivory);
  --fg: var(--ink);
  --accent: var(--amber);
  position: fixed;
  inset: 0;
  width: 100%;
  max-width: none;
  height: 100%;
  max-height: none;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--fg);
  overflow: hidden;
}
.sheet::backdrop {
  background: rgba(25, 20, 17, 0.55);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  animation: fade 0.5s var(--ease-out) both;
}
.sheet.is-closing::backdrop {
  animation: fade 0.45s var(--ease-in-out) reverse both;
}
.sheet__panel {
  position: absolute;
  overflow-y: auto;
  overscroll-behavior: contain;
  background: var(--bg);
  color: var(--fg);
}
.sheet--right .sheet__panel {
  top: 0;
  right: 0;
  bottom: 0;
  width: min(100%, 30rem);
  padding: 4.5rem clamp(1.5rem, 4vw, 2.75rem) 2.5rem;
  animation: slide 0.7s var(--ease-out) both;
}
.sheet--right.sheet--wide .sheet__panel {
  width: min(100%, 40rem);
}
.sheet--right.is-closing .sheet__panel {
  animation: slide 0.45s var(--ease-in-out) reverse both;
}
.sheet--center .sheet__panel {
  inset: auto 0 0 0;
  margin-inline: auto;
  width: min(100%, 68rem);
  max-height: min(92svh, 52rem);
  border-radius: 6px 6px 0 0;
  animation: rise 0.8s var(--ease-out) both;
}
@media (min-width: 821px) {
  .sheet--center .sheet__panel {
    inset: 50% 0 auto 0;
    translate: 0 -50%;
    border-radius: 6px;
  }
}
.sheet--center.is-closing .sheet__panel {
  animation: rise 0.45s var(--ease-in-out) reverse both;
}
.sheet__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 3;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: color-mix(in oklab, var(--bg) 80%, transparent);
}
.sheet__close span {
  position: absolute;
  left: 13px;
  right: 13px;
  top: 21.5px;
  height: 1px;
  background: currentColor;
  transform: rotate(45deg);
}
.sheet__close span + span {
  transform: rotate(-45deg);
}
.sheet__close:focus-visible {
  outline: 1px solid var(--fg);
}
@keyframes fade {
  from {
    opacity: 0;
  }
}
@keyframes slide {
  from {
    transform: translateX(100%);
  }
}
@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
}
</style>
