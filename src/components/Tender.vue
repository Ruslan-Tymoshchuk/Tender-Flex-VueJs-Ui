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
      <v-container>
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
              <v-text-field single-line color="blue" variant="outlined" v-model="oficialName" :counter="50"
                label="Name of Organization" required></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* National Registration Number
                <v-btn size=auto class="ml-2" icon color="transparent" variant="text"><svg-icon type="mdi" :path="path"
                    class="inf-icon"></svg-icon>
                  <v-tooltip activator="parent" location="top">Enter the national registration number of the buyer (e.g.
                    ULG BE 0325 777 171)</v-tooltip></v-btn></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="nationalRegistrationNumber" :counter="10"
                label="National Registration Number" required></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* Country
                <v-btn size=auto class="ml-2" icon color="transparent" variant="text"><svg-icon type="mdi" :path="path"
                    class="inf-icon"></svg-icon>
                  <v-tooltip activator="parent" location="top">Choose the country of the buyer</v-tooltip></v-btn></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="country" label="Country"
                required></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* City / Town
                <v-btn size=auto class="ml-2" icon color="transparent" variant="text"><svg-icon type="mdi" :path="path"
                    class="inf-icon"></svg-icon>
                  <v-tooltip activator="parent" location="top">Enter the city of the buyer</v-tooltip></v-btn></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="city" label="City"
                required></v-text-field>
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
                  <v-tooltip activator="parent" location="top">Enter the name of contact person</v-tooltip></v-btn></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="name" :counter="3" label="Name"
                required></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* Last Name
                <v-btn size=auto class="ml-2" icon color="transparent" variant="text"><svg-icon type="mdi" :path="path"
                    class="inf-icon"></svg-icon>
                  <v-tooltip activator="parent" location="top">Enter the surname of contact person</v-tooltip></v-btn></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="surname" :counter="3" label="Surname"
                required></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* Phone number
                <v-btn size=auto class="ml-2" icon color="transparent" variant="text"><svg-icon type="mdi" :path="path"
                    class="inf-icon"></svg-icon>
                  <v-tooltip activator="parent" location="top">Enter the phone number of the contact person</v-tooltip></v-btn></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="phoneNumber" :counter="8" label="Phone"
                required></v-text-field>
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
                  <v-tooltip activator="parent" location="top">Choose CPV code with corresponded to this code description</v-tooltip></v-btn></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="cpvCode" :counter="10" label="CPV Code"
                required></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* Tipe of Tender
                <v-btn size=auto class="ml-2" icon color="transparent" variant="text"><svg-icon type="mdi" :path="path"
                    class="inf-icon"></svg-icon>
                  <v-tooltip activator="parent" location="top">Choose the type of contract</v-tooltip></v-btn></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="tipeOfTender" :counter="10"
                label="Type of Tender" required></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* Description
                <v-btn size=auto class="ml-2" icon color="transparent" variant="text"><svg-icon type="mdi" :path="path"
                    class="inf-icon"></svg-icon>
                  <v-tooltip activator="parent" location="top">Enter detailed information about the Tender</v-tooltip></v-btn></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="description" label="Description"
                required></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* Maximum Tender Value
                <v-btn size=auto class="ml-2" icon color="transparent" variant="text"><svg-icon type="mdi" :path="path"
                    class="inf-icon"></svg-icon>
                  <v-tooltip activator="parent" location="top">Enter minimum price of the Tender contract</v-tooltip></v-btn></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="maxTenderValue"
                label="Maximum tender value" required></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* Minimum Tender Value
                <v-btn size=auto class="ml-2" icon color="transparent" variant="text"><svg-icon type="mdi" :path="path"
                    class="inf-icon"></svg-icon>
                  <v-tooltip activator="parent" location="top">Enter maximum price of the Tender contract</v-tooltip></v-btn></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="minTenderValue"
                label="Minimum tender value" required></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* Currency
                <v-btn size=auto class="ml-2" icon color="transparent" variant="text"><svg-icon type="mdi" :path="path"
                    class="inf-icon"></svg-icon>
                  <v-tooltip activator="parent" location="top">Choose the currency</v-tooltip></v-btn></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="currency" :rules="currency"
                label="Currency" required></v-text-field>
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
              <v-text-field single-line color="blue" variant="outlined" v-model="publicationDate" label="Publication Date"
                required></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* Deadline for Offer Submission
                <v-btn size=auto class="ml-2" icon color="transparent" variant="text"><svg-icon type="mdi" :path="path"
                    class="inf-icon"></svg-icon>
                  <v-tooltip activator="parent" location="top">Choose the deadline date for Offer submission</v-tooltip></v-btn></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="deadlineForOfferSubmission"
                label="Deadline for Offer Submission" required></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* Deadline for Signing
                <v-btn size=auto class="ml-2" icon color="transparent" variant="text"><svg-icon type="mdi" :path="path"
                    class="inf-icon"></svg-icon>
                  <v-tooltip activator="parent" location="top">Choose the deadline date for signed contract submission</v-tooltip></v-btn></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="deadlineForSignedContractSubmission"
                label="DeadLine for Signed Contract Submission" required></v-text-field>
            </v-col>

          </v-row>

          <v-row>
            <v-toolbar-title style="margin-left:3vw; margin-top: 3vh;">Documents</v-toolbar-title>
          </v-row>
          <v-divider style="margin-left:20vh"></v-divider>

          <v-row class="mt-5 mx-8">
            <v-file-input label="Contract" density="compact"></v-file-input>
          </v-row>
          <v-row class="mt-5 mx-8">
            <v-file-input label="Award Decision" density="compact"></v-file-input>
          </v-row>
          <v-row class="mt-5 mx-8 mb-10">
            <v-file-input label="Reject Decision" density="compact"></v-file-input>
          </v-row>

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
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiInformationOutline } from '@mdi/js';

export default {
  components: {
    SvgIcon
  },
  data: () => ({
    path: mdiInformationOutline,
    valid: false,
  }),
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

html {
  background-color: rgb(212, 208, 208);
}
</style>
