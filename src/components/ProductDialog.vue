<script setup>
import { computed, ref, watch } from 'vue'
import { useQuickView } from '@/composables/useQuickView'
import { useBag } from '@/composables/useBag'
import { formatPrice } from '@/data/site'
import { moodByKey } from '@/data/moods'
import { useI18n } from '@/i18n'
import BaseSheet from './BaseSheet.vue'
import NotePyramid from './NotePyramid.vue'
import BottlePreview from './BottlePreview.vue'

const { product, hide } = useQuickView()
const { add, openBag } = useBag()
const { t } = useI18n()

/* keep the last product rendered while the dialog animates out */
const shown = ref(null)
const engrave = ref(false)
const initials = ref('')
const qty = ref(1)

watch(product, (p) => {
  if (!p) return
  shown.value = p
  engrave.value = false
  initials.value = ''
  qty.value = 1
})

/* up to three letters, any script (Latin, Ethiopic…) */
function onInitials(e) {
  initials.value = (e.target.value.match(/\p{L}/gu) || []).join('').slice(0, 3).toUpperCase()
  e.target.value = initials.value
}

const engraving = computed(() => (engrave.value ? initials.value : ''))
const canAdd = computed(() => !engrave.value || initials.value.length > 0)
const moodsFor = computed(() => (shown.value?.moods || []).map((k) => moodByKey[k]).filter(Boolean))

function addToBag() {
  if (!canAdd.value) return
  add(shown.value, { engraving: engraving.value, qty: qty.value })
  hide()
  openBag()
}
</script>

<template>
  <BaseSheet :open="Boolean(product)" side="center" :label="shown?.name ?? ''" @close="hide">
    <article v-if="shown" class="pd">
      <div class="pd__media">
        <Transition name="swap" mode="out-in">
          <div v-if="engrave" key="bottle" class="pd__bottle">
            <BottlePreview :initials="initials" />
            <p>{{ t('product.engravePreview') }}</p>
          </div>
          <img v-else key="photo" :src="shown.image.src" :alt="shown.image.alt" />
        </Transition>
      </div>

      <div class="pd__body">
        <p v-if="shown.tag" class="eyebrow">{{ shown.tag }}</p>
        <h2 class="sheet-title">{{ shown.name }}</h2>
        <p class="pd__kind">{{ shown.kind }}</p>
        <p v-if="shown.description" class="pd__desc">{{ shown.description }}</p>

        <ul v-if="moodsFor.length" class="pd__moods" :aria-label="t('product.moods')">
          <li v-for="m in moodsFor" :key="m.key">{{ t(`moods.${m.key}.label`) }}</li>
        </ul>

        <NotePyramid v-if="shown.pyramid" :pyramid="shown.pyramid" class="pd__pyramid" />
        <p v-else-if="shown.notes" class="pd__notes">{{ shown.notes }}</p>

        <div v-if="shown.engravable" class="pd__engrave">
          <label class="pd__toggle">
            <input v-model="engrave" type="checkbox" />
            <span>{{ t('product.engrave') }}</span>
          </label>
          <label v-if="engrave" class="field">
            <span>{{ t('product.engraveHint') }}</span>
            <input
              :value="initials"
              type="text"
              inputmode="text"
              autocomplete="off"
              maxlength="6"
              :placeholder="t('product.engravePlaceholder')"
              @input="onInitials"
            />
          </label>
        </div>

        <div class="pd__buy">
          <div class="pd__qty" role="group" :aria-label="t('common.quantity')">
            <button type="button" :aria-label="t('common.fewer')" :disabled="qty <= 1" @click="qty--">−</button>
            <output aria-live="polite">{{ qty }}</output>
            <button type="button" :aria-label="t('common.more')" :disabled="qty >= 20" @click="qty++">+</button>
          </div>
          <button type="button" class="btn btn--solid pd__add" :disabled="!canAdd" @click="addToBag">
            {{ t('product.addWithPrice', { price: formatPrice(shown.price * qty) }) }}
          </button>
        </div>
      </div>
    </article>
  </BaseSheet>
</template>

<style scoped>
.pd {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: min(80svh, 44rem);
}
.pd__media {
  position: relative;
  overflow: hidden;
  background: var(--cream);
}
.pd__media img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 68%;
}
.pd__bottle {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  padding: 2.5rem;
}
.pd__bottle .bottle {
  width: min(62%, 16rem);
}
.pd__bottle p {
  max-width: 30ch;
  font-size: 0.72rem;
  text-align: center;
  color: var(--fg-3);
}
.pd__body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: clamp(2rem, 4vw, 3.5rem);
  padding-top: clamp(3.5rem, 5vw, 4rem);
}
.pd__kind {
  font-size: 0.66rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--fg-3);
}
.pd__desc,
.pd__notes {
  color: var(--fg-2);
}
.pd__moods {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.pd__moods li {
  padding: 0.4rem 0.8rem;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
.pd__pyramid {
  margin: 0.5rem 0;
}
.pd__engrave {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
  border-block: 1px solid var(--line);
}
.pd__toggle {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
}
.pd__toggle input {
  width: 18px;
  height: 18px;
  accent-color: var(--ink);
}
.pd__buy {
  display: flex;
  gap: 1rem;
  margin-top: auto;
  padding-top: 0.5rem;
}
.pd__qty {
  display: flex;
  align-items: center;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
}
.pd__qty button {
  width: 44px;
  height: 100%;
  min-height: 48px;
  font-size: 1.1rem;
}
.pd__qty button:disabled {
  opacity: 0.3;
}
.pd__qty output {
  min-width: 1.5rem;
  text-align: center;
  font-family: var(--font-display);
  font-size: 1.2rem;
}
.pd__add {
  flex: 1;
}
.pd__add:disabled {
  opacity: 0.45;
  pointer-events: none;
}
.swap-enter-active,
.swap-leave-active {
  transition: opacity 0.45s var(--ease-out);
}
.swap-enter-from,
.swap-leave-to {
  opacity: 0;
}
@media (max-width: 820px) {
  .pd {
    grid-template-columns: 1fr;
  }
  .pd__media {
    aspect-ratio: 4 / 3;
  }
  .pd__buy {
    position: sticky;
    bottom: 0;
    padding-block: 1rem;
    background: var(--bg);
  }
}
</style>
