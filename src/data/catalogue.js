import { products } from './products'
import { demoProducts, demoBatch } from './demo-products'
import { site } from './site'

/*
 * What the shop actually sells. Real products win; in development only, `?demo` fills an
 * empty collection with invented ones. `import.meta.env.DEV` is false in production builds,
 * so the demo module is dropped from the bundle entirely.
 */
const useDemo =
  import.meta.env.DEV &&
  products.length === 0 &&
  typeof window !== 'undefined' &&
  new URLSearchParams(window.location.search).has('demo')

export const isDemo = Boolean(useDemo)
export const catalogue = useDemo ? demoProducts : products
export const productById = Object.fromEntries(catalogue.map((p) => [p.id, p]))

const configured = site.batch.number != null && site.batch.remaining != null
export const batch = configured
  ? { number: site.batch.number, remaining: site.batch.remaining, size: site.batch.size }
  : useDemo
    ? { ...demoBatch, size: site.batch.size }
    : null
