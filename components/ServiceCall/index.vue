<template>
  <div>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar" small top="top" :color="color">
        {{ response }}
      </v-snackbar>
    </div>
    <div v-if="!loading">
      <v-card elevation="0" class="mt-2">
        <v-toolbar class="mb-2" dense flat>
          <v-toolbar-title>
            <span> {{ Model }}s </span></v-toolbar-title
          >
          <span>
            <v-btn
              dense
              class="ma-0 px-0"
              x-small
              :ripple="false"
              text
              title="Reload"
            >
              <v-icon class="ml-2" @click="clearFilters" dark
                >mdi mdi-reload</v-icon
              >
            </v-btn>
          </span>
          <!-- <span>
            <v-btn
              dense
              class="ma-0 px-0"
              x-small
              :ripple="false"
              text
              title="Filter"
            >
              <v-icon @click="toggleFilter" class="mx-1 ml-2"
                >mdi mdi-filter</v-icon
              >
            </v-btn>
          </span> -->

          <v-spacer></v-spacer>

          <!-- <ServiceCallCreate
            @success="(e) => handleSuccessResponse(`AMC Successfully created`)"
          /> -->
        </v-toolbar>
        <v-container>
          <v-data-table
            style="max-height: 600px; overflow-y: scroll"
            dense
            :headers="headers"
            :items="data"
            model-value="data.id"
            :loading="loadinglinear"
            :options.sync="options"
            :footer-props="{
              itemsPerPageOptions: [100, 500, 1000],
            }"
            class="elevation-1"
            :server-items-length="totalRowsCount"
          >
            <template v-slot:item.company="{ item: { contract }, index }">
              <v-card
                elevation="0"
                style="background: none"
                class="d-flex align-center"
              >
                <v-avatar class="mr-1">
                  <img
                    :src="
                      contract.company && contract.company.logo
                        ? contract.company.logo
                        : '/no-image.png'
                    "
                    alt="Avatar"
                  />
                </v-avatar>
                <div class="mt-2">
                  <strong>
                    {{ contract.company && contract.company.name }}</strong
                  >
                  <p>
                    {{ contract.company && contract.company.address }}
                  </p>
                </div>
              </v-card>
            </template>

            <template v-slot:item.priority.name="{ item }">
              <v-chip
                dark
                small
                :color="priorityRelatedColor(item.priority.name)"
                >{{ item.priority.name ?? "---" }}</v-chip
              >
            </template>

            <template v-slot:item.status="{ item }">
              <v-chip dark small :color="statusRelatedColor(item.status)">{{
                item.status
              }}</v-chip>
            </template>

            <template v-slot:item.technicians="{ item }">
              <v-avatar
                size="30"
                color="primary"
                v-for="(technician, index) in item.technicians"
                :key="index"
              >
                <v-tooltip top color="deep-purple">
                  <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on" class="white--text">{{
                      getCapitalFirstLetters(technician.name)
                    }}</span>
                  </template>
                  <span>{{ technician.name }}</span>
                </v-tooltip>
              </v-avatar>
            </template>

            <template v-slot:item.options="{ item }">
              <v-menu bottom left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn dark-2 icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list width="150" dense>
                  <v-list-item>
                    <v-list-item-title>
                      <ServiceCallAssign
                        :key="getRandomId()"
                        :item="item"
                        @success="
                          (e) =>
                            handleSuccessResponse(`Record has been assigned`)
                        "
                      />
                    </v-list-item-title>
                  </v-list-item>
                  <!-- <v-list-item>
                  <v-list-item-title>
                    <ServiceCallSingle :key="getRandomId()" :item="item" />
                  </v-list-item-title>
                </v-list-item> -->
                  <!-- <v-list-item>
                  <v-list-item-title>
                    <ServiceCallEdit
                      :item="item"
                      @success="
                        (e) => handleSuccessResponse(`Record has been updated`)
                      "
                    />
                  </v-list-item-title>
                </v-list-item> -->
                </v-list>
              </v-menu>
            </template>
          </v-data-table>
        </v-container>
      </v-card>
    </div>
    <Preloader v-else />
  </div>
</template>

<script>
export default {
  props: ["id"],
  components: {},

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
    Model: "AMC",
    endpoint: "service_call",
    snackbar: false,
    loading: false,
    response: "",
    data: [],
    errors: [],
    headers: [
      {
        text: "Reference Id",
        align: "left",
        sortable: true,
        key: "id",
        value: "id",
        filterable: true,
        filterSpecial: false,
        width: "130px",
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

      {
        text: "Schedule Start Date",
        align: "left",
        sortable: true,
        key: "schedule_start_date",
        value: "schedule_start_date",
        filterable: true,
        filterSpecial: false,
      },
      {
        text: "Technicians",
        align: "left",
        sortable: true,
        key: "technicians",
        value: "technicians",
        filterable: true,
        filterSpecial: false,
      },
      {
        text: "Created Date",
        align: "left",
        sortable: true,
        key: "date",
        value: "date",
        filterable: true,
        filterSpecial: false,
      },
      {
        text: "Action",
        align: "left",
        sortable: false,
        key: "options",
        value: "options",
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
        completed: "green",
        pending: "red",
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

      this.filters.company_id = this.id;

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
    handleSuccessResponse(message) {
      this.snackbar = true;
      this.response = message;
      this.getDataFromApi();
    },
  },
};
</script>
