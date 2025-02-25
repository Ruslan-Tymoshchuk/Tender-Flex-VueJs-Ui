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
      >{{ hint }}</v-tooltip
    ><v-icon
      icon="mdi-information-outline"
      class="inf-icon"
    ></v-icon>
    </v-btn>
  </v-chip>
  <v-select
    single-line
    color="blue"
    variant="outlined"
    v-model="selectedItemId"
    :label="label"
    required
    density="compact"
    :items="items"
    item-value="id"
    :item-title="itemTitle"
    persistent-hint
    @update:modelValue="$emit('updateValue', selectedItemId)"
  ></v-select>
</template>

<script>
export default {

  data: () => ({
    selectedItemId: null,
  }),

  props: {
    title: '',
    hint: '',
    label:'',
    items: {
      type: Array
    },
    itemTitle:''
  },

  emits: ['updateValue']

}
</script>
