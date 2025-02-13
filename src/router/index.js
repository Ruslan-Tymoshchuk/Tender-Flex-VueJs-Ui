import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '@/components/LogIn.vue'
import ToolBar from '@/components/ToolBar.vue'
import TendersList from '@/components/TenderList.vue'
import Tender from '@/components/Tender.vue'
import TenderDetails from '@/components/TenderDetails.vue'
import OfferDetails from '@/components/OfferDetails.vue'
import Offer from '@/components/Offer.vue'
import OffersList from '@/components/OffersList.vue'

const routes = [

  { name: 'login', path: '/', component: LogIn },

  { name: 'user-module', path: '/users/:userId/:role/', component: ToolBar,
      children: [
        { name: 'tenders', path: 'tenders', component: TendersList },
        { name: 'new-tender', path: 'tenders/create-new-tender', component: Tender },
        { name: 'tender-details', path: 'tenders/:tenderId', component: TenderDetails },
        { name: 'new-offer', path: 'tenders/:tenderId/send-new-offer', component: Offer },
        { name: 'offers', path: 'offers', component: OffersList },
        { name: "offer-details", path: 'offers/:offerId', component: OfferDetails },
      ],
  }

]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
