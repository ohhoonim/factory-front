import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import routes from './routes'

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})


createApp(App)
    .use(router)
    .mount('#app')
