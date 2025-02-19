<template>
  <v-row>
    <Chapter
      :title="companyRole">
    </Chapter>
  </v-row>

  <v-row class="mt-5 mx-8">
    <v-col cols="12" md="4">
      <TextInput
        title="Oficial name"
        hint="Enter the name of the buyer (e.g. Aeroporto Friuli Venezia Giulia S.p.A.)"
        @updateValue="companyProfile.officialName = $event"
        :counter="50"
        label="Name of Organization"
      ></TextInput>
    </v-col>

    <v-col cols="12" md="4">
      <TextInput
        title="National Registration Number"
        hint=" Enter the national registration number of the buyer (e.g.ULG BE 0325 777 171)"
        @updateValue="companyProfile.registrationNumber = $event"
        :counter="10"
        label="National Registration Number"
      ></TextInput>
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
      <TextInput
        title="City / Town"
        hint="Enter the city"
        @updateValue="companyProfile.city = $event"
        :counter="50"
        label="City"
      ></TextInput>
    </v-col>
  </v-row>

  <v-row>
    <Chapter
      title="Contact person">
    </Chapter>
  </v-row>

  <v-row class="mt-5 mx-8">
    <v-col cols="12" md="4">
      <TextInput
        title="First Name"
        hint="Enter the name of contact person"
        @updateValue="companyProfile.contactPerson.firstName = $event"
        :counter="50"
        label="Name"
      ></TextInput>
    </v-col>

    <v-col cols="12" md="4">
      <TextInput
        title="Last Name"
        hint="Enter the surname of contact person"
        @updateValue="companyProfile.contactPerson.lastName = $event"
        :counter="50"
        label="Surname"
      ></TextInput>
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
import Chapter from '@/components/childs/Chapter.vue';
import NumericInput from '@/components/childs/NumericInput.vue';
import SelectOptionInput from '@/components/childs/SelectOptionInput.vue';
import TextInput from '@/components/childs/TextInput.vue';

export default {
  components: {
    Chapter,
    TextInput,
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
