# Kimem — Maison de Parfum

Landing page for Kimem, a small-batch perfume house. Built with Vue 3 (`<script setup>`),
Vite, GSAP ScrollTrigger and Lenis smooth scrolling.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # serve the production build
```

## Structure

```
src/
  App.vue                 page shell, preloader hand-off, toast
  components/             one component per section (hero, notes, atelier, collection…)
  composables/            useScroll (Lenis + GSAP), useTheme, useBag, useAppState
  directives/             v-reveal, v-reveal.group, v-split-words, v-parallax, v-magnetic, v-theme
  data/                   images, notes, products (all page copy lives here)
  styles/                 tokens.css (design tokens, light/dark themes), base.css
  assets/img/             the five photographs
```

## How the page works

- **Theme by section.** Each section carries `v-theme="'light' | 'dark'"`. A ScrollTrigger flips
  `.is-dark` on `<html>` as sections pass the middle of the viewport, and the palette
  cross-fades. Derived colours are built with `color-mix()` against `--fg`, so one flip
  recolours everything.
- **Hero.** The headline is split around the photographs ("Memory," above, "distilled." below).
  Images reveal with a clip-path wipe, drift at different speeds on scroll, and lean toward
  the pointer. On small screens the gallery becomes a snap-scrolling strip.
- **Notes.** A sticky image cross-fades between top, heart and base notes as you read.
- **Motion respects `prefers-reduced-motion`.** Smooth scroll, parallax and the preloader
  are all skipped when it is set.
