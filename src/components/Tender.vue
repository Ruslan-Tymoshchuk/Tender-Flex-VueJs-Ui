<template>
  <ToolBarTitle
      title="Create new Tender"
  ></ToolBarTitle>

  <v-card class="mt-n7 mx-auto" elevation="8" max-width="1000">
    <v-container class="pa-10">

      <v-form v-model="valid" fast-fail @submit.prevent="createTender">

        <v-row>
          <Chapter title="Contractor"></Chapter>
        </v-row>

          <v-row class="mt-5 mx-8">
            <InputField
              instance="companyProfile"
              title="Oficial name"
              tooltip="Enter the name of the buyer (e.g. Aeroporto Friuli Venezia Giulia S.p.A.)"
              fieldLabel="Name of Organization"
              fieldName="officialName"
              :counter="50"
              @updateValue="updatedValueInParent"
            ></InputField>
            <InputField
              instance="companyProfile"
              title="National Registration Number"
              tooltip="Enter the national registration number of the buyer (e.g.ULG BE 0325 777 171)"
              fieldLabel="National Registration Number"
              fieldName="registrationNumber"
              :counter="10"
              @updateValue="updatedValueInParent"
            ></InputField>
            <SelectOption
              instance="companyProfile"
              title="Country"
              btnTooltip="Choose the country of the buyer"
              label="Choose the country"
              itemTitle="name"
              :items="countries"
              fieldName="countryId"
              @updateValue="updatedValueInParent">
            </SelectOption>
            <InputField
              instance="companyProfile"
              title="City / Town"
              tooltip="Enter the city of the buyer"
              fieldLabel="City"
              fieldName="city"
              :counter="50"
              @updateValue="updatedValueInParent"
            ></InputField>
          </v-row>

        <v-row>
          <Chapter title="Contact person"></Chapter>
        </v-row>

          <v-row class="mt-5 mx-8">
            <InputField
              instance="companyProfile"
              title="First Name"
              tooltip="Enter the name of contact person"
              fieldLabel="Name"
              fieldName="firstName"
              :counter="50"
              @updateValue="updatedValueInParent"
            ></InputField>
            <InputField
              instance="companyProfile"
              title="Last Name"
              tooltip="Enter the surname of contact person"
              fieldLabel="Surname"
              fieldName="lastName"
              :counter="50"
              @updateValue="updatedValueInParent"
            ></InputField>
            <InputField
              instance="companyProfile"
              title="Phone number"
              tooltip="Enter the phone number of the contact person"
              fieldLabel="Phone"
              fieldName="phoneNumber"
              :counter="8"
              @updateValue="updatedValueInParent"
            ></InputField>
          </v-row>

        <v-row>
          <Chapter title="Subject matter of the procurement"></Chapter>
        </v-row>

          <v-row class="mt-5 mx-8">
            <SelectOption
              instance="cpv"
              title="CPV code"
              btnTooltip="Choose CPV code with corresponded to this code description"
              label="CPV Code"
              itemTitle="code"
              :items="cpvs"
              fieldName="id"
              @updateValue="updatedValueInParent">
            </SelectOption>
            <SelectOption
              instance="contractType"
              title="Tipe of Tender"
              btnTooltip="Choose the type of contract"
              label="Type"
              itemTitle="title"
              :items="contractTypes"
              fieldName="id"
              @updateValue="updatedValueInParent">
            </SelectOption>
            <InputField
              instance="tender"
              title="Description"
              tooltip="Enter detailed information about the Tender"
              fieldLabel="Description"
              fieldName="description"
              :counter="250"
              @updateValue="updatedValueInParent"
            ></InputField>
            <InputField
              instance="contract"
              title="Maximum Tender Value"
              tooltip="Enter maximum price of the Tender contract"
              fieldLabel="Maximum tender value"
              fieldName="maxPrice"
              inputFieldType="number"
              @updateValue="updatedValueInParent"
            ></InputField>
            <InputField
              instance="contract"
              title="Minimum Tender Value"
              tooltip="Enter minimum price of the Tender contract"
              fieldLabel="Minimum tender value"
              fieldName="minPrice"
              inputFieldType="number"
              @updateValue="updatedValueInParent"
            ></InputField>
            <SelectOption
              instance="currency"
              title="Currency"
              btnTooltip="Choose the currency"
              label="Currency"
              itemTitle="type"
              :items="currencies"
              fieldName="id"
              @updateValue="updatedValueInParent">
            </SelectOption>
          </v-row>

        <v-row>
          <Chapter title="Date"></Chapter>
        </v-row>

          <v-row class="mt-5 mx-8">
            <InputField
              instance="tender"
              title="Publication Date"
              tooltip="Today date"
              :fieldLabel="currentDate"
              fieldName="publication"
              :isDisabled="true"
            ></InputField>
            <InputField
              instance="tender"
              title="Deadline for Offer Submission"
              tooltip="Choose the deadline date for Offer submission"
              fieldLabel="Deadline for Offer Submission"
              fieldName="offerSubmissionDeadline"
              inputFieldType="date"
              :startDate="minDeadline"
              @updateValue="updatedValueInParent"
            ></InputField>
            <InputField
              instance="contract"
              title="Deadline for Signing"
              tooltip="Choose the deadline date for signed contract submission"
              fieldLabel="DeadLine for Signed Contract Submission"
              fieldName="signedDeadline"
              inputFieldType="date"
              :startDate="minDeadline"
              @updateValue="updatedValueInParent"
            ></InputField>
          </v-row>

        <v-row>
          <Chapter title="Documents"></Chapter>
        </v-row>

          <v-item-group class="py-5 mx-2">
            <InputFileField
              instance="attachment"
              label="* Contract"
              fileType="contract"
              labelId="contract-input"
              @updateValue="updatedValueInParent"
              @openDocument="openDocumentInParent"
            ></InputFileField>
            <InputFileField
              instance="attachment"
              label="* Award decision"
              fileType="award"
              labelId="award-decision-input"
              @updateValue="updatedValueInParent"
              @openDocument="openDocumentInParent"
            ></InputFileField>
            <InputFileField
              instance="attachment"
              label="* Reject decision"
              fileType="reject"
              labelId="reject-decision-input"
              @updateValue="updatedValueInParent"
              @openDocument="openDocumentInParent"
            ></InputFileField>
            <ModalFileRenderer
              v-model="isDialog"
              :documentUrl="documentUrl"
              @close="closeDocumentInParent"
            ></ModalFileRenderer>
          </v-item-group>

      </v-form>
    </v-container>
  </v-card>

  <ConfirmationMenu
      btnTitle="Publish"
      firstLineExplanation="Do you really want to cancel the new Tender creation?"
      secondLineExplanaton="All you entered data will be lost"
      redirectUrl="/module/contractor/tenders"
      @saveDocument="createTender"
  ></ConfirmationMenu>
</template>

<script>
import { restApiEndpoints } from "@/rest.api.endpoints"
import { format } from 'date-fns'
import { totalStore, fetchFromEndpoint, uploadFile, createDocumentRecord } from "@/components/actions"
import { successAlert, exceptionAlert } from "@/components/alerts"
import InputField from "@/components/childs/InputField.vue"
import ToolBarTitle from "@/components/childs/ToolBarTitle.vue"
import Chapter from "@/components/childs/Chapter.vue"
import SelectOption from "@/components/childs/SelectOption.vue"
import InputFileField from "@/components/childs/InputFileField.vue"
import ModalFileRenderer from "@/components/childs/ModalFileRenderer.vue"
import ConfirmationMenu from "@/components/childs/ConfirmationMenu.vue"

export default {
  components:{
    InputField,
    ToolBarTitle,
    Chapter,
    SelectOption,
    InputFileField,
    ModalFileRenderer,
    ConfirmationMenu
  },
  data: () => ({
    fetchFromEndpoint,
    uploadFile,
    createDocumentRecord,
    countries: [],
    contractTypes: [],
    cpvs: [],
    currencies: [],
    currency: {},
    minDeadline: null,
    isDisabled: true,
    currentDate: null,
    tender: {},
    companyProfile: {},
    cpv: {},
    contractType: {},
    contract: {
      fileMetadata: {}
    },
    award: {
      fileMetadata: {}
    },
    reject: {
      fileMetadata: {}
    },
    valid: false,
    isDialog: false,
    attachment: {},
    documentUrl: '',
    totalStore,
    successAlert,
    exceptionAlert,
  }),

  methods: {
    async createTender() {
      try {
        await this.$router.push({ name: 'tenders' });
        const { contract, award, reject } = this.attachment;
        const [contactFileMetadata, awardFileMetadata, rejectFileMetadata] = await Promise.all([
          this.uploadFile(contract),
          this.uploadFile(award),
          this.uploadFile(reject),
        ]);
        this.tender.contractorId = this.$route.params.userId;
        this.tender.publication = this.currentDate;
        this.tender.companyProfile = this.companyProfile;
        this.tender.cpv = this.cpv;
        this.contract.contractType = this.contractType;
        this.contract.currency = this.currency;
        this.contract.fileMetadata.id = contactFileMetadata.data.id;
        this.tender.contract = this.contract;
        this.award.fileMetadata.id = awardFileMetadata.data.id;
        this.tender.award = this.award;
        this.reject.fileMetadata.id = rejectFileMetadata.data.id;
        this.tender.reject = this.reject;
        await this.createDocumentRecord(this.tender, restApiEndpoints.tenders);
        this.successAlert.activateAlert("Tender was successfully created");
        this.totalStore.refreshTotalCounts(this.$route.params.userId);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.exceptionAlert.activateAlert(error.response.data.message);
        } else {
          this.exceptionAlert.activateAlert(error);
        }
      }
    },

    updatedValueInParent(instance, fieldName, value) {
      this[instance][fieldName] = value
    },

    openDocumentInParent(fileUrl) {
      this.documentUrl = fileUrl
      this.isDialog = true
    },

    closeDocumentInParent() {
      this.isDialog = false
    }
  },

  async mounted() {
    try {
      const [countries, cpvs, contractTypes, currencies] = await Promise.all([
        this.fetchFromEndpoint(`${restApiEndpoints.host}/${restApiEndpoints.countriesAll}`),
        this.fetchFromEndpoint(`${restApiEndpoints.host}/${restApiEndpoints.cpvsAll}`),
        this.fetchFromEndpoint(`${restApiEndpoints.host}/${restApiEndpoints.contractTypesAll}`),
        this.fetchFromEndpoint(`${restApiEndpoints.host}/${restApiEndpoints.currenciesAll}`),
      ]);
      this.countries = countries.data;
      this.cpvs = cpvs.data;
      this.contractTypes = contractTypes.data;
      this.currencies = currencies.data;
    } catch (error) {
      this.exceptionAlert.activateAlert("Error occurred when fetching the data: " + error)
    }
    this.currentDate = format(new Date(), 'yyyy-MM-dd');
    this.minDeadline = format(new Date().getTime() + 86400000, 'yyyy-MM-dd');
  }
}
</script>
