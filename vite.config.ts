import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import icons from 'unplugin-icons/vite'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    vueDevTools(),
    autoImport({
      dirs: ['src/composables', 'src/utils', 'src/stores', 'src/lib', 'src/components/ui/**'],
      dts: 'src/auto-imports.d.ts',
      vueTemplate: true
    }),
    icons({ compiler: 'vue3' }),
    components({ dts: 'src/components.d.ts', dirs: ['src/components'] }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'logo.png', 'logo.svg'],
      manifest: {
        name: 'Deadlines',
        short_name: 'Deadlines',
        description: 'A simple offline deadline tracker.',
        theme_color: '#8e51ff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/logo.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
          {
            src: '/favicon.ico',
            sizes: '256x256',
            type: 'image/x-icon',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // server: {
  //   allowedHosts: ['.trycloudflare.com']
  // }
})
