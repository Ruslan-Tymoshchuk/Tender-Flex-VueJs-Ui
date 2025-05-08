<template>
  <ToolBarTitle
      title="Create new Tender"
  ></ToolBarTitle>

  <v-card class="mt-n7 mx-auto" elevation="8" max-width="1000">
    <v-container class="pa-10">
      <v-form v-model="valid" fast-fail @submit.prevent="save">

        <CompanyProfile
          companyRole="Contractor"
          oficialNameHint="Enter the name of the buyer (e.g. Aeroporto Friuli Venezia Giulia S.p.A.)"
          @update-oficial-name="(value) => tender.companyProfile.officialName = value"
          registrationNumberHint="Enter the national registration number of the buyer (e.g.ULG BE 0325 777 171)"
          @update-registration-number="(value) => tender.companyProfile.registrationNumber = value"
          countryHint="Choose the country of the buyer"
          :countries="countries"
          @update-country="(value) => tender.companyProfile.country.id = value"
          cityHint="Enter the city of the buyer"
          @update-city="(value) => tender.companyProfile.city = value"
          firstNameHint="Enter the name of contact person"
          @update-first-name="(value) => tender.companyProfile.contactPerson.firstName = value"
          lastNameHint="Enter the surname of contact person"
          @update-last-name="(value) => tender.companyProfile.contactPerson.lastName = value"
          phoneNumberHint="Enter the phone number of the contact person"
          @update-phone="(value) => tender.companyProfile.contactPerson.phoneNumber = value"
        ></CompanyProfile>

        <v-row>
          <Chapter title="Subject matter of the procurement"></Chapter>
        </v-row>

          <v-row class="mt-5 mx-8">
            <v-col cols="12" md="4">
              <SelectOptionInput
                title="CPV code"
                hint="Choose CPV code with corresponded to this code description"
                label="CPV Code"
                itemTitle="code"
                @update-value="(value) => tender.cpv.id = value"
                :items="cpvs">
              </SelectOptionInput>
            </v-col>

            <v-col cols="12" md="4">
              <SelectOptionInput
                title="Type of Tender"
                hint="Choose the type of contract"
                label="Type"
                itemTitle="title"
                @update-value="(value) => contract.contractType.id = value"
                :items="contractTypes">
              </SelectOptionInput>
            </v-col>
            <v-col cols="12" md="4">
              <TextInput
                title="Description"
                hint="Enter detailed information about the Tender"
                @update-value="(value) => tender.description = value"
                :counter="250"
                label="Description"
              ></TextInput>
            </v-col>
            <v-col cols="12" md="4">
              <NumericInput
                title="Maximum Tender Value"
                hint="Enter maximum price of the Tender contract"
                @update-value="(value) => contract.maxPrice = value"
                :counter="8"
                label="Maximum tender value"
              ></NumericInput>
            </v-col>
            <v-col cols="12" md="4">
              <NumericInput
                title="Minimum Tender Value"
                hint="Enter minimum price of the Tender contract"
                @update-value="value => contract.minPrice = value"
                :counter="8"
                label="Minimum tender value"
              ></NumericInput>
            </v-col>
            <v-col cols="12" md="4">
              <SelectOptionInput
                title="Currency"
                hint="Choose the currency"
                label="Currency"
                itemTitle="code"
                @update-value="(value) => contract.currency.id = value"
                :items="currencies">
              </SelectOptionInput>
            </v-col>
          </v-row>

        <v-row>
          <Chapter title="Date"></Chapter>
        </v-row>

          <v-row class="mt-5 mx-8">
            <v-col cols="12" md="4">
              <DateInput
              title="Publication Date"
              hint="Today date"
              :label="initialDate"
              type="text"
              :isDisabled="true"
            ></DateInput>
          </v-col>
          <v-col cols="12" md="4">
            <DateInput
              title="Deadline for Offer Submission"
              hint="Choose the deadline date for Offer submission"
              :earliestDate="earliestDeadline"
              @update-value="(value) => tender.offerSubmissionDeadline = value"
            ></DateInput>
          </v-col>
          <v-col cols="12" md="4">
            <DateInput
              title="Deadline for Signing"
              hint="Choose the deadline date for signed contract submission"
              :earliestDate="earliestDeadline"
               @update-value="(value) => contract.signedDeadline = value"
            ></DateInput>
          </v-col>
          </v-row>

        <v-row>
          <Chapter title="Documents"></Chapter>
        </v-row>

          <v-item-group class="py-5 mx-2">
            <FileInput
              label="* Contract"
              fileInputId="contract"
              hint="Choose your contract document"
              @select-file="(value) => attachment.contract = value"
              @show-file="showFileInParent"
            ></FileInput>
            <FileInput
              label="* Award Decision"
              fileInputId="award"
              hint="Choose award decision document"
              @select-file="(value) => attachment.awardDecision = value"
              @show-file="showFileInParent"
            ></FileInput>
            <FileInput
              label="* Reject Decision"
              fileInputId="reject"
              hint="Choose reject decision document"
              @select-file="(value) => attachment.rejectDecision = value"
              @show-file="showFileInParent"
            ></FileInput>
          </v-item-group>

          <FileViewerModal
            v-model:isOpen="isOpenInParent"
            @update:isOpen="(value) => isOpenInParent = value"
            :fileUrl="fileUrl"
          ></FileViewerModal>

      </v-form>
    </v-container>
  </v-card>

  <ConfirmationMenu
      btnTitle="Publish"
      firstLineExplanation="Do you really want to cancel the new Tender creation?"
      secondLineExplanaton="All you entered data will be lost"
      redirectUrl="/module/contractor/tenders"
      @save-document="save"
  ></ConfirmationMenu>
</template>

<script>
import { URL_REST_API } from "@/rest.api.endpoints"
import { format } from 'date-fns'
import { totalStore, fetchFromEndpoint, uploadFile, createDocumentRecord } from "@/components/actions"
import { successAlert, exceptionAlert } from "@/components/alerts"
import TextInput from "@/components/childs/TextInput.vue"
import NumericInput from "@/components/childs/NumericInput.vue"
import ToolBarTitle from "@/components/childs/ToolBarTitle.vue"
import Chapter from "@/components/childs/Chapter.vue"
import SelectOptionInput from "@/components/childs/SelectOptionInput.vue"
import FileInput from "@/components/childs/FileInput.vue"
import ConfirmationMenu from "@/components/childs/ConfirmationMenu.vue"
import CompanyProfile from "@/components/childs/CompanyProfile.vue"
import DateInput from "@/components/childs/DateInput.vue"
import FileViewerModal from "@/components/childs/FileViewerModal.vue"

export default {
  components: {
    CompanyProfile,
    TextInput,
    NumericInput,
    ToolBarTitle,
    Chapter,
    SelectOptionInput,
    DateInput,
    FileInput,
    ConfirmationMenu,
    FileViewerModal
  },

  data: () => ({
    fetchFromEndpoint,
    uploadFile,
    createDocumentRecord,
    countries: [],
    contractTypes: [],
    cpvs: [],
    currencies: [],
    earliestDeadline: null,
    isDisabled: true,
    initialDate: null,
    tender: {
      companyProfile: {
        country: {},
        contactPerson: {}
      },
      cpv: {},
    },
    contract: {
        contractType: {},
        currency: {},
        fileMetadata: {}
      },
    awardDecision: {
      fileMetadata: {}
    },
    rejectDecision: {
      fileMetadata: {}
    },
    valid: false,
    attachment: {},
    totalStore,
    successAlert,
    exceptionAlert,
    isOpenInParent: false,
    fileUrl: ''
  }),

  methods: {
    showFileInParent(isOpen, fileUrl) {
      this.fileUrl = fileUrl;
      this.isOpenInParent = isOpen;
    },

    async save() {
      try {
        await this.$router.push({ name: 'tenders' });
        const { contract, awardDecision, rejectDecision } = this.attachment;
        const [contactFileMetadata, awardFileMetadata, rejectFileMetadata] = await Promise.all([
          this.uploadFile(contract),
          this.uploadFile(awardDecision),
          this.uploadFile(rejectDecision),
        ]);
        this.tender.contractorId = this.$route.params.user_id;
        this.tender.publication = this.initialDate;
        this.contract.fileMetadata.id = contactFileMetadata.data.id;
        this.awardDecision.fileMetadata.id = awardFileMetadata.data.id;
        this.rejectDecision.fileMetadata.id = rejectFileMetadata.data.id;
        await this.createDocumentRecord({ tender: this.tender,
                                          contract: this.contract,
                                          awardDecision: this.awardDecision,
                                          rejectDecision: this.rejectDecision }, URL_REST_API.PROCUREMENTS);
        this.successAlert.activateAlert("Tender was successfully created");
        this.totalStore.refreshTotalCounts(this.$route.params.userId);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.exceptionAlert.activateAlert(error.response.data.message);
        } else {
          this.exceptionAlert.activateAlert(error);
        }
      }
    }
  },

  async mounted() {
    try {
      const [countries, cpvs, contractTypes, currencies] = await Promise.all([
        this.fetchFromEndpoint(`${URL_REST_API.HOST}/${URL_REST_API.COUNTRIES_ALL}`),
        this.fetchFromEndpoint(`${URL_REST_API.HOST}/${URL_REST_API.CPVS_ALL}`),
        this.fetchFromEndpoint(`${URL_REST_API.HOST}/${URL_REST_API.CONTRACT_TYPES_ALL}`),
        this.fetchFromEndpoint(`${URL_REST_API.HOST}/${URL_REST_API.CURRENCIES_ALL}`),
      ]);
      this.countries = countries.data;
      this.cpvs = cpvs.data;
      this.contractTypes = contractTypes.data;
      this.currencies = currencies.data;
    } catch (error) {
      this.exceptionAlert.activateAlert("Error occurred when fetching the data: " + error)
    }
    this.initialDate = format(new Date(), 'yyyy-MM-dd');
    this.earliestDeadline = format(new Date().getTime() + 86400000, 'yyyy-MM-dd');
  }
}
</script>
