<template>
  <v-toolbar color="primary" height="32">
    <v-col class="v-col-3 text-left ml-4">{{ field }}</v-col>
    <v-col class="v-col-2 text-left ml-4">{{ companyName }}</v-col>
    <v-col class="v-col-2 text-left ml-4">{{ tenderStatus }}</v-col>
    <v-col class="v-col-2 text-left ml-4">{{ deadline }}</v-col>
    <v-col class="v-col-2 text-right">{{ offerData }}</v-col>
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
