<template>
  <v-dialog width="auto">
    <v-card>
      <iframe :src=documentUrl width="800" height="500">
      </iframe>
      <v-card-actions>
        <v-btn color="primary" block @click="this.$emit('close')">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default{
  props: {
    documentUrl: ''
  }
}
</script>
