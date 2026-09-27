<script setup>
import { computed, ref, watch } from 'vue'
import { useBag } from '@/composables/useBag'
import { formatPrice } from '@/data/site'
import { orderMessage, orderLink, channelLabel } from '@/lib/order'
import BaseSheet from './BaseSheet.vue'

const { items, count, subtotal, open, closeBag, setQty, remove, clear } = useBag()

const note = ref('')
const stage = ref('bag') // bag | sent
const copied = ref(false)

watch(open, (isOpen) => {
  if (isOpen) stage.value = 'bag'
})

const link = computed(() => orderLink(orderMessage(items.value, subtotal.value, note.value)))

async function checkout() {
  const { href, copy } = link.value
  copied.value = false
  if (copy) {
    try {
      await navigator.clipboard.writeText(copy)
      copied.value = true
    } catch {
      /* clipboard blocked; the message is still shown on the sent screen */
    }
  }
  window.open(href, href.startsWith('mailto:') ? '_self' : '_blank', 'noopener')
  stage.value = 'sent'
}

function finish() {
  clear()
  note.value = ''
  closeBag()
}
</script>

<template>
  <BaseSheet :open="open" label="Your bag" @close="closeBag">
    <div class="bag">
      <header class="bag__head">
        <p class="eyebrow">Your bag</p>
        <h2 class="sheet-title">
          {{ stage === 'sent' ? 'Almost yours.' : count ? `${count} ${count === 1 ? 'bottle' : 'bottles'}` : 'Empty, for now.' }}
        </h2>
      </header>

      <template v-if="stage === 'bag'">
        <p v-if="!items.length" class="bag__empty">
          Nothing here yet. Open a perfume in the collection to add it.
        </p>

        <ul v-else class="bag__lines">
          <li v-for="l in items" :key="l.key" class="line">
            <img :src="l.product.image.src" :alt="''" class="line__img" />
            <div class="line__info">
              <p class="line__name">{{ l.product.name }}</p>
              <p class="line__meta">{{ l.product.kind }}</p>
              <p v-if="l.engraving" class="line__meta">Engraved <em>{{ l.engraving }}</em></p>
              <div class="line__row">
                <div class="line__qty" role="group" :aria-label="`Quantity of ${l.product.name}`">
                  <button type="button" aria-label="One fewer" @click="setQty(l.key, l.qty - 1)">−</button>
                  <output>{{ l.qty }}</output>
                  <button type="button" aria-label="One more" @click="setQty(l.key, l.qty + 1)">+</button>
                </div>
                <button type="button" class="line__remove" @click="remove(l.key)">Remove</button>
              </div>
            </div>
            <span class="line__price">{{ formatPrice(l.product.price * l.qty) }}</span>
          </li>
        </ul>

        <footer v-if="items.length" class="bag__foot">
          <label class="field">
            <span>Note for us (optional)</span>
            <textarea v-model="note" rows="2" maxlength="400" placeholder="Card message, delivery details…"></textarea>
          </label>
          <p class="bag__total"><span>Subtotal</span>{{ formatPrice(subtotal) }}</p>
          <button type="button" class="btn btn--solid bag__cta" @click="checkout">
            Order by {{ channelLabel[link.channel] }}
          </button>
          <p class="bag__small">
            No payment is taken here. Your order goes to us as a message; we reply to confirm
            availability, delivery and how to pay.
          </p>
        </footer>
      </template>

      <div v-else class="bag__sent">
        <p v-if="link.channel === 'telegram'">
          {{ copied ? 'Your order is copied.' : 'Copy your order below,' }} Paste it into the Telegram chat that just
          opened and we will reply there.
        </p>
        <p v-else-if="link.channel === 'whatsapp'">
          WhatsApp should have opened with your order written out. Press send and we will reply there.
        </p>
        <p v-else>
          Your email app should have opened with your order written out. Send it and we will reply to confirm.
        </p>
        <pre class="bag__message">{{ orderMessage(items, subtotal, note) }}</pre>
        <div class="bag__actions">
          <button type="button" class="btn btn--solid" @click="finish">Done, clear my bag</button>
          <button type="button" class="link-arrow" @click="stage = 'bag'">Back to bag</button>
        </div>
      </div>
    </div>
  </BaseSheet>
</template>

<style scoped>
.bag {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  min-height: 100%;
}
.bag__head .eyebrow {
  margin-bottom: 0.9rem;
}
.bag__empty {
  color: var(--fg-2);
}
.bag__lines {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--line);
}
.line {
  display: grid;
  grid-template-columns: 5rem 1fr auto;
  gap: 1rem;
  padding: 1.1rem 0;
  border-bottom: 1px solid var(--line);
}
.line__img {
  width: 5rem;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  object-position: 50% 68%;
  border-radius: 3px;
}
.line__name {
  font-family: var(--font-display);
  font-size: 1.35rem;
  line-height: 1.1;
}
.line__meta {
  font-size: 0.78rem;
  color: var(--fg-3);
}
.line__row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.6rem;
}
.line__qty {
  display: flex;
  align-items: center;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
}
.line__qty button {
  width: 34px;
  height: 34px;
}
.line__qty output {
  min-width: 1.2rem;
  text-align: center;
  font-size: 0.9rem;
}
.line__remove {
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--fg-3);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.line__price {
  font-family: var(--font-display);
  font-size: 1.15rem;
  white-space: nowrap;
}
.bag__foot {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: auto;
}
.bag__total {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-display);
  font-size: 1.5rem;
}
.bag__total span {
  font-family: var(--font-sans);
  font-size: 0.66rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  align-self: center;
  color: var(--fg-2);
}
.bag__cta {
  width: 100%;
}
.bag__small {
  font-size: 0.72rem;
  color: var(--fg-3);
}
.bag__sent {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  color: var(--fg-2);
}
.bag__message {
  padding: 1rem;
  border-radius: 4px;
  background: var(--surface);
  font-family: var(--font-sans);
  font-size: 0.8rem;
  white-space: pre-wrap;
  user-select: all;
  color: var(--fg);
}
.bag__actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}
</style>
