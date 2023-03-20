<template>
  <v-toolbar color="blue" extended extension-height="100">
    <v-chip href="/contractor-module/tenders-list" style="margin-left: 12rem" variant="text" text-color="white"
      prepend-icon="mdi-keyboard-backspace">Back
    </v-chip>
    <template v-slot:extension>
      <v-container class="px-15">
        <v-toolbar-title class="ml-14 mb-4" style="font-size: 1.5rem">{{ tender.cpvCode }}</v-toolbar-title>
        <v-tabs v-model="tab" height="18" class="mb-15 ml-10" color="indigo-darken-2">
          <v-tab v-if="isOffers" value="offers">Offers</v-tab>
          <v-tab value="tenderDescription">Tender Description</v-tab>
        </v-tabs>
      </v-container>
    </template>
  </v-toolbar>

  <v-window v-model="tab" class="mt-n7 pb-10">

    <v-window-item value="offers">
        <v-card class="mx-auto" elevation="8" max-width="1000">
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
                <tr v-for="offer in offersByTender" :key="offer.offerId">
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
            <div>{{ tender.firstName }}</div>
            <div class="mt-3">{{ tender.lastName }}</div>
          </v-col>
          <v-col class="text-left mx-2">
            <div class="details-title">Phone number:</div>
          </v-col>
          <v-col class="text-left mx-2">
            <div>{{ tender.phone }}</div>
          </v-col>
        </v-row>
      </v-container>

      <v-container class="d-flex align-center details-container">
        <p class="chapter-label">Procedure</p>
        <div class="horizontal-divider-details"></div>
      </v-container>

      <v-container class="details-container">
        <v-row class="text-center mx-10">
          <v-col class="text-left mx-2">
            <div class="details-title">Procedure:</div>
          </v-col>
          <v-col class="text-left mx-2">
            <div>{{ tender.procedure }}</div>
          </v-col>
          <v-col class="text-left mx-2">
            <div class="details-title">Language:</div>
          </v-col>
          <v-col class="text-left mx-2">
            <div>{{ tender.language }}</div>
          </v-col>
        </v-row>
      </v-container>

      <v-container class="d-flex align-center details-container">
        <p class="chapter-label">Subject matter of the procurement</p>
        <div class="horizontal-divider-details"></div>
      </v-container>

      <v-container class="details-container">
        <v-row class="text-center mx-10">
          <v-col class="text-left mx-2">
            <div class="details-title">CPV Code:</div>
            <div class="mt-3 details-title">Min Tender Value:</div>
            <div class="mt-3 details-title">Currency:</div>
          </v-col>
          <v-col class="text-left mx-2">
            <div>{{ tender.cpvCode }}</div>
            <div class="mt-3">{{ tender.minTenderValue }}</div>
            <div class="mt-3">{{ tender.currency }}</div>
          </v-col>
          <v-col class="text-left mx-2">
            <div class="details-title">Type of Tender:</div>
            <div class="mt-3 details-title">Max Tender Value:</div>
            <div class="mt-3 details-title">Description:</div>
          </v-col>
          <v-col class="text-left mx-2">
            <div>{{ tender.type }}</div>
            <div class="mt-3">{{ tender.maxTenderValue }}</div>
            <div class="mt-3">{{ tender.description }}</div>
          </v-col>
        </v-row>
      </v-container>

      <v-container class="d-flex align-center details-container">
        <p class="chapter-label">Date</p>
        <div class="horizontal-divider-details"></div>
      </v-container>

      <v-container class="details-container">
        <v-row class="text-center mx-10">
          <v-col class="text-left mx-2">
            <div class="details-title">Publication Date:</div>
            <div class="mt-3 details-title">Deadline for Signed Contract Submission:</div>
          </v-col>
          <v-col class="text-left mx-2">
            <div>{{ tender.tenderPublicationDate }}</div>
            <div class="mt-3">{{ tender.deadlineForSignedContractSubmission }}</div>
          </v-col>
          <v-col class="text-left mx-2">
            <div class="details-title">Deadline for Offer Submission:</div>
          </v-col>
          <v-col class="text-left mx-2">
            <div>{{ tender.deadlineForOfferSubmission }}</div>
          </v-col>
        </v-row>
      </v-container>

      <v-container class="d-flex align-center details-container">
        <p class="chapter-label">Documents</p>
        <div class="horizontal-divider-details"></div>
      </v-container>

      <v-container class="details-container">
      <v-item-group class="mx-8">
          <v-row>
            <v-item>
              <v-chip
                size="large"
                class="mb-6"
                color="blue"
                prepend-icon="mdi-file-document-multiple-outline"
                label
              ><div
                id="text"
                style="width: 50rem"
                @click="openDialog(tender.contractFileName)"
              > {{ getOriginalFileName(tender.contractFileName) }} </div>
              </v-chip
              ></v-item>
           </v-row>
          <v-row>
            <v-item>
              <v-chip
                size="large"
                class="mb-6"
                color="blue"
                prepend-icon="mdi-file-document-multiple-outline"
                label
              ><div
                id="text"
                style="width: 50rem"
                @click="openDialog(tender.awardDecisionFileName)"
              > {{ getOriginalFileName(tender.awardDecisionFileName) }} </div>
              </v-chip>
            </v-item>
          </v-row>
          <v-row>
            <v-item>
              <v-chip
                size="large"
                class="mb-6"
                color="blue"
                prepend-icon="mdi-file-document-multiple-outline"
                label
              ><div
                id="text"
                style="width: 50rem"
                @click="openDialog(tender.rejectDecisionFileName)"
              > {{ getOriginalFileName(tender.rejectDecisionFileName) }} </div>
              </v-chip>
            </v-item>
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
    </v-window-item>

  </v-window>
</template>

<script>
import { restApiConfig } from "@/rest.api.config"

export default {
  data: () => ({
    tender: {
      contractFileName: '',
      awardDecisionFileName: '',
      rejectDecisionFileName: '',
    },
    tab: "tenderDescription",
    dialog: false,
    documentUrl: '',
    offersByTender: [],
    totalPages: 1,
    plannedPage: 1,
    offersPerPage: 10,
    loading: false,
    isOffers: false,
  }),

  methods: {
    getTenderById() {
      fetch(`${restApiConfig.host}${restApiConfig.tenderContractorDetails}/${this.$route.params.id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      })
        .then(response => response.json())
        .then(tenderDetailsResponse => this.tender = tenderDetailsResponse)
        .catch(error => console.log('There was an error', error));
    },

    getOffersByTender() {
      this.loading = true
      fetch(`${restApiConfig.host}${restApiConfig.offersByTender}/
             ${this.$route.params.id}?currentPage=${this.plannedPage}&totalOffers=${this.offersPerPage}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      })
        .then(response => response.json())
        .then(responseData => {
          this.totalPages = responseData.totalPages
          responseData.content.forEach(offer => this.offersByTender.push(offer))
          this.plannedPage++;
          if (this.offersByTender.length > 0) {
            this.isOffers = true;
          }
          this.loading = false
        }).catch(error => console.log('There was an error', error));
    },

    getOfferById(id){
      this.$router.push({ name: "offer-details", params: { id: id } });
    },

    onScroll(e) {
      const currentPage = Math.ceil(e.target.scrollTop / 230);
      if (currentPage === this.plannedPage && !this.loading && this.plannedPage <= this.totalPages) {
        this.getOffersByTender()
      }
    },

    getOriginalFileName(uniqueFileName){
      return uniqueFileName.substring(37);
    },

    openDialog(documentName) {
      fetch(`${restApiConfig.host}${restApiConfig.presignedUrl}/${documentName}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      })
        .then(response => response.json())
        .then(responseData => {
          this.documentUrl = responseData.fileUrl
          this.dialog = true;
        })
        .catch(error => console.log('There was an error', error));
    }
  },

  mounted() {
    this.getTenderById();
    this.getOffersByTender();
  }
}
</script>
