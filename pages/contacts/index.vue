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
          <v-spacer></v-spacer>

          <!-- <TicketCreate
            @success="
              (e) => handleSuccessResponse(`Ticket Successfully created`)
            "
          /> -->
        </v-toolbar>
        <v-data-table
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
          <template v-slot:item.company="{ item, index }">
            <v-card
              elevation="0"
              style="background: none"
              class="d-flex align-center"
            >
              <v-avatar class="mr-1">
                <img
                  :src="
                    item.company && item.company.logo
                      ? item.company.logo
                      : '/no-image.png'
                  "
                  alt="Avatar"
                />
              </v-avatar>
              <div class="mt-2">
                <strong> {{ item.company && item.company.name }}</strong>
                <p>{{ item.company && item.company.address }}</p>
              </div>
            </v-card>
          </template>

          <template v-slot:item.priority="{ item }">
            <v-chip dark small :color="priorityRelatedColor(item.prority)">{{
              item.prority
            }}</v-chip>
          </template>

          <template v-slot:item.status="{ item }">
            <v-chip dark small :color="statusRelatedColor(item.status)">{{
              item.status
            }}</v-chip>
          </template>

          <template v-slot:item.ticket_history="{ item }">
            <TimeLine
              :key="getRandomId()"
              v-if="item.ticket_history"
              :id="item.id"
              :data="item.ticket_history"
            />
          </template>

          <template v-slot:item.attachment="{ item }">
            <ViewAttachment
              :key="getRandomId()"
              v-if="item.attachment"
              :src="item.attachment"
            />
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
                    <TicketSingle :key="getRandomId()" :item="item" />
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <TicketEdit
                      :item="item"
                      @success="
                        (e) => handleSuccessResponse(`Record has been updated`)
                      "
                    />
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </v-card>
    </div>
    <Preloader v-else />
  </div>
</template>

<script>
export default {
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
    Model: "Ticket",
    endpoint: "ticket_all",
    snackbar: false,
    loading: false,
    response: "",
    data: [],
    errors: [],
    headers: require("../../headers/ticket.json"),
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
