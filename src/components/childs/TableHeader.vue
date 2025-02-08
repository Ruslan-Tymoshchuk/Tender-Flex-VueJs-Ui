<template>
  <v-toolbar color="primary" height="32">
    <v-col class="v-col-3 text-left ml-5">{{ field }}</v-col>
    <v-col class="v-col-2 text-center ml-4">{{ companyName }}</v-col>
    <v-col class="v-col-2 text-center ml-2">{{ tenderStatus }}</v-col>
    <v-col class="v-col-2 text-center ml-3">{{ deadline }}</v-col>
    <v-col class="v-col-2 text-center ml-1">{{ offerData }}</v-col>
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
