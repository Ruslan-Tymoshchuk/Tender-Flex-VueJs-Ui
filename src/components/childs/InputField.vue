<template>
  <v-col cols="12" md="4">
    <v-chip class="required" variant="text">{{ title }}
      <v-btn size=auto class="ml-2" icon color="transparent" variant="flat">
        <v-tooltip activator="parent" location="top">
          {{ tooltip }}
        </v-tooltip>
        <v-icon icon="mdi-information-outline" class="inf-icon"></v-icon>
      </v-btn>
    </v-chip>
    <v-text-field single-line color="blue" variant="outlined" v-model="inputValue" @change="updateValue"
      :counter="counter" :type="inputFieldType" :label="fieldLabel" required density="compact" :min="startDate" :disabled="isDisabled">
    </v-text-field>
  </v-col>
</template>

<script>
export default {
  data: () => ({
    inputValue: '',
  }),

  props: {
    instance: '',
    counter: '',
    title: '',
    tooltip: '',
    fieldLabel: '',
    fieldName: '',
    startDate: null,
    isDisabled: Boolean,
    inputFieldType: "text",
  },

  methods: {
    updateValue() {
      this.$emit('updateValue', this.instance, this.fieldName, this.inputValue);
    },
  }
}
</script>
