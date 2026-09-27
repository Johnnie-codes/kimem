import { ref, watch } from 'vue'
import en from './en'
import am from './am'

/*
 * Tiny i18n: t('hero.lede'), t('bag.count', { n: 2 }), tn('bag.bottles', 2).
 * Missing Amharic keys fall back to English, so a half-finished translation never shows a
 * raw key. The Amharic is a first draft and needs a native speaker's review before launch.
 */
const messages = { en, am }
export const locales = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'am', label: 'አማ', name: 'አማርኛ' },
]

const STORAGE_KEY = 'kimem.locale'
function initial() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && messages[saved]) return saved
  } catch {
    /* storage blocked */
  }
  return typeof navigator !== 'undefined' && navigator.language?.startsWith('am') ? 'am' : 'en'
}

export const locale = ref(initial())

if (typeof document !== 'undefined') {
  watch(
    locale,
    (code) => {
      document.documentElement.lang = code
      document.title = t('meta.title')
      try {
        localStorage.setItem(STORAGE_KEY, code)
      } catch {
        /* storage blocked */
      }
    },
    { immediate: true },
  )
}

function lookup(code, key) {
  return key.split('.').reduce((node, part) => (node == null ? undefined : node[part]), messages[code])
}

export function t(key, vars) {
  let value = lookup(locale.value, key)
  if (value === undefined) value = lookup('en', key)
  if (value === undefined) return key
  if (typeof value === 'string' && vars) {
    value = value.replace(/\{(\w+)\}/g, (_, name) => (name in vars ? vars[name] : `{${name}}`))
  }
  return value
}

/* plural: looks up `${key}_one` or `${key}_other` */
export const tn = (key, n, vars = {}) => t(`${key}_${n === 1 ? 'one' : 'other'}`, { n, ...vars })

export function useI18n() {
  return { t, tn, locale, locales, setLocale: (code) => (locale.value = code) }
}
