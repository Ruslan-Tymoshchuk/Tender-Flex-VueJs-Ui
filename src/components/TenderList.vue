<template>
  <ToolBarTitle
    v-if="this.$route.params.role === USER_ROLE.CONTRACTOR"
    title="My Tenders">
  </ToolBarTitle>

  <ToolBarTitle
    v-else
    title="Tenders">
  </ToolBarTitle>

  <v-container fluid class="d-flex align-center justify-center mt-n12">
  <v-card elevation="8" width="1000">
    <div v-if="isNoTenders">
      <EmptyTableTitle v-if="this.$route.params.role === USER_ROLE.CONTRACTOR"
        message="“There are no published Tenders. Create a Tender.”">
      </EmptyTableTitle>
      <EmptyTableTitle
        v-else
        message="“There are no available Tenders.”">
      </EmptyTableTitle>
    </div>

    <div v-else>
      <div v-if="this.$route.params.role === USER_ROLE.CONTRACTOR">
        <TableHeader
          field="Field"
          companyName="Oficial Name"
          tenderStatus="Status"
          deadline="Deadline"
          offerData="Offers"
        ></TableHeader>
      </div>
      <div v-else-if="this.$route.params.role === USER_ROLE.BIDDER">
        <TableHeader
          field="Field"
          companyName="Contractor Name"
          tenderStatus="Tender Status"
          deadline="Deadline"
          offerData="Offer Status"
        ></TableHeader>
      </div>
        <v-container id="scroll-target" style="max-height: 25rem" class="overflow-y-auto"
          v-scroll:#scroll-target="onScroll">
          <TableBody
            :tenders="tenders"
          ></TableBody>
        </v-container>
    </div>
  </v-card>
</v-container>

<router-view />
</template>

<script>
import { URL_REST_API } from "@/rest.api.endpoints.js"
import { USER_ROLE } from "@/components/constants"
import { fetchFromEndpoint, totalStore } from "@/components/actions"
import ToolBarTitle from "@/components/childs/ToolBarTitle.vue"
import EmptyTableTitle from "@/components/childs/EmptyTableTitle.vue"
import TableHeader from "@/components/childs/TableHeader.vue"
import TableBody from "@/components/childs/TableBody.vue"
import axios from "axios";

export default {
  components:{
    ToolBarTitle,
    EmptyTableTitle,
    TableHeader,
    TableBody
  },

  data: () => ({
    loading: false,
    bottom: 285,
    plannedPage: 1,
    tendersPerPage: 10,
    totalPages: 1,
    tenders: 0,
    offers: 0,
    tenders: [],
    isNoTenders: false,
    isTenders: false,
    noTendersMessage: '',
    USER_ROLE,
    fetchFromEndpoint,
    totalStore
  }),

  methods: {
    async getTendersPage() {
      try {
        this.loading = true
        const tendersPageResponse = await axios.get(`${URL_REST_API.HOST}/${URL_REST_API.TENDERS_PAGE}` +
          `?currentPage=${this.plannedPage}&totalTenders=${this.tendersPerPage}`, {
          withCredentials: true,
          headers: {
            'Accept': 'application/json',
          }
        });
        this.totalPages = tendersPageResponse.totalPages
          for (const tender of tendersPageResponse.data.content) {
            if (this.$route.params.role === USER_ROLE.CONTRACTOR) {
            const offerCountResponse = await fetchFromEndpoint(`${URL_REST_API.HOST}/${URL_REST_API.OFFERS_COUNT}/${tender.id}`);
            tender.offersCount = offerCountResponse.data.count;
            } else if (this.$route.params.role === USER_ROLE.BIDDER) {
              const offerStatusResponse = await fetchFromEndpoint(`${URL_REST_API.HOST}/${URL_REST_API.OFFERS_STATUS}/${this.$route.params.userId}/${tender.id}`);
              tender.offerStatus = offerStatusResponse.data.status;
            }
            this.tenders.push(tender);
          };
        if (this.tenders.length == 0) {
          this.isNoTenders = true;
        }
        this.plannedPage++;
        this.loading = false
      } catch (error) {
        console.log('There was an error', error);
      }
    },

    onScroll(e) {
      const currentPage = Math.ceil(e.target.scrollTop / this.bottom);
      if (currentPage === this.plannedPage && !this.loading && this.plannedPage <= this.totalPages) {
        this.getTendersPage()
      }
    }

  },

  mounted() {
    this.getTendersPage();
  }
}
</script>
