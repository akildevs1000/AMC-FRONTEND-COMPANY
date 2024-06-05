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
        <template v-slot:item.company="{ item: { contract }, index }">
          <v-card
            elevation="0"
            style="background: none"
            class="d-flex align-center"
          >
            <div class="mt-1">
              {{ contract.company && contract.company.name }}
              <br />
              <small>
                {{ contract.company && contract.company.address }}
              </small>
            </div>
          </v-card>
        </template>

        <template v-slot:item.status="{ item }">
          <v-chip dark x-small :color="statusRelatedColor(item.status)">{{
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
      :class="`blue white--text text-center`"
      style="cursor: pointer"
      @click="$router.push(`/amc`)"
    >
      View all <v-icon small class="white--text">mdi-arrow-right</v-icon>
    </div>
  </span>
</template>

<script>
export default {
  components: {},

  data: () => ({
    totalRowsCount: 0,
    showFilters: false,
    filters: {
      per_page: 5,
    },
    isFilter: false,
    loadinglinear: false,
    attrs: [],
    selectedFile: "",
    color: "background",
    response: "",
    upload: {
      name: "",
    },
    payload: {},
    options: {},
    Model: "AMC",
    endpoint: "service_call",
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
        text: "Month",
        align: "left",
        sortable: true,
        key: "schedule_start_date",
        value: "schedule_start_date",
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
      },
    ],
  }),

  async created() {
    await this.getDataFromApi();
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
        completed: "green",
        pending: "red",
      };
      return color[value];
    },
    async getDataFromApi() {
      this.loadinglinear = true;

      const data = await this.$store.dispatch("fetchData", {
        key: "amc",
        options: this.options,
        refresh: true,
        endpoint: this.endpoint,
        filters: this.filters,
      });

      this.data = data.data;
      this.totalRowsCount = data.total;
      this.loadinglinear = false;
    },
  },
};
</script>
