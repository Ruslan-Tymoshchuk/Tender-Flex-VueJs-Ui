<template>
  <v-toolbar color="primary" height="28" class="text-left">
    <v-col class="v-col-5">{{ field }}</v-col>
    <v-col class="v-col-2">{{ companyName }}</v-col>
    <v-col class="v-col-2">{{ tenderStatus }}</v-col>
    <v-col class="v-col-2">{{ deadline }}</v-col>
    <v-col class="v-col-2">{{ offerData }}</v-col>
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
