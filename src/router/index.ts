
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { name: 'home', path: '/', component: () => import('../views/Home.vue') },
    { name: 'about', path: '/about', component: () => import('../views/About.vue') },
    { name: 'member', path: '/member', component: () => import('../views/Member.vue') },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;