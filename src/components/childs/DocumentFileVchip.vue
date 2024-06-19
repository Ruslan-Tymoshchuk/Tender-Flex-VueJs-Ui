<template>
  <v-container class="details-container">
    <v-item-group class="mx-8">
      <v-row>
        <v-item>
          <v-chip size="large" class="mb-5" color="blue" prepend-icon="mdi-file-document-multiple-outline" label
            @click="this.$emit('reviewFile')">
            <div id="text" style="width: 50rem"> {{ fileName }} </div>
          </v-chip></v-item>
      </v-row>
    </v-item-group>
  </v-container>
</template>

<script>
export default {
  props: {
    fileName: ''
  }
}
</script>
