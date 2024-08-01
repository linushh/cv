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
      component: () => import('../views/skillsView.vue')
    },

    {
      path: '/projects',
      name: 'projectsView',
      component: () => import('../views/projectsView.vue')
    },

    {
      path: '/experience',
      name: 'experienceView',
      component: () => import('../views/experienceView.vue')
    }
  ]
})

export default router