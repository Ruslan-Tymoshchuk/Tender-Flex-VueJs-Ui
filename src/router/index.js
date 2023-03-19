import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '@/components/LogIn.vue'
import ToolBar from '@/components/Toolbar.vue'
import ContractorModule from '@/components/ContractorModule.vue'
import TendersList from '@/components/TendersList.vue'
import Tender from '@/components/Tender.vue'
import TenderDetails from '@/components/TenderDetails.vue'
import OfferDetails from '@/components/OfferDetails.vue'
import OffersList from '@/components/OffersList.vue'

const routes = [
  {
    path: '/',
    components: {
      default: LogIn,
    }
  },
  {
    path: '/contractor-module',
    components: {
      toolBar: ToolBar,
      default: ContractorModule,
    }
  },
  {
    path: '/contractor-module/tenders-list',
    components: {
      toolBar: ToolBar,
      default: TendersList
    }
  },
  {
    path: '/contractor-module/tenders-list/:id',
    name: 'tender-details',
    components: {
      toolBar: ToolBar,
      default: TenderDetails,
    }
  },
  {
    path: '/contractor-module/offers-list',
    components: {
      toolBar: ToolBar,
      default: OffersList,
    }
  },
  {
    path: '/contractor-module/offers-list/:id',
    name: 'offer-details',
    components: {
      toolBar: ToolBar,
      default: OfferDetails,
    }
  },
  {
    path: '/new-tender',
    components: {
      toolBar: ToolBar,
      default: Tender,
    }
  },
  {
    path: '/bidder-module',
    components: {
      toolBar: ToolBar,
    }
  },
  {
    path: '/admin-module',
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
