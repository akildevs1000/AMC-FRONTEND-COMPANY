<template>
  <div>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar" small top="top" :color="color">
        {{ response }}
      </v-snackbar>
    </div>
    <div v-if="!loading">
      <v-container>
        <v-toolbar dense flat>
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

          <v-icon
            color="primary"
            @click="() => $router.push(`/invoice/create`)"
            >mdi-plus-circle-outline</v-icon
          >
        </v-toolbar>
        <v-data-table
          dense
          :headers="headers"
          :items="data"
          :loading="loadinglinear"
          :options.sync="options"
          :footer-props="{
            itemsPerPageOptions: [10, 20, 50, 100, 500],
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
                <p>{{ item.company && item.company.location }}</p>
              </div>
            </v-card>
          </template>
          <template v-slot:item.status="{ item }">
            <v-chip
              class="mx-2"
              dark
              small
              :color="getRelationStatus(item.status)"
              >{{ item.status }}</v-chip
            >
          </template>

          <template v-slot:item.options="{ item }">
            <v-menu bottom left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn dark-2 icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list width="175" dense>
                <v-list-item>
                  <v-list-item-title>
                    <InvoiceV1SinglePreview
                      :key="getRandomId()"
                      :payload="item"
                    />
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <InvoiceV1SinglePrint :key="getRandomId()" :item="item" />
                  </v-list-item-title>
                </v-list-item>
                <v-list-item :to="`/invoice/${item.id}`">
                  <v-list-item-title>
                    <v-icon small color="black">mdi-pencil</v-icon> Edit
                  </v-list-item-title>
                </v-list-item>
                <v-list-item :to="`/invoice/clone/${item.id}`">
                  <v-list-item-title>
                    <v-icon small color="black">mdi-content-duplicate</v-icon>
                    Clone
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template> </v-data-table
      ></v-container>
    </div>
    <Preloader v-else />
  </div>
</template>

<script>
export default {
  auth: false,
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
    Model: "Invoice",
    endpoint: "invoice",
    snackbar: false,
    loading: false,
    response: "",
    data: [],
    errors: [],
    id: 30,
    headers: require("../../headers/invoice.json"),
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
    getRelationStatus(status) {
      let statusses = {
        pending: "orange",
        submitted: "blue",
        approved: "green",
        cancelled: "red",
        invoiced: "primary",
      };

      return statusses[status];
    },
    getRandomId() {
      return Math.random().toString(36).substring(2);
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


      let json = {
        key: "invoice",
        options: this.options,
        refresh: true,
        endpoint: this.endpoint,
        filters: this.filters,
      };

      const data = await this.$store.dispatch("fetchData", json);

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
