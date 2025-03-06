<template>
  <v-toolbar class="table-header toolbar">
    <v-col class="v-col-2 ml-2">{{ companyName }}</v-col>
    <v-col class="v-col-3 ml-3">{{ field }}</v-col>
    <v-col class="v-col-1 ml-3">{{ price }}</v-col>
    <v-col class="v-col-1 ml-5">{{ country }}</v-col>
    <v-col class="v-col-2 ml-8">{{ date }}</v-col>
    <v-col class="v-col-2">{{ status }}</v-col>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    companyName: '',
    field: '',
    price: '',
    country: '',
    date: '',
    status: ''
  }
}
</script>
