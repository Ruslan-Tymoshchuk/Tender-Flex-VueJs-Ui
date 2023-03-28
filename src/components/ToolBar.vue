<template>
 <v-toolbar color="blue">
    <v-row>
      <v-img class="ml-10" max-width="140" src="@/assets/tender-flex-Logo.svg" />
      <v-chip
        class="my-2 ml-12"
        variant="flat"
        color="blue-darken-3"
        text-color="white"
        prepend-icon="mdi-pulse"
        @click="goByLink(`/module/${role}/tenders`)">
        Tenders {{ totalStore.tenders }}
      </v-chip>
      <v-chip
        class="my-2 ml-10"
        variant="flat"
        color="blue-darken-3"
        text-color="white"
        prepend-icon="mdi-message-processing-outline"
        @click="goByLink(`/module/${role}/offers`)">
        Offers {{ totalStore.offers }}
      </v-chip>
      <v-spacer></v-spacer>
      <v-chip
        v-model="successAlert.isActivated"
        class="my-2 mr-6"
        closable
        variant="elevated"
        type="success"
        color="green">
        {{ successAlert.message }}
      </v-chip>
      <div v-if="role === 'contractor'">
      <v-chip
        v-if="this.$route.path !== '/module/contractor/new-tender'"
        @click="goByLink('/module/contractor/new-tender')"
        variant="flat"
        color="indigo-darken-4"
        class="my-2 mr-6"
        >
        + Create new Tender
      </v-chip>
      </div>
      <v-chip
        class="mt-2 mr-4"
        variant="flat"
        color="blue-darken-3"
        prepend-icon="mdi-account-check-outline"
        > {{ role }}
      </v-chip>
      <v-btn icon class="mr-6" @click="goByLink('/')">
        <v-icon>mdi-export</v-icon>
      </v-btn>
      <v-divider class="mt-1" color="black"></v-divider>
    </v-row>
  </v-toolbar>
  <router-view></router-view>
 </template>

<script>
import { totalStore, successAlert} from "@/components/actions"

export default {
  data: () => ({
    role: '',
    route: '/',
    totalStore,
    successAlert,
  }),

  methods: {
    goByLink(link) {
      this.$router.push(link)
    }
  },

  mounted() {
    this.role = this.$route.params.role;
    this.totalStore.getTotalByModule(this.role)
  }
}
</script>
