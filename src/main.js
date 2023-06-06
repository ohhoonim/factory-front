import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import routes from './routes'

import { createPinia } from 'pinia'

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

const pinia = createPinia()


createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')
