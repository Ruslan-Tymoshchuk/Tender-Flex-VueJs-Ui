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
              instance="tender"
              title="Oficial name"
              tooltip="Enter the name of the buyer (e.g. Aeroporto Friuli Venezia Giulia S.p.A.)"
              fieldLabel="Name of Organization"
              fieldName="officialName"
              :counter="50"
              @updateValue="updatedValueInParent"
            ></InputField>
            <InputField
              instance="tender"
              title="National Registration Number"
              tooltip="Enter the national registration number of the buyer (e.g.ULG BE 0325 777 171)"
              fieldLabel="National Registration Number"
              fieldName="registrationNumber"
              :counter="10"
              @updateValue="updatedValueInParent"
            ></InputField>
            <SelectOption
              instance="tender"
              title="Country"
              btnTooltip="Choose the country of the buyer"
              label="Choose the country"
              itemTitle="countryName"
              :items="countries"
              fieldName="countryId"
              @updateValue="updatedValueInParent">
            </SelectOption>
            <InputField
              instance="tender"
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
              instance="tender"
              title="First Name"
              tooltip="Enter the name of contact person"
              fieldLabel="Name"
              fieldName="firstName"
              :counter="50"
              @updateValue="updatedValueInParent"
            ></InputField>
            <InputField
              instance="tender"
              title="Last Name"
              tooltip="Enter the surname of contact person"
              fieldLabel="Surname"
              fieldName="lastName"
              :counter="50"
              @updateValue="updatedValueInParent"
            ></InputField>
            <InputField
              instance="tender"
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
              instance="tender"
              title="CPV code"
              btnTooltip="Choose CPV code with corresponded to this code description"
              label="CPV Code"
              itemTitle="code"
              :items="cpvs"
              fieldName="cpvId"
              @updateValue="updatedValueInParent">
            </SelectOption>
            <SelectOption
              instance="tender"
              title="Tipe of Tender"
              btnTooltip="Choose the type of contract"
              label="Type"
              itemTitle="title"
              :items="typesOfTender"
              fieldName="typeOfTenderId"
              @updateValue="updatedValueInParent">
            </SelectOption>
            <InputField
              instance="tender"
              title="Description"
              tooltip="Enter detailed information about the Tender"
              fieldLabel="Description"
              fieldName="details"
              :counter="250"
              @updateValue="updatedValueInParent"
            ></InputField>
            <InputField
              instance="tender"
              title="Maximum Tender Value"
              tooltip="Enter maximum price of the Tender contract"
              fieldLabel="Maximum tender value"
              fieldName="maxPrice"
              inputFieldType="number"
              @updateValue="updatedValueInParent"
            ></InputField>
            <InputField
              instance="tender"
              title="Minimum Tender Value"
              tooltip="Enter minimum price of the Tender contract"
              fieldLabel="Minimum tender value"
              fieldName="minPrice"
              inputFieldType="number"
              @updateValue="updatedValueInParent"
            ></InputField>
            <SelectOption
              instance="tender"
              title="Currency"
              btnTooltip="Choose the currency"
              label="Currency"
              itemTitle="currencyType"
              :items="currencies"
              fieldName="currencyId"
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
              fieldName="deadline"
              inputFieldType="date"
              :startDate="minDeadline"
              @updateValue="updatedValueInParent"
            ></InputField>
            <InputField
              instance="tender"
              title="Deadline for Signing"
              tooltip="Choose the deadline date for signed contract submission"
              fieldLabel="DeadLine for Signed Contract Submission"
              fieldName="signedContractDeadline"
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
              fileType="awardDecision"
              labelId="award-decision-input"
              @updateValue="updatedValueInParent"
              @openDocument="openDocumentInParent"
            ></InputFileField>
            <InputFileField
              instance="attachment"
              label="* Reject decision"
              fileType="rejectDecision"
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
import { restApiConfig } from "@/rest.api.config"
import { format } from 'date-fns'
import { totalStore,  } from "@/components/actions"
import { successAlert, exceptionAlert } from "@/components/alerts"
import InputField from "@/components/childs/InputField.vue"
import ToolBarTitle from "@/components/childs/ToolBarTitle.vue"
import Chapter from "@/components/childs/Chapter.vue"
import SelectOption from "@/components/childs/SelectOption.vue"
import InputFileField from "@/components/childs/InputFileField.vue"
import ModalFileRenderer from "@/components/childs/ModalFileRenderer.vue"
import ConfirmationMenu from "@/components/childs/ConfirmationMenu.vue"
import axios from "axios"

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
    countries: [],
    typesOfTender: [],
    cpvs: [],
    currencies: [],
    minDeadline: null,
    isDisabled: true,
    currentDate: null,
    tender: {},
    valid: false,
    isDialog: false,
    attachment: {},
    documentUrl: '',
    totalStore,
    successAlert,
    exceptionAlert,
  }),

  methods: {
    async getListOf(listName) {
      try {
        const response = await axios.get(`${restApiConfig.host}${restApiConfig[listName]}`, {
          withCredentials: true,
          headers: {
            'Accept': 'application/json',
          }
        });
        this[listName] = response.data;
      } catch (error) {
        this.exceptionAlert.activateAlert("Error occurred when fetching the data: " + error)
      }
    },

    async createTender() {
      this.$router.push("/module/contractor/tenders")
      try {
        await Promise.all([
          this.uploadDocument(this.attachment.contract, 'contractFileName'),
          this.uploadDocument(this.attachment.awardDecision, 'awardDecisionFileName'),
          this.uploadDocument(this.attachment.rejectDecision, 'rejectDecisionFileName'),
        ]);
        await this.saveTender();
        this.totalStore.getTotalByModule(this.$route.params.role);
        this.successAlert.activateAlert("Tender was successfully created");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.exceptionAlert.activateAlert(error.response.data.message);
        } else {
          this.exceptionAlert.activateAlert(error);
        }
      }
    },

    async saveTender() {
      this.tender.publication = this.currentDate;
      await axios.post(`${restApiConfig.host}${restApiConfig.newTender}`, this.tender, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });
    },

    async uploadDocument(document, fileName) {
      const formData = new FormData();
      formData.append("document", document);
      const response = await axios.post(`${restApiConfig.host}${restApiConfig.uploadFile}`, formData, {
        withCredentials: true,
        headers: {
          "Accept": "*/*",
          "Content-Type": "multipart/form-data"
        }
      });
      this.tender[fileName] = response.data.fileName;
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

  mounted() {
    this.getListOf('countries');
    this.getListOf('cpvs');
    this.getListOf('typesOfTender');
    this.getListOf('currencies');
    this.currentDate = format(new Date(), 'yyyy-MM-dd');
    this.minDeadline = format(new Date().getTime() + 86400000, 'yyyy-MM-dd');
  }
}
</script>
