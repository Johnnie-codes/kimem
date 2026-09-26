import { ref, watch } from 'vue'

/** Page-level light/dark theme, driven by whichever section is in view. */
const isDark = ref(false)

if (typeof document !== 'undefined') {
  watch(
    isDark,
    (dark) => document.documentElement.classList.toggle('is-dark', dark),
    { immediate: true },
  )
}

export function useTheme() {
  const setDark = (value) => {
    isDark.value = Boolean(value)
  }
  return { isDark, setDark }
}
