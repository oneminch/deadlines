import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import { hydrateAppStores } from '@/bootstrap'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

await hydrateAppStores(pinia)

app.mount('#app')
