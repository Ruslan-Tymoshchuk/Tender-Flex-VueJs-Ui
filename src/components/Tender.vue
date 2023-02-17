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
                <svg-icon type="mdi" :path="path" class="inf-icon pb-1 ml-1"></svg-icon></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="oficialName" :counter="50"
                label="Name of Organization" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* National Registration Number
                <svg-icon type="mdi" :path="path" class="inf-icon pb-1 ml-1"></svg-icon></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="nationalRegistrationNumber" :counter="10"
                label="National Registration Number" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* Country
                <svg-icon type="mdi" :path="path" class="inf-icon pb-1 ml-1"></svg-icon></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="country" label="Country" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* City / Town
                <svg-icon type="mdi" :path="path" class="inf-icon pb-1 ml-1"></svg-icon></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="city" label="City" required></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-toolbar-title style="margin-left:3vw; margin-top: 3vh;">Contact person</v-toolbar-title>
          </v-row>
          <v-divider style="margin-left:12vw"></v-divider>

          <v-row class="mt-5 mx-8">
            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* First Name
                <svg-icon type="mdi" :path="path" class="inf-icon pb-1 ml-1"></svg-icon></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="name" :counter="3" label="Name" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* Last Name
                <svg-icon type="mdi" :path="path" class="inf-icon pb-1 ml-1"></svg-icon></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="surname" :counter="3" label="Surname" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* Phone number
                <svg-icon type="mdi" :path="path" class="inf-icon pb-1 ml-1"></svg-icon></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="phoneNumber" :counter="8" label="Phone" required></v-text-field>
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
                <svg-icon type="mdi" :path="path" class="inf-icon pb-1 ml-1"></svg-icon></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="cpvCode" :counter="10" label="CPV Code" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* Tipe of Tender
                <svg-icon type="mdi" :path="path" class="inf-icon pb-1 ml-1"></svg-icon></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="tipeOfTender" :counter="10" label="Type of Tender" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* Description
                <svg-icon type="mdi" :path="path" class="inf-icon pb-1 ml-1"></svg-icon></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="description" label="Description" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* Maximum Tender Value
                <svg-icon type="mdi" :path="path" class="inf-icon pb-1 ml-1"></svg-icon></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="maxTenderValue" label="Maximum tender value" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* Minimum Tender Value
                <svg-icon type="mdi" :path="path" class="inf-icon pb-1 ml-1"></svg-icon></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="minTenderValue" label="Minimum tender value" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* Currency
                <svg-icon type="mdi" :path="path" class="inf-icon pb-1 ml-1"></svg-icon></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="currency" :rules="currency" label="Currency" required></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-toolbar-title style="margin-left:3vw; margin-top: 3vh;">Date</v-toolbar-title>
          </v-row>
          <v-divider style="margin-left:12vh"></v-divider>

          <v-row class="mt-5 mx-8">
            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* Publication Date
                <svg-icon type="mdi" :path="path" class="inf-icon pb-1 ml-1"></svg-icon></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="publicationDate" label="Publication Date" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* Deadline for Offer Submission
                <svg-icon type="mdi" :path="path" class="inf-icon pb-1 ml-1"></svg-icon></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="deadlineForOfferSubmission" label="Deadline for Offer Submission"
                required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-chip variant="text" color="#BDBDBD">* Deadline for Signing
                <svg-icon type="mdi" :path="path" class="inf-icon pb-1 ml-1"></svg-icon></v-chip>
              <v-text-field single-line color="blue" variant="outlined" v-model="deadlineForSignedContractSubmission" label="DeadLine for Signed Contract Submission"
                required></v-text-field>
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
