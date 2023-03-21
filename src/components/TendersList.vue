<template>
  <v-toolbar color="blue" extended extension-height="100">
    <template v-slot:extension>
      <v-container class="px-15">
        <v-toolbar-title class="ml-10 mb-15" style="font-size: 2rem">My Tenders</v-toolbar-title>
      </v-container>
    </template>
  </v-toolbar>

  <v-card class="mt-n7 mx-auto" elevation="8" max-width="1000">
  <div v-if="!isTenders">
      <v-toolbar color="white" height="200">
        <v-toolbar-title class="text-center" style="font-size: 2rem">{{ noTendersMessage }}</v-toolbar-title>
      </v-toolbar>
    </div>

  <div v-if="isTenders">
    <v-toolbar color="primary" height="28" class="text-left">
      <v-col class="v-col-5">Field</v-col>
      <v-col class="v-col-2">Oficial Name</v-col>
      <v-col class="v-col-2">Status</v-col>
      <v-col class="v-col-2">Deadline</v-col>
      <v-col class="v-col-2">Offers</v-col>
    </v-toolbar>
    <v-container id="scroll-target" style="max-height: 20rem" class="overflow-y-auto" v-scroll:#scroll-target="onScroll">
      <v-table>
        <tbody>
          <tr v-for="tender in tenders" :key="tender.tenderId">
            <td class="v-col-5 text-left" @click="getTenderById(tender.tenderId)">{{ tender.cpvCode }} </td>
            <td class="v-col-2 text-left">{{ tender.organizationName }}</td>
            <td class="v-col-2 text-left">{{ tender.status }}</td>
            <td class="v-col-2 text-left">{{ tender.deadline }}</td>
            <td class="v-col-2 text-right"> {{ tender.offersAmount }} </td>
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
    loading: false,
    bottom: 232,
    plannedPage: 1,
    tendersPerPage: 10,
    totalPages: 1,
    tenders: 0,
    offers: 0,
    tenders: [],
    isTenders: false,
    noTendersMessage: '',
  }),

  methods: {
    getTenders() {
      this.loading = true
      fetch(`${restApiConfig.host}${restApiConfig.tendersList}/${this.$route.params.role}` +
            `?currentPage=${this.plannedPage}&totalTenders=${this.tendersPerPage}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      })
        .then(response => response.json())
        .then(responseData => {
          this.totalPages = responseData.totalPages
          responseData.content.forEach(tender => this.tenders.push(tender))
          if (this.tenders.length > 0) {
            this.isTenders = true;
          }
          this.plannedPage++;
          this.loading = false
        }).catch(error => console.log('There was an error', error));
    },

    onScroll(e) {
      const currentPage = Math.ceil(e.target.scrollTop / 230);
      if (currentPage === this.plannedPage && !this.loading && this.plannedPage <= this.totalPages) {
        this.getTenders()
      }
    },

    getTenderById(id) {
      this.$router.push({ name: "tender-details", params: { id: id } });
    }
  },

  mounted() {
    this.getTenders();
    if (this.$route.params.role === "contractor") {
        this.noTendersMessage = "“There are no published Tenders. Create a Tender.”"
    } else if (this.$route.params.role === "bidder"){
        this.noTendersMessage = "“There are no available Tenders.”"
    }
  }
}
</script>
