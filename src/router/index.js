import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    component: () => import('@/components/LogIn.vue'),
    path: '/',
  },
  {
    component: () => import('@/components/Tender.vue'),
    path: '/new-tender',
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
