<template>
  <v-toolbar color="blue" extended extension-height="100">
    <template v-slot:extension>
      <v-container class="px-15">
        <v-toolbar-title class="ml-10 mb-15" style="font-size: 2rem">Create new Offer</v-toolbar-title>
      </v-container>
    </template>
  </v-toolbar>

  <v-card class="mt-n7 mx-auto" elevation="8" max-width="1000">
    <v-container class="pa-10">
      <v-form>

        <v-row>
          <v-container class="d-flex align-center">
            <p class="chapter-label">Bidder</p>
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
            <v-text-field single-line color="blue" variant="outlined" v-model="offer.organizationName" :counter="50"
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
            <v-text-field single-line color="blue" variant="outlined" v-model="offer.nationalRegistrationNumber"
              :counter="10" label="National Registration Number" required density="compact">
            </v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-chip class="required" variant="text">Country
              <v-btn size=auto class="ml-2" icon color="transparent" variant="flat">
                <v-tooltip activator="parent" location="top">Choose the country</v-tooltip>
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
                <v-tooltip activator="parent" location="top">Enter the city</v-tooltip>
                <v-icon icon="mdi-information-outline" class="inf-icon"></v-icon>
              </v-btn>
            </v-chip>
            <v-text-field single-line color="blue" variant="outlined" v-model="offer.city" :counter="50" label="City"
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
            <v-text-field single-line color="blue" variant="outlined" v-model="offer.firstName" :counter="50"
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
            <v-text-field single-line color="blue" variant="outlined" v-model="offer.lastName" :counter="50"
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
            <v-text-field single-line color="blue" variant="outlined" v-model="offer.phone" :counter="8" type="number"
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
            <v-chip class="required" variant="text">Bid Price
              <v-btn size=auto class="ml-2" icon color="transparent" variant="flat">
                <v-tooltip activator="parent" location="top">Enter price which you can Offer</v-tooltip>
                <v-icon icon="mdi-information-outline" class="inf-icon"></v-icon>
              </v-btn>
            </v-chip>
            <v-text-field single-line color="blue" variant="outlined" v-model="offer.bidPrice"
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
            <p class="chapter-label">Documents</p>
            <div class="horizontal-divider"></div>
          </v-container>
        </v-row>

        <v-item-group class="py-5 mx-2">
          <v-row class="mt-5 mx-8">
            <v-item v-if="isDocument">
              <v-chip
                size="large"
                class="mb-6"
                closable color="blue"
                prepend-icon="mdi-file-document-multiple-outline"
                label
                @click:close="isDocument = false">
              <div
                id="text"
                style="width: 50rem"
                @click="openDialog(document)"
              > {{ document.name }} </div>
              </v-chip
              ></v-item>
            <v-item v-if="!isDocument">
              <v-text-field
                single-line
                label="* Document"
                variant="outlined"
                density="compact"
              ></v-text-field>
              <input
                input
                id="document-input"
                class="d-none"
                type="file"
                accept="application/pdf"
                @change="onFileChangedDocument">
              <v-btn
                color="primary"
                rounded="0"
                height="40"
                width="150">
              <label
                class="file-label"
                for="document-input"
              >Upload</label>
              <v-tooltip
                activator="parent"
                location="top"
                >Upload document that will be displayed for a Contractor</v-tooltip>
              </v-btn
            ></v-item>
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
      <v-col md="3">
        <v-btn type="submit" block class="mt-2" variant="outlined" color="blue"
          size="large" @click="cancelDialog = true">
          Cancel
        </v-btn>
        </v-col>
      <v-col md="3">
        <v-btn type="submit" block class="mt-2" variant="flat" color="blue"
          size="large" @click="createOffer">
          Send Offer
        </v-btn>
      </v-col>
    </v-row>
  </v-container>

  <div class="text-center">
    <v-dialog v-model="cancelDialog" activator="parent" width="500">
      <v-card>
        <v-toolbar color="primary" title="Cancellation confirmation" height="50"></v-toolbar>
          <v-card-text class="text-center">
            <div>Do you really want to cancel the Offer creation?</div>
            <div>All you entered data will be lost</div>
          </v-card-text>
          <v-row class="justify-center mb-8 mt-3">
            <v-btn @click="cancelDialog = false" width="160" class="mx-2">No</v-btn>
            <v-btn href="/module/bidder/tenders" color="primary" width="160" class="mx-2">Yes</v-btn>
          </v-row>
      </v-card>
    </v-dialog>
  </div>

</template>

<script>
import { restApiConfig } from "@/rest.api.config"

export default {
  data: () => ({
    countries: [],
    currencies: [],
    country: null,
    currency: null,
    isDisabled: true,
    offer: {
      tenderId: '',
      organizationName: '',
      nationalRegistrationNumber: '',
      countryId: '',
      city: '',
      firstName: '',
      lastName: '',
      phone: '',
      bidPrice: 0,
      currencyId: '',
      documentName: '',
    },
    valid: false,
    dialog: false,
    cancelDialog: false,
    isDocument: false,
    document: null,
    documentUrl: '',
  }),

  methods: {
    onFileChangedDocument(event) {
      this.isDocument = true;
      this.document = event.target.files[0];
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

    async createOffer() {
      this.$router.push("/module/bidder/tenders")
      try {
        await Promise.all([
          this.uploadDocument(),
        ]);
        await this.saveOffer();
        alert("Offer was created");
      } catch (error) {
        alert("Error occured when saving the tender");
      }
    },

    async saveOffer() {
      this.offer.countryId = this.country.id;
      this.offer.currencyId = this.currency.id;
      await fetch(`${restApiConfig.host}${restApiConfig.newOffer}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.offer)
      }).then(response => {
        if (response.status !== 200) {
          alert("There was an error saving the offer!");
        }
      }).catch(error => {
        alert("There was an error!");
      });
    },

    async uploadDocument() {
      const formData = new FormData()
      formData.append("document", this.document)
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
          this.offer.documentName = dataFromResopnse.fileName;
        });
    },
  },

  mounted() {
    this.offer.tenderId = this.$route.params.tender_id;
    this.getCountries();
    this.getCurrencies();
  }
}

</script>
