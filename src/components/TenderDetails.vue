<template>
  <v-toolbar color="blue" extended extension-height="100">
    <v-chip href="/contractor-module/tenders-list" style="margin-left: 12rem" variant="text" text-color="white"
      prepend-icon="mdi-keyboard-backspace">Back
    </v-chip>
    <template v-slot:extension>
      <v-container class="px-15">
        <v-toolbar-title class="ml-10 mb-4" style="font-size: 2rem">{{tender.cpvCode}}</v-toolbar-title>
        <v-tabs v-model="tab" height="18" class="mb-15 ml-10" color="indigo-darken-2">
          <v-tab value="offers">Offers</v-tab>
          <v-tab value="tenderDescription">Tender Description</v-tab>
        </v-tabs>
      </v-container>
    </template>
  </v-toolbar>

  <v-window v-model="tab" class="mt-n7 pb-10" >
    <v-window-item value="offers">
      <v-card class="mx-auto" elevation="8" max-width="1000">
        <v-toolbar color="white" height="200">
          <v-toolbar-title class="text-center" style="font-size: 2rem">“There are no received Offers”</v-toolbar-title>
        </v-toolbar>
      </v-card>
    </v-window-item>

    <v-window-item value="tenderDescription">
      <v-card class="mx-auto" elevation="8" max-width="1000">
        <v-toolbar color="white" height="240" class="text-left">
          <v-container class="pa-15">
            <v-toolbar-title class="mb-5">Contractor</v-toolbar-title>
          <v-row class="text-center mx-10">
          <v-col class="text-left">
            <div class="ma-2 details-title">Oficial Name:</div>
            <div class="ma-2 details-title">National Registration Number: </div>
          </v-col>
          <v-col class="text-left">
            <div class="ma-2">{{ tender.organizationName }}</div>
            <div class="ma-2">{{ tender.nationalRegistrationNumber }}</div>
          </v-col>
          <v-col class="text-left">
            <div class="ma-2 details-title">Country:</div>
            <div class="ma-2 details-title">City / Town:</div>
          </v-col>
          <v-col class="text-left">
            <div class="ma-2">{{ tender.country }}</div>
            <div class="ma-2">{{ tender.city }}</div>
          </v-col>
        </v-row>
      </v-container>
      </v-toolbar>
      </v-card>
    </v-window-item>
  </v-window>
</template>

<script>
import { restApiConfig } from "@/rest.api.config"

export default {
  data: () => ({
    tender: {},
    tab: "tenderDescription",
  }),

  methods: {
    getTenderBy(id) {
      fetch(`${restApiConfig.host}${restApiConfig.tenderContractorDetails}/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      })
        .then(response => response.json())
        .then(tenderDetailsResponse => this.tender = tenderDetailsResponse)
    }
  },

  mounted() {
    this.getTenderBy(this.$route.params.id);
  }
}
</script>
