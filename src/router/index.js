import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'homeView',
      component: () => import('../views/homeView.vue')
    },

    {
      path: '/contact',
      name: 'contactView',
      component: () => import('../views/contactView.vue')
    },

    {
      path: '/projects',
      name: 'projectsView',
      component: () => import('../views/projectsView.vue')
    }
  ]
})

export default router