<template>
  <v-toolbar color="blue" extended extension-height="170">
    <v-row>
      <v-img class="ml-10" max-width="140" src="@/assets/tender-flex-Logo.svg" />
      <v-spacer></v-spacer>
      <v-btn href="/new-tender" variant="flat" color="indigo-darken-4" class="my-3" size="small">
         + Create new Tender
      </v-btn>
      <v-btn icon class="mr-6">
        <v-icon>mdi-export</v-icon>
      </v-btn>
      <v-divider class="mt-1" color="black"></v-divider>
    </v-row>
    <template v-slot:extension>
      <v-container class="px-15">
        <v-toolbar-title class="mx-10 mb-10" style="font-size: 2rem">My Tenders</v-toolbar-title>
      </v-container>
    </template>
  </v-toolbar>

  <v-card class="mt-n7 mx-auto" elevation="8" max-width="1000">
    <v-container class="pa-10">

    </v-container>
  </v-card>
</template>
