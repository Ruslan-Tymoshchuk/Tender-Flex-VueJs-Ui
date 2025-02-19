<template>
  <v-container class="d-flex align-center">
    <p class="chapter-label">{{ title }}</p>
    <v-div class="horizontal-divider"></v-div>
  </v-container>
</template>

<script>
export default {
  props: {
    title: ''
  }
}
</script>
