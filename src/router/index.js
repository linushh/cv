import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'homeView',
      component: () => import('../views/homeView.vue')
    }
  ]
})

export default router