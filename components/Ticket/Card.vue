<template>
  <span>
    <v-card elevation="0" style="min-height: 290px">
      <v-data-table
        v-if="!loading"
        dense
        :headers="headers"
        :items="data"
        :loading="loadinglinear"
        :options.sync="options"
        hide-default-footer
        :server-items-length="totalRowsCount"
        class="elevation-0"
      >
        <template v-slot:item.company="{ item, index }">
          <v-card
            elevation="0"
            style="background: none"
            class="d-flex align-center"
          >
            <div class="mt-1">
              {{ item.company && item.company.name }}
              <br />
              <small>
                {{ item.company && item.company.address }}
              </small>
            </div>
          </v-card>
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip dark small :color="statusRelatedColor(item.status)">{{
            item.status
          }}</v-chip>
        </template>

        <template v-slot:item.technicians="{ item }">
          <div v-if="item.technicians && item.technicians[0]">
            <div>{{ item.technicians[0].pivot.schedule_date }}</div>
            <v-chip x-small color="primary">{{
              item.technicians[0].name
            }}</v-chip>
          </div>
        </template>
      </v-data-table>
      <Preloader v-else />
    </v-card>
    <div
      class="blue white--text text-center"
      style="cursor: pointer"
      @click="$router.push(`/tickets`)"
    >
      View all
      <v-icon small class="white--text">mdi-arrow-right</v-icon>
    </div>
  </span>
</template>

<script>
export default {
  data: () => ({
    diffCount: 0,
    totalRowsCount: 0,
    showFilters: false,
    filters: {
      per_page: 5,
    },
    isFilter: false,
    loadinglinear: true,
    attrs: [],
    selectedFile: "",
    color: "background",
    response: "",
    upload: {
      name: "",
    },
    payload: {},
    options: {},
    Model: "Ticket",
    endpoint: "ticket",
    snackbar: false,
    loading: false,
    response: "",
    data: [],
    errors: [],
    headers: [
      {
        text: "Company",
        align: "left",
        sortable: true,
        key: "company",
        value: "company",
        filterable: true,
        filterSpecial: false,
      },

      {
        text: "Title",
        align: "left",
        sortable: true,
        key: "title",
        value: "title",
        filterable: true,
        filterSpecial: false,
      },
      {
        text: "Ticket Open",
        align: "left",
        sortable: true,
        key: "ticket_open_date_time",
        value: "ticket_open_date_time",
        filterable: true,
        filterSpecial: false,
      },
      {
        text: "Schedule Date/Technician",
        align: "left",
        sortable: true,
        key: "technicians",
        value: "technicians",
        filterable: true,
        filterSpecial: false,
      },

      {
        text: "Status",
        align: "left",
        sortable: true,
        key: "status",
        value: "status",
        filterable: true,
        filterSpecial: false,
        width: "130px",
      },
    ],
  }),

  async created() {
    this.loading = false;
    this.getDataFromApi();
  },
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
  },
  methods: {
    statusRelatedColor(value) {
      let color = {
        Open: "green",
        "In Progress": "blue",
        Close: "grey",
      };
      return color[value];
    },
    async getDataFromApi() {
      this.loadinglinear = true;

      const data = await this.$store.dispatch("fetchData", {
        key: "tickets",
        options: this.options,
        refresh: true,
        endpoint: this.endpoint,
        filters: this.filters,
      });

      this.totalRowsCount = data.total;
      this.data = data.data;

      this.loadinglinear = false;
    },
  },
};
</script>
