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
    component: () => import('@/components/BidderModule.vue'),
    path: '/bidder-module',
  },
  {
    component: () => import('@/components/AdminModule.vue'),
    path: '/admin-module',
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
