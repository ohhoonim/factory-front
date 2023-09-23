
import { createRouter, createWebHistory } from 'vue-router'
import Discord from '../layouts/default/Discord.vue'
import Auth from '../layouts/auth/Auth.vue'

const routes = [
    {
        name: 'default',
        path: '/',
        redirect: 'home',
        component: Discord,
        children: [
            { name: 'home', path: 'home', component: () => import('@/views/Home.vue') },
            { name: 'about', path: 'about', component: () => import('@/views/About.vue') },
            { name: 'member', path: 'member', component: () => import('@/views/Member.vue') },
        ],
    },
    {
        name: 'auth',
        path: '/auth',
        redirect: '/auth/login',
        component: Auth,
        children: [
            { name: 'login', path: 'login', component: () => import('@/views/auth/Login.vue') },
        ],
    },
 
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    next()
})

export default router;