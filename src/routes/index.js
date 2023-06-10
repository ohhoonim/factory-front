const routes = [
    { name: 'home', path: '/', component: () => import('../pages/Home.vue') },
    { name: 'about', path: '/about', component: () => import('../pages/About.vue') },
    { name: 'member', path: '/member', component: () => import('../pages/Member.vue') },
]


export default routes;