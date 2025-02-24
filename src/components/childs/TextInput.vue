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
    @change="$emit('updateValue', inputValue)"
    :counter="counter"
    :label="label"
    required
    density="compact">
  </v-text-field>
</template>

<script>
export default {
  data: () => ({
    inputValue: '',
  }),

  props: {
    title: '',
    hint: '',
    counter: 0,
    label: ''
  },

  emits: ['updateValue']

}
</script>
