<template>
  <v-toolbar color="blue" extended extension-height="100">
    <v-chip href="/contractor-module/tenders-list" style="margin-left: 12rem" variant="text" text-color="white"
      prepend-icon="mdi-keyboard-backspace">Back
    </v-chip>
    <template v-slot:extension>
      <v-container class="px-15">
        <v-toolbar-title class="ml-14 mb-15" style="font-size: 1.5rem">{{ offer.organizationNameByBidder
        }}</v-toolbar-title>
      </v-container>
    </template>
  </v-toolbar>

  <v-container class="mb-10">
    <v-card class="mx-auto mt-n11" elevation="8" max-width="1000">
      <v-toolbar color="white" height="240" class="text-left">
        <v-container class="pa-15">
          <v-toolbar-title class="mb-5">Bidder</v-toolbar-title>
          <v-row class="text-center mx-10">
            <v-col class="text-left">
              <div class="ma-2 details-title">Oficial Name:</div>
              <div class="ma-2 details-title">National Registration Number: </div>
            </v-col>
            <v-col class="text-left">
              <div class="ma-2">{{ offer.organizationNameByBidder }}</div>
              <div class="ma-2">{{ offer.nationalRegistrationNumber }}</div>
            </v-col>
            <v-col class="text-left">
              <div class="ma-2 details-title">Country:</div>
              <div class="ma-2 details-title">City / Town:</div>
            </v-col>
            <v-col class="text-left">
              <div class="ma-2">{{ offer.country }}</div>
              <div class="ma-2">{{ offer.city }}</div>
            </v-col>
          </v-row>
        </v-container>
      </v-toolbar>
    </v-card>

    <v-container class="d-flex align-center details-container">
      <p class="chapter-label">Contact person</p>
      <div class="horizontal-divider-details"></div>
    </v-container>

    <v-container class="details-container">
      <v-row class="text-center mx-10">
        <v-col class="text-left mx-2">
          <div class="details-title">Name:</div>
          <div class="mt-3 details-title">Surname:</div>
        </v-col>
        <v-col class="text-left mx-2">
          <div>{{ offer.firstName }}</div>
          <div class="mt-3">{{ offer.lastName }}</div>
        </v-col>
        <v-col class="text-left mx-2">
          <div class="details-title">Phone number:</div>
        </v-col>
        <v-col class="text-left mx-2">
          <div>{{ offer.phone }}</div>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="d-flex align-center details-container">
      <p class="chapter-label">Price</p>
      <div class="horizontal-divider-details"></div>
    </v-container>

    <v-container class="details-container">
      <v-row class="text-center mx-10">
        <v-col class="text-left mx-2">
          <div class="details-title">Bid Price:</div>
        </v-col>
        <v-col class="text-left mx-2">
          <div>{{ offer.bidPrice }}</div>
        </v-col>
        <v-col class="text-left mx-2">
          <div class="details-title">Currency:</div>
        </v-col>
        <v-col class="text-left mx-2">
          <div>{{ offer.currency }}</div>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="details-container">
      <v-item-group class="mx-8">
        <v-row>
          <v-item>
            <v-chip size="large" class="mb-6" color="blue" prepend-icon="mdi-file-document-multiple-outline" label>
              <div id="text" style="width: 50rem" @click="openDialog(document)"> {{ "document.name" }} </div>
            </v-chip></v-item>
        </v-row>
      </v-item-group>
    </v-container>

    <v-dialog v-model="dialog" width="auto">
      <v-card>
        <iframe :src=documentUrl width="800" height="500">
        </iframe>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row class="d-flex justify-end mt-2 mb-10 mr-10">
      <v-col md="3" class="mr-5">
        <v-btn type="submit" block variant="outlined" color="blue" @click="sendRejectDecision = true">
          Send Reject Decision
        </v-btn>
        </v-col>
      <v-col md="3" class="mr-10">
        <v-btn type="submit" block variant="flat" color="blue" @click="sendAwardDecision">
          Send Award Decision
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { restApiConfig } from "@/rest.api.config"

export default {
  data: () => ({
    offer: {},
    document: null,
    dialog: false,
    documentUrl: '',
  }),

  methods: {
    getOfferById() {
      fetch(`${restApiConfig.host}${restApiConfig.offerDetails}/${this.$route.params.id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      })
        .then(response => response.json())
        .then(offerDetailsResponse => this.offer = offerDetailsResponse)
        .catch(error => console.log('There was an error', error));
    },

    openDialog(document) {
      this.dialog = true;
    },
  },

  mounted() {
    this.getOfferById();
  }
}
</script>