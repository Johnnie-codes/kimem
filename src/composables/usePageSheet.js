import { onBeforeUnmount, onMounted, ref } from 'vue'
import { pageById } from '@/data/pages'

const PREFIX = '#page-'

/* Which info page is open, kept in the URL hash so pages can be linked and shared. */
export function usePageSheet() {
  const current = ref(null)

  const sync = () => {
    const { hash } = window.location
    current.value = hash.startsWith(PREFIX) ? (pageById[hash.slice(PREFIX.length)] ?? null) : null
  }

  function close() {
    current.value = null
    if (window.location.hash.startsWith(PREFIX)) {
      history.replaceState(null, '', window.location.pathname + window.location.search)
    }
  }

  onMounted(() => {
    sync()
    window.addEventListener('hashchange', sync)
  })
  onBeforeUnmount(() => window.removeEventListener('hashchange', sync))

  return { current, close }
}

export const pageHref = (id) => `${PREFIX}${id}`
