<template>
  <v-sheet v-for="offer in offers" :key="offer.id">
    <v-sheet class="table-row">
      <td class="v-col-2 text-left cpv-text">
        <router-link class="cpv-code" :to="{ name: 'offer-details', params: { offerId: offer.id } }">
          <strong>{{ offer.companyProfile.officialName }}</strong>
        </router-link>
      </td>
      <td class="v-col-3 text-left">{{ offer.tender.cpv.summary }}</td>
      <td class="v-col-2 text-center">{{ `${offer.currency.code}.${offer.bidPrice}` }}</td>
      <td class="v-col-1 text-center">{{ offer.companyProfile.country.name }}</td>
      <td class="v-col-2 text-center">{{ offer.publication }}</td>
      <td class="v-col-1 ml-6 text-left"> {{ OFFER_STATUS[offer.status] }} </td>
    </v-sheet>
  </v-sheet>
</template>

<script>
import { USER_ROLE, OFFER_STATUS } from "@/components/constants";

export default {
  data: () => ({
    USER_ROLE,
    OFFER_STATUS
  }),

  props: {
    offers: Array
  }
}
</script>
