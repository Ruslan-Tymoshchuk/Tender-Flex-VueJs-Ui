<template>
  <v-container class="px-10">
    <v-row class="justify-end pb-15 mr-12 mt-3">
      <v-col cols="9" md="2">
        <v-btn type="submit" block class="mt-2" variant="outlined" color="blue" size="large" @click="isDialog = true">
          Cancel
        </v-btn>
      </v-col>
      <v-col cols="9" md="2">
        <v-btn type="submit" block class="mt-2" variant="flat" color="blue" size="large" @click="saveDocument">
          {{ btnTitle }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>

  <div class="text-center">
    <v-dialog v-model="isDialog" activator="parent" width="500">
      <v-card>
        <v-toolbar color="primary" title="Cancellation confirmation" height="50"></v-toolbar>
        <v-card-text class="text-center">
          <div>{{ firstLineExplanation }}</div>
          <div>{{ secondLineExplanaton }}</div>
        </v-card-text>
        <v-row class="justify-center mb-8 mt-3">
          <v-btn @click="isDialog = false" width="160" class="mx-2">No</v-btn>
          <v-btn :href="redirectUrl" color="primary" width="160" class="mx-2">Yes</v-btn>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    isDialog: false
  }),

  props: {
    btnTitle: '',
    redirectUrl: '',
    firstLineExplanation: '',
    secondLineExplanaton: ''
  },

  methods: {
    saveDocument() {
      this.$emit('saveDocument')
    }
  }
}
</script>
