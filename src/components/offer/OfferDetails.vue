<template>
  <v-toolbar color="blue" extended extension-height="100">
    <v-chip router-link :to="{name: 'offers'}"
    style="margin-left: 12rem" variant="text" text-color="white" prepend-icon="mdi-keyboard-backspace">Back
    </v-chip>
    <template v-slot:extension>
      <v-container class="px-15">
        <v-toolbar-title class="ml-14 mb-15" style="font-size: 1.5rem">{{ offer.companyProfile.officialName
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
              <div class="ma-2">{{ offer.companyProfile.officialName }}</div>
              <div class="ma-2">{{ offer.companyProfile.registrationNumber }}</div>
            </v-col>
            <v-col class="text-left">
              <div class="ma-2 details-title">Country:</div>
              <div class="ma-2 details-title">City / Town:</div>
            </v-col>
            <v-col class="text-left">
              <div class="ma-2">{{ offer.companyProfile.country.name }}</div>
              <div class="ma-2">{{ offer.companyProfile.city }}</div>
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
          <div>{{ offer.companyProfile.contactPerson.firstName }}</div>
          <div class="mt-3">{{ offer.companyProfile.contactPerson.lastName }}</div>
        </v-col>
        <v-col class="text-left mx-2">
          <div class="details-title">Phone number:</div>
        </v-col>
        <v-col class="text-left mx-2">
          <div>{{ `${offer.companyProfile.country.phoneCode}${offer.companyProfile.contactPerson.phoneNumber}` }}</div>
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
          <div>{{ `${offer.currency.code} | ${offer.currency.symbol}` }}</div>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="details-container">
      <v-item-group class="mx-8">
        <v-row>
          <FileVchip
            :fileName="offer.proposition.name"
            :fileKey="offer.proposition.awsS3fileKey"
            @show-file="showFile"
          ></FileVchip>
          </v-row>
      </v-item-group>
    </v-container>

    <v-row class="d-flex justify-end mt-2 mb-10 mr-10">
      <v-col md="3" class="mr-5">
        <v-btn type="submit" block variant="outlined" color="blue" @click="sendRejectDecision">
          Send Reject Decision
        </v-btn>
        </v-col>
      <v-col md="3" class="mr-10">
        <v-btn type="submit" block variant="flat" color="blue" @click="sendAwardDecision">
          Send Award Decision
        </v-btn>
      </v-col>
    </v-row>

    <FileViewerModal
      v-model:isOpen="isOpen"
      @update:isOpen="closeFile"
      :fileUrl="fileUrl"
   ></FileViewerModal>
  </v-container>
</template>

<script>
import { URL_REST_API } from "@/rest.api.endpoints";
import { fetchFromEndpoint, downloadFile } from "@/components/actions";
import FileVchip from "@/components/childs/FileVchip.vue"
import FileViewerModal from "@/components/childs/FileViewerModal.vue"

export default {
  components: {
    FileVchip,
    FileViewerModal
  },

  data: () => ({
    fetchFromEndpoint,
    downloadFile,
    role: '',
    offer: {
      companyProfile: {
        country: {},
        contactPerson: {}
      },
      currency: {},
      proposition: {}
    },
    isOpen: false,
    fileUrl: '',
  }),

  methods: {
    async showFile(isOpen, fileKey, callback) {
      try {
        const response = await downloadFile(fileKey);
        this.fileUrl = URL.createObjectURL(response.data);
        this.isOpen = isOpen;
      } catch (error) {
        console.error("File download failed:", error);
      } finally {
        if (callback) callback();
      }
    },

    closeFile() {
      if (this.fileUrl) {
        URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = null;
      }
      this.isOpen = false;
    },

    sendAwardDecision(){
      fetch(`${URL_REST_API.HOST}${URL_REST_API.awardDecision}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          offerId: this.offerId,
          awardDecisionFileName: this.$route.params.award,
        })
      })
        .then(() => this.$router.push({ name: "tenders", params: { role: this.role } }))
        .catch(error => console.log('There was an error', error));
    },

    sendRejectDecision(){
      fetch(`${URL_REST_API.HOST}${URL_REST_API.rejectDecision}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          offerId: this.offerId,
          rejectDecisionFileName: this.$route.params.reject,
        })
      })
        .then(() => this.$router.push({ name: "tenders", params: { role: this.role } }))
        .catch(error => console.log('There was an error', error));
    }
  },

  async mounted() {
    this.role = this.$route.params.role
    this.offerId = this.$route.params.id
    const offerResponse = await fetchFromEndpoint(`${URL_REST_API.HOST}/${URL_REST_API.OFFERS}/${this.$route.params.offerId}`);
    this.offer = offerResponse.data;
  }
}
</script>
