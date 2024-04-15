<template>
<v-toolbar color="blue" extended extension-height="100">
<template v-slot:extension>
  <v-container class="px-15">
    <v-toolbar-title class="ml-10 mb-15" style="font-size: 2rem">{{ title }}
    </v-toolbar-title>
  </v-container>
</template>
</v-toolbar>
</template>

<script>
export default {
  props: {
    title: ''
  }
}
</script>
