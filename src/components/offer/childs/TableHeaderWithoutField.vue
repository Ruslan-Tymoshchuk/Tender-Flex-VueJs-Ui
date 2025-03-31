<template>
  <v-toolbar class="table-header toolbar">
    <v-col class="v-col-3 mx-3">{{ companyName }}</v-col>
    <v-col class="v-col-1 mx-3">{{ price }}</v-col>
    <v-col class="v-col-1 mx-15">{{ country }}</v-col>
    <v-col class="v-col-2 ml-4">{{ date }}</v-col>
    <v-col class="v-col-2">{{ status }}</v-col>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    companyName: { type: String, default: '' },
    price: { type: String, default: '' },
    country: { type: String, default: '' },
    date: { type: String, default: '' },
    status: { type: String, default: '' }
  }
}
</script>
