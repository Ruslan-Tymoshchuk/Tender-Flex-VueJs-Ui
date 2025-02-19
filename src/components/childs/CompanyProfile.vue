<template>
  <v-row>
    <v-container class="d-flex align-center">
      <p class="chapter-label">{{ companyRole }}</p>
      <v-div class="horizontal-divider"></v-div>
    </v-container>
  </v-row>

  <v-row class="mt-5 mx-8">
    <v-col cols="12" md="4">
      <v-chip class="required" variant="text">Oficial name
        <v-btn size=auto class="ml-2" icon color="transparent" variant="flat">
          <v-tooltip activator="parent" location="top">
            Enter the name of the buyer (e.g. Aeroporto Friuli Venezia Giulia S.p.A.)
          </v-tooltip>
          <v-icon icon="mdi-information-outline" class="inf-icon"></v-icon>
        </v-btn>
      </v-chip>
      <v-text-field single-line color="blue" variant="outlined" v-model="companyProfile.officialName"
         :counter="50" label="Name of Organization" required density="compact">
      </v-text-field>
    </v-col>

    <v-col cols="12" md="4">
      <v-chip class="required" variant="text">National Registration Number
        <v-btn size=auto class="ml-2" icon color="transparent" variant="flat">
          <v-tooltip activator="parent" location="top">
            Enter the national registration number of the buyer (e.g.ULG BE 0325 777 171)
          </v-tooltip>
          <v-icon icon="mdi-information-outline" class="inf-icon"></v-icon>
        </v-btn>
      </v-chip>
      <v-text-field single-line color="blue" variant="outlined" v-model="companyProfile.registrationNumber"
         :counter="10" label="National Registration Number" required density="compact">
      </v-text-field>
    </v-col>

    <v-col cols="12" md="4">

      <SelectOptionInput
        title="Country"
        hint="Choose the country"
        label="Choose the country"
        itemTitle="name"
        :selectedItem="companyProfile.country"
        :items="countries">
      </SelectOptionInput>
    </v-col>

    <v-col cols="12" md="4">
      <v-chip class="required" variant="text">City / Town
        <v-btn size=auto class="ml-2" icon color="transparent" variant="flat">
          <v-tooltip activator="parent" location="top">Enter the city</v-tooltip>
          <v-icon icon="mdi-information-outline" class="inf-icon"></v-icon>
        </v-btn>
      </v-chip>
      <v-text-field single-line color="blue" variant="outlined" v-model="companyProfile.city"
        :counter="50" label="City" required density="compact">
      </v-text-field>
    </v-col>
  </v-row>

  <v-row>
    <v-container class="d-flex align-center">
      <p class="chapter-label">Contact person</p>
      <div class="horizontal-divider"></div>
    </v-container>
  </v-row>

  <v-row class="mt-5 mx-8">
    <v-col cols="12" md="4">
      <v-chip class="required" variant="text">First Name
        <v-btn size=auto class="ml-2" icon color="transparent" variant="flat">
          <v-tooltip activator="parent" location="top">Enter the name of contact person</v-tooltip>
          <v-icon icon="mdi-information-outline" class="inf-icon"></v-icon>
        </v-btn>
      </v-chip>
      <v-text-field single-line color="blue" variant="outlined" v-model="companyProfile.contactPerson.firstName"
         :counter="50" label="Name" required density="compact">
      </v-text-field>
    </v-col>

    <v-col cols="12" md="4">
      <v-chip class="required" variant="text">Last Name
        <v-btn size=auto class="ml-2" icon color="transparent" variant="flat">
          <v-tooltip activator="parent" location="top">Enter the surname of contact person</v-tooltip>
          <v-icon icon="mdi-information-outline" class="inf-icon"></v-icon>
        </v-btn>
      </v-chip>
      <v-text-field single-line color="blue" variant="outlined" v-model="companyProfile.contactPerson.lastName"
         :counter="50" label="Surname" required density="compact">
      </v-text-field>
    </v-col>

    <v-col cols="12" md="4">
      <NumericInput
        title="Phone number"
        hint=" Enter the phone number of the contact person"
        label="Phone"
        counter="9"
        @updateValue="companyProfile.contactPerson.phoneNumber = $event">
      </NumericInput>
    </v-col>
  </v-row>
</template>

<script>
import NumericInput from '@/components/childs/NumericInput.vue';
import SelectOptionInput from '@/components/childs/SelectOptionInput.vue';

export default {
  components: {
    SelectOptionInput,
    NumericInput
  },

  props: {
    companyProfile: {},
    companyRole: '',
    countries: []
  }
}
</script>
