<template>
  <v-dialog v-model="fileViewer.isDialog" width="auto">
    <v-card>
      <iframe :src=fileViewer.documentUrl width="800" height="500">
      </iframe>
      <v-card-actions>
        <v-btn color="primary" block @click="fileViewer.isDialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    fileViewer: {}
  }
}
</script>
