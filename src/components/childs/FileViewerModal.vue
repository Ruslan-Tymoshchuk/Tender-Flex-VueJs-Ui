<template>
  <v-dialog :model-value="isOpen" width="auto">
    <v-card v-click-outside="close">
      <iframe :src=fileUrl width="800" height="500">
      </iframe>
      <v-card-actions>
        <v-btn color="primary" block @click="close">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
    fileUrl: String,
  },

  methods: {
    close() {
      this.$emit("update:isOpen", false);
    },
  }
}
</script>
