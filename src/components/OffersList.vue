<template>
  <v-toolbar color="blue" extended extension-height="100">
    <template v-slot:extension>
      <v-container class="px-15">
        <v-toolbar-title class="ml-10 mb-15" style="font-size: 2rem">Offers</v-toolbar-title>
      </v-container>
    </template>
  </v-toolbar>

  <v-card class="mx-auto mt-n7" elevation="8" max-width="1000">
    <v-toolbar color="primary" height="28" class="text-left">
      <v-col class="v-col-2">Oficial Name</v-col>
      <v-col class="v-col-2">Field</v-col>
      <v-col class="v-col-2">Price</v-col>
      <v-col class="v-col-2">Country</v-col>
      <v-col class="v-col-2">Received Date</v-col>
      <v-col class="v-col-3">Status</v-col>
    </v-toolbar>
    <v-container id="scroll-target" style="max-height: 20rem" class="overflow-y-auto" v-scroll:#scroll-target="onScroll">
      <v-table>
        <tbody>
          <tr v-for="offer in receivedOffers" :key="offer.offerId">
            <td class="v-col-2 text-left" @click="getOfferById(offer.offerId)">{{ offer.organizationNameByBidder }} </td>
            <td class="v-col-2 text-left">{{ offer.spvCode }}</td>
            <td class="v-col-2 text-left">{{ offer.price }}</td>
            <td class="v-col-2 text-left">{{ offer.country }}</td>
            <td class="v-col-2 text-left">{{ offer.date }}</td>
            <td class="v-col-3 text-right"> {{ offer.status }} </td>
          </tr>
        </tbody>
      </v-table>
    </v-container>
  </v-card>
</template>

<script>
import { restApiConfig } from "@/rest.api.config"

export default {
  data: () => ({
    receivedOffers: [],
    totalPages: 1,
    plannedPage: 1,
    offersPerPage: 10,
    loading: false,
  }),

  methods: {
    getReceivedOffers() {
      this.loading = true
      fetch(`${restApiConfig.host}${restApiConfig.offersByContractor}?currentPage=${this.plannedPage}&totalOffers=${this.offersPerPage}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      })
        .then(response => response.json())
        .then(responseData => {
          this.totalPages = responseData.totalPages
          responseData.content.forEach(offer => this.receivedOffers.push(offer))
          this.plannedPage++;
          this.loading = false
        }).catch(error => console.log('There was an error', error));
    },

    onScroll(e) {
      const currentPage = Math.ceil(e.target.scrollTop / 230);
      if (currentPage === this.plannedPage && !this.loading && this.plannedPage <= this.totalPages) {
        this.getReceivedOffers()
      }
    },
  },

  mounted() {
    this.getReceivedOffers();
  }
}
</script>
