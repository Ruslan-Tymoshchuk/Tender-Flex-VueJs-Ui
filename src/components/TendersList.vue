<template>
  <v-toolbar color="blue" extended extension-height="170">
    <v-row>
      <v-img class="ml-10" max-width="140" src="@/assets/tender-flex-Logo.svg" />
      <v-chip class="my-2 ml-12" variant="flat" color="blue-darken-3" text-color="white" prepend-icon="mdi-pulse">
        Tenders {{ tenders }}
      </v-chip>
      <v-chip class="my-2 ml-10" variant="text" text-color="white" prepend-icon="mdi-message-processing-outline">
        Offers {{ offers }}
      </v-chip>
      <v-spacer></v-spacer>
      <v-btn href="/new-tender" variant="flat" color="indigo-darken-4" class="my-3 mr-4" size="small">
        + Create new Tender
      </v-btn>
      <v-btn icon class="mr-6">
        <v-icon>mdi-export</v-icon>
      </v-btn>
      <v-divider class="mt-1" color="black"></v-divider>
    </v-row>
    <template v-slot:extension>
      <v-container class="px-15">
        <v-toolbar-title class="mx-10 mb-10" style="font-size: 2rem">My Tenders</v-toolbar-title>
      </v-container>
    </template>
  </v-toolbar>

  <v-card class="mt-n7 mx-auto" elevation="8" max-width="1000">
    <v-container class="pa-10">

    </v-container>
  </v-card>
</template>

<script>
import { restApiConfig } from "@/rest.api.config"

export default {
  data: () => ({
    tenders: 0,
    offers: 0
  }),

  methods: {
    getTendersAmountByContractor() {
      fetch(`${restApiConfig.host}${restApiConfig.amountTendersByContractor}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      })
        .then(response => response.json())
        .then(tendersAmount => this.tenders = tendersAmount)
    },
  },

  mounted() {
    this.getTendersAmountByContractor();
  }
}
</script>
