import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '@/components/LogIn.vue'
import ToolBar from '@/components/ToolBar.vue'
import TendersList from '@/components/TenderList.vue'
import Tender from '@/components/Tender.vue'
import TenderDetails from '@/components/TenderDetails.vue'
import OfferDetails from '@/components/OfferDetails.vue'
import Offer from '@/components/Offer.vue'
import OffersList from '@/components/OffersList.vue'
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
                      { name: 'offers', path: '', component: OffersList },
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
