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
            { name: 'member', path: '/member', component: () => import('@/views/Member.vue') , meta: {authRequired: true}},

            { name: 'guide-default', path: '/member', component: () => import('@/views/guide/Default.vue') , meta: {authRequired: true}},
            { name: 'guide-master-details', path: '/member', component: () => import('@/views/guide/MasterDetails.vue') , meta: {authRequired: true}},
            { name: 'guide-move', path: '/member', component: () => import('@/views/guide/Move.vue') , meta: {authRequired: true}},
            { name: 'guide-details', path: '/member', component: () => import('@/views/guide/Details.vue') , meta: {authRequired: true}},
            { name: 'guide-excel', path: '/member', component: () => import('@/views/guide/Excel.vue') , meta: {authRequired: true}},
            { name: 'guide-composition', path: '/member', component: () => import('@/views/guide/Composition.vue') , meta: {authRequired: true}},
        ]
        , meta: {authRequired: true}
        
    },
    {
        name: 'auth',
        path: '/auth',
        component: Auth,
        children: [
            { name: 'login', path: '/auth/login', component: () => import('@/views/auth/Login.vue'), meta: {authRequired: false} },
            { name: 'signup', path: '/auth/signup', component: () => import('@/views/auth/Signup.vue'), meta: {authRequired: false}},
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