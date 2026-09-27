import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  /* Link previews need an absolute image URL; without VITE_SITE_URL it stays relative. */
  const siteUrl = (loadEnv(mode, process.cwd()).VITE_SITE_URL || '').replace(/\/$/, '')

  return {
    plugins: [
      vue(),
      {
        name: 'kimem-site-url',
        transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', siteUrl),
      },
    ],
    base: './',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
