import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '@/components/LogIn.vue'
import ToolBar from '@/components/ToolBar.vue'
import TendersList from '@/components/TenderList.vue'
import Tender from '@/components/Tender.vue'
import TenderDetails from '@/components/TenderDetails.vue'
import OfferDetails from '@/components/OfferDetails.vue'
import MyOfferDetails from '@/components/MyOfferDetails.vue'
import Offer from '@/components/Offer.vue'
import OffersList from '@/components/OffersList.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    components: {
      default: LogIn,
    }
  },
  {
    name: 'contractor-module',
    path: '/users/:userId/:role/',
    component: ToolBar,
      children: [
        { name: 'new-tender', path: 'new-tender', component: Tender },
        { name: 'tenders', path: 'tenders', component: TendersList },
        { name: 'offers', path: 'offers', component: OffersList },
        { name: "offer-details", path: 'offers/details/:offerId', component: OfferDetails },
        { name: "tender-details", path: 'tenders/details/:tenderId', component: TenderDetails },
      ],
  },
  {
    name: 'bidder-module',
    path: '/users/:userId/:role/',
    component: ToolBar,
      children: [
        { name: 'new-offer', path: 'new-offer/:tender_id', component: Offer },
        { name: 'tenders', path: 'tenders', component: TendersList },
        { name: "offers-list", path: 'offers',  component: OffersList },
        { name: "tender-details", path: 'tenders/details/:id',  component: TenderDetails },
        { name: "myoffer-details", path: 'offers/details/:id',  component: MyOfferDetails },
      ],
  },
  {
    path: '/users/:userId/:role/',
    name: 'admin-module',
  },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
