<template>
  <v-toolbar color="blue" extended extension-height="100">
    <template v-slot:extension>
      <v-container class="px-15">
        <v-toolbar-title class="ml-10 mb-15" style="font-size: 2rem">Offers</v-toolbar-title>
      </v-container>
    </template>
  </v-toolbar>

  <v-card class="mx-auto mt-n7" elevation="8" max-width="1000">

    <div v-if="!isOffers">
      <v-toolbar color="white" height="200">
        <v-toolbar-title class="text-center" style="font-size: 2rem">{{ noOffersMessage }}</v-toolbar-title>
      </v-toolbar>
    </div>

    <div v-if="isOffers">
      <v-toolbar color="primary" height="28" class="text-left">
        <v-col class="v-col-2">Oficial Name</v-col>
        <v-col class="v-col-2">Field</v-col>
        <v-col class="v-col-2">Price</v-col>
        <v-col class="v-col-2">Country</v-col>
        <v-col class="v-col-2">Received Date</v-col>
        <v-col class="v-col-3">Status</v-col>
      </v-toolbar>
      <v-container id="scroll-target" style="max-height: 20rem" class="overflow-y-auto"
        v-scroll:#scroll-target="onScroll">
        <v-table>
          <tbody>
            <tr v-for="offer in offers" :key="offer.offerId">
              <td v-if="this.role === 'bidder'" class="v-col-2 text-left" @click="getOfferById(offer.offerId)">{{ offer.organizationNameByBidder }}</td>
              <td v-if="this.role === 'contractor'" class="v-col-2 text-left">{{ offer.organizationNameByBidder }}</td>
              <td class="v-col-2 text-left">{{ offer.fieldOfTheTender }}</td>
              <td class="v-col-2 text-left">{{ offer.price }}</td>
              <td class="v-col-2 text-left">{{ offer.country }}</td>
              <td class="v-col-2 text-left">{{ offer.date }}</td>
              <td v-if="this.role === 'bidder'" class="v-col-3 text-right"> {{ offer.bidderSt }} </td>
              <td v-if="this.role === 'contractor'" class="v-col-3 text-right"> {{ offer.contractorSt }} </td>
            </tr>
          </tbody>
        </v-table>
      </v-container>
    </div>

  </v-card>
</template>

<script>
import { restApiConfig } from "@/rest.api.config"

export default {
  data: () => ({
    role: '',
    offers: [],
    totalPages: 1,
    plannedPage: 1,
    offersPerPage: 10,
    loading: false,
    isOffers: false,
    noOffersMessage: '',
  }),

  methods: {
    getOffersList() {
      this.loading = true
      fetch(`${restApiConfig.host}${restApiConfig.offersList}/${this.$route.params.role}` +
      `?currentPage=${this.plannedPage}&totalOffers=${this.offersPerPage}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      })
        .then(response => response.json())
        .then(responseData => {
          this.totalPages = responseData.totalPages
          responseData.content.forEach(offer => this.offers.push(offer))
          if (this.offers.length > 0) {
            this.isOffers = true;
          }
          this.plannedPage++;
          this.loading = false
        }).catch(error => console.log('There was an error', error));
    },

    onScroll(e) {
      const currentPage = Math.ceil(e.target.scrollTop / 230);
      if (currentPage === this.plannedPage && !this.loading && this.plannedPage <= this.totalPages) {
        this.getOffersList()
      }
    },

    getOfferById(id){
      this.$router.push({ name: "myoffer-details", params: { id: id } });
    },
  },

  mounted() {
    this.getOffersList();
    this.role = this.$route.params.role;
    if (this.role === "contractor") {
        this.noOffersMessage = "“There are no received Offers”"
    } else if (this.role === "bidder"){
        this.noOffersMessage = "“There are no sent Offers in your list”"
    }
  }
}
</script>
