import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '@/components/LogIn.vue'
import ToolBar from '@/components/Toolbar.vue'
import TendersList from '@/components/TendersList.vue'
import Tender from '@/components/Tender.vue'
import TenderDetails from '@/components/TenderDetails.vue'
import OfferDetails from '@/components/OfferDetails.vue'
import MyOfferDetails from '@/components/MyOfferDetails.vue'
import Offer from '@/components/Offer.vue'
import OffersList from '@/components/OffersList.vue'

const routes = [
  {
    path: '/',
    components: {
      default: LogIn,
    }
  },
  {
    path: '/module/:role',
    name: 'contractor-module',
    component: ToolBar,
      children: [
        { path: 'new-tender', component: Tender },
        { path: 'tenders', name: 'tenders', component: TendersList },
        { path: 'offers', component: OffersList },
        { path: 'tenders/details/:id', name: "tender-details", component: TenderDetails },
        { path: 'offers/details/:id/award/:award/reject/:reject', name: "offer-details", component: OfferDetails },
      ],
  },
  {
    path: '/module/:role',
    name: 'bidder-module',
    component: ToolBar,
      children: [
        { path: 'tenders', component: TendersList },
        { path: 'new-offer/:tender_id', name: 'new-offer', component: Offer },
        { path: 'offers', name: "offers-list", component: OffersList },
        { path: 'tenders/details/:id', name: "tender-details", component: TenderDetails },
        { path: 'offers/details/:id', name: "myoffer-details", component: MyOfferDetails },
      ],
  },
  {
    path: '/module/:role',
    name: 'admin-module',
  },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
