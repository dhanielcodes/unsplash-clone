import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
    routes: [
        {
            path: '/',
            component: () => import("@/components/HelloWorld.vue")
        },
    ],
    history: createWebHistory()
})