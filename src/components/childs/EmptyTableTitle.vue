<template>
  <v-toolbar color="white" height="200">
    <v-toolbar-title class="text-center" style="font-size: 2rem">{{ message }}</v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    message: ''
  }
}
</script>
