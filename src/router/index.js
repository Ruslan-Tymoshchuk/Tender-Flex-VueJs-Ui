import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    component: () => import('@/components/LogIn.vue'),
    path: '/',
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router


