import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import messages from './messages'

import './style.css'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from "vuetify/iconsets/mdi-svg"

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
        mdi,
    }
  }
})

const router = createRouter({
    history: createWebHistory(),
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
    .use(vuetify)
    .mount('#app')
