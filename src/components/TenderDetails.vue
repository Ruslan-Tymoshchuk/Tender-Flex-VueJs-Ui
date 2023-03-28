<template>
  <v-toolbar color="blue" extended extension-height="100">
    <v-chip @click="goByLink(`/module/${this.role}/tenders`)" style="margin-left: 12rem" variant="text" text-color="white"
      prepend-icon="mdi-keyboard-backspace">Back
    </v-chip>
    <template v-slot:extension>
      <v-container class="px-15">
        <v-toolbar-title class="ml-14 mb-4" style="font-size: 1.5rem">{{ tender.cpvCode }}</v-toolbar-title>
        <v-tabs v-model="tab" height="30" class="mb-10 ml-12" color="cyan-accent-2">
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
            <v-col class="v-col-2 ml-2">Oficial Name</v-col>
            <v-col class="v-col-2 ml-4 mr-10">Field</v-col>
            <v-col class="v-col-1 ml-14 mr-0">Price</v-col>
            <v-col class="v-col-1 ml-1">Country</v-col>
            <v-col class="v-col-2 ml-2 mr-4">Received Date</v-col>
            <v-col class="v-col-2 ml-15">Status</v-col>
        </v-toolbar>
          <v-container id="scroll-target" style="max-height: 25rem" class="overflow-y-auto" v-scroll:#scroll-target="onScroll">
            <v-table>
              <tbody>
                  <tr class="table" v-for="offer in offersByTender" :key="offer.offerId">
                    <td class="v-col-2 text-left cpv">
                   <div>
                    <label class="cpv-code" @click="getOfferById(offer.offerId)">
                      <strong>{{ offer.organizationNameByBidder }}</strong>
                    </label>
                   </div>
                   </td>
                    <td class="v-col-3 text-left">{{ offer.fieldOfTheTender }}</td>
                    <td class="v-col-1 text-left">{{ offer.price }}</td>
                    <td class="v-col-1 text-left">{{ offer.country }}</td>
                    <td class="v-col-2 text-left">{{ offer.date }}</td>
                    <td class="v-col-2 text-right"> {{ offer.contractorSt }} </td>
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
                class="mb-5"
                color="blue"
                prepend-icon="mdi-file-document-multiple-outline"
                label
                @click="openDialog(tender.contractFileName)"
              ><div
                id="text"
                style="width: 50rem"
                > {{ getOriginalFileName(tender.contractFileName) }} </div>
              </v-chip
              ></v-item>
           </v-row>
          <div v-if="role === 'contractor'" class="mt-4">
          <v-row>
            <v-item>
              <v-chip
                size="large"
                class="mb-6"
                color="blue"
                prepend-icon="mdi-file-document-multiple-outline"
                label
                @click="openDialog(tender.awardDecisionFileName)"
              ><div
                id="text"
                style="width: 50rem"
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
                @click="openDialog(tender.rejectDecisionFileName)"
              ><div
                id="text"
                style="width: 50rem"
              > {{ getOriginalFileName(tender.rejectDecisionFileName) }} </div>
              </v-chip>
            </v-item>
          </v-row>
        </div>
        </v-item-group>
        <div v-if="role ==='bidder' && tender.offerStatus === 'Offer has not sent'">
        <v-row class="d-flex justify-end mt-5 mb-10 mr-2">
            <v-col md="3">
             <v-btn type="submit" block variant="flat" color="blue" @click="createOffer(tenderId)">
              + Create Offer
             </v-btn>
           </v-col>
           </v-row>
        </div>
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
import { getOriginalFileName } from "@/components/actions";

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
    role: '',
    tenderId: 0,
    getOriginalFileName
  }),

  methods: {
    getTenderById() {
      fetch(`${restApiConfig.host}${restApiConfig.tenderDetails}/` +
            `${this.$route.params.role}/${this.tenderId}`, {
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
      fetch(`${restApiConfig.host}${restApiConfig.offersList}/${this.$route.params.id}` +
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
          responseData.content.forEach(offer => this.offersByTender.push(offer))
          this.plannedPage++;
          if (this.offersByTender.length > 0) {
            this.isOffers = true;
          }
          this.loading = false
        }).catch(error => console.log('There was an error', error));
    },

    getOfferById(id){
      this.$router.push({ name: "offer-details",
                          params: { id: id, award: this.tender.awardDecisionFileName,
                                    reject: this.tender.rejectDecisionFileName } });
    },

    onScroll(e) {
      const currentPage = Math.ceil(e.target.scrollTop / 290);
      if (currentPage === this.plannedPage && !this.loading && this.plannedPage <= this.totalPages) {
        this.getOffersByTender()
      }
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
    },

    createOffer(tenderId){
      this.$router.push({ name: "new-offer", params: { tender_id: tenderId } });
    },

    goByLink(link) {
      this.$router.push(link)
    }
  },

  mounted() {
    this.role = this.$route.params.role
    this.tenderId = this.$route.params.id
    this.getTenderById();
    if (this.role === 'contractor') {
      this.getOffersByTender();
    }
  }
}
</script>
