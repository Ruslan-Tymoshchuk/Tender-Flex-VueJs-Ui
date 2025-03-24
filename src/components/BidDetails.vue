<template>
  <v-toolbar color="blue" extended extension-height="100">
    <v-chip :to="{ name: 'tenders' }" style="margin-left: 12rem" variant="text" text-color="white"
      prepend-icon="mdi-keyboard-backspace">Back
    </v-chip>
    <template v-slot:extension>
      <v-container class="px-15">
        <v-toolbar-title class="ml-14 mb-4" style="font-size: 1.5rem">{{ tender.cpv.summary }} ({{ tender.cpv.code }})</v-toolbar-title>
          <div style="margin-left: 3rem; margin-bottom: 3rem;">
            <div v-if="this.$route.params.role === USER_ROLE.CONTRACTOR">
              <div v-if="isTenderDecription">
                <v-btn v-if="Number(this.$route.query.offers) > 0" @click="navigateToOffers" rounded="0">Offers</v-btn>
                <v-btn @click="tab='tenderDescription'" rounded="0">Tender Description</v-btn>
              </div>
            </div>
          <div v-if="this.$route.params.role === USER_ROLE.BIDDER && Number(this.$route.query.offerId) > 0">
            <v-btn @click="tab='tenderDescription'" rounded="0">Tender Description</v-btn>
            <v-btn @click="navigateToOffer(this.$route.query.offerId)" rounded="0">My Offer</v-btn>
          </div>
        </div>
      </v-container>
    </template>
  </v-toolbar>

  <v-window v-model="tab" class="mt-n8 pb-10">
    <v-window-item value="offers">
      <v-card elevation="8" width="1000" class="mx-auto">
       <TableHeader
        companyName="Oficial Name"
        field="Field"
        price="Price"
        country="Country"
        date="Received Date"
        status="Status"
      ></TableHeader>
      <v-container
        id="scroll-target"
        style="max-height: 25rem"
        class="overflow-y-auto"
        v-scroll:#scroll-target="onScroll">
      <TableBody
        :offers="offers"
        @select-offer="(offer) => navigateToOffer(offer.id)"
      ></TableBody>
      </v-container>
      </v-card>
    </v-window-item>

    <v-window-item value="tenderDescription">
      <v-card class="mx-auto" elevation="8" max-width="1000" >
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
            <div>{{ PROCEDURE[tender.procedure.type] }}</div>
          </v-col>
          <v-col class="text-left mx-2">
            <div class="details-title">Language:</div>
          </v-col>
          <v-col class="text-left mx-2">
            <div>{{ LANGUAGE[tender.procedure.language] }}</div>
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
            <FileVchip
              :fileName="tender.contract.fileMetadata.name"
              :fileKey="tender.contract.fileMetadata.awsS3fileKey"
              @show-file="showFile"
          ></FileVchip>
          </v-row>
          <div v-if="this.$route.params.role === USER_ROLE.CONTRACTOR" class="mt-4">
          <v-row>
            <FileVchip
              :fileName=" tender.awardDecision.fileMetadata.name"
              :fileKey="tender.awardDecision.fileMetadata.awsS3fileKey"
              @show-file="showFile"
          ></FileVchip>
          </v-row>
          <v-row>
            <FileVchip
              :fileName="tender.rejectDecision.fileMetadata.name"
              :fileKey="tender.rejectDecision.fileMetadata.awsS3fileKey"
              @show-file="showFile"
          ></FileVchip>
            </v-row>
          </div>
        </v-item-group>
      </v-container>
        <v-row class="d-flex justify-end mt-5 mb-10">
          <div v-if="this.$route.params.role === USER_ROLE.BIDDER && Number(this.$route.query.offerId) === 0">
            <v-col md="6" style="margin-right: 20rem;">
              <v-btn type="submit" block variant="flat" color="blue"
                     :to="{ name: 'new-offer', query: { tenderId: this.$route.params.tenderId } }">
                + Create Offer
              </v-btn>
            </v-col>
         </div>
        </v-row>
    </v-window-item>
    <v-window-item value="offerDescription">
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
    <v-container class="d-flex justify-end mt-2 mb-10">
      <div v-if="this.$route.params.role === USER_ROLE.CONTRACTOR">
        <v-btn class="mx-2" type="submit" variant="outlined" color="blue" @click="sendRejectDecision">
          Send Reject Decision
        </v-btn>
        <v-btn class="mx-2" type="submit" variant="flat" color="blue" @click="sendAwardDecision">
          Send Award Decision
        </v-btn>
      </div>
    </v-container>
    </v-window-item>

    <FileViewerModal
      v-model:isOpen="isOpen"
      @update:isOpen="closeFile"
      :fileUrl="fileUrl"
   ></FileViewerModal>
  </v-window>
</template>

<script>
import { URL_REST_API } from "@/rest.api.endpoints"
import { exceptionAlert } from "@/components/alerts";
import { USER_ROLE, PROCEDURE, LANGUAGE, CONTRACT_TYPE } from "@/components/constants"
import { fetchFromEndpoint, downloadFile } from "@/components/actions";
import FileVchip from "@/components/childs/FileVchip.vue"
import FileViewerModal from "@/components/childs/FileViewerModal.vue"
import axios from "axios";
import TableHeader from "@/components/offer/childs/TableHeader.vue"
import TableBody from "@/components/offer/childs/TableBody.vue"

export default {
  components: {
    FileVchip,
    FileViewerModal,
    TableHeader,
    TableBody
  },

  data: () => ({
    USER_ROLE,
    PROCEDURE,
    LANGUAGE,
    CONTRACT_TYPE,
    tender: {
      companyProfile: {
        country: {},
        contactPerson: {}
      },
      procedure: {},
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
    offer: null,
    offers: [],
    tab: "tenderDescription",
    isOpen: false,
    fileUrl: '',
    totalPages: 1,
    plannedPage: 1,
    offersPerPage: 10,
    loading: false,
    isOffers: false,
    exceptionAlert,
    fetchFromEndpoint,
    downloadFile,
    isTenderDecription: true
  }),

  methods: {
    async getOffersList() {
      try {
        this.loading = true
        const offersPageResponse = await axios.get(
          `${URL_REST_API.HOST}/${URL_REST_API.OFFERS_PAGE}/${this.tender.id}?currentPage=${this.plannedPage}&totalOffers=${this.offersPerPage}`, {
          withCredentials: true,
          headers: {
            'Accept': 'application/json',
          }
        });
        this.totalPages = offersPageResponse.totalPages;
        for (const offer of offersPageResponse.data.content) {
          this.offers.push(offer);
        }
        if (this.offers.length == 0) {
          this.isNoOffers = true;
        }
        this.plannedPage++;
        this.loading = false;
      } catch (error) {
        console.log('There was an error', error)
      }
    },

    onScroll(e) {
      const currentPage = Math.ceil(e.target.scrollTop / 280);
      if (currentPage === this.plannedPage && !this.loading && this.plannedPage <= this.totalPages) {
        this.getOffersList()
      }
    },

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

    navigateToOffers(){
      this.getOffersList();
      this.tab = "offers";
    },

    async navigateToOffer(offerId) {
      const offerResponse = await fetchFromEndpoint(`${URL_REST_API.HOST}/${URL_REST_API.OFFERS}/${offerId}`);
      this.offer = offerResponse.data;
      this.tab = "offerDescription"
      if (this.$route.params.role === USER_ROLE.CONTRACTOR)
        this.isTenderDecription = false;
    }
    },

  async mounted() {
    const tenderResponse = await fetchFromEndpoint(`${URL_REST_API.HOST}/${URL_REST_API.TENDERS}/${this.$route.params.tenderId}`);
    this.tender = tenderResponse.data;
  }
}
</script>
