<template>
  <v-toolbar color="blue">
    <v-container>
      <v-row>
        <v-img :src="TenderFlexIcon" max-width="120" />
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
      <v-toolbar-title style="margin-left:21%; margin-top: 25px; font-size: 2rem !important;">Create new
        Tender</v-toolbar-title>
    </v-toolbar>
    <v-card class="mx-auto" max-width="1000" style="margin-top: -70px;">

      <v-form v-model="valid">
        <v-container>

          <v-row>
            <v-toolbar-title style="margin-left:40px; margin-top: 30px;">Contractor</v-toolbar-title>
          </v-row>
          <v-divider style="margin-left:130px"></v-divider>

          <v-row class="mt-5 mx-8">
            <v-col cols="12" md="4">
              <v-text-field v-model="oficialName" :counter="5" label="Oficial Name"
                required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="nationalRegistrationNumber" :counter="10" label="National Registration Number"
                required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="country" label="Country" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="city" label="City" required></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-toolbar-title style="margin-left:40px; margin-top: 30px;">Contact person</v-toolbar-title>
          </v-row>
          <v-divider style="margin-left:170px"></v-divider>

          <v-row class="mt-5 mx-8">
            <v-col cols="12" md="4">
              <v-text-field v-model="name" :counter="3" label="Name"
                required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="surname" :counter="3" label="Surname"
                required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="phoneNumber" :counter="8" label="Phone number" required></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-toolbar-title style="margin-left:40px; margin-top: 30px;">Subject matter of the
              procurement</v-toolbar-title>
          </v-row>
          <v-divider style="margin-left:340px"></v-divider>

          <v-row class="mt-5 mx-8">
            <v-col cols="12" md="4">
              <v-text-field v-model="cpvCode" :counter="10" label="CPV Code"
                required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="tipeOfTender" :counter="10" label="Type of Tender"
                required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="description" label="Description" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="maxTenderValue" label="Maximum tender value"
                required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="minTenderValue" label="Minimum tender value"
                required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="currency" :rules="currency" label="Currency" required></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-toolbar-title style="margin-left:40px; margin-top: 30px;">Date</v-toolbar-title>
          </v-row>
          <v-divider style="margin-left:75px"></v-divider>

          <v-row class="mt-5 mx-8">
            <v-col cols="12" md="4">
              <v-text-field v-model="publicationDate" label="Publication Date"
                required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="deadlineForOfferSubmission" label="Deadline for Offer Submission"
                required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="deadlineForSignedContractSubmission" label="DeadLine for Signed Contract Submission" required></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-toolbar-title style="margin-left:40px; margin-top: 30px;">Documents</v-toolbar-title>
          </v-row>
          <v-divider style="margin-left:135px"></v-divider>

          <v-row class="mt-5 mx-8">
            <v-file-input label="Contract" density="compact"></v-file-input>
          </v-row>
          <v-row class="mt-5 mx-8">
            <v-file-input label="Award Decision" density="compact"></v-file-input>
          </v-row>
          <v-row class="mt-5 mx-8 mb-10">
            <v-file-input label="Reject Decision" density="compact"></v-file-input>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </v-card>

  <v-container style="width: 68%;">
    <v-row class="mt-3 mb-10 justify-end">
      <v-col cols="12" md="2"><v-btn type="submit" block class="mt-2" variant="outlined" color="blue"
          size="large">Cancel</v-btn></v-col>
      <v-col cols="12" md="2"><v-btn type="submit" block class="mt-2" variant="flat" color="blue"
          size="large">Publish</v-btn></v-col>
    </v-row>
  </v-container>

</template>

<script>
import TenderFlexIcon from "@/assets/tender-flex-Logo.svg";
export default {
  data: () => ({
    TenderFlexIcon,
    valid: false,
  }),
}
</script>

<style>
html {
  background-color: rgb(212, 208, 208);
}
</style>
