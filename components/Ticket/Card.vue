<template>
  <div v-if="!loading">
      <v-card elevation="0">
        <v-data-table
          dense
          :headers="headers"
          :items="data"
          model-value="data.id"
          :loading="loadinglinear"
          :options.sync="options"
          hide-default-footer
          :footer-props="{
            itemsPerPageOptions: [5],
          }"
          class="elevation-1"
          :server-items-length="totalRowsCount"
          style="min-height: 267px"
        >
          <template v-slot:item.company="{ item, index }">
            <v-card
              elevation="0"
              class="d-flex align-center"
            >

              <div class="mt-1">
                {{ item.company && item.company.name }}
                <br>
                <p>{{ item.company && item.company.address }}</p>
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
        <div
          :class="`primary white--text text-center`"
          style="cursor:pointer"
          @click="$router.push(`/tickets`)"
        >
          View all <v-icon small class="white--text">mdi-arrow-right</v-icon>
        </div>
      </v-card>
    </div>
    <Preloader v-else />
</template>

<script>
export default {
  data: () => ({
    totalRowsCount: 0,
    showFilters: false,
    filters: {},
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
    //this.getDepartments(options);
  },
  mounted() {},
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
  },
  methods: {
    getCapitalFirstLetters(name) {
      const words = name.split(" ");
      const firstLetters = words.map((word) => word.charAt(0).toUpperCase());
      return firstLetters.join("");
    },
    getRandomId() {
      return Math.random().toString(36).substring(2);
    },
    priorityRelatedColor(value) {
      let color = {
        High: "red",
        Medium: "blue",
        Low: "grey",
      };
      return color[value];
    },

    statusRelatedColor(value) {
      let color = {
        Open: "green",
        "In Progress": "blue",
        Close: "grey",
      };
      return color[value];
    },
    applyFilters() {
      this.getDataFromApi();
    },
    toggleFilter() {
      // this.filters = {};
      this.isFilter = !this.isFilter;
    },
    clearFilters() {
      this.filters = {};

      this.isFilter = false;
      this.getDataFromApi();
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

      this.data = data.data;
      this.totalRowsCount = data.total;
      this.loadinglinear = false;
    },
    handleSuccessResponse(message) {
      this.snackbar = true;
      this.response = message;
      this.getDataFromApi();
    },
  },
};
</script>
