<template>
</template>

<script>
import { restApiConfig } from "@/rest.api.config"

export default {
  data: () => ({
    tenders: 0,
    offers: 0,
  }),

  methods: {
    getTendersAmountByContractor() {
      fetch(`${restApiConfig.host}${restApiConfig.amountTendersByContractor}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      })
        .then(response => response.json())
        .then(tendersAmount => this.tenders = tendersAmount)
    },

    getTenderBy(id) {
      fetch(`${restApiConfig.host}${restApiConfig.tenderDetails}/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      })
        .then(response => response.json())
        .then(responseData => console.log(responseData))
    }
  },

  mounted() {
    this.getTendersAmountByContractor();
    this.getTenderBy(this.$route.params.id);
  }
}
</script>
