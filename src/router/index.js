import { createRouter, createWebHistory } from "vue-router";

import About from "../views/AboutB"
import Home from "../views/HomeR"

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router