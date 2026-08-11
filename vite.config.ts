import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import icons from 'unplugin-icons/vite'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import tailwindcss from '@tailwindcss/vite'

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
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
