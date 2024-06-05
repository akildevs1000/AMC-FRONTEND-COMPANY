<!-- Dashboard.vue -->
<template>
  <v-container fluid>
    <v-row>
      <v-col
        :cols="item.cols"
        v-for="(item, amcIndex) in amcItems"
        :key="amcIndex"
      >
        <v-card :color="item.color" dark>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div class="pa-4">
              <div class="text-h6">{{ item.value }}</div>
              <small>{{ item.job_type }}</small>
              <br />
              <small>{{ item.title }}</small>
            </div>
            <v-avatar class="ma-3" size="80" tile>
              <v-img style="opacity: 0.3" :src="item.src"></v-img>
            </v-avatar>
          </div>
          <div
            :class="`${item.color}  darken-2 text-center`"
            style="cursor: pointer"
            @click="$router.push(item.page)"
          >
            View all <v-icon small>mdi-arrow-right</v-icon>
          </div>
        </v-card>
      </v-col>
      <v-col
        class="mt-5"
        :cols="item.cols"
        v-for="(item, ticketIndex) in ticketItems"
        :key="ticketIndex"
      >
        <v-card :color="item.color" dark>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div class="px-3">
              <div>{{ item.value }}</div>
              <small>{{ item.title }}</small>
            </div>
            <v-avatar size="40" tile class="mx-3">
              <v-img style="opacity: 0.3" :src="item.src"></v-img>
            </v-avatar>
          </div>
          <div
            :class="`${item.color}  darken-2 text-center`"
            style="cursor: pointer"
            @click="$router.push(item.page)"
          >
            View all <v-icon small>mdi-arrow-right</v-icon>
          </div>
        </v-card>
      </v-col>
      <v-col cols="6">
        <TicketCard class="mt-5" />
      </v-col>
      <v-col cols="6">
        <AMCCard class="mt-5" />
      </v-col>
      <v-col cols="12">
        <FormEntryCard class="mt-5" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    amcItems: [],

    ticketItems: [],

    ticketAssignedJobs: [
      {
        color: "blue",
        src: "/clock.png",
        title: "Assigned Tickets",
        value: "10/100",
        job_type: "TICKET",
        cols: "3",
        page: "/tickets",
      },
      {
        color: "red",
        src: "/clock.png",
        title: "Not Assigned Tickets",
        value: "10/100",
        job_type: "TICKET",
        cols: "3",
        page: "/tickets",
      },
    ],
  }),
  async created() {
    let { data: amcItems } = await this.$axios.get("/service_call-card");
    this.amcItems = amcItems;

    let { data: ticketItems } = await this.$axios.get("/ticket-card");
    this.ticketItems = ticketItems;
  },
};
</script>
