<template>
  <v-toolbar color="blue" extended extension-height="100">
    <template v-slot:extension>
      <v-container class="px-15">
        <v-toolbar-title class="ml-10 mb-15" style="font-size: 2rem">{{ title }}</v-toolbar-title>
      </v-container>
    </template>
  </v-toolbar>

  <v-card class="mt-n7 mx-auto" elevation="8" max-width="1000">
  <div v-if="isHasNoTenders">
      <v-toolbar color="white" height="200">
        <v-toolbar-title class="text-center" style="font-size: 2rem">{{ noTendersMessage }}</v-toolbar-title>
      </v-toolbar>
    </div>

  <div v-if="isTenders">
    <div v-if="`${this.$route.params.role}` === 'contractor'">
    <v-toolbar color="primary" height="28" class="text-left">
      <v-col class="v-col-5">Field</v-col>
      <v-col class="v-col-2">Oficial Name</v-col>
      <v-col class="v-col-2">Status</v-col>
      <v-col class="v-col-2">Deadline</v-col>
      <v-col class="v-col-2">Offers</v-col>
    </v-toolbar>
    <v-container id="scroll-target" style="max-height: 25rem" class="overflow-y-auto" v-scroll:#scroll-target="onScroll">
      <v-table>
        <tbody>
          <tr class="table" v-for="tender in tenders" :key="tender.id" >
            <td class="v-col-5 text-left">
             <div class="cpv-code" @click="getTenderById(tender.id, 'received_offers', tender.offValue)">{{ tender.cpvCode }}</div>
             <strong>{{ tender.cpvDescription }}</strong>
            </td>
            <td class="v-col-2 text-left">{{ tender.officialName }}</td>
            <td class="v-col-2 text-left">{{ tenderStatus[tender.status] }}</td>
            <td class="v-col-2 text-left">{{ tender.deadline }}</td>
            <td class="v-col-2 text-right">
              <div v-if="tender.status === 'TENDER_IN_PROGRESS'">{{ tender.offersCount }}</div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-container>
  </div>
  <div v-if="`${this.$route.params.role}` === 'bidder'">
    <v-toolbar color="primary" height="28" class="text-left">
      <v-col class="v-col-4">Field</v-col>
      <v-col class="v-col-2">Contractor Name</v-col>
      <v-col class="v-col-2">Tender Status</v-col>
      <v-col class="v-col-2">Deadline</v-col>
      <v-col class="v-col-2">Offer Status</v-col>
    </v-toolbar>
    <v-container id="scroll-target" style="max-height: 25rem" class="overflow-y-auto" v-scroll:#scroll-target="onScroll">
      <v-table>
        <tbody>
          <tr class="table" v-for="tender in tenders" :key="tender.id">
            <td class="v-col-4 text-left" :class="{ 'table-row-disabled': tender.offValue === 'OFFER_SENT_TO_CONTRACTOR' }" >
             <div class="cpv-code" @click="getTenderById(tender.id, 'offer_status', tender.offValue)">{{ tender.cpvCode }}</div>
             <strong>{{ tender.cpvDescription }}</strong>
           </td>
            <td class="v-col-2 text-left">{{ tender.officialName }}</td>
            <td class="v-col-2 text-left">{{ tenderStatus[tender.status] }}</td>
            <td class="v-col-2 text-left">{{ tender.deadline }}</td>
            <td class="v-col-2 text-left"> {{ offerStatus[tender.offValue] }} </td>
          </tr>
        </tbody>
      </v-table>
    </v-container>
  </div>
  </div>
</v-card>
</template>

<script>
import { restApiEndpoints } from "@/rest.api.endpoints"
import { tenderStatus, offerStatus } from "@/components/constants"
import { fetchFromEndpoint, totalStore } from "@/components/actions"
import axios from "axios";

export default {
  data: () => ({
    loading: false,
    bottom: 232,
    plannedPage: 1,
    tendersPerPage: 10,
    totalPages: 1,
    tenders: 0,
    offers: 0,
    tenders: [],
    isTenders: false,
    isHasNoTenders: false,
    noTendersMessage: '',
    title: '',
    tenderStatus,
    offerStatus,
    restApiEndpoints,
    fetchFromEndpoint,
    totalStore
  }),

  methods: {
    async getTenders() {
      try {
        this.loading = true
        const response = await axios.get(`${restApiEndpoints.host}${restApiEndpoints.tenders}` +
          `?currentPage=${this.plannedPage}&totalTenders=${this.tendersPerPage}`, {
          withCredentials: true,
          headers: {
            'Accept': 'application/json',
          }
        });
        this.totalPages = response.totalPages
        for (const tender of response.data.content) {
          const response = await fetchFromEndpoint(`${restApiEndpoints.offersCount}`);
          tender.offersCount = response.data.bidCount;
          this.tenders.push(tender);
        };
        if (this.tenders.length > 0) {
          this.isTenders = true;
        } else {
          this.isHasNoTenders = true;
        }
        this.plannedPage++;
        this.loading = false
      } catch (error) {
        console.log('There was an error', error);
      }
    },

    onScroll(e) {
      const currentPage = Math.ceil(e.target.scrollTop / 285);
      if (currentPage === this.plannedPage && !this.loading && this.plannedPage <= this.totalPages) {
        this.getTenders()
      }
    },

    getTenderById(id, parametr, value) {
      this.$router.push({ name: "tender-details", params: { id: id }, query: { [parametr]: value } });
    }
  },

  mounted() {
    this.getTenders();
    if (this.$route.params.role === "contractor") {
        this.noTendersMessage = "“There are no published Tenders. Create a Tender.”"
        this.title = "My Tenders"
    } else if (this.$route.params.role === "bidder"){
        this.noTendersMessage = "“There are no available Tenders.”"
        this.title = "Tenders"
    }
  }
}
</script>
