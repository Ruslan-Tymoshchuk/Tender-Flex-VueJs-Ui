<template>
  <ToolBarTitle
    v-if="this.$route.params.role === USER_ROLE.BIDDER"
    title="My Offers">
  </ToolBarTitle>

  <ToolBarTitle
    v-else
    title="Offers">
  </ToolBarTitle>

  <v-container fluid class="d-flex align-center justify-center mt-n12">
  <v-card elevation="8" width="1000">
    <div v-if="isNoOffers">
      <EmptyTableTitle
        v-if="this.$route.params.role === USER_ROLE.BIDDER"
        message="“There are no sent Offers in your list”">
      </EmptyTableTitle>
      <EmptyTableTitle
        v-else-if="this.$route.params.role === USER_ROLE.CONTRACTOR"
        message="“There are no received Offers”">
      </EmptyTableTitle>
    </div>

    <div v-else>
      <TableHeader
        v-if="this.$route.params.role === USER_ROLE.BIDDER"
        companyName="Oficial Name"
        field="Field"
        price="Price"
        country="Country"
        date="Sent Date"
        status="Status"
      ></TableHeader>
      <TableHeader
        v-else-if="this.$route.params.role === USER_ROLE.CONTRACTOR"
        companyName="Oficial Name"
        field="Field"
        price="Price"
        country="Country"
        date="Received Date"
        status="Status"
      ></TableHeader>
      <v-container
        id="scroll-target"
        style="max-height: 25rem"
        class="overflow-y-auto"
        v-scroll:#scroll-target="onScroll">
      <TableBody
        :offers="offers"
         @select-offer="(offer) => navigateToTenderFromOffersList(offer, this.$route.params.role)"
      ></TableBody>
      </v-container>
    </div>
  </v-card>
  </v-container>
</template>

<script>
import { USER_ROLE } from "@/components/constants"
import ToolBarTitle from "@/components/childs/ToolBarTitle.vue"
import EmptyTableTitle from "@/components/childs/EmptyTableTitle.vue"
import { URL_REST_API } from "@/rest.api.endpoints"
import { OFFER_STATUS } from "@/components/constants"
import axios from "axios";
import TableHeader from "@/components/offer/childs/TableHeader.vue"
import TableBody from "@/components/offer/childs/TableBody.vue"
import { navigateToTenderFromOffersList } from "@/components/actions"

export default {
  components:{
    ToolBarTitle,
    EmptyTableTitle,
    TableHeader,
    TableBody
  },

  data: () => ({
    USER_ROLE,
    role: '',
    offers: [],
    totalPages: 1,
    plannedPage: 1,
    offersPerPage: 10,
    loading: false,
    isNoOffers: false,
    noOffersMessage: '',
    OFFER_STATUS,
    navigateToTenderFromOffersList
  }),

  methods: {
    async getOffersList() {
      try {
        this.loading = true
        const offersPageResponse = await axios.get(
          `${URL_REST_API.HOST}/${URL_REST_API.OFFERS_PAGE}?currentPage=${this.plannedPage}&totalOffers=${this.offersPerPage}`, {
          withCredentials: true,
          headers: {
            'Accept': 'application/json',
          }
        });
        this.totalPages = offersPageResponse.totalPages;
        for (const offer of offersPageResponse.data.content) {
          this.offers.push(offer);
        }
        if (this.offers.length == 0) {
          this.isNoOffers = true;
        }
        this.plannedPage++;
        this.loading = false;
      } catch (error) {
        console.log('There was an error', error)
      }
    },

    onScroll(e) {
      const currentPage = Math.ceil(e.target.scrollTop / 280);
      if (currentPage === this.plannedPage && !this.loading && this.plannedPage <= this.totalPages) {
        this.getOffersList()
      }
    }
  },

  mounted() {
    this.getOffersList();
    this.role = this.$route.params.role;
  }
}
</script>
