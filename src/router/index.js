import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
    routes: [
        {
            path: '/',
            component: () => import("@/components/HelloWorld.vue")
        },
        {
            path: '/search',
            component: () => import("@/components/Search.vue")
        }
    ],
    history: createWebHistory()
})