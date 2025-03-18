<template>
  <v-toolbar class="table-header toolbar">
    <v-sheet class="table-header field">{{ field }}</v-sheet>
    <v-sheet class="table-header company-name">{{ companyName }}</v-sheet>
    <v-sheet class="table-header tender-status">{{ tenderStatus }}</v-sheet>
    <v-sheet class="table-header deadline">{{ deadline }}</v-sheet>
    <v-sheet class="table-header offer-data">{{ offerData }}</v-sheet>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    field: '',
    companyName: '',
    tenderStatus: '',
    deadline: '',
    offerData: '',
  }
}
</script>
