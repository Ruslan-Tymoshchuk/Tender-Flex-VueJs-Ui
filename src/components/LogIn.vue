<template>
  <v-container>
    <v-img contain height="10dvh" src="@/assets/tender-flex-Logo.svg" style="margin-top: 9dvh" />
    <v-container>
      <v-row justify="center">
        <v-card height="52dvh" width="55dvh" style="margin-top: 5dvh">
          <v-card-title class="text-center mt-5">Log in to proceed</v-card-title>
          <v-sheet width="45dvh" class="mx-auto mt-10">
            <v-form v-model="isFormValid" fast-fail @submit.prevent="authenticate">
              <v-text-field v-model="email" label="Email" :rules="emailRules"></v-text-field>
              <v-text-field v-model="password" label="Password" :rules="passwordRules"></v-text-field>
              <v-btn :disabled="!isFormValid" type="submit" block class="mt-2" color="success">Log In</v-btn>
            </v-form>
          </v-sheet>
        </v-card>
      </v-row>
    </v-container>
</v-container>
</template>

<script>
import { restApiConfig } from "@/rest.api.config";
export default {
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
      fetch(`${restApiConfig.host}${restApiConfig.logIn}`, {
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
  overflow-y: auto;
  background-image: url('../assets/clouds-flex.png');
  background-size: cover;
  height: 100dvh;
}
</style>
