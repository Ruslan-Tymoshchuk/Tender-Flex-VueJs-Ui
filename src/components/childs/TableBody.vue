<template>
  <v-table>
    <tbody>
      <tr class="table" v-for="tender in tenders" :key="tender.id">
        <td class="v-col-3 text-left">
          <router-link :to="{ name: 'tender-details', params: { tenderId: tender.id } }" class="cpv-code" >
            <div>{{ tender.cpv.code }}</div>
          </router-link>
          <strong>{{ tender.cpv.summary }}</strong>
        </td>
        <td class="v-col-2 text-center">{{ tender.companyProfile.officialName }}</td>
        <td class="v-col-2 text-center">{{ TENDER_STATUS[tender.status] }}</td>
        <td class="v-col-2 text-center">{{ tender.offerSubmissionDeadline }}</td>
        <td class="v-col-2">
          <div v-if="TENDER_STATUS[tender.status] === TENDER_STATUS.TENDER_IN_PROGRESS">
            <div v-if="this.$route.params.role === USER_ROLE.CONTRACTOR" class="text-center">
              {{ tender.offersCount }}
            </div>
            <div v-else-if="this.$route.params.role === USER_ROLE.BIDDER" class="ml-7 text-left">
              {{ OFFER_STATUS[tender.offerStatus] }}
            </div>
          </div>
        </td>
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

}
</script>
