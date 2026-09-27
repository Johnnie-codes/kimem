import { ref } from 'vue'

/* The product shown in the quick view dialog, shared by every card and the scent finder. */
const product = ref(null)

export function useQuickView() {
  return {
    product,
    show: (p) => (product.value = p),
    hide: () => (product.value = null),
  }
}
