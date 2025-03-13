<template>
  <v-row class="mt-5 mx-8">
    <v-item v-if="!isFile">
      <v-text-field
        single-line
        :label="label"
        variant="outlined"
        density="compact"
        readonly
      ></v-text-field>
      <input
        :id="fileInputId"
        class="d-none"
        type="file"
        accept="application/pdf"
        @change="selectFile"
      ><v-btn
        color="primary"
        rounded="0"
        height="40"
        width="150"
      ><label
        class="file-label"
        :for="fileInputId"
      >Select</label
      ><v-tooltip
        activator="parent"
        location="top"
      >{{ hint }}</v-tooltip
      ></v-btn>
    </v-item>
    <v-item v-else-if="isFile">
      <v-chip
        size="large"
        class="mb-6"
        closable
        color="blue"
        prepend-icon="mdi-file-document-multiple-outline"
        label
        @click:close="isFile = false"
        @click="showFile"
      >
      <div
        id="text"
        style="width: 50rem"
      > {{ file.name }} </div>
      </v-chip>
    </v-item>
  </v-row>

</template>

<script>
export default {
  data: () => ({
    isFile: false,
    file: null,
  }),

  props: {
    label: '',
    fileInputId: '',
    hint: ''
  },

  emits: ['selectFile', 'showFile'],

  methods: {
    selectFile(event) {
      this.isFile = true;
      this.file = event.target.files[0];
      this.$emit('selectFile', this.file)
    },

    showFile() {
      const fileUrl = URL.createObjectURL(this.file);
      this.$emit('showFile', true, fileUrl);
    }
  }
}
</script>
