<template>
  <v-container>
    <v-img :src="TenderFlexIcon" class="mx-auto" style="margin-top: 7%; width: 400px" />
    <v-card width="400px" height="350px" class="mx-auto" style="margin-top: 5%">
      <v-card-title class="text-center mt-5">Log in to proceed</v-card-title>
      <v-sheet width="300" class="mx-auto mt-10">
        <v-form v-model="isFormValid" fast-fail @submit.prevent="authenticate">
          <v-text-field v-model="email" label="Email" :rules="emailRules"></v-text-field>
          <v-text-field v-model="password" label="Password" :rules="passwordRules"></v-text-field>
          <v-btn :disabled="!isFormValid" type="submit" block class="mt-2" color="success">Log In</v-btn>
        </v-form>
      </v-sheet>
    </v-card>
  </v-container>
</template>

<script>
import TenderFlexIcon from "@/assets/tender-flex-Logo.svg";
export default {
  setup() {
    return {
      TenderFlexIcon
    }
  },
  data: () => ({
    isFormValid: false,
    email: '',
    emailRules: [
      value => {
        if (value?.length >= 5) return true
        return 'Email must be at least 5 characters.'
      },
    ],
    password: '',
    passwordRules: [
      value => {
        if (value?.length >= 5) return true
        return 'Password must be at least 5 characters.'
      },
    ],
  }),
  methods: {
    authenticate() {
      fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      })
        .then(response => response.json())
        .then(data => console.log(data))
    }
  }
}
</script>

<style>
html {
  overflow-y: auto !important;
  background-image: url('../assets/clouds-flex.png');
  background-size: cover;
  height: 100dvh;
}
</style>
