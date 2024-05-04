<template>
<v-row class="mt-5 mx-8">
  <v-item v-if="isFile">
    <v-chip
      size="large"
      class="mb-6"
      closable
      color="blue"
      prepend-icon="mdi-file-document-multiple-outline"
      label
      @click:close="isFile = false"
      @click="openDocument"
    ><div
      id="text"
      style="width: 50rem"
    > {{ file.name }} </div>
    </v-chip>
  </v-item>
  <v-item v-else>
    <v-text-field
      single-line
      :label="label"
      variant="outlined"
      density="compact"
    ></v-text-field>
    <input
      :id="labelId"
      class="d-none"
      type="file"
      accept="application/pdf"
      @change="updateValue($event, fileType)"
    ><v-btn
      color="primary"
      rounded="0"
      height="40"
      width="150"
    ><label
      class="file-label"
      :for="labelId"
    >Upload</label
    ></v-btn>
  </v-item>
</v-row>
</template>

<script>
export default {
  data: () => ({
    file: null,
    isDialog: false,
    isFile: false,
  }),

  props: {
    instance: '',
    label: '',
    fileType: '',
    labelId: ''
  },

  methods: {
    updateValue(event, fileType){
      this.isFile = true;
      this.file = event.target.files[0];
      this.$emit('updateValue', this.instance, fileType, this.file)
    },

    openDocument(){
      const fileUrl = URL.createObjectURL(this.file);
      this.$emit('openDocument', fileUrl);
    }
  },
}
</script>
