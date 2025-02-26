<template>
  <v-table>
    <tbody>
      <tr v-for="tender in tenders" :key="tender.id">
        <div :class="isDisabled(TENDER_STATUS[tender.status])">
          <td class="v-col-4 text-left cpv-text">
            <router-link :to="{ name: 'tender-details', params: { tenderId: tender.id } }" class="cpv-code">
              <div>{{ tender.cpv.code }}</div>
            </router-link>
            <strong>{{ tender.cpv.summary }}</strong>
          </td>
          <td class="v-col-2 text-center">{{ tender.companyProfile.officialName }}</td>
          <td class="v-col-2 text-center">{{ TENDER_STATUS[tender.status] }}</td>
          <td class="v-col-2 text-center">{{ tender.offerSubmissionDeadline }}</td>
          <td class="v-col-2">
            <div v-if="this.$route.params.role === USER_ROLE.CONTRACTOR" class="text-center">
              {{ tender.offersCount }}
            </div>
            <div v-else-if="this.$route.params.role === USER_ROLE.BIDDER" class="ml-7 text-left">
              {{ OFFER_STATUS[tender.offerStatus] }}
            </div>
          </td>
        </div>
      </tr>
    </tbody>
  </v-table>
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
    tenders: null
  },

  methods: {
    isDisabled(status) {
      if (status === TENDER_STATUS.TENDER_IN_PROGRESS) {
        return "table-row";
      } else {
        return "table-row disabled";
      }
    }
  }

}
</script>
