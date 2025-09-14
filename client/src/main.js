import '@/assets/main.scss'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'vue-toastification/dist/index.css'

import Toast from 'vue-toastification'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast, {
  closeOnClick: true,
  pauseOnHover: true,
})

app.mount('#app')
