import './assets/main.css'
import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from './i18n'
import VueLazyLoad from 'vue3-lazyload'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(VueLazyLoad)

app.mount('#app')