const routes = [
    { name: 'Home', path: '/', component: () => import('../components/Home.vue') },
    {name: 'About', path: '/about', component: () => import('../components/About.vue') },
    {name: 'Member', path: '/member', component: () => import('../components/Member.vue') },
]


export default routes;