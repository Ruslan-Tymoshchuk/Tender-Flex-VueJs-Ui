<template>
 <v-toolbar color="blue">
    <v-row>
      <v-img class="ml-10" max-width="140" src="@/assets/tender-flex-Logo.svg" />
      <v-chip href="/contractor-module/tenders-list" class="my-2 ml-12" variant="flat" color="blue-darken-3" text-color="white" prepend-icon="mdi-pulse">
        Tenders {{ tenders }}
      </v-chip>
      <v-chip href="/contractor-module/offers-list" class="my-2 ml-10" variant="text" text-color="white" prepend-icon="mdi-message-processing-outline">
        Offers {{ offers }}
      </v-chip>
      <v-spacer></v-spacer>
      <v-btn v-if="route !== '/new-tender'" href="/new-tender" variant="flat" color="indigo-darken-4" class="my-3 mr-4" size="small">
        + Create new Tender
      </v-btn>
      <v-btn icon class="mr-6">
        <v-icon>mdi-export</v-icon>
      </v-btn>
      <v-divider class="mt-1" color="black"></v-divider>
    </v-row>
  </v-toolbar>
 </template>

<script>
import { restApiConfig } from "@/rest.api.config"

export default {
  data: () => ({
    route: '/',
    tenders: 0,
    offers: 0,
  }),

  methods: {
    getTotalByContractor() {
      fetch(`${restApiConfig.host}${restApiConfig.totalByContractor}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      })
        .then(response => response.json())
        .then(response => {
          this.tenders = response.tenders;
          this.offers = response.offers;
        })
        .catch(error => console.log('There was an error', error));
    }
  },

  mounted() {
    this.route = this.$route.path;
    this.getTotalByContractor();
  }
}
</script>
