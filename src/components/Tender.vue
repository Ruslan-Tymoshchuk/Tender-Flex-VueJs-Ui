<template>
  <v-toolbar color="blue" extended extension-height="170">
    <v-row>
      <v-img class="ml-10" max-width="140" src="@/assets/tender-flex-Logo.svg" />
      <v-spacer></v-spacer>
      <v-btn icon class="mr-6">
        <v-icon>mdi-export</v-icon>
      </v-btn>
      <v-divider class="mt-1" color="black"></v-divider>
    </v-row>
    <template v-slot:extension>
      <v-container class="px-15">
        <v-toolbar-title class="mx-10 mb-10" style="font-size: 2rem">Create new Tender</v-toolbar-title>
      </v-container>
    </template>
  </v-toolbar>

  <v-card class="mt-n7 mx-auto" elevation="8" max-width="1000">
    <v-container class="pa-10">
      <v-form v-model="valid">

        <v-row>
          <v-container class="d-flex align-center">
            <p class="chapter-label">Contractor</p>
            <v-div class="horizontal-divider"></v-div>
          </v-container>
        </v-row>

        <v-row class="mt-5 mx-8">
          <v-col cols="12" md="4">
            <v-chip class="required" variant="text" :color=chipColor>Oficial name
              <v-btn size=auto class="ml-2" icon color="transparent" variant="flat">
                <v-tooltip activator="parent" location="top">
                  Enter the name of the buyer (e.g. Aeroporto Friuli Venezia Giulia S.p.A.)
                </v-tooltip>
                <v-icon icon="mdi-information-outline" class="inf-icon"></v-icon>
              </v-btn>
            </v-chip>
            <v-text-field single-line color="blue" variant="outlined" v-model="tender.organizationName" :counter="50"
              label="Name of Organization" required density="compact">
            </v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-chip class="required" variant="text" :color=chipColor>National Registration Number
              <v-btn size=auto class="ml-2" icon color="transparent" variant="flat">
                <v-tooltip activator="parent" location="top">
                  Enter the national registration number of the buyer (e.g.ULG BE 0325 777 171)
                </v-tooltip>
                <v-icon icon="mdi-information-outline" class="inf-icon"></v-icon>
              </v-btn>
            </v-chip>
            <v-text-field single-line color="blue" variant="outlined" v-model="tender.nationalRegistrationNumber"
              :counter="10" label="National Registration Number" required density="compact">
            </v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-chip class="required" variant="text" :color=chipColor>Country
              <v-btn size=auto class="ml-2" icon color="transparent" variant="flat">
                <v-tooltip activator="parent" location="top">Choose the country of the buyer</v-tooltip>
                <v-icon icon="mdi-information-outline" class="inf-icon"></v-icon>
              </v-btn>
            </v-chip>
            <v-select single-line color="blue" variant="outlined" v-model="tender.country" label="Choose the country"
              required density="compact" :items="countries" item-value="id" item-title="countryName" return-object persistent-hint>
            </v-select>
          </v-col>

          <v-col cols="12" md="4">
            <v-chip class="required" variant="text" :color=chipColor>City / Town
              <v-btn size=auto class="ml-2" icon color="transparent" variant="flat">
                <v-tooltip activator="parent" location="top">Enter the city of the buyer</v-tooltip>
                <v-icon icon="mdi-information-outline" class="inf-icon"></v-icon>
              </v-btn>
            </v-chip>
            <v-text-field single-line color="blue" variant="outlined" v-model="tender.city" :counter="50" label="City"
              required density="compact">
            </v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-container class="d-flex align-center">
            <p class="chapter-label">Contact person</p>
            <div class="horizontal-divider"></div>
          </v-container>
        </v-row>

        <v-row class="mt-5 mx-8">
          <v-col cols="12" md="4">
            <v-chip class="required" variant="text" :color=chipColor>First Name
              <v-btn size=auto class="ml-2" icon color="transparent" variant="flat">
                <v-tooltip activator="parent" location="top">Enter the name of contact person</v-tooltip>
                <v-icon icon="mdi-information-outline" class="inf-icon"></v-icon>
              </v-btn>
            </v-chip>
            <v-text-field single-line color="blue" variant="outlined" v-model="tender.firstName" :counter="50"
              label="Name" required density="compact">
            </v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-chip class="required" variant="text" :color=chipColor>Last Name
              <v-btn size=auto class="ml-2" icon color="transparent" variant="flat">
                <v-tooltip activator="parent" location="top">Enter the surname of contact person</v-tooltip>
                <v-icon icon="mdi-information-outline" class="inf-icon"></v-icon>
              </v-btn>
            </v-chip>
            <v-text-field single-line color="blue" variant="outlined" v-model="tender.lastName" :counter="50"
              label="Surname" required density="compact">
            </v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-chip class="required" variant="text" :color=chipColor>Phone number
              <v-btn size=auto class="ml-2" icon color="transparent" variant="flat">
                <v-tooltip activator="parent" location="top">
                  Enter the phone number of the contact person
                </v-tooltip>
                <v-icon icon="mdi-information-outline" class="inf-icon"></v-icon>
              </v-btn>
            </v-chip>
            <v-text-field single-line color="blue" variant="outlined" v-model="tender.phone" :counter="8" type="number"
              label="Phone" required density="compact">
            </v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-container class="d-flex align-center">
            <p class="chapter-label">Subject matter of the procurement</p>
            <div class="horizontal-divider"></div>
          </v-container>
        </v-row>

        <v-row class="mt-5 mx-8">
          <v-col cols="12" md="4">
            <v-chip class="required" variant="text" :color=chipColor>CPV code
              <v-btn size=auto class="ml-2" icon color="transparent" variant="flat">
                <v-tooltip activator="parent" location="top">
                  Choose CPV code with corresponded to this code description
                </v-tooltip>
                <v-icon icon="mdi-information-outline" class="inf-icon"></v-icon>
              </v-btn>
            </v-chip>
            <v-text-field single-line color="blue" variant="outlined" v-model="tender.cpvCode" :counter="10" label="CPV Code"
              required density="compact">
            </v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-chip class="required" variant="text" :color=chipColor>Tipe of Tender
              <v-btn size=auto class="ml-2" icon color="transparent" variant="flat">
                <v-tooltip activator="parent" location="top">Choose the type of contract</v-tooltip>
                <v-icon icon="mdi-information-outline" class="inf-icon"></v-icon>
              </v-btn>
            </v-chip>
            <v-select single-line color="blue" variant="outlined" v-model="tender.type" label="Type" required
              density="compact" :items="tenderTypes">
            </v-select>
          </v-col>

          <v-col cols="12" md="4">
            <v-chip class="required" variant="text" :color=chipColor>Description
              <v-btn size=auto class="ml-2" icon color="transparent" variant="flat">
                <v-tooltip activator="parent" location="top">Enter detailed information about the Tender</v-tooltip>
                <v-icon icon="mdi-information-outline" class="inf-icon"></v-icon>
              </v-btn>
            </v-chip>
            <v-text-field single-line color="blue" variant="outlined" v-model="tender.description" label="Description"
              required :counter="250" density="compact">
            </v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-chip class="required" variant="text" :color=chipColor>Maximum Tender Value
              <v-btn size=auto class="ml-2" icon color="transparent" variant="flat">
                <v-tooltip activator="parent" location="top">Enter minimum price of the Tender contract</v-tooltip>
                <v-icon icon="mdi-information-outline" class="inf-icon"></v-icon>
              </v-btn>
            </v-chip>
            <v-text-field single-line color="blue" variant="outlined" v-model="tender.maxPrice"
              label="Maximum tender value" required density="compact" type="number">
            </v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-chip class="required" variant="text" :color=chipColor>Minimum Tender Value
              <v-btn size=auto class="ml-2" icon color="transparent" variant="flat">
                <v-tooltip activator="parent" location="top">Enter maximum price of the Tender contract</v-tooltip>
                <v-icon icon="mdi-information-outline" class="inf-icon"></v-icon>
              </v-btn>
            </v-chip>
            <v-text-field single-line color="blue" variant="outlined" v-model="tender.minPrice"
              label="Minimum tender value" required density="compact" type="number">
            </v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-chip class="required" variant="text" :color=chipColor>Currency
              <v-btn size=auto class="ml-2" icon color="transparent" variant="flat">
                <v-tooltip activator="parent" location="top">Choose the currency</v-tooltip>
                <v-icon icon="mdi-information-outline" class="inf-icon"></v-icon>
              </v-btn>
            </v-chip>
            <v-select single-line color="blue" variant="outlined" v-model="tender.currency" label="Currency" required
              density="compact" :items="currencies" item-value="id" item-title="currencyType" return-object persistent-hint>
            </v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-container class="d-flex align-center">
            <p class="chapter-label">Date</p>
            <div class="horizontal-divider"></div>
          </v-container>
        </v-row>

        <v-row class="mt-5 mx-8">
          <v-col cols="12" md="4">
            <v-chip class="required" variant="text" :color=chipColor>Publication Date
              <v-btn size=auto class="ml-2" icon color="transparent" variant="flat">
                <v-tooltip activator="parent" location="top">Today date</v-tooltip>
                <v-icon icon="mdi-information-outline" class="inf-icon"></v-icon>
              </v-btn>
            </v-chip>
            <v-text-field single-line color="blue" variant="outlined" v-model="tender.publicationDate"
              label="Publication Date" required density="compact" disabled>
            </v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-chip class="required" variant="text" :color=chipColor>Deadline for Offer Submission
              <v-btn size=auto class="ml-2" icon color="transparent" variant="flat">
                <v-tooltip activator="parent" location="top">Choose the deadline date for Offer submission</v-tooltip>
                <v-icon icon="mdi-information-outline" class="inf-icon"></v-icon>
              </v-btn>
            </v-chip>
            <v-text-field single-line color="blue" variant="outlined" v-model="tender.deadline"
              label="Deadline for Offer Submission" type="date" required density="compact">
            </v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-chip class="required" variant="text" :color=chipColor>Deadline for Signing
              <v-btn size=auto class="ml-2" icon color="transparent" variant="flat">
                <v-tooltip activator="parent" location="top">
                  Choose the deadline date for signed contract submission
                </v-tooltip>
                <v-icon icon="mdi-information-outline" class="inf-icon"></v-icon>
              </v-btn>
            </v-chip>
            <v-text-field single-line color="blue" variant="outlined" v-model="tender.deadlineForSignedContract"
              label="DeadLine for Signed Contract Submission" required density="compact" type="date">
            </v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-container class="d-flex align-center">
            <p class="chapter-label">Documents</p>
            <div class="horizontal-divider"></div>
          </v-container>
        </v-row>

        <v-item-group class="py-5 mx-2">
          <v-row class="mt-5 mx-8">
            <v-item v-if="isContract">
              <v-chip
                size="large"
                class="mb-6"
                closable color="blue"
                prepend-icon="mdi-file-document-multiple-outline"
                label
                @click:close="isContract = false">
              <div
                id="text"
                style="width: 50rem"
                @click="openDialog(attachment.contract)"
              > {{ attachment.contract.name }} </div>
              </v-chip
              ></v-item>
            <v-item v-if="!isContract">
              <v-text-field
                single-line
                label="* Contract"
                variant="outlined"
                density="compact"
              ></v-text-field>
              <input
                input
                id="contract-input"
                class="d-none"
                type="file"
                accept="application/pdf"
                @change="onFileChangedContract">
              <v-btn
                color="primary"
                rounded="0"
                height="40"
                width="150">
              <label
                class="file-label"
                for="contract-input"
              >Upload</label>
              </v-btn
            ></v-item>
          </v-row>

          <v-row class="mt-5 mx-8">
            <v-item v-if="isAwardDecision">
              <v-chip
                size="large"
                class="mb-6"
                closable
                color="blue"
                prepend-icon="mdi-file-document-multiple-outline"
                label
                @click:close="isAwardDecision = false"
              ><div
                id="text"
                style="width: 50rem"
                @click="openDialog(attachment.awardDecision)"
              > {{ attachment.awardDecision.name }} </div>
              </v-chip>
            </v-item>
            <v-item v-if="!isAwardDecision">
              <v-text-field
                single-line
                label="* Award decision"
                variant="outlined"
                density="compact"
              ></v-text-field>
              <input
                id="award-decision-input"
                class="d-none"
                type="file"
                accept="application/pdf"
                @change="onFileChangedAwardDecision"
              ><v-btn
                color="primary"
                rounded="0"
                height="40"
                width="150"
              ><label
                class="file-label"
                for="award-decision-input"
              >Upload</label
              ></v-btn>
            </v-item>
          </v-row>
          <v-row class="mt-5 mx-8">
            <v-item v-if="isRejectedDecision">
              <v-chip
                size="large"
                class="mb-6"
                closable
                color="blue"
                prepend-icon="mdi-file-document-multiple-outline"
                label
                @click:close="isRejectedDecision = false"
              ><div
                id="text"
                style="width: 50rem"
                @click="openDialog(attachment.rejectDecision)"
              > {{ attachment.rejectDecision.name }} </div>
              </v-chip>
            </v-item>
            <v-item v-if="!isRejectedDecision">
              <v-text-field
                single-line
                label="* Reject decision"
                variant="outlined"
                density="compact"
              ></v-text-field>
              <input
                id="reject-decision-input"
                class="d-none"
                type="file"
                accept="application/pdf"
                @change="onFileChangedRejectDecision"
              ><v-btn
                color="primary"
                rounded="0"
                height="40"
                width="150"
              ><label
                class="file-label"
                for="reject-decision-input"
              >Upload</label
              ></v-btn>
            </v-item>
          </v-row>
        </v-item-group>

        <v-dialog v-model="dialog" width="auto">
          <v-card>
            <iframe :src=documentUrl width="800" height="500">
            </iframe>
            <v-card-actions>
              <v-btn color="primary" block @click="dialog = false">Close</v-btn>
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
          size="large">
          Cancel
        </v-btn>
        </v-col>
      <v-col cols="9" md="2">
        <v-btn type="submit" block class="mt-2" variant="flat" color="blue"
          size="large">
          Publish
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { restApiConfig } from "@/rest.api.config"
const  chipColor = "#bdbdbd"

export default {
  data: () => ({
    token: JSON.parse(localStorage.getItem('user')).token,
    countries: [],
    tenderTypes: [],
    currencies: [],
    tender: {
      organizationName: '',
      nationalRegistrationNumber: '',
      country: null,
      city: '',
      firstName: '',
      lastName: '',
      phone: '',
      cpvCode: '',
      type: null,
      description: '',
      maxPrice: '',
      minPrice: '',
      currency: null,
      publicationDate: new Date().toDateString(),
      deadline: null,
      deadlineForSignedContract: null,
    },
    valid: false,
    dialog: false,
    isContract: false,
    isAwardDecision: false,
    isRejectedDecision: false,
    attachment: {
      contract: null,
      awardDecision: null,
      rejectDecision: null,
    },
    documentUrl: '',
  }),

  methods: {
    onFileChangedContract(event) {
      this.isContract = true;
      this.attachment.contract = event.target.files[0];
    },

    onFileChangedAwardDecision(event) {
      this.isAwardDecision = true;
      this.attachment.awardDecision = event.target.files[0];
    },

    onFileChangedRejectDecision(event) {
      this.isRejectedDecision = true;
      this.attachment.rejectDecision = event.target.files[0];
    },

    openDialog(document) {
      this.documentUrl = URL.createObjectURL(document);
      this.dialog = true;
    },

    getCountries() {
      fetch(`${restApiConfig.host}${restApiConfig.countries}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + this.token,
          'Accept': 'application/json',
        }
      })
        .then(response => response.json())
        .then(dataFromResopnse => this.countries = dataFromResopnse)
    },

    getTenderTypes() {
      fetch(`${restApiConfig.host}${restApiConfig.tenderTypes}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + this.token,
          'Accept': 'application/json',
        }
      })
        .then(response => response.json())
        .then(dataFromResopnse => this.tenderTypes = dataFromResopnse)
    },

    getCurrencies() {
      fetch(`${restApiConfig.host}${restApiConfig.currencies}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + this.token,
          'Accept': 'application/json',
        },
      })
        .then(response => response.json())
        .then(dataFromResopnse => this.currencies = dataFromResopnse);
    }
  },

  mounted() {
    this.getCountries();
    this.getTenderTypes();
    this.getCurrencies();
  }
  }

</script>
