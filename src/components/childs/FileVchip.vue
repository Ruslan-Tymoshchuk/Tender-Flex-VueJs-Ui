<template>
  <v-item>
    <v-chip
      size="large"
      class="mb-5"
      color="blue"
      label
      prepend-icon="mdi-file-document-multiple-outline"
      @click="showFile">
    <div
      id="text"
      style="width: 50rem"
    > {{ fileName }}
    </div>
    </v-chip>
    <v-progress-linear
      class="mt-n6"
      :active="isProgress"
      color="blue-darken-3"
      indeterminate
    ></v-progress-linear>
  </v-item>
</template>

<script>
export default {
  data: () => ({
    isProgress: false
  }),

  props: {
    fileName: String,
    fileKey: String
  },

  methods: {
    showFile() {
      this.isProgress = true;
      this.$emit("showFile", true, this.fileKey, () => {
        this.isProgress = false;
      });
    }
  }
}
</script>
