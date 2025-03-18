import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '@/components/LogIn.vue'
import ToolBar from '@/components/ToolBar.vue'
import TendersList from '@/components/tender/TenderList.vue'
import Tender from '@/components/tender/Tender.vue'
import TenderDetails from '@/components/tender/TenderDetails.vue'
import OfferDetails from '@/components/offer/OfferDetails.vue'
import Offer from '@/components/offer/Offer.vue'
import OfferList from '@/components/offer/OfferList.vue'
import { RouterView } from 'vue-router'

const routes = [

  { name: 'login', path: '', component: LogIn },

  { name: 'user-module', path: '/users/:userId/:role', component: ToolBar,
      children: [
        { path: 'tenders', component: RouterView,
          children: [ { name: 'new-tender', path: 'create-new-tender', component: Tender },
                      { name: 'tenders', path: '', component: TendersList },
                      { name: 'tender-details', path: ':tenderId', component: TenderDetails }
          ]
         },
        { path: 'offers', component: RouterView,
          children: [ { name: 'new-offer', path: 'send-new-offer', component: Offer },
                      { name: 'offers', path: '', component: OfferList },
                      { name: "offer-details", path: ':offerId', component: OfferDetails },
          ]
        }
      ],
  }

]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
