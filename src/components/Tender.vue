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
                title="Oficial name"
                tooltip="Enter the name of the buyer (e.g. Aeroporto Friuli Venezia Giulia S.p.A.)"
                fieldLabel="Name of Organization"
                fieldName="organizationName"
                :counter="50"
                @updateValue="updatedValueInParent"
            ></InputField>

            <InputField
                title="National Registration Number"
                tooltip="Enter the national registration number of the buyer (e.g.ULG BE 0325 777 171)"
                fieldLabel="National Registration Number"
                fieldName="nationalRegistrationNumber"
                :counter="10"
                @updateValue="updatedValueInParent"
            ></InputField>

            <SelectOption
                title="Country"
                btnTooltip="Choose the country of the buyer"
                label="Choose the country"
                itemTitle="countryName"
                :items="countries"
                fieldName="countryId"
                @updateValue="updatedValueInParent">
            </SelectOption>

            <InputField
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
                title="First Name"
                tooltip="Enter the name of contact person"
                fieldLabel="Name"
                fieldName="firstName"
                :counter="50"
                @updateValue="updatedValueInParent"
            ></InputField>

            <InputField
                title="Last Name"
                tooltip="Enter the surname of contact person"
                fieldLabel="Surname"
                fieldName="lastName"
                :counter="50"
                @updateValue="updatedValueInParent"
            ></InputField>

            <InputField
                title="Phone number"
                tooltip="Enter the phone number of the contact person"
                fieldLabel="Phone"
                fieldName="phone"
                :counter="8"
                inputFieldType="number"
                @updateValue="updatedValueInParent"
            ></InputField>
        </v-row>

        <v-row>
          <Chapter title="Subject matter of the procurement"></Chapter>
        </v-row>

        <v-row class="mt-5 mx-8">
          <SelectOption
                title="CPV code"
                btnTooltip="Choose CPV code with corresponded to this code description"
                label="CPV Code"
                itemTitle="code"
                :items="cpvs"
                fieldName="cpvId"
                @updateValue="updatedValueInParent">
            </SelectOption>
          <v-col cols="12" md="4">
            <v-chip class="required" variant="text">Tipe of Tender
              <v-btn size=auto class="ml-2" icon color="transparent" variant="flat">
                <v-tooltip activator="parent" location="top">Choose the type of contract</v-tooltip>
                <v-icon icon="mdi-information-outline" class="inf-icon"></v-icon>
              </v-btn>
            </v-chip>
            <v-select single-line color="blue" variant="outlined" v-model="tender.type" label="Type" required
              density="compact" :items="tenderTypes">
            </v-select>
          </v-col>

          <InputField
                title="Description"
                tooltip="Enter detailed information about the Tender"
                fieldLabel="Description"
                fieldName="details"
                :counter="250"
                @updateValue="updatedValueInParent"
            ></InputField>

            <InputField
                title="Maximum Tender Value"
                tooltip="Enter maximum price of the Tender contract"
                fieldLabel="Maximum tender value"
                fieldName="maxPrice"
                inputFieldType="number"
                @updateValue="updatedValueInParent"
            ></InputField>

            <InputField
                title="Minimum Tender Value"
                tooltip="Enter minimum price of the Tender contract"
                fieldLabel="Minimum tender value"
                fieldName="minPrice"
                inputFieldType="number"
                @updateValue="updatedValueInParent"
            ></InputField>

            <SelectOption
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
                title="Publication Date"
                tooltip="Today date"
                :fieldLabel="currentDate"
                fieldName="publication"
                :isDisabled="true"
            ></InputField>

            <InputField
                title="Deadline for Offer Submission"
                tooltip="Choose the deadline date for Offer submission"
                fieldLabel="Deadline for Offer Submission"
                fieldName="deadline"
                inputFieldType="date"
                :startDate="minDeadline"
                @updateValue="updatedValueInParent"
            ></InputField>

            <InputField
                title="Deadline for Signing"
                tooltip="Choose the deadline date for signed contract submission"
                fieldLabel="DeadLine for Signed Contract Submission"
                fieldName="deadlineForSignedContract"
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
            label="* Contract"
            fileType="contract"
            labelId="contract-input"
            @updateValue="updateFileDataInParent"
            @openDocument="openDocumentInParent"
          ></InputFileField>
          <InputFileField
            label="* Award decision"
            fileType="awardDecision"
            labelId="award-decision-input"
            @updateValue="updateFileDataInParent"
            @openDocument="openDocumentInParent"
          ></InputFileField>
          <InputFileField
            label="* Reject decision"
            fileType="rejectDecision"
            labelId="reject-decision-input"
            @updateValue="updateFileDataInParent"
            @openDocument="openDocumentInParent"
          ></InputFileField>
        </v-item-group>

        <v-dialog v-model="isDialog" width="auto">
          <v-card>
            <iframe :src=documentUrl width="800" height="500">
            </iframe>
            <v-card-actions>
              <v-btn color="primary" block @click="isDialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-form>
    </v-container>
  </v-card>

  <v-container class="px-10">
    <v-row class="justify-end pb-15 mr-12 mt-3">
      <v-col cols="9" md="2">
        <v-btn type="submit" block class="mt-2" variant="outlined" color="blue"
          size="large" @click="cancelDialog = true">
          Cancel
        </v-btn>
        </v-col>
      <v-col cols="9" md="2">
        <v-btn type="submit" block class="mt-2" variant="flat" color="blue"
          size="large" @click="createTender">
          Publish
        </v-btn>
      </v-col>
    </v-row>
  </v-container>

  <div class="text-center">
    <v-dialog v-model="cancelDialog" activator="parent" width="500">
      <v-card>
        <v-toolbar color="primary" title="Cancellation confirmation" height="50"></v-toolbar>
          <v-card-text class="text-center">
            <div>Do you really want to cancel the new Tender creation?</div>
            <div>All you entered data will be lost</div>
          </v-card-text>
          <v-row class="justify-center mb-8 mt-3">
            <v-btn @click="cancelDialog = false" width="160" class="mx-2">No</v-btn>
            <v-btn href="/module/contractor/tenders" color="primary" width="160" class="mx-2">Yes</v-btn>
          </v-row>
      </v-card>
    </v-dialog>
  </div>

</template>

<script>
import { restApiConfig } from "@/rest.api.config"
import { format } from 'date-fns'
import { totalStore, successAlert } from "@/components/actions"
import InputField from "@/components/childs/InputField.vue"
import ToolBarTitle from "@/components/childs/ToolBarTitle.vue"
import Chapter from "@/components/childs/Chapter.vue"
import SelectOption from "@/components/childs/SelectOption.vue"
import InputFileField from "@/components/childs/InputFileField.vue"

export default {
  components:{
    InputField,
    ToolBarTitle,
    Chapter,
    SelectOption,
    InputFileField
  },
  data: () => ({
    countries: [],
    tenderTypes: [],
    cpvs: [],
    currencies: [],
    currency: null,
    minDeadline: null,
    isDisabled: true,
    currentDate: null,
    tender: {
      type: null,
    },
    valid: false,
    isDialog: false,
    cancelDialog: false,
    isContract: false,
    isAwardDecision: false,
    isRejectedDecision: false,
    attachment: {},
    documentUrl: '',
    totalStore,
    successAlert
  }),

  methods: {
    onFileChanged(event, isFile, choosedFile) {
      this[isFile] = true;
      this.attachment[choosedFile] = event.target.files[0];
    },

    openDialog(document) {
      this.documentUrl = URL.createObjectURL(document);
      this.isDialog = true;
    },

    getListOf(listName) {
      fetch(`${restApiConfig.host}${restApiConfig[listName]}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      })
        .then(response => response.json())
        .then(dataFromResopnse => this[listName] = dataFromResopnse)
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
        alert("Error occured when saving the tender");
      }
    },

   async saveTender() {
    this.tender.publication = this.currentDate
      await fetch(`${restApiConfig.host}${restApiConfig.newTender}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.tender)
      }).then(response => {
        if (response.status !== 200) {
          alert("There was an error when saving the tender!");
        }
      }).catch(error => {
        alert("There was an error!");
      });
    },

    async uploadDocument(document, fileName) {
      const formData = new FormData()
      formData.append("document", document)
      await fetch(`${restApiConfig.host}${restApiConfig.uploadFile}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Accept": "*/*",
        },
        body: formData,
      })
        .then(response => response.json())
        .then(dataFromResopnse => {
          this.tender[fileName] = dataFromResopnse.fileName;
        });
    },

    updatedValueInParent(value, fieldName) {
      this.tender[fieldName] = value;
    },

    updateFileDataInParent(fileType, file){
      this.attachment[fileType] = file
    },

    openDocumentInParent(fileUrl){
      this.documentUrl = fileUrl
      this.isDialog = true
    }
  },

  mounted() {
    this.getListOf('countries');
    this.getListOf('cpvs');
    this.getListOf('tenderTypes');
    this.getListOf('currencies');
    this.currentDate = format(new Date(), 'yyyy-MM-dd');
    this.minDeadline = format(new Date().getTime() + 86400000, 'yyyy-MM-dd');
  }
}
</script>
