<template>
  <v-toolbar color="blue" extended extension-height="100">
    <v-chip router-link :to="`/module/${role}/tenders`"
    style="margin-left: 12rem" variant="text" text-color="white" prepend-icon="mdi-keyboard-backspace">Back
    </v-chip>
    <template v-slot:extension>
      <v-container class="px-15">
        <v-toolbar-title class="ml-14 mb-4" style="font-size: 1.5rem">{{ offer.organizationNameByBidder }}</v-toolbar-title>
        <v-tabs v-model="tab" height="30" class="mb-10 ml-12" color="cyan-accent-2">
          <v-tab v-if="offer.bidderSt === 'Offer selected by Contractor' || offer.bidderSt === 'Contract declined by Bidder' || offer.bidderSt === 'Contract approved by Bidder'"
          value="awardDecision">Award Decision</v-tab>
          <v-tab v-if="offer.bidderSt === 'Offer rejected by Contractor'" value="rejectDecision">Reject Decision</v-tab>
          <v-tab value="tenderDescription">Tender Description</v-tab>
          <v-tab value="myOffer">My Offer</v-tab>
        </v-tabs>
      </v-container>
    </template>
  </v-toolbar>

  <v-window v-model="tab" class="mt-n7 pb-10">
    <v-window-item value="awardDecision">
      <v-card class="mx-auto" elevation="8" max-width="1000">
        <v-toolbar color="white" height="280" class="text-left">
          <v-toolbar-title v-if="offer.bidderSt === 'Offer selected by Contractor'" class="text-center" style="font-size: 1.5rem">
            “Congratulation! Your Offer was selected by Contractor”
          </v-toolbar-title>
          <v-toolbar-title v-if="offer.bidderSt === 'Contract declined by Bidder'" class="text-center" style="font-size: 1.5rem">
            “Contract is declined by Bidder”
          </v-toolbar-title>
          <v-toolbar-title v-if="offer.bidderSt === 'Contract approved by Bidder'" class="text-center" style="font-size: 1.5rem">
            “Contract is approved by Bidder”
          </v-toolbar-title>
        </v-toolbar>
        <v-row class="mb-10" justify="center">
        <v-col md = 3 class="text-center">
        <v-chip
             size="large"
             color="blue"
             prepend-icon="mdi-file-document-multiple-outline"
             label
             @click="openDialog(offer.awardDecision)"
             ><div
             id="text"
             style="width: 50rem"
             > View document </div>
            </v-chip>
          </v-col>
        </v-row>
        <v-row v-if="offer.bidderSt === 'Offer selected by Contractor'" class="d-flex justify-center mt-2 mb-10">
      <v-col md="3">
        <v-btn type="submit" block variant="outlined" color="blue" @click="saveDecision('decline')">
            Decline
        </v-btn>
         </v-col>
          <v-col md="3">
           <v-btn type="submit" block variant="flat" color="blue" @click="saveDecision('approve')">
             Approve
           </v-btn>
         </v-col>
       </v-row>
      </v-card>
    </v-window-item>

    <v-window-item value="rejectDecision">
      <v-card class="mx-auto" elevation="8" max-width="1000">
        <v-toolbar color="white" height="280" class="text-left">
          <v-toolbar-title class="text-center" style="font-size: 1.5rem">
            “Offer is rejected by contractor”
          </v-toolbar-title>
        </v-toolbar>
        <v-row class="mb-15" justify="center">
        <v-col md = 3 class="text-center">
        <v-chip
             size="large"
             color="blue"
             prepend-icon="mdi-file-document-multiple-outline"
             label
             @click="openDialog(offer.rejectDecision)"
             ><div
             id="text"
             style="width: 50rem"
             > View document
             </div>
            </v-chip>
          </v-col>
        </v-row>
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
        </v-item-group>
      </v-container>
    </v-window-item>

  <v-window-item value="myOffer">
    <v-card class="mx-auto" elevation="8" max-width="1000">
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
            <v-chip
             size="large"
             class="mb-6"
             color="blue"
             prepend-icon="mdi-file-document-multiple-outline"
             label
             @click="openDialog(offer.documentName)"
             ><div
             id="text"
             style="width: 50rem"
             > {{ getOriginalFileName(offer.documentName) }} </div>
            </v-chip></v-item>
        </v-row>
      </v-item-group>
    </v-container>

</v-window-item>

    <v-dialog v-model="dialog" width="auto">
        <v-card>
          <iframe :src=fileUrl width="800" height="500">
          </iframe>
          <v-card-actions>
            <v-btn color="primary" block @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

</v-window>
</template>

<script>
import { restApiConfig } from "@/rest.api.config"
import { getOriginalFileName } from "@/components/actions"

export default {
  data: () => ({
    tender: {
      contractFileName: '',
    },
    tab: "tenderDescription",
    decisionTitle: '',
    role: '',
    offer: {
      documentName: '',
      awardDecision: '',
      rejectDecision: '',
    },
    dialog: false,
    fileUrl: '',
    getOriginalFileName
  }),

  methods: {
    getOfferById() {
      fetch(`${restApiConfig.host}${restApiConfig.offerDetails}/${this.offerId}`, {
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

    getTenderDetailsByOffer() {
      fetch(`${restApiConfig.host}${restApiConfig.tenderDetailsByOffer}/${this.offerId}`, {
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
          this.fileUrl = responseData.fileUrl
          this.dialog = true;
        })
        .catch(error => console.log('There was an error', error));
    },

    saveDecision(decision) {
      fetch(`${restApiConfig.host}${restApiConfig.decision}/${decision}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          offerId: this.offerId,
          tenderId: this.tender.tenderId,
          decision: `${decision}`,
        })
      })
        .then(response => response.json())
        .then(responseData => this.offer.bidderSt = responseData.bidderSt)
        .catch(error => console.log('There was an error', error));
    }
  },

  mounted() {
    this.role = this.$route.params.role
    this.offerId = this.$route.params.id
    this.getOfferById();
    this.getTenderDetailsByOffer();
  }
}
</script>
