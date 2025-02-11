<template>
  <v-toolbar color="blue" extended extension-height="100">
    <v-chip router-link :to="{ name: 'tenders' }" style="margin-left: 12rem" variant="text" text-color="white"
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
          <v-container id="scroll-target" style="max-height: 25rem" class="overflow-y-auto">
            <v-table>
              <tbody>
                  <tr class="table" v-for="offer in tender.offers" :key="offer.offerId">
                    <td class="v-col-2 text-left cpv">
                   <div>
                    <label class="cpv-code" @click="getOfferById(offer.offerId)">
                      <strong>{{ offer.bidderOficialName }}</strong>
                    </label>
                   </div>
                   </td>
                    <td class="v-col-3 text-left">{{ offer.fieldOfTheTender }}</td>
                    <td class="v-col-1 text-left">{{ `${offer.currency}.${offer.price}` }}</td>
                    <td class="v-col-1 text-left">{{ offer.country }}</td>
                    <td class="v-col-2 text-left">{{ offer.date }}</td>
                    <td class="v-col-2 text-right"> {{ offerStatus[offer.status] }} </td>
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
                <div class="ma-2">{{ tender.companyProfile.officialName }}</div>
                <div class="ma-2">{{ tender.companyProfile.registrationNumber }}</div>
              </v-col>
              <v-col class="text-left">
                <div class="ma-2 details-title">Country:</div>
                <div class="ma-2 details-title">City / Town:</div>
              </v-col>
              <v-col class="text-left">
                <div class="ma-2">{{ tender.companyProfile.country.name }}</div>
                <div class="ma-2">{{ tender.companyProfile.city }}</div>
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
            <div>{{ tender.companyProfile.contactPerson.firstName }}</div>
            <div class="mt-3">{{ tender.companyProfile.contactPerson.lastName }}</div>
          </v-col>
          <v-col class="text-left mx-2">
            <div class="details-title">Phone number:</div>
          </v-col>
          <v-col class="text-left mx-2">
            <div>{{ tender.companyProfile.contactPerson.phoneNumber }}</div>
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
            <div>{{ PROCEDURE[tender.procedure] }}</div>
          </v-col>
          <v-col class="text-left mx-2">
            <div class="details-title">Language:</div>
          </v-col>
          <v-col class="text-left mx-2">
            <div>{{ LANGUAGE[tender.language] }}</div>
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
            <div>{{ tender.cpv.code }}</div>
            <div class="mt-3">{{ tender.contract.minPrice }}</div>
            <div class="mt-3">{{ `${tender.contract.currency.code} | ${tender.contract.currency.symbol}` }}</div>
          </v-col>
          <v-col class="text-left mx-2">
            <div class="details-title">Type of Tender:</div>
            <div class="mt-3 details-title">Max Tender Value:</div>
            <div class="mt-3 details-title">Description:</div>
          </v-col>
          <v-col class="text-left mx-2">
            <div>{{ CONTRACT_TYPE[tender.contract.contractType.title] }}</div>
            <div class="mt-3">{{ tender.contract.maxPrice }}</div>
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
            <div>{{ tender.publicationDate }}</div>
            <div class="mt-3">{{ tender.contract.signedDeadline }}</div>
          </v-col>
          <v-col class="text-left mx-2">
            <div class="details-title">Deadline for Offer Submission:</div>
          </v-col>
          <v-col class="text-left mx-2">
            <div>{{ tender.offerSubmissionDeadline }}</div>
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
                @click="downloadFile(tender.contract.fileMetadata.awsS3fileKey)"
              ><div
                id="text"
                style="width: 50rem"
                > {{ tender.contract.fileMetadata.name }} </div>
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
                @click="downloadFile(tender.awardDecision.fileMetadata.awsS3fileKey)"
              ><div
                id="text"
                style="width: 50rem"
                > {{ tender.awardDecision.fileMetadata.name }} </div>
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
                @click="downloadFile(tender.rejectDecision.fileMetadata.awsS3fileKey)"
              ><div
                id="text"
                style="width: 50rem"
              > {{ tender.rejectDecision.fileMetadata.name }} </div>
              </v-chip>
            </v-item>
          </v-row>
        </div>
        </v-item-group>
        <div v-if="role ==='bidder'">
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
          <v-card v-click-outside="closeDialog">
            <iframe :src=documentUrl width="800" height="500">
            </iframe>
            <v-card-actions>
              <v-btn color="primary" block @click="closeDialog">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </v-window-item>

  </v-window>
</template>

<script>
import { restApiEndpoints } from "@/rest.api.endpoints"
import { exceptionAlert } from "@/components/alerts";
import { PROCEDURE, LANGUAGE, CONTRACT_TYPE } from "@/components/constants"
import { fetchFromEndpoint } from "@/components/actions";
import axios from "axios";

export default {
  data: () => ({
    PROCEDURE,
    LANGUAGE,
    CONTRACT_TYPE,
    tender: {
      companyProfile: {
        country: {},
        contactPerson: {}
      },
      cpv: {},
      contract: {
        currency: {},
        contractType: {},
        fileMetadata: {}
      },
      awardDecision: {
        fileMetadata: {}
      },
      rejectDecision: {
        fileMetadata: {}
      },
    },
    tab: "tenderDescription",
    dialog: false,
    documentUrl: '',
    totalPages: 1,
    plannedPage: 1,
    offersPerPage: 10,
    loading: false,
    isOffers: false,
    offer: [],
    role: '',
    exceptionAlert,
    fetchFromEndpoint
  }),

  methods: {
    async getTenderById(tenderId) {
      try {
        const response = await axios.get(`${restApiEndpoints.host}${restApiEndpoints.tenders}/${tenderId}`, {
          withCredentials: true,
          headers: {
            'Accept': 'application/json',
          }
        });
        this.tender = response.data;
        if (this.role === 'contractor' && this.tender.offers.length > 0) {
          this.isOffers = true
        }
      } catch (error) {
        exceptionAlert.activateAlert("There was an error when fetching the tender details")
        console.log(error.response.data.message)
      }
    },

    getOfferById(id){
      this.$router.push({ name: "offer-details",
                          params: { id: id, award: this.tender.awardDecisionFileName,
                                    reject: this.tender.rejectDecisionFileName } });
    },

    openDialog(documentName) {
      fetch(`${restApiEndpoints.host}${restApiEndpoints.presignedUrl}/${documentName}`, {
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

    async downloadFile(fileKey) {
      try {
        this.dialog = true;
        const response = await axios.get(`${restApiEndpoints.host}/${restApiEndpoints.files}/${fileKey}`, {
          withCredentials: true,
          responseType: 'blob',
        });
        this.documentUrl = URL.createObjectURL(response.data);
      } catch (error) {
        console.error('Error downloading the file', error);
      }
    },

    closeDialog() {
      if (this.documentUrl) {
        URL.revokeObjectURL(this.documentUrl);
        this.documentUrl = null;
      }
      this.dialog = false;
    },

    createOffer(tenderId){
      this.$router.push({ name: "new-offer", params: { tender_id: tenderId } });
    }
  },

 async mounted() {
    this.role = this.$route.params.role;
    const tenderResponse = await fetchFromEndpoint(`${restApiEndpoints.host}/${restApiEndpoints.tenders}/${this.$route.params.tenderId}`);
    this.tender = tenderResponse.data;
  }
}
</script>
