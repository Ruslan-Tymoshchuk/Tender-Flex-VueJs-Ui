<template>
  <v-toolbar color="blue" extended extension-height="100">
    <v-chip href="/contractor-module/tenders-list" style="margin-left: 12rem" variant="text" text-color="white"
      prepend-icon="mdi-keyboard-backspace">Back
    </v-chip>
    <template v-slot:extension>
      <v-container class="px-15">
        <v-toolbar-title class="ml-10 mb-4" style="font-size: 2rem">Tender Details</v-toolbar-title>
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
        <v-toolbar color="white" height="200" class="text-left"></v-toolbar>
      </v-card>
    </v-window-item>
  </v-window>
</template>

<script>
import { restApiConfig } from "@/rest.api.config"

export default {
  data: () => ({
    tender: null,
    tab: "tenderDescription",
  }),

  methods: {
    getTenderBy(id) {
      fetch(`${restApiConfig.host}${restApiConfig.tenderDetails}/${id}`, {
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
