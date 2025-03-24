<template>
  <v-sheet v-for="tender in tenders" :key="tender.id">
    <v-sheet :class="{
      'table-row': TENDER_STATUS[tender.status] === TENDER_STATUS.TENDER_IN_PROGRESS,
      'table-row disabled': TENDER_STATUS[tender.status] === TENDER_STATUS.TENDER_CLOSED
    }">
      <td class="v-col-4">
        <div class="cpv-code"><strong @click="$emit('select-tender', tender)">{{ tender.cpv.code }}</strong></div>
        <div class="cpv-text"><strong>{{ tender.cpv.summary }}</strong></div>
      </td>
      <td class="v-col-2 text-center">{{ tender.companyProfile.officialName }}</td>
      <td class="v-col-2 text-center">{{ TENDER_STATUS[tender.status] }}</td>
      <td class="v-col-2 text-center">{{ tender.offerSubmissionDeadline }}</td>
      <td class="v-col-2">
        <div class="text-center" v-if="this.$route.params.role === USER_ROLE.CONTRACTOR">
          {{ tender.offersCount }}
        </div>
        <div class="ml-6 text-left" v-else-if="this.$route.params.role === USER_ROLE.BIDDER">
          <div v-if="tender.offer !== null">{{ OFFER_STATUS[tender.offer.status] }}</div>
          <div v-else >{{ OFFER_STATUS.OFFER_HAS_NOT_SENT }} </div>
        </div>
      </td>
    </v-sheet>
  </v-sheet>
</template>

<script>
import { USER_ROLE, TENDER_STATUS, OFFER_STATUS } from "@/components/constants";

export default {
  data: () => ({
    USER_ROLE,
    TENDER_STATUS,
    OFFER_STATUS
  }),

  props: {
    tenders: Array
  },

  emits: ['select-tender']
}
</script>
