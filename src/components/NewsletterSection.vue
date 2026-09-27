<script setup>
import { computed, ref } from 'vue'
import { site } from '@/data/site'
import { useI18n } from '@/i18n'
import IconArrow from './IconArrow.vue'

const { t } = useI18n()
const email = ref('')
const status = ref('idle') // idle | error | sending | sent | failed | mailed

const valid = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())

async function submit() {
  if (status.value === 'sending') return
  if (!valid()) {
    status.value = 'error'
    return
  }

  /* No signup service configured yet: hand it to the mail app instead of faking success. */
  if (!site.newsletterUrl) {
    const subject = encodeURIComponent(t('letter.mailSubject'))
    const body = encodeURIComponent(t('letter.mailBody', { email: email.value.trim() }))
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
    status.value = 'mailed'
    return
  }

  status.value = 'sending'
  try {
    const data = new FormData()
    data.append('email', email.value.trim())
    const res = await fetch(site.newsletterUrl, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    })
    status.value = res.ok ? 'sent' : 'failed'
  } catch {
    status.value = 'failed'
  }
}

const hint = computed(() => {
  const key = { error: 'invalid', failed: 'failed', mailed: 'mailed' }[status.value] ?? 'hint'
  return t(`letter.${key}`, { email: site.email })
})
</script>

<template>
  <section id="letter" class="newsletter" v-theme="'light'">
    <div class="container newsletter__inner">
      <div v-reveal.group>
        <p class="eyebrow">{{ t('letter.eyebrow') }}</p>
        <h2 class="section-title newsletter__title">{{ t('letter.titleA') }} <em>{{ t('letter.titleB') }}</em></h2>
      </div>

      <div class="newsletter__side" v-reveal="{ delay: 0.15 }">
        <p class="lead">
          {{ t('letter.lead') }}
        </p>

        <form
          v-if="status !== 'sent'"
          class="newsletter__form"
          :class="{ 'is-error': status === 'error' || status === 'failed' }"
          :aria-busy="status === 'sending'"
          novalidate
          @submit.prevent="submit"
        >
          <label class="sr-only" for="newsletter-email">{{ t('letter.label') }}</label>
          <input
            id="newsletter-email"
            v-model="email"
            type="email"
            name="email"
            :placeholder="t('letter.placeholder')"
            autocomplete="email"
            @input="status = 'idle'"
          />
          <button type="submit" :aria-label="t('letter.submit')" :disabled="status === 'sending'">
            <IconArrow />
          </button>
        </form>
        <p v-else class="newsletter__thanks">{{ t('letter.thanks') }}</p>

        <p class="newsletter__hint" aria-live="polite">{{ hint }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.newsletter {
  padding: clamp(5rem, 10vw, 9rem) 0 clamp(4rem, 8vw, 7rem);
}
.newsletter__inner {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: clamp(2rem, 6vw, 6rem);
  align-items: end;
}
.newsletter__title {
  font-size: clamp(3rem, 7vw, 7.5rem);
}
.newsletter__side .lead {
  max-width: 40ch;
}
.newsletter__form {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid var(--fg);
  transition: border-color 0.4s;
}
.newsletter__form.is-error {
  border-color: #b4485c;
}
.newsletter__form input {
  flex: 1;
  min-width: 0;
  padding: 0.6rem 0;
  font-family: var(--font-display);
  font-size: 1.45rem;
  outline: none;
}
.newsletter__form input::placeholder {
  color: var(--fg-3);
  font-style: italic;
}
.newsletter__form button {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  flex: 0 0 auto;
  border: 1px solid var(--fg);
  border-radius: 50%;
  transition:
    background-color 0.5s var(--ease-out),
    color 0.5s var(--ease-out);
}
.newsletter__form button svg {
  width: 16px;
  height: 16px;
}
.newsletter__form button:disabled {
  opacity: 0.4;
}
.newsletter__form button:hover {
  background: var(--fg);
  color: var(--bg);
}
.newsletter__thanks {
  margin-top: 2rem;
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-style: italic;
}
.newsletter__hint {
  margin-top: 0.9rem;
  font-size: 0.68rem;
  letter-spacing: 0.06em;
  color: var(--fg-3);
}
@media (max-width: 820px) {
  .newsletter__inner {
    grid-template-columns: 1fr;
  }
}
</style>
