<template>
  <v-col cols="12" md="4">
    <v-chip class="required" variant="text">{{ title }}
      <v-btn size=auto class="ml-2" icon color="transparent" variant="flat">
        <v-tooltip activator="parent" location="top">{{ btnTooltip }}</v-tooltip>
        <v-icon icon="mdi-information-outline" class="inf-icon"></v-icon>
      </v-btn>
    </v-chip>

    <v-select
      single-line
      color="blue"
      variant="outlined"
      v-model="selectedItem"
      :label="label"
      required
      density="compact"
      :items="items"
      item-value="id"
      :item-title="itemTitle"
      return-object
      persistent-hint
      @change="updateValue">
    </v-select>
  </v-col>
</template>

<script>
export default {
  data: () => ({
    selectedItem: [],
  }),

  props: {
    title: '',
    btnTooltip: '',
    label: '',
    items: [],
    itemTitle: '',
    fieldName: ''
  },

  computed: {
    updateValue() {
      this.$emit('updateValue', this.selectedItem.id, this.fieldName);
    },
  }
}
</script>
