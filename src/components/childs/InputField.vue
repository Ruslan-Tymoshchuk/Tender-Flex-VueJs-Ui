<template>
    <v-chip class="required" variant="text">{{ title }}
      <v-btn size=auto class="ml-2" icon color="transparent" variant="flat">
        <v-tooltip activator="parent" location="top">
          {{ tooltip }}
        </v-tooltip>
        <v-icon icon="mdi-information-outline" class="inf-icon"></v-icon>
      </v-btn>
    </v-chip>
    <v-text-field single-line color="blue" variant="outlined" v-model="inputValue" @change="$emit('updateValue', inputValue)"
       :type="type" :label="fieldLabel" required density="compact" :min="startDate" :disabled="isDisabled">
    </v-text-field>
</template>

<script>
export default {

  data: () => ({
    inputValue: null,
  }),

  props: {
    title: '',
    tooltip: '',
    fieldLabel: { type: String, default: ''},
    startDate: null,
    isDisabled: { type: Boolean, default: false },
    type: { type: String, default: 'date'}
  },

  emits: ['updateValue']

}
</script>
