<template>
  <v-table>
    <tbody>
      <tr class="table" v-for="tender in tenders" :key="tender.id">
        <td class="v-col-5 text-left">
          <div class="cpv-code" @click="getById(tender.id)">{{ tender.cpv.code }}</div>
          <strong>{{ tender.cpv.description }}</strong>
        </td>
        <td class="v-col-2 text-left">{{ tender.companyProfile.officialName }}</td>
        <td class="v-col-2 text-left">{{ tender.status }}</td>
        <td class="v-col-2 text-left">{{ tender.offerSubmissionDeadline }}</td>
        <td class="v-col-2 text-right">
          <div v-if="tender.status === 'TENDER_IN_PROGRESS'">{{ tender.offerData }}</div>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  props: {
    tenders: null
  },

  methods: {
    getById(id) {
      this.$emit('getById', id);
    }
  }
}
</script>
