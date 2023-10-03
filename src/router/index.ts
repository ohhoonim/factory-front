import { createRouter, createWebHistory, Router } from 'vue-router'
import Discord from '../layouts/default/Discord.vue'
import Auth from '../layouts/auth/Auth.vue'
import { useAuthStore } from '@/store/AuthService'

const routes = [
    { path: '', redirect: '/home'},
    {
        name: 'default',
        path: '/',
        component: Discord,
        children: [
            { name: 'home', path: '/home', component: () => import('@/views/Home.vue') , meta: {authRequired: true}},
            { name: 'about', path: '/about', component: () => import('@/views/About.vue') , meta: {authRequired: true}},
            { name: 'member', path: '/member', component: () => import('@/views/Member.vue') , meta: {authRequired: true}},
        ]
        , meta: {authRequired: true}
    },
    {
        name: 'auth',
        path: '/auth',
        component: Auth,
        children: [
            { name: 'login', path: '/auth/login', component: () => import('@/views/auth/Login.vue'), meta: {authRequired: false} },
        ],
    },
]

const router: Router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to, from, next) => {
    const auth = useAuthStore()
    if (auth.currentToken === '') {
        await auth.refresh()
    }
    if (to.meta.authRequired && auth.currentToken === '') {
        next({name: 'login'})
    }
    next()
})

export default router;