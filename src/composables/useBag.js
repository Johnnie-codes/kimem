import { computed, ref, watch } from 'vue'
import { productById } from '@/data/catalogue'

const STORAGE_KEY = 'kimem.bag.v1'

/* A line is one product with one engraving; the same perfume engraved twice is two lines. */
const lines = ref(load())
const open = ref(false)
const toast = ref(null)
let timer

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    // drop anything that is no longer sold
    return saved.filter((l) => productById[l.id] && l.qty > 0)
  } catch {
    return []
  }
}

watch(
  lines,
  (value) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    } catch {
      /* private mode or storage blocked: the bag just won't survive a reload */
    }
  },
  { deep: true },
)

const lineKey = (id, engraving) => `${id}|${engraving || ''}`

export function useBag() {
  const items = computed(() =>
    lines.value.map((l) => ({ ...l, key: lineKey(l.id, l.engraving), product: productById[l.id] })),
  )
  const count = computed(() => lines.value.reduce((n, l) => n + l.qty, 0))
  const subtotal = computed(() =>
    items.value.reduce((sum, l) => sum + l.product.price * l.qty, 0),
  )

  function add(product, { engraving = '', qty = 1 } = {}) {
    const clean = engraving.trim().toUpperCase()
    const existing = lines.value.find((l) => l.id === product.id && (l.engraving || '') === clean)
    if (existing) existing.qty += qty
    else lines.value.push({ id: product.id, qty, engraving: clean })

    toast.value = { id: Date.now(), name: product.name }
    clearTimeout(timer)
    timer = setTimeout(() => (toast.value = null), 2600)
  }

  function setQty(key, qty) {
    const i = lines.value.findIndex((l) => lineKey(l.id, l.engraving) === key)
    if (i === -1) return
    if (qty <= 0) lines.value.splice(i, 1)
    else lines.value[i].qty = Math.min(qty, 20)
  }

  const remove = (key) => setQty(key, 0)
  const clear = () => (lines.value = [])

  return {
    items,
    count,
    subtotal,
    toast,
    open,
    add,
    setQty,
    remove,
    clear,
    openBag: () => (open.value = true),
    closeBag: () => (open.value = false),
  }
}
