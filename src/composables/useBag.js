import { computed, ref } from 'vue'

const items = ref([])
const toast = ref(null)
let timer

export function useBag() {
  const count = computed(() => items.value.length)

  function add(product) {
    items.value.push(product)
    toast.value = { id: Date.now(), name: product.name }
    clearTimeout(timer)
    timer = setTimeout(() => {
      toast.value = null
    }, 2600)
  }

  return { items, count, toast, add }
}
