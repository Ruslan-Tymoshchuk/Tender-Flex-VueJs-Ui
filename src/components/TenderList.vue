<template>
  <ToolBarTitle
    v-if="`${this.$route.params.role}` === 'contractor'"
    title="My Tenders">
  </ToolBarTitle>

  <ToolBarTitle
    v-else
    title="Tenders">
  </ToolBarTitle>

  <v-card class="mt-n7 mx-auto" elevation="8" max-width="1000">
    <div v-if="isNoTenders">
      <EmptyTableTitle v-if="`${this.$route.params.role}` === 'contractor'"
        message="“There are no published Tenders. Create a Tender.”">
      </EmptyTableTitle>
      <EmptyTableTitle
        v-else
        message="“There are no available Tenders.”">
      </EmptyTableTitle>
    </div>

    <div v-else>
      <div v-if="`${this.$route.params.role}` === 'contractor'">
        <TableHeader
          field="Field"
          companyName="Oficial Name"
          tenderStatus="Status"
          deadline="Deadline"
          offerData="Offers"
        >
        </TableHeader>
      </div>
      <div v-else-if="`${this.$route.params.role}` === 'bidder'">
        <TableHeader
          field="Field"
          companyName="Contractor Name"
          tenderStatus="Tender Status"
          deadline="Deadline"
          offerData="Offer Status"
        >
        </TableHeader>
      </div>
        <v-container id="scroll-target" style="max-height: 25rem" class="overflow-y-auto"
          v-scroll:#scroll-target="onScroll">
          <TableBody
            :tenders=tenders
            @getById="getTenderById"
          >
          </TableBody>
        </v-container>
    </div>
  </v-card>
</template>

<script>
import { restApiEndpoints } from "@/rest.api.endpoints"
import { tenderStatus, offerStatus } from "@/components/constants"
import { fetchFromEndpoint, totalStore } from "@/components/actions"
import ToolBarTitle from "@/components/childs/ToolBarTitle.vue"
import EmptyTableTitle from "@/components/childs/EmptyTableTitle.vue"
import TableHeader from "@/components/childs/TableHeader.vue"
import TableBody from "@/components/childs/TableBody.vue"
import axios from "axios";

export default {
  components:{
    ToolBarTitle,
    EmptyTableTitle,
    TableHeader,
    TableBody
  },

  data: () => ({
    loading: false,
    bottom: 232,
    plannedPage: 1,
    tendersPerPage: 10,
    totalPages: 1,
    tenders: 0,
    offers: 0,
    tenders: [],
    isNoTenders: false,
    isTenders: false,
    noTendersMessage: '',
    tenderStatus,
    offerStatus,
    restApiEndpoints,
    fetchFromEndpoint,
    totalStore
  }),

  methods: {
    async getTenders() {
      try {
        this.loading = true
        const response = await axios.get(`${restApiEndpoints.host}/${restApiEndpoints.tenders}` +
          `?currentPage=${this.plannedPage}&totalTenders=${this.tendersPerPage}`, {
          withCredentials: true,
          headers: {
            'Accept': 'application/json',
          }
        });
        this.totalPages = response.totalPages
          for (const tender of response.data.content) {
            const companyProfileResponse = await fetchFromEndpoint(`${restApiEndpoints.host}/${restApiEndpoints.companyProfiles}/${tender.companyProfileId}`);
            tender.companyProfile = companyProfileResponse.data
            if (this.$route.params.role === "contractor") {
            const offerCountResponse = await fetchFromEndpoint(`${restApiEndpoints.host}/${restApiEndpoints.offerCount}/${tender.id}`);
            tender.offerData = offerCountResponse.data.count;
            } else if (this.$route.params.role === "bidder") {
              const response = await fetchFromEndpoint(`${restApiEndpoints.host}/${restApiEndpoints.offerStatus}/${tender.id}`);
              tender.offerData = response.data.offerStatus;
            }
            this.tenders.push(tender);
          };
        if (this.tenders.length == 0) {
          this.isNoTenders = true;
        }
        this.plannedPage++;
        this.loading = false
      } catch (error) {
        console.log('There was an error', error);
      }
    },

    onScroll(e) {
      const currentPage = Math.ceil(e.target.scrollTop / 285);
      if (currentPage === this.plannedPage && !this.loading && this.plannedPage <= this.totalPages) {
        this.getTenders()
      }
    },

    getTenderById(id) {
      this.$router.push({ name: "tender-details", params: { tenderId: id } });
    }
  },

  mounted() {
    this.getTenders();
  }
}
</script>
