<script setup>
import { useBag } from '@/composables/useBag'
import { formatPrice } from '@/data/site'
import { useQuickView } from '@/composables/useQuickView'

defineProps({
  product: { type: Object, required: true },
})

const { add } = useBag()
const { show } = useQuickView()
</script>

<template>
  <article class="product" :class="{ 'product--feature': product.feature }">
    <div class="product__media">
      <button
        type="button"
        class="product__open"
        data-cursor="View"
        :aria-label="`View ${product.name}`"
        @click="show(product)"
      >
        <img :src="product.image.src" :alt="product.image.alt" loading="lazy" decoding="async" />
      </button>
      <span v-if="product.tag" class="product__tag">{{ product.tag }}</span>
      <button type="button" class="product__add" @click="add(product)">
        Add to bag <span class="product__add-price"><i>·</i> {{ formatPrice(product.price) }}</span>
      </button>
    </div>
    <div class="product__info">
      <div>
        <h3 class="product__name">
          <button type="button" @click="show(product)">{{ product.name }}</button>
        </h3>
        <p class="product__kind">{{ product.kind }}</p>
        <p class="product__notes">{{ product.notes }}</p>
      </div>
      <span class="product__price">{{ formatPrice(product.price) }}</span>
    </div>
  </article>
</template>

<style scoped>
.product {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.product--feature {
  grid-column: span 2;
  grid-row: span 2;
}
.product__media {
  position: relative;
  flex: 0 0 auto;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border-radius: 4px;
  background: var(--surface);
}
.product--feature .product__media {
  flex: 1 1 auto;
  aspect-ratio: auto;
  min-height: 24rem;
}
.product__open {
  display: block;
  width: 100%;
  height: 100%;
}
.product__name button {
  text-align: left;
}
.product__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.5s var(--ease-out);
}
.product:hover .product__open {
  display: block;
  width: 100%;
  height: 100%;
}
.product__name button {
  text-align: left;
}
.product__media img {
  transform: scale(1.05);
}
.product__tag {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.45rem 0.8rem;
  border-radius: 999px;
  background: color-mix(in oklab, var(--ivory) 82%, transparent);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  color: var(--ink);
  font-size: 0.58rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}
.product__add {
  position: absolute;
  left: 1rem;
  right: 1rem;
  bottom: 1rem;
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.95rem 1rem;
  border-radius: 999px;
  background: color-mix(in oklab, var(--ivory) 90%, transparent);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  color: var(--ink);
  font-size: 0.64rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transform: translateY(130%);
  opacity: 0;
  transition:
    transform 0.6s var(--ease-out),
    opacity 0.6s var(--ease-out),
    background-color 0.3s;
}
.product__add:hover {
  background: var(--ivory);
}
.product__add-price {
  display: inline-flex;
  gap: 0.6rem;
}
.product__add-price i {
  font-style: normal;
  color: var(--accent);
}
.product--feature .product__open {
  display: block;
  width: 100%;
  height: 100%;
}
.product__name button {
  text-align: left;
}
.product__media img {
  object-position: 50% 68%;
}
.product:hover .product__add,
.product:focus-within .product__add {
  transform: none;
  opacity: 1;
}
.product__info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-top: 1.1rem;
}
.product__name {
  font-size: clamp(1.6rem, 2vw, 2rem);
  font-weight: 400;
  line-height: 1;
}
.product--feature .product__name {
  font-size: clamp(2rem, 3vw, 3rem);
}
.product__kind {
  margin-top: 0.5rem;
  font-size: 0.64rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--fg-3);
}
.product__notes {
  margin-top: 0.25rem;
  font-size: 0.8rem;
  color: var(--fg-2);
}
.product__price {
  padding-top: 0.15rem;
  font-family: var(--font-display);
  font-size: 1.25rem;
  white-space: nowrap;
}
@media (hover: none) {
  .product__add {
    transform: none;
    opacity: 1;
  }
}
@media (max-width: 560px) {
  .product:not(.product--feature) .product__add-price {
    display: none;
  }
  .product__add {
    left: 0.6rem;
    right: 0.6rem;
    bottom: 0.6rem;
    padding: 0.8rem 0.6rem;
  }
}
@media (max-width: 1000px) {
  .product--feature {
    grid-row: auto;
  }
  .product--feature .product__media {
    flex: 0 0 auto;
    aspect-ratio: 16 / 11;
    min-height: 0;
  }
}
</style>
