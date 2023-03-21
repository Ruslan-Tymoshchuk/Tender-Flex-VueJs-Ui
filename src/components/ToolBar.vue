<template>
 <v-toolbar color="blue">
    <v-row>
      <v-img class="ml-10" max-width="140" src="@/assets/tender-flex-Logo.svg" />
      <v-chip :href="'/module/' +`${this.$route.params.role}` + '/tenders'" class="my-2 ml-12" variant="flat" color="blue-darken-3" text-color="white" prepend-icon="mdi-pulse">
        Tenders {{ tenders }}
      </v-chip>
      <v-chip :href="'/module/' +`${this.$route.params.role}` + '/offers'" class="my-2 ml-10" variant="text" text-color="white" prepend-icon="mdi-message-processing-outline">
        Offers {{ offers }}
      </v-chip>
      <v-spacer></v-spacer>
      <div v-if="this.$route.params.role === 'contractor'">
      <v-btn v-if="this.$route.path !== '/module/contractor/new-tender'" href="/module/contractor/new-tender" variant="flat" color="indigo-darken-4" class="my-3 mr-4" size="small">
        + Create new Tender
      </v-btn>
      </div>
      <v-btn href="/" icon class="mr-6">
        <v-icon>mdi-export</v-icon>
      </v-btn>
      <v-divider class="mt-1" color="black"></v-divider>
    </v-row>
  </v-toolbar>
  <router-view></router-view>
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
    getTotalByModule() {
      fetch(`${restApiConfig.host}${restApiConfig.total}/${this.$route.params.role}`, {
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
    this.getTotalByModule();
  }
}
</script>
