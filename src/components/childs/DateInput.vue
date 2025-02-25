<template>
  <v-chip
    class="required"
    variant="text"
  >{{ title }}
  <v-btn
    size=auto
    class="ml-2"
    icon
    color="transparent"
    variant="flat"
  ><v-tooltip
    activator="parent"
    location="top"
  >{{ hint }}
  </v-tooltip>
  <v-icon
    icon="mdi-information-outline"
    class="inf-icon"
  ></v-icon>
  </v-btn>
  </v-chip>
  <v-text-field
    single-line
    color="blue"
    variant="outlined"
    v-model="inputValue"
    :label="label"
    @change="$emit('updateValue', inputValue)"
    :type="type"
    required
    density="compact"
    :min="earliestDate"
    :disabled="isDisabled">
  </v-text-field>
</template>

<script>
export default {
  data: () => ({
    inputValue: null,
  }),

  props: {
    title: '',
    hint: '',
    label: { type: String, default: ''},
    earliestDate: null,
    isDisabled: { type: Boolean, default: false },
    type: { type: String, default: 'date'}
  },

  emits: ['updateValue']

}
</script>
