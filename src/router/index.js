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
  {
    component: () => import('@/components/TendersList.vue'),
    path: '/tenders-list',
  },
  {
    component: () => import('@/components/ContractorModule.vue'),
    path: '/contractor-module',
  },
  {
    component: () => import('@/components/TenderDetails.vue'),
    path: '/tenders-list/:id',
    name: 'tender-details',
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
