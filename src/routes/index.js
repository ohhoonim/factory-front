const routes = [
    { name: 'Home', path: '/', component: () => import('../pages/Home.vue') },
    {name: 'About', path: '/about', component: () => import('../pages/About.vue') },
    {name: 'Member', path: '/member', component: () => import('../pages/Member.vue') },
]


export default routes;