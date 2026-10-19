import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'
import 'primeicons/primeicons.css'
import './styles/main.css'
import App from './App.vue'
import { PortfolioPreset } from './theme'

createApp(App)
  .use(PrimeVue, {
    theme: {
      preset: PortfolioPreset,
      options: { darkModeSelector: '.app-dark', cssLayer: false },
    },
  })
  .use(ToastService)
  .directive('tooltip', Tooltip)
  .mount('#app')
