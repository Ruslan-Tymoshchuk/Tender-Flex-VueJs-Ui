<template>
  <v-sheet v-for="offer in offers" :key="offer.id">
    <v-sheet class="table-row">
      <strong class="cpv-code" @click="$emit('select-offer', offer)"
        >{{ offer.companyProfile.officialName }}</strong>
      <td style="width: 20rem;">{{ offer.tender.cpv.summary }}</td>
      <td style="width: 10rem;">{{ `${offer.currency.code}.${offer.bidPrice}` }}</td>
      <td style="width: 10rem;">{{ offer.companyProfile.country.name }}</td>
      <td style="width: 10rem;">{{ offer.publication }}</td>
      <td style="width: 10rem;"> {{ OFFER_STATUS[offer.status] }} </td>
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
