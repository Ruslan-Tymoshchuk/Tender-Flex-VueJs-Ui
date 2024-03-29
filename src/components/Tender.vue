<template>
  <v-toolbar color="blue" extended extension-height="100">
    <template v-slot:extension>
      <v-container class="px-15">
        <v-toolbar-title class="ml-10 mb-15" style="font-size: 2rem">Create new Tender</v-toolbar-title>
      </v-container>
    </template>
  </v-toolbar>

  <v-card class="mt-n7 mx-auto" elevation="8" max-width="1000">
    <v-container class="pa-10">
      <v-form v-model="valid" fast-fail @submit.prevent="createTender">

        <v-row>
          <v-container class="d-flex align-center">
            <p class="chapter-label">Contractor</p>
            <v-div class="horizontal-divider"></v-div>
          </v-container>
        </v-row>

        <v-row class="mt-5 mx-8">
          <v-col cols="12" md="4">
            <v-chip class="required" variant="text">Oficial name
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
            <v-chip class="required" variant="text">National Registration Number
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
            <v-chip class="required" variant="text">Country
              <v-btn size=auto class="ml-2" icon color="transparent" variant="flat">
                <v-tooltip activator="parent" location="top">Choose the country of the buyer</v-tooltip>
                <v-icon icon="mdi-information-outline" class="inf-icon"></v-icon>
              </v-btn>
            </v-chip>
            <v-select single-line color="blue" variant="outlined" v-model="country" label="Choose the country"
              required density="compact" :items="countries" item-value="id" item-title="countryName" return-object persistent-hint>
            </v-select>
          </v-col>

          <v-col cols="12" md="4">
            <v-chip class="required" variant="text">City / Town
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
            <v-chip class="required" variant="text">First Name
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
            <v-chip class="required" variant="text">Last Name
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
            <v-chip class="required" variant="text">Phone number
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
            <v-chip class="required" variant="text">CPV code
              <v-btn size=auto class="ml-2" icon color="transparent" variant="flat">
                <v-tooltip activator="parent" location="top">
                  Choose CPV code with corresponded to this code description
                </v-tooltip>
                <v-icon icon="mdi-information-outline" class="inf-icon"></v-icon>
              </v-btn>
            </v-chip>
            <v-select single-line color="blue" variant="outlined" v-model="cpv" label="CPV Code"
              required density="compact" :items="cpvs" item-value="id" item-title="code" return-object persistent-hint>
            </v-select>
          </v-col>

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

          <v-col cols="12" md="4">
            <v-chip class="required" variant="text">Description
              <v-btn size=auto class="ml-2" icon color="transparent" variant="flat">
                <v-tooltip activator="parent" location="top">Enter detailed information about the Tender</v-tooltip>
                <v-icon icon="mdi-information-outline" class="inf-icon"></v-icon>
              </v-btn>
            </v-chip>
            <v-text-field single-line color="blue" variant="outlined" v-model="tender.details" label="Description"
              required :counter="250" density="compact">
            </v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-chip class="required" variant="text">Maximum Tender Value
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
            <v-chip class="required" variant="text">Minimum Tender Value
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
            <v-chip class="required" variant="text">Currency
              <v-btn size=auto class="ml-2" icon color="transparent" variant="flat">
                <v-tooltip activator="parent" location="top">Choose the currency</v-tooltip>
                <v-icon icon="mdi-information-outline" class="inf-icon"></v-icon>
              </v-btn>
            </v-chip>
            <v-select single-line color="blue" variant="outlined" v-model="currency" label="Currency" required
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
            <v-chip class="required" variant="text">Publication Date
              <v-btn size=auto class="ml-2" icon color="transparent" variant="flat">
                <v-tooltip activator="parent" location="top">Today date</v-tooltip>
                <v-icon icon="mdi-information-outline" class="inf-icon"></v-icon>
              </v-btn>
            </v-chip>
            <v-text-field single-line color="blue" variant="outlined" v-model="tender.publication"
              label="Publication Date" type="date" required density="compact" disabled>
            </v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-chip class="required" variant="text">Deadline for Offer Submission
              <v-btn size=auto class="ml-2" icon color="transparent" variant="flat">
                <v-tooltip activator="parent" location="top">Choose the deadline date for Offer submission</v-tooltip>
                <v-icon icon="mdi-information-outline" class="inf-icon"></v-icon>
              </v-btn>
            </v-chip>
            <v-text-field single-line color="blue" variant="outlined" v-model="tender.deadline"
              label="Deadline for Offer Submission" type="date" required density="compact" :min="minDeadline" @change="isDisabled = false">
            </v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-chip class="required" variant="text">Deadline for Signing
              <v-btn size=auto class="ml-2" icon color="transparent" variant="flat">
                <v-tooltip activator="parent" location="top">
                  Choose the deadline date for signed contract submission
                </v-tooltip>
                <v-icon icon="mdi-information-outline" class="inf-icon"></v-icon>
              </v-btn>
            </v-chip>
            <v-text-field single-line color="blue" variant="outlined" v-model="tender.deadlineForSignedContract"
              label="DeadLine for Signed Contract Submission" required density="compact" type="date" :min="minDeadline" :disabled="isDisabled">
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
                @click:close="isContract = false"
                @click="openDialog(attachment.contract)"
              ><div
                id="text"
                style="width: 50rem"
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
                @click="openDialog(attachment.awardDecision)"
              ><div
                id="text"
                style="width: 50rem"
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
                @click="openDialog(attachment.rejectDecision)"
              ><div
                id="text"
                style="width: 50rem"
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
import { totalStore, successAlert } from "@/components/actions";

export default {
  data: () => ({
    countries: [],
    tenderTypes: [],
    cpvs: [],
    currencies: [],
    country: null,
    cpv: null,
    currency: null,
    minDeadline: null,
    isDisabled: true,
    tender: {
      organizationName: '',
      nationalRegistrationNumber: '',
      countryId: '',
      city: '',
      firstName: '',
      lastName: '',
      phone: '',
      cpvId: '',
      type: null,
      details: '',
      maxPrice: 0,
      minPrice: 0,
      currencyId: '',
      publication: null,
      deadline: null,
      deadlineForSignedContract: null,
    },
    valid: false,
    dialog: false,
    cancelDialog: false,
    isContract: false,
    isAwardDecision: false,
    isRejectedDecision: false,
    attachment: {
      contract: null,
      awardDecision: null,
      rejectDecision: null,
    },
    documentUrl: '',
    totalStore,
    successAlert
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
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      })
        .then(response => response.json())
        .then(dataFromResopnse => this.countries = dataFromResopnse)
    },

    getCpvs() {
      fetch(`${restApiConfig.host}${restApiConfig.cpvs}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      })
        .then(response => response.json())
        .then(dataFromResopnse => this.cpvs = dataFromResopnse)
    },

    getTenderTypes() {
      fetch(`${restApiConfig.host}${restApiConfig.tenderTypes}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      })
        .then(response => response.json())
        .then(dataFromResopnse => this.tenderTypes = dataFromResopnse)
    },

    getCurrencies() {
      fetch(`${restApiConfig.host}${restApiConfig.currencies}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        },
      })
        .then(response => response.json())
        .then(dataFromResopnse => this.currencies = dataFromResopnse);
    },

    getCurrentdate() {
      this.tender.publication = format(new Date(), 'yyyy-MM-dd');
    },

    getDeadlineDate() {
      this.alert = true;
      this.minDeadline = format(new Date().getTime() + 86400000, 'yyyy-MM-dd');
    },

    async createTender() {
      this.$router.push("/module/contractor/tenders")
      try {
        await Promise.all([
          this.uploadContract(),
          this.uploadAwardDecision(),
          this.uploadRejectDecision(),
        ]);
        await this.saveTender();
        this.totalStore.getTotalByModule(this.$route.params.role);
        this.successAlert.activateAlert("Tender was successfully created");
      } catch (error) {
        alert("Error occured when saving the tender");
      }
    },

   async saveTender() {
      this.tender.countryId = this.country.id;
      this.tender.cpvId = this.cpv.id;
      this.tender.currencyId = this.currency.id;
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

    async uploadContract() {
      const formData = new FormData()
      formData.append("document", this.attachment.contract)
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
          this.tender.contractFileName = dataFromResopnse.fileName;
        });
    },

    async uploadAwardDecision() {
      const formData = new FormData()
      formData.append("document", this.attachment.awardDecision)
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
          this.tender.awardDecisionFileName = dataFromResopnse.fileName;
        });
    },

    async uploadRejectDecision() {
      const formData = new FormData()
      formData.append("document", this.attachment.rejectDecision)
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
          this.tender.rejectDecisionFileName = dataFromResopnse.fileName;
        });
    }
  },

  mounted() {
    this.getCountries();
    this.getCpvs();
    this.getTenderTypes();
    this.getCurrencies();
    this.getCurrentdate();
    this.getDeadlineDate();
  }
}

</script>
