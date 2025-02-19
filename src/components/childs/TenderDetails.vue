<template>
  <v-card class="mx-auto" elevation="8" max-width="1000">
    <v-toolbar color="white" height="240" class="text-left">
      <v-container class="pa-15">
        <v-toolbar-title class="mb-5">Contractor</v-toolbar-title>
        <v-row class="text-center mx-10">
          <v-col class="text-left">
            <div class="ma-2 details-title">Oficial Name:</div>
            <div class="ma-2 details-title">National Registration Number: </div>
          </v-col>
          <v-col class="text-left">
            <div class="ma-2">{{ tender.companyName }}</div>
            <div class="ma-2">{{ tender.registrationNumber }}</div>
          </v-col>
          <v-col class="text-left">
            <div class="ma-2 details-title">Country:</div>
            <div class="ma-2 details-title">City / Town:</div>
          </v-col>
          <v-col class="text-left">
            <div class="ma-2">{{ tender.country }}</div>
            <div class="ma-2">{{ tender.city }}</div>
          </v-col>
        </v-row>
      </v-container>
    </v-toolbar>
  </v-card>

  <v-container class="d-flex align-center details-container">
    <p class="chapter-label">Contact person</p>
    <div class="horizontal-divider-details"></div>
  </v-container>

  <v-container class="details-container">
    <v-row class="text-center mx-10">
      <v-col class="text-left mx-2">
        <div class="details-title">Name:</div>
        <div class="mt-3 details-title">Surname:</div>
      </v-col>
      <v-col class="text-left mx-2">
        <div>{{ tender.firstName }}</div>
        <div class="mt-3">{{ tender.lastName }}</div>
      </v-col>
      <v-col class="text-left mx-2">
        <div class="details-title">Phone number:</div>
      </v-col>
      <v-col class="text-left mx-2">
        <div>{{ tender.phone }}</div>
      </v-col>
    </v-row>
  </v-container>

  <v-container class="d-flex align-center details-container">
    <p class="chapter-label">Procedure</p>
    <div class="horizontal-divider-details"></div>
  </v-container>

  <v-container class="details-container">
    <v-row class="text-center mx-10">
      <v-col class="text-left mx-2">
        <div class="details-title">Procedure:</div>
      </v-col>
      <v-col class="text-left mx-2">
        <div>{{ tender.procedure }}</div>
      </v-col>
      <v-col class="text-left mx-2">
        <div class="details-title">Language:</div>
      </v-col>
      <v-col class="text-left mx-2">
        <div>{{ tender.language }}</div>
      </v-col>
    </v-row>
  </v-container>

  <v-container class="d-flex align-center details-container">
    <p class="chapter-label">Subject matter of the procurement</p>
    <div class="horizontal-divider-details"></div>
  </v-container>

  <v-container class="details-container">
    <v-row class="text-center mx-10">
      <v-col class="text-left mx-2">
        <div class="details-title">CPV Code:</div>
        <div class="mt-3 details-title">Min Tender Value:</div>
        <div class="mt-3 details-title">Currency:</div>
      </v-col>
      <v-col class="text-left mx-2">
        <div>{{ tender.cpvCode }}</div>
        <div class="mt-3">{{ tender.minTenderValue }}</div>
        <div class="mt-3">{{ tender.currency }}</div>
      </v-col>
      <v-col class="text-left mx-2">
        <div class="details-title">Type of Tender:</div>
        <div class="mt-3 details-title">Max Tender Value:</div>
        <div class="mt-3 details-title">Description:</div>
      </v-col>
      <v-col class="text-left mx-2">
        <div>{{ tender.type }}</div>
        <div class="mt-3">{{ tender.maxTenderValue }}</div>
        <div class="mt-3">{{ tender.description }}</div>
      </v-col>
    </v-row>
  </v-container>

  <v-container class="d-flex align-center details-container">
    <p class="chapter-label">Date</p>
    <div class="horizontal-divider-details"></div>
  </v-container>

  <v-container class="details-container">
    <v-row class="text-center mx-10">
      <v-col class="text-left mx-2">
        <div class="details-title">Publication Date:</div>
        <div class="mt-3 details-title">Deadline for Signed Contract Submission:</div>
      </v-col>
      <v-col class="text-left mx-2">
        <div>{{ tender.publicationDate }}</div>
        <div class="mt-3">{{ tender.signedContractSubmissionDeadline }}</div>
      </v-col>
      <v-col class="text-left mx-2">
        <div class="details-title">Deadline for Offer Submission:</div>
      </v-col>
      <v-col class="text-left mx-2">
        <div>{{ tender.offerSubmissionDeadline }}</div>
      </v-col>
    </v-row>
  </v-container>

  <v-container class="d-flex align-center details-container">
    <p class="chapter-label">Documents</p>
    <div class="horizontal-divider-details"></div>
  </v-container>
</template>

<script>
export default {
  props: {
    tender: {}
  }
}
</script>
