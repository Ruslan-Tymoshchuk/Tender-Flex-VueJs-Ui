<template>
  <v-container class="d-flex align-center">
    <p class="chapter-label">{{ title }}</p>
    <v-divider class="horizontal-divider"></v-divider>
  </v-container>
</template>

<script>
export default {
  props: {
    title: ''
  }
}
</script>
