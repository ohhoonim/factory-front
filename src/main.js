import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import messages from './messages'

import './style.css'
import App from './App.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
const pinia = createPinia()
const i18n = createI18n({
    legacy: false, // you must set `false`, to use Composition API
    locale: 'ko', // set locale
    fallbackLocale: 'en', // set fallback locale
    messages,
})

createApp(App)
    .use(router)
    .use(pinia)
    .use(i18n)
    .mount('#app')
