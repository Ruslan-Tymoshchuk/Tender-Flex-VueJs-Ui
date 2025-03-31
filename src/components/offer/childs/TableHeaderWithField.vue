<template>
  <v-toolbar class="table-header toolbar">
    <v-col class="v-col-2 ml-2">{{ companyName }}</v-col>
    <v-col class="v-col-3 ml-6">{{ field }}</v-col>
    <v-col class="v-col-1 ml-1">{{ price }}</v-col>
    <v-col class="v-col-1 ml-11">{{ country }}</v-col>
    <v-col class="v-col-1 ml-11">{{ date }}</v-col>
    <v-col class="v-col-2 ml-11">{{ status }}</v-col>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    companyName: { type: String, default: '' },
    field: { type: String, default: '' },
    price: { type: String, default: '' },
    country: { type: String, default: '' },
    date: { type: String, default: '' },
    status: { type: String, default: '' }
  }
}
</script>
