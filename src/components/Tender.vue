<template>
  <v-toolbar color="blue">
    <v-container>
      <v-row>
        <v-img max-width="20dvh" src="@/assets/tender-flex-Logo.svg" />
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="ma-2 pa-2">mdi-export</v-icon>
        </v-btn>
      </v-row>
    </v-container>
  </v-toolbar>

  <v-divider></v-divider>

  <v-card flat rounded="0" outlined color="transparent">
    <v-toolbar color="blue" extended extension-height="100">
      <v-toolbar-title style="margin-left: 17vw; margin-top: 12vh; font-size: 2rem">Create new
        Tender</v-toolbar-title>
    </v-toolbar>
    <v-card class="mx-auto" max-width="1000" style="margin-top: -3vh;">
      <v-container class="pa-10">
        <v-form v-model="valid">
          <v-row>
            <v-toolbar-title style="margin-left:3vw; margin-top: 3vh;">Contractor</v-toolbar-title>
          </v-row>
          <v-divider style="margin-left:9vw"></v-divider>
          <v-row class="mt-5 mx-8">

            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* Oficial name
                <v-btn size=auto class="ml-2" icon color="transparent" variant="text"><svg-icon type="mdi" :path="path"
                    class="inf-icon"></svg-icon>
                  <v-tooltip activator="parent" location="top">Enter the name of the buyer (e.g. Aeroporto Friuli Venezia
                    Giulia S.p.A.)</v-tooltip></v-btn>
              </v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="tender.organizationName" :counter="50"
                label="Name of Organization" required density="compact"></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* National Registration Number
                <v-btn size=auto class="ml-2" icon color="transparent" variant="text"><svg-icon type="mdi" :path="path"
                    class="inf-icon"></svg-icon>
                  <v-tooltip activator="parent" location="top">Enter the national registration number of the buyer (e.g.
                    ULG BE 0325 777 171)</v-tooltip></v-btn></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="tender.nationalRegistrationNumber"
                :counter="10" label="National Registration Number" required density="compact"></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* Country
                <v-btn size=auto class="ml-2" icon color="transparent" variant="text"><svg-icon type="mdi" :path="path"
                    class="inf-icon"></svg-icon>
                  <v-tooltip activator="parent" location="top">Choose the country of the
                    buyer</v-tooltip></v-btn></v-chip>
              <v-select single-line color="blue" variant="outlined" v-model="tender.country" label="Choose the country"
                required density="compact" :items="countries"></v-select>
            </v-col>

            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* City / Town
                <v-btn size=auto class="ml-2" icon color="transparent" variant="text"><svg-icon type="mdi" :path="path"
                    class="inf-icon"></svg-icon>
                  <v-tooltip activator="parent" location="top">Enter the city of the buyer</v-tooltip></v-btn></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="tender.city" :counter="50" label="City"
                required density="compact"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-toolbar-title style="margin-left:3vw; margin-top: 3vh;">Contact person</v-toolbar-title>
          </v-row>
          <v-divider style="margin-left:12vw"></v-divider>

          <v-row class="mt-5 mx-8">

            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* First Name
                <v-btn size=auto class="ml-2" icon color="transparent" variant="text"><svg-icon type="mdi" :path="path"
                    class="inf-icon"></svg-icon>
                  <v-tooltip activator="parent" location="top">Enter the name of contact
                    person</v-tooltip></v-btn></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="tender.firstName" :counter="50"
                label="Name" required density="compact"></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* Last Name
                <v-btn size=auto class="ml-2" icon color="transparent" variant="text"><svg-icon type="mdi" :path="path"
                    class="inf-icon"></svg-icon>
                  <v-tooltip activator="parent" location="top">Enter the surname of contact
                    person</v-tooltip></v-btn></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="tender.lastName" :counter="50"
                label="Surname" required density="compact"></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* Phone number
                <v-btn size=auto class="ml-2" icon color="transparent" variant="text"><svg-icon type="mdi" :path="path"
                    class="inf-icon"></svg-icon>
                  <v-tooltip activator="parent" location="top">Enter the phone number of the contact
                    person</v-tooltip></v-btn></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="tender.phone" :counter="8" type="number"
                label="Phone" required density="compact"></v-text-field>
            </v-col>

          </v-row>

          <v-row>
            <v-toolbar-title style="margin-left:3vw; margin-top: 3vh;">Subject matter of the
              procurement</v-toolbar-title>
          </v-row>
          <v-divider style="margin-left: 23vw;"></v-divider>

          <v-row class="mt-5 mx-8">

            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* CPV code
                <v-btn size=auto class="ml-2" icon color="transparent" variant="text"><svg-icon type="mdi" :path="path"
                    class="inf-icon"></svg-icon>
                  <v-tooltip activator="parent" location="top">Choose CPV code with corresponded to this code
                    description</v-tooltip></v-btn></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="cpvCode" :counter="10" label="CPV Code"
                required density="compact"></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* Tipe of Tender
                <v-btn size=auto class="ml-2" icon color="transparent" variant="text"><svg-icon type="mdi" :path="path"
                    class="inf-icon"></svg-icon>
                  <v-tooltip activator="parent" location="top">Choose the type of contract</v-tooltip></v-btn></v-chip>
              <v-select single-line color="blue" variant="outlined" v-model="tender.type" label="Type" required
                density="compact" :items="tenderTypes"></v-select>
            </v-col>

            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* Description
                <v-btn size=auto class="ml-2" icon color="transparent" variant="text"><svg-icon type="mdi" :path="path"
                    class="inf-icon"></svg-icon>
                  <v-tooltip activator="parent" location="top">Enter detailed information about the
                    Tender</v-tooltip></v-btn></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="tender.description" label="Description" required :counter="250"
                density="compact"></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* Maximum Tender Value
                <v-btn size=auto class="ml-2" icon color="transparent" variant="text"><svg-icon type="mdi" :path="path"
                    class="inf-icon"></svg-icon>
                  <v-tooltip activator="parent" location="top">Enter minimum price of the Tender
                    contract</v-tooltip></v-btn></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="tender.maxPrice"
                label="Maximum tender value" required density="compact" type="number"></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* Minimum Tender Value
                <v-btn size=auto class="ml-2" icon color="transparent" variant="text"><svg-icon type="mdi" :path="path"
                    class="inf-icon"></svg-icon>
                  <v-tooltip activator="parent" location="top">Enter maximum price of the Tender
                    contract</v-tooltip></v-btn></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="tender.minPrice"
                label="Minimum tender value" required density="compact" type="number"></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* Currency
                <v-btn size=auto class="ml-2" icon color="transparent" variant="text"><svg-icon type="mdi" :path="path"
                    class="inf-icon"></svg-icon>
                  <v-tooltip activator="parent" location="top">Choose the currency</v-tooltip></v-btn></v-chip>
                <v-select single-line color="blue" variant="outlined" v-model="tender.currency" label="Currency" required
                density="compact" :items="currencies"></v-select>
            </v-col>

          </v-row>

          <v-row>
            <v-toolbar-title style="margin-left:3vw; margin-top: 3vh;">Date</v-toolbar-title>
          </v-row>
          <v-divider style="margin-left:12vh"></v-divider>

          <v-row class="mt-5 mx-8">

            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* Publication Date
                <v-btn size=auto class="ml-2" icon color="transparent" variant="text"><svg-icon type="mdi" :path="path"
                    class="inf-icon"></svg-icon>
                  <v-tooltip activator="parent" location="top"></v-tooltip></v-btn></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="tender.publicationDate" label="Publication Date"
                required density="compact" disabled></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* Deadline for Offer Submission
                <v-btn size=auto class="ml-2" icon color="transparent" variant="text"><svg-icon type="mdi" :path="path"
                    class="inf-icon"></svg-icon>
                  <v-tooltip activator="parent" location="top">Choose the deadline date for Offer
                    submission</v-tooltip></v-btn></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="tender.deadline"
                label="Deadline for Offer Submission" type="date" required density="compact"></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* Deadline for Signing
                <v-btn size=auto class="ml-2" icon color="transparent" variant="text"><svg-icon type="mdi" :path="path"
                    class="inf-icon"></svg-icon>
                  <v-tooltip activator="parent" location="top">Choose the deadline date for signed contract
                    submission</v-tooltip></v-btn></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="tender.deadlineForSignedContract"
                label="DeadLine for Signed Contract Submission" required density="compact" type="date"></v-text-field>
            </v-col>

          </v-row>

          <v-row>
            <v-toolbar-title style="margin-left:3vw; margin-top: 3vh;">Documents</v-toolbar-title>
          </v-row>
          <v-divider style="margin-left:20vh"></v-divider>

          <v-item-group class="py-5 mx-2">
            <v-row class="mt-5 mx-8">
              <v-item v-if="selectedContract">
                <v-chip size="large" class="mb-6" closable color="blue" prepend-icon="mdi-file-document-multiple-outline"
                  label @click:close="activateUploadButton('contract')">
                  <div id="text" style="width: 50rem" @click="dialog = true"> {{ selectedFileContractName }} </div>
                </v-chip>
              </v-item>
              <v-item v-if="contract">
                <v-text-field single-line label="* Contract" variant="outlined" density="compact"></v-text-field>
                <v-btn color="primary" rounded="0" dark :loading="contractIsSelecting"
                  @click="handleFileImport('contract')" height="40" width="150">
                  Upload
                </v-btn> <input ref="contractUploader" class="d-none" type="file" accept="application/pdf"
                  @change="onFileChangedContract">
              </v-item>
            </v-row>

            <v-row class="mt-5 mx-8">
              <v-item v-if="selectedAwardDecision">
                <v-chip size="large" class="mb-6" closable color="blue" prepend-icon="mdi-file-document-multiple-outline"
                  label @click:close="activateUploadButton('awardDecision')">
                  <div id="text" style="width: 50rem" @click="dialog1 = true"> {{ selectedFileAwardDecisionName }} </div>
                </v-chip>
              </v-item>
              <v-item v-if="awardDecision">
                <v-text-field single-line label="* Award decision" variant="outlined" density="compact"></v-text-field>
                <v-btn color="primary" rounded="0" dark :loading="awardIsSelecting"
                  @click="handleFileImport('awardDecision')" height="40" width="150">
                  Upload
                </v-btn> <input ref="awardDesUploader" class="d-none" type="file" accept="application/pdf"
                  @change="onFileChangedAwardDecision">
              </v-item>
            </v-row>
            <v-row class="mt-5 mx-8">
              <v-item v-if="selectedRejectDecision">
                <v-chip size="large" class="mb-6" closable color="blue" prepend-icon="mdi-file-document-multiple-outline"
                  label @click:close="activateUploadButton('rejectDecision')">
                  <div id="text" style="width: 50rem" @click="dialog2 = true"> {{ selectedFileRejectDecisionName }} </div>
                </v-chip>
              </v-item>
              <v-item v-if="rejectDecision">
                <v-text-field single-line label="* Reject decision" variant="outlined" density="compact"></v-text-field>
                <v-btn color="primary" rounded="0" dark :loading="rejectIsSelecting"
                  @click="handleFileImport('rejectDecision')" height="40" width="150">
                  Upload
                </v-btn> <input ref="rejectDesUploader" class="d-none" type="file" accept="application/pdf"
                  @change="onFileChangedRejectDecision">
              </v-item>
            </v-row>
          </v-item-group>

          <v-dialog v-model="dialog" width="auto">
            <v-card>
              <iframe :src=selectedFileContractUrl width="800" height="500">
              </iframe>
              <v-card-actions>
                <v-btn color="primary" block @click="dialog = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialog1" width="auto">
            <v-card>
              <iframe :src=selectedFileAwardDecisionUrl width="800" height="500">
              </iframe>
              <v-card-actions>
                <v-btn color="primary" block @click="dialog1 = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialog2" width="auto">
            <v-card>
              <iframe :src=selectedFileRejectDecisionUrl width="800" height="500">
              </iframe>
              <v-card-actions>
                <v-btn color="primary" block @click="dialog2 = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>


        </v-form>
      </v-container>
    </v-card>
  </v-card>

  <v-container style="width: 67vw;">
    <v-row class="mt-3 mb-10 justify-end">
      <v-col cols="12" md="2"><v-btn type="submit" block class="mt-2" variant="outlined" color="blue"
          size="large">Cancel</v-btn></v-col>
      <v-col cols="12" md="2"><v-btn type="submit" block class="mt-2" variant="flat" color="blue"
          size="large">Publish</v-btn></v-col>
    </v-row>
  </v-container>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiInformationOutline } from "@mdi/js";
import { countries } from "@/components/countries";
import { tenderTypes } from "@/components/tenderTypes";
import { currencies } from "@/components/currencies";

export default {
  components: {
    SvgIcon
  },
  data: () => ({
    countries: countries,
    tenderTypes: tenderTypes,
    currencies: currencies,

    tender: {
      organizationName: '',
      nationalRegistrationNumber: '',
      country: null,
      city: '',
      firstName: '',
      lastName: '',
      phone: '',

      type: null,
      description: '',
      maxPrice: '',
      minPrice: '',
      currency: null,
      publicationDate: new Date().toLocaleDateString(),
      deadline: null,

      deadlineForSignedContract: null,
    },

    path: mdiInformationOutline,
    valid: false,
    dialog: false,
    dialog1: false,
    dialog2: false,
    selectedFile: null,
    selectedContract: false,
    contract: true,
    awardDecision: true,
    selectedAwardDecision: false,
    rejectDecision: true,
    selectedRejectDecision: false,
    docFileUrl: '',
    contractIsSelecting: false,
    awardIsSelecting: false,
    rejectIsSelecting: false,

    selectedFileContract: null,
    selectedFileContractName: '',
    selectedFileContractUrl: '',
    selectedFileAwardDecision: null,
    selectedFileAwardDecisionName: '',
    selectedFileAwardDecisionUrl: '',
    selectedFileRejectDecision: null,
    selectedFileRejectDecisionName: '',
    selectedFileRejectDecisionUrl: '',
  }),

  methods: {
    handleFileImport(selectedDocument) {
      switch (selectedDocument) {
        case 'contract':
          this.contractIsSelecting = true;
          window.addEventListener('focus', () => {
            this.contractIsSelecting = false;
            this.selectedContract = true;
            this.contract = false;
          }, { once: true });
          this.$refs.contractUploader.click();
          break;
        case 'awardDecision':
          this.awardIsSelecting = true;
          window.addEventListener('focus', () => {
            this.awardIsSelecting = false;
            this.selectedAwardDecision = true;
            this.awardDecision = false;
          }, { once: true });
          this.$refs.awardDesUploader.click();
          break;
        case 'rejectDecision':
          this.rejectIsSelecting = true;
          window.addEventListener('focus', () => {
            this.rejectIsSelecting = false;
            this.selectedRejectDecision = true;
            this.rejectDecision = false;
          }, { once: true });
          this.$refs.rejectDesUploader.click();
          break;
        default:
          this.contractIsSelecting = false
          this.selectedContract = false;
          this.contract = true;
          this.awardIsSelecting = false
          this.selectedAwardDecision = false;
          this.awardDecision = true;
          this.rejectIsSelecting = false
          this.selectedRejectDecision = false;
          this.rejectDecision = true;
      }
    },

    onFileChangedContract(event) {
      this.selectedFileContract = event.target.files[0];
      this.selectedFileContractName = this.selectedFileContract.name;
      this.selectedFileContractUrl = URL.createObjectURL(this.selectedFileContract);
    },

    onFileChangedAwardDecision(event) {
      this.selectedFileAwardDecision = event.target.files[0];
      this.selectedFileAwardDecisionName = this.selectedFileAwardDecision.name;
      this.selectedFileAwardDecisionUrl = URL.createObjectURL(this.selectedFileAwardDecision);
    },

    onFileChangedRejectDecision(event) {
      this.selectedFileRejectDecision = event.target.files[0];
      this.selectedFileRejectDecisionName = this.selectedFileRejectDecision.name;
      this.selectedFileRejectDecisionUrl = URL.createObjectURL(this.selectedFileRejectDecision);
    },

    activateUploadButton(activateBtnForDocument) {
      switch (activateBtnForDocument) {
        case 'contract':
          this.selectedContract = false;
          this.contract = true;
          break;
        case 'awardDecision':
          this.selectedAwardDecision = false;
          this.awardDecision = true;
          break;
        case 'rejectDecision':
          this.selectedRejectDecision = false;
          this.rejectDecision = true;
          break;
        default:
          this.selectedContract = false;
          this.contract = true;
          this.selectedAwardDecision = false;
          this.awardDecision = true;
          this.selectedRejectDecision = false;
          this.rejectDecision = true;
      }
    }
  }
}
</script>

<style>
.inf-icon:hover {
  color: blue;
}

.inf-icon {
  width: 3dvh;
  color: #42A5F5;
}

.mdi-file-document-multiple-outline {
  color: #0a0f12;
}

html {
  background-color: rgb(212, 208, 208);
}
</style>
